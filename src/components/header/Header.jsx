import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';

import {toggle} from "../../redux/search/searchSlice";
import logo from "../../assets/images/logo (2).png";
import Input from '../input/Input';
import "./Header.scss";

import productData from "../../assets/fake-data/products"
import OutsideClick from '../ClickOutSide';
import numberWithCommas from '../../utils/numberWithCommas';

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
    const dispatch = useDispatch();
    const searchCheck = useSelector((state) => state.search.value);

    const cartItems = useSelector((state) => state.cartItems.value);
    const [totalProducts, setTotalProducts] = useState(0);
    const headerRef = useRef(null);
    const active = headerNav.findIndex(item => item.path === pathname);
    const [keyword, setKeyword] = useState('');
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
    }, [cartItems])

    useEffect(() => {
        // console.log("alooooo", productData.filterProducts("16"));
        
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

    const openDropdown = (e) => {
        debounceDropDown(e.target.value);
    }

    const fetchDropdownOptions = (key) => {    
        setDropdownOptions(productData.filterProducts(key));
        setVisible(true);
    }

    const debounceDropDown = useCallback(_.debounce((nextValue) => fetchDropdownOptions(nextValue), 1000), [])

    const handleSearch = (e) => {
        e.preventDefault();
        
        setKeyword(e.target.value);
        debounceDropDown(e.target.value);
    }
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
                            <i className="bx bx-search" onClick={() => dispatch(toggle())}></i>
                            
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
                <div className={`header__search ${searchCheck ? 'active' : ''}`}>
                        <Input
                                type="text"
                                placeholder="Tìm sản phẩm"
                                value={keyword}
                                onChange={handleSearch}
                                onClick={openDropdown}
                            />
                            <OutsideClick onClickOutside={() => {setVisible(false)}}>
                            <div style={{display: visible ? 'grid' : 'none'}} className="header__search__dropdown">
                            {
                                visible && dropdownOptions.length > 0 ?
                                dropdownOptions.map((item, index) => (
                                        <Link onClick={() => dispatch(toggle())} to={`/catalog/${item.slug}`} className="header__search__dropdown__item" key={index}>
                                            <img src={item.image01} alt={item.title} />
                                            <div className="header__search__dropdown__item__info">
                                                <p>{item.title}</p>
                                                <p>{numberWithCommas(item.price)} đ</p>
                                            </div>
                                        </Link>
                                )) : 
                                (
                                    <div className="header__search__dropdown__item">
                                        No result
                                    </div>
                                )
                            }
                            </div>
                            </OutsideClick>
                    </div>
            </div>
        </div>
    );
}

export default Header;