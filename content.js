// Function to show the mini popup
var override_default_action = true;
function showMiniPopup() {
  if (document.getElementById('amazon-extension-mini-popup')) {
    return; // If the popup already exists, don't show again
  }

  let miniPopup = document.createElement("div");
  miniPopup.innerHTML = `
    <div id="amazon-extension-mini-popup" class="amazon-popup">
      <p>Do you want to learn more about this product?</p>
      <div class="buttons-container">
        <button id="learn-more-btn">Learn More</button>
        <button id="close-popup-btn">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(miniPopup);

  // Handle "Learn More" button click
  document
    .getElementById("learn-more-btn")
    .addEventListener("click", function () {
      const description =
        "BLACKOUT FUNCTION: XWZO bedroom curtains can block 85%-95% of the sunlight (dark color is better), can protect your furniture, flooring and valuables from sunlight, suitable for bedrooms, living rooms, children's rooms and so on."; // Adjust selector to extract product description from the amazon listing
      const materials = "Polyester"; // Adjust selector to extract materials from the amazon listing
      const userId = localStorage.getItem("userId"); // Replace with the actual user ID from your app

      // Prepare the request data
      const requestData = {
        description,
        materials,
      };

      // Send a POST request to the generate API
      fetch(`http://localhost:3000/api/generate?id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to generate score. Please try again.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Generated data:", data);
          // You can display the score and classification here
          alert(
            `Score: ${data.score}, Classification: ${data.productClassification}` // to access the ESG score and product classification attribute. To access other variables like the name of the person and all you can check the User schema in User.model.js
          );
        });
      localStorage.setItem("data", data).catch((error) => {
        console.error("Error during API call:", error);
        alert(error.message); // Display error message to the user
      });
    });

  // Handle "Close" button click
  document.getElementById("close-popup-btn").addEventListener("click", function () {
    miniPopup.remove();
  });
}

// Function to show the larger "Hello World" popup
function showLargerPopup() {
  if (document.getElementById('amazon-extension-large-popup')) {
    return; // If the larger popup already exists, don't show again
  }

  let largerPopup = document.createElement("div");
  largerPopup.innerHTML = `
    <div id="amazon-extension-large-popup" class="amazon-popup amazon-popup-large">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Hello World</h2>
        <button id="close-large-popup-btn" style="font-size: 20px;">&times;</button>
      </div>
    </div>
  `;

  document.body.appendChild(largerPopup);

  // Handle close button on large popup
  document.getElementById("close-large-popup-btn").addEventListener("click", function () {
    largerPopup.remove();
  });
}

// Function to show the confirmation popup when "Add to Cart" is clicked
function showConfirmationPopup(addToCartButton) {
    console.log("Add to Cart clicked!"); // Check if this is being triggered

    // If the confirmation popup already exists, don't show again
    if (document.getElementById('amazon-extension-confirmation-popup')) {
        return;
    }

    // Create the confirmation popup
    let confirmationPopup = document.createElement("div");
    confirmationPopup.innerHTML = `
      <div id="amazon-extension-confirmation-popup" class="amazon-popup amazon-popup-large">
        <div style="text-align: center;">
          <h2>Are you sure?</h2>
          <button id="confirm-add-to-cart-btn" style="padding: 10px 20px; margin: 10px; background-color: #28a745; color: white;">Yes</button>
          <button id="cancel-add-to-cart-btn" style="padding: 10px 20px; margin: 10px; background-color: #dc3545; color: white;">No</button>
        </div>
      </div>
    `;

    document.body.appendChild(confirmationPopup);

    // Handle the "Yes" button click: Proceed with adding to cart
    document.getElementById("confirm-add-to-cart-btn").addEventListener("click", function () {
        console.log("Confirmed: Adding to cart."); // Log the action
        confirmationPopup.remove(); // Remove the popup
        override_default_action = false;
        // Create a new click event and dispatch it to the original "Add to Cart" button
        let clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        addToCartButton.dispatchEvent(clickEvent); // Simulate the click to add the product to the cart
    });

    // Handle the "No" button click: Close the popup and do nothing
    document.getElementById("cancel-add-to-cart-btn").addEventListener("click", function () {
        console.log("Cancelled: Not adding to cart."); // Log the cancellation
        confirmationPopup.remove(); // Remove the popup
    });
}

// Function to override the Add to Cart button behavior
function overrideAddToCart() {
    const addToCartButton = document.getElementById('add-to-cart-button'); // ID from the provided HTML
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function (event) {
          if(override_default_action){
            event.preventDefault(); // Prevent the default "Add to Cart" action
            showConfirmationPopup(addToCartButton); // Show confirmation popup
          }
        });
    } else {
        console.error("Add to Cart button not found!"); // Log error if button is not found
    }
}

// Check if the current page is a product page
function checkAmazonProductPage() {
    if (window.location.href.includes("/dp/")) {
        showMiniPopup();
        overrideAddToCart(); // Override Add to Cart button with new behavior
    }
}

// Check on initial load
checkAmazonProductPage();

// Observe changes in the URL
let lastUrl = location.href;
new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        checkAmazonProductPage(); // Trigger the popup if the URL changes to a product page
    }
}).observe(document, { subtree: true, childList: true });
