const request = require('request');
const cheerio = require('cheerio');

const url = 'https://iplist.cc/api';
const myIp = '124.218.152.78';
let currentIp = '';
let preMsg = '';

main();

function myLog(msg) {
    if (preMsg != msg) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(dateTime + "> " + msg);
        preMsg = msg;
    }

}

async function main() {
    myLog('system start');

    var urls = [
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned104wnyvzsly88ge00mq82ymgtzgn6k2m2a2njq9",//
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned1ux4p2ngv53a80h7gt3lhn7hkenns5hw3cswe8y",//
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned13uqvg4pr06dle2suawehd4frjyfxwam403hxz2",//
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned1xy0xy2a0kqsfnjew5t70gf6s863jktsrt0f4xy",//
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned1yxxg7f6zqe9ppxrk5fk8tcdqcmpvy7pr0lpqj2"//
    ]
    let count = 0;
    setInterval(() => {
        // myLog('new round');
        if (count >= urls.length) count = 0;
        request(urls[count], function (error, response, body) {

            if (!error) {
                myLog('success:' + urls[count]);
                myLog(response.body)
            } else {
                myLog('fail:' + urls[count]);
                // throw new Error(error);
                myLog(error);

            }
            count ++;
        });
        // task();
        // request(url, function (error, response, body) {
        //
        //     if (!error) {
        //         if (currentIp !== JSON.parse(body).ip && 'TW' != JSON.parse(body).countrycode) {
        //             currentIp = JSON.parse(body).ip;
        //             myLog(currentIp);
        //             task();
        //         } else {
        //             // myLog('ip repeat');
        //         }
        //     }
        //     else {
        //         // throw new Error(error);
        //         // myLog(error);
        //     }
        //
        // });


    }, 900000);


}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function task() {

    var urls = [

        "https://faucet.alignedlayer.com/send/alignedlayer/aligned1ux4p2ngv53a80h7gt3lhn7hkenns5hw3cswe8y",
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned13uqvg4pr06dle2suawehd4frjyfxwam403hxz2",
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned1xy0xy2a0kqsfnjew5t70gf6s863jktsrt0f4xy",
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned1yxxg7f6zqe9ppxrk5fk8tcdqcmpvy7pr0lpqj2",
        "https://faucet.alignedlayer.com/send/alignedlayer/aligned104wnyvzsly88ge00mq82ymgtzgn6k2m2a2njq9"
    ]

    for (let i = 0; i < urls.length; i++) {
        setTimeout(() => {
            console.log(i)
        }, 10)
        //         request(urls[i], function (error, response, body) {
        //
        //             if (!error) {
        //                 myLog('success:' + urls[i]);
        //                 myLog(response.body)
        //             }
        //             else {
        //                 myLog('fail:' + urls[i]);
        //                 // throw new Error(error);
        //                 myLog(error);
        //
        //             }
        //
        //         });
        await delay(60000)
        console.log(i)
    }

    // await urls.forEach(_url => {
    //     setTimeout(() => {
    //         request(_url, function (error, response, body) {
    //
    //             if (!error) {
    //                 myLog('success:' + _url);
    //                 myLog(response.body)
    //             }
    //             else {
    //                 myLog('fail:' + _url);
    //                 // throw new Error(error);
    //                 myLog(error);
    //
    //             }
    //
    //         });
    //      }, getRandomInt(3)*10000);
    // });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
  