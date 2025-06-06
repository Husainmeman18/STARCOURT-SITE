import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "../src/pages/ProductDetailPage";
import { AuthProvider } from "../src/pages/AuthContext";
import { Signin } from "./pages/SignIn";
import { Signup } from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPass";
import { Navigate } from "react-router-dom";
import AuthChecker from "./pages/AuthChecker";
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOut";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AuthChecker/>
          <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={< Signup />} />
            <Route path="/signin" element={< Signin/>} />
            <Route path="/forgot-password" element={< ForgotPassword />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
             {/* Protected Route */}
            <Route path="/home" element={<RequireAuth> <HomePage /> </RequireAuth>}/>
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </CartProvider>
        </Router>
      </AuthProvider>
    </>
  );
}
 function RequireAuth({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default App;
