// todo add custom handling for spotify, make this code less messy

window.addEventListener('load', function () {
    if (window.location.href.startsWith("https://hymnify.hawolt.com")) {
        chrome.runtime.sendMessage({ action: "hymnify-id" }, function (response) {
            window.postMessage({ type: 'hymnify-loaded', id: response.id }, '*');
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "audio-detected") {
        sendTabUrlToServer(message.url)
    }
})

function sendTabUrlToServer(url) {
    console.log('[hymnify] detected ' + url)
    chrome.storage.sync.get('active', function (items) {
        active = items.active || false
        console.log('[hymnify] active: ' + active)
        if (active) {
            chrome.storage.sync.get('hymnify_whitelist', function (result) {
                var whitelist = (result.hymnify_whitelist || '').split(',').map(word => word.trim());
                console.log('[hymnify] whitelist: ' + whitelist)
                for (var i = 0; i < whitelist.length; i++) {
                    var word = whitelist[i];
                    if (url.includes(word)) {
                        console.log('[hymnify] whitelist match for: ' + word)
                        chrome.storage.sync.get('hymnify_delay', function (result) {
                            var delay = result.hymnify_delay || 0;
                            console.log('[hymnify] update delay: ' + delay)
                            setTimeout(function () {
                                chrome.storage.sync.get('hymnify_id', function (items) {
                                    console.log('[hymnify] forwarding url')
                                    var userid = items.hymnify_id
                                    fetch('https://audio-extension.hawolt.com/update', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ url: url, token: userid }),
                                    })
                                        .then(response => response.text())
                                        .then(data => console.log(data))
                                        .catch(error => console.log(error))
                                })
                            }, delay * 1000);
                        });
                        break;
                    }
                }
            });
        }
    })

}

function grab() {
    return "https://soundcloud.com" + document
        .querySelector(
            "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div.playControls__elements > div.playControls__soundBadge > div > div.playbackSoundBadge__titleContextContainer > div > a"
        )
        .getAttribute("href")
}

function check() {
    setInterval(() => {
        chrome.storage.sync.get('active', function (items) {
            active = items.active || false
            if (!active) {
                href = ""
            } else {
                const current = grab()
                if (current !== null && current !== href) {
                    sendTabUrlToServer(current)
                    href = current
                }
            }
        })
    }, 1000)
}

if (window.location.href.includes('soundcloud.com')) {
    check()
}
