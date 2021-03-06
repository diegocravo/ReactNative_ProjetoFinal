import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import Menu from './src/components/Menu';
import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }

      firebase
        .database()
        .ref('tarefas')
        .child(user)
        .once('value', snapshot => {
          setTasks([]);

          snapshot?.forEach(childItem => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };

            setTasks(oldTasks => [...oldTasks, data]);
          });
        });
    }
    getUser();
  }, [user]);

  function handleAdd() {
    if (newTask === '') {
      return;
    }

    // Usuário quer editar uma tarefa
    if (key !== '') {
      firebase
        .database()
        .ref('tarefas')
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === key);
          let taskClone = tasks;
          taskClone[taskIndex].nome = newTask;

          setTasks([...taskClone]);
        });

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas
      .child(chave)
      .set({
        nome: newTask,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask,
        };
        setTasks(oldTasks => [...oldTasks, data]);
      });

    Keyboard.dismiss();
    setNewTask('');
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref('tarefas')
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key);
        setTasks(findTasks);
      });
  }

  function handleEdit(data) {
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }

  function handleLogout() {
    setUser(null);
    setNewTask('');
    setTasks([]);
    setKey('');
  }

  if (!user) {
    return <Login changeStatus={user => setUser(user)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu logout={handleLogout} />
      {key.length > 0 && (
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Image
              source={require('./src/img/cancel.png')}
              style={styles.cancelImg}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 5, color: '#ff0000'}}>
            Você está editando uma tarefa!
          </Text>
        </View>
      )}

      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que você vai fazer hoje?"
          value={newTask}
          onChangeText={text => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc',
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#123',
    height: 45,
  },
  buttonAdd: {
    backgroundColor: '#123',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
  },
  cancelImg: {
    height: 20,
    width: 20,
  },
});
