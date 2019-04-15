import {Request, Response, NextFunction} from "express";

/**
 * Using a factory to handle the try catch block, keeping the controllers cleaner
 * @param handle
 */
export function asyncHandler(handle: (req: Request, res: Response, next?: NextFunction) => Promise<void | Response>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handle(req, res);
        } catch (error) {
            next(error);
        }
    }
}
