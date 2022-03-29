import React, { ChangeEvent } from "react";
import axios from "axios";
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';

import './styles.css';

export const RegistrationForm = () => {
    const [name, setName] = React.useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setName(value);
    }

    const BACKEND_URL = 'http://94.228.120.208';

    const register = () => {
        axios.post(`${BACKEND_URL}/auth/register`, {
            name,
            photo: 'https://cdn141.picsart.com/352633045030211.png',
            email: 'email@mail.ru',
            password: '123456'
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    const login = () => {
        axios.post(`${BACKEND_URL}/auth/login`, {
            email: 'email@mail.ru',
            password: '123456'
        }).then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    // login();

    return (
        <div>
            <Input
                label="name"
                type="text"
                onChange={onChange}
            />
            <Input label="email" type="email" />
            <Input label="password" type="password" />
            <AvatarSelect />
            <Button onClick={register} view="primary">Register</Button>
        </div>
    )
}

const AvatarSelect = () => {
    const avatars = [
        'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_421,h_421/https://rodrigovarejao.com/wp-content/uploads/2020/03/80abc9bceb94535ef1e24cce7e5efb8e-sticker.png',
        'https://cdn141.picsart.com/352633045030211.png',
        'https://www.hola.com/us/images/0266-1197a831fb20-d4b3b80e6ea4-1000/square-800/apple-memoji.jpg',
        'https://cutewallpaper.org/24/iphone-emoji-faces-png/apple-unveils-new-emoji-face-mask-memoji-characters-hypebeast.png',
        'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/wqyrge7d1m3ntcegpute/memoji-1?fimg-client-default'
    ];

    return (
        <div className="avatars-select">
            {avatars.map((item, index) => {
                return <div className="avatar-item" key={index}>
                    <img width="64" src={item} />
                </div>
            })}
        </div>
    )
}