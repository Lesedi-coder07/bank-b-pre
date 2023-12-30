const firebaseConfig = {
    apiKey: "AIzaSyACrKJEutEdrwWz51e9qEz1Sxv1foQ3MQM",
    authDomain: "giversweb-e0f43.firebaseapp.com",
    projectId: "giversweb-e0f43",
    storageBucket: "giversweb-e0f43.appspot.com",
    messagingSenderId: "1043081849171",
    appId: "1:1043081849171:web:0a22834625cb133c4c19a6",
    measurementId: "G-QSCLD8Z6S3"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const auth = firebase.auth();

//Firebase project: giverweb
let signInBtn = document.getElementById('submitSignIn')
let amountInput = document.getElementById("sendInput") 
let recInput = document.getElementById("recepientNo")
let sendBtn = document.getElementById("sendBtn") 
let amount;
let recepient;
let userid 
sendBtn.addEventListener('click', send)
sendBtn.addEventListener('click', check)
let loggedIn = false;
let key;
let time
let ini;
const close_overlay = document.getElementById('close_overlay_btn')
let appState = 'lobby';


close_overlay.addEventListener('click', () => {
document.querySelector('.overlay').style.display = "none";
})

//Account
let sendRef = firebase.database().ref
signInBtn.addEventListener("click", () => {
ini  = {
    userid: document.getElementById('userid').value, //clients acc no.
    balance: 1000,
}
signInWithEmailPassword()
}
)

function check() {
    
  

// let starCountRef = firebase.database().ref(ini.userid);
// starCountRef.on('value', (snapshot) => {
//     alert('user was added !!')
//     alert(snapshot.val);
//   })

// 
}

//Transactions-----------------------------------------------------------------------------------------------------------------------------
let transactions = []

function showModal (element) {
    // appState = 'Sending Money'
    element.style.display = 'flex';
    close_overlay.addEventListener('click', ()=> {
       destroyModal(element)
    })
    
}
 function destroyModal(element) {
  element.style.display = 'none';
}

class transactionComplete {
  constructor(userid, amount, balance, recepient, time, key){
      this.userid = userid
      this.amount = amount
      this.balance = balance;
      this.time =  time
      this.key = key
      this.recepient = recepient
  }


//push to database
  updateDB() {

    db.collection("accounts").doc(`${ini.userid}`).set({
      "Available Balance": this.balance,
      "Account Number": this.userid,

  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

      firebase.database().ref(this.userid).push().set({
          "Transaction": this,
      })

  }

  bankDB(){
    firebase.database().ref("balances/" + ini.userid).push().set({
      "User": this.userid,
      "CurrentBl": this.balance
  }).catch(err => alert(err))
  }
}
//Regular Expression



function send() {
    recepient = recInput.value;
    amount = amountInput.value;
    let transactionConfirm = confirm("Are you about to make this transaction?");

    if(transactionConfirm === true){

        if(amount > 500 /*ini.balance*/){
        swal("OOPS!", 'Insuficient Funds', 'error')
        //feedback.innerHTML = "Insificient Funds!!"
       } else {
        
        key = Math.ceil(Math.random() * 3987)
        time = new Date().getUTCHours() + ":" + (new Date().getUTCMinutes);
        ini.balance -= amount;
        swal("Your balance is now: " + ini.balance)
        document.getElementById("savings").innerHTML = "Savings: R" + ini.balance; 
        let latestTrans = new transactionComplete(ini.userid, amount,ini.balance, recepient, time, key)
        console.log(latestTrans)
        transactions.push(latestTrans)
        console.log(transactions)
        latestTrans.updateDB()
        latestTrans.bankDB()
        

       }
    
}





}


//Sign up-----------------------------------------------------------------------------------------------------------------------------------------


let b = document.getElementById("submitSignUp")

b.addEventListener("click", signUpWithEmailPassword)



    function signUpWithEmailPassword() {

        var email = document.getElementById("emailSignUp").value;
      var password = document.getElementById("passSignUp").value;
        
        // [START auth_signup_password]
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user)
            off()
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ..
          });
        // [END auth_signup_password]
      }


//Sign In----------------------------------------------------------------------------------------------------


// Call the showAlert function with the desired title and message




// signInBtn.addEventListener("click", signInWithEmailPassword)

function signInWithEmailPassword() {
    var emaill = document.getElementById("emailSignIn").value;
    var passwordd = document.getElementById("passSignIn").value
    userid = document.getElementById("userid").value 
    // [START auth_signin_password]
    auth.signInWithEmailAndPassword(emaill, passwordd)
    
      .then((userCredential) => {
        // Signed in
        var userr = userCredential.user;
        console.log(userr)
        // document.getElementsByClassName("bank-app")[0].style.display= "flex";
        // document.getElementsByClassName("signin")[0].style.display= "none"
        swal('Logged in!', `Welcome: ${ini.userid}`, 'success');
        
        loggedIn = true;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
    // [END auth_signin_password]

    
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      bankUI();
    } else {
      signedOutUI();
    }
  })

  const bankUI = () => {
    document.getElementsByClassName("bank-app")[0].style.display= "flex";
      document.getElementsByClassName("signin")[0].style.display= "none"
  }
  const signedOutUI = ()=> {
    document.getElementsByClassName("bank-app")[0].style.display= "none";
      document.getElementsByClassName("signin")[0].style.display= "flex"
  }


  function fakeLogin(){
    document.getElementsByClassName("bank-app")[0].style.display= "flex";
        document.getElementsByClassName("signin")[0].style.display= "none"
        // swal('Logged in!', `Welcome: ${ini.userid}`, 'success');
        auth.signOut().then(() => {
          
        })

  }

  

  var database = firebase.database();

// Listen for changes to a specific data node
database.ref(`/balances`).on('child_added', function(snapshot) {
  let incomeVal = snapshot.val()
  // curr = Object.keys(incomeVal[12345677])[Object.keys(incomeVal[12345677]).length - 1]
    console.log('New value:', incomeVal.CurrentBl);
});

  //Overlay

  document.getElementById("signUpLink").addEventListener("click", on)
  function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }
