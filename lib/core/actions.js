// node内置模块
const { promisify } = require("util");
const { resolve } = require("path");

// 第三方库
const download = promisify(require("download-git-repo"));
const open = require("open");

// 自定义模块
const { VueTemplateRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, toKebabCase, writeToFile, createDirSync } = require("../utils/utils");
const { fstat, fstatSync } = require("fs");

async function createProjectAction(project, other) {
  // 提示信息：
  console.log("li is helping you to create your vue project, please wait a moment...")
  await download(VueTemplateRepo, project, { clone: true });

  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });

  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });

  // 4.打开浏览器
  open("http://localhost:8080")
}

async function addComponentAction(name, dest) {

  const result = await compile("vue.component.ejs", { name, kebabCaseName: toKebabCase(name) });
  
  const targetPath = resolve(dest, `${name}.vue`);
  if (createDirSync(dest)) {
    writeToFile(targetPath, result);
  }
}

async function addPageAndRouterAction(name, dest) {

  const pageResult = await compile("vue.component.ejs", { name, kebabCaseName: toKebabCase(name) });
  const routeResult = await compile("vue.route.ejs", { name, kebabCaseName: toKebabCase(name) });

  const targetPagePath = resolve(dest, `${name}.vue`);
  const targetRoutePath = resolve(dest, "route.js");

  if (createDirSync(dest)) {
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
}

async function addStoreAction(name, dest) {

  const storeModuleResult = await compile("vue.vuex-store.ejs");
  const storeTypesResult = await compile("vue.vuex-types.ejs");

  const targetStoreModulePath = resolve(dest, "index.js");
  const targetTypesPath = resolve(dest, "types.js");

  if (createDirSync(dest)) {
    writeToFile(targetStoreModulePath, storeModuleResult);
    writeToFile(targetTypesPath, storeTypesResult);
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouterAction,
  addStoreAction
}