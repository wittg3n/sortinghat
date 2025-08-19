require('dotenv').config();
const express = require('express');
const db = require('/home/user/sortinghat/backend/src/config/db'); // Use absolute path
const apiRouter = require('/home/user/sortinghat/backend/src/routes/api'); // Use absolute path

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Express server is running!');
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Server shutting down...');
  await db.endConnection(); // Call the endConnection method from the db module
  process.exit(0);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});