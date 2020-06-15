require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database');

/**
 * Make database connection
 */
db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

app.use(cors());
app.use(express.json());

/**
 * Handle Routes
 */
const auth = require('./routes/auth');
app.use('/login', auth);
app.get('/', (req, res) => res.send('Working fine'));

app.listen(process.env.PORT, () =>  console.log(`Server runnig on PORT ${ process.env.PORT }`));