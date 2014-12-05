// Called when the url of a tab changes.
function checkMatchesUrl(tabId, changeInfo, tab) {
    'use strict';
    var manifest = chrome.runtime.getManifest();
    var matchesUrl = manifest.content_scripts[0].matches[0].slice(0, -1);
        console.log("checkForValidUrl");
    if (tab.url.indexOf(matchesUrl) > -1) {
        // ... show the page action.
        chrome.pageAction.show(tabId);
    }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkMatchesUrl);
