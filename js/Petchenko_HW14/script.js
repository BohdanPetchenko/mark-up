var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var myColor = "black";
var myRadius = 5;

var color = document.getElementById('color');
color.oninput = function () {
    myColor = this.value;
}

var radius = document.getElementById('radius');
radius.oninput = function () {
    myRadius = this.value;
}


c.onmousemove = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    
    if (c.onmousemove.arguments[0].buttons == 1) {
        ctx.beginPath();
        ctx.arc(x - 5, y - 5, myRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = myColor;
        ctx.fill();
    }
}



