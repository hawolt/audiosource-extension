var userid, previous
chrome.storage.sync.get('hymnify_id', function (items) {
    userid = items.hymnify_id
    if (!userid) {
        userid = getRandomToken()
        chrome.storage.sync.set({ hymnify_id: userid }, null)
    }
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "hymnify-version") {
        sendResponse({ version: chrome.runtime.getManifest().version });
    } else if (message.action === "hymnify-id") {
        sendResponse({ id: userid });
    }
});

function debounce(func, wait, immediate) {
    var timeout

    return function executedFunction() {
        var context = this
        var args = arguments

        var later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }

        var callNow = immediate && !timeout

        clearTimeout(timeout)

        timeout = setTimeout(later, wait)

        if (callNow) func.apply(context, args)
    }
}

function query() {
    chrome.tabs.query({}, tabs => {
        let anyTabAudible = false
        tabs.forEach(tab => {
            checkTabForAudio(tab.id)
            if (tab.audible) {
                anyTabAudible = true
            }
        })
        if (!anyTabAudible) {
            // doesnt really work with soundcloud to update url here
        }
    })
}

check = debounce(query, 500)

function getRandomToken() {
    var randomPool = new Uint8Array(32)
    crypto.getRandomValues(randomPool)
    var hex = ''
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16)
    }
    return hex
}

function checkTabForAudio(tabId) {
    chrome.tabs.get(tabId, tab => {
        if (tab.audible && previous != tab.url) {
            previous = tab.url
            if (tab.url.endsWith == 'youtube.com/') {
                //ignore youtube landing page
            } else if (tab.url.includes('soundcloud')) {
                //handled by content.js
            } else {
                chrome.tabs.sendMessage(tabId, { action: "audio-detected", url: tab.url })
            }
        }
    })
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        if (key === 'active') {
            var active = changes[key].newValue
            if (active) {
                check()
            } else {
                previous = ""
            }
        }
    }
})
chrome.tabs.onCreated.addListener(function (tabId) {
    check()
})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    check()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.audible) {
        checkTabForAudio(tabId)
    }
    if (!changeInfo.audible) {
        check()
    }
})
check()