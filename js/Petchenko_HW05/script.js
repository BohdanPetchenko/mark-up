var task = prompt('Enter a task');
switch(task){
    case "switch: sizes" : switchSizes();
        break;
    case "switch: if" : switchIf();
        break;
    case "prompt: or" : promptOr();
        break;
    case "confirm: or this days" : confirmOr();
        break;
    case "confirm: if this days" : confirmIf();
        break;
    case "triple prompt": triplePrompt();
        break;
    case "default: or" : defaultOr();
        break;
    case "default: if" : defaultIf();
        break;
    case "login and password" : loginAndPassword();
        break;
    case "currency calc": ;
    case "currency calc: improved": ;
    case "currency calc: two rates": ;
    case "currency calc: if": currencyCalc();
        break;
    case "scissors": scissors();
        break;
    case "Задание на синий пояс" : blueBelt();
        break;
    default : alert('Incorrect data');
}


/***** switch: sizes *****/

function switchSizes(){
    var size = prompt("Enter your russian size");
    switch (size){
        case '40': alert('Your american size "S"');
            break;
        case '42': alert('Your american size "M"');
            break;
        case '44': ;
        case '46': alert('Your american size "L"');
            break;
        case '48': ;
        case '50': alert('Your american size "XL"');
            break;
        case '52': ;
        case '54': alert('Your american size "XXL"');
            break;
        default: alert('You entered an incorrect size');
    }
};



/***** switch: if *****/

function switchIf(){
    var color = prompt("Введите цвет","");
    if (color == 'red'){

        document.write("<div style='background-color: red;'>красный</div>");
        document.write("<div style='background-color: black; color: white;'>черный</div>");

    }else if (color == 'black'){

        document.write("<div style='background-color: black; color: white;'>черный</div>");

    } else if (color == 'blue'){

        document.write("<div style='background-color: blue;'>синий</div>");
        document.write("<div style='background-color: green;'>зеленый</div>");

    } else if (color == 'green'){

        document.write("<div style='background-color: green;'>зеленый</div>");

    } else{

        document.write("<div style='background-color: gray;'>Я не понял</div>");
    }
};



/***** prompt: or *****/
function promptOr(){
    var age = prompt('How old are you?');
    var date = new Date();

    if (age == null || age == "" || isNaN(age)){
    
        alert('You entered incorrect data')
    } else if (age < date.getFullYear()){
        
        alert( "You born in "  + (date.getFullYear() - age));
    } else {

        alert("It is impossible")
    }
};



/***** confirm: or this days *****/
function confirmOr(){
    var shoping = confirm('Shopping?') ? alert("Let's go!") : alert ('You are terrible');
};


/***** confirm: if this days *****/

function confirmIf(){
    shoping2 = confirm('Shopping?');
    if(shoping2){
        alert("Let's go!")
    } else{
        alert ('You are terrible')
    }
};



/****** triple prompt *****/
function triplePrompt(){
    var name = prompt('Enter your name');
    var surname = prompt('Enter your surname');
    var fatherName = prompt('Enter your father name');
    alert (`${surname} ${name} ${fatherName}`)
};



/****** default: or *****/
function defaultOr(){
    var name = prompt('Enter your name') || 'Ivan';
    var surname = prompt('Enter your surname') || 'Ivanov';
    var fatherName = prompt('Enter your father name')|| 'Ivanovich';
    alert (`${surname} ${name} ${fatherName}`)
};



/****** default: if *****/

function defaultIf(){
    var name = prompt('Enter your name');
    if(name){}else{name = 'Ivan'};

    var surname = prompt('Enter your surname');
    if(surname){}else{surname = 'Ivanov'};

    var fatherName = prompt('Enter your father name')|| 'Ivanovich';
    if(fatherName){}else{fatherName = 'Ivanich'};

    alert (`${surname} ${name} ${fatherName}`)
};


/***** login and password *****/

function loginAndPassword(){
    var credentials = {
        login: 'admin',
        password: 'qwerty',
    };

    var login = prompt('Enter login')
    if(credentials.login == login){
        var password = prompt('Enter password')
        if (credentials.password == password){
            alert('Hello, User')
        } else {
            alert ('Password is incorrect')
        }
    }else{
        alert ('Login is incorrect')
    }
};


/***** currency calc, currency calc: improved, currency calc: two rates, currency calc: if *****/

