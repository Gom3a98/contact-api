"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./config/logger"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const app = (0, express_1.default)();
let port = Number(process.env.PORT || 4000);
app.listen(port, () => {
    logger_1.default.info(`App is running at http://localhost:${port}`);
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.json());
app.use("/api", routes_1.default);
exports.default = app;
