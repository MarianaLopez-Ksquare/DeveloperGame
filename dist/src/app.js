"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const Admin_routes_1 = require("./routes/Admin.routes");
const User_routes_1 = require("./routes/User.routes");
app.use(express_1.default.json());
app.use('/admin', Admin_routes_1.AdminRouter);
app.use('/users', User_routes_1.UserRouter);
app.get("/", (req, res) => {
    res.send('Server running!');
});
exports.default = app;
