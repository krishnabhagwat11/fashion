// Helper to produce correct asset URL regardless of current page depth
function getAssetPath(relativePath) {
    try {
        const inPagesDir = window.location && window.location.pathname.toLowerCase().includes('/pages/');
        const cleaned = String(relativePath || '').replace(/^\.?\/+/, '');
        const full = (inPagesDir ? '../' : '') + cleaned;
        return encodeURI(full);
    } catch (e) {
        // Fallback if window is unavailable
        return relativePath;
    }
}


// Global function to render products on category pages
function renderProducts(productList, container) {
    if (!container || !productList || productList.length === 0) {
        container.innerHTML = '<p>No products found in this category.</p>';
        return;
    }

    container.innerHTML = productList.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${getAssetPath(product.image)}" alt="${product.title}" class="product-image" loading="lazy">
                ${product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
            </div>
            <div class="product-info">
                <div class="brand-name">${product.brand}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="price-section">
                    <span class="current-price">Rs. ${product.currentPrice}</span>
                    ${product.originalPrice > product.currentPrice ? `<span class="original-price">Rs. ${product.originalPrice}</span>` : ''}
                </div>
                <div class="rating-section">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="review-count">${product.reviews} reviews</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Helper function to generate star ratings
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<i class="fas fa-star star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt star"></i>';
        } else {
            starsHTML += '<i class="far fa-star star empty"></i>';
        }
    }
    
    return starsHTML;
}

