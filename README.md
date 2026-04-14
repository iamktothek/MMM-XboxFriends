# MMM-XboxFriends
A Magic Mirror module to display online xbox friends and their status

Markdown
# MMM-XboxFriends

A MagicMirror² module that displays your online Xbox friends in a sleek, dashboard-style card layout. Featuring real-time activity updates, avatar support, and "In-Party" detection.

## Features
* **Live Status:** Updates every 2 minutes.
* **Official UI:** Styled to match the Xbox Fluent design language.
* **Activity Tracking:** Shows exactly what game or app your friends are using.
* **Party Detection:** A pulsing headset icon appears when a friend is in a voice party.
* **Total Count:** Quick-glance header showing how many friends are currently online.

## Installation

1. Navigate to your MagicMirror's modules folder:
   ```bash
   cd ~/MagicMirror/modules
Clone this repository:

Bash
git clone [https://github.com/iamktothek/MMM-XboxFriends.git](https://github.com/iamktothek/MMM-XboxFriends.git)
Enter the module folder and install dependencies:

Bash
cd MMM-XboxFriends
npm install
Getting your Xbox API Key (xbl.io)
This module requires a free API key from OpenXBL to access Xbox Live data safely.

Go to xbl.io.

Login with your Microsoft/Xbox account.

Once logged in, go to your Dashboard.

You will see an API Key (a long string of letters and numbers). Copy this key.

Configuration
Add the following to the modules array in your config/config.js file:

JavaScript
{
  module: "MMM-XboxFriends",
  position: "top_right", // Recommended position
  config: {
    apiKey: "YOUR_XBL_IO_API_KEY", // Paste your key here
    updateInterval: 120000        // Refresh rate in milliseconds (Default: 2 mins)
  }
},
Dependencies
node-fetch: Used for backend API requests.

FontAwesome: Used for the Xbox and Headset icons (standard with MagicMirror).

License
MIT


---

### Pro-Tip for GitHub:
Before you commit and push your code to GitHub, make sure you **do not** include your actual API key in the files. 

1. Create a file named `.gitignore` in your module folder.
2. Add the following line to it:
   ```text
   node_modules/
