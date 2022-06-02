import React from 'react';
import PropTypes from 'prop-types';

import "./ProductCard.scss"
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import numberWithCommas from '../../utils/numberWithCommas'

import { set} from '../../redux/product-modal/productModalSlice';
import { useDispatch } from 'react-redux';
const ProductCard = React.memo(props => {
    console.log("vo dayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", props);
    const dispatch = useDispatch()
    return (
        <div className="product-card">
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt={props.name}/>
                    <img src={props.img02} alt={props.name}/>
                    {/* <img src={props.img03} alt={props.name}/> */}
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}đ
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}đ</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <Button 
                    size="sm"
                    icon="bx bx-cart"
                    animate={true}
                    onClick={() => dispatch(set(props.slug))}
                >
                    chọn mua
                </Button>
            </div>
        </div>
    );
});

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    img03: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired
};

export default ProductCard;