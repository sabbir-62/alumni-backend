const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})