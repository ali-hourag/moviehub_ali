import { Request, Response, NextFunction } from 'express'

export const checkYear = (req: Request, res: Response, next: NextFunction) => {

    const { year } = req.body;
    if (year > 2023) {
        res.status(400).send({ error: 'Incorrect year entered.' });
        return;
    }
    next();
}