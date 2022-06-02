import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import "../../components/product/Product.scss"
import Button from '../button/Button';

import numberWithCommas from "../../utils/numberWithCommas";
import { addItem } from '../../redux/shopping-cart/cartItemsSlice';
import { remove} from '../../redux/product-modal/productModalSlice';

const ProductView = props => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    let product = props.product;
    
    if (product === undefined) {
        product = {
            price: 0,
            title: "",
            colors: [],
            size: []
        }
    } 

    const [preview, setPreview] = useState(product.image01);
    const [descriptionExpand, setDescriptionExpand] = useState(false);

    const [color, setColor] = useState(product.colors[0]);

    const [size, setSize] = useState(product.size[0]);

    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreview(product.image01);
        setDescriptionExpand(false);
        setColor(product.colors[0]);
        setSize(product.size[0]);
        setQuantity(1)
    }, [product])

    const addToCart = () => {
        dispatch(addItem({
            slug: product.slug,
            color: color,
            size: size,
            quantity: quantity,
            price: product.price
        }))
        
    }

    const goToCart = () => {
        dispatch(addItem({
            slug: product.slug,
            color: color,
            size: size,
            quantity: quantity,
            price: Number(product.price)
        }));
        dispatch(remove());
        navigate("/cart")
    }
    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreview(product.image01)}>
                        <img src={product.image01} alt={product.title} />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreview(product.image02)}>
                        <img src={product.image02} alt={product.title} />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreview(product.image03)}>
                        <img src={product.image03} alt={product.title} />
                    </div>
                </div>
                <div className="product__images__main">
                    <img src={preview} alt={product.title} />
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}>
                    </div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                !descriptionExpand ? 'Xem thêm' : 'Thu gọn'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">
                    {product.title}
                </h1>
                <div className="product__info__item" style={{marginBottom: '1rem'}}>
                    <span className="product__info__item__price">
                        {numberWithCommas(product.price)} đ
                    </span>
                </div>
                <hr/>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc : {color}
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index) => (
                                <div 
                                key={index} 
                                className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                                onClick={() => setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ : <span style={{textTransform: 'uppercase'}}>{size}</span>
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index) => (
                                <div 
                                key={index} 
                                className={`product__info__item__list__item product__info__item__list__item--size ${size === item ? 'active' : ''}`}
                                onClick={() => setSize(item)}
                                >
                                    <span className="product__info__item__list__item__size">
                                    {item}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
                    </div>
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__quantity__btn product__info__item__quantity__btn--minus" onClick={() => updateQuantity('minus')}>
                            <i className="bx bx-minus"></i>
                        </div>
                        <div className="product__info__item__quantity__input">
                            { quantity}
                        </div>
                        <div className="product__info__item__quantity__btn product__info__item__quantity__btn--plus" onClick={() => updateQuantity('plus')}>
                            <i className="bx bx-plus"></i>
                        </div>
                    </div>
                </div>

                <div className="product__info__item">
                    <Button onClick={addToCart}>thêm vào giỏ</Button>
                    <Button onClick={goToCart}>mua ngay</Button>
                </div>
            </div>

            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}>
                    </div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                !descriptionExpand ? 'Xem thêm' : 'Thu gọn'
                            }
                        </Button>
                    </div>
                </div>
        </div>
    );
};

ProductView.propTypes = {
    product: PropTypes.object
};

export default ProductView;