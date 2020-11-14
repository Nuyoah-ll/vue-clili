const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

function compile(template, data = {}) {
  const templatePath = path.resolve(__dirname, `../templates/${template}`);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

// 写入文件
function writeToFile(filepath, content) {
  return fs.promises.writeFile(filepath, content);
}

// 将大驼峰字符串转换成kebab-case字符串
function toKebabCase(str) {
  let index = 0;
  const regex = /[A-Z]/g;
  function upperToHyphenLower(match) {
    index++;
    return (index === 1 ? "" : "-") + match.toLowerCase();
  }
  return str.replace(regex, upperToHyphenLower);
}

// 判断一个路径是否存在，如果不存在，则创建相应的路径
function createDirSync(pathName){
  if(fs.existsSync(pathName)){
    return true;
  }else{
    if(createDirSync(path.dirname(pathName))){
      fs.mkdirSync(pathName);
      return true;
    }
  }
}

module.exports = {
  compile,
  writeToFile,
  toKebabCase,
  createDirSync
}