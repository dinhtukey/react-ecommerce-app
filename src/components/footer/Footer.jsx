import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Footer.scss";
import Grid from "../grid/Grid";
import logo from "../../assets/images/logo (2).png";

const footerAboutLinks = [
    {
        display: 'Giới thiệu',
        path: '/about'
    },
    {
        display: 'Liên hệ',
        path: '/about'
    },
    {
        display: 'Tuyển dụng',
        path: '/about'
    },
    {
        display: 'Tin tức',
        path: '/about'
    },
    {
        display: 'Hệ thống cửa hàng',
        path: '/about'
    }
]

const footerCustomerLinks = [
    {
        display: 'Chính sách đổi trả',
        path: '/about'
    },
    {
        display: 'Chính sách bảo hành',
        path: '/about'
    },
    {
        display: 'Chính sách hoàn tiền',
        path: '/about'
    }
]
function Footer(props) {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            Tổng đài hỗ trợ
                        </div>
                        <div className="footer__content">
                            <p>
                                Liên hệ đặt hàng <strong>0984281524</strong>
                            </p>
                            <p>
                                Thắc mắc đơn hàng <strong>0984281524</strong>
                            </p>
                            <p>
                                Góp ý, khiếu nại <strong>0984281524</strong>
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="footer__title">
                            Về Yolo
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>{item.display}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <div className="footer__title">
                            Chăm sóc khách hàng
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>{item.display}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="logo" />
                            </Link>
                        </p>
                        <p>
                            Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho hàng triệu người tiêu dùng Việt.
                            Hãy cùng woldyy hướng đến một cuộc sống năng động, tích cực hơn.
                        </p>
                    </div>
                </Grid>
                <div className="footer__button-scroll" onClick={scrollToTop} style={{display: visible ? '' : 'none'}}>
                    <i className='bx bx-up-arrow-alt'></i>
                </div>
            </div>

        </footer>
    );
}

export default Footer;