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

      // Ensure we can find the friends list regardless of wrapper
      let people = null;
      if (data && data.content && data.content.people) {
        people = data.content.people;
      } else if (data && data.people) {
        people = data.people;
      }

      if (people) {
        // Filter: We show them if presenceState is exactly "Online" (ignoring CAPS)
        const onlineFriends = people.filter(p => {
            return p.presenceState && p.presenceState.toLowerCase() === "online";
        });
        
        this.sendSocketNotification("XBOX_DATA_RESULT", {
          online: onlineFriends,
          totalCount: people.length
        });
      } else {
        console.error("[MMM-XboxFriends] No people array found in API response.");
        this.sendSocketNotification("XBOX_DATA_RESULT", { online: [], totalCount: 0 });
      }
    } catch (e) {
      console.error("[MMM-XboxFriends] API Error:", e);
    }
  }
});
