"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandleError {
    constructor() {
        this.genericError = (err, _req, res, _next) => {
            console.error(err);
            return res.status(500).json({ error: `Erro: ${err.message}` });
        };
    }
}
exports.default = HandleError;
