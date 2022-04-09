"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const HanldeError_1 = __importDefault(require("./middlewares/HanldeError"));
const Router_1 = __importStar(require("./routes/Router"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.handleError = new HanldeError_1.default();
        this.mainRouter = new Router_1.MainRouter();
        this.config();
        this.app.use('/', Router_1.default);
        this.app.use(this.handleError.genericError);
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
    }
}
exports.App = App;
exports.app = new App().app;
