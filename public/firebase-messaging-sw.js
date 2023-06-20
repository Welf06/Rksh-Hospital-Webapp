// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
   apiKey: "AIzaSyCLuV65hHaqF3to-6wFCt60lDq44kbVWPU",
   authDomain: "hospitalapp-387104.firebaseapp.com",
   projectId: "hospitalapp-387104",
   storageBucket: "hospitalapp-387104.appspot.com",
   messagingSenderId: "172387330522",
   appId: "1:172387330522:web:488509267ca53df2d838e3",
   measurementId: "G-XM59CBMWMR"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});