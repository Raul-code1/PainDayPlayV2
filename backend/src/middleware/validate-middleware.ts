/* eslint-disable consistent-return */
import { Response, Request, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

function validateFields(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).send(error.issues);
      }
    }
  };
}

export default validateFields;
