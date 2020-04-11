var table = document.createElement('table');

for(let i = 1; i < 10; i++){

    var row = document.createElement('tr');

    for(let j = 1; j < 10; j++){

        var cell = document.createElement('td');

        cell.appendChild(document.createTextNode(i*j));

        cell.style.padding = '2px';
        cell.style.width = '25px';
        cell.style.height = '25px';
        cell.style.border = '1px solid black';
        cell.style.margin = '1px';
        cell.style.textAlign = 'center'
        
        row.appendChild(cell);
    }
    table.appendChild(row);
}
document.body.appendChild(table)




var currentElem = null;

table.onmouseover = function(event){
    if (currentElem) return;

    let target = event.target.closest('td');

    if (!target) return;

    if (!table.contains(target)) return;

    if(target.parentElement){
       
        var parentOfParent = event.target.parentElement.parentElement;
        for(var i = 0; i < parentOfParent.rows.length; i++){
            for(var j = 0; j < parentOfParent.rows[i].cells.length; j++){
                parentOfParent.rows[i].cells[j].style.border = "1px solid black";
            }
        }

        var parentChildren = target.parentElement.children;
        for(var k = 0; k < parentChildren.length; k++){
            parentChildren[k].style.border = "1px solid red"
            
        }

        
        currentElem = target;

        target.style.background = 'rgb(142, 222, 130)';

        var parent = event.target.parentElement;
        var numberOfSelectedElementInRow = 0;
        for(var o = 0; o < parent.children.length; o++) {
            if(parent.children[o].style.background === 'rgb(142, 222, 130)') {
                numberOfSelectedElementInRow = o;
                break;
            } 
        }

        var parentOfParent = event.target.parentElement.parentElement;
        for(var i = 0; i < parentOfParent.rows.length; i++){
            parentOfParent.rows[i].cells[numberOfSelectedElementInRow].style.border = "1px solid red";
        }

    }

}

table.onmouseout = function(event) {

    if(event.fromElement.localName === 'td'){
        var parentOfParent = event.target.parentElement.parentElement;
        for(var i = 0; i < parentOfParent.rows.length; i++){
            for(var j = 0; j < parentOfParent.rows[i].cells.length; j++){
                parentOfParent.rows[i].cells[j].style.border = "1px solid black";
            }
        }
    }

    if(currentElem && currentElem.style){ 
          currentElem.style.background = '';
    }
 
    currentElem = null;

}

var divDeposit = document.createElement("div");
divDeposit.style.marginBottom = '15px';
divDeposit.innerText = "Enter your deposite ";
document.body.appendChild(divDeposit);

var inputDeposit = document.createElement("input");
inputDeposit.setAttribute("type", "number");
inputDeposit.setAttribute("id", "deposit");
divDeposit.appendChild(inputDeposit);


var divPrecent = document.createElement("div");
divPrecent.style.marginBottom = '15px';
divPrecent.innerText = "Enter your precent ";
document.body.appendChild(divPrecent);

var inputPrecent = document.createElement("input");
inputPrecent.setAttribute("type", "number");
inputPrecent.setAttribute("id", "precent");
divPrecent.appendChild(inputPrecent);

var calucateButton = document.createElement("button");
calucateButton.setAttribute("id", "calcBtn");
calucateButton.innerText = "Calculate";
calucateButton.style.marginBottom = '15px';
document.body.appendChild(calucateButton);

calucateButton.onclick = function() {
    alert((+inputDeposit.value * (+inputPrecent.value * 0.01)) + +inputDeposit.value) 
}




var divDepositAuto = document.createElement("div");
divDepositAuto.style.marginBottom = '15px';
divDepositAuto.innerText = "Enter your deposite ";
document.body.appendChild(divDepositAuto);

var inputDepositAuto = document.createElement("input");
inputDepositAuto.setAttribute("type", "number");
inputDepositAuto.setAttribute("id", "deposit");
divDepositAuto.appendChild(inputDepositAuto);


var divPrecentAuto = document.createElement("div");
divPrecentAuto.style.marginBottom = '15px';
divPrecentAuto.innerText = "Enter your precent ";
document.body.appendChild(divPrecentAuto);

var inputPrecentAuto = document.createElement("input");
inputPrecentAuto.setAttribute("type", "number");
inputPrecentAuto.setAttribute("id", "precent");
divPrecentAuto.appendChild(inputPrecentAuto);


var divResult = document.createElement("div");
divResult.style.marginBottom = '15px';
divResult.innerText = "Result ";
document.body.appendChild(divResult);

var result = document.createElement("textarea");
result.setAttribute("id", "resultAuto");
result.setAttribute( 'rows', '1');
divResult.appendChild(result);

function calc() {
    result.innerText = (+inputDepositAuto.value * (+inputPrecentAuto.value * 0.01)) + +inputDepositAuto.value
}

inputDepositAuto.oninput = calc; 
inputPrecentAuto.oninput = calc;



