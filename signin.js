let signupbtn = document.getElementById("submitSignIn")
signupbtn.addEventListener("click", generate(document.getElementById("emailSignUp").value))

//Functions
function generate(email) {
    code = Math.ceil(Math.random * 777)
   if(email) {
    localStorage.setItem(email, code)
   } else {return console.error();}

   return code
}

console.log(code);
alert("rhjfk")