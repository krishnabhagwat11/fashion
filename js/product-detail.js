// Product Detail Page JavaScript

// Get product ID from URL parameters
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load product details
function loadProductDetails() {
    const productId = getProductId();
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    // Find product in the products array
    const product = products.find(p => p.id == productId);
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.title = `${product.title} - Fashion Hub`;

    // Update breadcrumb
    document.getElementById('category-link').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('product-title-breadcrumb').textContent = product.title;

    // Update main product image
    const mainImgEl = document.getElementById('main-product-image');
    const primaryImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.image;
    mainImgEl.src = getAssetPath(primaryImage);
    document.getElementById('main-product-image').alt = product.title;

    // Update product title
    document.getElementById('product-title').textContent = product.title;

    // Update brand
    document.getElementById('product-brand').textContent = product.brand;

    // Update prices
    document.getElementById('current-price').textContent = `Rs. ${product.currentPrice}`;
    document.getElementById('original-price').textContent = `Rs. ${product.originalPrice}`;
    document.getElementById('discount-percentage').textContent = `${product.discount}% OFF`;

    // Update rating
    const ratingContainer = document.getElementById('product-rating');
    ratingContainer.innerHTML = generateStars(product.rating);

    // Update review count
    document.getElementById('review-count').textContent = `(${product.reviews} reviews)`;

    // Update discount badge
    const discountBadge = document.getElementById('discount-badge');
    if (product.discount > 0) {
        discountBadge.textContent = `-${product.discount}%`;
        discountBadge.style.display = 'block';
    } else {
        discountBadge.style.display = 'none';
    }

    // Update product description
    document.getElementById('product-description').textContent = generateProductDescription(product);

    // Thumbnails
    const thumbs = Array.isArray(product.images) ? product.images : [product.image];
    const thumbsContainer = document.getElementById('thumbnail-images');
    thumbsContainer.innerHTML = '';
    thumbs.forEach(src => {
        const img = document.createElement('img');
        img.src = getAssetPath(src);
        img.alt = product.title;
        img.className = 'thumbnail';
        img.addEventListener('click', () => {
            mainImgEl.src = getAssetPath(src);
        });
        thumbsContainer.appendChild(img);
    });

    // Load related products
    loadRelatedProducts(product);

    // Load cart data
    loadCart();
}

// Generate stars for rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Generate product description
function generateProductDescription(product) {
    return `Experience the elegance of this beautiful ${product.category} from Fashion Hub. This stunning piece features premium quality fabric with intricate detailing and perfect fit. Perfect for ${product.category === 'saree' ? 'weddings and special occasions' : product.category === 'lehenga' ? 'wedding ceremonies and celebrations' : 'parties and gatherings'}. Available in multiple sizes and colors.`;
}

// Load related products
function loadRelatedProducts(currentProduct) {
    const relatedProducts = products.filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || p.isBestSelling)
    ).slice(0, 3);

    const container = document.getElementById('related-products');
    container.innerHTML = '';

    relatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create product card for related products
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${getAssetPath(product.image)}" alt="${product.title}" class="product-image">
            ${product.discount > 0 ? `<div class="discount-badge">-${product.discount}%</div>` : ''}
        </div>
        <div class="product-info">
            <div class="brand-name">${product.brand}</div>
            <div class="product-title">${product.title}</div>
            <div class="price-section">
                <span class="current-price">Rs. ${product.currentPrice}</span>
                <span class="original-price">Rs. ${product.originalPrice}</span>
            </div>
            <div class="rating-section">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="review-count">${product.reviews} reviews</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCartFromCard(${product.id})">
                Add to Cart
            </button>
        </div>
    `;

    // Add click event to navigate to product detail
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            window.location.href = `product-detail.html?id=${product.id}`;
        }
    });

    return card;
}

// Quantity controls
function increaseQuantity() {
    const input = document.getElementById('quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue < 10) {
        input.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// Size selection
document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Add to cart functionality
function addToCart() {
    const productId = getProductId();
    const product = products.find(p => p.id == productId);
    const quantity = parseInt(document.getElementById('quantity-input').value);
    const selectedSize = document.querySelector('.size-btn.active').dataset.size;

    if (!product) return;

    const cartItem = {
        id: product.id,
        title: product.title,
        image: getAssetPath(product.image),
        price: product.currentPrice,
        quantity: quantity,
        size: selectedSize,
        total: product.currentPrice * quantity
    };

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        cart.push(cartItem);
    }

    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
    
    // Show success message
    showNotification('Product added to cart successfully!', 'success');
}

// Add to cart from related products
function addToCartFromCard(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const cartItem = {
        id: product.id,
        title: product.title,
        image: getAssetPath(product.image),
        price: product.currentPrice,
        quantity: 1,
        size: 'M', // Default size
        total: product.currentPrice
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
        cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Product added to cart successfully!', 'success');
}


// Add to wishlist
function addToWishlist() {
    const productId = getProductId();
    const product = products.find(p => p.id == productId);
    
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const existingItem = wishlist.find(item => item.id == product.id);
    if (!existingItem) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification('Product added to wishlist!', 'success');
    } else {
        showNotification('Product already in wishlist!', 'info');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load cart and update display
function loadCart() {
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.total, 0);

    // Update cart count
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('mobile-cart-count').textContent = cartCount;
    document.getElementById('cart-total').textContent = cartTotal;
    document.getElementById('cart-total-header').textContent = cartTotal;

    // Update cart items in sidebar
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>Size: ${item.size} | Qty: ${item.quantity}</p>
                    <p class="cart-item-price">Rs. ${item.total}</p>
                </div>
                <button class="remove-cart-item" onclick="removeFromCart(${item.id}, '${item.size}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
}

// Remove from cart
function removeFromCart(productId, size) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id == productId && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Product removed from cart!', 'success');
}

// Proceed to checkout

// Send WhatsApp enquiry
function sendWhatsAppEnquiry() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    let message = 'Hello! I am interested in the following products from Fashion Hub:\n\n';
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.title}\n`;
        message += `   Price: Rs. ${item.price}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        if (item.size) {
            message += `   Size: ${item.size}\n`;
        }
        message += '\n';
    });
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total Amount: Rs. ${totalPrice}\n\n`;
    message += 'Please provide more details about availability and delivery.';
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919898005546?text=${encodedMessage}`, '_blank');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    
    // Add quantity input validation
    const quantityInput = document.getElementById('quantity-input');
    quantityInput.addEventListener('change', function() {
        const value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 10) this.value = 10;
    });
});

