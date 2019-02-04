var moduleRoot = require('app-root-path').resolve('./');
var config = require(moduleRoot + 'config/config')(moduleRoot);

function runTask(task) {
    var taskToRun = config.assetDirs.tasks + task;

    return require(taskToRun)(config);
}

var tasks = ['clean', 'styles', 'scripts', 'watch'];
for (let index in tasks) {
    runTask(tasks[index]);
}