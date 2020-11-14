const program = require("commander");

function helpOptions() {
  program.option("-D --dest <dest>", "a destination folder, for example: -D /User/conponents");

  program.on("--help", function () {
    console.log("Others:");
    console.log("  other expected options")
  })
}

module.exports = helpOptions;