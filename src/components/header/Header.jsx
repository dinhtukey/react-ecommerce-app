import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import logo from "../../assets/images/logo (2).png";
import "./Header.scss";

const headerNav = [
    {
        display: 'Trang chủ',
        path: '/'
    },
    {
        display: 'Sản phẩm',
        path: '/catalog'
    },
    {
        display: 'Phụ kiện',
        path: '/accessories'
    },
    {
        display: 'Liên hệ',
        path: '/contact'
    }
]
function Header() {
    const { pathname } = useLocation();
    const cartItems = useSelector((state) => state.cartItems.value);
    const [totalProducts, setTotalProducts] = useState(0);
    const headerRef = useRef(null);
    const active = headerNav.findIndex(item => item.path === pathname);
    
    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        }

        window.addEventListener("scroll", shrinkHeader);

        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        }
    }, [])

    const menuLeft = useRef(null);

    const menuToggle = () => menuLeft.current.classList.toggle('active');
    return (
        <div ref={headerRef} className="header">
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>

                    <div ref={menuLeft} className="header__menu__left">
                        <div className="header__menu__left__close"  onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            headerNav.map((item, index) => (
                                <div onClick={menuToggle} key={index} className={`header__menu__item header__menu__left__item ${index === active ? 'active' : ''}`}>
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>

                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search"></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <i className="bx bx-shopping-bag"></i>
                                <span className="header__quantity__cart">{totalProducts}</span>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-user"></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Header;