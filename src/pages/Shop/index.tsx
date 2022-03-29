import { Button } from "@alfalab/core-components/button";
import {Notification} from '@alfalab/core-components/notification';
import axios from "axios";
import React from "react";
import authHeader from "../../utils";

import './styles.css';

const BACKEND_URL = 'http://94.228.120.208';

export interface Product {
    title: string;
    description: string;
    image: string;
    price: number;
    id: string;
    updatedAt: string;
    createdAt: string;
}

export const Shop = () => {
    const [products, setProducts] = React.useState([]);
    const [status, setStatus] = React.useState("positive" as "positive" | "negative");
    const [isVisible, setIsVisible] = React.useState(false);
    const hideNotification = React.useCallback(() => setIsVisible(false), []);

    const getAllProducts = () => {
        axios.get(`${BACKEND_URL}/products`, {
            headers: authHeader()
        }).then((result) => {
            const data = result.data.response;

            if (data) {
                setProducts(data);
            }
        })
    }

    const buyProduct = (productId: string) => {
        axios.post(`${BACKEND_URL}/operations/purchase`, {
            productId
        }, {
            headers: authHeader()
        }).then((result) => {
            const data = result.data.response;
            setIsVisible(true);
            setStatus(Boolean(data) ? "positive" : "negative");
        }).catch(() => {
            setIsVisible(true);
            setStatus("negative");
        })
    }

    React.useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div>
            <h1>Каталог</h1>
            <Notification
                badge={status}
                title="Уведомление о покупке"
                visible={isVisible}
                offset={180}
                onClickOutside={hideNotification}
                onClose={hideNotification}
                onCloseTimeout={hideNotification}
            >
                {status === "positive" ? "Поздравляем с покупкой" : "Не удалось совершить покупку :("}
            </Notification>
            <div className="products">
                {products.map((item: Product, key) => {
                    return (
                        <div className="product" key={key}>
                            <h3 className="product-title">{item.title}</h3>
                            <p>{item.description}</p>
                            <img width="100%" src={item.image}/>
                            <div className="product-price">{item.price} баллов</div>
                            <Button 
                                className="button product-button"
                                onClick={() => buyProduct(item.id)}
                            >Купить</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}