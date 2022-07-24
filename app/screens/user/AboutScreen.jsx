import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';
import style from '../../config/style';

const OpenURLButton = ({ url, icon }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.linkBtn} onPress={handlePress}>
      {icon()}
    </TouchableOpacity>
  );
};

const Aboutscreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          My Doctor is a mobile application that was developed and presented by
          ULK Kigali students from Computer Science in the the academic Year
          2021-2022, to help the population keep in touch with their doctors.
        </Text>
      </View>
      <View style={styles.authorItemWrapper}>
        <View style={styles.authorDetails}>
          <Text style={styles.authorName}>Alfred Bisimwa</Text>
          <Text style={styles.authorAbout}>Full-stack web developper</Text>
          <View style={styles.socialMediaLinks}>
            <OpenURLButton
              url='https://github.com/Alfredbis29'
              icon={() => (
                <AntDesign name='github' size={18} color={colors.light} />
              )}
            />
            <OpenURLButton
              url='https://www.linkedin.com/in/alfred-bisimwa/'
              icon={() => (
                <AntDesign
                  name='linkedin-square'
                  size={18}
                  color={colors.light}
                />
              )}
            />
            <OpenURLButton
              url='https://twitter.com/AlfredBisimwa1'
              icon={() => (
                <AntDesign name='twitter' size={18} color={colors.light} />
              )}
            />
            <OpenURLButton
              url='https://alfredbis29.github.io/My-portfolio/'
              icon={() => (
                <MaterialCommunityIcons
                  name='web'
                  size={18}
                  color={colors.light}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.authorImageWrapper}>
          <Image
            source={require('../../../assets/alfred.png')}
            style={styles.authorImage}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  authorItemWrapper: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  authorDetails: {
    backgroundColor: colors.white,
    ...style.boxShaddow,
    padding: 15,
    width: 180,
    borderRadius: 15,
    position: 'absolute',
    left: 0,
    zIndex: 1,
    marginLeft: 15,
  },
  socialMediaLinks: {
    flexDirection: 'row',
  },
  linkBtn: {
    marginRight: 10,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  authorName: {
    ...style.text,
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  authorAbout: {
    ...style.text,
    fontSize: 15,
    marginBottom: 12,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    ...style.text,
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  authorImageWrapper: {
    backgroundColor: colors.white,
    width: 220,
    height: 270,
    borderRadius: 15,
    overflow: 'hidden',
  },
  authorImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
});

export default Aboutscreen;
