    const products = JSON.parse(localStorage.getItem('products')) || [];

    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';

    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMwZTI0YmUwODVmYTAwMTk2MzFhM2YiLCJpYXQiOjE3MDcxMzk2NTksImV4cCI6MTcwODM0OTI1OX0.YNmKwqXEJF3QxFl5ApZ4rxii2A4bYkm9fN06tatG_5U';

    // function fetchData() {
    //     fetch(apiUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${authToken}`
    //         }
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Errore nella richiesta GET all\'API');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         displayResponse(data);
    //     })
    //     .catch(error => {
    //         console.error('Errore durante la richiesta GET all\'API:', error);
    //     });
    // }

    // function postData() {
        
    //     const productNameInput = document.getElementById('productName');
    //     const productDescriptionInput = document.getElementById('productDescription');
    //     const productBrandInput = document.getElementById('productBrand');
    //     const productPriceInput = document.getElementById('productPrice');

    //     const productName = productNameInput.value.trim();
    //     const productDescription = productDescriptionInput.value.trim();
    //     const productBrand = productBrandInput.value.trim();
    //     const productPrice = parseFloat(productPriceInput.value);

    //     if (productName && productDescription && productBrand && !isNaN(productPrice) && productPrice >= 0) {
    //         const newProduct = {
    //             id: Date.now(), 
    //             name: productName,
    //             description: productDescription,
    //             brand: productBrand,
    //             price: productPrice
    //         };

    //         productNameInput.value = '';
    //         productDescriptionInput.value = '';
    //         productBrandInput.value = '';
    //         productPriceInput.value = '';

    //         displayProducts();
    //     }
    // }

    //     fetch(apiUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${authToken}`
    //         },
    //         body: JSON.stringify(postData)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Errore nella richiesta POST all\'API');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         displayResponse(data);
    //     })
    //     .catch(error => {
    //         console.error('Errore durante la richiesta POST all\'API:', error);
    //     });

    // // Funzione per visualizzare la risposta dell'API
    // function displayResponse(data) {
    //     const responseDataContainer = document.getElementById('responseData');
    //     responseDataContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    // }

    function displayProducts() {
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Brand: ${product.brand}</p>
                <p>Prezzo: $${product.price}</p>
            `;
            productElement.addEventListener('click', () => showProductDetail(product.id));
            productsContainer.appendChild(productElement);
        });

        displayProductList();
    }
    
    function displayProductList() {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${product.name} - $${product.price}
                <button onclick="editProduct(${product.id})">Modifica</button>
            `;
            productList.appendChild(listItem);
        });
    }

    function showProductDetail(productId) {
        const selectedProduct = products.find(product => product.id === productId);

        if (selectedProduct) {
            const productNameDetail = document.getElementById('productNameDetail');
            const productDescriptionDetail = document.getElementById('productDescriptionDetail');
            const productBrandDetail = document.getElementById('productBrandDetail');
            const productPriceDetail = document.getElementById('productPriceDetail');

            productNameDetail.textContent = `Nome: ${selectedProduct.name}`;
            productDescriptionDetail.textContent = `Descrizione: ${selectedProduct.description}`;
            productBrandDetail.textContent = `Brand: ${selectedProduct.brand}`;
            productPriceDetail.textContent = `Prezzo: $${selectedProduct.price}`;

            const url = `product-detail.html?id=${selectedProduct.id}`;
            window.location.href = url;
        }
    }

    function addToCart(productId) {
        const selectedProduct = products.find(product => product.id === productId);

        const cartContainer = document.getElementById('cart');
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${selectedProduct.name} - $${selectedProduct.price}`;
        cartContainer.appendChild(cartItem);
    }

    function addProduct() {
        const productNameInput = document.getElementById('productName');
        const productDescriptionInput = document.getElementById('productDescription');
        const productBrandInput = document.getElementById('productBrand');
        const productPriceInput = document.getElementById('productPrice');

        const productName = productNameInput.value.trim();
        const productDescription = productDescriptionInput.value.trim();
        const productBrand = productBrandInput.value.trim();
        const productPrice = parseFloat(productPriceInput.value);

        if (productName && productDescription && productBrand && !isNaN(productPrice) && productPrice >= 0) {
            const newProduct = {
                id: Date.now(), 
                name: productName,
                description: productDescription,
                brand: productBrand,
                price: productPrice
            };

            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            productNameInput.value = '';
            productDescriptionInput.value = '';
            productBrandInput.value = '';
            productPriceInput.value = '';

            postData();
            displayProducts();
        } else {
            alert('Inserisci tutte le informazioni richieste per il prodotto.');
        }
    }

    function editProduct(productId) {
        const selectedProduct = products.find(product => product.id === productId);

        if (selectedProduct) {
            const newName = prompt('Modifica il nome del prodotto:', selectedProduct.name);
            const newDescription = prompt('Modifica la descrizione del prodotto:', selectedProduct.description);
            const newBrand = prompt('Modifica il brand del prodotto:', selectedProduct.brand);
            const newPrice = parseFloat(prompt('Modifica il prezzo del prodotto:', selectedProduct.price));

            if (newName !== null && newDescription !== null && newBrand !== null && !isNaN(newPrice) && newPrice >= 0) {
                selectedProduct.name = newName.trim();
                selectedProduct.description = newDescription.trim();
                selectedProduct.brand = newBrand.trim();
                selectedProduct.price = newPrice;

                localStorage.setItem('products', JSON.stringify(products));

                displayProducts();
            } else {
                alert('Tutte le informazioni devono essere valide. Il prodotto non è stato modificato.');
            }
        }
    }

    displayProducts();