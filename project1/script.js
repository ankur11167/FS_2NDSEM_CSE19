// Database Array containing targeted high-quality images (10 items total)
const products = [
    { 
        id: 1, 
        title: "Sony Bravia 55-Inch 4K Ultra HD Smart LED TV", 
        price: 54990, 
        rating: "⭐⭐⭐⭐★ 4.4", 
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500" 
    },
    { 
        id: 2, 
        title: "Premium Chronograph Minimalist Quartz Men's Watch", 
        price: 8499, 
        rating: "⭐⭐⭐⭐⭐ 4.6", 
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" 
    },
    { 
        id: 3, 
        title: "MacBook Pro 14-Inch M3 Chip (16GB Unified Memory, 512GB SSD)", 
        price: 169900, 
        rating: "⭐⭐⭐⭐⭐ 4.9", 
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" 
    },
    { 
        id: 4, 
        title: "Apple iPad Air 11-Inch (M2 Chip, Wi-Fi, 128GB) - Space Grey", 
        price: 59900, 
        rating: "⭐⭐⭐⭐★ 4.5", 
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" 
    },
    { 
        id: 5, 
        title: "Sony Alpha 7 IV Full-Frame Mirrorless Camera", 
        price: 214990, 
        rating: "⭐⭐⭐⭐⭐ 4.8", 
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500" 
    },
    { 
        id: 6, 
        title: "Marshall Stanmore III Wireless Home Bluetooth Speaker", 
        price: 31999, 
        rating: "⭐⭐⭐⭐★ 4.3", 
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500" 
    },
    { 
        id: 7, 
        title: "DJI Mini 4 Pro Fly More Combo - Drone Quadcopter", 
        price: 95000, 
        rating: "⭐⭐⭐⭐⭐ 4.7", 
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500" 
    },
    { 
        id: 8, 
        title: "Logitech G502 Hero High Performance Wired Gaming Mouse", 
        price: 4495, 
        rating: "⭐⭐⭐⭐★ 4.5", 
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" 
    },
    { 
        id: 9, 
        title: "Philips Multi-Grooming Tough Trimmer Series 7000", 
        price: 3299, 
        rating: "⭐⭐⭐⭐★ 4.2", 
        image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500" 
    },
    { 
        id: 10, 
        title: "Keychron K2 Wireless Mechanical Keyboard (Gateron Brown Switches)", 
        price: 7499, 
        rating: "⭐⭐⭐⭐⭐ 4.6", 
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" 
    }
];

// Memory state array
let cart = [];

// Loops through array and creates product blocks dynamically
function renderProducts(productsToDisplay) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; font-size: 16px; color: #555;">No products match your search.</p>`;
        return;
    }

    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div>
                <h4 class="product-title" title="${product.title}">${product.title}</h4>
                <div class="product-rating">${product.rating}</div>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// Basket quantity matching calculation hooks
function addToCart(productId) {
    const targetProduct = products.find(p => p.id === productId);
    const cartMatch = cart.find(item => item.id === productId);

    if (cartMatch) {
        cartMatch.quantity += 1;
    } else {
        cart.push({ ...targetProduct, quantity: 1 });
    }
    updateCartDOM();
}

// Sync counts and totals on the HTML frontend elements
function updateCartDOM() {
    const countBadge = document.getElementById('cart-count');
    const itemsListContainer = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('cartTotalAmount');

    const aggregateItems = cart.reduce((accum, item) => accum + item.quantity, 0);
    countBadge.innerText = aggregateItems;

    itemsListContainer.innerHTML = '';
    let runningBillTotal = 0;

    cart.forEach(item => {
        runningBillTotal += (item.price * item.quantity);
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <small>Qty: ${item.quantity} &times; ₹${item.price.toLocaleString('en-IN')}</small>
            </div>
            <strong style="color: #b12704">₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong>
        `;
        itemsListContainer.appendChild(itemRow);
    });

    totalDisplay.innerText = runningBillTotal.toLocaleString('en-IN');
}

// Side drawer toggles
function setDrawerVisibility(shouldDisplay) {
    const sidebar = document.getElementById('cartSidebar');
    if (shouldDisplay) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.remove('active');
    }
}

// Real-time keyword filter algorithm
function processCatalogSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const matches = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(matches);
}

// --- Wire Listeners ---
document.getElementById('productGrid').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

document.getElementById('searchBtn').addEventListener('click', processCatalogSearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processCatalogSearch();
});

document.getElementById('cartBtn').addEventListener('click', () => setDrawerVisibility(true));
document.getElementById('closeCartBtn').addEventListener('click', () => setDrawerVisibility(false));

document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your Amazon Cart is currently empty.");
        return;
    }
    alert("Order successfully processed via Amazon Core Simulator!");
    cart = [];
    updateCartDOM();
    setDrawerVisibility(false);
});

// App mount display execution loop
renderProducts(products);