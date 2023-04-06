const testingMode = false;

// internal onfig
let previousTimeout = null;
const actionMenuElementId = 'summarizeGPTActionMenu';
const summaryCardElementId = 'summarizeGPTSummaryCard';

// ChatGPT config
// TODO: move to state
const temperature = 0.7;
const model = 'gpt-3.5-turbo';
const completionsEndpoint = 'https://api.openai.com/v1/chat/completions';

/**
 * Summarization
 */
const getChatCompletion = async ({ prompt, commandKey }) => {
    if (testingMode) {
        return { choices: [{ message: { content: 'Immediate response generated for test mode. Made longer so that it simulates the typical length of a true response from the model. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum. Lolem ipsum dolot sid amet in redditans upvotarum.' } }] };
    }

    const content = `${prompt} ${commandMap[commandKey]}`;
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

const summarize = async ({ selectedText, commandKey }) => {
    if (selectedText === '') {
        return;
    }

    console.log('Summarizing...');
    const completion = await getChatCompletion({ prompt: selectedText, commandKey });
    console.log({ completion });

    removeElementById(summaryCardElementId);
    showSummary({ completion });
}

// Add an event listener to the document for the selectionchange event
document.addEventListener('selectionchange', () => {

    // cancel previous timeout to review selection
    clearTimeout(previousTimeout);

    // trigger a future revision of all selectionChanges
    previousTimeout = setTimeout(() => {
        // Get the selection object
        const selection = window.getSelection();

        // Get the selected text as a string
        // Sample result from reddit's post menu: "232 comments sharesavegive awardreportcrosspost"
        // Words not spaced even though they come from different elements
        // TODO: potentially improve; traverse list of elements, for each get innerText
        const selectedText = selection.toString();

        removeElementById({ id: actionMenuElementId });

        if (selectedText === '') {
            return;
        }

        addActionMenu({ element: selection.anchorNode });
    }, 1000);
});
