import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Menu({logout}) {
  return (
    <View style={styles.container}>
      <Text></Text>
      <Text style={styles.text}>To Do App</Text>
      <TouchableOpacity onPress={logout}>
        <Image
          source={require('../../img/logout.png')}
          style={styles.logoutImg}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#123',
    marginHorizontal: -10,
    marginTop: -25,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutImg: {
    height: 20,
    width: 20,
  },
});
