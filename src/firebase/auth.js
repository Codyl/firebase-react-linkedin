import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { createUserDocument } from './user';
import { firestore } from "../firebase/config";


export const signup = async ({firstName, lastName, email, password}) => {
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = resp.user;
    await user.updateProfile({ displayName: `${firstName} ${lastName}`});
    await createUserDocument(user);
    return user;
}

export const logout = () => {
    return firebase.auth().signOut();
}

export const login = async ({email, password}) => {
    const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
    return resp.user;
}

export const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const {user} = await firebase.auth().signInWithPopup(provider);
    const docRef = firestore.doc(`/users/${user.uid}`);
        //Gets the data once for the uid but does not update to realtime changes
        docRef.get().then(document => {
            if(!document.exists) {
                createUserDocument(user);
            }
        });
    return user;
}