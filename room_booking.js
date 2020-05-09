var formCreator = '<form action="rooms.php" method="POST" name="book_form" onsubmit="return confirmBooking();"><div><label>Name</label><input type="text" name="name" required></div<div><label>Email</label><input type="email" name="email" required></div><div><label>Telephone</label><input type="tel" name="tel" pattern="0[0-9]{9}" required></div><div><div><button type="submit" >Confirm</button></div><div> <button onclick="Alert.okCancel()">Cancel</button></div></div></form>';
var unavailability_msg = 'Sorry...We are unable to cater your booking at the moment due to unavailability of rooms';
var availability_msg = 'Your rooms are available..You can proceed and confirm the booking'; 
var ok_html = '<div><button onclick="Alert.okCancel()">OK</button></div>';
//var confirm_html = '<div><button type="submit" onclick="confirmBooking()">Confirm</button></div><div> <button onclick="Alert.okCancel()">Cancel</button></div>';
var proceed_html = '<div><button onclick="Alert.render(formCreator,\' \')">Proceed</button></div>';
var check_msg = 'Check-in and check-out dates do not match...No of rooms cannot be zero';
var ok_1_html = '<div><button onclick="Alert.ok()">OK</button></div>';
var mail_html = 'Your Booking is placed...Confirmaton email is sent to you';

var d_rooms = [];
var s_rooms = [];

function customAlert(){
    this.render = function(bodyString,footerString){
        var winH = window.innerHeight;
        var winW = window.innerWidth;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.left = (winW/2) - (550/2) +"px";
        dialogbox.style.display = "block";


        document.getElementById('dialogboxhead').innerHTML ="Room Availability";
        document.getElementById('dialogboxbody').innerHTML = bodyString;
        document.getElementById('dialogboxfoot').innerHTML = footerString;
    }
    this.okCancel = function(){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogoverlay').style.display = "none";
      document.getElementById('check_form').reset();
      d_rooms = [];
      s_rooms = [];
      console.log(d_rooms);
      console.log(s_rooms);
  }

    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        d_rooms = [];
        s_rooms = [];
        console.log(d_rooms);
        console.log(s_rooms);
    }
}

var Alert = new customAlert();


function checkAvailability(){
    var checkIn = document.forms["check_form"]["check-in"].value;
    var checkOut = document.forms["check_form"]["check-out"].value;
    var room_type = document.forms["check_form"]["room_type"].value;
    var double = document.forms["check_form"]["double"].value;
    var single = document.forms["check_form"]["single"].value;
    console.log(double);
    console.log(single);

  if((checkIn<checkOut) && !((double==0)&&(single==0))){ 

  db.collection('room-details').where('type','==',room_type).orderBy('booked').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{ 
          if(checkIn > doc.data().booked_till){
              if((doc.data().bed =='Double') && (double != d_rooms.length)){
                var d = doc.data().id;
                d_rooms.push(d);
              }
              if((doc.data().bed =='Single') && (single != s_rooms.length)){
                var s = doc.data().id;
                s_rooms.push(s);
             }
          }  
      })
    })

    .then( ()=> {
      console.log(d_rooms);
      console.log(d_rooms.length);
      console.log(s_rooms);
      console.log(s_rooms.length);
      if((d_rooms.length == double) && (s_rooms.length == single)){
        Alert.render(availability_msg,proceed_html);
      }else{
        Alert.render(unavailability_msg,ok_html);
      }
    })

  }else{
    Alert.render(check_msg,ok_1_html);
  }
  return false;
}

function confirmBooking(){
  var name = document.forms["book_form"]["name"].value;
  var email = document.forms["book_form"]["email"].value;
  var telephone = document.forms["book_form"]["tel"].value;
  var checkIn = document.forms["check_form"]["check-in"].value;
  var checkOut = document.forms["check_form"]["check-out"].value;
  db.collection("room-bookings").add({
    name:name,
    email:email,
    telephone:telephone,
    check_in:checkIn,
    check_out:checkOut,
    rooms:d_rooms.join()+" ,"+s_rooms.join(),
    package:document.forms["check_form"]["package"].value
  })

  function sendMail(msg_body) {
    Email.send({
    Host: "smtp.gmail.com",
    Username : "hotelpearlmis@gmail.com",
    Password : "pearl#123",
    To : 'ranidusjcrox@gmail.com',
    From : "hotelpearlmis@gmail.com",
    Subject : "Booking Confirmation",
    Body : msg_body,
    }).then(
      message => alert("mail sent successfully")
    );
  }

  var double = "Double-Bed Rooms : "+d_rooms.join();
  var single = "Single-Bed Rooms : "+s_rooms.join();
  var msg_body = "The following rooms have been booked \nfor you from "+checkIn+" to "+checkOut+" \n" +double+" \n"+single;
  sendMail(msg_body);
return false;
}
      