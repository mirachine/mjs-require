import path from "path";
import url from "url";
import { promises as fs } from "fs";

const CurrentWorkDir = process.cwd();

const ConfigPath = path.join(CurrentWorkDir, "mjs-require.config.mjs");

const { default: config } = await import(url.pathToFileURL(ConfigPath)).catch(
  () => {
    return {
      default: {},
    };
  }
);

const getValidPath = nickpath => {
  if (path.isAbsolute(nickpath)) {
    return nickpath;
  }

  const arr = nickpath.split("/");
  const key = arr.shift();
  const workDirPath = config[key];

  if (!workDirPath) {
    const error = new Error();
    const callerPath = error.stack
      .split("\n")[3]
      .trim()
      .match(/^at\sfile:\/\/\/(.*):\d+:\d+/)[1];
    const basePath = path.dirname(callerPath);
    const validPath = path.join(basePath, nickpath);
    return validPath;
  }
  const relativePath = arr.join("/");
  return path.join(workDirPath, relativePath);
};

async function requireValidPath(validPath, isDirectory) {
  const stats = await fs.stat(validPath);
  if (stats.isFile() && !isDirectory) {
    const moduleUrl = url.pathToFileURL(validPath);
    return await import(moduleUrl);
  } else if (stats.isDirectory()) {
    const obj = {};
    const files = await fs.readdir(validPath);
    for (const file of files) {
      const filePath = path.join(validPath, file);
      obj[file] = await requireValidPath(filePath);
    }
    return obj;
  } else {
    throw new Error(`Not found module: ${aliasPath}`);
  }
}

/**
 * @param {String} aliasPath - example: `require("@/path/to/module_or_dir")`
 * @param {Boolean|undefined} isDirectory - If undefined, default import file, when both the directory and the file exist simultaneously.
 * @returns {Promise<any>}
 */
const require = async (aliasPath, isDirectory) => {
  const validPath = getValidPath(aliasPath);
  return await requireValidPath(validPath, isDirectory);
};

export default require;
