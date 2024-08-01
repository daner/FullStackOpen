const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://daniel:${password}@fullstackopen.fgcyffn.mongodb.net/phonebook`
  
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length < 5) 
{
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()    
    })
}
else {
           
  const id = Math.floor(Math.random() * 10000)
  const name = process.argv[3]
  const number = process.argv[4]
      
  const person = new Person({
    id: id,
    name: name,
    number: number
  })
      
  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
