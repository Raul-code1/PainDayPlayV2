import { object, string, TypeOf } from 'zod';

export const userRegisterSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).nonempty(),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password to short - should be  6 characters minimum'),
    passwordConfirmation: string({
      required_error: 'Password Confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const userLoginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password to short - should be  6 characters minimum'),
  }),
});

export type UserRegisterInput = Omit<TypeOf<typeof userRegisterSchema>, 'body.passwordConfirmation'>;
export type UserLoginInput = TypeOf<typeof userLoginSchema>;
