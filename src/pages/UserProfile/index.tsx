import React from "react";
import axios from "axios";
import authHeader from "../../utils";

import './styles.css';
import { Button } from "@alfalab/core-components/button";
import { Link } from "react-router-dom";

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
                <div className="avatar-holder">
                    <div className="avatar user-avatar">
                        <img width="180" src={userData.photo} />
                    </div>
                </div>
                <div className="info">
                    <h2 className="user-name">
                        {userData.name}
                    </h2>
                    <h3 className="user-text">
                        id: {userData.id}
                    </h3>
                    <h3 className="user-text">
                        Баланс: <span className="user-balance">{userData.balance} бонусов</span>
                    </h3>
                    <div className="buttons-holder">
                        <Button
                            className="button"
                        >
                            <Link to="/">
                                На главную
                            </Link>
                        </Button>
                        <Button
                            className="button transfer-button"
                        >
                            <Link to="/transfers">
                                Перевести
                            </Link>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}