function currencyCalc(){
    var currency = prompt("Enter, in which currency do you want to convert, usd or eur");

    var currencyLowerCase = currency.toLowerCase();

    confirm('What do you want: to buy or sell currency') ? buyCurrency() : sellCurrency();


    // var actionWithCurrency = confirm('What do you want: to buy or sell currency');
    // if(actionWithCurrency) {buyCurrency()} else {sellCurrency()}; 

    function sellCurrency(){

        let sumCurrency = +prompt('Enter your amount of money');
        switch(currencyLowerCase){
            case 'usd': (sumCurrency == null || sumCurrency =="" || isNaN(sumCurrency)) ? alert('You enter incorrect data') : alert(sumCurrency * 27.5);
                break;
            case 'eur': (sumCurrency == null || sumCurrency =="" || isNaN(sumCurrency)) ? alert('You enter incorrect data') : alert(sumCurrency * 30.15);
                break;
            default: alert('You enter incorrect data');
        }
    };

    function buyCurrency(){
        let sumHryvnia = +prompt('Enter your amount of money');
        
        switch(currencyLowerCase){
            case 'usd': (sumHryvnia == null || sumHryvnia =="" || isNaN(sumHryvnia)) ? alert('You enter incorrect data') : alert(sumHryvnia / 28);
                break;
            case 'eur': (sumHryvnia == null || sumHryvnia =="" || isNaN(sumHryvnia)) ? alert('You enter incorrect data') : alert(sumHryvnia / 30.86);
                break;
            default: alert('You enter incorrect data');
        }
    }
};



/***** scissors *****/

function scissors(){
    var usersFigure = prompt("Enter a figure that you think will win: 'rock', 'scissors' or 'paper'!", 'rock');
    if (usersFigure == "rock" || usersFigure == 'scissors' || usersFigure == 'paper'){
        alert(`You enter a ${usersFigure}`)    
    }else {
        alert('You enter incorrect data');
        return;
    }

    var programmeFigure = Math.random()

    if (programmeFigure < 0.334){
        programmeFigure = 'rock';
        alert(`Computer enter a ${programmeFigure}`);
    } else if (programmeFigure <= 0.667) {
        programmeFigure = 'scissors';
        alert(`Computer enter a ${programmeFigure}`);
    }else {
        programmeFigure = 'paper';
        alert(`Computer enter a ${programmeFigure}`);
    }


    if (programmeFigure.length === usersFigure.length){
        alert('The result is a tie!')
    } else if(programmeFigure === 'rock'){

        if(usersFigure ==='scissors'){
            alert('rock wins!')
        } else{
            alert('paper wins!')
        }

    } else if(programmeFigure === 'paper'){

        if(usersFigure === 'rock'){
            alert('paper wins!')
        } else{
            alert('scissors wins!')
        }

    } else if (programmeFigure === 'scissors'){
        if(usersFigure === 'paper'){
            alert('scissors wins!')
        } else{
            alert('rock wins!')
        }
    }

};





/***** Синий пояс *****/
function blueBelt(){
    var currency = prompt("Enter, in which currency do you want to convert, usd or eur");

    var currencyLowerCase = currency.toLowerCase();

    confirm('What do you want: to buy or sell currency') ? buyCurrency() : sellCurrency();

    function sellCurrency(){

        let sumCurrency = +prompt('Enter your amount of money');
        var ratiosSell = {
            usdSell: 27.5,
            eurSell:30.15
        }

        if (currencyLowerCase == 'usd'){
        
            (sumCurrency == null || sumCurrency =="" || isNaN(sumCurrency)) ? alert('You enter incorrect data') : alert(sumCurrency * ratiosSell.usdSell);
        
        }else if(currencyLowerCase == 'eur'){
        
            (sumCurrency == null || sumCurrency =="" || isNaN(sumCurrency)) ? alert('You enter incorrect data') : alert(sumCurrency * ratiosSell.eurSell);
        
        } else {
            alert('You enter incorrect data');
        }
    };

    function buyCurrency(){

        let sumHryvnia = +prompt('Enter your amount of money');
        var ratiosBuy = {
            usdBuy: 28,
            eurBuy: 30.86        
        }

        if (currencyLowerCase == "usd"){
        
            (sumHryvnia == null || sumHryvnia =="" || isNaN(sumHryvnia)) ? alert('You enter incorrect data') : alert(sumHryvnia / ratiosBuy.usdBuy);
        
        }else if(currencyLowerCase === 'eur'){
        
            (sumHryvnia == null || sumHryvnia =="" || isNaN(sumHryvnia)) ? alert('You enter incorrect data') : alert(sumHryvnia / ratiosBuy.eurBuy);
        
        } else {
            alert('You enter incorrect data');
        }
    
    }
};



