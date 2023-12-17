import require from "@mirachine/mjs-require";

global.require = require;

const m1 = await require("./b.mjs");
console.log("import module from relate path:", m1);

await require("@/module-dir2/import_file.mjs");

await require("@/module-dir2/import_dir.mjs");
