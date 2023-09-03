import express from 'express';
const app = express();

app.set('trust proxy', true);

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/test', (req, res) => {
  res.send('test');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
