"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var cors_1 = require("hono/cors");
var blog_1 = require("./routes/blog");
var user_1 = require("./routes/user");
var app = new hono_1.Hono();
app.use('/api/*', (0, cors_1.cors)());
app.route("/api/v1/user", user_1.default);
app.route('/api/v1/blog', blog_1.default);
exports.default = app;