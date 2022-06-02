import React, { useCallback, useEffect, useRef, useState } from 'react';

import Helmet from '../components/helmet/Helmet';

import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/category";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";

import "../components/catalog/Catalog.scss";
import CheckBox from '../components/checkbox/CheckBox';
import Button from '../components/button/Button';
import InfinityList from '../components/infinity-list/InfinityList';
function Catalog(props) {
    const initFilter = {
        category: [],
        colors: [],
        size: []
    }
    const productList = productData.getAllProducts();

    const [products, setProducts] = useState(productList);
    const [filter, setFilter] = useState(initFilter);

    const filterRef = useRef(null);

    const clearFilter = () => {
        setFilter(initFilter)
    }
    const filterSelect = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break;
                case "COLORS":
                    setFilter({...filter, colors: [...filter.colors, item.color]})
                    break;
                case "SIZE":
                    setFilter({...filter, size: [...filter.size, item.size]})
                    break;
                default:
            }
        } else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break;
                case "COLORS":
                    const newColors = filter.colors.filter(e => e !== item.color);
                    setFilter({...filter, colors: newColors})
                    break;
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size);
                    setFilter({...filter, size: newSize})
                    break;
                default:
            }
        }
    }

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }
            if (filter.colors.length > 0) {
                temp = temp.filter(e => {
                    const check = e.colors.find(color => filter.colors.includes(color));
                    return check !== undefined
                })
            }
            if (filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.size.find(size => filter.size.includes(size));
                    return check !== undefined
                })
            }

            setProducts(temp)
        }, [filter]
    )

    useEffect(() => {
        updateProducts();
        // dispatch(toggle()
    }, [updateProducts])

    const toggleFilter = () => filterRef.current.classList.toggle('active')
    return (
        <Helmet title="Sản phẩm">
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close">
                        <i className='bx bx-chevron-left' onClick={toggleFilter}></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div
                                    className="catalog__filter__widget__content__item"
                                    key={index}>
                                        <CheckBox 
                                        label={item.display} 
                                        onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div
                                    className="catalog__filter__widget__content__item"
                                    key={index}>
                                        <CheckBox 
                                        label={item.display} 
                                        onChange={(input) => filterSelect("COLORS", input.checked, item)}
                                        checked={filter.colors.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                size.map((item, index) => (
                                    <div
                                    className="catalog__filter__widget__content__item"
                                    key={index}>
                                        <CheckBox 
                                        label={item.display} 
                                        onChange={(input) => filterSelect("SIZE", input.checked, item)} 
                                        checked={filter.size.includes(item.size)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>Xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button onClick={toggleFilter}>Bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList data={products} />
                </div>
            </div>
        </Helmet>
    );
}

export default Catalog;