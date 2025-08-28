 const items = [
  { name: "Home made pizza", price: "₹100", image: "Images/WhatsApp Image 2025-05-12 at 11.29.02 PM.jpeg" },
  { name: "Home made pizza", price: "₹120", image: "Images/WhatsApp Image 2025-05-12 at 11.29.04 PM.jpeg" },
  { name: "Home made pizza", price: "₹130", image: "Images/WhatsApp Image 2025-05-12 at 11.29.06 PM.jpeg" },
  { name: "Home made pizza", price: "₹100", image: "Images/pizza4.png" },
  { name: "Home made pizza", price: "₹119", image: "Images/WhatsApp Image 2025-05-12 at 11.29.08 PM (1).jpeg" },
  { name: "Home made pizza", price: "₹110", image: "Images/WhatsApp Image 2025-05-12 at 11.29.09 PM (1).jpeg" },
  { name: "Home made pizza", price: "₹100", image: "Images/WhatsApp Image 2025-05-12 at 11.29.30 PM.jpeg" },
  { name: "Home made pizza", price: "₹120", image: "Images/WhatsApp Image 2025-05-12 at 11.29.39 PM.jpeg" },
  { name: "Home made pizza", price: "₹130", image: "Images/WhatsApp Image 2025-05-12 at 11.29.41 PM.jpeg" },
  { name: "Home made pizza", price: "₹100", image: "Images/WhatsApp Image 2025-05-12 at 11.30.05 PM.jpeg" },
  { name: "Home made pizza", price: "₹119", image: "Images/WhatsApp Image 2025-05-12 at 11.30.08 PM.jpeg" },
  { name: "Home made pizza", price: "₹110", image: "Images/WhatsApp Image 2025-05-12 at 11.31.54 PM.jpeg" }
];

const popularItems = [
  { name: "Home made pizza", price: "₹99", image: "Images/pizza3.jpg" },
  { name: "Tandoori Chicken", price: "₹140", image: "Images/tandoori chicken.jpeg" },
  { name: "Chili Chicken", price: "₹116", image: "Images/chillichicken.jpg" },
  { name: "Rajma Chawal", price: "₹80", image: "Images/rajmachawal.jpeg" },
  { name: "Paneer Tikka", price: "₹130", image: "Images/pannertikka.jpeg" },
  { name: "Paratha Combo", price: "₹90", image: "Images/paratha.png" },
  { name: "Veg Biryani", price: "₹110", image: "Images/veg briyani.jpeg" }
];

function renderItems(itemsArray, container) {
  itemsArray.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:10px;">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
        <div class="rating">
          ${'<i class="fas fa-star"></i>'.repeat(4)}<i class="far fa-star"></i>
        </div>
        <div class="add-container">
          <button class="add-to-cart"><i class="fas fa-plus"></i></button>
          <button class="rate-item"><i class="fas fa-star"></i> Rate</button>
        </div>
      </div>
    `;

   card.querySelector('.add-to-cart').addEventListener('click', () => {
  fetch('http://localhost:3000/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: item.name,
      price: item.price,
      image: item.image
    })
  })
  
  .catch(err => {
    console.error('Add to cart error:', err);
    alert('Failed to add item to cart');
  });
});

card.querySelector('.rate-item').addEventListener('click', () => {
  const rating = prompt(`Rate "${item.name}" from 1 to 5 stars:`);

  if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
    alert('Please enter a valid number between 1 and 5.');
    return;
  }

  fetch('http://localhost:3000/api/rate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: item.name,
      rating: parseInt(rating)
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  })
  .catch(err => {
    console.error('Rating error:', err);
    alert('Failed to submit rating');
  });
});


    container.appendChild(card);
  });
}

// Render menu items
const menuGrid = document.getElementById('menu-grid');
renderItems(items, menuGrid);

// Render popular items
const popularTrack = document.getElementById('popularTrack');
renderItems(popularItems, popularTrack);

// Scroll buttons
document.getElementById('nextPopularBtn').addEventListener('click', () => {
  popularTrack.scrollBy({ left: 260, behavior: 'smooth' });
});

document.getElementById('prevPopularBtn').addEventListener('click', () => {
  popularTrack.scrollBy({ left: -260, behavior: 'smooth' });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;

  fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    this.reset();
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Failed to submit contact form');
  });
});



// Icons
document.getElementById('search-icon').addEventListener('click', () => {
  alert('Search feature will be available soon!');
});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("requestModal");
  const openBtn = document.getElementById("popular-request-btn");
  const closeBtn = document.querySelector("#requestModal .close");
  const form = document.getElementById("request-form");

  if (modal && openBtn && closeBtn && form) {
    // Open modal on button click
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your request has been submitted.");
      form.reset();
      modal.style.display = "none";
    });
  }
});
const video = document.getElementById("promoVideo");
const playIcon = document.getElementById("playIcon");

if (video && playIcon) {
  // Show icon when paused
  video.addEventListener("pause", () => {
    playIcon.style.display = "block";
  });

  // Hide icon when playing
  video.addEventListener("play", () => {
    playIcon.style.display = "none";
  });

  // Play video on icon click
  playIcon.addEventListener("click", () => {
    video.play();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("requestModal");
  const openBtn = document.getElementById("popular-request-btn");
  const closeBtn = document.querySelector("#requestModal .close");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("request-form");

  if (modal && openBtn && closeBtn && form) {
    // Open modal on button click
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal on Cancel button click
    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your request has been submitted.");
      form.reset();
      modal.style.display = "none";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("requestModal");
  const openBtn = document.getElementById("popular-request-btn");
  const closeBtn = document.querySelector("#requestModal .close");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("request-form");

  if (modal && openBtn && closeBtn && form) {
    // Open modal on button click
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Disable scroll
    });

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scroll
    });

    // Close modal on Cancel button click
    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scroll
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scroll
      }
    });

    // Handle form submission
   form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const request = form.querySelector('textarea').value;

  fetch('http://localhost:3000/api/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, request })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    form.reset();
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Failed to submit request');
  });
});

  }
});
// Cart logic
let cartItems = [];

document.querySelectorAll('.add-to-cart').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const item = items[index] || popularItems[index - items.length];
    cartItems.push(item);
    alert(`${item.name} added to cart.`);
  });
});

// Cart icon click - open modal with list
document.getElementById('cart-icon').addEventListener('click', () => {
  const cartModal = document.getElementById('cartModal');
  const cartList = document.getElementById('cartList');

  cartList.innerHTML = '';
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}`;
    cartList.appendChild(li);
  });

  cartModal.style.display = 'block';
});

// Close modal
document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cartModal').style.display = 'none';
});

// Submit order
document.getElementById('submitOrder').addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('Cart is empty.');
    return;
  }

  fetch('http://localhost:3000/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    cartItems = []; // clear cart
    document.getElementById('cartModal').style.display = 'none';
  })
  .catch(err => {
    console.error('Order error:', err);
    alert('Failed to place order.');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");

  if (closeCart && cartModal) {
    closeCart.addEventListener("click", () => {
      cartModal.style.display = "none";
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    });

    window.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        cartModal.style.display = "none";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
