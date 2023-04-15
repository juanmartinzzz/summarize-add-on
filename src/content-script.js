const testingMode = false;

// internal onfig
let previousTimeout = null;

// ChatGPT config
// TODO: move to state
const temperature = 0.7;
const model = 'gpt-3.5-turbo';
const completionsEndpoint = 'https://api.openai.com/v1/chat/completions';

/**
 * Summarization
 */
const getChatCompletion = async ({ prompt, summaryLength }) => {
    if (testingMode) {
        return { choices: [{ message: { content: 'Immediate response generated for test mode. Made longer so that it simulates the typical length of a true response from the model. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum.' } }] };
    }

    const content = `${prompt} ${commandMap[summaryLength]}`;
    const apiKey = (await browser.storage.local.get('apiKey')).apiKey;

    const response = await fetch(completionsEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            // temperature,
            messages: [{ role: 'user', content }]
        })
    });

    const data = await response.json();
    console.log({ data });

    return data;
}

const summarize = async ({ summaryLength }) => {
    console.log({state});
    if (state.selectedText === '') {
        return;
    }

    // Set container state to loading
    state.containerElement.setAttribute('state', containerStates.loading);
    console.log('Summarizing...');

    const completion = await getChatCompletion({ prompt: state.selectedText, summaryLength });
    console.log({ completion });

    // Set container element to showingResults
    state.containerElement.setAttribute('state', containerStates.showingResults);

    // Changes the text of the body of the summary card
    showSummary({ completion });
}

// Add an event listener to the document for the selectionchange event
document.addEventListener('selectionchange', () => {

    // Cancel previous timeout to review selection
    clearTimeout(previousTimeout);

    // trigger a future revision of all selectionChanges
    previousTimeout = setTimeout(() => {

        if(state.containerElement.getAttribute('state') === containerStates.loading) {
            return;
        }

        // Set container element to dormant
        state.containerElement.setAttribute('state', containerStates.dormant);
        
        // Get the selected text as a string
        // Sample result from reddit's post menu (Notice words not spaced even though they come from different elements)
        '232 comments sharesavegive awardreportcrosspost'
        // TODO: potentially improve; get elements from window.getSelection(), then traverse list of elements, for each get innerText and implode the list with spaces
        const selectedText = window.getSelection().toString();

        if (selectedText === '') {
            return;
        }

        state.selectedText = selectedText;

        // Set container element to showingActions
        state.containerElement.setAttribute('state', containerStates.showingActions);
    }, 1000);
});
