# @mirachine/mjs-require

## Execution Environment

Operates in Node.js.
Either in `.mjs` files or specified in the `"type": "module"` field in the `package.json`.

## Introduction

**@mirachine/mjs-require** is a simple utility for loading modules and folders, supporting relative paths and configuration-based path aliases. It allows you to use path aliases like `require("@alias/path/to/module")` in your project.

## Installation

```
npm install @mirachine/mjs-require
```

## Configuration

Create a mjs-require.config.mjs file in the root of your project to configure path aliases and their mappings. Example configuration file:

```
// mjs-require.config.mjs

export default {
  "@": "./src",
  "#components": "./src/components",
  "#utils": "./src/utils",
  // Add more path aliases and mappings
};
```

## Usage

In Module JS, you can use `@mirachine/mjs-require` to load modules. For example:

```
import require from "@mirachine/mjs-require";

// Load modules using path aliases.
const myModuleA = await require("#components/fileA.js");
const myModuleB = await require("@/fileB.mjs");

// Load directories.
const allModulesInDir = await require("@/dirA");
```
