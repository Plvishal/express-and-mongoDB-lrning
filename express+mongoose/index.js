const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat');
const methodOverride = require('method-override');

const app = express();
// mongoose database connection
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
// ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public/CSS')));
// data parsing when we want to use body request(req.body)
app.use(express.urlencoded({ extended: true }));
// for the method override
app.use(methodOverride('_method'));
// Index Route
app.get('/chats', async (req, res) => {
  let chats = await Chat.find();
  // console.log(chats);
  res.render('index.ejs', { chats });
});

// New Route
app.get('/chats/new', (req, res) => {
  res.render('new.ejs');
});
// Create Route
app.post('/chats', (req, res) => {
  let { from, to, msg } = req.body;
  // creating new chat for response
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
  });
  // chat save in the data base
  newChat
    .save()
    .then(() => {
      console.log('Chat save');
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect('/chats');
});

// update Route means update the chat
app.get('/chats/:id/edit', async (req, res) => {
  let { id } = req.params;
  // find chat by id in th databse
  let chat = await Chat.findById(id);
  res.render('edit.ejs', { chat });
});

// Update Route
app.put('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let { msg: newMSG } = req.body;
  // console.log(newMSG);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMSG },
    { runValidators: true, new: true }
  );
  // console.log(updatedChat);
  res.redirect('/chats');
});

// Delete Route or Destroy Route
app.delete('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let deltedChat = await Chat.findByIdAndDelete(id);
  // console.log(deltedChat);
  res.redirect('/chats');
});
app.listen(8080, () => {
  console.log('Your server is listening on the port: 8080');
});
