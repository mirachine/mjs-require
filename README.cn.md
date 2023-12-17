# @mirachine/mjs-require

## 运行环境

运行在 nodejs。
.mjs 文件中或者`package.json`中`"type": "module"`。

## 介绍

**@mirachine/mjs-require** 是一个用于加载模块和文件夹的简单工具，支持相对路径和基于配置的路径别名。它允许你在项目中使用类似于 `require("@alias/path/to/module")` 的路径。

## 安装

```
npm install @mirachine/mjs-require
```

## 配置

在项目根目录创建 `mjs-require.config.mjs` 文件，配置路径别名和对应的映射关系。示例配置文件：

```
// mjs-require.config.mjs

export default {
  "@": "./src",
  "#components": "./src/components",
  "#utils": "./src/utils",
  // 添加更多的路径别名和映射关系
};
```

## 使用

在.mjs 中，你可以使用 `@mirachine/mjs-require` 来加载模块。例如：

```
import require from "@mirachine/mjs-require";

// 使用路径别名加载模块
const myModuleA = await require("#components/fileA.js");
const myModuleB = await require("@/fileB.mjs");

// 或者加载目录
const allModulesInDir = await require("@/dirA");
```
