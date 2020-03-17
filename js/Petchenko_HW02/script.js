
// //---- assign: evaluation ----

var a = 5;  
var b, c;

(b = (a * 5)); 
(b = (c = (b/2))); 

// //---- semicolon: error ----


alert("Сейчас будет ошибка")

[1, 2].forEach(alert)

var mistake = "mistake" alert(mistake)



// //---- semicolon: mistake ----


alert(text);
var text = confirm("Нажмите что-нибудь") ? "Вы нажали Yes" : "Вы нажали No";

// //----- Number: age -----

var age = +prompt('How old are you?');

if (age && age < 2020){
    
    alert( "You born in "  + (2020 - age));
} else {
    alert('You entered incorrect data');
}
 

// //----- Number: temperature -----


var convert = confirm('Do you want to convert celsius - fahrenheit or fahrenheit - celsius?');

if (convert) {

    var fahrenheit = +prompt('Enter volue in celsius');
    
    if (fahrenheit) {
        alert(Math.round((fahrenheit * 9 / 5) + 32) + ' fahrenheit');
    }else {
        alert('You entered incorrect data');
    }

} else{
    
    var celsius = +prompt('Enter volue in fahrenheit');

    if (celsius){
        alert(Math.round((celsius - 32) * 5/9) + ' celsius');
    }else {
        alert('You entered incorrect data');
    }
}

// //---- Number: divide ----

var firstValue = +prompt('Enter first value');
var secondValue = +prompt('Enter second value');
if (firstValue && secondValue){
    alert(Math.round(firstValue / secondValue));
}else{
    alert('You entered incorrect data');
}

// //----- Number: odd ----

var enterNumber = +prompt('Enter any number')

if(enterNumber){

    if(enterNumber % 2 == 0){
        alert('Even number');
    }else{
        alert('Odd number');
    }
    
}else{
    alert('You entered incorrect data');
}



// //----- String: greeting -----

var nameUser = prompt('Hello, new visitor, enter your name');
if (nameUser){
    alert('Welcome ' + nameUser + "!");
} else{
    alert("Sorry, you didn't write a name.");
}

// //----- String: lexics -----

var someTextIndexOf = prompt('Enter some text', 'Table');
alert(someTextIndexOf.indexOf('a'));

var someTextIncludes = prompt('Enter some next', 'Apple');
alert(someTextIncludes.includes('pp'));

//----- confirm,  Boolean,  Boolean: if -----

var genderUser = confirm('Hello, are you men or women?');
if (genderUser){
    var likeManCar = confirm('What would you like - Mercedes or BMW?')
    if (likeManCar){
        alert('You have a good taste!');
    }else {
        alert('I would prefer the first option.')
    }
} else {
    var likeWomanCar = confirm('What would you like - Bentley or Lexus');
    if (likeWomanCar){
        alert('This car is right for you!');
    } else{
        alert("It's a good car!");
    }

}


// //----- Array: real -----


var favouriteFood = ['Pizza', 'Burger', 'Shashlik'];

// // ----- Array: booleans -----

var arrBoolean = [genderUser, likeManCar, likeWomanCar];

// //----- Array: plus -----

var correctFood = favouriteFood[0] + favouriteFood[1];

favouriteFood.splice(2, 0, correctFood);

alert(favouriteFood);

// //----- Array: plus string -----

var plusFood = favouriteFood[0] + favouriteFood[1] + favouriteFood[3];

favouriteFood.splice(2, 0, plusFood);

alert(favouriteFood);

// //----- Object: real,   Object: change -----

var shoppingList = {
    sugar: '1 kg',
    tea: '1 box',
    milk: '2 liter',
    cookies: '0.5 kg'  
}
shoppingList['sugar'] = '2kg';
shoppingList.cookies = '1kg;';

alert(shoppingList.sugar);
alert(shoppingList.cookies);

// //----- Comparison if -----

var age = +prompt("Сколько вам лет?","");
if (age < 0){
    alert('этого не может быть');
}
else if(age < 6){
    alert('малыш')
}
else if ((age >= 6) && (age < 18)){
    alert("школьник");
}
else if ((age >= 18) && (age < 30)){
    alert("молодеж");
}
else if ((age >= 30) && (age < 45)){
    alert("зрелость");
}
else if ((age >= 45) && (age < 60)){
    alert("закат");
}
else if (age >= 60){
    alert("как пенсия?");
}
else {
    alert("то ли киборг, то ли ошибка"); 
}


// // ----- Comparison: sizes ----

var size = +prompt('Enter your russian size clothing ')
if (size < 40){
    alert('You have child size.')
}
else if (size == 40){
    alert('Your size: S');
}
else if (size == 42){
    alert('Your size: M');
}
else if (size == 44 || size == 46){
    alert('Your size: L');
}
else if (size == 48 || size == 50){
    alert('Your size: XL');
}
else if (size == 52 || size == 54){
    alert('Your size: XXL');
}
else if (size > 54){
    alert('You are very big man');
}
else {
    alert('Unknown size')
}


// //----- Comparison: object -----

var sizeCloth = {
    40: 'S',
    42: 'M',
    44: 'L',
    46: 'L',
    48: 'XL',
    50: 'XL',
    52: 'XXL',
    54: 'XXL'
}
var userSize = prompt('Enter your size', '');

if(sizeCloth[userSize]){
    alert('Your european size: ' + sizeCloth[userSize]);
} else {
    alert('This size does not exist');
}


// //----- Ternary -----

confirm('Hello, are you man or woman?') ? alert('You are man') : alert ('You are woman');



// //----- Синий пояс Number: flats ------

var floor = +prompt('Enter number of floors');
var apartment = +prompt('Enter number of apartment');
if((floor && apartment) > 0){
    var numberOfApartPerPorch = floor * apartment;

    var numberApart = +prompt('Enter a number of desired apartment: ');
    if(numberApart > 0){
        var numberPorch = Math.ceil(numberApart / numberOfApartPerPorch);


        var numberOfFirstApartOfPorch = (numberPorch * numberOfApartPerPorch) - numberOfApartPerPorch + 1;
        var maxApartNumberOfFloor = numberOfFirstApartOfPorch + apartment - 1;

        var numberOfFloor = 1;
        while (numberApart > maxApartNumberOfFloor) {
            numberOfFloor++;
            maxApartNumberOfFloor += apartment;
        }
        
        
        alert('Porch: ' + numberPorch + '. Floor: ' + numberOfFloor);
    }else {
        alert('Incorrect data!');
    }
    
   
} else {
    alert('Incorrect data!');
}

