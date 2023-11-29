const sdk = require('api')('@pplx/v0#3q3bnulpelzx9h');
module.exports = async ({ api, event }) => {
  const input = event.body.toLowerCase();
  const data = input.split(" ");

  if (data.length < 2) {
    const messages = ["Hello", "Oy", "Wassup", "Hey"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    api.sendMessage(message, event.threadID, event.messageID);
  } else {
    let msg = data.join(" ");

    sdk.auth('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');
    sdk.post_chat_completions({
      model: 'llama-2-70b-chat',
      messages: [
        { role: 'system', content: 'Be precise and concise.' },
        { role: 'user', content: msg }
      ]
    })
      .then(({ data }) => api.sendMessage(data.choices[0].message.content, event.threadID, event.messageID))
      .catch(err => console.error(err));
  }
}