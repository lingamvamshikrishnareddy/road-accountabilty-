const express = require('express');
const router = express.Router();

// Google OAuth endpoint
router.post('/google', async (req, res) => {
  try {
    const { token, email, name, picture } = req.body;

    // In production, verify the token with Google API:
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    // const ticket = await client.verifyIdToken({
    //   idToken: token,
    //   audience: process.env.GOOGLE_CLIENT_ID,
    // });
    // const payload = ticket.getPayload();

    // For now, we'll accept the frontend validation
    // Store or update user in database
    const user = {
      id: email, // Use email as unique identifier
      email,
      name,
      picture,
      provider: 'google',
      createdAt: new Date(),
    };

    // TODO: Save user to database if needed

    return res.json({
      success: true,
      user,
      token: token, // Return the same token from Google
      message: 'User authenticated successfully',
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.status(400).json({
      success: false,
      message: 'Failed to authenticate with Google',
      error: error.message,
    });
  }
});

// Standard email/password login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // TODO: Implement email/password validation
    // For now, just return success
    return res.json({
      success: true,
      user: { email },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(400).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
});

// Sign up endpoint
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // TODO: Implement user registration
    // For now, just return success
    return res.json({
      success: true,
      user: { email, name },
      message: 'Signup successful',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(400).json({
      success: false,
      message: 'Signup failed',
      error: error.message,
    });
  }
});

module.exports = router;
