import { useSession } from "../firebase/userProvider";

const Profile = () => {
    const user = useSession().user;
    if(!user) {
        return null;
    }

    return (
        <div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.uid}</p>
        </div>
    )
}

export default Profile;