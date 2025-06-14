// Proxy para desarrollo local de EcoChain
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000; // Puerto donde correrá el frontend

// Proxy para la API
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8000', // Apunta al backend en la misma máquina
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname)));

app.listen(PORT, () => {
  console.log(`Frontend corriendo en http://localhost:${PORT}`);
});
