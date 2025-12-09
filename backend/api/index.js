import serverless from 'serverless-http';
import app from '../server.js';

// Wrap the Express app with serverless-http and export as the default handler for Vercel
export default serverless(app);
