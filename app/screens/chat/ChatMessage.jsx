import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';

export default function ChatMessage({ message, currentUser }) {
  const { item } = message;
  if (!item || !currentUser)
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: 'flex-end',
        }}
      >
        <Text>...</Text>
      </View>
    );
  const { createdAt } = item;
  const isCurrentUser = item.senderId === currentUser._id;

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
      }}
    >
      {isCurrentUser && (
        <View style={styles.dateContainer}>
          <Text>{createdAt}</Text>
        </View>
      )}

      <View
        style={
          isCurrentUser
            ? styles.messageWrapper
            : styles.messageWrapperCurrentUser
        }
      >
        <Text
          style={
            isCurrentUser ? styles.messageText : styles.messageTextCurrentUser
          }
        >
          {item.text}
        </Text>
      </View>
      {!isCurrentUser && (
        <View style={styles.dateContainerCurrentUser}>
          <Text>12:10</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  messageWrapper: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    maxWidth: '90%',
  },
  messageText: {
    color: colors.white,
    fontSize: 16,
    flexWrap: 'wrap',
  },
  dateContainer: {
    marginRight: 20,
  },
  dateContainerCurrentUser: {
    marginLeft: 20,
  },
  messageWrapperCurrentUser: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.lightDark,
    maxWidth: '90%',
  },
  messageTextCurrentUser: {
    color: colors.dark,
    fontSize: 16,
  },
});
