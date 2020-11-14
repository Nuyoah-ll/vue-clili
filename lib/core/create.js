const program = require("commander");
const {
  createProjectAction,
  addComponentAction,
  addPageAndRouterAction,
  addStoreAction
} = require("./actions");
const { toKebabCase } = require("../utils/utils");

function createCommands() {
  program
    .command("create <project> [other...]")
    .description("create a vue project")
    .action(createProjectAction);
  program
    .command("addcpn <component>")
    .description("add a vue component, for example: li addcpn HelloWorld [-D /src/components]")
    .action(name => {
      addComponentAction(name, program.dest || "src/components");
    });
  program
    .command("addpage <page>")
    .description("add a vue page and a router config, for example: li addpage Profile [-D /src/pages]")
    .action((name) => {
      addPageAndRouterAction(name, program.dest || `src/pages/${toKebabCase(name)}`);
    });
  program
    .command("addstore <store>")
    .description("add a vue store module, for example: li addstore home")
    .action(name => {
      addStoreAction(name, `src/store/modules/${toKebabCase(name)}`)
    })
}

module.exports = createCommands;