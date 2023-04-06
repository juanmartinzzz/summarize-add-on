const menuOptionTypes = {
    regular: [commandKeys.regularSmall, commandKeys.regularMedium, commandKeys.regularLarge],
    bullets: [commandKeys.bulletsSmall, commandKeys.bulletsMedium, commandKeys.bulletsLarge],
    simpleWords: [commandKeys.simpleWordsSmall, commandKeys.simpleWordsMedium, commandKeys.simpleWordsLarge],
    mindMap: [commandKeys.mindMapSmall, commandKeys.mindMapMedium, commandKeys.mindMapLarge],
};

const addContainer = () => {
    const container = createElementWithAttributes({type: 'div', attributes: {id: elementIds.summarizeContainer}});

    document.getElementsByTagName('body')[0].prepend(container);
}

const removeElementById = ({ id }) => {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

const getMenuOption = ({}) => {
    const MenuOption = 1;

    return MenuOption;
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
    const card = createElementWithAttributes({type: 'div', attributes: {id: summaryCardElementId, class: 'card'}});
    const header = createElementWithAttributes({type: 'div', attributes: {class: 'header'}});
    const title  = createElementWithAttributes({type: 'div', attributes: {innerText: 'Results by SummarizeGPT'}});
    const closeWindow = getCloseWindowIcon();
    const body = createElementWithAttributes({type: 'div', attributes: {class: 'body'}});

    closeWindow.addEventListener('click', () => removeElementById({ id: summaryCardElementId }));

    if (completion.error) {
        body.innerText = `${completion.error.code}:\n\r${completion.error.message}`;
    } else {
        body.innerText = completion.choices[0].message.content;
    }

    header.appendChild(title);
    header.appendChild(closeWindow);
    card.appendChild(header);
    card.appendChild(body);
    Array.from(document.getElementsByTagName('body'))[0].appendChild(card);
}

const addActionMenu = ({ element }) => {
    const actionMenu = createElementWithAttributes({type: 'div', attributes: {id: actionMenuElementId, class: 'actionMenu'}});

    // Get the selected text as a string
    const selection = window.getSelection();
    const selectedText = selection.toString();

    Object.keys(menuOptionTypes).map(type => {
        const menuOptionGroup = createElementWithAttributes({type: 'div', attributes: {class: 'menuOptionGroup'}});

        menuOptionTypes[type].map(commandKey => {
            const menuOption = createElementWithAttributes({type: 'div', attributes: {class: `menuOption ${commandKey}`}});
            const menuOptionHint = createElementWithAttributes({type: 'div', attributes: {class: `menuOptionHint`, innerText: optionHintMap[commandKey]}});
            menuOption.addEventListener('click', () => summarize({ selectedText, commandKey }));
            
            menuOption.appendChild(menuOptionHint);
            menuOptionGroup.appendChild(menuOption);
        })

        actionMenu.appendChild(menuOptionGroup);
    })

    // element.parentElement.appendChild(actionMenu);
    Array.from(document.getElementsByTagName('body'))[0].appendChild(actionMenu);
}

addContainer();