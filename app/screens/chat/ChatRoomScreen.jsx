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

import colors from '../../config/colors';
import Screen from '../../components/Screen';
import ChatMessage from '../../components/ChatMessage';

export default class ChatRoomScreen extends PureComponent {
  state = {
    height: 0,
    message: '',
    showEmojis: false,
  };

  handleChange = (input) => {
    this.setState({ message: input, showEmojis: false });
  };
  handleAddEmojie = (emoji) => {
    let message = this.state.message;
    message = message.concat(emoji);
    console.log(message);
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

  render() {
    const messageAvailable = this.state.message.trim().length;
    const messages = [
      {
        id: 1,
        isCurrentUser: true,
        body: 'Hello dear Doctor, I hope you are doing great',
        createdAt: '12:13',
      },
      {
        id: 2,
        isCurrentUser: false,
        body: 'Yes I am doing great, I guess you too?',
        createdAt: '12:15',
      },
      {
        id: 3,
        isCurrentUser: true,
        body: 'Not really😔',
        createdAt: '12:16',
      },
      {
        id: 6,
        isCurrentUser: true,
        body: 'I have a problem with my neck🤒',
        createdAt: '12:16',
      },
      {
        id: 4,
        isCurrentUser: false,
        body: 'Oh I am so sorry, since when do you have that problem?',
        createdAt: '14:13',
      },
      {
        id: 5,
        isCurrentUser: true,
        body: 'Since this moring Doctor',
        createdAt: '14:15',
      },
    ];
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={(message) => <ChatMessage message={message} />}
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
                  //   multiline
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
  },
});
