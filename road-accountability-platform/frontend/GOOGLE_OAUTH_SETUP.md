# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication for the Road Accountability Platform.

## Prerequisites

- A Google Cloud Console account (free)
- A registered domain or localhost for development

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter "Road Accountability Platform" as the project name
5. Click "CREATE"

### 2. Enable Google+ API

1. In the Google Cloud Console, go to **APIs & Services > Library**
2. Search for "Google+ API"
3. Click on "Google+ API" in the results
4. Click "ENABLE"

### 3. Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**
2. Click "CREATE CREDENTIALS"
3. Select **OAuth 2.0 Client ID**
4. If prompted to "Configure OAuth consent screen":
   - Select "External" for User Type
   - Click "CREATE"
   - Fill in the application details:
     - App name: "Road Accountability Platform"
     - User support email: Your email
     - Developer contact: Your email
   - Click "SAVE AND CONTINUE"
   - Skip optional scopes and click "SAVE AND CONTINUE"
   - Click "SAVE AND CONTINUE" again
   - Click "BACK TO DASHBOARD"

### 4. Configure the OAuth Consent Screen

1. Go back to **APIs & Services > Credentials**
2. Click "CREATE CREDENTIALS" again
3. Select **OAuth 2.0 Client ID**
4. Choose "Web application"
5. Name it "Road Accountability Frontend"
6. Add Authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
7. Add Authorized redirect URIs:
   - For development: `http://localhost:3000/auth`
   - For production: `https://yourdomain.com/auth`
8. Click "CREATE"
9. Copy your **Client ID** (you'll need this)

### 5. Configure Environment Variables

1. Create a `.env` file in the `frontend` directory (or update if it exists):

```bash
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with the Client ID you copied in the previous step.

Example:
```bash
REACT_APP_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
```

### 6. Test Google OAuth

1. Restart your frontend application:
   ```bash
   cd frontend
   npm start
   ```

2. Navigate to `http://localhost:3000/auth`

3. You should see a "Sign in with Google" button

4. Click it and follow the Google sign-in flow

## Troubleshooting

### "Uncaught Error: No OAuth client provided"
- Make sure you added the Client ID to your `.env` file
- Restart the development server after updating `.env`

### "OAuth consent screen has not been configured"
- Go back to **APIs & Services > OAuth consent screen**
- Make sure you have configured it as "External"

### "Redirect URI mismatch"
- Verify that `http://localhost:3000` is in your Authorized JavaScript origins
- Make sure you're accessing the app at exactly `http://localhost:3000`

### "Invalid Client ID"
- Double-check that you copied the entire Client ID correctly
- No extra spaces at the beginning or end

## Using Google OAuth

### For Users

1. Visit the authentication page
2. Click "Sign in with Google"
3. Select your Google account
4. Authorize the application
5. You'll be logged in and redirected to the home page

### For Developers

The Google OAuth implementation uses:

- **Frontend:** `@react-oauth/google` library
- **Service:** `src/services/googleAuth.js`
- **Context:** `src/contexts/AuthContext.js` with `signInWithGoogle` function
- **Backend:** `src/routes/auth.js` for token validation (optional)

User data is stored in localStorage:
- `user`: User object with email, name, picture, etc.
- `authToken`: Google OAuth token
- `authProvider`: Set to 'google' to identify the auth method

## Production Deployment

For production:

1. Update your `.env` file with your production domain
2. Change authorized origins and redirect URIs in Google Cloud Console to your production domain
3. Implement database storage for user profiles in the backend
4. Add server-side token verification in `src/routes/auth.js`

## Security Considerations

- Never commit your `.env` file to version control
- Always verify tokens server-side in production
- Store user data securely in your database
- Use HTTPS in production
- Implement CSRF protection if storing sensitive data

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [JWT Decode Library](https://www.npmjs.com/package/jwt-decode)

## Support

For issues or questions, please refer to:
- Google Cloud Console Help: https://support.google.com/cloud
- React OAuth Issues: https://github.com/react-oauth/react-oauth.github.io/issues
