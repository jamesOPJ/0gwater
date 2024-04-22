const Captcha = require("@2captcha/captcha-solver");
const fetch = require("node-fetch");

var exec = require('child_process').exec;

var address;


main();

async function main() {


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
                    hcaptcha();
                });
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });




}

async function hcaptcha(){

    const solver = new Captcha.Solver("430a15396c13e2355dc478a8ee3c8037")
    solver.hcaptcha({
        pageurl: "https://faucet.0g.ai/",
        sitekey: "06ee6b5b-ef03-4491-b8ea-01fb5a80256f"
    })
        .then((res) => {
            console.log(res);
            faucet(res.data)
        })
        .catch((err) => {
            console.log(err);
        })

}

async function faucet(hcaptchaToken){
    const method = 'POST'
    const url = 'https://faucet.0g.ai/api/faucet'

    let body = {
        "address":address,
        "hcaptchaToken": hcaptchaToken
    }

    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body)

    })
        .then((response) => {
            console.log(response.data);

        })
        .catch((err) => {
            console.log(err);
        })



}