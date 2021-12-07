import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB6zNrs6Dof08Zj7R65BWGgPzJQCIOW3Q0',
  authDomain: 'todo-6052a.firebaseapp.com',
  projectId: 'todo-6052a',
  storageBucket: 'todo-6052a.appspot.com',
  messagingSenderId: '677211656244',
  appId: '1:677211656244:web:8d9cda85fdf11843923a61',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
