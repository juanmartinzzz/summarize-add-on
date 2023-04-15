const summaryTypes = {
    regular: [commandKeys.regularSmall, commandKeys.regularMedium, commandKeys.regularLarge],
    bullets: [commandKeys.bulletsSmall, commandKeys.bulletsMedium, commandKeys.bulletsLarge],
    simpleWords: [commandKeys.simpleWordsSmall, commandKeys.simpleWordsMedium, commandKeys.simpleWordsLarge],
    mindMap: [commandKeys.mindMapSmall, commandKeys.mindMapMedium, commandKeys.mindMapLarge],
};

const appendContainer = () => {
    const container = createElementWithAttributes({type: 'div', attributes: {id: elementIds.container, state: containerStates.dormant}});
    Array.from(document.getElementsByTagName('body'))[0].prepend(container);

    state.containerElement = container;
}

const appendActionMenu = () => {
    const actionMenu = createElementWithAttributes({type: 'div', attributes: {id: elementIds.actionMenu}});

    // For types of summary (regular, bullet points, mind map, simple words)
    Object.keys(summaryTypes).map(type => {
        const menuOptionGroup = createElementWithAttributes({type: 'div', attributes: {class: 'menuOptionGroup'}});

        // For lenghts of summary
        summaryTypes[type].map(summaryLength => {
            const menuOption = createElementWithAttributes({type: 'div', attributes: {class: `menuOption ${summaryLength}`}});
            const menuOptionHint = createElementWithAttributes({type: 'div', attributes: {class: `menuOptionHint`, innerText: optionHintMap[summaryLength]}});
            menuOption.addEventListener('click', () => summarize({summaryLength}));
            
            menuOption.appendChild(menuOptionHint);
            menuOptionGroup.appendChild(menuOption);
        })

        actionMenu.appendChild(menuOptionGroup);
    })

    state.containerElement.appendChild(actionMenu);
}

const getCloseWindowIcon = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    
    svg.classList.add('iconButton');
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M15 1.5l-1.5-1.5-6.5 6.5-6.5-6.5-1.5 1.5 6.5 6.5-6.5 6.5 1.5 1.5 6.5-6.5 6.5 6.5 1.5-1.5-6.5-6.5z");

    svg.appendChild(path);
    
    return svg;
}

const showSummary = ({ completion }) => {
    if (completion.error) {
        state.summaryCardBodyElement.innerText = `${completion.error.code}:\n\r${completion.error.message}`;
    } else {
        state.summaryCardBodyElement.innerText = completion.choices[0].message.content;
    }
}

const appendLoadingIndicator = () => {
    const loadingIndicator = createElementWithAttributes({type: 'div', attributes: {id: elementIds.loadingIndicator, innerText: 'Loading...'}});

    state.containerElement.appendChild(loadingIndicator);
}

const appendResultsCard = () => {
    const card = createElementWithAttributes({type: 'div', attributes: {id: elementIds.resultsCard, class: 'card'}});
    const header = createElementWithAttributes({type: 'div', attributes: {class: 'header'}});
    const title  = createElementWithAttributes({type: 'div', attributes: {innerText: 'Summary'}});
    const closeWindow = getCloseWindowIcon();
    state.summaryCardBodyElement = createElementWithAttributes({type: 'div', attributes: {class: 'body'}});

    // Change 'state' attribute of container to the element being dormant
    closeWindow.addEventListener('click', () => state.containerElement.setAttribute('state', containerStates.dormant));

    header.appendChild(title);
    header.appendChild(closeWindow);
    card.appendChild(header);
    card.appendChild(state.summaryCardBodyElement);
    
    state.containerElement.appendChild(card);
}

// Add all elements to the container
// They will be hidden or shown as per the container element's 'status' attribute
appendContainer();
appendActionMenu();
appendLoadingIndicator();
appendResultsCard();