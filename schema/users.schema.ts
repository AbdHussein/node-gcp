import * as yup from 'yup';

/**
 * @openapi
 * components:
 *  schemas:
 *   CreateUserInput:
 *    type: object
 *    required:
 *     - full_name
 *     - email
 *     - password
 *    properties:
 *     full_name:
 *      type: string
 *      default: John Doe
 *     email:
 *      type: string
 *      default: JohnDoe@gmail.com
 *     password:
 *      type: string
 *
 */
export const createUserSchema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8, 'Password length must be 8 characters long').required('Password is required'),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});
