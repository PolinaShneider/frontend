import React from "react";
import axios from "axios";
import authHeader from "../../utils";

import './styles.css';

export const UserProfile = () => {
    const BACKEND_URL = 'http://94.228.120.208';
    const [userData, setUserData] = React.useState({
        photo: '',
        name: '',
        id: '',
        balance: 0,
    });
    const getUserInfo = () => {
        axios.get(`${BACKEND_URL}/user/me`, {
            headers: authHeader(),
        }).then((result) => {
            const data = result.data.response;
            if (data) {
                setUserData({
                    photo: data.photo,
                    name: data.name,
                    id: data.id,
                    balance: data.balance,
                })
            }
        })
    };
    React.useEffect(() => {
        getUserInfo();
    }, []);
    return (
        <div>
            <h1>Твой профиль</h1>
            <div className="user-profile">
                <div>
                    <img width="300" src={userData.photo} />
                </div>
                <div>
                    <div>{userData.name}</div>
                    <div>{userData.id}</div>
                    <div>{userData.balance}</div>
                </div>
            </div>
        </div>
    )
}