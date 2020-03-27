
//----- html tree -----


var body = {

    tagName: "body",
    subTags: [
        {
            tagName: "div",
            subTags: [
                {
                tagName: "span",
                text: "Enter a data please:",
                tagName: "br",
                tagName: "input",
                attrs: [
                    {
                    type: "text",
                    id: "name"
                    }
                ],
                tagName: "input",
                attrs: [
                    {
                    type: "text",
                    id: "surname"
                    }
                ]
                }
            ],
            tagName: "div",
            subTags: [
                {
                    tagName: "button",
                    attrs:[
                        {
                           id: "ok", 
                        }
                    ],
                    text: "OK",
                    tagName: "button",
                    attrs:[
                        {
                           id: "cancel", 
                        }
                    ],
                    text: "Cancel",
                    
                }                
            ]
                                
        }
    ]

}

//----- declarative fields, object links-----


function declarative_fields(){
    var notebook = {
        brand: prompt('Enter a brand', "HP"),
        type:  prompt('Enter a type', "440 G4"),
        model: prompt('Enter a model', "Y7Z75EA"),
        ram: +prompt('Enter a RAM', "4"),
        size: prompt('Enter a size display', "14"),
        weight: +prompt('Enter a weight', '1.8'),
        resolution: {
            width: +prompt('Enter a width', "1920"),
            height: +prompt('Enter a height', "1080"),
        },
    };

    var phone = {
        brand: prompt('Enter a brand', "meizu"),
        model: prompt('Enter a model', "m2"),
        ram:  +prompt('Enter a RAM', "2"),
        color: prompt('Enter a color', "black"),
    };

    var person = {
        name: prompt('Enter a name', "Donald"),
        surname: prompt('Enter a surname',"Trump"),
        married: confirm('are you married?'),
        smartphone:{
            owner: null
        },
        laptop:{
            owner: null
        }

    };
    person.smartphone.owner = person;
    person.laptop.owner = person;
}


// declarative_fields()                                                  //   function call



//----- imperative array fill 3 -----

function imperative_array(){
    var arr = [];
    arr[0] = prompt('Enter a first data ');
    arr[1] = prompt('Enter a second data ');
    arr[2] = prompt('Enter a third data ');
}

// imperative-array()                                                   //   function call



//----- while confirm -----

function while_confirm (){
    var someQuestion = false;
    while(someQuestion == false){
        someQuestion = confirm('Continue?')
    }
}

// while_confirm()                                                     //   function call



//----- array fill -----
function array_fill(){
    var addedArray = [];
    var arrayData;
    do{
        addedArray.push(prompt('Enter a data'));
        if(addedArray[addedArray.length -1] == null && " "){
            arrayData = null
        }
    } while(arrayData !== null);
    
    alert(addedArray);
};

//  array_fill()                                                      //   function call 


//----- array fill nopush -----

function array_fill_nopush(){
    var addedArray = [];
    var arrayData;
    var i = (-1);
    do{
        addedArray[++i] = prompt('Enter a data');
        if(addedArray[addedArray.length -1] == null && " "){
            arrayData = null
        }
    } while(arrayData !== null);
    
    alert(addedArray);
};
// array_fill_nopush()                                                   //   function call


//----- infinite probability -----

function infinite_probability(){
    var infiniteArr = [];

    while(true){
        infiniteArr.push(Math.random());
        if(infiniteArr[infiniteArr.length - 1] > 0.9){
            break;
        }
    }
    alert(infiniteArr.length);
}

// infinite_probability();                                                   //   function call


//----- empty loop -----

function empty_loop (){
    var likedFood = null;
    while(likedFood == null && " "){
        likedFood = prompt('What is your favorite food?')
    }
}
// empty_loop ()                                                            //   function call


//----- progression sum -----

function progression_sum(){
    var maxNumber = +prompt('Emter max number');
    var maxNumberArr = [];
    for (var i = 1; i < maxNumber; i++, i++, i++) {
        maxNumberArr.push(i);
    };
    alert(maxNumberArr);
}
// progression_sum();                                                     //   function call


//----- chess one line -----

function chessOfLine(){
    var lenghtOfLine = +prompt('Enter lenth of line');

    var str = " "
    for (var i = 0; i < lenghtOfLine; i++){
        str+=" # "
            
    }
    alert(str);
}
// chessOfLine()                                                        // function call



//-----  numbers -----

function numbers(){
    for (var j = 0; j < 10; j++){
        var str = ""
        for (var i = 0; i < 10; i++){
            str += i;
            
        }
        console.log(str);
    }
}
// numbers();                                                        // function call


//-----  chess -----

function chess(){
    for (var j=0;j<10;j++){
        var str = ""
        
        for (var i=0;i<10;i++){
            if(j % 2 == 0){
                str += ".#";
            }else if(j % 2 == 1){
                str += "#.";
            }
            
        }
        console.log(str);
    }
}
// chess();                                                        // function call


//-----  cubes  -----
function cubes(){
    var lengthArrOfCubes = +prompt('Enter a lenth array');
    arrOfCubes = [];
    for (var i = 0; i < lengthArrOfCubes; i++){

        arrOfCubes.push(Math.pow(i, 3));
    }
    console.log(arrOfCubes);
}
// cubes();                                                        // function call


//------ multiply table -------


function multiply_table(){

    var arr = [];

    // x - horizontal;
    // y - vertical;

    for (let x = 1; x < 11; x++) {
        arr[x] = [];
        for (let y = 1; y < 11; y++) {
            arr[x][y] = x * y;
            console.log(x + " * " + y + " = " + arr[x][y]);
        }
    }

    var x = +prompt("Enter x:");
    var y = +prompt("Enter y:");

    alert("Result: " + arr[x][y]);
}
// multiply_table()                                                 // function call


//------ Blue Belt Quest: Triangle ------


function triangle(){
    for (var i = 1; i <= 6; i++) {
        var line = "";
        for (var j = 1; j <= (2 * 6 - 1); j++) {   
            if(j >= 6 + 1 - i && j <= 6 - 1 + i){
                line += "#"
            } else {
                line += ".";  
            }
        }
        console.log(line);
    }
}
// triangle();                                                 // function call
