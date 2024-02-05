    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const productId = getParameterByName('id');

    const selectedProduct = products.find(product => product.id == productId);

    const productDetailsContainer = document.getElementById('productDetails');
    if (selectedProduct) {
        const productDetails = document.createElement('div');
        productDetails.innerHTML = `
            <h2>${selectedProduct.name}</h2>
            <p>${selectedProduct.description}</p>
            <p>Brand: ${selectedProduct.brand}</p>
            <p>Prezzo: $${selectedProduct.price}</p>
            <p>Utente ID: ${selectedProduct.userId}</p>
            <p>Creazione: ${selectedProduct.createdAt}</p>
            <p>Ultima modifica: ${selectedProduct.updatedAt}</p>
        `;
        productDetailsContainer.appendChild(productDetails);
    } else {
        productDetailsContainer.innerHTML = 'Prodotto non trovato o ID non valido.';
    }