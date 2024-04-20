
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
                    console.log(stdout);

                    var ary1 = stdout.split("\n")
                    console.log(ary1);

                    var ary2 = ary1[2].split(" ")
                    console.log(ary2);
                    console.log(ary2[2]);

                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });




}