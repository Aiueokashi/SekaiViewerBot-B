const moment = require('moment');
require('moment-timezone');
const chalk = require('chalk');

var oldConsole = console.log;
console.log = function(){
    var timestamp = "[" + moment().tz('Asia/Tokyo').format("YYYY/MM/DD HH:mm:ss") + "] ";
    Array.prototype.unshift.call(arguments, chalk.bold(timestamp));
    oldConsole.apply(this, arguments);
};

console.event = function(message){ console.log(chalk.bold.bgYellow(message))}