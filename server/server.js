require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middlewares
// Middlewares
app.use(cors());
app.use(express.json());

// Connect to DB and start server after successful connection
connectDB()
	.then(() => {
		// Simple request logger for debugging
		app.use((req, res, next) => {
			console.log(new Date().toISOString(), req.method, req.originalUrl);
			next();
		});

		// Routes
		app.use('/api/clients', require('./routes/clientRoutes'));
		app.use('/api/devices', require('./routes/deviceRoutes'));
		app.use('/api/tickets', require('./routes/ticketRoutes'));
		app.use('/api/auth', require('./routes/authRoutes'));

		// Debug: list routes
		app.get('/api/debug/routes', (req, res) => {
			const routes = [];
			app._router.stack.forEach(mw => {
				if(mw.route){
					const path = mw.route.path;
					const methods = Object.keys(mw.route.methods).join(',');
					routes.push({ path, methods });
				} else if(mw.name === 'router' && mw.handle && mw.handle.stack){
					mw.handle.stack.forEach(r => {
						if(r.route){
							const path = (mw.regexp && mw.regexp.source !== '^\\/?$') ? mw.regexp.source.replace('\\/?', '') + r.route.path : r.route.path;
							const methods = Object.keys(r.route.methods).join(',');
							routes.push({ path, methods });
						}
					});
				}
			});
			res.json(routes);
		});

		app.get('/', (req, res) => res.send('API Atelier de Réparation'));

		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB. Server not started. Error:', err.message || err);
	});
