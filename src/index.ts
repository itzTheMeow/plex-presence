import { Client } from "discord-rpc";
import { config } from "./config";

const rpc = new Client({ transport: "websocket" });

rpc.on("ready", () => {
  console.log("RPC Ready!");
});

rpc.login({
  clientId: config.clientID,
  scopes: ["rpc", "rpc.api"],
});
