import admin from 'firebase-admin';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

console.log("Testing Backend Configuration...");

try {
    const serviceAccount = require("./serviceAccountKey.json");
    console.log("✅ serviceAccountKey.json found!");
    console.log("Project ID:", serviceAccount.project_id);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin initialized successfully!");
} catch (error) {
    console.error("❌ Error loading service account or initializing admin:", error.message);
}
