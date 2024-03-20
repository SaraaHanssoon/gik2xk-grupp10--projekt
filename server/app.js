const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const authService = require('./services/authService');

// Skapa Express-appen
const app = express();

// Betjäna statiska filer från 'dist'-mappen
app.use(express.static(path.join(__dirname, 'dist')));

// Använd grundläggande middleware
app.use(cors()); // Tillåt alla domäner, anpassa enligt dina CORS-policybehov
app.use(logger('dev')); // Logga inkommande förfrågningar
app.use(express.json()); // För att tolka JSON-body
app.use(express.urlencoded({ extended: false })); // För att tolka URL-kodade body
app.use(cookieParser()); // För att tolka cookies i förfrågningar


// Extra CORS-konfigurationer
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  next();
});

// Importera ruttmoduler
const productRoutes = require('./routes/productRoute');
const ratingRoutes = require('./routes/ratingRoute');
const cartRoutes = require('./routes/cartRoute');
const cartRowRoutes = require('./routes/cartRowRoute');
const userRoutes = require('./routes/userRoute');

// Definiera ruttanvändningar
app.use('/products', productRoutes);
app.use('/ratings', ratingRoutes);
app.use('/carts', cartRoutes);
app.use('/cartrows', cartRowRoutes);
app.use('/users', userRoutes);

// Autentiseringsrutter
app.post('/register', async (req, res) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { token, user } = await authService.loginUser(req.body);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Servera alla andra sökvägar med index.html för att stödja SPA-routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/', 'index.html'));
});

// Hantera 404-fel för odefinierade rutter
app.use((req, res, next) => {
  res.status(404).json({ message: "Sorry, that route doesn't exist." });
});

// Basfelhanterare
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

module.exports = app;
