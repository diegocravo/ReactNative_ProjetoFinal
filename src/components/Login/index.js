import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import firebase from '../../services/firebaseConnection';

export default function Login({changeStatus}) {
  const [type, setType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (type === 'login') {
      // Aqui fazemos o login
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          changeStatus(user.user.uid);
        })
        .catch(err => {
          console.log(err);
          alert('Ops, parece que deu algum erro.');
          return;
        });
    } else {
      // Aqui cadastramos o usuário
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          changeStatus(user.user.uid);
        })
        .catch(err => {
          console.log(err);
          alert('Ops, parece que deu algum erro.');
          return;
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Seu Email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        placeholder="***********"
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={[
          styles.handleLogin,
          {backgroundColor: type === 'login' ? '#3ea6f2' : '#123'},
        ]}
        onPress={handleLogin}>
        <Text style={styles.loginText}>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType(type => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text style={{textAlign: 'center'}}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#123',
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10,
    borderRadius: 4,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
  },
});
