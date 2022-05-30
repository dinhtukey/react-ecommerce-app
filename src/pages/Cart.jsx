import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Helmet from "../components/helmet/Helmet";
import numberWithCommas from '../utils/numberWithCommas';
import Button from '../components/button/Button';

import productData from "../assets/fake-data/products";

import "../components/cart/Cart.scss";
import CartItem from '../components/cart-item/CartItem';

function Cart(props) {
    const cartItems = useSelector((state) => state.cartItems.value)

    console.log("cartItems", productData.getCartItemsInfo(cartItems));

    const [cartProducts, setCartProducts] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);

    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        setCartProducts(productData.getCartItemsInfo(cartItems));
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
        setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
    }, [cartItems])


    return (
        <Helmet title="Giỏ hàng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>Thành tiền</span>
                            <span>{numberWithCommas(totalPrice)} đ</span>
                        </div>
                    </div>
                    
                    <div className="cart__info__btn">
                        <Button size="block">Đặt hàng</Button>
                        <Link to="/catalog">
                            <Button size="block">tiếp tục mua hàng</Button>
                        </Link>
                    </div>
                </div>

                <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))
                    }
                </div>
            </div>
        </Helmet>
    );
}

export default Cart;