

const BrightlySection = () => {
  return (
    <section className="custom-section">
      <div className="custom-container">
        {/* Column 1 */}
        <div className="column left-column">
          <h4>Brightly</h4>
          <p>From editor’s choice with basic items, help you <br /> simple but good at all</p>
          <a href="/" className="shop-button">
             SHOP NOW
          </a>
        </div>

        {/* Column 2 */}
        <div className="column right-column">
          <h4>Wogger</h4>
          <p>From editor’s choice with basic items, <br /> help you simple but good at all</p>
          <a href="/" className="shop-button">
            SHOP NOW
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrightlySection;
