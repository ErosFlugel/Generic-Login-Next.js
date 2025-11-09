import bcrypt from 'bcryptjs';

export async function hashString(str) {
  try {
    const saltRounds = 10; // Adjust for desired security/performance balance
    const hashedPassword = await bcrypt.hash(str, saltRounds);

    return hashedPassword;
  } catch (error) {
    console.error('Error hashing:', error);
    return error;
  }
}

export async function verifyHash(str, hash) {
  try {
    const passwordMatch = await bcrypt.compare(str, hash);

    return passwordMatch;
  } catch (error) {
    console.error('Error during hashing:', error);
    return error;
  }
}
