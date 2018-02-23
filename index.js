const smpp = require("smpp");
const randomize = require("randomatic");

const server = smpp.createServer(function(session) {
  session.on("bind_transceiver", function(pdu) {
    console.log("connected", pdu);
  });

  session.on("submit_sm", function(pdu) {
    session.send(
      pdu.response({
        message_id: randomize("a", 10)
      })
    );
  });
});

server.listen(2775);
