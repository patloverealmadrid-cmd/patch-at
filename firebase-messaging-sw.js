
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAdEhTGgHQtCaat2dPKBAizgNYpoxm4dco",
  authDomain: "patch-at.firebaseapp.com",
  projectId: "patch-at",
  storageBucket: "patch-at.firebasestorage.app",
  messagingSenderId: "201035067162",
  appId: "1:201035067162:web:021d18b8f574bcbe8cc6a3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    (payload.notification && payload.notification.title) ||
    "ข้อความใหม่ใน Patch-at";

  const options = {
    body:
      (payload.notification && payload.notification.body) ||
      "คุณมีข้อความใหม่"
  };

  self.registration.showNotification(title, options);
});

