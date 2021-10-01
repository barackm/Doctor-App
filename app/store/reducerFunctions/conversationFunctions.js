export const addMessageToStore = (conversations, payload) => {
  const { sender, message } = payload;
  if (sender !== null) {
    const newConversation = {
      _id: message.conversationId,
      messages: [message],
      participants: [sender, message.recipient],
      latestMessageText: message.text,
    };
    return conversations.list.push(newConversation);
  }

  conversations.list.forEach((conversation) => {
    if (conversation._id === message.conversationId) {
      conversation.messages.push(message);
      conversation.latestMessageText = message.text;
    }
  });
};
