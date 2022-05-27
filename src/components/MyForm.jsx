import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './MyForm.css';

const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  age: yup
    .number()
    .required()
    .positive()
    .integer()
    .typeError('Age is required'),
  email: yup
    .string()
    .email()
    .required('Email is required')
    .typeError('Must be a valid email address'),
  message: yup.string().required('Message is a required field'),
});

const defaultValues = {
  name: '',
  age: '',
  email: '',
  message: '',
};

export default function MyForm() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { defaultValues },
  });

  const { isDirty, isValid, isSubmitting, errors } = formState;

  const submitFn = (values) => {
    console.log(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div className="container">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" {...register('name')} />
          {errors.name && (
            <label htmlFor="name" role="alert" className="error">
              {errors.name?.message}
            </label>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            min="16"
            max="100"
            name="age"
            id="age"
            {...register('age')}
          />

          {errors.age && (
            <label htmlFor="age" role="alert" className="error">
              {errors.age?.message}
            </label>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" {...register('email')} />
          {errors.email && (
            <label htmlFor="email" role="alert" className="error">
              {errors.email?.message}
            </label>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            name="message"
            id="message"
            {...register('message')}
          />

          {errors.message && (
            <label htmlFor="message" role="alert" className="error">
              {errors.message?.message}
            </label>
          )}
        </div>

        <div className="button-container">
          <button className="btn" type="reset" onClick={() => reset}>
            Reset
          </button>
          <button
            className="btn"
            type="submit"
            disabled={isSubmitting || !isValid || !isDirty}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
