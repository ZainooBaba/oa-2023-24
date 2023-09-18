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
    fetch(
        "http://localhost:3000/coinAdd:" + document.getElementById("nameField").value,
    ).then(res => res.json()).then( () => {
        if(res.status == 200) {
            addButtons(res.coins)
        }
        alert(res.json())
    })
}

function addButtons(items) {
    var allcoins=items;
        var buttonHolder=document.getElementById("coinSlect");
        buttonHolder.innerHTML="";
        for (var i = 0; i < allcoins.length; i++) {
            var butt=document.createElement("button");
            butt.innerHTML=allcoins[i];
            buttonHolder.appendChild(butt);
        }
}
