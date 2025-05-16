"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wormhole_connect_1 = require("@wormhole-foundation/wormhole-connect");
// Existing DOM element where you want to mount Connect
var container = document.getElementById('bridge-container');
(0, wormhole_connect_1.wormholeConnectHosted)(container);
