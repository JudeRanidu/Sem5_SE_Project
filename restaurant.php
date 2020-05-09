<html>
<head>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-firestore.js"></script>
    <link rel="stylesheet" href="styles.css"/>
</head>
<body>
<?php
include('header.html');
?>
<div id="menu_grid" class="menuGrid"> </div>

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

<div id="menuoverlay"></div>
<div id="menunav" class="menunav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeSubMenu()">&times;</a>
</div>

<script src="restaurant.js"></script>
<?php
include('footer.html');
?>
</body>
</html>