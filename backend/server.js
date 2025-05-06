// === backend/server.js ===
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const BADGE_DIR = path.join(__dirname, 'badges');
if (!fs.existsSync(BADGE_DIR)) fs.mkdirSync(BADGE_DIR);

app.post('/badge', (req, res) => {
  const badgeData = req.body;
  const filename = `badge-${Date.now()}.json`;
  const filePath = path.join(BADGE_DIR, filename);

  fs.writeFile(filePath, JSON.stringify(badgeData, null, 2), err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save badge.' });
    }
    res.status(200).json({ message: 'Badge saved.', path: `/badges/${filename}` });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
