import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../userContext';
import {Navigate, useParams} from 'react-router-dom';

//TODO: Make the profile page show different information based on if the viewer is the owner of the profile or not

function Profile() {
    const userContext = useContext(UserContext);
    const {username} = useParams();
    const [profile, setProfile] = useState({});

    useEffect(function () {
        const getProfile = async () => {
            try {
                const res = await fetch(`http://localhost:3001/users/${username}`, {credentials: "include"});
                if (!res.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await res.json();
                console.log(data); // Log the fetched data
                setProfile(data);
            } catch (error) {
                console.error(error); // Log any errors
            }
        }
        getProfile();
    }, [username]);


    return (
        <>
            {!userContext.user && <Navigate replace to="/login"/>}
            <div className="container">
                <div className="card mt-5 m-auto" style={{width: '28rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">Username: {profile.username}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Email: {profile.email}</h6>
                        <h6 className="card-text">Total photos published: {profile.photos}</h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;