<html>
    <head>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-firestore.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <?php
        include('header.html');
        ?>
        <div class="reviewMain">
        <div id="review_info" class="reviewInfo">
        <div id="info">This is What Our Customers Say </br> About Us.... <i class="fa fa-hand-o-right" style="color:white;font-size:43pt;"></i></br> 
        Based on the Customer Feedback </br> We Have an Overall Rating of....</div>
        <div id="overall_star"></div>    
        </div>
        <div id="review_grid" class="reviewGrid"> </div>
        </div>
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
        <?php
        include('footer.html');
        ?>
        <script src="reviews.js"></script>
    </body>
</html>