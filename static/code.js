fetch('/static/content.json') // Ensure this path is correct
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('products-container');
        data.forEach(product => {
            if (product["@type"] === "Product") {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const maxChars = 10; // Maximum characters for the truncated description
                const truncatedDescription = product.description.length > maxChars 
                    ? product.description.substring(0, maxChars) + "..."
                    : product.description;

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer" onclick="openModal('${product.image}')">
                    <h2>${product.name}</h2>
                    <p>
                        <span class="short-description">${truncatedDescription}</span>
                        <span class="full-description" style="display: none;">${product.description}</span>
                        <a href="#" class="toggle-description text-blue-500 cursor-pointer">Show more</a>
                    </p>
                    <p><strong>Price:</strong> ${product.offers.price} ${product.offers.priceCurrency}</p>
                    <a href="${product.url}" target="_blank" class="block bg-blue-500 text-white text-center rounded-md py-3 mt-4 hover:bg-blue-600 transition-colors transform hover:scale-105 shadow-lg">View Product</a>
                `;
                
                // Add event listener for the "Show more" link
                const toggleLink = productDiv.querySelector('.toggle-description');
                toggleLink.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent the default link behavior
                    const shortDesc = productDiv.querySelector('.short-description');
                    const fullDesc = productDiv.querySelector('.full-description');

                    if (fullDesc.style.display === 'none') {
                        // Show the full description and hide the short one
                        fullDesc.style.display = 'inline';
                        shortDesc.style.display = 'none';
                        toggleLink.textContent = 'Show less';
                    } else {
                        // Show the short description and hide the full one
                        fullDesc.style.display = 'none';
                        shortDesc.style.display = 'inline';
                        toggleLink.textContent = 'Show more';
                    }
                });

                container.appendChild(productDiv);
            }
        });
    })
    .catch(error => console.error('Error fetching the products:', error));
