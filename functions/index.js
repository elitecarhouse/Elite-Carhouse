const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

// Cada vez que la app escribe un documento nuevo en la colección "avisos"
// (esto ya pasa en App.jsx con fsSet("avisos", ...) para vendidos, matches,
// cambios de precio, solicitudes conseguidas, etc.), esta función manda
// un push a todos los dispositivos registrados en "device_tokens".
exports.enviarPushAviso = onDocumentCreated("avisos/{avisoId}", async (event) => {
  const aviso = event.data?.data();
  if (!aviso) return;

  const db = getFirestore();
  const tokensSnap = await db.collection("device_tokens").get();
  const tokens = tokensSnap.docs.map((d) => d.id);
  if (tokens.length === 0) return;

  const mensaje = {
    notification: {
      title: "Elite Carhouse",
      body: aviso.mensaje || "Tienes un aviso nuevo",
    },
    tokens,
  };

  const respuesta = await getMessaging().sendEachForMulticast(mensaje);

  // Limpieza: borra tokens que ya no son válidos (app desinstalada, permiso revocado, etc.)
  const invalidos = [];
  respuesta.responses.forEach((r, i) => {
    if (!r.success && r.error?.code === "messaging/registration-token-not-registered") {
      invalidos.push(tokens[i]);
    }
  });
  await Promise.all(invalidos.map((t) => db.collection("device_tokens").doc(t).delete()));
});
