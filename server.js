const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');
// Init express
const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Members App',
		members
	});
});

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API routes
app.use('/api/members', require('./routes/api/members'));

// Set Port
const PORT = process.env.PORT || 3000;

// Listen on a port
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
