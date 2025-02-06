function toggleSelection(coinElement) {
    // Coin seçili değilse seç, seçiliyse kaldır
    coinElement.classList.toggle("selected");
}

function start() {
    let selectedCoins = document.querySelectorAll(".coin.selected");
    
    // Eğer hiçbir coin seçilmediyse, kullanıcıyı uyar ve yönlendirme yapma
    if (selectedCoins.length === 0) {
        alert("Lütfen en az bir coin seçin!");
        return;
    }

    // Seçilen coinleri al
    let selectedNames = [];
    selectedCoins.forEach(coin => {
        selectedNames.push(coin.textContent.trim());
    });

       
    // Coinler seçildiyse, index.html sayfasına yönlendir
    window.location.href = "indexx.html";
}