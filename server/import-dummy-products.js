const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product');

// Updated connection string as provided by the user
const MONGODB_URI = "mongodb+srv://anurag:JI70hWd22l8j@cluster0.rgfds6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const allowedCategories = ['men', 'women', 'kids', 'footwear', 'accessories'];

const categoryMap = {
  'mens-shirts': 'men',
  'mens-shoes': 'footwear',
  'mens-watches': 'accessories',
  'womens-dresses': 'women',
  'womens-shoes': 'footwear',
  'womens-watches': 'accessories',
  'womens-bags': 'accessories',
  'womens-jewellery': 'accessories',
  // add more as needed
};

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

async function importProducts() {
  try {
    const { data } = await axios.get('https://dummyjson.com/products?limit=20');
    const products = data.products
      .filter(p => allowedCategories.includes(p.category.toLowerCase()))
      .map(p => ({
        image: p.thumbnail || (p.images && p.images[0]) || '',
        title: p.title,
        description: p.description,
        category: p.category,
        brand: p.brand,
        price: p.price,
        salePrice: p.price, // DummyJSON doesn't have salePrice, so use price
        totalStock: p.stock,
        averageReview: p.rating,
      }));
    await Product.insertMany(products);
    console.log('Filtered dummy products imported!');
  } catch (err) {
    console.error('Error importing products:', err);
  } finally {
    mongoose.disconnect();
  }
}

importProducts(); 