import { firestore } from '../firebase/config';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const usersRef = firestore.collection('users');
        const unsubscribe = usersRef.onSnapshot(querySnapshot => {
            const users = querySnapshot.docs.map(doc => doc.data());
            console.log(users);
            setUsers(users);
        });
        return unsubscribe;
    }, []);

    
    return (
    <div>
        <table className='ui selectable celled table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Specialty</th>
                    <th>Secret address</th>
                    <th>Phone</th>
                    <th>IP address</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr key={user.uid}>
                            <td><Link to={`/profile/${user.uid}`}>{user.name}</Link></td>
                            <td>{user.specialty}</td>
                            <td>{user.address} {user.city} {user.state} {user.zip}</td>
                            <td>{user.phone}</td>
                            <td>{user.ip}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    );
};

export default Users;