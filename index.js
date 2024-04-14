var firebaseConfig = {
    apiKey: "AIzaSyDHVox2N_GqmTL6nx_vwc8pWFPYK84_Tu4",
    authDomain: "ccii-fce61.firebaseapp.com",
    databaseURL: "https://ccii-fce61-default-rtdb.firebaseio.com",
    projectId: "ccii-fce61",
    storageBucket: "ccii-fce61.appspot.com",
    messagingSenderId: "335149848144",
    appId: "1:335149848144:web:0bef23d96d2d24e35c2355",
    measurementId: "G-46YRG7284G"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");

function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${username === messages.username ? "sent" : "receive"
        }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});