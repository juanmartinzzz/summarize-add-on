const elementIds = {
    summarizeContainer: 'summarizeContainer',
    summarizeConfigForm: 'summarizeConfigForm',
    summarizeApiKeyInput: 'summarizeApiKeyInput'
}

const commandKeys = {
    regularSmall: 'regularSmall',
    regularMedium: 'regularMedium',
    regularLarge: 'regularLarge',
    bulletsSmall: 'bulletsSmall',
    bulletsMedium: 'bulletsMedium',
    bulletsLarge: 'bulletsLarge',
    simpleWordsSmall: 'simpleWordsSmall',
    simpleWordsMedium: 'simpleWordsMedium',
    simpleWordsLarge: 'simpleWordsLarge',
    mindMapSmall: 'mindMapSmall',
    mindMapMedium: 'mindMapMedium',
    mindMapLarge: 'mindMapLarge',
}

const optionHintMap = {
    [commandKeys.regularSmall]: 'Summarize (short)',
    [commandKeys.regularMedium]: 'Summarize (medium)',
    [commandKeys.regularLarge]: 'Summarize (long)',
    [commandKeys.bulletsSmall]: 'Summarize using bullet points (short)',
    [commandKeys.bulletsMedium]: 'Summarize using bullet points (medium)',
    [commandKeys.bulletsLarge]: 'Summarize using bullet points (long)',
    [commandKeys.simpleWordsSmall]: 'Summarize using simple language (short)',
    [commandKeys.simpleWordsMedium]: 'Summarize using simple language (medium)',
    [commandKeys.simpleWordsLarge]: 'Summarize using simple language (long)',
    [commandKeys.mindMapSmall]: 'Summarize using multi-nested bullet points (short)',
    [commandKeys.mindMapMedium]: 'Summarize using multi-nested bullet points (medium)',
    [commandKeys.mindMapLarge]: 'Summarize using multi-nested bullet points (long)',
}

const commandMap = {
    [commandKeys.regularSmall]: '------------- summarize the text in 25 words or less',
    [commandKeys.regularMedium]: '------------- summarize the text in 50 words or less',
    [commandKeys.regularLarge]: '------------- summarize the text',
    [commandKeys.bulletsSmall]: '------------- summarize the text using bullet points, in 50 words or less',
    [commandKeys.bulletsMedium]: '------------- summarize the text using bullet points, in 90 words or less',
    [commandKeys.bulletsLarge]: '------------- summarize the text using bullet points',
    [commandKeys.simpleWordsSmall]: '------------- explain this text to me like I was a 10 year old child, in 25 words or less',
    [commandKeys.simpleWordsMedium]: '------------- explain this text to me like I was a 10 year old child, in 50 words or less',
    [commandKeys.simpleWordsLarge]: '------------- explain this text to me like I was a 10 year old child',
    [commandKeys.mindMapSmall]: '------------- summarize the text using a text-based mind map using nested bullet points, in 50 words or less',
    [commandKeys.mindMapMedium]: '------------- summarize the text using a text-based mind map using nested bullet points, in 90 words or less',
    [commandKeys.mindMapLarge]: '------------- summarize the text using a text-based mind map using nested bullet points',
}