var formCreator = '<form action="rooms.php" method="POST" name="book_form" onsubmit="return confirmBooking();"><div><label>Name</label><input type="text" name="name" required></div<div><label>Email</label><input type="email" name="email" required></div><div><label>Telephone</label><input type="tel" name="tel" pattern="0[0-9]{9}" required></div><div><div><button name="confirm_btn" type="submit" >Confirm</button></div><div> <button name="cancel_btn" type="button" onclick="Alert.okCancel()">Cancel</button></div></div></form>';
var unavailability_msg = 'Sorry...We are unable to cater your booking at the moment due to unavailability of rooms';
var availability_msg = 'Your rooms are available..You can proceed and confirm the booking'; 
var ok_html = '<div><button onclick="Alert.okCancel()">OK</button></div>';
var proceed_html = '<div><button name="proceed_btn" onclick="Alert.render(formCreator,\' \')">Proceed</button></div>';
var check_msg = 'Check-in and check-out dates do not match...No of rooms cannot be zero';
var ok_1_html = '<div><button onclick="Alert.ok()">OK</button></div>';
var mail_html = 'Your Booking is placed...Confirmaton email is sent to you';

var d_rooms = []; //two arrays to keep the ids of the selected available rooms
var s_rooms = [];

//function to create a modal type object to display messages to the user and get booking confirmation details
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
    //button with unavailability msg, cancel of booking and final ok button
    this.okCancel = function(){
      document.getElementById('dialogbox').style.display = "none";
      document.getElementById('dialogoverlay').style.display = "none";
      document.getElementById('check_form').reset();
      d_rooms = [];
      s_rooms = [];
      console.log(d_rooms);
      console.log(s_rooms);
  }
    //buuton with dates error message
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        d_rooms = [];
        s_rooms = [];
        console.log(d_rooms);
        console.log(s_rooms);
    }
}

/*function closeForm(){
  document.getElementById('dialogbox').style.display = "none";
  document.getElementById('dialogoverlay').style.display = "none";
  document.getElementById('check_form').reset();
  d_rooms = [];
  s_rooms = [];
}*/

var Alert = new customAlert();

//funtion to check the availability of rooms based on the given input
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
//funtion to get the details of the booking person and confirm the booking
function confirmBooking(){
  var name = document.forms["book_form"]["name"].value;
  var email = document.forms["book_form"]["email"].value;
  var telephone = document.forms["book_form"]["tel"].value;
  var checkIn = document.forms["check_form"]["check-in"].value;
  var checkOut = document.forms["check_form"]["check-out"].value;
  var room_type = document.forms["check_form"]["room_type"].value;
  var package = document.forms["check_form"]["package"].value;

  var rooms = "";
  if ((d_rooms.length==0) && (s_rooms.length!=0)){
    rooms = s_rooms.join()
  }
  if ((d_rooms.length!=0) && (s_rooms.length==0)){
    rooms = d_rooms.join()
  }
  if ((d_rooms.length!=0) && (s_rooms.length!=0)){
    rooms = d_rooms.join()+","+s_rooms.join()
  }
  //adding a new booking to  the database
  db.collection("room-bookings").add({
    name:name,
    email:email,
    telephone:telephone,
    check_in:checkIn,
    check_out:checkOut,
    rooms:rooms,
    package:package
  })
  //updating the double bed rooms with booking details
  if (d_rooms.length!=0){
    var d;
    for (d of d_rooms) {
      db.collection('room-details').where('id','==',d).get().then((snapshot)=>{
        snapshot.docs.forEach(doc =>{ 
          db.collection('room-details').doc(doc.id).update({
            booked: true,
            booked_till: checkOut 
          })
        })
      })
    }
  }//updating the single bed rooms with booking details
  if (s_rooms.length!=0){
    var s;
    for (s of s_rooms) {
      db.collection('room-details').where('id','==',s).get().then((snapshot)=>{
        snapshot.docs.forEach(doc =>{ 
          db.collection('room-details').doc(doc.id).update({
            booked: true,
            booked_till: checkOut 
          })
        })
      })
    }
  }
  //function to send the confirmation email
  function sendMail(msg_body,email) {
    Email.send({
    Host: "smtp.gmail.com",
    Username : "hotelpearlmis@gmail.com",
    Password : "pearl#123",
    To : email,
    From : "hotelpearlmis@gmail.com",
    Subject : "Booking Confirmation",
    Body : msg_body,
    }).then(
      Alert.render(mail_html,ok_html)
    );
  }

  var double = d_rooms.join();
  var single = s_rooms.join();

  //creating the html view of the email body
  var msg1 = '<html><body><div style="box-sizing: border-box; font-family: sans-serif; width: 100%; height:fit-content; background-color: black; padding-top: 20px; padding-bottom: 20px; text-align: center;"><div style="font-size: 17pt; box-sizing: border-box; width: 95%; margin: auto; height:fit-content; background-color:dodgerblue;color: ghostwhite; padding: 15px 15px; ">';
  var msg2 = 'Hotel Pearl - Booking Confirmation</div><div style="box-sizing: border-box; width: 95%; height: fit-content; background-color: white; margin: auto; padding-bottom: 20px;"><table style="box-sizing: border-box; width:95%; height: fit-content; margin: auto; padding-top: 20px; font-size: 13pt; text-align: center;"><tr>';
  var msg3 = '<td style="box-sizing: border-box;background-color:lightslategrey; padding: 10px 10px;">Check-In Date</td><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">'+checkIn+'</td></tr><tr><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">';
  var msg4 = 'Check-Out Date</td><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">'+checkOut+'</td></tr>';
  var msg5 = '<tr><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">Package Type</td><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">'+package+'</td></tr>';
  var msg6 = '<tr><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">Room Type</td><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">'+room_type+'</td></tr>';
  var msg7 = '<tr><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">Double Bedroom-Room Nos</td><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">'+double+'</td></tr><tr><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">Single Bedroom-Room Nos</td><td style="box-sizing: border-box;background-color: lightslategrey; padding: 10px 10px;">'+single+'</td></tr></table></div></div></body></html>';

  var msg_body = msg1+msg2+msg3+msg4+msg5+msg6+msg7;
  
  sendMail(msg_body,email);

  return false;
}
      