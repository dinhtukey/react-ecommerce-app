import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ProductViewModal from './components/product-view-modal/ProductViewModal';
import RoutesConfig from './config/RoutesConfig';

function App() {
  
  return (
    <>
      <Header />
      <div className="container">
        <div className="main">
          <RoutesConfig />
        </div>
      </div>
      <Footer />
      <ProductViewModal />
    </>
  );
}

export default App;
