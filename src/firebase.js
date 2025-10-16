// src/firebase.js
// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ¡Importante! Añade esto para la autenticación

// La configuración de tu aplicación web de Firebase
// Asegúrate de que los valores aquí (especialmente la apiKey) son los correctos de tu consola de Firebase.
const firebaseConfig = {
  apiKey: "YOUR APIKEY", // <-- USA TU API KEY COMPLETA OBTENIDA DE FIREBASE
  authDomain: "tiendadawe.firebaseapp.com",
  projectId: "tiendadawe",
  storageBucket: "tiendadawe.appspot.com",
  messagingSenderId: "643368930143",
  appId: "1:643368930143:web:d3b80d8e4973be6fe9c4ea",
  measurementId: "G-5V0LNHYE32"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta el servicio de autenticación para poder usarlo en otros componentes
export const auth = getAuth(app); 
