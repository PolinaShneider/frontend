import React, {ChangeEvent, useState} from "react";
import {Input} from "@alfalab/core-components/input";
import {Button} from "@alfalab/core-components/button";

import './styles.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const BACKEND_URL = 'http://94.228.120.208';

export const RegistrationForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const change = (event: ChangeEvent<HTMLInputElement>, field: 'name' | 'email' | 'password') => {
        const value = event.target.value;
        switch (field) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    };
    const submitForm = async () => {
        const result = await axios.post(`${BACKEND_URL}/auth/register`, {
            name,
            email,
            password,
            photo: avatar,
        });

        if (result) {
            localStorage.setItem('user', JSON.stringify(result.data));
            navigate('/profile');
        }
    };
    return (
        <>
            <form className="registration-form">
                <Input
                    className="field"
                    value={name}
                    placeholder="Введите имя"
                    type="text"
                    onChange={(event) => change(event, 'name')}
                />
                <Input
                    className="field"
                    value={email}
                    placeholder="Email"
                    type="email"
                    onChange={(event) => change(event, 'email')}
                />
                <Input
                    className="field"
                    value={password}
                    placeholder="Пароль"
                    type="password"
                    onChange={(event) => change(event, 'password')}
                />
                <SelectAvatar setAvatar={setAvatar}/>
                <Button
                    className="button"
                    onClick={submitForm}
                >
                    Регистрация
                </Button>
            </form>
        </>
    )
};

type SelectAvatarProps = {
    setAvatar: (value: string) => void;
}

const SelectAvatar = ({setAvatar}: SelectAvatarProps) => {
    const [selectedIndex, setIndex] = useState(-1);
    const onSelectAvatar = ({index, src}: { index: number; src: string }) => {
        setAvatar(src);
        setIndex(index);
    };
    const avatars = [
        'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_421,h_421/https://rodrigovarejao.com/wp-content/uploads/2020/03/80abc9bceb94535ef1e24cce7e5efb8e-sticker.png',
        'https://cdn141.picsart.com/352633045030211.png',
        'https://www.hola.com/us/images/0266-1197a831fb20-d4b3b80e6ea4-1000/square-800/apple-memoji.jpg',
        'https://cutewallpaper.org/24/iphone-emoji-faces-png/apple-unveils-new-emoji-face-mask-memoji-characters-hypebeast.png',
        'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/wqyrge7d1m3ntcegpute/memoji-1?fimg-client-default'
    ];
    return (
        <div className="select-avatar">
            <h2 className="select-avatar-title">Выберите аватарку:</h2>
            <div className="avatars-wrapper">
                {
                    avatars.map((item, index) => (
                        <img
                            width="60"
                            src={item}
                            onClick={() => onSelectAvatar({src: item, index})}
                            key={index}
                            className={["avatar", selectedIndex === index ? "avatar-active" : ""].join(" ")}
                        />
                    ))
                }
            </div>
        </div>
    )
};
