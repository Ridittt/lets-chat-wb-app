// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFhNUkSYPojmVMeZeRfNjovI1tUAanhWE",
  authDomain: "kwitter-ddc12.firebaseapp.com",
  projectId: "kwitter-ddc12",
  storageBucket: "kwitter-ddc12.appspot.com",
  messagingSenderId: "473367719520",
  appId: "1:473367719520:web:e035ee5ba9aa063e96dd05",
  measurementId: "G-PTELB6TYWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
function send()
{
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push
      (
      {
            name:user_name,message:msg,like:0
      }
      );
      document.getElementById("msg").value="";
      
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'> </h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_button="<button class='btn btn-warning'id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>";
         span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span> </button> <hr>";
         row=name_with_tag+message_with_tag+like_button+span_with_tag;
         document.getElementById(output).innerHTML+=row;
         
      } });  }); }
getData();
function updateLike(message_id)
{
      console.log("clicked on like button-"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update(
            {
                  like:updated_likes
            }
      );
      
}
function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_room");
      window.replace("kwitter.html")

}
