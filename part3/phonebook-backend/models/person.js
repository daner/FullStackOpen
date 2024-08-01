const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_CONNECTIONSTRING

console.log('Connecting to MongoDB')

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    number: {
        type: String,
        validate: [ 
          {
            validator: (v) => {
              return v && v.replace('-', '').length > 7
            },
            message: () => `Phone number must be of length 8`
          },
          {
            validator: (v) => {
              return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
          },
        ],
        required: [true, 'Phone number is required']
    },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)