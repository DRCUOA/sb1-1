import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./todos.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the todos database.');
});

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL
)`);

app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/todos/:id', (req, res) => {
  db.get('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.post('/todos', (req, res) => {
  const { title, description, status } = req.body;
  db.run('INSERT INTO todos (title, description, status) VALUES (?, ?, ?)', [title, description, status], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.put('/todos/:id', (req, res) => {
  const { title, description, status } = req.body;
  db.run('UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});