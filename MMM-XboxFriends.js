Module.register("MMM-XboxFriends", {
  defaults: {
    apiKey: "",
    updateInterval: 2 * 60 * 1000,
  },

  getStyles: function() {
    return ["font-awesome.css", "MMM-XboxFriends.css"];
  },

  start: function() {
    this.friends = [];
    this.totalFriends = 0; 
    this.getData();
    setInterval(() => this.getData(), this.config.updateInterval);
  },

  getData: function() {
    this.sendSocketNotification("GET_XBOX_DATA", this.config.apiKey);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "XBOX_DATA_RESULT") {
      this.friends = payload.online;
      this.totalFriends = payload.totalCount;
      this.updateDom();
    }
  },

  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.className = "xbox-container";

    // Header logic: x/y count aligned right, color controlled by CSS
    const header = document.createElement("div");
    header.className = "xbox-header";
    
    const countSpan = document.createElement("span");
    countSpan.innerHTML = `${this.friends.length}/${this.totalFriends} Friends Online`;
    
    const headerIcon = document.createElement("i");
    headerIcon.className = "fab fa-xbox header-icon";

    header.appendChild(countSpan);
    header.appendChild(headerIcon);
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

      if (friend.presenceText && friend.presenceText.toLowerCase().includes("party")) {
        const headset = document.createElement("i");
        headset.className = "fas fa-headset party-icon";
        row.appendChild(headset);
      }

      const logo = document.createElement("i");
      logo.className = "fab fa-xbox xbox-logo";
      row.appendChild(logo);

      const img = document.createElement("img");
      img.src = friend.displayPicRaw || "https://via.placeholder.com/50";
      img.className = "avatar";

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
