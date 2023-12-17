// example: async import a file from work directory in mjs

const file1 = await require("@/module-dir1/file1.mjs");

console.log("import module from work directory:", { file1 });
