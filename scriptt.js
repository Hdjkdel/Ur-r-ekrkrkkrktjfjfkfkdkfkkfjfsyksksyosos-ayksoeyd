const startStopBtn = document.getElementById("startStopBtn");
const seedContainer = document.getElementById("seedContainer");
const foundContainer = document.getElementById("foundContainer");
const attemptsElem = document.getElementById("attempts");
const foundElem = document.getElementById("found");
const totalValueElem = document.getElementById("totalValue");

let running = false;
let attempts = 0;
let found = 0;
let totalValue = 0;
let interval;

const foundCoins = new Set();

const wordList = ["service", "truth", "alone", "filter", "exist", "anxiety", "always", "diary", "shrimp", "dutch",
    "sentence", "forum", "lawsuit", "young", "planet", "basket", "fly", "cigar", "tiny", "verify", "angry", "click",
    "horn", "inspire", "change", "depth", "orchard", "slim", "warm", "away", "release", "awful", "swamp", "limit",
    "cause", "cabin"];

const coins = [
    { name: "BTC", color: "btc", logo: "https://i.imgur.com/363d2W2.png", chance: 0.000000000000000000000000000000000001, found: false, value: 170 },
    { name: "ETH", color: "eth", logo: "https://i.imgur.com/I4V9ywr.png", chance: 0.00000000000000000000000005, found: false, value: 4 },
    { name: "TRX", color: "trx", logo: "https://i.imgur.com/v4huAvo_d.webp?maxwidth=760&fidelity=grand", chance: 0.0000000000000000000000000000000000002, found: false, value: 105 },
    { name: "BNB", color: "bnb", logo: "https://i.imgur.com/gwrIQTZ_d.webp?maxwidth=760&fidelity=grand", chance: 0.00000000000000000000000000000000000002, found: false, value: 367 },
    { name: "USDT", color: "usdt", logo: "https://i.imgur.com/jJrwIvV.png", chance: 0.0000000000000000000000000000000000000001, found: false, value: 129 },
    { name: "SOL", color: "sol", logo: "https://i.imgur.com/he7NxNK.png", chance: 0.00000000000000000000000000000000000000003, found: false, value: 159 },
    { name: "DOGE", color: "doge", logo: "https://i.imgur.com/baWhshZ_d.webp?maxwidth=760&fidelity=grand", chance: 0.000000000000000000000000000000003, found: false, value: 51 },
    { name: "MATIC", color: "matic", logo: "https://i.imgur.com/ALUdSY9.png", chance: 0.00000000000000000000000000000000000000001, found: false, value: 4 },
];

function generateSeedPhrase() {
    let phrase = "*seed-phrase: ";
    for (let i = 0; i < 12; i++) {
        phrase += wordList[Math.floor(Math.random() * wordList.length)] + " ";
    }
    return phrase.trim();
}

function startMining() {
    running = true;
    startStopBtn.textContent = "STOP";
    interval = setInterval(() => {
        if (!running) return;
        
        const phrase = generateSeedPhrase();
        const div = document.createElement("div");
        div.textContent = phrase;
        div.classList.add("seed");
        
        seedContainer.appendChild(div);
        seedContainer.scrollTop = seedContainer.scrollHeight;

        attempts++;
        attemptsElem.textContent = attempts;

        coins.forEach(coin => {
            if (!foundCoins.has(coin.name) && Math.random() < coin.chance) {
                // Coin bulunduğunda, 'found' değerini true yapıyoruz ve coin set'e ekliyoruz
                coin.found = true;
                foundCoins.add(coin.name);
                found++;

                let value = (parseFloat(amount) * coin.value).toFixed(2);
                totalValue += parseFloat(value);

                foundElem.textContent = found;
                totalValueElem.textContent = totalValue.toFixed(2) + "$";

                // Yalnızca logo ismi ve dolar değeri görünsün
                const foundDiv = document.createElement("div");
                foundDiv.innerHTML = `<img src="${coin.logo}" width="20" alt="${coin.name}"> ${coin.name} ≈ ${value}$`;
                foundDiv.classList.add("found-item", coin.color);

                foundContainer.appendChild(foundDiv);
                foundContainer.scrollTop = foundContainer.scrollHeight;
            }
        });
    }, 50);
}

function stopMining() {
    running = false;
    startStopBtn.textContent = "START";
    clearInterval(interval);
}

startStopBtn.addEventListener("click", () => {
    if (running) {
        stopMining();
    } else {
        startMining();
    }
});