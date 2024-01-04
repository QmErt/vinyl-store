let products = [
    { id: 1, name: 'Vinyl 1', price: 20.99 },
    { id: 2, name: 'Vinyl 2', price: 30.49 },
    { id: 3, name: 'Vinyl 3', price: 15.99 }
];

let currentUser = null;

function showProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Fiyat: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Sepete Ekle</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function showUserInfo(user) {
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
