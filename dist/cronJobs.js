"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const node_cron_1 = __importDefault(require("node-cron"));
const firebase_1 = __importDefault(require("./firebase"));
const energyByLevel = {
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
const resetUserEnergy = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.default, "users"));
        querySnapshot.forEach((userDoc) => __awaiter(void 0, void 0, void 0, function* () {
            const userEnergyRef = (0, firestore_1.doc)(firebase_1.default, "energies", userDoc.id);
            const userEnergyDoc = yield (0, firestore_1.getDoc)(userEnergyRef);
            if (userEnergyDoc.exists()) {
                const level = userEnergyDoc.data().level;
                const energy = energyByLevel[level];
                yield (0, firestore_1.updateDoc)(userEnergyRef, {
                    energy: energy,
                    time: firestore_1.Timestamp.fromDate(new Date()),
                });
            }
            else {
                yield (0, firestore_1.setDoc)(userEnergyRef, {
                    level: 1,
                    energy: energyByLevel[1],
                    time: firestore_1.Timestamp.fromDate(new Date()),
                }, { merge: true });
            }
        }));
    }
    catch (ex) {
        console.log(ex);
    }
});
const resetEarnPerHour = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.default, "users"));
        querySnapshot.forEach((userDoc) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, firestore_1.updateDoc)(userDoc.ref, { earnedPerHour: false });
        }));
    }
    catch (ex) {
        console.log(ex);
    }
});
const initCrons = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Init Crons");
    node_cron_1.default.schedule("0 */1 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("**Reset Earn Per Hour**");
        yield resetEarnPerHour();
    }));
    node_cron_1.default.schedule("0 */2 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("**Reset User Energy**");
        yield resetUserEnergy();
    }));
});
exports.default = initCrons;
