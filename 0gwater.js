
var exec = require('child_process').exec;

main();

async function main() {

    var address;

    exec('evmosd keys add wallet --dry-run',
        function (error, stdout, stderr) {
         var a = stdout.split(" ");
         address = a[2];
         console.log(address);
            exec('evmosd debug addr ' + address,
                function (error, stdout, stderr) {
                    var ary = stdout.split(" ")
                    console.log(stdout);

                    console.log(ary);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });




}