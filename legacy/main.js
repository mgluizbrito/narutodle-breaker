let cryptoJSLoader = document.createElement('script');
cryptoJSLoader.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";

cryptoJSLoader.onload = function() {
    console.log("Decryption library loaded! Attempting to decrypt...");

    const cipher = "U2FsdGVkX1+N/rc9NBV1GNyPctxMLTx3CrCPjoXIVaY=";
    const keys = ["QhDZJfngdx", "D5XCtTOObw"];

    let wasFound = false;

    keys.forEach(key => {
        try {

            let bytes = CryptoJS.AES.decrypt(cipher, key);
            let text = bytes.toString(CryptoJS.enc.Utf8);

            if (text.length > 0) {
                console.log(`%c SUCCESSO! A chave correta é: ${key}`, 'color: green; font-weight: bold; font-size: 14px');
                console.log(`%c PERSONAGEM: ${text}`, 'background: black; color: yellow; font-size: 24px; padding: 10px;');
                alert(`O personagem é: ${text}`);
                wasFound = true;
            }

        } catch (e) {}
    });

    if (!wasFound) console.log("Nenhuma das chaves funcionou. Verifique a cifra ou as chaves");
};

document.head.appendChild(cryptoJSLoader);  