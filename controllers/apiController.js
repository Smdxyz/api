const db = require('../database');

// Add new API
exports.addApi = (req, res) => {
  const { name, url, limit } = req.body;
  const owner = "Sann"; // Fixed owner key

  db.run(
    'INSERT INTO apis (name, url, limit, owner) VALUES (?, ?, ?, ?)',
    [name, url, limit || 1000, owner],
    function (err) {
      if (err) {
        return res.status(500).send({ message: 'Failed to add API' });
      }
      res.status(201).send({ id: this.lastID, name, url, limit, owner });
    }
  );
};

// Delete API
exports.deleteApi = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM apis WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).send({ message: 'Failed to delete API' });
    }
    res.status(200).send({ message: 'API deleted' });
  });
};

// Update API limit
exports.updateLimit = (req, res) => {
  const { id } = req.params;
  const { limit } = req.body;
  db.run(
    'UPDATE apis SET limit = ? WHERE id = ?',
    [limit, id],
    function (err) {
      if (err) {
        return res.status(500).send({ message: 'Failed to update limit' });
      }
      res.status(200).send({ message: 'API limit updated' });
    }
  );
};

// Get API stats
exports.getStats = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM apis WHERE id = ?', [id], (err, row) => {
    if (err || !row) {
      return res.status(404).send({ message: 'API not found' });
    }
    res.status(200).send({
      errorStats: row.errorStats,
      successStats: row.successStats,
    });
  });
};

// Get all APIs
exports.getAllApis = (req, res) => {
  db.all('SELECT * FROM apis', [], (err, rows) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to fetch APIs' });
    }
    res.status(200).json(rows);
  });
};
