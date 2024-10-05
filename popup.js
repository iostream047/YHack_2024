document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const message = document.getElementById("message");
  
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
    function loginUser(email, password) {
      console.log(`Logging in user with email: ${email}`);
      message.textContent = "Logged in successfully!";
      // You can replace this with actual authentication logic
    }
  
    // Placeholder signup function
    function signupUser(email, password) {
      console.log(`Signing up user with email: ${email}`);
      message.textContent = "Signed up successfully!";
      // You can replace this with actual signup logic
    }
  });
  