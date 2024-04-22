const fetch = require("node-fetch");
const Captcha = require("@2captcha/captcha-solver")

console.log(123123)
hcaptcha();
// faucet("123");

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



async function main() {
    const method = 'POST'
    const url = 'https://api.2captcha.com/createTask'

    let body = {
        "clientKey":"430a15396c13e2355dc478a8ee3c8037",
        "task": {
            "type":"HCaptchaTaskProxyless",
            "websiteURL":"https://faucet.0g.ai/",
            "websiteKey":"06ee6b5b-ef03-4491-b8ea-01fb5a80256f"
        }
    }

    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body)

    })
        .then(response => {
            console.log(response)

            return response.json()
        })

    console.log(res)

}



async function faucet(hcaptchaToken){
    const method = 'POST'
    const url = 'https://faucet.0g.ai/api/faucet'

    let body = {
        "address":"0xd00751EF39ff5ffc709bBdC51dD43f3D8352b90f",
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