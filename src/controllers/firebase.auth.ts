import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { app, userCollectionName } from "./firebase.config";
import { addDocumentWithId } from "./firestore.controllers";

const auth = getAuth(app);

export const firebaseSignin = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const firebaseSignUp = (
  name: string,
  email: string,
  password: string
) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const data = { name, email };
        await addDocumentWithId(userCollectionName, data, user.uid);
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const firebaseSignOut = () => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCurrentUser = () => {
  return new Promise<User>((resolve, reject) => {
    const user = auth.currentUser;
    if (user) {
      resolve(user);
    } else {
      reject("No user signed in");
    }
  });
};
