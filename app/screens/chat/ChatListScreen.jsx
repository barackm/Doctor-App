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
import Screen from '../../components/Screen';
import style from '../../config/style';
import colors from '../../config/colors';
import ChatListItem from './ChatListItem';
import { connect } from 'react-redux';
import { loginUser } from '../../store/reducers/auth';
import jwtDecode from 'jwt-decode';
import storage from '../../auth/storage';

const ChatListScreen = ({ navigation, conversations }) => {
  const messages = [
    {
      id: 1,
      name: 'Alan Byrn',
      message: "Really? That's great. We will do it tomorrow.",
      new: true,
      isOnline: true,
      imageUrl:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: 2,
      name: 'Fred Lebron',
      message:
        "I'm not so sure about that, maybe you should try thinking about it earlier. so it's all up to you bro",
      new: false,
      isOnline: false,
      imageUrl:
        'https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 3,
      name: 'Marc Kirchoff',
      message: 'I am very well what about you?',
      new: false,
      isOnline: false,
      imageUrl:
        'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 4,
      name: 'Barack John',
      message: 'I went to see him but he was not arround yesterday.',
      new: true,
      isOnline: true,
      imageUrl:
        'https://images.pexels.com/photos/6204377/pexels-photo-6204377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: 5,
      name: 'Dr. Hiro Byrn',
      message: "Really? That's great. We will do it tomorrow.",
      new: false,
      isOnline: false,
      imageUrl:
        'https://images.pexels.com/photos/1842865/pexels-photo-1842865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 6,
      name: 'Alan Byrn',
      message: "I don't really care about that.",
      new: false,
      isOnline: true,
      imageUrl:
        'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 7,
      name: 'Fred Lebron',
      message:
        "I'm not so sure about that, maybe you should try thinking about it earlier. so it's all up to you bro",
      new: false,
      isOnline: false,
      imageUrl:
        'https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 8,
      name: 'Marc Kirchoff',
      message: 'I am very well what about you?',
      new: false,
      isOnline: false,
      imageUrl:
        'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  ];
  const [currentUser, setCurrentUser] = React.useState('');
  useEffect(() => {
    getAuthToken();
  });
  const getAuthToken = async () => {
    const token = await storage.getAuthToken();
    setCurrentUser(jwtDecode(token));
  };
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
        data={conversations}
        keyExtractor={(item) => item._id.toString()}
        renderItem={(item) => (
          <ChatListItem
            onPress={() => navigation.navigate('Chat', item.item._id)}
            item={{
              message: item.item.latestMessageText,
              conversation: item,
              recepient:
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
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
