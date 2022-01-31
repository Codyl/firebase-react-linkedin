import { useEffect, useRef, useState } from "react";
import { getDownloadURL, uploadImage } from "./firebase/user";
import { useSession } from "./firebase/userProvider";

export const ProfileImage = ({ id }) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const user = useSession();
  // console.log(user.photoURL)

  useEffect(() => {
      getDownloadURL(id)
      .then(url => !!url && setImageUrl(url))
  }, [id]);

  const fileChange = async (files) => {
    const ref = await uploadImage(id, files[0], updateProgress);
    console.log(ref)
    const downloadUrl = await ref.getDownloadURL();
    console.log(downloadUrl)
    if(!!downloadUrl)
    setImageUrl(downloadUrl);
  };

  const updateProgress = snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  }

  return (
    <div className="four wide column profile-image">
      <img className="ui image" src={imageUrl || user.photoURL || "/profile-placeholder.png"} alt="profile" />
      <input
        type="file"
        className="file-input"
        accept=".png,.jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <progress style={{width: '100%0'}} max={"100"} value={uploadProgress}></progress>
      <button
        className="ui grey button upload-button"
        onClick={() => fileInput.current.click()}
      >
        Upload Photo
      </button>
    </div>
  );
};
