const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

let current;

let selection = [];

const tools = {
  graffity: {
    mousemove(e) {
      //e.buttons 0b00000x11 & 0b00000100 == x
      e.buttons & 1 &&
        new Circle(
          e.clientX,
          e.clientY,
          +size.value,
          color.value,
          fill.checked
        );
    },
  },
  circle: {
    mousedown(e) {
      current = new Circle(e.clientX, e.clientY, 1, color.value, fill.checked);
    },
    mousemove(e) {
      if (!current) return;

      current.radius = current.distanceTo(e.clientX, e.clientY);
      Drawable.drawAll();
    },

    mouseup(e) {
      current = null;
    },
  },
  line: {
    mousedown(e) {
      current = new Line(e.clientX, e.clientY, 0, 0, color.value, +size.value);
    },
    mousemove(e) {
      if (!current) return;

      current.width = e.clientX - current.x;
      current.height = e.clientY - current.y;

      Drawable.drawAll();
    },

    mouseup(e) {
      current = null;
    },
  },

  rectangle: {
    mousedown(e) {
      current = new Rectangle(
        e.clientX,
        e.clientY,
        0,
        0,
        color.value,
        +size.value,
        fill.checked
      );
    },
    mousemove(e) {
      if (!current) return;

      current.width = e.clientX - current.x;
      current.height = e.clientY - current.y;

      Drawable.drawAll();
    },

    mouseup(e) {
      current = null;
    },
  },
  ellipse: {
    mousedown(e) {
      current = new Ellipse(
        e.clientX,
        e.clientY,
        0,
        0,
        color.value,
        +size.value,
        fill.checked
      );
    },
    mousemove(e) {
      if (!current) return;

      current.width = e.clientX - current.x;
      current.height = e.clientY - current.y;

      Drawable.drawAll();
    },

    mouseup(e) {
      current = null;
    },
  },

  select: {
    click(e) {
      console.log(e);
      let found = Drawable.instances.filter(
        (c) => c.in && c.in(e.clientX, e.clientY)
      );
      if (found.length) {
        if (e.ctrlKey) {
          selection.push(found.pop());
        } else {
          selection = [found.pop()];
        }
      } else {
        if (!e.ctrlKey) selection = [];
      }

      Drawable.drawAll(selection);
    },
    mousedown(e) {
      //
    },
    mousemove(e) { },

    mouseup(e) {
      //x,y, w, h прямоугольника
      //selection - только те элеменеты Drawable.instances которые в границах прямоугольника.
    },
  },
};

function superHandler(evt) {
  let t = tools[tool.value];
  if (typeof t[evt.type] === "function") t[evt.type].call(this, evt);
}

canvas.onmousemove = superHandler;
canvas.onmouseup = superHandler;
canvas.onmousedown = superHandler;
canvas.onclick = superHandler;

////

function Drawable() {
  Drawable.addInstance(this);
}

const distance = (x1, y1, x2, y2) => ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;

Drawable.prototype.draw = function () { };
Drawable.prototype.distanceTo = function (x, y) {
  if (typeof this.x !== "number" || typeof this.y !== "number") {
    return NaN;
  }
  return distance(this.x, this.y, x, y);
};
Drawable.instances = [];
Drawable.addInstance = function (item) {
  Drawable.instances.push(item);
};

Drawable.drawAll = function (selection = []) {
  ctx.clearRect(0, 0, width, height);
  Drawable.forAll((item) => item.draw(selection.includes(item)));
};

Drawable.forAll = function (callback) {
  for (var i = 0; i < Drawable.instances.length; i++) {
    callback(Drawable.instances[i]);
  }
};

class Circle extends Drawable {
  constructor(x, y, radius, color, fill) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.fill = fill;
    this.draw();
  }

  draw(selected) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = this.color;
    if (selected) {
      ctx.setLineDash([1, 1]);
      ctx.lineWidth = 2;
      ctx.stroke();
    } else ctx.setLineDash([]);
    if (this.fill) ctx.fill();
    else ctx.stroke();
  }

  in(x, y) {
    return this.distanceTo(x, y) < this.radius;
  }

  inBounds(x, y, w, h) {
    // x = 100, this.x = 102, w = 5
    return this.x >= x && this.x <= x + w && this.y >= y && this.y <= y + h;
  }
}

class Line extends Drawable {
  constructor(x, y, width, height, color, lineWidth) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.lineWidth = lineWidth;

    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }
}

class Rectangle extends Drawable {
  constructor(x, y, width, height, color, lineWidth, fill) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.lineWidth = lineWidth;
    this.fill = fill;

    this.draw();
  }

  draw(selected) {
    if (!selected) {
      ctx.setLineDash([]);

      if (this.fill) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      } else {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
      }
    } else {
      ctx.setLineDash([1, 1]);
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.color;
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  in(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
class Ellipse extends Drawable {
  constructor(x, y, width, height, color, lineWidth, fill) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.lineWidth = lineWidth;
    this.fill = fill;

    this.draw();
  }

  draw(selected) {
    const width2 = this.width / 2;
    const height2 = this.height / 2;

    ctx.beginPath();
    ctx.ellipse(
      this.x + width2,
      this.y + height2,
      Math.abs(width2),
      Math.abs(height2),
      0,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.fillStyle = this.color;

    if (selected) {
      ctx.setLineDash([1, 1]);
      ctx.lineWidth = 4;
      ctx.stroke();
    } else ctx.setLineDash([]);

    if (this.fill) ctx.fill();
    else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }

  in(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}

color.onchange = () => {
  selection.forEach((c) => (c.color = color.value));
  Drawable.drawAll(selection);
};

document.getElementById("delete").onclick = () => {
  Drawable.instances = Drawable.instances.filter(
    (item) => !selection.includes(item)
  );
  selection = [];
  Drawable.drawAll();
};


function jsonPost(url, data) {
  return new Promise((resolve, reject) => {
    var x = new XMLHttpRequest();
    x.onerror = () => reject(new Error("jsonPost failed"));
    x.open("POST", url, true);
    x.send(JSON.stringify(data));

    x.onreadystatechange = () => {
      if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
        resolve(JSON.parse(x.responseText));
      } else if (x.status != 200) {
        reject(new Error("status is not 200"));
      }
    };
  });
}

send.onclick = () => {
  jsonPost("http://students.a-level.com.ua:10012", {
    func: "addMessage",
    nick: nick.value,
    message: `<img src = ${canvas.toDataURL()} >`,
  }).then(
    response => console.log(`Message delivered`)    
  );
};
