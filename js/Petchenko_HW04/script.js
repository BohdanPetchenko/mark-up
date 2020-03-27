
var a = {
    name: 'Ivan',
    surname: 'Bydko'
};

var b = {
    name: 'Aleksandr',
    surname: 'Usik'
};

var c = {
    name: 'Andrey',
    surname: 'Shevchenko'
};                                                      // create three men


a.age = 62;

b.isMarried = true;

c.gender = 'man';                                      // add some facts
     

if('age' in a){
    alert(a.age);
} else {
    alert('Not found');
};


if ('isMarried' in b){
    alert(b.isMarried);
}else {
    alert('Not found');
};


if ('gender' in c){
    alert(c.gender);
}else {
    alert('Not found');
};                                                  // checked and displayed


var person = [
    {
        name: 'Vitalii',
        surname: 'Klichko',
        hasWork: true
    }
];

person.push(a);
person.push(b);
person.push(c);                                                        // create array with object (men) 


for(let i=0; i < person.length; i++){
    console.log(person[i]);
};                                                                   // output to the console the all array


for(let i=0; i < person.length; i++){
    console.log(`${person[i].name} ${person[i].surname}`);
};                                                                      // output to the console name and surname men


for(let i=0; i < person.length; i++){
    for (let key in person[i]){
        console.log(person[i][key]);
    }
};                                                                       // output to the console key's values



for(let i=0; i < person.length; i++){
    for (let key in person[i]){
        person[i].fullName = `${person[i].name} ${person[i].surname}`
    }
}                                                                                   // add key Full Name in every object 



console.log(JSON.stringify(person));                                                // create JSON string from array (person)


person.push(
    JSON.parse(`{
        "name": "Vasilii",
        "surname": "Lomachenko",
        "isHeChampion": "true" 
        }`
    )
);                                                                                               // add new man in person

function indent(){
    let br = '<br>';
    document.write(br);
}

var str = "<table border='1'>";
str += `<tr><td><b>Name</b></td><td><b>Surname<b></td></tr>`;
for (let i = 0; i < person.length; i++){
    for (let key in person[i]){        
        str += `<tr><td>${person[i].name}</td><td>${person[i].surname}</td></tr>`;
        break;
    }
}
str += "</table>";

console.log(str);
document.write(str);


indent()



str = "<table border='1'>";

for (let i = 0; i < person.length; i++){
    str +=`<tr></tr>`
    for (let key in person[i]){        
        str += `<td>${person[i][key]}</td>`;    
    }
    
}
str += "</table>";

console.log(str);
document.write(str);


indent()


str = `<table border='1' style="background:blue">`;

for (let i = 0; i < person.length; i++){
    
    str +=`<tr style="background: green">`;
    for (let key in person[i]){        
        str += `<td>${person[i][key]}</td>`;    
    }
    str +="</tr>";
}
str += "</table>";

console.log(str);
document.write(str);


indent()

var allKeys = [];
str = "<table border='1'>";
str += '<tr style="background-color: gray">';

for (let i = 0; i < person.length; i++) {
    for (let key in person[i]) {
        if (str.indexOf(key) === -1) {
            str += `<th>${key}</th>`;
            allKeys.push(key);
        }
    }
}
str += '</tr>';

for (let i = 0; i < person.length; i++) {
    str += '<tr style="background-color: green">';
    allKeys.forEach(function (key) {
        str += `<td>${(person[i][key] ? person[i][key] : " ")}</td>`;
    });
    str += '</tr>';
}

str += '</table>';

console.log(str);
document.write(str);


