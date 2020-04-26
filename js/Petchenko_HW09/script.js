function Form(el, data, okCallback, cancelCallback) {
    let formBody = document.createElement('div');
    let okButton = document.createElement('button');
    okButton.innerHTML = 'OK';

    let backupData = { ...data };

    let cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';


    formBody.innerHTML = '<h1>My Form</h1>';
    if (typeof okCallback === 'function') {
        formBody.appendChild(okButton);
        okButton.onclick = () => {
            let isValid = true;
            for (let key in data) {
                if (key.charAt(0) === '*') {
                    if (!data[key]) isValid = false;
                }
                if (this.validators[key]) {
                    let validationRes = this.validators[key](data[key]);
                    if (typeof (validationRes) !== 'boolean') isValid = false;
                }
            }
            isValid ? this.okCallback(data) : alert('Your data is invalid');
        };
    }

    if (typeof cancelCallback === 'function') {
        formBody.appendChild(cancelButton);
        cancelButton.onclick = () => {
            el.innerHTML = '';
            let form = new Form(el, backupData, this.okCallback, this.cancelCallback);
            form.validators.surname = this.validators.surname; 
            cancelCallback();
        };
    }

    el.appendChild(formBody);

    let boxIntro = document.createElement('div');
    boxIntro.setAttribute('class', 'boxIntro');

    el.appendChild(boxIntro);

    this.okCallback = okCallback;
    this.cancelCallback = cancelCallback;

    this.data = data;
    this.validators = {};

    let inputCreators = {
        checkIsMandatory(input, key, value, oninput) {
            if (key.charAt(0) === '*') {
                input.mandatory = document.createElement('span');
                input.mandatory.innerText = "*";
                input.mandatory.style.color = 'red';
                boxIntro.appendChild(input.mandatory);

                if (!value) {
                    input.style.border = '1px solid red';
                }

                input.oninput = function (event) {
                    if (!event.target.value) {
                        event.target.style.border = '3px solid red';
                    }
                    else {
                        event.target.style.border = '';
                    }
                    oninput(event);
                };
            }
        },
        checkIsProtected(value) {
            let isProtected = true;
            for (let i = 0; i < value.length; i++) {
                let symbol = value.charAt(i);
                if (symbol !== '*') {
                    isProtected = false;
                    break;
                }
            }
            return isProtected;
        },
        string(key, value, oninput) {
            let input = document.createElement('input');
            input.type = 'text';
            input.placeholder = key;
            input.value = this.checkIsProtected(value) ? '' : value;
            input.oninput = oninput;
            input.errorP = document.createElement('p');
            input.errorP.style.color = 'red';
            boxIntro.appendChild(input.errorP);
            this.checkIsMandatory(input, key, value, oninput);
            return input;
        },
        boolean(key, value, oninput) {
            let input = document.createElement('input');
            input.type = 'checkbox';
            input.placeholder = key;
            if (value) {
                input.setAttribute('checked', '');
            };
            this.checkIsMandatory(input, key, value, oninput);
            return input;
        },
        date(key, value, oninput) {
            let input = document.createElement('input');
            input.type = 'datetime-local';
            input.placeholder = key;
            let year = value.getFullYear();
            let month = ('0' + (value.getMonth() + 1)).slice(-2);
            let day = ('0' + value.getDay()).slice(-2);
            let hours = ('0' + value.getHours()).slice(-2);
            let minutes = ('0' + value.getMinutes()).slice(-2);
            let res = `${year}-${month}-${day}T${hours}:${minutes}`;
            input.value = res;
            this.checkIsMandatory(input, key, value, oninput);
            return input;
        },
        textarea(key, value, oninput) {
            let input = document.createElement('textarea');
            input.placeholder = key;
            input.value = this.checkIsProtected(value) ? '' : value;
            input.oninput = oninput;
            input.errorP = document.createElement('p');
            input.errorP.style.color = 'red';
            boxIntro.appendChild(input.errorP);
            this.checkIsMandatory(input, key, value, oninput);
            return input;
        }
    };


    for (let key in data) {

        let fieldName = document.createElement('p');
        fieldName.style['text-transform'] = 'capitalize';
        if (key.charAt(0) === '*') {
            fieldName.innerText = key.substr(1);
        } else {
            fieldName.innerText = key;
        }
        boxIntro.appendChild(fieldName);

        let type = typeof (data[key]);

        let oninput = function (event) {
            if (!event.target || (event.target.localName !== 'input' && event.target.localName !== 'textarea')) return;
            if (this.validators[event.target.placeholder]) {
                let res = this.validators[event.target.placeholder](event.target.value, event.target.placeholder, data, event.target);
                if (typeof (res) !== 'boolean') {
                    event.target.errorP.innerText = res;
                    event.target.style.color = 'red';
                } else {
                    event.target.errorP.innerText = ``;
                    event.target.style.color = 'black';
                }
            } 
                data[event.target.placeholder] = event.target.value;
        }.bind(this);

        switch (type) {
            case 'boolean':
                boxIntro.appendChild(inputCreators.boolean(key, data[key], oninput));
                break;
            case 'object':
                boxIntro.appendChild(inputCreators.date(key, data[key], oninput));
                break;
            default:
                boxIntro.appendChild(inputCreators.string(key, data[key], oninput));
                boxIntro.appendChild(inputCreators.textarea(key, data[key], oninput));
        }


    }
}

var data = {
    name: 'Anakin',
    surname: 'Skywalker',
    married: true,
    birthday: new Date((new Date).getTime() - 86400000 * 30 * 365),
    secret: '********'
};

data['*city'] = "Kharkov";

let form = new Form(MyForm, data, () => console.log('ok'), () => console.log('cancel'));
form.okCallback = (data) => alert(JSON.stringify(data));

form.validators.surname = (value, key = null, data = null, input = null) => value.length > 2 &&
    value[0].toUpperCase() === value[0] &&
    !value.includes(' ') ? true : 'Wrong name';

console.log(form);