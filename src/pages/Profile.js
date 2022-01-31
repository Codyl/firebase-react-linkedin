import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../firebase/userProvider";
import { firestore } from "../firebase/config";
import { updateUserDocument } from "../firebase/user";
import { ProfileImage } from "../ProfileImage";

const Profile = (props) => {
  const user = useSession().user;
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
console.log('made it', props)
  useEffect(() => {
    const docRef = firestore.doc(`/users/${props.match.params.uid}`);
    //Gets the data once for the uid but does not update to realtime changes
    // docRef.get().then(document => {
    //     if(document.exists) {
    //         setUserDocument(document.data());
    //     }
    // });
    //Listens to changes to the firebase snapshot and sets the firestore document
    const unsubscribe = docRef.onSnapshot((doc) => {
      console.log(doc.exists)
      if (doc.exists) {
        const documentData = doc.data();
        //sends data to firestore through user.js
        setUserDocument(documentData);
        //sets the form values
        setValue("fieldArray", documentData);
        setValue("uid", documentData.uid);
      }
    });
    return unsubscribe;
  }, [props.match.params.uid, setValue, params.id]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await updateUserDocument({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userDocument) {
    return null;
  }

  const formClassName = `ui big form ${isLoading ? "loading" : ""}`;
  return (
    <div
      className="add-form-container"
      style={{ maxWidth: 960, margin: "50px auto" }}
    >
      <div className="ui grid stackable">
        <ProfileImage id={params.uid} />
        <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
          <div className="fields">
            <div className="eight wide field">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  {...register("fieldArray.name")}
                />
              </label>
            </div>
            <div className="eight wide field">
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  disabled
                  {...register("fieldArray.email")}
                />
              </label>
            </div>
          </div>
          <div className="fields">
            <div className="six wide field">
              <label>
                Address
                <input
                  type="text"
                  name="address"
                  {...register("fieldArray.address")}
                />
              </label>
            </div>
            <div className="five wide field">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  {...register("fieldArray.city")}
                />
              </label>
            </div>
            <div className="two wide field">
              <label>
                State
                <input
                  type="text"
                  name="state"
                  {...register("fieldArray.state")}
                />
              </label>
            </div>
            <div className="three wide field">
              <label>
                Zip
                <input type="text" name="zip" {...register("fieldArray.zip")} />
              </label>
            </div>
          </div>
          <div className="equal width fields">
            <div className="field">
              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  {...register("fieldArray.phone")}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Specialty
                <select
                  className="specialty"
                  name="specialty"
                  {...register("fieldArray.specialty")}
                >
                  <option value="field agent">Field Agent</option>
                  <option value="covert operations">Covert Operations</option>
                  <option value="intelligence officer">
                    Intelligence Officer
                  </option>
                </select>
              </label>
            </div>
            <div className="field">
              <label>
                ip
                <input type="text" name="ip" {...register("fieldArray.ip")} />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="ui submit large grey button right floated"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
