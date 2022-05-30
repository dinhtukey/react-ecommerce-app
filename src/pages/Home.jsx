import React from 'react';
import { Link } from 'react-router-dom';

import Helmet from '../components/helmet/Helmet';
import HeroSlide from '../components/hero-slide/HeroSlide';
import Section, { SectionBody, SectionTitle} from '../components/section/Section';
import PolicyCard from '../components/policy-card/PolicyCard';
import Grid from '../components/grid/Grid';

import heroSliderData from '../assets/fake-data/hero-slider';
import policy from '../assets/fake-data/policy';
import productData from '../assets/fake-data/products';
import ProductCard from '../components/product-card/ProductCard';

import banner from '../assets/images/banner.png'
function Home(props) {
    return (
        <Helmet title="Trang chủ">
            <HeroSlide data={heroSliderData} control={true} auto={true} timeOut={5000}/>
            <Section>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            policy.map((item, index) => (
                                <Link key={index} to="/policy">
                                    <PolicyCard icon={item.icon} name={item.name} description={item.description} />
                                </Link>
                                
                            ))
                        }
                    </Grid>
                    
                </SectionBody>
            </Section>

            <Section>
                <SectionTitle>
                    top sản phẩm bán chạy trong tuần
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={5}
                        mdCol={3}
                        smCol={2}
                        gap={20}
                    >
                        {
                            productData.getProducts(5).map((item, index) => (
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

            <Section>
                <SectionTitle>
                   sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={5}
                        mdCol={3}
                        smCol={2}
                        gap={20}
                    >
                        {
                            productData.getProducts(8).map((item, index) => (
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

            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="banner"/>
                    </Link>
                </SectionBody>
            </Section>

            <Section>
                <SectionTitle>
                   phổ biến
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={5}
                        mdCol={3}
                        smCol={2}
                        gap={20}
                    >
                        {
                            productData.getProducts(12).map((item, index) => (
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

export default Home;