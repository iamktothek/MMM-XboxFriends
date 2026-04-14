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
        headers: { "X-Authorization": token }
      });
      const data = await response.json();
      // Filter for online only
      const online = data.people.filter(p => p.presenceState === "Online");
      this.sendSocketNotification("XBOX_DATA_RESULT", online);
    } catch (e) {
      console.error("[MMM-XboxFriends] API Error:", e);
    }
  }
});