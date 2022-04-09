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
const jsonwebtoken_1 = require("jsonwebtoken");
const path = __importStar(require("path"));
const fs = require("fs");
const StatusCodes_1 = __importDefault(require("../interfaces/StatusCodes"));
class JwToken {
    constructor() {
        this.secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), 'utf8');
        this.jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    }
    generate(data) {
        const token = (0, jsonwebtoken_1.sign)(data, this.secret, this.jwtConfig);
        return token;
    }
    validate(token) {
        if (token === undefined) {
            return { status: StatusCodes_1.default.UNAUTHORIZED, response: { error: 'Invalid token' } };
        }
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, this.secret);
            return decoded;
        }
        catch (err) {
            return { status: StatusCodes_1.default.UNAUTHORIZED, response: { error: 'Invalid token' } };
        }
    }
}
exports.default = JwToken;
