"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Send {
    static success(res, data, message = 'success') {
        res.status(200).json({
            ok: true,
            message,
            data
        });
        return;
    }
    static error(res, data, message = 'error') {
        res.status(500).json({
            ok: false,
            message,
            data
        });
        return;
    }
    static forbidden(res, data, message = 'forbidden') {
        res.status(403).json({
            ok: false,
            message,
            data
        });
        return;
    }
    static notfound(res, data, message = 'notfound') {
        res.status(404).json({
            ok: false,
            message,
            data
        });
        return;
    }
    static validationerror(res, xyz) {
        res.status(422).json({
            ok: false,
            message: "Validation error",
            xyz
        });
        return;
    }
    static unauthorized(res, data, message = "unauthorized") {
        res.status(401).json({
            ok: false,
            message,
            data
        });
        return;
    }
    static badrequest(res, data, message = "badrequest") {
        res.status(400).json({
            ok: false,
            message,
            data
        });
        return;
    }
}
exports.default = Send;
//# sourceMappingURL=response.utils.js.map