// todo add custom handling for spotify, make this code less messy

console.log("i am running")

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    if (message.action === "audio-detected") {
        sendTabUrlToServer(message.url);
    }
});

function sendTabUrlToServer(url) {
    browser.storage.sync.get('active').then(function(items) {
        const active = items.active || false;
        if (active) {
            browser.storage.sync.get('hymnify_id').then(function(items) {
                const userid = items.hymnify_id;
                fetch('https://audio-extension.hawolt.com/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: url, token: userid }),
                })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.log(error));
            });
        }
    });
}

function grab() {
    return "https://soundcloud.com" + document
        .querySelector(
            "#app > div.playControls.g-z-index-control-bar.m-visible > section > div > div.playControls__elements > div.playControls__soundBadge > div > div.playbackSoundBadge__titleContextContainer > div > a"
        )
        .getAttribute("href");
}

let href = "";
function check() {
    setInterval(() => {
        browser.storage.sync.get('active').then(function(items) {
            const active = items.active || false;
            if (!active) {
                href = "";
            } else {
                const current = grab();
                if (current !== null && current !== href) {
                    sendTabUrlToServer(current);
                    href = current;
                }
            }
        });
    }, 1000);
}

if (window.location.href.includes('soundcloud.com')) {
    check();
}