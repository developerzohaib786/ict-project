emailchecker.addEventListener("click", async(e) => {
    e.preventDefault();
    console.log("clicked!");
    let key = "ema_live_BYga5xGQm1hIyirLxT7cyre27MJZkDtocinngwUI";
    let email = document.getElementById("emailInput").value;
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    let res = await fetch(url);
    let result = await res.json();

    // Start the table
    let str = `<table border="1"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>`;

    // Loop through the result and add rows to the table
    for (let key of Object.keys(result)) {
        if (result[key] !== "" && result[key] !== " ") {
            str += `<tr><td>${key}</td><td>${result[key]}</td></tr>`;
        }
    }

    // Close the table
    str += `</tbody></table>`;

    // Insert the table into the result container
    resultCont.innerHTML = str;
});
