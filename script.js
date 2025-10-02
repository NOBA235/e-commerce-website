  const products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Headphones", price: 2500 },
    { id: 3, name: "Shoes", price: 3000 },
    { id: 4, name: "T-shirt", price: 800 }
  ];

  const productList = document.getElementById("product-list");
  const cartBtn = document.getElementById("cart-btn");
  const cart = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cartData.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.name} x ${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
      `;
      cartItems.appendChild(div);
    });
    totalEl.innerText = total;
    localStorage.setItem("cart", JSON.stringify(cartData));
  }

 
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cartData.find(i => i.id === id);
    if (item) item.qty++;
    else cartData.push({ ...product, qty: 1 });
    renderCart();
  }

  
  function checkout() {
    if (cartData.length === 0) return alert("Cart is empty!");
    alert("Order placed successfully!");
    cartData = [];
    renderCart();
  }

 
  cartBtn.onclick = () => cart.classList.toggle("open");

  renderProducts();
  renderCart();