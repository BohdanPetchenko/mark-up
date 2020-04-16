const socket = io("http://socketchat.fs.a-level.com.ua/");


var divInputName = document.createElement("div");
divInputName.style.marginBottom = '15px';
divInputName.innerText = "Your NickName ";
document.body.appendChild(divInputName);

var inputName = document.createElement("input");
inputName.setAttribute("type", "text");
inputName.setAttribute("id", "name");
divInputName.appendChild(inputName);

var divInputMessage = document.createElement("div");
divInputMessage.style.marginBottom = '15px';
divInputMessage.innerText = "Your Message ";
document.body.appendChild(divInputMessage);

var inputMessage = document.createElement("input");
inputMessage.setAttribute("type", "text");
inputMessage.setAttribute("id", "message");
divInputMessage.appendChild(inputMessage);

var sendButton = document.createElement("button");
sendButton.setAttribute("id", "send");
sendButton.style.marginLeft = '150px';
sendButton.innerText = "Send!";
document.body.appendChild(sendButton);

var chatDiv = document.createElement("div");
chatDiv.style.width = '500px';
chatDiv.style.height = '300px';
chatDiv.style.border = '1px solid black';
chatDiv.style.margin = '15px';
chatDiv.style.overflow = 'auto';
document.body.appendChild(chatDiv);

function img(link){
	let img = document.createElement("img");
	img.setAttribute("src", 'https://www.webfx.com/tools/emoji-cheat-sheet/' + link);
    img.setAttribute("alt", "Png");
    return img.outerHTML;
}

socket.on('msg', msg => {

    var pNick = document.createElement("p");
    pNick.innerText = `Nick: ${msg.nick}`;
    chatDiv.appendChild(pNick);

    var pMessage = document.createElement("p");


    for (var name in smilies) {
        while (msg.message.indexOf(`:${name}:`) !== -1) {
            msg.message = msg.message.replace(`:${name}:`, img(smilies[name]));
        }
    }

    pMessage.innerHTML = `Message: ${msg.message}`;
    chatDiv.appendChild(pMessage);
})

sendButton.onclick = function() {
    socket.emit('msg', { nick: inputName.value, message: inputMessage.value });
    inputMessage.value = '';
}






