import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    origin: "http://localhost:63342"
}))


const allCoins = ["bitcoin"]
const coinMap = new Map();
coinMap.set("bitcoin", [])

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
async function updateData() {
    for(let coin of allCoins) {
        const response = await fetch('https://api.coincap.io/v2/assets/' + coin, requestOptions)
            .then(response => response.json())
        try {
            let coinInfo = response.data
            if (!coinMap.has(coin)) coinMap.set(coin, [])
            let coinData = coinMap.get(coin)
            if (coinData[coinData.length - 1][0] == coinInfo.priceUsd) continue
            coinData.push([coinInfo.priceUsd, new Date().toTimeString()])
            coinMap.set(coin, coinData)
        } catch (e) {

        }
    }
}


app.get("/",
    (req, res) => {
        res.send({

            x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [0, 1, 2]
        }).status(200)
    })

app.get("/coinAdd:*",
    async (req, res) => {
        let coinName = req.url.split(":")[1]
        if (!allCoins.includes(coinName)) {
            try {
                const response = await fetch('https://api.coincap.io/v2/assets/' + coinName, requestOptions)
                    .then(response => response.json())
                let coinInfo = response
                if(coinInfo.error.includes("not found")) {
                    res.send({coins: 'not found'}).status(400)
                    return
                }
            } catch (e) {
                allCoins.push(coinName)
                res.send({coins: allCoins}).status(200)
                return
            }
        }
        res.send({coins:'included'}).status(100)
        return
    })

app.get("/coinReq:*",
    (req, res) => {
        let coinName = req.url.split(":")[1]
        let trace = getCoinData("bitcoin")
        res.send(trace).status(200)
    })

function getCoinData(coinName) {
    var x = []
    var y = []
    let vals = coinMap.get(coinName)
    for(let i = 0; i < vals.length; i++) {
        x.push(vals[i][1])
        y.push(vals[i][0])
    }
    let trace = {
        name: coinName,
        x: x,
        y: y,
    }
    return trace
}


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))

setInterval(async () => {
    await updateData("bitcoin")
}, 1000)
