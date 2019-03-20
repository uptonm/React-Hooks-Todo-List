const colors = require('colors');

exports.msg = msg => {
  console.log(`${colors.grey(new Date().toLocaleTimeString())} 🚀  ${colors.green(msg)}`);
};

exports.err = msg => {
  console.warn(`${colors.grey(new Date().toLocaleTimeString())} ❗  ${colors.red(msg)}`);
};
