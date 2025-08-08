// Product data using the provided images
const products = [
    {
        id: 1,
        title: "Beautiful Designer Wedding Special Velvet Saree",
        brand: "Fashion Hub",
        image: "lisitngs/IMG_20250715_093634_0932.jpg",
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
        title: "Elegant Designer Printed Gown",
        brand: "Fashion Hub",
        image: "lisitngs/IMG_20250715_093657_0638.JPG",
        currentPrice: 1099,
        originalPrice: 2100,
        discount: 48,
        rating: 4.3,
        reviews: 89,
        category: "gown",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 3,
        title: "Elegant Heavy Fancy Silk Gown Set With Embroidered Dupatta",
        brand: "Fashion Hub",
        image: "lisitngs/IMG_20250715_093720_0783.JPG",
        currentPrice: 1249,
        originalPrice: 1999,
        discount: 38,
        rating: 4.6,
        reviews: 156,
        category: "gown",
        isNew: false,
        isBestSelling: true
    },
    {
        id: 4,
        title: "Fancy Border Premium Lace Work Silk Saree",
        brand: "Fashion Hub",
        image: "lisitngs/IMG_20250715_093744_0002.JPG",
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
        image: "lisitngs/IMG_20250715_093755_0995.jpg",
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
        title: "Hug Demanded Cassata Work Anarakali Suit With Dupatta",
        brand: "Fashion Hub",
        image: "lisitngs/IMG_20250715_093810_0693.jpg",
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
        image: "lisitngs/IMG-20250607-WA0021.jpg",
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
        title: "PURE SOFT LIGHTWEIGHT GEORGETTE ANARKALI GOWN",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250607-WA0022.jpg",
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
        id: 9,
        title: "Elegant Designer Silk Lehenga with Heavy Embroidery",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250607-WA0024.jpg",
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
        id: 10,
        title: "Premium Designer Wedding Lehenga Set",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250607-WA0025.jpg",
        currentPrice: 1799,
        originalPrice: 2899,
        discount: 38,
        rating: 4.6,
        reviews: 167,
        category: "lehenga",
        isNew: true,
        isBestSelling: false
    },
    {
        id: 11,
        title: "Traditional Embroidered Anarkali Dress",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250609-WA0004.jpg",
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
        id: 12,
        title: "Designer Party Wear Gown with Dupatta",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250628-WA0030.jpg",
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
        id: 13,
        title: "Luxury Silk Saree with Golden Border",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250628-WA0041.jpg",
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
        id: 14,
        title: "Elegant Designer Kurti Set with Palazzo",
        brand: "Fashion Hub",
        image: "lisitngs/IMG-20250628-WA0065.jpg",
        currentPrice: 1099,
        originalPrice: 1799,
        discount: 39,
        rating: 4.2,
        reviews: 76,
        category: "kurti",
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
});

// Close banner functionality
function closeBanner() {
    const banner = document.querySelector('.top-banner');
    banner.style.display = 'none';
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
    card.className = 'product-card fade-in-up';
    
    const discountBadge = product.discount ? `<div class="discount-badge">-${product.discount}%</div>` : '';
    const originalPrice = product.originalPrice ? `<span class="original-price">Rs. ${product.originalPrice}</span>` : '';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            ${discountBadge}
            <div class="product-actions">
                <button class="action-btn" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">
                <span class="current-price">Rs. ${product.currentPrice}</span>
                ${originalPrice}
            </div>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">${product.reviews} reviews</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
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
            image: product.image,
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
    cartCount.textContent = totalItems;
    
    // Update cart total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = totalPrice;
    document.querySelector('.currency').textContent = `Rs. ${totalPrice}`;
    
    // Update cart items
    renderCartItems();
}

function renderCartItems() {
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
    cartSidebar.classList.toggle('open');
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
    
    const phoneNumber = '917202035510';
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

// Quick view functionality
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create modal for quick view
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="quick-view-info">
                    <h2>${product.title}</h2>
                    <div class="price">
                        <span class="current-price">Rs. ${product.currentPrice}</span>
                        ${product.originalPrice ? `<span class="original-price">Rs. ${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${generateStars(product.rating)} (${product.reviews} reviews)
                    </div>
                    <div class="actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id}); closeModal();">
                            Add to Cart
                        </button>
                        <button class="whatsapp-enquiry" onclick="sendSingleProductEnquiry(${product.id})">
                            <i class="fab fa-whatsapp"></i> Enquire on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .modal {
            display: block;
            position: fixed;
            z-index: 3000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        
        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            position: relative;
        }
        
        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
            z-index: 3001;
        }
        
        .close:hover {
            color: black;
        }
        
        .quick-view-content {
            display: flex;
            gap: 40px;
            padding: 40px;
        }
        
        .quick-view-image {
            flex: 1;
        }
        
        .quick-view-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 10px;
        }
        
        .quick-view-info {
            flex: 1;
        }
        
        .quick-view-info h2 {
            margin-bottom: 20px;
            font-size: 24px;
        }
        
        .quick-view-info .price {
            margin-bottom: 20px;
        }
        
        .quick-view-info .current-price {
            font-size: 24px;
            font-weight: 600;
            color: #e91e63;
            margin-right: 15px;
        }
        
        .quick-view-info .original-price {
            font-size: 18px;
            text-decoration: line-through;
            color: #999;
        }
        
        .quick-view-info .rating {
            margin-bottom: 30px;
            color: #ffc107;
        }
        
        .quick-view-info .actions {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .quick-view-info .actions button {
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .quick-view-info .add-to-cart {
            background: #333;
            color: white;
        }
        
        .quick-view-info .add-to-cart:hover {
            background: #e91e63;
        }
        
        .quick-view-info .whatsapp-enquiry {
            background: #25D366;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .quick-view-info .whatsapp-enquiry:hover {
            background: #128C7E;
        }
        
        @media (max-width: 768px) {
            .quick-view-content {
                flex-direction: column;
                padding: 20px;
            }
            
            .modal-content {
                margin: 10% auto;
                width: 95%;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function sendSingleProductEnquiry(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `Hello! I am interested in this product from Fashion Hub:

${product.title}
Price: Rs. ${product.currentPrice}

Please provide more details about availability, sizes, and delivery options.`;
    
    const phoneNumber = '917202035510';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
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
