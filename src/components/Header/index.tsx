import React from "react";
import { Link } from "react-router-dom";

import './styles.css';

export const Header = () => {
    return (
        <header className="header">
            <Link className="header-link" to="/">
                <h1 className="logo">Логотип</h1>
            </Link>
            <nav>
                <Link className="header-link" to="/">Домашняя страница</Link>
                <Link className="header-link" to="/register">Создать аккаунт</Link>
                <Link className="header-link" to="/profile">Профиль</Link>
                <Link className="header-link" to="/transfers">Переводы</Link>
                <Link className="header-link" to="/shop">Каталог</Link>
            </nav>
        </header>
    )
}