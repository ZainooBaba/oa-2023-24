//TODO
// 2. toggle live updates
// 3. swap between coins
// 4. All coin graph
// 5. disable extra features
// 6. CSS
// 7. get old coin data
// 8. enter not working

const url = "https://sore-jade-seal-belt.cyclic.cloud/"
// const url = "http://localhost:3000/"

let currentCoin = "bitcoin"

setInterval(async () => {
    await updateData()
}, 1000)

async function updateData() {
    const graphDiv = document.getElementById("graph");
    const res = await fetch(
        url+"coinReq:" + currentCoin
    )
    Plotly.react(graphDiv, [await res.json()]);
}


async function sendCoin() {
    if(document.getElementById("nameField").value == "") return
    const response = await fetch(url+"coinAdd:" + document.getElementById("nameField").value);
    const data = await response.json();
    if (data.coins != "not found") {
        addButtons(data.coins)
    }
}

function addButtons(items) {
    var allcoins=items;
    var buttonHolder=document.getElementById("coinSlect");
    buttonHolder.innerHTML="";
    for (var i = 0; i < allcoins.length; i++) {
        var butt=document.createElement("button");
        butt.innerHTML=allcoins[i];
        butt.onclick=function() {
            currentCoin=this.innerHTML;
        }
        butt.className="button"
        buttonHolder.appendChild(butt);
    }
}

function clearAllData(){
    const res = fetch(
        url+"clear"
    )
}




