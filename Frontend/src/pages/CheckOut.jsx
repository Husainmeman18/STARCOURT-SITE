import { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalPrice, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // State for form fields
  const [contactInfo, setContactInfo] = useState({
    emailOrPhone: "",
    emailOffers: false,
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    saveInfo: false,
  });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) {
      alert("Please sign in to place an order.");
      return;
    }

    // Validate form fields
    if (
      !contactInfo.emailOrPhone ||
      !deliveryInfo.address ||
      !deliveryInfo.postalCode ||
      !deliveryInfo.city
    ) {
      alert("Please fill in all required delivery fields.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create Razorpay order from backend
    const orderRes = await fetch("http://localhost:4000/api/create-order", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    });

    const orderData = await orderRes.json();

    if (!orderData || !orderData.id) {
      alert("Failed to create Razorpay order");
      return;
    }

    const options = {
      key: "rzp_test_pzhHoO53FGffHP",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Starcourt",
      description: "Order Payment",
      order_id: orderData.id,
      handler: async function (response) {
        // Save order to backend
        const saveRes = await fetch("http://localhost:4000/api/order/place", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            cartItems,
            totalAmount: totalPrice,
            contactInfo,
            deliveryInfo,
          }),
        });

        const saveData = await saveRes.json();
        if (saveData.message) {
          setShowSuccessAlert(true);
          setCartItems([]);
          localStorage.removeItem("cartItems");
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 3000);
        } else {
          alert("Order placed but failed to save in DB.");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: contactInfo.emailOrPhone,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      {showSuccessAlert && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "1.5rem 2rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            fontWeight: "bold",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          Payment successful & order placed!
        </div>
      )}

      <div
        style={{
          padding: "0 0 0 2rem ",
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          maxWidth: "100%",
          margin: "0 0 0 128.4px",
        }}
      >
        {/* Left Section: Contact and Delivery Forms */}
        <div
          style={{
            // flex: "2",
            paddingTop:"2rem",
            display: "flex",
            width:"650px",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* <h2 className="h-same" style={{ fontSize: "1.5rem", fontWeight: "600" ,margin:"8px 0" }}>Checkout</h2> */}

          {/* Contact Section */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <h3 className="h-same" style={{ fontSize: "1.2rem", fontWeight: "600" ,margin:"0 0 10px 0 "}}>Contact</h3>
            <input
              type="text"
              placeholder="Email or mobile phone number"
              value={contactInfo.emailOrPhone}
              className="same-input"
              onChange={(e) =>
                setContactInfo({ ...contactInfo, emailOrPhone: e.target.value })
              }
            />
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                style={{ marginTop:"10px"}}
                checked={contactInfo.emailOffers}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    emailOffers: e.target.checked,
                  })
                }
              />
              <span style={{ marginTop:"10px"}}>Email me with news and offers</span>
            </label>
          </div>

          {/* Delivery Section */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <h3 className="h-same" style={{ fontSize: "1.2rem", fontWeight: "600" }}>Delivery</h3>
            <select
              value={deliveryInfo.country}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, country: e.target.value })
              }
               style={{ width:"591px",padding:"13.5px 11px",border:"1px solid #ccc",borderRadius:"8px"}}
            >
              <option value="India">India</option>
              {/* Add more countries as needed */}
            </select>
            <div style={{ display: "flex", gap: "1rem" ,width:"591px" }}>
              <input
                type="text"
                placeholder="First name (optional)"
                value={deliveryInfo.firstName}
                onChange={(e) =>
                  setDeliveryInfo({
                    ...deliveryInfo,
                    firstName: e.target.value,
                  })
                }
                style={{
                  flex: "1",
                  padding: "13.5px 11px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                value={deliveryInfo.lastName}
                onChange={(e) =>
                  setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })
                }
                style={{
                  flex: "1",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              value={deliveryInfo.address}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
              }
              className="same-input"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              value={deliveryInfo.apartment}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, apartment: e.target.value })
              }
             className="same-input"
            />
            <div style={{ display: "flex", gap: "1rem" ,width:"591px" }}>
              <input
                type="text"
                placeholder="Postal code"
                value={deliveryInfo.postalCode}
                onChange={(e) =>
                  setDeliveryInfo({
                    ...deliveryInfo,
                    postalCode: e.target.value,
                  })
                }
                style={{
                  flex: "1",
                   padding: "13.5px 11px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <input
                type="text"
                placeholder="City"
                value={deliveryInfo.city}
                onChange={(e) =>
                  setDeliveryInfo({ ...deliveryInfo, city: e.target.value })
                }
                style={{
                  flex: "1",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={deliveryInfo.saveInfo}
                style={{ marginTop:"10px"}}
                onChange={(e) =>
                  setDeliveryInfo({
                    ...deliveryInfo,
                    saveInfo: e.target.checked,
                  })
                }
              />
              <span style={{ marginTop:"10px"}}>Save this information for next time</span>
            </label>
          </div>

          {/* Shipping Method Placeholder */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Shipping method
            </h3>
            <p style={{ color: "#888", fontSize: "0.9rem" }}>
              Enter your shipping address to view available shipping methods.
            </p>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div
          style={{
            flex: "1",
            padding: "1rem",
            backgroundColor:"hsl(0, 0%, 96%)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h3 className="h-same" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Order Summary
          </h3>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <img
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.title}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <span className="h-same" >
                  {item.title} (Qty: {item.quantity})
                </span>
              </div>
              <span className="h-same" >₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr style={{ border: "1px solid #ddd" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold" }} className="h-same"  >Subtotal</span>
            <span className="h-same" >₹{totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold" }} className="h-same" >Shipping</span>
            <span className="h-same" >Enter shipping address</span>
          </div>
          <hr style={{ border: "1px solid #ddd" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: "bold" }} className="h-same" >Total</span>
            <span style={{ fontWeight: "bold" }} className="h-same" >₹{totalPrice.toFixed(2)}</span>
          </div>
          <button
          className="h-same" 
            onClick={handlePayment}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#3399cc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Pay Now
          </button>
            <Link to="/" style={{display:"flex",justifyContent:"center"}}><button className="default-class">Continue Shopping</button></Link>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
