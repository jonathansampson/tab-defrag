// Handle clicks on the in-browser icon
chrome.browserAction.onClicked.addListener(() => {

    // Get all tabs for the current window
    chrome.tabs.query({ currentWindow: true }, tabs => {

        // Create an array of tab IDs, and URLs
        let ids = tabs.map(tab => [ tab.id, new URL(tab.url) ])

        // Sort the aforementioned array by comparing URLs
        // TODO: Add option for sorting by eTLD or eTLD+1, etc.
        let newOrder = ids.sort((a, b) => a[1].host > b[1].host ? -1 : 1)

        // Cycle through the resulting array
        newOrder.forEach((tab, index) => {

            // And move each tabID to its corresponding index of the newOrder array
            chrome.tabs.move(tab[0], { index })

        })

    })

})