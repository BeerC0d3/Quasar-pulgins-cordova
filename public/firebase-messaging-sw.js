importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAvlS1GpnO7kktVKn6F9I0zGpoErM7AaEM",
  authDomain: "beerc0d3-pnotifications.firebaseapp.com",
  projectId: "beerc0d3-pnotifications",
  storageBucket: "beerc0d3-pnotifications.appspot.com",
  messagingSenderId: "1009225570027",
  appId: "1:1009225570027:web:02cb9bddb3119515e510ae",
  measurementId: "G-92YNRD5MYG",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

//If the app in background, then we will show the notification
messaging.setBackgroundMessageHandler(function (payload) {
  var title = payload.data.title;
  var options = {
    body: payload.data.message,
    icon: "favicon.ico",
  };
  return self.registration.showNotification(title, options);
});
