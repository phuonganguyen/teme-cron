import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import cron from "node-cron";

import db from "./firebase";

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
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (userDoc) => {
      const userEnergyRef = doc(db, "energies", userDoc.id);
      const userEnergyDoc = await getDoc(userEnergyRef);
      if (userEnergyDoc.exists()) {
        const level = userEnergyDoc.data().level;
        const energy = energyByLevel[level];
        await updateDoc(userEnergyRef, {
          energy: energy,
          time: Timestamp.fromDate(new Date()),
        });
      } else {
        await setDoc(
          userEnergyRef,
          {
            level: 1,
            energy: energyByLevel[1],
            time: Timestamp.fromDate(new Date()),
          },
          { merge: true }
        );
      }
    });
  } catch (ex) {
    console.log(ex);
  }
};

const initCrons = async () => {
  console.log("Init Crons");
  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
  });

  console.log("**Reset User Energy**");
  await resetUserEnergy();
  // cron.schedule("0 */2 * * *", async () => {
  //   console.log("**Reset User Energy**");
  //   await resetUserEnergy();
  // });
};

export default initCrons;
