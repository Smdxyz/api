const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const apiRoutes = require('./routes/apiRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();
const port = 3000;

// Setup body-parser
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static('public')); // Untuk melayani file statis seperti index.html

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
