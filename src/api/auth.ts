import { FirebaseError } from '@firebase/util';
import * as auth from 'firebase/auth';
import { auth as authRef } from '../firebase';

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await auth.signInWithEmailAndPassword(authRef, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    } else {
      console.log(error);
    }
  }
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await auth.createUserWithEmailAndPassword(authRef, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    } else {
      console.log(error);
    }
  }
  try {
    await auth.signOut(authRef);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    } else {
      console.log(error);
    }
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await auth.signOut(authRef);
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    } else {
      console.log(error);
    }
  }
};
