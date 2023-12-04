import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const signUpSchema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required().min(3).max(15),

  password1: yup.string().required(),
  password2: yup.string().oneOf([yup.ref('password1')], 'Passwords must match')
    .required('Confirm password is required'),
}).defined()
export const signUpResolver = yupResolver(signUpSchema)

const signInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).defined()
export const signInResolver = yupResolver(signInSchema)
