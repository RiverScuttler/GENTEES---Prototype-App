
// Screen Navigation
function switchScreen(screenId, navItem) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Remove active from all nav isssstems
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Show selected screen
  document.getElementById(screenId).classList.add('active');
  navItem.classList.add('active');

  const container = document.querySelector('.device-screen');
  if (container) {
    container.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Quick custom design access
function showCustomDesign() {
  switchScreen('customScreen', document.querySelectorAll('.nav-item')[1]);
}

// Category pills interaction
document.querySelectorAll('.category-pill').forEach(pill => {
  pill.addEventListener('click', function () {
    document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
  });
});

// --- ADD TO CART FUNCTION ---
document.querySelectorAll('.product-favorite').forEach(favIcon => {
  favIcon.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevents opening product details alert
    vibrate(15);

    //  Visual Toggle (Heart turns red)
    this.textContent = this.textContent === '🤍' ? '❤️' : '🤍';

    //  Get Product Data from the parent .product-card
    const card = this.closest('.product-card');
    const productData = {
      id: parseInt(card.getAttribute('data-id')),
      name: card.getAttribute('data-name'),
      price: parseInt(card.getAttribute('data-price')),
      imgClass: card.getAttribute('data-img'), // This matches your CSS cart-image classes
      qty: 1
    };

    //  Logic: Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === productData.id);

    if (existingItemIndex > -1) {
      // If it exists, just increase quantity
      cart[existingItemIndex].qty += 1;
    } else {
      // If new, push to cart array
      cart.push(productData);
    }

    //  Refresh the UI
    renderCart();

    // Optional: Show a small toast or confirmation
    console.log(`${productData.name} added to cart!`);
  });
});

// Product card click
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function () {
    alert('Product details would open here! Add to cart, view images, sizes, etc.');
  });
});

// Cart quantity controls
document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const qtySpan = this.parentElement.querySelector('span');
    let qty = parseInt(qtySpan.textContent);

    if (this.textContent === '+') {
      qty++;
    } else if (this.textContent === '−' && qty > 1) {
      qty--;
    }

    qtySpan.textContent = qty;
  });
});

// Checkout button
document.querySelector('.checkout-btn')?.addEventListener('click', function () {
  alert('Proceeding to checkout! Payment & shipping details would be collected here.');
});

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const arrow = document.getElementById('drawerArrow');

  if (!drawer) return;

  drawer.classList.toggle('collapsed');

  // Rotate arrow manually if CSS transition is finicky
  if (drawer.classList.contains('collapsed')) {
    arrow.style.transform = 'rotate(0deg)';
  } else {
    arrow.style.transform = 'rotate(180deg)';
  }

  vibrate(); // Your existing haptic function
}

// Menu items
document.querySelectorAll('.menu-item').forEach(item => {
   item.addEventListener('click', function () {
      // If this is the logout button, don't show the generic alert
      if (this.id === 'logoutBtn') return; 

      const text = this.querySelector('.menu-text').textContent;
      alert(`Opening ${text}...`);
   });
});

// Search bar
document.querySelector('.search-bar')?.addEventListener('focus', function () {
  this.style.borderColor = 'var(--accent-gold)';
});

document.querySelector('.search-bar')?.addEventListener('blur', function () {
  this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
});

// Notification and message buttons
document.querySelectorAll('.icon-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const emoji = this.textContent;
    if (emoji === '🔔') {
      alert('Notifications:\n• New spring collection available!\n• Your custom design is ready\n• Flash sale starts in 2 hours');
    } else if (emoji === '💬') {
      alert('Messages:\n• Support team replied to your inquiry\n• Designer shared inspiration for your custom piece');
    }
  });
});

// Add haptic feedback simulation
function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
}

document.querySelectorAll('.product-card, .nav-item, .menu-item, .category-pill').forEach(el => {
  el.addEventListener('click', vibrate);
});


// --- CART STATE ---
let cart = [
  { id: 1, name: '"The Recon" Utility Cargo Skirt', price: 950, qty: 1, imgClass: 'cart-image1' },
  { id: 2, name: '"Rough-Cut" Classic Denim Jacket', price: 1450, qty: 2, imgClass: 'cart-image2' },
  { id: 3, name: 'Athletics Varsity Jacket', price: 1250, qty: 1, imgClass: 'cart-image3' }
];

const SHIPPING_FEE = 60;

// --- DYNAMIC RENDERER ---
function renderCart() {
  const cartContainer = document.querySelector('.cart-items');
  const badge = document.querySelector('.nav-badge');
  let subtotal = 0;

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <div style="text-align:center; padding:50px; color:var(--text-secondary);">
                <p style="font-size:40px;">🛍️</p>
                <p>Your cart is empty.<br>Favorite an item to add it!</p>
            </div>`;
    // Reset totals to 0
    document.querySelector('.total-row span:last-child').textContent = `₱0`;
    document.querySelector('.total-row.final span:last-child').textContent = `₱0`;
    return;
  }

  //  Generate HTML for items
  cartContainer.innerHTML = cart.map((item, index) => {
    subtotal += item.price * item.qty;
    return `
            <div class="cart-item">
                <div class="${item.imgClass}"></div>
                <div class="cart-details">
                    <div class="cart-name">${item.name}</div>
                    <div class="cart-actions">
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="updateQty(${index}, -1)">−</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                        </div>
                        <span class="price">₱${(item.price * item.qty).toLocaleString()}</span>
                    </div>
                </div>
            </div>`;
  }).join('');

  //  Update Totals in Drawer
  const total = subtotal + (cart.length > 0 ? SHIPPING_FEE : 0);
  document.querySelector('.total-row span:last-child').textContent = `₱${subtotal.toLocaleString()}`;
  document.querySelector('.total-row.final span:last-child').textContent = `₱${total.toLocaleString()}`;

  //  Update Nav Badge
  if (badge) badge.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
}

// --- ACTIONS ---
window.updateQty = (index, delta) => {
  vibrate(5);
  cart[index].qty += delta;

  // Delete item if qty reaches 0
  if (cart[index].qty < 1) {
    cart.splice(index, 1);
  }

  renderCart();
};

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

// --- LOGOUT LOGIC ---
document.getElementById('logoutBtn')?.addEventListener('click', function (e) {
  e.stopPropagation();

  vibrate(15);

  //  Show Confirmation Dialog
  const confirmLogout = confirm("Are you sure you want to log out of GEN TEES?");

  if (confirmLogout) {
    //  Visual Feedback
    this.style.opacity = "0.5";
    this.querySelector('.menu-text').textContent = "Logging out...";

    setTimeout(() => {
      window.location.href = './login.html';
    }, 800);
  }
});


