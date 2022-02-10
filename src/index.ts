import { Client } from "discord-rpc";
import { config } from "./config";
import axios from "axios";
import { readFileSync, writeFileSync } from "fs";
import { PlexState } from "./PlexStructures";

const passwd = readFileSync("passwd").toString().slice();

const rpc = new Client({ transport: "ipc" });
const start = Date.now();

axios
  .post(
    `https://plex.tv/users/sign_in.json`,
    `user%5Blogin%5D=${config.email}&user%5Bpassword%5D=${passwd}`,
    {
      method: "POST",
      headers: {
        "X-Plex-Client-Identifier": "PlexampDiscordPresence",
        "X-Plex-Product": "Plexamp Discord Presence",
        "X-Plex-Version": "0.0.1",
      },
    }
  )
  .then((data) => {
    try {
      let authToken = data.data.user.authToken;
      if (!authToken) return console.error("No auth token.");
      console.log("Authenticated with plex!");

      let lastUpdated: PlexState;
      let playerVersion = "Plexamp";

      function clear() {
        rpc.setActivity({
          largeImageKey: "logo",
          largeImageText: playerVersion,
          details: "Browsing Music",
          startTimestamp: start,
        });
      }

      async function update() {
        try {
          let plexData = await axios.get(`${config.url}/status/sessions?X-Plex-Token=${authToken}`);

          let plex = plexData.data.MediaContainer.Metadata as PlexState[];
          let playing = plex?.find((p) => p.User.title == config.username);
          if (!playing) return clear();
          playerVersion = `Plexamp ${playing.Player.version}`;

          let song = playing.Media[0];
          let songPart = song?.Part[0];
          if (!song || !songPart) return clear();

          if (
            lastUpdated &&
            playing.thumb == lastUpdated.thumb &&
            playing.Player.state == lastUpdated.Player.state
          )
            return;

          rpc.setActivity({
            details: `Playing ${playing.title || playing.parentTitle} - ${playing.originalTitle}`,
            state: `on ${playing.parentTitle} (${playing.parentYear})`,
            largeImageKey: playing.parentThumb
              ? `${config.url}${playing.parentThumb}?X-Plex-Token=${authToken}`
              : "logo",
            largeImageText: playerVersion,
            startTimestamp: start,
          });
          lastUpdated = { ...playing };
        } catch (e) {
          console.error(e);
        }
      }

      rpc.on("ready", () => {
        console.log(`RPC Ready!\nLogged in as ${rpc.user.username}.`);
        update();
        setInterval(update, 1500);
      });

      rpc.login({
        clientId: "941085277458399272",
      });
    } catch (e) {
      console.error(e, JSON.stringify(data.data));
    }
  });
