# audiosource-extension

![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faudio-extension.hawolt.com%2Fuser) ![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faudio-extension.hawolt.com%2Fcounter)

this extension tracks if any tab is playing audio and forwards the url of the tab to a server

**currently only compatible with Google Chrome.**

## Installation


1. download this repository and unzip the file
2. open `chrome://extensions/` in Google Chrome
3. in the top right corner enable Developer mode
4. in the top left corner click Load unpacked
4. Navigate to the unzipped folder and hit Select Folder
5. click the little Puzzle piece looking like icon (right of the url bar)
6. Click on Hawolt Audio Scraper and click the Clipboard icon to copy a URL to your clipboard

----

### Controlling the Extension

The extension does not have alot to it
1. Clipboard Button will copy the URL to your Clipboard which holds the URL
2. Toggle Button on the right (green: on, red: off) turns the extension on and off

You can use the specified link to add a command using Nightbot

`!commands add !song $(urlfetch LINK_YOU_COPIED_GOES_HERE)` 

![extension](https://i.hawolt.com/08487fa2aab7c35b20c07aeafb856969d2cb275bc449faadd4d58a2feb35ff33.png)

