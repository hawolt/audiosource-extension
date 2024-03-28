[discord-invite]: https://discord.gg/n5eejXjCQz

[discord-shield]: https://discordapp.com/api/guilds/1130517263280246907/widget.png?style=shield

![Header](https://raw.githubusercontent.com/hawolt/hymnify/main/resources/logo-github.png)

![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faudio-extension.hawolt.com%2Fuser&labelColor=green) ![Endpoint Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faudio-extension.hawolt.com%2Fcounter&labelColor=orange) [ ![discord-shield][] ][discord-invite] [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fhawolt%2Fhymnify&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# **Hymnify Extension**
Hymnify serves to monitor active audio playback across browser tabs, automatically forwarding the URL of any tab streaming audio content to a designated server.

## Features:
 1. **Seamless Audio Tracking:**
 Tracks active audio playback across browser tabs in real-time.
 2. **Automatic URL Forwarding:**
 Automatically forwards the URL of tabs with audio playback to a designated server.
 3. **Privacy Assurance:** 
 No logging or history of forwarded URLs is maintained, and user data remains anonymous.
 4. **Browser Compatibility:**
 Currently compatible with Google Chrome.

## Installation Guide

1. Download the extension files from this GitHub repository. Once downloaded, unzip the file.
2. Open Google Chrome browser and type `chrome://extensions/` in the address bar, then press Enter.
3. In the top right corner of the Extensions page, locate and enable "Developer mode" by toggling the switch.
4. Next, click on the "Load unpacked" button located in the top left corner of the Extensions page.
5. A file dialog will open. Navigate to the folder where you unzipped the extension files and select the folder. Then, click "Select Folder" to load the extension into Chrome.
6. Once the extension is loaded, you should see its icon appear among your browser extensions, usually located to the right of the address bar; otherwise click on the Icon resembling a puzzle piece.
7. To use the extension, click on "Hymnify" and then click on the clipboard icon next to it. This action copies a URL to your clipboard, allowing you to easily share the audio content you are currently listening to.

You have successfully installed the Hymnify Chrome extension.
Enjoy seamless sharing of audio content from your browsing sessions!

---

### Operating the Extension

While simple in design, Hymnify offers essential functionality to enhance your browsing experience:

1.  **Clipboard Button**:
By clicking the Clipboard Button, the URL associated with your current playback is copied directly to your clipboard.
    
2.  **Toggle Button**:
Positioned on the right-hand side, the Toggle Button serves as the primary control mechanism for the extension. When activated (indicated by a green hue), the extension is enabled, allowing it to function. Conversely, deactivating the Toggle Button (indicated by a red hue) turns off the extension, suspending its operations.
    
These intuitive controls ensure effortless management of the extension's functionalities, empowering users to streamline their audio sharing experience with ease. For instance, you can utilize the link provided by Hymnify to integrate a command on your preferred social media platform, as demonstrated in the following example for Nightbot on Twitch
`!commands add !song $(urlfetch LINK_YOU_COPIED_GOES_HERE)`
