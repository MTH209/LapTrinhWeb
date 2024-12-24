const express = require('express');
const cors = require('cors');  // Thêm import cors
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./src/routes/userRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const adminRoutes = require('./src/routes/adminRoutes');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/', userRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);
app.use('/contacts', contactRoutes);
app.use('/admin', adminRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})