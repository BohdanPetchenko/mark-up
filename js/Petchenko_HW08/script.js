/***** sort *****/

var persons = [
    {name: "Иван", age: 17},
    {name: "Мария", age: 35},
    {name: "Алексей", age: 73},
    {name: "Яков", age: 12},
]

function sort (objName, objKey, isReverse){ 
    
    objName.sort((a,b) => a[objKey] > b[objKey] ? 1 : -1);

    if(isReverse === undefined || isReverse === true){
        return objName
    } else{
       return objName.reverse()
    }
    
}
console.log(sort(persons, "age"))


/***** array map *****/

var arr = ["1", {}, null, undefined, "500", 700]
console.log(arr.map(x => (isNaN(+x) || x === null) ? x : +x))


/***** array reduce *****/

var arr2 = ["0", 5, 3, "string", null]

function findNumber(someArr){
    var arrNum = []

    for(let param of someArr){

        if(typeof(param) === 'number'){
            arrNum.push(param) 
        }
    }
    return arrNum
}
console.log(findNumber(arr2).reduce((x,y) => x*y))


/***** object filter *****/

var phone = {
    brand: "meizu",
    model: "m2",
    ram: 2,
    color: "black",
};


function filter(someObj, key, value){
            
    for(let objKey in someObj){

        if(objKey !== key && value !== someObj[objKey]){
            delete someObj[objKey]
        }
    } 
    return someObj  
}

console.log(filter(phone, "color", 2));

    
/***** object map *****/
var man = {
    name: "Иван",
    age: 17
}

var result = {};

function myMap(objToMap){
    
    for(let [key, value] of Object.entries(objToMap)){
        result[key+"_"] = value + "$";
    }
    return result;
}

console.log(myMap(man))

/***** sum *****/

function sum(value){
    return (value === 1) ? 1 : value + sum(value - 1);
}

console.log(sum(5))






