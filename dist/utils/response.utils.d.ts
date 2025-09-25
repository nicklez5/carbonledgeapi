import { Response } from "express";
declare class Send {
    static success(res: Response, data: any, message?: string): void;
    static error(res: Response, data: any, message?: string): void;
    static forbidden(res: Response, data: any, message?: string): void;
    static notfound(res: Response, data: any, message?: string): void;
    static validationerror(res: Response, xyz: Record<string, string[]>): void;
    static unauthorized(res: Response, data: any, message?: string): void;
    static badrequest(res: Response, data: any, message?: string): void;
}
export default Send;
//# sourceMappingURL=response.utils.d.ts.map