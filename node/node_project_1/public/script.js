let containerMessages = document.getElementById('containerMessages');
let nickInput = document.getElementById('nick');
let msgInput = document.getElementById('msg');
let sendBtn = document.getElementById('sendBtn');
let deleteBtn = document.getElementById('deleteBtn');
let replyBtn = document.getElementById('replyBtn');
let editBtn = document.getElementById('editBtn');
let applyButton = document.getElementById('applyBtn');
let cancelEditButton = document.getElementById('cancelEditBtn');
let sendReplyButton = document.getElementById('acceptReplyBtn');
let cancelReplyButton = document.getElementById('cancelReplyBtn');



let currentState = {
    nick: nickInput.value,
    msg: msgInput.value
};

function returnCurrentState() {
    nickInput.value = currentState.nick;
    msgInput.value = currentState.msg;
    url.innerHTML = url.href = urlImg.src = file.value = '';
    sendBtn.disabled = !nickInput.value || !msgInput.value ? true : false;
    checkSelectedMsgs();
}

let editableMsgId = '';
let isEditInProgress = false;

replyBtn.disabled = editBtn.disabled = deleteBtn.disabled = sendBtn.disabled = true;
applyButton.hidden = cancelEditButton.hidden = sendReplyButton.hidden = cancelReplyButton.hidden = true;

(async function checkLoop() {
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
    while (true) {
        await delay(2500);
        getMsg();
    }
})();

function getMsg() {
    fetch(`/message`)
        .then(res => res.json())
        .then(data => showMsg(data));
}

function checkSelectedMsgs() {
    let selectedMessages = document.querySelectorAll("[selected='true']");

    if (selectedMessages.length === 0) replyBtn.disabled = editBtn.disabled = deleteBtn.disabled = true;
    if (selectedMessages.length === 1) deleteBtn.disabled = replyBtn.disabled = editBtn.disabled = false;
    if (selectedMessages.length > 1) replyBtn.disabled = editBtn.disabled = true;
}

function onMsgClicked(event) {
    let element = event.srcElement;
    if (!element.getAttribute('dbid')) {
        element = event.srcElement.parentElement;
    };
    if (isEditInProgress || element.getAttribute('replied')) return;
    let isSelected = element.getAttribute('selected') === 'true' ? true : false;
    if (isSelected) {
        element.style.border = '';
        element.setAttribute('selected', false);
    } else {
        element.style.border = "thick solid blue";
        element.setAttribute('selected', true);
    }

    checkSelectedMsgs();
}

function showMsg(arr) {

    let generateMsgElement = function (msg, onClickCallback) {
        let result;
        let { repliedMsg, nick, message, _id, link } = msg;
        if (repliedMsg) {
            let repliedMsgValue = document.createElement('span');
            repliedMsgValue.style['margin-left'] = '30px';
            repliedMsgValue.style.background = 'purple';
            repliedMsgValue.style.border = '1px solid black';
            repliedMsgValue.style['border-radius'] = '5px';
            repliedMsgValue.style['font-size'] = '25px';
            repliedMsgValue.setAttribute('replied', true);

            repliedMsgValue.innerHTML = `${repliedMsg.nick} : ${repliedMsg.message}`;

            let caseRepliedMsg = document.createElement('div');
            caseRepliedMsg.style.display = 'inline';
            caseRepliedMsg.appendChild(repliedMsgValue);
            caseRepliedMsg.setAttribute('dbId', repliedMsg.id);
            caseRepliedMsg.setAttribute('replied', true);

            let msgValue = document.createElement('p');
            msgValue.innerHTML = `${nick} : ${message}`;

            let caseMsg = document.createElement('div');
            caseMsg.appendChild(caseRepliedMsg);
            caseMsg.setAttribute('class', 'caseMsg');
            caseMsg.setAttribute('dbId', _id);
            caseMsg.setAttribute('nick', nick);
            caseMsg.setAttribute('message', message);
            caseMsg.setAttribute('selected', false);
            caseMsg.appendChild(msgValue);


            if (link) {
                let a = document.createElement('a');
                a.setAttribute('href', link);
                a.style.display = 'block';
                a.innerHTML = link;
                let img = document.createElement('img');
                img.setAttribute('src', link);
                img.setAttribute('alt', '');
                img.style['max-width'] = '300px';
                caseMsg.appendChild(a);
                caseMsg.appendChild(img);
            }

            caseMsg.onclick = onClickCallback;
            result = caseMsg;
        }
        else {
            let caseMsg = document.createElement('div');
            caseMsg.setAttribute('class', 'caseMsg');
            caseMsg.setAttribute('dbId', _id);
            caseMsg.setAttribute('selected', false);
            caseMsg.setAttribute('nick', nick);
            caseMsg.setAttribute('message', message);

            let p = document.createElement('p');
            p.innerHTML = `${nick} : ${message}`;

            caseMsg.appendChild(p);

            if (link) {
                let a = document.createElement('a');
                a.setAttribute('href', link);
                a.style.display = 'block';
                a.innerHTML = link;
                let img = document.createElement('img');
                img.setAttribute('src', link);
                img.setAttribute('alt', '');
                img.style['max-width'] = '300px';
                caseMsg.appendChild(a);
                caseMsg.appendChild(img);
            }

            caseMsg.onclick = onClickCallback;
            result = caseMsg;
        }
        return result;
    };

    for (let i = 0; i < arr.length; i++) {
        let { nick, message, _id } = arr[i];
        let isAlreadyRendered = false;
        for (let j = 0; j < containerMessages.children.length; j++) {
            let dbId = containerMessages.children[j].getAttribute('dbId');
            let existingNick = containerMessages.children[j].getAttribute('nick');
            let existingMsg = containerMessages.children[j].getAttribute('message');
            if (dbId === _id) {
                if (nick !== existingNick || message !== existingMsg) {
                    let isSelected = false;
                    isSelected = containerMessages.children[j].getAttribute('selected') === 'true' ? true : false;
                    let msg = generateMsgElement(arr[i], onMsgClicked);
                    if (isSelected) {
                        msg.style.border = "thick solid blue";
                        msg.setAttribute('selected', true);
                    }
                    containerMessages.children[j].replaceWith(msg);
                    checkSelectedMsgs();
                }
                isAlreadyRendered = true;
            }
        }
        if (isAlreadyRendered || !nick || !message) continue;
        containerMessages.appendChild(generateMsgElement(arr[i], onMsgClicked));
    }

}

