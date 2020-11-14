#!/usr/bin/env node
const program = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create");

program.version(require("./package.json").version);

helpOptions();
createCommands();

program.parse(process.argv);