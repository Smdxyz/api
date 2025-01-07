const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = 3000;

// Setup body-parser
app.use(bodyParser.json());

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add new API
app.post('/api/add', (req, res) => {
  const { name, url, limit } = req.body;
  db.run(
    'INSERT INTO apis (name, url, limit) VALUES (?, ?, ?)',
    [name, url, limit || 1000],
    function(err) {
      if (err) {
        return res.status(500).send({ message: 'Failed to add API' });
      }
      res.status(201).send({ id: this.lastID, name, url, limit });
    }
  );
});

// Delete API
app.delete('/api/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM apis WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).send({ message: 'Failed to delete API' });
    }
    res.status(200).send({ message: 'API deleted' });
  });
});

// Update API limit
app.put('/api/limit/:id', (req, res) => {
  const { id } = req.params;
  const { limit } = req.body;
  db.run(
    'UPDATE apis SET limit = ? WHERE id = ?',
    [limit, id],
    function(err) {
      if (err) {
        return res.status(500).send({ message: 'Failed to update limit' });
      }
      res.status(200).send({ message: 'API limit updated' });
    }
  );
});

// Get error and success stats
app.get('/api/stats/:id', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
