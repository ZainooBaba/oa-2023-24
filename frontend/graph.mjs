const graphDiv = document.getElementById("graph");


setInterval(async () => {
    const res = await fetch(
"http://localhost:3000/coinReq:all"
    )
    Plotly.react( graphDiv, [ await res.json() ]);
}, 1000)



