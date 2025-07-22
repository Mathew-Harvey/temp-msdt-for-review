const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../')); // Serve frontend files

// Database setup
const db = new DatabaseSync('./data.db');

// Create tables and indexes
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    company TEXT,
    role TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_email ON leads(email);
  CREATE INDEX IF NOT EXISTS idx_created_at ON leads(created_at);
`);

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// API Routes

// Subscribe endpoint with enhanced validation
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, name, company, role } = req.body;

    // Validation
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      });
    }

    // Check for spam (basic rate limiting)
    const existingLead = db.prepare('SELECT created_at FROM leads WHERE email = ?').get(email);

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'Email already subscribed'
      });
    }

    // Insert new lead
    const stmt = db.prepare('INSERT INTO leads (email, name, company, role) VALUES (?, ?, ?, ?)');
    const result = stmt.run(email, name || null, company || null, role || null);

    res.json({
      success: true,
      message: 'Successfully subscribed to MarineStream updates!'
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Export leads (for CRM integration)
app.get('/api/export', async (req, res) => {
  try {
    const format = req.query.format || 'json';

    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();

    if (format === 'csv') {
      const csvHeader = 'ID,Email,Name,Company,Role,Created At\n';
      const csvData = leads.map(lead =>
        `${lead.id},"${lead.email}","${lead.name || ''}","${lead.company || ''}","${lead.role || ''}","${lead.created_at}"`
      ).join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="marinestream-leads.csv"');
      res.send(csvHeader + csvData);
    } else {
      res.json({
        success: true,
        count: leads.length,
        data: leads
      });
    }

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Blog content endpoint
app.get('/api/blog', async (req, res) => {
  try {
    const blogDir = path.join(__dirname, '../blog');
    const files = await fs.readdir(blogDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const blogPosts = [];
    for (const file of markdownFiles) {
      const content = await fs.readFile(path.join(blogDir, file), 'utf8');
      const html = marked(content);

      // Extract title from first h1 or filename
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace('.md', '');

      blogPosts.push({
        id: file.replace('.md', ''),
        title,
        content: html,
        filename: file,
        created_at: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      posts: blogPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    });

  } catch (error) {
    console.error('Blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading blog content'
    });
  }
});

// Privacy policy content endpoint
app.get('/api/privacy', async (req, res) => {
  try {
    const privacyPath = path.join(__dirname, '../content/privacy.md');
    const content = await fs.readFile(privacyPath, 'utf8');
    const html = marked(content);

    res.json({
      success: true,
      content: html
    });

  } catch (error) {
    console.error('Privacy error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading privacy policy'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nClosing database connection...');
  db.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`MarineStream server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log('Using Node.js built-in SQLite database');
});