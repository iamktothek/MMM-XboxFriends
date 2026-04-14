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

   ```bash
   git clone [https://github.com/iamktothek/MMM-XboxFriends.git](https://github.com/iamktothek/MMM-XboxFriends.git)
   ```
Enter the module folder and install dependencies:

   ```bash
   cd MMM-XboxFriends
   npm install
   ```

Getting your Xbox API Key (xbl.io)
This module requires a free API key from OpenXBL to access Xbox Live data safely.

1. Go to xbl.io.

2. Login with your Microsoft/Xbox account.

3. Once logged in, go to your Dashboard.

4. You will see an API Key (a long string of letters and numbers). Copy this key.

Configuration
Add the following to the modules array in your config/config.js file:

   ```bash
   JavaScript
   {
     module: "MMM-XboxFriends",
     position: "top_right", // Recommended position
     config: {
       apiKey: "YOUR_XBL_IO_API_KEY", // Paste your key here
       updateInterval: 120000        // Refresh rate in milliseconds (Default: 2 mins)
     }
   },
   ```

Dependencies
node-fetch: Used for backend API requests.

FontAwesome: Used for the Xbox and Headset icons (standard with MagicMirror).

License
MIT


---
