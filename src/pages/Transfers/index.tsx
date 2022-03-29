import axios from "axios";
import React from "react";
import { Select } from '@alfalab/core-components/select';
import authHeader from "../../utils";

const BACKEND_URL = 'http://94.228.120.208';

export const Transfers = () => {
    const [balance, setUserBalance] = React.useState(0);
    const [options, setOptions] = React.useState([]);
    const [receiverId, setReceiverId] = React.useState(null);

    const getUserBalance = () => {
        axios.get(`${BACKEND_URL}/user/me`, {
            headers: authHeader(),
        }).then((result) => {
            const data = result.data.response;
            if (data) {
                setUserBalance(data.balance)
            }
        })
    };
    const handleChange = () => {
        
    };

    React.useEffect(() => {
        getUserBalance();
    }, [])
    return (
        <div>
            <h1>Страница переводов</h1>
            <p>
                Ваш баланс: <span>{balance} бонусов</span>
            </p>
            <div>
                <Select
                    options={options}
                    placeholder="id получателя"
                    onChange={handleChange}
                    selected={receiverId}
                />
            </div>
        </div>
    )
}