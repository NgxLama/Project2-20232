import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// Initialize the Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount)
});

const dbadmin = getFirestore();

export default dbadmin;