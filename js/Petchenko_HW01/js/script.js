/* First task */

var nameUser = prompt('Hello, visitor. Enter your name')

var deposit = +prompt(nameUser +', enter your deposit');

var precent = +prompt('Enter bank precent');

alert( precent && deposit ?
     ((deposit * (precent * 0.01)) + deposit)
     : "Incorrect input")
;


/* Second task */

var credentials = {
     login: 'admin',
     password: 'qwerty',
};

var logInButton = document.getElementsByClassName("btn")[0];

if(logInButton) {
     logInButton.onclick = function(event){
          event.preventDefault();
          var login = document.forms.loginForm.elements.loginInput.value;

          var password = document.forms.loginForm.elements.passInput.value;

          var successElement = document.getElementsByClassName('success')[0];
          var errorElement = document.getElementsByClassName('error')[0];

          if(credentials['login'] === login && credentials['password'] === password){
               if(!successElement)
               {
                    alert("You have successfully logged in");
                    return;
               }
               if(!errorElement.hasAttribute('hidden')){
                    errorElement.setAttribute('hidden','');
               }
               successElement.removeAttribute('hidden');
          }else{
               if(!errorElement)
               {
                    alert("Login or password is incorrect");
                    return;
               }
               if(!successElement.hasAttribute('hidden')){
                    successElement.setAttribute('hidden','');
               }
               errorElement.removeAttribute('hidden');
          }
     }
} else {
     alert("Come in button is missed")
}





