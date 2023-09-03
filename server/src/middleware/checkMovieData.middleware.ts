import { Request, Response, NextFunction } from 'express'

export const checkMovieData = (req: Request, res: Response, next: NextFunction) => {

    const { year, name, score } = req.body;
    if (year && year > 2023) {
        res.status(400).send({ error: 'Incorrect year entered.' });
        return;
    }
    if (name && (name.length < 2 || name.length > 25)) {
        res.status(400).send({ error: 'Name length invalid.' });
        return;
    }
    if (score && (score > 10 || score < 0)) {
        res.status(400).send({ error: 'Invalid score.' });
        return;
    }
    next();
}