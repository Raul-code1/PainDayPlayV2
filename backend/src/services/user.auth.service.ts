/* eslint-disable @typescript-eslint/no-explicit-any */
import UserModel, { UserInput } from '../models/user.model';

async function userRegisterService(userInput: UserInput) {
  try {
    const isFirstAccount = (await UserModel.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await UserModel.create({ ...userInput, role });
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function userLoginService(userInput: Omit<UserInput, 'name'>) {
  const user = await UserModel.findOne({ email: userInput.email });
  if (!user) return false;

  const isPasswordCorrect = await user.comparePassword(userInput.password);
  if (!isPasswordCorrect) return false;

  return user;
}

export { userRegisterService, userLoginService };
