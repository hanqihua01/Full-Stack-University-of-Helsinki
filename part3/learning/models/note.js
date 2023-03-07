const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    }) 
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

// 使用Note.find({}).then(notes => console.log(notes))时，打印出的是带有_id和__v属性的值
// 通过设置以下方法后，可以使用JSON.stringfy(notes)获取去掉_id和__v属性，而使用id属性的值
// response.json(notes)函数内部使用了JSON.stringfy(notes)，所以也会获得该效果
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)