// Product data using the provided images
const products = [
    {
        id: 1,
        title: "Embodied anarkali with full selves",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/a1.jpg",
        images: [
            "assets/listings images/part1/a1.jpg",
            "assets/listings images/part1/a2.jpg",
            "assets/listings images/part1/a3.jpg"
        ],
        currentPrice: 1399,
        originalPrice: 2199,
        discount: 36,
        rating: 4.5,
        reviews: 127,
        category: "saree",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 2,
        title: "Designer Kurti with Elegant Work",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/k1.jpg",
        images: [
            "assets/listings images/part1/k1.jpg",
            "assets/listings images/part1/k2.jpg",
            "assets/listings images/part1/k3.jpg"
        ],
        currentPrice: 1099,
        originalPrice: 2100,
        discount: 48,
        rating: 4.3,
        reviews: 89,
        category: "kurti",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 3,
        title: "Premium Silk Saree Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/s1.jpg",
        images: [
            "assets/listings images/part1/s1.jpg",
            "assets/listings images/part1/s2.jpg",
            "assets/listings images/part1/s3.jpg"
        ],
        currentPrice: 1249,
        originalPrice: 1999,
        discount: 38,
        rating: 4.6,
        reviews: 156,
        category: "saree",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 4,
        title: "Fancy Border Premium Lace Work Silk Saree",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/p1.jpg",
        images: [
            "assets/listings images/part1/p1.jpg",
            "assets/listings images/part1/p2.jpg",
            "assets/listings images/part1/p3.jpg"
        ],
        currentPrice: 1299,
        originalPrice: 2099,
        discount: 38,
        rating: 4.4,
        reviews: 98,
        category: "saree",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 5,
        title: "PURE SOFT FOX GEORGETTE MOST TRENDING ANARKALI SUIT",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/k1.jpg",
        images: [
            "assets/listings images/part1/k1.jpg",
            "assets/listings images/part1/k2.jpg",
            "assets/listings images/part1/k3.jpg"
        ],
        currentPrice: 1199,
        originalPrice: 1899,
        discount: 37,
        rating: 4.2,
        reviews: 74,
        category: "anarkali",
        isNew: false,
        isBestSelling: false
    },
    {
        id: 6,
        title: "Premium Anarkali Suit Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/lis4.jpg",
        images: [
            "assets/listings images/part1/lis4.jpg",
            "assets/listings images/part1/k2.jpg",
            "assets/listings images/part1/s1.jpg"
        ],
        currentPrice: 1249,
        originalPrice: 1999,
        discount: 38,
        rating: 4.5,
        reviews: 112,
        category: "anarkali",
        isNew: false,
        isBestSelling: false
    },
    {
        id: 7,
        title: "Pure Soft Romaqnsilk Chanderi With Designer Dupatta",
        brand: "Fashion Hub",
        image: "assets/lisitngs/IMG-20250607-WA0021.jpg",
        currentPrice: 1449,
        originalPrice: 2299,
        discount: 37,
        rating: 4.7,
        reviews: 189,
        category: "suit",
        isNew: false,
        isBestSelling: false
    },
    {
        id: 8,
        title: "Premium Designer Anarkali Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/aa2.jpg",
        images: [
            "assets/listings images/part2/aa2.jpg",
            "assets/listings images/part2/aa3.jpg",
            
        ],
        currentPrice: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.4,
        reviews: 156,
        category: "anarkali",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 9,
        title: "Wedding Special Heavy Embroidered Saree",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/lis1.jpg",
        images: [
            "assets/listings images/part1/lis1.jpg",
            "assets/listings images/part1/lis2.jpg",
            "assets/listings images/part1/lis3.jpg"
        ],
        currentPrice: 2499,
        originalPrice: 3999,
        discount: 38,
        rating: 4.8,
        reviews: 234,
        category: "saree",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 10,
        title: "Elegant Silk Saree Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/bb1.jpg",
        images: [
            "assets/listings images/part2/bb1.jpg",
            "assets/listings images/part2/bb2.jpg",
            "assets/listings images/part2/bb3.jpg"
        ],
        currentPrice: 1799,
        originalPrice: 2799,
        discount: 36,
        rating: 4.6,
        reviews: 198,
        category: "saree",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 11,
        title: "Designer Kurti Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/cc1.jpg",
        images: [
            "assets/listings images/part2/cc1.jpg",
            "assets/listings images/part2/cc2.jpg",
            "assets/listings images/part2/cc3.jpg"
        ],
        currentPrice: 999,
        originalPrice: 1599,
        discount: 38,
        rating: 4.3,
        reviews: 145,
        category: "kurti",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 12,
        title: "Designer Lehenga Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part1/l1.jpg",
        images: [
            "assets/listings images/part1/l1.jpg",
            "assets/listings images/part1/l2.jpg",
            "assets/listings images/part1/l3.jpg"
        ],
        currentPrice: 1899,
        originalPrice: 2999,
        discount: 37,
        rating: 4.5,
        reviews: 167,
        category: "lehenga",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 13,
        title: "PURE SOFT LIGHTWEIGHT GEORGETTE ANARKALI GOWN",
        brand: "Fashion Hub",
        image: "assets/lisitngs/IMG-20250607-WA0022.jpg",
        currentPrice: 1199,
        originalPrice: 1899,
        discount: 37,
        rating: 4.3,
        reviews: 67,
        category: "gown",
        isNew: false,
        isBestSelling: false
    },
    {
        id: 19,
        title: "Elegant Designer Silk Lehenga with Heavy Embroidery",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/dd1.jpg",
        images: [
            "assets/listings images/part2/dd1.jpg",
            "assets/listings images/part2/dd2.jpg",
            "assets/listings images/part2/dd3.jpg"
        ],
        currentPrice: 1599,
        originalPrice: 2499,
        discount: 36,
        rating: 4.8,
        reviews: 234,
        category: "lehenga",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 20,
        title: "Premium Gown Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/ee1.jpg",
        images: [
            "assets/listings images/part2/ee1.jpg",
            "assets/listings images/part2/ee2.jpg",
            "assets/listings images/part2/ee3.jpg"
        ],
        currentPrice: 1799,
        originalPrice: 2899,
        discount: 38,
        rating: 4.6,
        reviews: 167,
        category: "gown",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 21,
        title: "Traditional Embroidered Anarkali Dress",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/ff1.jpg",
        images: [
            "assets/listings images/part2/ff1.jpg",
            "assets/listings images/part2/ff2.jpg",
            "assets/listings images/part2/ff3.jpg"
        ],
        currentPrice: 1349,
        originalPrice: 2199,
        discount: 39,
        rating: 4.4,
        reviews: 92,
        category: "anarkali",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 22,
        title: "Elegant Party Wear Gown Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/gg1.jpg",
        images: [
            "assets/listings images/part2/gg1.jpg",
            "assets/listings images/part2/gg2.jpg",
            "assets/listings images/part2/gg3.jpg"
        ],
        currentPrice: 1399,
        originalPrice: 2299,
        discount: 39,
        rating: 4.5,
        reviews: 118,
        category: "gown",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 23,
        title: "Designer Saree Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/hh1.JPG",
        images: [
            "assets/listings images/part2/hh1.JPG",
            "assets/listings images/part2/hh2.jpg",

        ],
        currentPrice: 1499,
        originalPrice: 2399,
        discount: 38,
        rating: 4.7,
        reviews: 145,
        category: "saree",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 24,
        title: "Special Designer Dress Collection",
        brand: "Fashion Hub",
        image: "assets/listings images/part2/ii1.JPG",
        images: [
            "assets/listings images/part2/ii1.JPG",
        
        ],
        currentPrice: 1099,
        originalPrice: 1799,
        discount: 39,
        rating: 4.2,
        reviews: 76,
        category: "dress",
        isNew: true,
        isBestSelling: false
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const bestSellingProducts = document.getElementById('best-selling-products');
const newArrivalsProducts = document.getElementById('new-arrivals-products');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    initializeSlider();
    setupEventListeners();
    injectPromoBanner();
    
    // Auto-load products for category pages
    autoLoadCategoryProducts();
});

