/***** makeProfileTimer *****/

function makeProfileTimer(){

    let firstTime = performance.now()

    var dataSecondTimer = function() {
        let secondTime = performance.now();
        let result = secondTime - firstTime;

        return result
    }
    return dataSecondTimer
}


function doSomething(){
    var somethingBad = Math.random() > 0.5;
    if (somethingBad){
        console.log("Something bad happens");
        return;
    }
    console.log("All OK!");
}


var timer = makeProfileTimer()
doSomething();  
console.log(timer() + ' milliseconds'); 


/***** makeSaver *****/

function makeSaver(someFunc){

    let isAlreadyRun;
    let save;
    
    return function hold (){
        if(!isAlreadyRun){
            save = someFunc();
            isAlreadyRun = true;
        }
        return save;
    }
}

var saver = makeSaver(Math.random) 

var value1 = saver()              
var value2 = saver()              

console.log(value1 === value2)            

var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
var value3 = saver2()
var value4 = saver2()

console.log(value3 === value4) 

/***** Final Countdown *****/

function countdown(countdown){
    let value = countdown;
    
    setTimeout(function go() {
        console.log(value);

        if (value > 1){
            setTimeout(go, 1000);
        } else {console.log('Поехали!')}
        value--;
    }, 1000);
    
}
countdown(5)


/***** myBind *****/

var myBind = function(fn, context, someArr) {
     
    return function(...params){
        
        let filt = arrFiltered();

        function arrFiltered(){
            for(let itemSomeArr of someArr){
                for(let i=0; i < [...params].length; i++){
                    if(itemSomeArr == undefined){
                        someArr.splice(someArr.indexOf(itemSomeArr),1, [...params][i])
                    
                    }
                }
            }
            return someArr
        };
        // arrFiltered.unshift(...params)
        console.log(fn.apply(context,[...filt]))
        return fn.apply(context,[...filt])
    }
   
    
};


var pow5 = myBind(Math.pow, Math, [undefined, 5]) // первый параметр - функция для биндинга значений по умолчанию, 
                                                  // второй - this для этой функции, третий - массив, в котором undefined означает
                                                  // параметры, которые должны передаваться при вызове,
                                                  // а другие значения являются значениями по умолчанию:
var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

pow5(2) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
cube(3) // => 27


var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9])
chessMin(-1,-5,3,15) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5



var zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогично, только теперь задается "0" как текст по умолчанию в prompt, 
                                                          // а текст приглашения пользователя задается при вызове zeroPrompt
var someNumber = zeroPrompt("Введите число")              // вызывает prompt("Введите число","0")



