const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log('------------------------------');
  console.log(`Server running on port ${port}`);
  console.log('------------------------------');
});
