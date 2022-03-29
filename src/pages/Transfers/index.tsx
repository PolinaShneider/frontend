import axios from "axios";
import React from "react";
import { OptionShape, Select } from '@alfalab/core-components/select';
import authHeader from "../../utils";

const BACKEND_URL = 'http://94.228.120.208';

type UserOption = {
    name: string;
    id: string;
}

type OnSelectProps = {
    selected: OptionShape | null;
    selectedMultiple: OptionShape[];
    initiator: OptionShape | null;
    name?: string;
}

export const Transfers = () => {
    const [balance, setUserBalance] = React.useState(0);
    const [options, setOptions] = React.useState([] as OptionShape[]);
    const [recipientId, setRecipientId] = React.useState('');

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
    const getOtherUsers = () => {
        axios.get(`${BACKEND_URL}/user/usersWithoutMe`, {
            headers: authHeader(),
        }).then((result) => {
            const data = result.data.response;
            if (data) {
                setOptions(data.map((item: UserOption) => { 
                    return {
                        key: item.id, content: item.name
                    }
                 }))
            }
        })
    }
    const handleChange = ({selected}: OnSelectProps) => {
        if (selected) {
            setRecipientId(selected.value);
        }
    };

    React.useEffect(() => {
        getUserBalance();
        getOtherUsers();
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
                />
            </div>
        </div>
    )
}