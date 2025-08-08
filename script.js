const products = [
  {
    name: "Running Shoes",
    price: 90,
    category: "Shoes",
    description: "Lightweight running shoes for daily running.",
    rating: 4.5
  },
  {
    name: "Basketball Shoes",
    price: 120,
    category: "Shoes",
    description: "High-top shoes designed for basketball.",
    rating: 4.2
  },
  {
    name: "Smart Watch",
    price: 150,
    category: "Electronics",
    description: "Fitness tracking and notifications.",
    rating: 4.7
  },
  {
    name: "Wireless Headphones",
    price: 80,
    category: "Electronics",
    description: "Noise-cancelling over-ear headphones.",
    rating: 4.3
  },
  {
    name: "Cotton T-Shirt",
    price: 20,
    category: "Clothing",
    description: "Comfortable cotton t-shirt in various colors.",
    rating: 4.0
  },
  {
    name: "Jeans",
    price: 50,
    category: "Clothing",
    description: "Stylish denim jeans with a slim fit.",
    rating: 4.1
  },
  {
    name: "Backpack",
    price: 60,
    category: "Accessories",
    description: "Durable backpack with multiple compartments.",
    rating: 4.4
  },
  {
    name: "Sunglasses",
    price: 35,
    category: "Accessories",
    description: "UV protection sunglasses with stylish design.",
    rating: 4.2
  }
];


function displayProducts(productArray) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  productArray.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Category: ${product.category}</p>
      <p class="product-price">$${product.price}</p>
      <p class="product-rating">Rating: ${product.rating} ⭐️</p>
    `;
    productList.appendChild(card);
  });
}


function displayRecommendations(selectedCategory, selectedMaxPrice, selectedMinRating) {
  const recommendationList = document.getElementById('recommendationList');
  recommendationList.innerHTML = ''; 

  const recommended = products.filter(product => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const priceMatch = selectedMaxPrice !== Infinity ? product.price <= selectedMaxPrice : true;
    const ratingMatch = product.rating >= (selectedMinRating || 0);
    return categoryMatch && priceMatch && ratingMatch;
  });

  const topRecommended = recommended.slice(0, 5);

  if (topRecommended.length === 0) {
    recommendationList.innerHTML = '<p style="text-align:center; color:#888;">No recommended products found.</p>';
    return;
  }

  topRecommended.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p class="product-rating">Rating: ${product.rating} ⭐️</p>
      <p class="product-price">$${product.price}</p>
    `;
    recommendationList.appendChild(card);
  });
}


window.onload = () => {
  displayProducts(products);
  displayRecommendations('', Infinity, 0);
};

const filterBtn = document.getElementById('filterBtn');

filterBtn.addEventListener('click', () => {
  const selectedCategory = document.getElementById('category').value;
  const maxPriceInput = document.getElementById('maxPrice').value;
  const selectedMinRating = parseFloat(document.getElementById('minRating').value);

  const maxPrice = maxPriceInput ? parseFloat(maxPriceInput) : Infinity;

  const filtered = products.filter(product => {
    const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
    const priceMatch = product.price <= maxPrice;
    const ratingMatch = product.rating >= selectedMinRating;

    return categoryMatch && priceMatch && ratingMatch;
  });

  displayProducts(filtered);
  displayRecommendations(selectedCategory, maxPrice, selectedMinRating);
});
