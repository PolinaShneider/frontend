import React from "react";
import { LoginForm } from "../../components/LoginForm";
import { RegistrationForm } from "../../components/RegistrationForm";

import './styles.css'

export const Registration = () => {
    return (
        <div className="registration-holder">
            <div>
                <h1>Регистрация</h1>
                <RegistrationForm/>
            </div>
            <div>
                <h1>Авторизация</h1>
                <LoginForm/>
            </div>
        </div>
    )
}