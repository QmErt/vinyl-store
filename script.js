let products = [
    { id: 1, name: 'Dua Lipa - Future Nostalgia Album Colored Vinyl', price: 20.99, imageUrl: 'https://images.stockx.com/images/Dua-Lipa-Future-Nostalgia-Boxset-12-Vinyl.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=jpg&auto=compress&dpr=2&trim=color&updated_at=1617350797&q=60' },
    { id: 2, name: 'Raye - My 21st Century Blues Album Colored Vinyl', price: 30.49, imageUrl: 'https://ukshop.rayeofficial.com/cdn/shop/products/M21CB_Vinyl_D2C_Full.png?v=1665144047' },
    { id: 3, name: 'Olivia Rodrigo - Guts Album Colored Vinyl', price: 15.99, imageUrl: 'https://www.turntablelab.com/cdn/shop/files/oliviarodrigo-guts-coloredvinyl-2_1000x1000.jpg?v=1694710642' }
];

let cart = [];
let currentUser = null;

function showProducts(productsToDisplay = products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.imageUrl}" width="250px" height="250px">
            <br>
            <p class="productname">${product.name}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        showCartInfo();
        alert(`Product added to cart: ${product.name}`);
    } else {
        alert('Product Couldn\'t Be Added To Cart.');
    }
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        showCartInfo();
        alert('Product removed from cart.');
    } else {
        alert('Product not found in cart.');
    }
}

function showCartInfo() {
    const cartInfoContainer = document.getElementById('cart-info');
    cartInfoContainer.innerHTML = `<p>There is ${cart.length} in your cart.</p>`;

    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${product.name} - $${product.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${product.id})">Remove from Cart</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showProducts();
    showCartInfo();
});

    const userInfoContainer = document.getElementById('user-info');
    if (user) {
        userInfoContainer.innerHTML = `<p>Kullanıcı: ${user.username}</p>`;
    } else {
        userInfoContainer.innerHTML = '';
    }
}

function showCartInfo(cart) {
    const cartInfoContainer = document.getElementById('cart-info');
    cartInfoContainer.innerHTML = `<p>Sepetinizde ${cart.length} ürün bulunmaktadır.</p>`;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const cart = [];
        showCartInfo(cart);
        alert(`Sepete ürün eklendi: ${product.name}`);
    } else {
        alert('Ürün bulunamadı.');
    }
}

function promptForProduct() {
    const productName = prompt('Ürün adı:');
    const productPrice = parseFloat(prompt('Ürün fiyatı:'));

    if (!isNaN(productPrice) && productName) {
        const newProduct = {
            id: products.length + 1,
            name: productName,
            price: productPrice
        };
        products.push(newProduct);
        showProducts();
    } else {
        alert('Geçersiz ürün bilgileri.');
    }
}

function promptForLogin() {
    const username = prompt('Kullanıcı Adı:');
    const password = prompt('Şifre:');

    const user = { username, password };

    sessionStorage.setItem('user', JSON.stringify(user));
    currentUser = user;

    showUserInfo(currentUser);
    alert('Başarıyla oturum açıldı.');
}

function logout() {
    sessionStorage.removeItem('user');
    currentUser = null;

    showUserInfo(currentUser);
    alert('Oturum kapatıldı.');
}

document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    showProducts();
    showCartInfo([]);
});

function searchProduct() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    showProducts(filteredProducts);
}
