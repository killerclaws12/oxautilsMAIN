const mongoose = require('mongoose')


module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        }

        mongoose.connect(`mongodb+srv://admin:admin@cluster0.18rh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        mongoose.set('useFindAndModify', false)
        mongoose.Promise = global.Promise

        mongoose.connection.on('connected', () => {
            console.log('The bot has connected to the database.')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('The bot has disconnected from the database.')
        })
        mongoose.connection.on('err', (err) => {
            console.log('There was a error connecting to the database: ' + err)
        })
    
    }
}