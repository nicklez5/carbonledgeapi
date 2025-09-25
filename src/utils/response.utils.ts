import { Response } from "express";
class Send{
    static success (res: Response, data: any, message = 'success'){
        res.status(200).json({
            ok: true,
            message,
            data
        });
        return;
    }
    static error (res: Response, data: any, message = 'error'){
        res.status(500).json({
            ok: false,
            message,
            data
        })
        return;
    }
    static forbidden (res:Response, data: any, message = 'forbidden'){
        res.status(403).json({
            ok: false,
            message,
            data
        })
        return;
    }
    static notfound (res:Response, data: any, message = 'notfound'){
        res.status(404).json({
            ok: false,
            message,
            data
        })
        return;
    }
    static validationerror(res: Response, xyz : Record<string, string[]>){
        res.status(422).json({
            ok: false,
            message: "Validation error",
            xyz
        })
        return;
    }
    static unauthorized(res: Response, data: any, message = "unauthorized"){
        res.status(401).json({
            ok: false,
            message,
            data
        })
        return;
    }
    static badrequest(res: Response, data: any, message = "badrequest"){
        res.status(400).json({
            ok: false,
            message,
            data
        })
        return;
    }
    //not found
    //validation error
    //unauthorized
    //bad request
}
export default Send;