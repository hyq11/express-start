var mongoose = require('mongoose');
mongoose.set('userCreateIndex', true)

const DB_NAME='test'
const DB_URL = '127.0.0.1:27017'

let dbConnectPromise = new Promise((resolve, reject) => {

  
  mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, {
    useNewUrlParser: true
  })

  var db = mongoose.connection;

  db.on('error', (err)=>{
    console.log('db connect error')
    reject(new Error({ err, message: 'db connect error' }))
  })
  db.on('open',  ()=>{
    console.log('db connect success')
    resolve()
  })
})

module.exports = dbConnectPromise