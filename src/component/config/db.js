import Dexie from "dexie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "KoKo"; // Change this to a secure key

const db = new Dexie("EnergyDB");
db.version(1).stores({
    energyData: "key,value",
});

// Encrypt data before storing
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data when retrieving
export const decryptData = (cipherText) => {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

export default db;