// Close banner functionality
function closeBanner() {
    const banner = document.querySelector('.top-banner');
    banner.style.display = 'none';
}

// Function to automatically load products on category pages
function autoLoadCategoryProducts() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage.includes('saree') || currentPage.includes('lehenga') || 
        currentPage.includes('gown') || currentPage.includes('kurti') || 
        currentPage.includes('anarkali')) {
        
        let categoryProducts = [];
        let containerId = 'products-grid';
        
        // Determine category and container
        if (currentPage.includes('ready-to-wear-saree')) {
            categoryProducts = products.filter(product => 
                product.category === 'saree' && product.title.toLowerCase().includes('ready')
            );
            containerId = 'ready-wear-saree-products';
        } else if (currentPage.includes('wedding-saree')) {
            categoryProducts = products.filter(product => 
                product.category === 'saree' && product.title.toLowerCase().includes('wedding')
            );
            containerId = 'wedding-saree-products';
        } else if (currentPage.includes('bollywood-saree')) {
            categoryProducts = products.filter(product => 
                product.category === 'saree' && product.title.toLowerCase().includes('bollywood')
            );
            containerId = 'bollywood-saree-products';
        } else if (currentPage.includes('one-minute-saree')) {
            categoryProducts = products.filter(product => 
                product.category === 'saree' && product.title.toLowerCase().includes('one minute')
            );
            containerId = 'one-minute-saree-products';
        } else if (currentPage.includes('party-wear-saree')) {
            categoryProducts = products.filter(product => 
                product.category === 'saree' && product.title.toLowerCase().includes('party')
            );
            containerId = 'party-wear-saree-products';
        } else if (currentPage.includes('lehenga')) {
            categoryProducts = products.filter(product => product.category === 'lehenga');
            containerId = 'lehenga-products';
        } else if (currentPage.includes('gown')) {
            categoryProducts = products.filter(product => product.category === 'gown');
            containerId = 'gown-products';
        } else if (currentPage.includes('kurti')) {
            categoryProducts = products.filter(product => product.category === 'kurti');
            containerId = 'kurti-products';
        } else if (currentPage.includes('anarkali')) {
            categoryProducts = products.filter(product => product.category === 'anarkali');
            containerId = 'anarkali-products';
        }
        
        // Try to find the container
        let container = document.getElementById(containerId) || document.getElementById('products-grid');
        
        if (container && categoryProducts.length > 0) {
            renderProducts(categoryProducts, container);
        }
    }
}

// Product loading functions
function loadProducts() {
    loadBestSellingProducts();
    loadNewArrivals();
}

function loadBestSellingProducts() {
    const bestSelling = products.filter(product => product.isBestSelling);
    renderProducts(bestSelling, bestSellingProducts);
}

function loadNewArrivals() {
    const newArrivals = products.filter(product => product.isNew);
    renderProducts(newArrivals, newArrivalsProducts);
}

function renderProducts(productList, container) {
    container.innerHTML = '';
    
    productList.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discountBadge = product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : '';
    const originalPrice = product.originalPrice ? `<span class="original-price">Rs. ${product.originalPrice}</span>` : '';
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${getAssetPath(product.image)}" alt="${product.title}" class="product-image" loading="lazy">
            ${discountBadge}
        </div>
        <div class="product-info">
            <div class="brand-name">${product.brand}</div>
            <h3 class="product-title">${product.title}</h3>
            <div class="price-section">
                <span class="current-price">Rs. ${product.currentPrice}</span>
                ${originalPrice}
            </div>
            <div class="rating-section">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="review-count">${product.reviews} reviews</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add click event to navigate to product detail
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            window.location.href = `pages/product-detail.html?id=${product.id}`;
        }
    });
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star star empty"></i>';
    }
    
    return starsHTML;
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            image: getAssetPath(product.image),
            price: product.currentPrice,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Update cart total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = totalPrice;
    const currencyElement = document.querySelector('.currency');
    if (currencyElement) currencyElement.textContent = `Rs. ${totalPrice}`;
    
    // Update cart items
    renderCartItems();
    
    // Update mobile cart count
    updateMobileCartCount();
}

