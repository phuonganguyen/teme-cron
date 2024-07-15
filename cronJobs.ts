import cron from "node-cron";
import db from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const energyByLevel: { [level: number]: number } = {
  1: 1000,
  2: 1500,
  3: 2000,
  4: 2500,
  5: 3000,
  6: 5000,
  7: 5500,
  8: 6000,
  9: 6500,
  10: 7000,
  11: 8000,
  12: 9000,
  13: 10000,
  14: 12000,
  15: 15000,
};

const resetUserEnergy = async () => {
  console.log("**Reset User Energy**");
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach(async (userDoc) => {
    const level = userDoc.data().level;
    const energy = energyByLevel[level];
    console.log(userDoc.id, " => ", energy);

    const userEnergyRef = doc(db, "energies", userDoc.id);
    const userEnergyDoc = await getDoc(userEnergyRef);
    if (userEnergyDoc.exists()) {
      await updateDoc(userEnergyRef, { energy: energy });
    } else {
      await setDoc(userEnergyRef, { energy: energy }, { merge: true });
    }
  });
};

const initCrons = () => {
  cron.schedule("0 */2 * * *", resetUserEnergy);
};

export default initCrons;
