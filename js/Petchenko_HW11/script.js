let messageId = 0;

let send = document.getElementById("send");
let msg = document.getElementById("msg");
let nick = document.getElementById("nick");
let chat = document.getElementById("chat");


/********** First Part HW **********/

//function jsonPost(url, data) {
//    return new Promise((resolve, reject) => {
//        var x = new XMLHttpRequest();
//        x.onerror = () => reject(new Error('jsonPost failed'))
//        //x.setRequestHeader('Content-Type', 'application/json');
//        x.open("POST", url, true);
//        x.send(JSON.stringify(data))

//        x.onreadystatechange = () => {
//            if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
//                resolve(JSON.parse(x.responseText))
//            }
//            else if (x.status != 200) {
//                reject(new Error('status is not 200'))
//            }
//        }
//    })
//}


// getMsg()
// setInterval(getMsg, 2500);

// send.onclick = () => {
//     jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nick.value, message: msg.value })
//         .then(d => console.log(d))
//         .then(msg.value = '')
//         .then(getMsg());
// };

// function getMsg() {

//     jsonPost("http://students.a-level.com.ua:10012", { func: "getMessages", messageId })
//         .then(d => {
//             for (let sentMessages of d.data) {
//                 let div = document.createElement('div')
//                 div.innerHTML = `<b>${sentMessages.nick}</b> : ${sentMessages.message} <em style="margin-left: 200px">${new Date(sentMessages.timestamp).toGMTString()}</em>`;
//                 chat.prepend(div);
//             }
//             messageId = d.nextMessageId
//         })
// }


/*********** Second Part HW ********/

async function jsonPost(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('status is not 200');
    } else {
        return await response.json();
    }
}

async function sendMessage(nickUser, msgUser) {
    await jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nickUser, message: msgUser })
    await getMessages()
}




async function getMessages() {
    let d = await jsonPost("http://students.a-level.com.ua:10012", { func: "getMessages", messageId });
    for (let msg of d.data) {
        let div = document.createElement('div')
        div.innerHTML = `<b>${msg.nick}</b> : ${msg.message} <em style="margin-left: 200px">${new Date(msg.timestamp).toGMTString()}</em>`;
        chat.prepend(div);
    }
    messageId = d.nextMessageId;
}


async function sendAndCheck() {
    await sendMessage(nick.value, msg.value);
}


async function checkLoop() {
    let start = false;
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
    while (!start) {
        await delay(2500);
        getMessages();
    }
}

send.onclick = () => {
    sendAndCheck();
    msg.value = '';
}

getMessages();
checkLoop();