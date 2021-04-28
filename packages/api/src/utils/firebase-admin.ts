import admin, { ServiceAccount } from "firebase-admin";

export const serviceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.CLIENT_EMAIL,
  /* type: 'service_account',
  private_key_id: process.env.PRIVATE_KEY_ID,
  client_id: process.env.CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL, */
};

export default admin.apps.length
  ? admin.app()
  : admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
