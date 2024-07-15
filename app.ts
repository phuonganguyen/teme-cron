import express, { Request, Response } from "express";
import initCrons from "./cronJobs";
import db from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

const server = app
  .listen(port, () => console.log(`Example app listening on port ${port}!`))
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

initCrons();

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach(async (userDoc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(userDoc.id, " => ", userDoc.data());

    const userEnergyRef = doc(db, "energies", userDoc.id);
    const userEnergyDoc = await getDoc(userEnergyRef);
    if (userEnergyDoc.exists()) {
      await updateDoc(userEnergyRef, { energy: 1000 });
    } else {
      await setDoc(userEnergyRef, { energy: 1000 }, { merge: true });
    }
  });
};

getUsers();
