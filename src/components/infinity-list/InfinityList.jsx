import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '../grid/Grid';
import ProductCard from '../product-card/ProductCard';

const InfinityList = props => {
    const listRef = useRef(null);
    const perload = 6;
    
    const [load, setLoad] = useState(false);
    const [index, setIndex] = useState(0);

    const [data, setData] = useState(props.data.slice(0, perload));

    useEffect(() => {
        setData(props.data.slice(0, perload));
        setIndex(1);
        console.log('ref', listRef.current.offsetTop);
        
    }, [props.data])

    //listRef.current.clientHeight: là chiều cao của thẻ <div ref={listRef}> </div>
    //listRef.current.offsetTop: là khoảng cách từ div đến phần đầu trang

    useEffect(() => {
        const scrollList = () => {
            console.log("window.scrollY + window.innerHeight", window.scrollY + window.innerHeight);
            console.log('listRef.current.clientHeight + listRef.current.offsetTop + 200', listRef.current.clientHeight + listRef.current.offsetTop);
            if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop) {
                setLoad(true)
            }
        }
        window.addEventListener("scroll", scrollList)
        return () => {
            window.removeEventListener('scroll', scrollList);
        }
    }, [listRef])

    useEffect(() => {
        const getItems = () => {
            const pages = Math.floor(props.data.length / perload)
            const maxIndex = props.data.length % perload === 0 ? pages : pages + 1

            if (load  && index <= maxIndex) {
                const start = perload * index;
                const end = start + perload;

                setData(data.concat(props.data.slice(start, end)))
                setIndex(index + 1)
            }
        }

        getItems();
        setLoad(false)
    }, [load, index, data, props.data])
    return (
        <div ref={listRef}>
            <Grid
                col={4}
                mdCol={3}
                smCol={2}
                gap={20}
            >
                {
                    data.map((item, index) => (
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
        </div>
    );
};

InfinityList.propTypes = {
    data: PropTypes.array.isRequired
};

export default InfinityList;