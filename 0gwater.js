const Captcha = require("@2captcha/captcha-solver");
const fetch = require("node-fetch");

var exec = require('child_process').exec;


var evmAddress;
main();

async function main() {


    exec('evmosd keys add wallet --dry-run',
        function (error, stdout, stderr) {
         var a = stdout.split(" ");
         var evmosAddress = a[2];
         console.log(evmosAddress);
            exec('evmosd debug addr ' + evmosAddress,
                function (error, stdout, stderr) {
                    console.log(stdout);

                    var ary1 = stdout.split("\n")
                    console.log(ary1);

                    var ary2 = ary1[2].split(" ")
                    console.log(ary2);
                    console.log(ary2[2]);
                    evmAddress = ary2[2]
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
        "address":evmAddress,
        "hcaptchaToken": hcaptchaToken
    }

    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        "Content-Type": "application/json; charset=utf-8",
        "Vary":"Accept-Encoding",
        "Server": "nginx/1.18.0 (Ubuntu)"
    })
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            console.log(jsonData);
            return jsonData
        }).catch((err) => {
            console.log('錯誤:', err);
        });

    console.log(res.message)
    op(res.message)
}
//{ message: 'Please wait 24 hours before requesting again' }
// {message: '0xfbf24bd432f75be2ad0eb41f9da1fc697da16778332eef5e8c656b8e82e05535'}

async function op(msg) {

    if ( msg.includes("hours before requesting again")){
        console.log("got")
    }

    if (msg.startsWith("0x")){
        console.log("get")

    }



}