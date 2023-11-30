const fs = require("fs");
const path = require("path");
const login = require("./fb-chat-api");

const appStateFile = "./appstate.json";

const proxy = {
  protocol: "socks5",
  host: "104.36.180.119",
  port: 1080,
  username: "6tZpC92iwZ",
  password: "MvMGNKgvXV",
};

const local = {
  timezone: "Asia/Manila",
  region: "ph",
  headers: {
    "X-Facebook-Locale": "en_US",
    "X-Facebook-Timezone": "Asia/Manila",
    "X-Fb-Connection-Quality": "EXCELLENT",
  },
};

async function listen(orion) {
  try {
    const appStatePath = path.join(__dirname, appStateFile);
    const credentials = JSON.parse(fs.readFileSync(appStatePath, "utf8"));
    login(
      { appState: credentials, proxy: proxy },
      async (err, api) => {
        try {
          if (err) return console.error(err);
          api.setOptions({
            logLevel: "silent",
            forceLogin: true,
            listenEvents: true,
            autoMarkDelivery: false,
            selfListen: true,
            font: { data: "test" }
          });
          api.listenMqtt((err, event) => {
            if (err) return console.error(err);
            orion(api, event);
          });
        } catch (err) {
          if (!!err.errorSummary) {
            console.log(err.errorSummary);
          } else {
            console.log(err);
          }
        }
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { listen };