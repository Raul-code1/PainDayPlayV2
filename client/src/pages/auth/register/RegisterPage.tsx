import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { SharedFormStructure } from '../components';
import { UserRegisterInput } from '../../../models/user.types';
import { useUserRegisterRequestMutation } from '../../../redux/services/authApi';
import { useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserRegisterInput>();

  const [userRegisterRequest, { isLoading }] = useUserRegisterRequestMutation();
  const { user } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  function onSubmit(formData: UserRegisterInput) {
    const { password, passwordConfirmation } = formData;
    if (password !== passwordConfirmation) {
      return toast.error('Passwords do not match');
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    userRegisterRequest(formData).catch((err) => {
      toast.error('Something went wrong');
    });
  }

  useEffect(() => {
    if (user.isAuthenticated) {
      setTimeout(() => {
        navigate('/companies');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <SharedFormStructure title="Sign up" path="/auth" linkText="Already have an account?">
      <form onSubmit={handleSubmit(onSubmit)} className="section ">
        <label htmlFor="name">Name</label>
        <input
          className={` ${errors.name ? 'input-error' : ''}`}
          {...register('name', { required: true })}
          type="text"
          id="name"
        />
        <label htmlFor="email">Email</label>
        <input
          className={` ${errors.email && 'input-error'}`}
          {...register('email', {
            required: true,
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email address',
            },
          })}
          id="email"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className={` ${errors.password && 'input-error'}`}
          {...register('password', { required: true, minLength: 6 })}
          id="password"
          type="password"
        />
        {errors.password && <span className="form-error-msg">Password to short - should be 6 characters minimum</span>}
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          className={` ${errors.passwordConfirmation && 'input-error'}`}
          {...register('passwordConfirmation', { required: true })}
          id="passwordConfirmation"
          type="password"
        />
        <button disabled={isLoading} className="btn">
          Sing up
        </button>
      </form>
    </SharedFormStructure>
  );
}
