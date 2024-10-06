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
  // Handle "Learn More" button click
document.getElementById("learn-more-btn").addEventListener("click", function () {
  const descriptions = [
    "BLACKOUT FUNCTION: XWZO bedroom curtains can block 85%-95% of the sunlight (dark color is better), protecting your furniture, flooring, and valuables from sunlight. These are suitable for bedrooms, living rooms, children's rooms, and more.",
    "ENERGY SAVING: These thermal insulated curtains help save on energy costs by reducing the need for heating or cooling, making them perfect for any season. Enjoy a cooler room in summer and a warmer space in winter.",
    "SOUNDPROOF: XWZO curtains effectively reduce external noise, providing a peaceful environment even in noisy areas like urban apartments, next to highways, or busy streets.",
    "ECO-FRIENDLY DESIGN: Made from environmentally sustainable materials, these curtains are free from harmful chemicals and dyes, ensuring a safe and green living space for you and your family.",
    "UV PROTECTION: Shield your home from harmful UV rays with these curtains, which block 99% of UV radiation. Ideal for maintaining the longevity of your furniture and keeping your rooms cool.",
    "MULTILAYERED FABRIC: Our premium curtains are constructed from multiple layers, each serving a purpose—whether it’s for blocking light, insulating heat, or reducing noise. Enjoy a multifunctional solution for your home’s needs.",
    "ELEGANT STYLE: With a variety of designs, patterns, and textures, these curtains are not only functional but also enhance the aesthetic appeal of your living space. A stylish way to manage light and privacy in any room.",
    "MACHINE WASHABLE: Made from durable materials that can withstand frequent washing, these curtains are easy to maintain and keep looking new, making them perfect for families with children or pets.",
    "MOISTURE-RESISTANT: These curtains are resistant to moisture buildup, making them perfect for kitchens, bathrooms, or other humid areas. They help prevent mold and mildew while maintaining a fresh appearance.",
    "TOTAL PRIVACY CONTROL: Our blackout curtains provide maximum privacy, ensuring you have complete control over the light and visibility in your room. Ideal for bedrooms, offices, or any private spaces.",
    "EASY INSTALLATION: The curtains come with sturdy grommets that make installation quick and hassle-free. Perfect for anyone looking for an easy way to upgrade their room’s decor without complicated setup.",
    "NATURAL LIGHT FILTERING: These curtains gently filter natural light, softening the harshness of sunlight while still maintaining a bright, airy feel in the room. Perfect for living rooms, dining areas, or sunrooms.",
    "These stunning, floor-length curtains feature an exquisite floral design that brings a touch of nature indoors. Made from a durable, lightweight fabric, they flow gracefully with any breeze while providing exceptional blackout functionality. Perfect for creating a serene atmosphere in bedrooms or nurseries.",
"Transform your living space with our luxurious silk blend curtains that not only look elegant but also block out intrusive light. Their sophisticated sheen enhances any room's decor, while the thermal insulation helps to regulate indoor temperatures, making them an ideal choice for energy-conscious homeowners.",
"Experience unparalleled comfort with our innovative soundproof curtains designed to reduce outside noise and distractions. Crafted with a triple-weave fabric, these curtains not only keep your space quieter but also add an air of sophistication, thanks to their rich texture and beautiful drape.",
"Bring a modern twist to your home with these geometric-patterned curtains. Not only do they offer excellent light-blocking capabilities, but their stylish design makes them a stunning focal point in any room. These curtains are ideal for anyone looking to merge functionality with contemporary flair.",
"Our eco-friendly curtains are made from 100% organic cotton and dyed using non-toxic methods, making them safe for your family and the environment. These curtains provide a chic and natural look while effectively blocking harmful UV rays, helping to preserve the longevity of your furniture and flooring.",
"Add a touch of elegance to your home decor with our premium velvet curtains. These sumptuous drapes are designed to keep light out and provide an opulent atmosphere, perfect for formal dining rooms or cozy living areas. Available in various rich colors to suit your style.",
"This innovative sheer and blackout combination allows you to enjoy the best of both worlds. Use the sheer layer for soft, diffused light during the day and the blackout layer for complete privacy and darkness at night. Perfect for bedrooms or media rooms for ultimate versatility.",
"Create a cozy retreat with our thermal insulated curtains, designed to keep your room warm in winter and cool in summer. Their luxurious appearance and practical benefits make them a fantastic addition to any home, ensuring comfort all year round.",
"Enjoy effortless style with these easy-care curtains that are machine washable and wrinkle-resistant. Perfect for busy families, they combine practicality with aesthetic appeal, making them suitable for any room, from playrooms to adult spaces.",
"Our artistic printed curtains feature unique designs inspired by world cultures, allowing you to express your personality through home decor. Crafted with care, they provide privacy and light control while adding a creative flair to your living space."
  ];

  // Define a longer and more varied list of materials and ingredients
  const materials = [
    "Polyester",
    "Cotton",
    "Linen",
    "Velvet",
    "Silk",
    "Acrylic",
    "Rayon",
    "Viscose",
    "Wool",
    "Hemp",
    "Bamboo fiber",
    "Microfiber",
    "Nylon",
    "Organic Cotton",
    "Recycled Polyester",
    "Tencel",
    "Soy Protein Fiber",
    "Cashmere",
    "Alpaca Wool",
    "Flax",
    "Spandex",
    "Elastane",
    "PVC",
    "Polyurethane",
    "Cork",
    "Plant-based fibers",
    "Natural Rubber",
    "Shea Butter",
    "Aloe Vera",
    "Coconut Oil",
    "Beeswax",
    "Jojoba Oil",
    "Argan Oil",
    "Chamomile Extract",
    "Lavender Oil",
    "Tea Tree Oil"
  ];

  // Randomly select a description and material
  // Randomly select a description and material
const description = descriptions[Math.floor(Math.random() * descriptions.length)];
const material = materials[Math.floor(Math.random() * materials.length)];

// Prepare the request data
const requestData = {
  description,
  material,
};

// Send a POST request to the generate API
fetch("http://localhost:3000/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestData),
})
  .then((response) => response.json())
  .then((data) => {
    // Clear the existing popup content
    const popup = document.getElementById("amazon-extension-mini-popup");
    popup.innerHTML = "";

    // Create a new element to display the response data with a close button
    const responseElement = document.createElement("div");

    // Create the close button element
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;"; // "×" symbol for the close button
    closeButton.style.position = "absolute";
    closeButton.style.top = "90px";
    closeButton.style.right = "20px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "20px";
    closeButton.style.fontWeight = "bold";

    // Add an event listener to the close button to hide the popup
    closeButton.addEventListener("click", () => {
      popup.style.display = "none"; // Hide the popup when the button is clicked
    });

   // Add the content to the responseElement
// Style the responseElement to use flexbox for layout
responseElement.style.display = "flex";
responseElement.style.flexDirection = "column"; // Stack elements vertically
responseElement.style.justifyContent = "flex-end"; // Move content to bottom
responseElement.style.height = "100%"; // Ensure it takes up the full height of the popup
responseElement.style.backgroundColor = "#99cc66"; // Background color
responseElement.style.padding = "20px"; // Padding
responseElement.style.border = "1px solid #ccc"; // Border
responseElement.style.borderRadius = "10px"; // Rounded corners
responseElement.style.boxShadow = "0px 4px 10px rgba(0, 128, 0, 0.2)"; // Box shadow
responseElement.style.fontFamily = "'Arial', sans-serif"; // Font family
responseElement.style.gap = "20px"; // Gap between image and text container

// Create a text container
const textContainer = document.createElement("div");
textContainer.style.display = "flex";
textContainer.style.flexDirection = "column"; // Stack elements vertically
textContainer.style.alignItems = "center"; // Center text horizontally
textContainer.style.color = "#254222"; // Text color
textContainer.style.gap = "10px"; // Gap between text lines
// Add the content to the text container
textContainer.innerHTML = `
  <h2 style="font-size: 24px; margin: 0; padding: 0;">Response Data:</h2>
  <p style="font-size: 20px; margin: 0; padding: 0;">Score: ${data.score}</p>
  <p style="font-size: 20px; margin: 0; padding: 0;">Classification: ${data.productClassification}</p>
`;

// Create the image element
const imageElement = document.createElement("img");
imageElement.src = chrome.runtime.getURL("images/load.png");

// Style the image
imageElement.style.width = "469px"; // Set the image width
imageElement.style.height = "554px"; // Set the image height
imageElement.style.margin = "0 auto"; // Center image horizontally
imageElement.style.borderRadius = "10px"; // Match popup's rounded corners
imageElement.alt = "Product Image"; // Add alt text for accessibility

// Append the image and text container to the response element
responseElement.appendChild(imageElement);
responseElement.appendChild(textContainer);
responseElement.appendChild(closeButton);

// Style the close button
closeButton.style.padding = "8px 12px";
closeButton.style.margin = "5px";
closeButton.style.backgroundColor = "#ece2b1"; // Button background color
closeButton.style.color = "white";
closeButton.style.border = "2px solid #254222"; // Button border
closeButton.style.borderRadius = "20px";
closeButton.style.cursor = "pointer";

// Append the response element to the popup
popup.appendChild(responseElement);

// Set the popup styling
popup.style.width = "500px"; 
popup.style.height = "800px";

    
    
    responseElement.appendChild(closeButton);
    responseElement.appendChild(imageElement);

    
    popup.appendChild(responseElement);
    popup.style.width = "500px"; 
    popup.style.height = "800px";
  })
  .catch((error) => {
    console.error("Error during API call:", error);
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
          <h2>Are you sure this is a sustainable decision?</h2>
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
