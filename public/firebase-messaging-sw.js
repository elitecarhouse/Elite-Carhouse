/* Este archivo debe quedar en la carpeta "public" de tu proyecto
   (para que quede accesible en https://tu-dominio/firebase-messaging-sw.js).
   Es el script que el navegador mantiene corriendo en segundo plano y que
   muestra la notificación aunque la app esté cerrada. */

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAvAPNGOAkBhHN8mlOpapCXuu-At6R7-Es",
  authDomain: "elite-carhouse.firebaseapp.com",
  projectId: "elite-carhouse",
  storageBucket: "elite-carhouse.firebasestorage.app",
  messagingSenderId: "108968406734",
  appId: "1:108968406734:web:69fb3a935a9f87cd13ea9f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const titulo = payload.notification?.title || "Elite Carhouse";
  const cuerpo = payload.notification?.body || "Tienes un aviso nuevo.";
  self.registration.showNotification(titulo, {
    body: cuerpo,
    icon: "/icon-192.png", // opcional: pon aquí el ícono de tu app si lo tienes
    badge: "/icon-192.png",
  });
});
