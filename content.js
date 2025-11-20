chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "get_cipher") {
        
        const storageMap = {
            'classic': 'classic_today_answer',
            'jutsu': 'jutsu_today_answer',
            'quote': 'quote_today_answer',
            'eye': 'eye_today_answer'
        };


        const targetKey = storageMap[request.mode];
        if (!targetKey) {
            console.error(`Unknown mode or unmapped key: ${request.mode}`);
            sendResponse({ cipher: null });
            return true;
        }

        const raw = localStorage.getItem(targetKey);        
        const clean = raw ? raw.replace(/^"|"$/g, '') : null;
        
        console.log(`[Content Script] Fetching: ${targetKey}, Clean Cipher: ${!!clean}`);
        
        sendResponse({ cipher: clean });
    }
    return true; 
});