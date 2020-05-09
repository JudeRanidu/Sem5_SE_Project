<html>
<head>
<link rel="stylesheet" href="styles.css">
</head>
<body>
  <?php
  include('header.html');
  ?>
<div id="webchat"/>
<script src="https://storage.googleapis.com/mrbot-cdn/webchat-latest.js"></script>
// Or you can replace latest with a specific version
<script>
  WebChat.default.init({
    selector: "#webchat",
    initPayload: "/get_started",
    customData: {"language": "en"}, // arbitrary custom data. Stay minimal as this will be added to the socket
    socketUrl: "http://localhost:5005",
    socketPath: "/socket.io/",
    title: "Pearl Chat Assistant",
    subtitle: "Powered by Rasa",
    inputTextFieldHint: "Type Something Here...",
    connectingText: "Waiting for server...",
    fullScreenMode: true,
    showFullScreenButton: true,
  })
</script>
<!--
<div id="webchat"></div>
<script>
  WebChat.default.init({
    selector: "#webchat",
    initPayload: "/intro_registered_accounts",
    socketUrl: "http://localhost:5005/",
    tooltipPayload: "/tooltip_registered_accounts",
    tooltipDelay: 40000,
    socketPath: "/socket.io/",
    customData: {
      language: 'fr'
    },
    // subtitle: 'A subtitle',
    inputTextFieldHint: "Type a message...",
    connectingText: "Waiting for server...",
    profileAvatar: "https://storage.googleapis.com/dev-media-store-botfront-cloud/logo_square_circle_white_bg256.jpg",
    hideWhenNotConnected: false,
    defaultHighlightAnimation: `@keyframes default-botfront-blinker-animation {
      from {
      outline-style: none;
      outline-color: red;
    }
    to {
      outline-style: solid;
      outline-color: red;
    }
  }`,
    onSocketEvent: {
      'bot_uttered': () => console.log('bot uttered'),
    },
    docViewer: false,
    params: {
      images: {
        dims: {
          width: 300,
          height: 200
        }
      },
      storage: "session"
    }
  })
</script> -->
  <?php
    include('footer.html');
  ?>
</body>
</html>