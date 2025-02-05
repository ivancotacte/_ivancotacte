const { listen } = require("./login.js");
const config = require("./config");

listen(async (api, event) => {
  if (event.type === "message") {
    require("./handlers/handleAdmin.js")({ api, event, config });
    require("./handlers/handleMessage.js")({ api, event, config });
  } else if (event.type === "message_reply") {
  } else if (event.type === "event") {
  }
});