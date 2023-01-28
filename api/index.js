import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const port = 8080;

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const response = await fetch(
    'https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban'
  );
  const data = await response.json();
  console.log(data);
  res.status(200).json(data);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
