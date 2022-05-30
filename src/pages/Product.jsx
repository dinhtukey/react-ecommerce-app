import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Section, { SectionTitle, SectionBody } from "../components/section/Section";

import Helmet from "../components/helmet/Helmet";
import productData from "../assets/fake-data/products";
import Grid from '../components/grid/Grid';
import ProductCard from '../components/product-card/ProductCard';
import ProductView from '../components/product-view/ProductView';

function Product(props) {
    const { slug} = useParams();
    const product = productData.getProductBySlug(slug)
    const relatedProduct = productData.getProducts(8);
    
    useEffect(() => {
        window.scrollTo(0,0)
    }, [slug])

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product} />
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Khám phá</SectionTitle>
                <SectionBody>
                    <Grid
                    col={5}
                    mdCol={3}
                    smCol={2}
                    gap={20}
                    >
                        {
                            relatedProduct.map((item, index) => (
                                <ProductCard 
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    );
}

export default Product;