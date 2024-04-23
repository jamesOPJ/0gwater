const Captcha = require("@2captcha/captcha-solver");
const fetch = require("node-fetch");
const {sleep} = require("@2captcha/captcha-solver/dist/utils/generic");

var exec = require('child_process').exec;


var evmAddress;
var evmosAddress
main();

async function main() {


    exec('evmosd keys add wallet << EOF\n' +
        '11111111\n' +
        'y\n' +
        'EOF',
        function (error, stdout, stderr) {
         var a = stdout.split(" ");
         evmosAddress = a[2];
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
        ":authority":"faucet.0g.ai",
        ":method":"POST",
        ":path":"/api/faucet",
        ":scheme":"https",
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, br, zstd",
        "Accept-Language":"zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6",
        "Content-Length":"2083",
        "Content-Type":"text/plain;charset=UTF-8",
        "Cookie":"_ga=GA1.1.1036530886.1711628950; _ga_SE6RJSG9GC=GS1.1.1711628950.1.0.1711628966.0.0.0",
        "Origin":"https://faucet.0g.ai",
        "Referer":"https://faucet.0g.ai/",
        "Sec-Ch-Ua":'Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121',
        "Sec-Ch-Ua-Mobile":"?1",
        "Sec-Ch-Ua-Platform":"Android",
        "Sec-Fetch-Dest":"empty",
        "Sec-Fetch-Mode":"cors",
        "Sec-Fetch-Site":"same-origin",
        "User-Agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36"

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

    if ( msg.includes("Unable to send")){
        console.log("retry hcaptcha")
        hcaptcha()
    }

    if (msg.startsWith("0x")){
        console.log("get")
        for (let i = 0; i < 3; i++) {
            exec('evmosd q bank balances ' + evmosAddress, function (error, stdout, stderr) {
                console.log(stdout)
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            })
            await sleep(5000)
        }


    }



}