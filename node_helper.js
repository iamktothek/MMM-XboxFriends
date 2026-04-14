const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    if (notification === "GET_XBOX_DATA") {
      this.fetchXbox(payload);
    }
  },

  fetchXbox: async function(token) {
    if (!token) return;
    try {
      const response = await fetch("https://xbl.io/api/v2/friends", {
        headers: { 
          "X-Authorization": token,
          "Accept": "application/json"
        }
      });
      const data = await response.json();

      // Check the new data structure from your Postman test
      if (data.content && data.content.people) {
        const online = data.content.people.filter(p => p.presenceState === "Online");
        this.sendSocketNotification("XBOX_DATA_RESULT", online);
      } else {
        console.error("[MMM-XboxFriends] Data structure mismatch. Received:", data);
        this.sendSocketNotification("XBOX_DATA_RESULT", []);
      }
    } catch (e) {
      console.error("[MMM-XboxFriends] API Error:", e);
    }
  }
});
