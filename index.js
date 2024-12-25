// Delete a password
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
  
    // Ensure the website is valid before attempting deletion
    let arrUpdated = arr.filter(
      (e) => e.website !== website && e.website && e.username && e.password
    );
  
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert("Password deleted!");
    showPasswords(); // Refresh the table
  };
  
  // Logic for displaying passwords
  const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
  
    // Reset the table contents
    tb.innerHTML = `
        <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
        </tr>
    `;
  
    if (data == null || JSON.parse(data).length === 0) {
        tb.innerHTML += "<tr><td colspan='4'>No data to show</td></tr>";
    } else {
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                <td>${element.website} <button class="copy-btn" onclick="copyToClipboard('${element.website}')"><img src='copy.svg' alt='Copy'></button></td>
                <td>${element.username} <button class="copy-btn" onclick="copyToClipboard('${element.username}')"><img src='copy.svg' alt='Copy'></button></td>
                <td>${element.password} <button class="copy-btn" onclick="copyToClipboard('${element.password}')"><img src='copy.svg' alt='Copy'></button></td>
                <td><button class="submit-btn2" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML += str; // Append all rows at once
    }
  
    // Clear input fields
    if (document.getElementById("website")) document.getElementById("website").value = "";
    if (document.getElementById("username")) document.getElementById("username").value = "";
    if (document.getElementById("password")) document.getElementById("password").value = "";
  };
  
  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Copied to clipboard!"),
      (err) => alert("Failed to copy: " + err)
    );
  };
  
  // Add new passwords
  document.querySelector(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
  
    if (website && username && password) {
        let passwords = localStorage.getItem("passwords");
        let json = passwords ? JSON.parse(passwords) : [];
        json.push({ website, username, password });
        localStorage.setItem("passwords", JSON.stringify(json));
        alert("Password saved!");
        showPasswords();
    } else {
        alert("Please fill in all fields!");
    }
  });
  
  // Initial call to display passwords
  showPasswords();
  