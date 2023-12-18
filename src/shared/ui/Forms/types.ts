import {StringField} from "@/shared/ui/Forms/StringField";
import {ComponentType, CSSProperties, ReactNode} from "react";
import {BooleanField} from "@/shared/ui/Forms/BooleanField";
import {TextFieldProps} from "@mui/material";

export type FormFieldCommon = {
  onChange?: (value: any) => void
  onBlur?: () => void
  disabled?: boolean
  styles?: CSSProperties
  className?: string
  required?: boolean
  value?: any
  hidden?: boolean
  hasError?: boolean
  helperText?: ReactNode
  name: string
  label?: string
  marginBottom?: number
}
export type FormFieldString = FormFieldCommon & {
  autoFocus?: boolean
  type: 'string'
  password?: boolean
  variant?: TextFieldProps['variant']
  placeholder?: string
  testId?: string
  size?: TextFieldProps['size']
  backgroundColor?: string
  browserAutoCompleteOff?: boolean
}
export type FormFieldBoolean = FormFieldCommon & {
  type: 'boolean'
  maxLength?: never
}
export type FormFieldTypeByKey = {
  // select: Omit<FormFieldSelect, 'value'>
  string: Omit<FormFieldString, 'value'>
  // text: Omit<FormFieldText, 'value'>
  boolean: Omit<FormFieldBoolean, 'value'>
}

export const ComponentByType: { [K in keyof FormFieldTypeByKey]: ComponentType<FormFieldTypeByKey[K]> } = {
  string: StringField,
  // text: TextareaField,
  // select: SelectField,
  boolean: BooleanField,
}

