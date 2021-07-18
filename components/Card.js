import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Card = ({time = '12', app = 'watsapp', body = 'hi'}) => {
  return (
    <View style={styles.cWrapper}>
      <Text style={styles.cTime}>{time}</Text>
      <View style={styles.cBodyWrapper}>
        <View style={styles.cAppWrapper}>
          <Text style={styles.cApp} numberOfLines={1}>
            {app}
          </Text>
          <View style={styles.appIconWrapper}>
            <Image
              style={styles.appIcon}
              source={{uri:"https://image.shutterstock.com/image-vector/telephone-icon-whatsapp-logo-phone-260nw-1169104867.jpg"}}
            />
          </View>
        </View>
        <Text style={styles.cBody} numberOfLines={2}>
          {body}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cWrapper: {
    padding: 10,
    marginLeft: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  },
  cTime: {
    fontSize: 10,
    marginTop: 4,
    marginRight: 8,
    color: '#858585',
  },
  cBodyWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  cAppWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cApp: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // appIconWrapper: {
  //   backgroundColor: 'green',
  // },
  appIcon: {
    width: 24,
    height: 24,
    opacity: 0,
    backgroundColor: 'green',
  },
  cBody: {
    color: '#858585',
    marginBottom: 16,
  },
});

export default Card;