function renderCartItems() {
    if (!cartItems) return; // Safety check
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="text-center">Your cart is empty</div>';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">Rs. ${item.price}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="quantity" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function toggleCart() {
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

// WhatsApp functionality
function sendWhatsAppEnquiry() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = 'Hello! I am interested in the following products from Fashion Hub:\n\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.title}\n`;
        message += `   Price: Rs. ${item.price}\n`;
        message += `   Quantity: ${item.quantity}\n\n`;
    });
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total Amount: Rs. ${totalPrice}\n\n`;
    message += 'Please provide more details about availability and delivery.';
    
    const phoneNumber = '919898005546';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// WhatsApp enquiry for single product (from product cards)
function sendProductWhatsAppEnquiry(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    let message = `Hello! I am interested in the following product from Fashion Hub:\n\n`;
    message += `${product.title}\n`;
    message += `Price: Rs. ${product.currentPrice}\n`;
    message += `Category: ${product.category}\n\n`;
    message += 'Please provide more details about availability and delivery.';
    
    const phoneNumber = '919898005546';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}


// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showNotification('Added to wishlist');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    const wishlistCount = document.querySelector('.wishlist-btn .badge');
    wishlistCount.textContent = wishlist.length;
}

// Inject promo banner above footer on every page
function injectPromoBanner() {
    const footer = document.querySelector('footer.footer');
    if (!footer) return;

    // Prevent duplicate injection
    if (document.querySelector('.promo-banner')) return;

    const bannerWrapper = document.createElement('section');
    bannerWrapper.className = 'promo-banner';

    const bannerInner = document.createElement('div');
    bannerInner.className = 'promo-banner-inner';
    bannerInner.style.backgroundImage = `url('${getAssetPath('assets/images/Screenshot 2025-09-02 114712.png')}')`;

    bannerWrapper.appendChild(bannerInner);
    footer.parentNode.insertBefore(bannerWrapper, footer);
}




// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function initializeSlider() {
    setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
}

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function previousSlide() {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(slideIndex) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = slideIndex;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Event listeners
function setupEventListeners() {
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    

    
    // Collection cards
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent.toLowerCase();
            filterProducts(category);
        });
    });
    
    // Search functionality
    document.querySelector('.search-btn').addEventListener('click', toggleSearch);
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartSidebar.contains(e.target) && !e.target.closest('.cart-btn')) {
            cartSidebar.classList.remove('open');
        }
    });
    
    // Initialize wishlist UI
    updateWishlistUI();
}

function toggleSearch() {
    // Simple search implementation
    const searchTerm = prompt('Enter search term:');
    if (searchTerm) {
        searchProducts(searchTerm);
    }
}

function searchProducts(term) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    if (filteredProducts.length > 0) {
        renderProducts(filteredProducts, bestSellingProducts);
        newArrivalsProducts.innerHTML = '';
        showNotification(`Found ${filteredProducts.length} products`);
    } else {
        showNotification('No products found');
    }
}

function filterProducts(category) {
    const filteredProducts = products.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase()) ||
        product.title.toLowerCase().includes(category.toLowerCase())
    );
    
    if (filteredProducts.length > 0) {
        renderProducts(filteredProducts, bestSellingProducts);
        newArrivalsProducts.innerHTML = '';
        showNotification(`Showing ${category} products`);
    }
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 4000;
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        const styleSheet = document.createElement('style');
        styleSheet.setAttribute('data-notification', 'true');
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('mobile-nav-open');
    }
}

// Update Mobile Cart Count
function updateMobileCartCount() {
    const mobileCartCount = document.getElementById('mobile-cart-count');
    if (mobileCartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        mobileCartCount.textContent = totalItems;
        
        // Show/hide badge based on count
        if (totalItems > 0) {
            mobileCartCount.style.display = 'flex';
        } else {
            mobileCartCount.style.display = 'none';
        }
    }
}

// Mobile Features Initialization
function initializeMobileFeatures() {
    // Update mobile cart count
    updateMobileCartCount();
    
    // Initialize mobile navigation
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Setup mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
}
