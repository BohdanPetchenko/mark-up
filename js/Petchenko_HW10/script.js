const startURL = 'http://swapi.dev/api/'
const isAPI = str => (typeof str === 'string' && str.startsWith(startURL));

function DrawJson(el, data) {
    let table = document.createElement('table');
    el.appendChild(table)

    function createTable(el, arr) {
        for (let i = 0; i < arr.length; i++) {
            let tr = document.createElement('tr');

            for (var j = 0; j < arr[i].length; j++) {
                let td = document.createElement('td');

                if (isAPI(arr[i][j])) {
                    arr[i][j] = [arr[i][j]];
                }
                if (arr[i][j] instanceof Array) {
                    for (let item of arr[i][j])
                        if (isAPI(item)) {
                            const inputButton = document.createElement('input');
                            inputButton.type = 'button';
                            td.appendChild(inputButton);
                            inputButton.value = item.slice(startURL.length);
                            inputButton.onclick = () => {
                                fetch(item)
                                    .then(res => res.json())
                                    .then(luke => {
                                        rootBox.innerText = "";
                                        DrawJson(rootBox, luke)
                                    })
                            }
                        }
                }
                else {
                    td.innerHTML = arr[i][j];
                }


                tr.appendChild(td);
            }
            el.appendChild(tr);
        }
    }
    createTable(table, Object.entries(data))

}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => DrawJson(rootBox, luke))

//  MyFetch

function myFetch(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function () {

            if (xhr.status != 200) {
                reject(`Ошибка ${xhr.status}: ${xhr.statusText}`)
            }
            else {
                resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.onerror = function () {
            alert("Запрос не удался");
        };

        xhr.send()
    })
}

myFetch('https://swapi.dev/api/people/1/')
    .then(luke => console.log(luke))


// race

const promise = new Promise(function (resolve, reject) {
    myFetch('https://swapi.dev/api/people/1/')
        .then(() => resolve('Promise'))
})
const delay = ms => new Promise(ok => setTimeout(() => ok("delay"), ms))

Promise.race([promise, delay(300)]).then(function (value) {
    console.log(`${value} won`);

})


