function Control(el, { min = 0,
    max = 100,
    step = 1,
    value = 100,
    onChange,
    minAngle = 0,
    wheelStepRatio = 0.01,
    maxAngle = 360, src = '1@3x.png' } = {}) {

    this.setValue = (newValue) => {
        if (newValue > max) throw `Error: Value exceeds ${max}`;
        if (newValue < min) throw `Error: Value is smaller than ${min}`;
        value = newValue;
        onChange(newValue);
    }

    this.getValue = () => {
        return value;
    }

    const color = el.getAttribute('color');
    const commonRgbDiv = document.getElementById(el.getAttribute('commonRgbId'));
    const img = document.createElement('img');
    el.appendChild(img);
    img.src = src;

    const div = document.createElement('div');
    div.style.width = "360px";
    div.style.height = "20px";
    div.style.border = "2px solid gray";
    el.appendChild(div);


    const updateRgb = (value) => {

        function getRGB(str) {
            var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
            return match ? {
                red: match[1],
                green: match[2],
                blue: match[3]
            } : {};
        }

        let rgbRatio = 256 / max;

        switch (color) {
        case 'red':
                div.style.backgroundColor = 'rgb(' + [value * rgbRatio, 0, 0].join(',') + ')';
                if (!commonRgbDiv.style.backgroundColor)
                    commonRgbDiv.style.backgroundColor = 'rgb(' + [value * rgbRatio, 0, 0].join(',') + ')';
                else {
                    let currentCommonRgb = getRGB(commonRgbDiv.style.backgroundColor);
                    currentCommonRgb.red = value * rgbRatio;
                    commonRgbDiv.style.backgroundColor = 'rgb(' + [currentCommonRgb.red, currentCommonRgb.green, currentCommonRgb.blue].join(',') + ')';
                }
            break;
        case 'green':
                div.style.backgroundColor = 'rgb(' + [0, value * rgbRatio, 0].join(',') + ')';
                if (!commonRgbDiv.style.backgroundColor)
                    commonRgbDiv.style.backgroundColor = 'rgb(' + [0, value * rgbRatio, 0].join(',') + ')';
                else {
                    let currentCommonRgb = getRGB(commonRgbDiv.style.backgroundColor);
                    currentCommonRgb.green = value * rgbRatio;
                    commonRgbDiv.style.backgroundColor = 'rgb(' + [currentCommonRgb.red, currentCommonRgb.green, currentCommonRgb.blue].join(',') + ')';
                }
            break;
        case 'blue':
                div.style.backgroundColor = 'rgb(' + [0, 0, value * rgbRatio].join(',') + ')';
                if (!commonRgbDiv.style.backgroundColor)
                    commonRgbDiv.style.backgroundColor = 'rgb(' + [0, 0, value * rgbRatio].join(',') + ')';
                else {
                    let currentCommonRgb = getRGB(commonRgbDiv.style.backgroundColor);
                    debugger 
                    currentCommonRgb.blue = value * rgbRatio;
                    commonRgbDiv.style.backgroundColor = 'rgb(' + [currentCommonRgb.red, currentCommonRgb.green, currentCommonRgb.blue].join(',') + ')';
                }
            break;
        default:
            throw "Color is not specified for the control";
        }

    }

    updateRgb(this.getValue());

    const angleRatio = (maxAngle - minAngle) / (max - min);

    const getAngle = () => {
        const offset = this.getValue() - min;
        const angleOffset = offset * angleRatio;
        const angle = minAngle + angleOffset;
        return angle;
    };

    const updateImg = (angle = getAngle()) => img.style.transform = `rotate(${angle}deg)`;

    updateImg();

    const updateValue = (st = step) => {
        if (st < min) st = max + st;
        if (st < min && this.getValue() === min) st = max + st;
        this.setValue(Math.round(st));
        updateImg();
        updateRgb(this.getValue());
    };

    img.onclick = (e) => {
        console.log(e);
        const { x: imgX, width: imgWidth } = img.getBoundingClientRect();
        const xOnImg = e.clientX - imgX;
        const st = xOnImg > imgWidth / 2 ? this.getValue() + step : this.getValue() - step;

        updateValue(st);
    };

    img.onmousewheel = e => {
        e.preventDefault();
        const st = e.deltaY * wheelStepRatio;
        updateValue(this.getValue() + st);
    };

    const toDeg = rad => (360 / (2 * Math.PI)) * rad;

    let startAngle;

    const getAngleByCoords = (x, y) => {
        const { x: imgX, y: imgY, width, height } = img.getBoundingClientRect();
        const xOnImg = x - imgX - width / 2;
        const yOnImg = y - imgY - height / 2;
        return toDeg(Math.atan2(yOnImg, xOnImg));
    };

    img.onmousedown = e => {
        e.preventDefault();
        startAngle = getAngleByCoords(e.clientX, e.clientY);
    };

    img.onmousemove = e => {
        if (e.buttons && startAngle) {
            const currentAngle = getAngleByCoords(e.clientX, e.clientY);
            const angleDiff = currentAngle - startAngle;
            const angle = getAngle();
            updateImg(angle + angleDiff);
        }
    };

    img.onmouseup = e => {
        const currentAngle = getAngleByCoords(e.clientX, e.clientY);
        const angleDiff = currentAngle - startAngle;
        const angle = getAngle();
        updateValue((angle + angleDiff) / angleRatio);
        startAngle = null;
    };
}

for (let i = 1; i < 4; i++) {
    let control = new Control(window[`control${i}`],
        {
            onChange: (value) => console.log(`Value of control #${i} has changed to ${value}`)
        });
}