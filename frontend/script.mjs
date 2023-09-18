//TODO
// 2. toggle live updates
// 3. swap between coins
// 4. All coin graph
// 5. disable extra features
// 6. CSS
// 7. get old coin data
// 8. enter not working
async function sendCoin() {
    //send post request to backend

    addButtons(["bitcoin", "ethereum", "dogecoin"])

    // const res = await fetch(
    //     "http://localhost:3000/coinAdd:" + document.getElementById("nameField").value,
    // )
    // if(res.status == 200) {
    //     addButtons(res.json())
    // }
    // console.log(res)
}

function addButtons(items) {
    var allcoins=items.coins;
        var buttonHolder=document.getElementById("coinSlect");
        buttonHolder.innerHTML="";
        for (var i = 0; i < allcoins.length; i++) {
            var butt=document.createElement("button");
            butt.innerHTML=allcoins[i];
            buttonHolder.appendChild(butt);
        }
}
