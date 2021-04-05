var admin = require('firebase-admin')

export const serviceAccount = {
  type: 'service_account',
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replaceAll('\\n', '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
}

export default async function getFirebaseAdmin() {
  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
  return admin
}
