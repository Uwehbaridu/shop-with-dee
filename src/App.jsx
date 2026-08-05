import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./cart";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Products from "./components/Products";
import About from "./components/About";
import Showroom from "./components/Showroom";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductPage from "./pages/ProductPage";
import OrderConfirmation from "./pages/OrderConfirmation";

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <Products />
        <About />
        <Showroom />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
