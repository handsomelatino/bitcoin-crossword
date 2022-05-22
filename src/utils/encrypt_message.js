const aes = require('crypto-js/aes');

// Create a cypher message. Two files will need to be added:
//
// _message.md       <- message to encrypt in MD format
// _message_key.txt  <- simple text of the key
//
// on the root of this project (NOT the /src folder).
//
// A public/cypher.txt message will be created on success
function createCypherMessage() {
  const fs = require('fs');

  const message = fs.readFileSync('_message.md', 'utf-8');
  const key = fs.readFileSync('_message_key.txt', 'utf-8');
  
  const cypher = aes.encrypt(message, key).toString();
  
  console.log("Writing public/cypher.txt file...");
  fs.writeFileSync('public/cypher.txt', cypher);
  console.log("Done!");
}

createCypherMessage();
