
var exec = require('child_process').exec;


main();

async function main() {


    exec('evmosd keys add wallet --dry-run',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}