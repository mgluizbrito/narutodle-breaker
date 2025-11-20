chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "get_cipher") {

        const raw = localStorage.getItem('classic_today_answer');
        const clean = raw ? raw.replace(/^"|"$/g, '') : null;
        
        sendResponse({ cipher: clean });
    }
});