sendBtn.onclick = () => {
    if (!nickInput.value || !msgInput.value) return;

    let msg = {
        nick: nickInput.value,
        message: msgInput.value
    };
    if (file.files[0]) {
        msg.link = url.href;
    }

    fetch("/message", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(msg)
    }).then(getMsg());

    currentState.nick = currentState.msg = '';
    returnCurrentState();
};

deleteBtn.onclick = () => {
    let selectedMessages = document.querySelectorAll("[selected='true']");
    for (let i = 0; i < selectedMessages.length; i++) {
        let dbId = selectedMessages[i].getAttribute('dbId');
        selectedMessages[i].remove();
        fetch(`/message/${dbId}`, {
            method: "DELETE"
        }).then(getMsg());
    }
    returnCurrentState();
};

editBtn.onclick = () => {
    isEditInProgress = true;

    replyBtn.hidden = editBtn.hidden = deleteBtn.hidden = sendBtn.hidden = true;
    applyButton.hidden = cancelEditButton.hidden = false;

    currentState.nick = nickInput.value;
    currentState.msg = msgInput.value;

    let selectedMessage = document.querySelector("[selected='true']");

    editableMsgId = selectedMessage.getAttribute('dbId');
    nickInput.value = selectedMessage.getAttribute('nick');
    msgInput.value = selectedMessage.getAttribute('message');
};

applyButton.onclick = () => {
    fetch(`/message/${editableMsgId}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ nick: nickInput.value, message: msgInput.value })
    }).then(getMsg());

    replyBtn.hidden = editBtn.hidden = deleteBtn.hidden = sendBtn.hidden = false;
    applyButton.hidden = cancelEditButton.hidden = true;
    isEditInProgress = false;
    returnCurrentState();
};

cancelEditButton.onclick = () => {
    replyBtn.hidden = editBtn.hidden = deleteBtn.hidden = sendBtn.hidden = false;
    applyButton.hidden = cancelEditButton.hidden = true;
    isEditInProgress = false;
    returnCurrentState();
};

replyBtn.onclick = () => {
    isEditInProgress = true;

    replyBtn.hidden = editBtn.hidden = deleteBtn.hidden = sendBtn.hidden = true;
    sendReplyButton.hidden = cancelReplyButton.hidden = false;

    currentState.nick = nickInput.value;
    currentState.msg = msgInput.value;
};

sendReplyButton.onclick = () => {
    if (!nickInput.value || !msgInput.value) {
        returnCurrentState();
        return;
    }

    let selectedMessage = document.querySelector("[selected='true']");

    repliedMsgId = selectedMessage.getAttribute('dbId');
    repliedMsgNick = selectedMessage.getAttribute('nick');
    repliedMsgText = selectedMessage.getAttribute('message');

    let msg = {
        repliedMsg: {
            id: repliedMsgId,
            nick: repliedMsgNick,
            message: repliedMsgText
        },
        nick: nickInput.value,
        message: msgInput.value
    };

    if (file.files[0]) {
        msg.link = url.href;
    };

    fetch("/message", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(msg)
    }).then(getMsg());

    replyBtn.hidden = editBtn.hidden = deleteBtn.hidden = sendBtn.hidden = false;
    sendReplyButton.hidden = cancelReplyButton.hidden = true;
    isEditInProgress = false;
    returnCurrentState();
};

cancelReplyButton.onclick = () => {
    replyBtn.hidden = editBtn.hidden = deleteBtn.hidden = sendBtn.hidden = false;
    applyButton.hidden = cancelEditButton.hidden = sendReplyButton.hidden = cancelReplyButton.hidden = true;
    isEditInProgress = false;
    returnCurrentState();
};

nickInput.onkeyup = () => {
    sendBtn.disabled = !nickInput.value || !msgInput.value ? true : false;
};

msgInput.onkeyup = () => {
    sendBtn.disabled = !nickInput.value || !msgInput.value ? true : false;
};

file.onchange = async () => {
    url.innerHTML = url.href = urlImg.src =
        "/" +
        (await (
            await fetch("/file", {
                method: "POST",
                body: file.files[0]
            })
        ).text());
};

