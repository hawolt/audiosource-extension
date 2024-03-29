document.addEventListener('DOMContentLoaded', function () {
    var textField = document.getElementById('textField')
    var toggleVisibilityButton = document.getElementById('toggleVisibilityButton')
    var eyeIcon = document.getElementById('eyeIcon')
    var copyToClipboardButton = document.getElementById('copyToClipboardButton')
    var toggleSettingButton = document.getElementById('toggleSettingButton')
    var settingIndicator = document.getElementById('settingIndicator')
    var isTextFieldVisible = false
    var active = false

    setupSourceValue(textField)
    setupSettingValue()

    var versionElement = document.getElementById('extensionVersion');
    browser.runtime.sendMessage({ action: "getVersion" }, function (response) {
        if (response && response.version) {
            versionElement.textContent = versionElement.textContent + response.version;
        } else {
            console.error("Failed to get extension version");
        }
    });

    toggleVisibilityButton.addEventListener('click', function () {
        isTextFieldVisible = !isTextFieldVisible
        if (isTextFieldVisible) {
            textField.type = 'text'
            eyeIcon.classList.remove('fa-eye-slash')
            eyeIcon.classList.add('fa-eye')
        } else {
            textField.type = 'password'
            eyeIcon.classList.remove('fa-eye')
            eyeIcon.classList.add('fa-eye-slash')
        }
    })

    copyToClipboardButton.addEventListener('click', function () {
        if (isTextFieldVisible) {
            textField.select()
            document.execCommand('copy')
        } else {
            var textToCopy = textField.value
            navigator.clipboard.writeText(textToCopy).then(function () {
                console.log('Text copied to clipboard: ' + textToCopy)
            }).catch(function (error) {
                console.error('Error copying text: ', error)
            })
        }
    })

    toggleSettingButton.addEventListener('click', function () {
        active = !active
        chrome.storage.sync.set({ 'active': active }, function () {
            updateSettingIndicator(active)
            chrome.storage.sync.get('hymnify_id', function (items) {
                var userid = items.hymnify_id
                fetch('https://audio-extension.hawolt.com/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: (active ? "extension active" : "extension currently not active"), token: userid }),
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.log(error))
            })
        })
    })

    function setupSourceValue(textField) {
        chrome.storage.sync.get('hymnify_id', function (items) {
            var userid = items.hymnify_id
            if (userid) {
                textField.value = "https://audio-extension.hawolt.com/status/" + userid
            }
        })
    }

    function setupSettingValue() {
        chrome.storage.sync.get('active', function (items) {
            settingValue = items.active || false
            updateSettingIndicator(settingValue)
        })
    }

    function updateSettingIndicator(settingValue) {
        if (settingValue) {
            settingIndicator.style.backgroundColor = '#33cc33'
        } else {
            settingIndicator.style.backgroundColor = 'red'
        }
        var indicatorColor = settingValue ? '#33cc33' : 'red'
        settingIndicator.style.boxShadow = '0 0 5px 2px ' + indicatorColor
    }
})
