import React, { useEffect, useState } from 'react';

import productData from "../../assets/fake-data/products";
import Button from '../button/Button';
import ProductView from '../product-view/ProductView';

import "./ProductViewModal.scss";
import { remove} from '../../redux/product-modal/productModalSlice';
import { useDispatch, useSelector } from 'react-redux';
const ProductViewModal = () => {
    const productSlug = useSelector((state) => state.productModal.value);
    const dispatch = useDispatch();

    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        setProduct(productData.getProductBySlug(productSlug))
    }, [productSlug])
    // const product = productData.getProductBySlug('quan-jean-phong-cach-18');

    return (
        <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product} />
                <div className="product-view__modal__content__close">
                    <Button onClick={() => dispatch(remove())}>
                        <i className="bx bx-x"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default ProductViewModal;