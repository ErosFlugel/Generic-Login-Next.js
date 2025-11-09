import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const saltRounds = 10; // Adjust for desired security/performance balance
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Store hashedPassword in your database along with the user's email
      // Example: await createUserInDatabase(email, hashedPassword);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
