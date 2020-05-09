var msg_body = "The following rooms have been booked \nfor you from check-in to check-out"+" \n" +double+" \n"+single;
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

var d_rooms = [];
d_rooms.push(2);
d_rooms.push(3);
var s_rooms = [1,5]; 
console.log(d_rooms);
console.log(d_rooms.length);
var double = "Double-Bed Rooms : "+d_rooms.join();
var single = "Single-Bed Rooms : "+s_rooms.join();


console.log(msg_body);