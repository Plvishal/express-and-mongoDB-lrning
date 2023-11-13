const mongoose = require('mongoose');
const Chat = require('./models/chat');

main()
  .then(() => {
    console.log('Connection Successful!!!');
  })
  .catch((error) => {
    console.log(error);
  });
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
}

const allChats = [
  {
    from: 'Vishal',
    to: 'Ravi',
    msg: 'Hello sir',
  },
  {
    from: 'Ram',
    to: 'Shyam',
    msg: 'Some random data',
  },
  {
    from: 'Shivendra',
    to: 'Ravi',
    msg: 'How to connct the database',
  },
  {
    from: 'Mangla',
    to: 'Aman',
    msg: 'Kaha Ho ?',
  },
  {
    from: 'Sweta',
    to: 'Neha',
    msg: 'Good Morning sister',
  },
];

Chat.insertMany(allChats);
