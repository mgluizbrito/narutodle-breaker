/*
 * Narutodle Multi-Mode Solver Snippet
 * Executes in the browser console (F12) on narutodle.net.
 * Discovers and decrypts answers for all four daily modes (Classic, Jutsu, Quote, Eye).
 */

(function() {
    const CRYPTO_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';

    const DECRYPTION_KEYS = ['QhDZJfngdx', 'D5XCtTOObw'];

    const STORAGE_MAP = {
        'Classic': 'classic_today_answer',
        'Jutsu': 'jutsu_today_answer',
        'Quote': 'quote_today_answer',
        'Eye': 'eye_today_answer'
    };

    const results = {};
    let modesSolved = 0;

    // --- Core Logic Functions ---

    function getCipher(mode) {
        const targetKey = STORAGE_MAP[mode];
        const rawValue = localStorage.getItem(targetKey);

        if (!rawValue) return null;

        // Clean JSON quotes from the stored string: "U2FsdGVkX..." -> U2FsdGVkX...
        return rawValue.replace(/^"|"$/g, '');
    }

    function decryptCipher(cipher) {
        if (typeof CryptoJS === 'undefined') {
            console.error("CryptoJS library not loaded.");
            return null;
        }

        for (const key of DECRYPTION_KEYS) {
            try {
                const bytes = CryptoJS.AES.decrypt(cipher, key);
                const text = bytes.toString(CryptoJS.enc.Utf8);
                if (text.length > 0) return text;
            } catch (e) {
                // Ignore decryption errors (wrong key or corrupted data)
            }
        }
        return null;
    }

    function solveAllModes() {
        console.log("%c--- NARUTODLE NINJA SOLVER ---", "color: #ff9900; font-size: 16px; font-weight: bold;");

        for (const mode in STORAGE_MAP) {
            const cipher = getCipher(mode);

            if (cipher) {
                const answer = decryptCipher(cipher);

                if (answer) {
                    modesSolved++;
                    results[mode] = answer;
                    console.log(`%c[${mode.toUpperCase()}] Answer found: ${answer}`, "color: #38bdf8;");
                } else {
                    results[mode] = 'Decryption Failed (Keys likely changed)';
                    console.warn(`[${mode.toUpperCase()}] Data found, but decryption failed.`);
                }
            } else {
                results[mode] = 'Data not found (Did you open this mode today?)';
                console.log(`[${mode.toUpperCase()}] No data found in LocalStorage.`);
            }
        }

        console.log("\n%c--- FINAL SUMMARY ---", "color: #4ade80; font-weight: bold;");
        console.table(results);

        if (modesSolved > 0) {
            console.log(`%cTotal modes solved: ${modesSolved}`, "color: #4ade80;");
        } else {
            console.log("%cNo answers were solved. Please check the LocalStorage keys or update the DECRYPTION_KEYS.", "color: #f87171;");
        }
    }

    // --- Execution Bootstrap ---

    if (typeof CryptoJS !== 'undefined') {
        // Library is already available, execute immediately
        solveAllModes();
        return;
    }

    // Inject the library script
    console.log("Injecting CryptoJS library...");
    const script = document.createElement('script');
    script.src = CRYPTO_CDN;

    script.onload = () => {
        console.log("Library loaded. Executing solver...");
        solveAllModes();
    };

    script.onerror = () => {
        console.error("Failed to load CryptoJS from CDN.");
    };

    document.head.appendChild(script);

})();