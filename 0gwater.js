
var exec = require('child_process').exec;


main();

async function main() {

    var address;

    exec('evmosd keys add wallet --dry-run',
        function (error, stdout, stderr) {
         var a = stdout.split(" ");
         address = a[2];
         console.log(a);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    exec('evmosd debug addr ' + address,
        function (error, stdout, stderr) {

            console.log(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}