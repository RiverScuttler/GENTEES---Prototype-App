
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

   // Scroll to top
   window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Product favorite toggle
document.querySelectorAll('.product-favorite').forEach(fav => {
   fav.addEventListener('click', function (e) {
      e.stopPropagation();
      this.textContent = this.textContent === '🤍' ? '❤️' : '🤍';
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

// Menu items
document.querySelectorAll('.menu-item').forEach(item => {
   item.addEventListener('click', function () {
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



