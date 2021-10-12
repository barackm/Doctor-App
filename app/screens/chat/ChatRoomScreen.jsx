import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';
import { connect } from 'react-redux';
import { Fontisto } from '@expo/vector-icons';

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import ChatMessage from './ChatMessage';
import storage from '../../auth/storage';
import jwtDecode from 'jwt-decode';
import conversations, {
  loadConversations,
  sendMessage,
} from '../../store/reducers/conversations';

class ChatRoomScreen extends PureComponent {
  state = {
    height: 0,
    message: '',
    showEmojis: false,
    conversationId: 'new',
    currentUser: null,
    conversation: null,
    messages: [],
  };

  componentDidMount() {
    const { loadConversations, conversations, navigation } = this.props;
    window.hiddenTabBar = false;
    this.getCurrentUser();
    loadConversations();
    this.getConversation(conversations);
  }

  getCurrentUser = async () => {
    const currentUser = await storage.getAuthToken();
    this.setState({ currentUser: jwtDecode(currentUser) });
  };

  handleChange = (input) => {
    this.setState({ message: input, showEmojis: false });
  };
  handleAddEmojie = (emoji) => {
    let message = this.state.message;
    message = message.concat(emoji);
    this.setState({ message });
  };

  handleShowEmojis = () => {
    Keyboard.dismiss();
    this.setState({ showEmojis: true });
  };

  handleHideEmojis = () => {
    this.setState({ showEmojis: false });
  };

  handleHideEditor = () => {
    Keyboard.dismiss();
    this.setState({ showEmojis: false });
  };

  handleSendMessage = () => {
    const { message, conversationId, conversation } = this.state;
    const { sendMessage, route } = this.props;
    let recipientId;
    storage.getAuthToken().then((token) => {
      const currentUser = jwtDecode(token);
      if (conversationId === 'new') {
        recipientId = route.params.id;
      } else {
        recipientId =
          conversation.participents[0]._id === currentUser._id
            ? conversation.participents[1]._id
            : conversation.participents[0]._id;
      }
      sendMessage(message, conversationId, recipientId);
      this.setState({ message: '' });
    });
  };

  getConversation = (conversations) => {
    const { route } = this.props;
    const { id } = route.params;
    let conversation;
    storage.getAuthToken().then((token) => {
      const currentUser = jwtDecode(token);
      const conversationId = id;
      conversation =
        conversations.find(
          (conversation) => conversation._id === conversationId,
        ) || null;

      if (!conversation) {
        conversation = conversations.find(
          (conversation) =>
            (conversation.participents[0]._id === currentUser._id &&
              conversation.participents[1]._id === id) ||
            (conversation.participents[1]._id === currentUser._id &&
              conversation.participents[0]._id === id),
        );
      }
      if (conversation) {
        this.setState({
          conversationId: conversation._id,
          messages: conversation.messages,
          conversation,
          conversationId: conversation._id,
        });
      } else {
        this.setState({ conversationId: 'new' });
      }
    });
  };

  render() {
    const messageAvailable = this.state.message.trim().length;
    this.getConversation(this.props.conversations);
    const { currentUser, messages } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.safeView}
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <Screen style={styles.container}>
          <FlatList
            style={styles.editorMessagesContainer}
            data={messages}
            keyExtractor={(item) => item._id.toString()}
            contentInset={{ bottom: 30 }}
            ref="flatList"
            onContentSizeChange={() => {
              setTimeout(() => this.refs.flatList.scrollToEnd(), 0);
            }}
            renderItem={(message) => (
              <ChatMessage message={message} currentUser={currentUser} />
            )}
          />
          <View style={styles.editor}>
            <View style={styles.editorControls}>
              {this.state.showEmojis ? (
                <TouchableOpacity
                  style={styles.emojiesBtn}
                  onPress={this.handleHideEmojis}
                >
                  <MaterialCommunityIcons
                    name="keyboard"
                    size={28}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.emojiesBtn}
                  onPress={this.handleShowEmojis}
                >
                  <MaterialIcons
                    name="emoji-emotions"
                    size={28}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  placeholder="Enter message"
                  style={styles.input}
                  value={this.state.message}
                  onChangeText={this.handleChange}
                  onFocus={this.handleHideEmojis}
                />
              </View>
              {!messageAvailable && (
                <TouchableOpacity style={styles.cameraBtn}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={28}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
              {!messageAvailable && (
                <TouchableOpacity style={styles.voiceMessage}>
                  <MaterialIcons
                    name="keyboard-voice"
                    size={28}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={this.handleSendMessage}
                style={[
                  styles.sendMessage,
                  { display: messageAvailable ? 'flex' : 'none' },
                ]}
              >
                <MaterialCommunityIcons
                  name="send"
                  size={15}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
            {this.state.showEmojis && (
              <View style={styles.emojisContainer}>
                <EmojiSelector
                  columns={10}
                  theme={colors.primary}
                  showHistory
                  showSectionTitles={false}
                  onEmojiSelected={(emoji) => this.handleAddEmojie(emoji)}
                />
              </View>
            )}
          </View>
        </Screen>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  safeView: {
    flex: 1,
    width: '100%',
  },
  editor: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  editorControls: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: colors.light,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
  },
  cameraBtn: {
    marginRight: 20,
  },
  emojisContainer: {
    height: 250,
    width: '100%',
  },
  sendMessage: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  editorMessagesContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 60,
  },
});

const mapStateToProps = (state) => {
  return {
    conversations: state.entities.conversations.list,
  };
};

const mapDispatchToProps = {
  loadConversations: () => loadConversations(),
  sendMessage: (text, conversationId, recipientId) =>
    sendMessage(text, conversationId, recipientId),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomScreen);
