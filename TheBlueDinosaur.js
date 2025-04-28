const express = require("express");
const app = express();
const port = 3033;

// Middleware
app.use(express.json());

// Mock data
let items = [
  { id: 1, name: "MacBook Pro" },
  { id: 2, name: "MacBook Air" }
];

// Get all items
app.get("/items", (req, res) => {
  res.json(items);
});

// Get a single item
app.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: "Item not found" });
});

// Create an item
app.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
app.put("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
