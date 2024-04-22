const fetch = require("node-fetch");
const Captcha = require("@2captcha/captcha-solver")


hcaptcha();


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
        "address":"0x076c7E08B9e8CD4E004911E1Aa04B80a5A748ae4",
        "hcaptchaToken": hcaptchaToken
    }

    const res = await fetch(url, {
        method: method,
        body: JSON.stringify(body)

    })
        .then((response) => {
            console.log(response);

            return response.json()
        })
        .catch((err) => {
            console.log(err);
        })



}