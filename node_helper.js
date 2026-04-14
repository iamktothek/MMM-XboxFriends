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

      if (data.content && data.content.people) {
        const allFriends = data.content.people;
        const onlineFriends = allFriends.filter(p => p.presenceState === "Online");
        
        // Send a payload containing the online array and the total length
        this.sendSocketNotification("XBOX_DATA_RESULT", {
          online: onlineFriends,
          totalCount: allFriends.length
        });
      } else {
        this.sendSocketNotification("XBOX_DATA_RESULT", { online: [], totalCount: 0 });
      }
    } catch (e) {
      console.error("[MMM-XboxFriends] API Error:", e);
    }
  }
});
