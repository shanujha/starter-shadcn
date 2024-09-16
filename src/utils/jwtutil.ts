import { SignJWT } from 'jose';


// Shared secret key (usually stored in environment variables in production)
const secretKey = new TextEncoder().encode('your_secret_key_here')

// Function to create a JWT
async function createJWT(payload: any) {

  const token = await new SignJWT(payload) // details to  encode in the token
      .setProtectedHeader({ alg: 'HS256' }) // algorithm
      .setIssuedAt()
      .setExpirationTime("1h") // token expiration time, e.g., "1 day"
      .sign(secretKey);

  return token

}


const JWT_UTILS = {
    createJWT,
};


export default JWT_UTILS;