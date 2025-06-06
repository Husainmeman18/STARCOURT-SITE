const FooterSection = () => {
  return (
    <section className="footer-section">
      <div className="container1">
        {/* Logo and Contact Info */}
        <div className="column1">
          <div className="logo">
            <span>STARCOURT</span>
          </div>
          <div className="contact-info">
            <div>
              {" "}
              123, Galaxy Arcade, Near L.P. Savani Road, Adajan, Surat, Gujarat
              – 395009
            </div>
            <div>
              <a href="tel:00825614334">+91 721 8330 031</a>
            </div>
            <div>
              <a href="mailto:support@utero.com">support@StarCourt.com</a>
            </div>
          </div>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        {/* FAQs Links */}
        <div className="column3">
          <h4>FAQS</h4>
          <ul>
            <li>
              <a href="https://demo.7iquid.com/utero/about/">Information</a>
            </li>
            <li>
              <a href="https://demo.7iquid.com/utero/checkout/">Payment</a>
            </li>
            <li>
              <a href="#">Shipping</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="https://demo.7iquid.com/utero/product/utero-gift-card/">
                Gift Card
              </a>
            </li>
            <li>
              <a href="#">Guest purchase</a>
            </li>
            <li>
              <a href="#">Electronic receipt</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="column3">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="https://demo.7iquid.com/utero/about/">About Store</a>
            </li>
            <li>
              <a href="https://demo.7iquid.com/utero/contact/">Contact</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="https://demo.7iquid.com/utero/autumn-spring-are-coming-tips-to-mix-your-clothes-as-stylish-men/">
                Our Journals
              </a>
            </li>
          </ul>
        </div>

        {/* Instagram Grid */}
        <div className="column2">
          <h4>Instagram</h4>
          <span>
            Following or tag us with <a href="#">#StarCourt</a>,{" "}
            <a href="#">@STARCOURT</a>
          </span>
          <div className="instagram-grid">
            {["ins-8", "ins-6", "ins-4", "ins-1", "ins-5", "ins-2"].map(
              (img, i) => (
                <a
                  key={i}
                  href={`https://www.instagram.com/p/Cw40${String.fromCharCode(
                    65 + i
                  )}CS0/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://demo.7iquid.com/utero/wp-content/uploads/2023/11/${img}-400x400.jpg`}
                    alt={img}
                    width="100"
                    height="100"
                  />
                </a>
              )
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom-container">
        {/* Column 1 - Copyright */}
        <div className="footer-column">
          <p>
            © 2025 <a href="/">STARCOURT.</a> All Rights Reserved
          </p>
        </div>
        {/* Column 3 - Payment methods */}
        <div className="footer-column">
          <span className="accept-for">Accept for</span>
          <img
            src="https://demo.7iquid.com/utero/wp-content/uploads/2023/03/payment-brand.png"
            alt="Payment Methods"
            className="payment-image"
          />
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
