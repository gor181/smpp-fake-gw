const smpp = require("smpp");
const randomize = require("randomatic");

const server = smpp.createServer(function(session) {
  session.on("bind_transceiver", function(pdu) {
    console.log(`User ${pdu.system_id} connected`);
    session.send(pdu.response());
  });

  session.on("submit_sm", function(pdu) {
    const messageId = randomize("a", 10);
    session.send(
      pdu.response({
        message_id: messageId
      })
    );
  });

  session.on("enquire_link", function(pdu) {
    session.send(pdu.response());
  });

  session.on("error", function(pdu) {
    console.error(error);
  });

  session.on("close", function(pdu) {
    console.log("connection closed");
  });
});

server.listen(2875, "localhost");
