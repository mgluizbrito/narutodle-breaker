const KEYS = ['QhDZJfngdx', 'D5XCtTOObw'];

document.addEventListener('DOMContentLoaded', () => {
    const modes = ['classic', 'jutsu', 'quote', 'eye'];

    modes.forEach(mode => {
        const btn = document.getElementById(`btn-${mode}`);
        if (btn) btn.addEventListener('click', () => handleSolve(mode));
    });
});

function handleSolve(mode) {
    const statusMsg = document.getElementById('status-msg');
    const resultArea = document.getElementById('result-area');
    const btn = document.getElementById(`btn-${mode}`);
    
    // Reset UI
    statusMsg.innerText = "Invoking response...";
    statusMsg.style.color = "#ff9900";
    resultArea.classList.add('hidden');
    if(resultArea) {
        resultArea.classList.add('hidden'); 
        resultArea.classList.remove('show');
    }
    btn.classList.add('glow-effect');
    setTimeout(() => btn.classList.remove('glow-effect'), 1000);

    executeExtensionLogic(mode);
}

function executeExtensionLogic(mode) {

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const activeTab = tabs[0];
        const statusMsg = document.getElementById('status-msg');
        
        if (!activeTab.url.includes("narutodle.net")) {
            statusMsg.innerText = "❌ Enter the site Narutodle.net!";
            statusMsg.style.color = "#ff4444";
            return;
        }
        
        chrome.tabs.sendMessage(activeTab.id, {action: "get_cipher", mode: mode}, (response) => {
            
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                updateStatus("Error: Reload the game page.", "#ff4444");
                return;
            }

            if (response && response.cipher) {
                decryptAndShow(response.cipher, mode);
                updateStatus("Jutsu performed successfully!", "#4ade80");

            } else {
                updateStatus(`First enter game mode "${mode.toUpperCase()}" to load the answer `, "#ff4444");
                console.log('Empty response:', response);
            }
        });
    });
}


function decryptAndShow(cipher, mode) {
    let foundName = null;

    if (typeof CryptoJS === 'undefined') {
        updateStatus("Error: CryptoJS not loaded.", "red");
        return;
    }

    KEYS.forEach(key => {
        try {
            const bytes = CryptoJS.AES.decrypt(cipher, key);
            const text = bytes.toString(CryptoJS.enc.Utf8);
            if (text.length > 0) foundName = text;

        } catch (e) { /* Chave errada, continua tentando */ }
    });

    if (foundName) {
        showResult(foundName, mode);
    } else {
        updateStatus("Decryption failed (Old keys?)", "orange");
    }
}

function showResult(text, mode) {
    const resultArea = document.getElementById('result-area');
    const nameElement = document.getElementById('character-name');
    const labelElement = document.getElementById('mode-label');

    if(nameElement) nameElement.innerText = text;
    if(labelElement) labelElement.innerText = mode.toUpperCase();
    
    if(resultArea) {
        resultArea.classList.remove('hidden');
        resultArea.classList.add('show');
    }
}

function updateStatus(msg, color) {
    const el = document.getElementById('status-msg');
    if(el) {
        el.innerText = msg;
        el.style.color = color;
    }
}