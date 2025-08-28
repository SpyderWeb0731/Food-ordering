const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔌 MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jtgeets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// 🧬 Define Schemas
const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  email: String,
  message: String
}));

const Request = mongoose.model('Request', new mongoose.Schema({
  name: String,
  email: String,
  request: String
}));

const CartItem = mongoose.model('CartItem', new mongoose.Schema({
  itemName: String,
  price: String,
  image: String
}));

const Rating = mongoose.model('Rating', new mongoose.Schema({
  itemName: String,
  rating: Number
}));

// ✅ API Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required.' });

  await Message.create({ name, email, message });
  res.json({ message: 'Thank you! Your message has been received.' });
});

app.post('/api/request', async (req, res) => {
  const { name, email, request } = req.body;
  if (!name || !email || !request) return res.status(400).json({ message: 'All fields are required.' });

  await Request.create({ name, email, request });
  res.json({ message: 'Thanks! We’ve received your dish suggestion.' });
});

app.post('/api/cart', async (req, res) => {
  const { itemName, price, image } = req.body;
  if (!itemName) return res.status(400).json({ message: 'Item name is required.' });

  await CartItem.create({ itemName, price, image });
  res.json({ message: `${itemName} has been added to your cart.` });
});

app.post('/api/rate', async (req, res) => {
  const { itemName, rating } = req.body;
  if (!itemName || !rating) return res.status(400).json({ message: 'Rating and item name are required.' });

  await Rating.create({ itemName, rating });
  res.json({ message: `Thanks for rating ${itemName} ${rating} stars!` });
});

const Order = mongoose.model('Order', new mongoose.Schema({
  items: [{ itemName: String, price: String, image: String }],
  createdAt: { type: Date, default: Date.now }
}));

app.post('/api/order', async (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No items provided for order.' });
  }

  try {
    await Order.create({ items });
    res.json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Order placement failed:', error);
    res.status(500).json({ message: 'Failed to place order on server.' });
  }
});

app.listen(PORT, () => {
  console.log(`JTGeets backend running at http://localhost:${PORT}`);
});
