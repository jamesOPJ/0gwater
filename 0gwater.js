
var exec = require('child_process').exec;


main();

async function main() {


    exec('evmosd keys add wallet --dry-run',
        function (error, stdout, stderr) {
         var a = stdout.split(" ");
         console.log(a);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}