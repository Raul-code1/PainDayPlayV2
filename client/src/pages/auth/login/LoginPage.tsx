import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../redux/hooks';
import { useUserLoginRequestMutation } from '../../../redux/services/authApi';
import { SharedFormStructure } from '../components';
import { UserLoginInput } from '../../../models/user.types';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>();

  const [userLoginRequest, { isLoading }] = useUserLoginRequestMutation();
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  function onSubmit(formData: UserLoginInput) {
    userLoginRequest(formData);
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      setTimeout(() => {
        navigate('/companies');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <SharedFormStructure title="Log in" path="/auth/register" linkText="Don't have an account yet?">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: true,
            pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: 'Please enter a valid email' },
          })}
          type="email"
          id="email"
          className={` ${errors.email ? 'input-error' : ''}`}
        />
        <label htmlFor="password">Password</label>
        <input
          {...register('password', { required: true, minLength: 6 })}
          type="password"
          id="password"
          className={` ${errors.password ? 'input-error' : ''}`}
        />
        {errors.password && <span className="form-error-msg">Password to short should be 6 characters minimum</span>}
        <button disabled={isLoading} className="btn">
          Log in
        </button>
      </form>
    </SharedFormStructure>
  );
}
