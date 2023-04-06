const elementIds = {
    openaiApiKey: 'openaiApiKey',
}

const setInputEvents = async () => {
    const openaiApiKeyInput = document.getElementById(elementIds.openaiApiKey);

    // Set value stored in local memory in the input
    openaiApiKeyInput.value = (await browser.storage.local.get('apiKey')).apiKey;
    
    // When input changes, store it's value in local memory
    openaiApiKeyInput.addEventListener('blur', ({target}) => {
        browser.storage.local.set({apiKey: target.value})
    });
}

setInputEvents();