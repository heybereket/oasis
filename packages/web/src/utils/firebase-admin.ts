import admin, { ServiceAccount, app } from 'firebase-admin';

export const serviceAccount: ServiceAccount = {
  // type: 'service_account',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // private_key_id: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
  // client_id: process.env.CLIENT_ID,
  // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  // token_uri: 'https://oauth2.googleapis.com/token',
  // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  // client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

export default async function getFirebaseAdmin(): Promise<app.App> {
  if (!admin.apps.length) {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin.app();
}
