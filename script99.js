  document.addEventListener("DOMContentLoaded", function () {
    const keyInput = document.getElementById("key-input");
    const storedKey = localStorage.getItem("savedKey"); // Daha önce kaydedilmiş key var mı?

    if (storedKey) {
        validateKey(storedKey, true); // Önceden kaydedilen key'i doğrula
    }

    function login() {
        let key = keyInput.value.trim();
        if (!key) {
            alert("Lütfen bir key girin.");
            return;
        }
        validateKey(key, false);
    }

    function validateKey(key, autoLogin) {
        fetch("https://docs.google.com/spreadsheets/d/1lHpnWj2XhZm6bi0vRZHj4NYfNpnnODZtE8T6QVAFo2E/gviz/tq?tqx=out:json")
            .then(response => response.text())
            .then(data => {
                let json = JSON.parse(data.substring(47, data.length - 2)); 
                let rows = json.table.rows;
                let validKeys = rows.map(row => row.c[0].v); // Google Sheets'ten çekilen key listesi

                if (validKeys.includes(key)) {
                    let length = key.length;
                    let page = "";

                    switch (length) {
                        case 5: page = "indexbtc.html"; break;
                        case 6: page = "indexeth.html"; break;
                        case 7: page = "indexsol.html"; break;
                        case 8: page = "indexbnb.html"; break;
                        case 9: page = "indextrx.html"; break;
                        case 10: page = "indexpl.html"; break;
                        case 11: page = "indexdoge.html"; break;
                        case 12: page = "indexusdt.html"; break;
                        case 13: page = "indexton.html"; break;
                        case 14: page = "index9.html"; break;
                        default:
                            alert("Geçersiz key.");
                            return;
                    }

                    if (!autoLogin) {
                        localStorage.setItem("savedKey", key);
                        localStorage.setItem("savedPage", page);
                    }

                    window.location.href = page; // Kullanıcıyı yönlendir
                } else {
                    if (autoLogin) {
                        localStorage.removeItem("savedKey");
                        localStorage.removeItem("savedPage");
                        alert("Key geçersiz hale geldi, lütfen iletişime geçin @D_admin_D00.");
                    } else {
                        alert("Geçersiz key!");
                    }
                }
            })
            .catch(error => {
                console.error("Key doğrulama sırasında hata oluştu:", error);
                alert("Key doğrulama hatası.");
            });
    }

    // Butona tıklama olayını bağlama
    document.querySelector("button").addEventListener("click", login);

    // Enter tuşuna basınca giriş yapmayı sağla
    keyInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            login();
        }
    });
});

// Satın alma sayfasına yönlendirme fonksiyonu
function buyAccess() {
    window.location.href = "https://t.me/D_admin_D00"; 
}