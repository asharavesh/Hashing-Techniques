const express = require('express');
const cors = require('cors');
const HashTable = require('./hashTable');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Store hash tables for different methods
const hashTables = {
  chaining: new HashTable(10, 'chaining'),
  linearProbing: new HashTable(10, 'linearProbing'),
  quadraticProbing: new HashTable(10, 'quadraticProbing'),
  doubleHashing: new HashTable(10, 'doubleHashing')
};

// Reset all hash tables
app.post('/api/reset', (req, res) => {
  const { size = 10 } = req.body;
  
  Object.keys(hashTables).forEach(method => {
    hashTables[method] = new HashTable(size, method);
  });
  
  res.json({ message: 'Hash tables reset successfully' });
});

// Insert value into specific hash table
app.post('/api/insert/:method', (req, res) => {
  const { method } = req.params;
  const { value } = req.body;
  
  if (!hashTables[method]) {
    return res.status(400).json({ error: 'Invalid hashing method' });
  }
  
  try {
    const result = hashTables[method].insert(parseInt(value));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search value in specific hash table
app.get('/api/search/:method/:value', (req, res) => {
  const { method, value } = req.params;
  
  if (!hashTables[method]) {
    return res.status(400).json({ error: 'Invalid hashing method' });
  }
  
  const result = hashTables[method].search(parseInt(value));
  res.json(result);
});

// Get hash table state
app.get('/api/table/:method', (req, res) => {
  const { method } = req.params;
  
  if (!hashTables[method]) {
    return res.status(400).json({ error: 'Invalid hashing method' });
  }
  
  res.json(hashTables[method].getState());
});

// Compare all methods
app.get('/api/compare', (req, res) => {
  const comparison = {};
  
  Object.keys(hashTables).forEach(method => {
    comparison[method] = hashTables[method].getStats();
  });
  
  res.json(comparison);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});