const app = require('./app');

const PORT = 3000 || process.env.PORT;

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})


process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    })
})


