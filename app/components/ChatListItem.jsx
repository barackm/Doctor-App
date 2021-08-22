import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import style from "../config/style";
export default function ChatListItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.chatDetails}>
        <View style={styles.header}>
          <Text style={styles.user}>{item.name}</Text>
          <Text style={styles.timing}>2:30pm</Text>
        </View>
        <View style={styles.messageDetails}>
          <View style={styles.message}>
            <Text style={styles.messageText} numberOfLines={2}>
              {item.message}
            </Text>
          </View>
          {item.new && (
            <View style={styles.messagesNumber}>
              <Text style={styles.messageNumberText}>4</Text>
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
    flexDirection: "row",
    alignItems: "center",
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
    height: "100%",
  },
  user: {
    ...style.text,
    fontWeight: "900",
    fontSize: 18,
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  messageDetails: {
    flexDirection: "row",
  },
  messageText: {
    fontSize: 16,
    color: colors.medium,
    // fontWeight: "500",
  },
  messageNumberText: {
    fontWeight: "bold",
    color: colors.white,
    fontSize: 12,
  },

  timing: {
    fontWeight: "bold",
  },
  messagesNumber: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
