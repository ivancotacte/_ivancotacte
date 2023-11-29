const { listen } = require("./login.js");
const config = require("./config");

listen(async (api, event) => {
  if (event.type === "message") {
    require("./handlers/handleMessage.js")({ api, event, config });
    if (event.body === "!ping") {
      api.sendMessage("Pong!", event.threadID, event.messageID);
    }
  } else if (event.type === "message_reply") {
  } else if (event.type === "event") {
  }
});