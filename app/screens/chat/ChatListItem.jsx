import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import style from '../../config/style';
import capitalize from '../../utils/capitalize';

export default function ChatListItem({ item, onPress, conversation }) {
  const { text, recipient, time } = item;
  // const unreadMessagesCount = conversation.messages.map(
  //   (message) => message.read === false,
  // ).length;
  // check if the image url is a valid url

  const unreadeMessagesCount = 90;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              (recipient.profileImage &&
                recipient.profileImage.match(/\.(jpeg|jpg|gif|png)$/) !=
                  null) ||
              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }}
          style={styles.image}
        />
        {item.isOnline && <View style={styles.onlineIndicator}></View>}
      </View>
      <View style={styles.chatDetails}>
        <View style={styles.header}>
          <Text style={styles.user}>{`${capitalize(
            recipient.name,
          )} ${capitalize(recipient.lastName)}`}</Text>
          <Text style={styles.timing}>{time}</Text>
        </View>
        <View style={styles.messageDetails}>
          <View
            style={{
              ...styles.message,
              maxWidth: unreadeMessagesCount > 0 ? '85%' : '',
            }}
          >
            <Text style={styles.messageText} numberOfLines={2}>
              {text}
            </Text>
          </View>
          {unreadeMessagesCount > 0 && (
            <View style={styles.messagesNumber}>
              <Text style={styles.messageNumberText}>
                {unreadeMessagesCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  chatDetails: {
    flex: 1,
    paddingLeft: 10,
    height: '100%',
  },
  user: {
    ...style.text,
    fontWeight: '900',
    fontSize: 18,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 16,
    color: colors.medium,
    // fontWeight: "500",
  },
  messageNumberText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 12,
  },

  timing: {
    fontWeight: 'bold',
  },
  messagesNumber: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: colors.green,
    borderColor: colors.white,
    borderWidth: 1,
  },
});
