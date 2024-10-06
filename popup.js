document.addEventListener("DOMContentLoaded", function() {
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const message = document.getElementById("message");
  const popup = document.getElementById("amazon-extension-login-popup");

  // Simulate user login
  loginBtn.addEventListener("click", function() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    
    if (email && password) {
      loginUser(email, password);
    } else {
      message.textContent = "Please fill in both fields!";
    }
  });

  // Simulate user signup
  signupBtn.addEventListener("click", function() {
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    
    if (email && password) {
      signupUser(email, password);
    } else {
      message.textContent = "Please fill in both fields!";
    }
  });

  // Placeholder login function
  async function loginUser(email, password) {
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }), // Ensure keys match your backend
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Login successful:", data);
        const popup = document.getElementById("amazon-extension-login-popup");
        const message = document.querySelector("#amazon-extension-login-popup p");

        message.textContent = "Logged in successfully!";
      
        // Change the popup content and apply the transformed class
        popup.innerHTML = `
          <img src="images/Login.jpg" alt="Image">
        `;
        popup.style.background = "none"; // Remove background for image
        popup.classList.add("transformed"); // Apply the transformed class with animation

    } else {
        console.error("Login error:", data);
        const message = document.querySelector("#amazon-extension-login-popup p");
        message.textContent = "Server error. Try again.";
    }
}


  // Placeholder signup function
  function signupUser(email, password) {
    // Prepare the data to send to the server
    const data = { username: email, password }; 

    // Send a POST request to the signup API
    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server error. Try again.");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful signup
        console.log(data.message); // Display success message or perform redirection
        message.textContent = data.message; // Update the UI with the success message
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during signup:", error);
        message.textContent = error.message; // Update the UI with the error message
      });
  }
});
