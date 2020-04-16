var sample = prompt("Enter first title task");
switch (sample.toLowerCase()){
    case "a": aSample();
        break;
    case "cube": cubeSample();
        break;
    case "avg2": avg2Sample();
        break;
    case "sum3": sum3Sample();
        break;
    case "intrandom": intRandomSample();
        break;
    case "greetall": greetAllSample();
        break;
    case "sum": sumSample();
        break;
    default : alert('You enter incorrect title task!')
}

// or 

var samples = {
    a:  aSample,
    cube:  cubeSample,
    avg2:  avg2Sample,
    sum3:  sum3Sample,
    intrandom:  intRandomSample,
    greetall: greetAllSample,
    sum: sumSample,
    default: 'You enter incorrect title task!'
}

function getSumple (task){
    var task = prompt("Enter second title task").toLowerCase();
    if (task in samples){
        return samples[task]()
    } else {
        return alert (samples.default)
    }
}
getSumple();




function aSample(){
    function a(greeting){ 
        alert(greeting);
    }
    a("Привет!"); 
}

function cubeSample(){
    function cube(num){
        return Math.pow(num, 3);  
    }
    console.log(`Cube ${cube(2)}`);
}

function avg2Sample(){
    function avg2(numberA, numberB){
        return (numberA + numberB)/2;
    }
    console.log("Average " + avg2(1,2));
    console.log("Average " + avg2(10,5));
}


function sum3Sample(){
    var zero = 0
    var sum3 = (x,y,z) => (x || 0) + (y || 0) + (z || 0);
    console.log("Sum " + sum3(1,2,3)); 
    console.log("Sum " + sum3(5,10,100500)); 
    console.log("Sum " + sum3(5,10)); 
}

function intRandomSample(){
    function intRandom(min, max) {
        if(max == null){
        max = min;
        min = 0;    
        }
        min = Math.round(min);
        max = Math.round(max);
        return Math.round(Math.random() * (max - min)) + min;
    }
    console.log("Random integer " + intRandom(2,15));
    console.log("Random integer " + intRandom(-1,-1));
    console.log("Random integer " + intRandom(0,1));
    console.log("Random integer " + intRandom(10));
}

function greetAllSample(){
    function greetAll (){
            
        var str = "";
        for(let value of arguments){
            str += ' ' + value;                 
        }
        console.log("Hello" + str)
    }
    greetAll("Superman");
    greetAll("Superman", "SpiderMan");
    greetAll("Superman", "SpiderMan", "Captain Obvious");
}

function sumSample(){
    function sum (){
            
        var str = 0;
        for(let value of arguments){
            str += value;                 
        }
        console.log(str)
    }
    sum(1);
    sum(2);
    sum(10,20,40,100);
}