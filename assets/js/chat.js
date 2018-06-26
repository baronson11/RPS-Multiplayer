// Initialize Firebase -----------------------------------
var config = {
  apiKey: "AIzaSyCSJzBuDQcSNggJN_xi4PXjJShRRcW-E8I",
  authDomain: "homework-june26.firebaseapp.com",
  databaseURL: "https://homework-june26.firebaseio.com",
  projectId: "homework-june26",
  storageBucket: "homework-june26.appspot.com",
  messagingSenderId: "124546059044"
};

firebase.initializeApp(config);

// CHATBOX ----------------------------------------------

let messagesRef = firebase.database().ref('messages');

const form = document.getElementById('chat_box');
const chatText = document.getElementById('chat_text');
const chatData = document.querySelector('div.chat_data');
let chat = document.getElementById('chat');

// sends message typed in to the database
function sendMessage(chat) {
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    message: chat
  });
}

// populates messages in the browser from the database
function populateMessages(textInput) {
  let p = document.createElement('p');
  p.textContent = textInput;
  chatData.appendChild(p);
}

// removes messages in the browser (temporary fix for repeated entries)
function removeMessages() {
    while (chatData.firstElementChild) {
    chatData.removeChild(chatData.firstElementChild);
  }
}

// gets the data from the database and cycles through the data
function gotData(data) {
  let messages = data.val();
  let keys = Object.keys(messages);
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let text = messages[k];
    let textInput = text.message;
    removeMessages();
    populateMessages(textInput);
  }
}

// runs only if there is an error, meaning no messages in the database
function errData(err) {
  console.log('No messages.');
}

// listener on form to submit chat input
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let userChat = chat.value;
  sendMessage(userChat);
  console.log(userChat);
  form.reset();
});

// takes reference to messages table in db and fires when a value is added
// passes in two functions when event is fired
messagesRef.on('value', gotData, errData);
