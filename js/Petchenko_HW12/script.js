/*** Traffic Light***/
var redTraffic = document.getElementById("redTraffic");
var yellowTraffic = document.getElementById("yellowTraffic");
var greenTraffic = document.getElementById("greenTraffic");

var redTimer = document.getElementById("redTimer");
var yellowTimer = document.getElementById("yellowTimer");
var greenTimer = document.getElementById("greenTimer");

/*** Pedestrian Traffic***/
var redPedestrian = document.getElementById("redPedestrian");
var greenPedestrian = document.getElementById("greenPedestrian");

var redPedestrianTimer = document.getElementById("redPedestrianTimer");
var greenPedestrianTimer = document.getElementById("greenPedestrianTimer");

/*** Pedestrian Traffic With Button***/
var redPedestrianWithButton = document.getElementById("redPedestrianWithButton");
var greenPedestrianWithButton = document.getElementById("greenPedestrianWithButton");

var redPedestrianTimerWithButton = document.getElementById("redPedestrianTimerWithButton");
var greenPedestrianTimerWithButton = document.getElementById("greenPedestrianTimerWithButton");

var button = document.getElementById("button");

var myResolve;


const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))


/*** Светофор ***/

async function trafficLight(greenTime, yellowTime, redTime) {
    while (true) {
        yellowTraffic.style.background = '';
        greenTraffic.style.background = 'green';
        timer(greenTimer, greenTime);
        await delay(greenTime * 1000);

        greenTraffic.style.background = '';
        yellowTraffic.style.background = 'yellow';
        timer(yellowTimer, yellowTime);
        await delay(yellowTime * 1000);

        yellowTraffic.style.background = '';
        redTraffic.style.background = 'red';
        timer(redTimer, redTime);
        await delay(redTime * 1000);

        redTraffic.style.background = '';
        yellowTraffic.style.background = 'yellow';
        timer(yellowTimer, yellowTime);
        await delay(yellowTime * 1000);
    }
}

/*** Pedestrian Traffic Light ***/

async function pedestrianTrafficLight(greenTime, redTime) {
    while (true) {
        redPedestrian.style.background = '';
        greenPedestrian.style.background = 'green';
        timer(greenPedestrianTimer, greenTime);
        await delay(greenTime * 1000);

        greenPedestrian.style.background = '';
        redPedestrian.style.background = 'red';
        timer(redPedestrianTimer, redTime);
        await delay(redTime * 1000)

    }
}

/*** Pedestrian Traffic Light With Button ***/

async function pedestrianTrafficLightWithButton(greenTime, redTime) {
    while (true) {
        redPedestrianWithButton.style.background = '';
        greenPedestrianWithButton.style.background = 'green';
        timer(greenPedestrianTimerWithButton, greenTime);
        await delay(greenTime * 1000);

        greenPedestrianWithButton.style.background = '';
        redPedestrianWithButton.style.background = 'red';
        
        let onTime = timer(redPedestrianTimerWithButton, redTime + 5);
        button.disabled = 'disabled';
        button.style.background = 'brown';
        button.innerText = `You can't click me`;
        await delay(5000)

        button.disabled = '';
        button.style.background = '';
        button.innerText = 'Click me';
        await Promise.race([domEventPromise(button, 'click'), delay(redTime * 1000)]);

        button.removeEventListener('click', myResolve);
        clearInterval(onTime);
        redPedestrianTimerWithButton.innerText = "";                
    }
}

/*** My Count***/

function timer(el, sec) {
    el.innerText = sec;

    let count = setInterval(function () {
        sec--;
        if (sec !== 0) {
            el.innerText = sec;
        } else {
            el.innerText = "";
            clearInterval(count);
        }
    }, 1000)
    return count;
}

/*** dom Event Promise ***/
async function domEventPromise(el, e) {
    await new Promise((resolve, reject) => {
        myResolve = () => resolve();
        
        el.addEventListener(e, myResolve)
    })
}


domEventPromise(button, 'click').then(e => console.log('event click happens', e));
pedestrianTrafficLightWithButton(10, 10)
pedestrianTrafficLight(6, 6);
trafficLight(5, 1, 5);
