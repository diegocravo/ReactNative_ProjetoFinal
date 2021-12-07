import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

export default function TaskList({data, deleteItem, editItem}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => deleteItem(data.key)}>
        <Image source={require('../../img/trash.png')} style={styles.img} />
      </TouchableOpacity>
      <View style={{paddingRight: 10}}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={{color: '#fff', paddingRight: 10}}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#123',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
  img: {
    height: 20,
    width: 20,
  },
});
