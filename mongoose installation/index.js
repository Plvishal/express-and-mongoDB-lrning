// getting-started.js
const mongoose = require('mongoose');

main().then(() => {
  console.log('Connection Sucessfull');
});
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

//  Define the Structure of the collection: Schema Step-1
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Creating the model for the schema step-2
const User = mongoose.model('User', userSchema);
