<html>
    <head>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-firestore.js"></script>
    <script src="smtp.js"></script>

        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <?php
        include('header.html');
        ?>
        <div id="room_grid" class="roomGrid"> </div>


        <script>
            var firebaseConfig = {
            apiKey: "AIzaSyDXR1eDqjhl2rbgAiwCUP-yEG8yYIDrgQo",
            authDomain: "hotel-management-system-274f5.firebaseapp.com",
            databaseURL: "https://hotel-management-system-274f5.firebaseio.com",
            projectId: "hotel-management-system-274f5",
            storageBucket: "hotel-management-system-274f5.appspot.com",
            messagingSenderId: "31506744792",
            appId: "1:31506744792:web:61095de21540643c6e1ead",
            measurementId: "G-QTY6419VX2"
            };
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
            const db = firebase.firestore();
          </script>
          
        <script src="rooms.js"></script>
        <div class="room_main">
        <div class="search_head">
            Want to Experience a Wonderful Stay at Our Hotel?</br> Check Our Rooms and Make a Booking...
        </div>
        <div id='dialogoverlay'></div>
        <div id='dialogbox'>
            <div>
                <div id='dialogboxhead'></div>
                <div id='dialogboxbody'></div>
                <div id='dialogboxfoot'></div>
            </div>
        </div>
        <script src="room_booking.js"></script>
        <form id="check_form" name="check_form" class="search_form" action="rooms.php" method="POST" onsubmit="return checkAvailability();">

            <div><label>Check-In Date</label><input id="in_date" type="date" name="check-in" required></div>
            <div><label>Check-Out Date</label><input id="out_date" type="date" name="check-out" required></div>
            <div>
                <label>Room Type</label>
                <div class="div_div">
                    <input type="radio" id="sea-view" name="room_type" value="Sea-View" required><label for="sea-view">Sea-View</label><br>
                    <input type="radio" id="normal" name="room_type" value="Normal" required><label for="normal">Normal</label>
                </div>
            </div>
            <div>
                <label>Package</label>
                <select id="package" name="package">
                    <option value="Full-Board">Full-Board</option>
                    <option value="Half-Board">Half-Board</option>
                    <option value="Breakfast Only">Breakfast Only</option>
                </select>
            </div>
            <div>
             <label>Double Rooms</label><input id="double_no" type="number" name="double" value="0" min="0" required>
             <label>Single Rooms</label><input id="single_no" type="number" name="single" value="0" min="0" required>
             </div>
            <input id="availability_btn" type="submit" value="Check Availability">
        </form>
        
        </div>
        <?php
        include('footer.html');
        ?>
    </body>
</html>