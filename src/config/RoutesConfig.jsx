import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "../pages/Home";
import Product from "../pages/Product";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";

function RoutesConfig() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog/:slug" element={<Product />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
    );
}

export default RoutesConfig;