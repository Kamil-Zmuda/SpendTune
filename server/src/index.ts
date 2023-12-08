import app from './app';

import mongoose from 'mongoose';

const DB_PORT = Number(process.env.DB_PORT) || 27017;
const DB_NAME = process.env.DB_NAME || 'SpendTune';

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`)
  .then(() =>
    console.log(`🦆 Database for SpendTune connected @ port ${DB_PORT}!`)
  )
  .catch((err) => console.log(`😞 Sorry, something went wrong! ${err}`));

const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.listen(SERVER_PORT, () => {
  console.log(`💰SpendTune💰  server is listening on port ${SERVER_PORT}!`);
});
