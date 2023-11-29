module.exports = async ({ api, event, config }) => {
    let input = event.body.toLowerCase();
    if (input.startsWith(`!`)) {
      let cmd = input.substring(1);
      cmd = cmd.split(" ");
      try {
        if (cmd[0].length === 0) {
          const messages = ["Hello", "Oy", "Wassup", "Hey"];
          const message = messages[Math.floor(Math.random() * messages.length)];
          return api.sendMessage(
            {
              body: `${message}`,
            },
            event.threadID,
            event.messageID,
          );
        } else {
          let runIt = require(`../cmds/AD_CMDS/${cmd[0]}`);
          runIt.runFunction({
            api,
            event,
            config,
          });
        }
      } catch (err) {
        if (err.code == "MODULE_NOT_FOUND") {
        } else {
          console.log(err);
          api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
        }
      }
    } 
  };