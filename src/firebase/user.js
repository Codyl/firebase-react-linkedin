import { firestore, storage } from "./config";

export const createUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);

  const userProfile = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    specialty: "",
    ip: "",
  };
  //Write to cloud firestore
  return docRef.set(userProfile);
};

export const updateUserDocument = async (user) => {
  const docRef = firestore.doc(`/users/${user.uid}`);
  return docRef.update(user.fieldArray);
};

export const uploadImage = (userId, file) => {
  return new Promise((resolve, reject) => {
    //Create file Reference
    const filePath = `users/${userId}/profile-image`;
    const fileRef = storage.ref().child(filePath);
    //Upload task
    const uploadTask = fileRef.put(file);
    console.log(uploadTask.snapshot.ref)

    uploadTask.on(
      'state_changed', 
      null, 
      error => reject(error), 
      () => {
      resolve(uploadTask.snapshot.ref)
    })
  })
};

export const getDownloadURL = userId => {
  const filePath = `users/${userId}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
}