Module.register("MMM-XboxFriends", {
  defaults: {
    apiKey: "", // Set this in your config/config.js
    updateInterval: 2 * 60 * 1000, // 2 minutes
  },

  getStyles: function() {
    return ["font-awesome.css", "MMM-XboxFriends.css"];
  },

  start: function() {
    this.friends = [];
    this.getData();
    setInterval(() => this.getData(), this.config.updateInterval);
  },

  getData: function() {
    this.sendSocketNotification("GET_XBOX_DATA", this.config.apiKey);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "XBOX_DATA_RESULT") {
      this.friends = payload;
      this.updateDom();
    }
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.className = "xbox-container";

    // Header with Count
    const header = document.createElement("div");
    header.className = "xbox-header";
    header.innerHTML = `<i class="fas fa-users header-icon"></i> <span>${this.friends.length} Friends Online</span>`;
    wrapper.appendChild(header);

    if (this.friends.length === 0) {
      const empty = document.createElement("div");
      empty.className = "dimmed light small";
      empty.innerHTML = "No one is online";
      wrapper.appendChild(empty);
      return wrapper;
    }

    this.friends.forEach(friend => {
      const row = document.createElement("div");
      row.className = "friend-row";

      // Headset Icon (Party Detection)
      if (friend.presenceText && friend.presenceText.toLowerCase().includes("party")) {
        const headset = document.createElement("i");
        headset.className = "fas fa-headset party-icon";
        row.appendChild(headset);
      }

      // Corner Xbox Logo
      const logo = document.createElement("i");
      logo.className = "fab fa-xbox xbox-logo";
      row.appendChild(logo);

      // Avatar
      const img = document.createElement("img");
      img.src = friend.displayPicRaw || "https://via.placeholder.com/50";
      img.className = "avatar";

      // Text Info
      const info = document.createElement("div");
      info.className = "info";
      info.innerHTML = `
        <div class="gamertag">${friend.gamertag}</div>
        <div class="status dimmed xsmall">${friend.presenceState}</div>
        <div class="activity small bright">${friend.presenceText || "Online"}</div>
      `;

      row.appendChild(img);
      row.appendChild(info);
      wrapper.appendChild(row);
    });

    return wrapper;
  }
});