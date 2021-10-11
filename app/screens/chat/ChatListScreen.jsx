import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import Screen from '../../components/Screen';
import style from '../../config/style';
import colors from '../../config/colors';
import ChatListItem from './ChatListItem';
import { connect } from 'react-redux';
import { loginUser } from '../../store/reducers/auth';
import jwtDecode from 'jwt-decode';
import storage from '../../auth/storage';
import { loadConversations } from '../../store/reducers/conversations';

const ChatListScreen = ({ navigation, conversations, loadConversations }) => {
  const [currentUser, setCurrentUser] = React.useState('');
  useEffect(() => {
    getAuthToken();
    loadConversations();
  }, []);
  const getAuthToken = async () => {
    const token = await storage.getAuthToken();
    setCurrentUser(jwtDecode(token));
  };

  const filteredConversations = conversations.filter(
    (conversation) => conversation.messages.length > 0,
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.search}>Chats</Text>
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={25}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
      </View>
      <FlatList
        style={styles.chatListContainer}
        data={filteredConversations}
        keyExtractor={(item) => item._id.toString()}
        renderItem={(item) => (
          <ChatListItem
            onPress={() =>
              navigation.navigate('Chat', {
                id: item.item._id,
                name:
                  item.item.participents[0]._id === currentUser._id
                    ? item.item.participents[1].name
                    : item.item.participents[0].name,
                image: 'https://i.pravatar.cc/300',
              })
            }
            item={{
              text: item.item.lastMessage.text,
              time: moment(item.item.lastMessage.createdAt).format('HH:mm'),
              conversation: item,
              recipient:
                item.item.participents[0]._id === currentUser._id
                  ? item.item.participents[1]
                  : item.item.participents[0],
            }}
          />
        )}
      />
      <TouchableOpacity
        style={styles.newChat}
        onPress={() => navigation.navigate('Doctors')}
      >
        <Entypo name="new-message" size={24} color={colors.white} />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  search: {
    ...style.text,
    fontWeight: '900',
    fontSize: 40,
    color: colors.dark,
  },

  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  icon: {
    marginRight: 10,
  },

  input: {
    ...style.text,
  },

  chatListContainer: {
    paddingHorizontal: 10,
  },
  newChat: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 6,
  },
});

const mapStateToProps = (state) => {
  return {
    conversations: state.entities.conversations.list,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = {
  loginUser: () => loginUser(),
  loadConversations: () => loadConversations(),
  loginUser: (user) => loginUser(user),
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
