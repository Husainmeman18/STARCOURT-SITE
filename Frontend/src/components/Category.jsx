import glassespic from "../assets/sunglasses.png"
import shoes from "../assets/shoes.png"
const categories = [
  {
    name: "Clothes",
    items: 265,
    image:
      "https://demo.7iquid.com/utero/wp-content/uploads/2023/09/clothes-cat.png",
    link: "https://demo.7iquid.com/utero/shop-grid-3-columns/",
  },
  {
    name: "Shoes",
    items: 120,
    image: shoes,
    link: "https://demo.7iquid.com/utero/product-category/shoes/",
  },
  {
    name: "Bags",
    items: 94,
    image:
      "https://demo.7iquid.com/utero/wp-content/uploads/2023/09/bags-cat.png",
    link: "https://demo.7iquid.com/utero/product-category/bags/",
  },
  {
    name: "Sunglasses",
    items: 24,
    image: glassespic,
    link: "https://demo.7iquid.com/utero/product-category/sunglasses/",
  },
  {
    name: "Accessories",
    items: 186,
    image:
      "https://demo.7iquid.com/utero/wp-content/uploads/2023/09/accessories-cat.png",
    link: "https://demo.7iquid.com/utero/product-category/accessories/",
  },
];
const Category = () => {
  return (
    <div className="category-wrapper">
      <div className="carousel-cate">
        {categories.map((cat) => (
          <div className="category-block" key={cat.name}>
            <a
              className="category-card"
              href={cat.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="image-container">
                <img src={cat.image} alt={cat.name} />
              </div>
            </a>
            <div className="text-info">
              <h3>{cat.name}</h3>
              <p>{cat.items} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
