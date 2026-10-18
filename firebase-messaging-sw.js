/* ==========================================
   PATCH-AT FIREBASE MESSAGING SERVICE WORKER
   ========================================== */

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);


/* ==========================================
   FIREBASE CONFIG
   ========================================== */

firebase.initializeApp({

  apiKey:
    "AIzaSyAdEhQTgHQtCaat5dPKBAizgNYpoxm4dco",

  authDomain:
    "patch-at.firebaseapp.com",

  projectId:
    "patch-at",

  storageBucket:
    "patch-at.firebasestorage.app",

  messagingSenderId:
    "201035067162",

  appId:
    "1:201035067162:web:021d18b8f574bcbe8cc6a3"

});


/* ==========================================
   MESSAGING
   ========================================== */

const messaging =
  firebase.messaging();



/* ==========================================
   BACKGROUND MESSAGE
   ========================================== */

messaging.onBackgroundMessage(
  payload => {

    console.log(
      "Background message:",
      payload
    );


    const title =
      payload.notification?.title ||
      "Patch-at";


    const body =
      payload.notification?.body ||
      "มีข้อความใหม่";


    const icon =
      payload.notification?.icon ||
      "./icon-192.png";


    self.registration.showNotification(
      title,
      {

        body:

          body,

        icon:

          icon,

        badge:

          icon,

        data:

          payload.data || {}

      }
    );

  }
);



/* ==========================================
   CLICK NOTIFICATION
   ========================================== */

self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();


    event.waitUntil(

      clients.matchAll({

        type:
          "window",

        includeUncontrolled:
          true

      })

      .then(
        clientList => {


          for (
            const client of clientList
          ) {

            if (
              "focus" in client
            ) {

              return client.focus();

            }

          }


          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              "./"
            );

          }

        }
      )

    );

  }
);
