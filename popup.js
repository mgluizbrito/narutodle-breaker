document.getElementById('solve-btn').addEventListener('click', () => {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const activeTab = tabs[0];
        
        if (!activeTab.url.includes("narutodle.net")) {
            document.getElementById('solve-btn').innerText = "Entre no jogo!";
            return;
        }

        chrome.tabs.sendMessage(activeTab.id, {action: "get_cipher"}, (response) => {
            if (response && response.cipher) {
                decryptAndShow(response.cipher);
            } else {
                document.getElementById('solve-btn').innerText = "Erro ao ler dados";
            }
        });
    });
});

function decryptAndShow(cipher) {
    const keys = ['QhDZJfngdx', 'D5XCtTOObw'];
    let foundName = null;

    keys.forEach(key => {
        try {
            const bytes = CryptoJS.AES.decrypt(cipher, key);
            const text = bytes.toString(CryptoJS.enc.Utf8);
            if (text.length > 0) foundName = text;
        } catch (e) { /* ignora */ }
    });

    if (foundName) {
        const resultArea = document.getElementById('result-area');
        const nameElement = document.getElementById('character-name');
        const btn = document.getElementById('solve-btn');

        nameElement.innerText = foundName;
        resultArea.classList.remove('hidden');
        btn.innerText = "Jutsu Completo!";
        btn.style.backgroundColor = "#444";
        btn.style.cursor = "default";
        btn.style.boxShadow = "none";
    }
}