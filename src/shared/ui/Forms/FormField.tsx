import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn
} from "react-hook-form";
import {ComponentByType, FormFieldTypeByKey} from "./types";
import {ReactNode, useCallback} from "react";
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {transientOptions} from "@utils";
import {HelperTextWrapper} from "./HelperText";

const FormFieldContainer = styled(Box, transientOptions)<{ $marginBottom?: number }>`
  margin-bottom: ${({$marginBottom}) => $marginBottom ? `${$marginBottom}px` : '12px'};
  width: 100%;`
export type FormFieldType = FormFieldTypeByKey[keyof FormFieldTypeByKey]
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Pick<ControllerProps<TFieldValues, TName>, 'control' | 'defaultValue' | 'name'> & FormFieldType
) => {
  const {
    control,
    name, defaultValue, type, label, marginBottom, helperText, disabled, ...rest
  } = props
  const Component = ComponentByType[type] || ComponentByType.string

  const render = useCallback(
    ({
       field: {name, onBlur, onChange, value}, formState
     }: {
      field: ControllerRenderProps<TFieldValues, TName>
      fieldState: ControllerFieldState
      formState: UseFormStateReturn<TFieldValues>
    }) => {
      const {errors} = formState
      const errorText = errors[`${name}`]?.message as ReactNode
      const helperTextComponent = (
        <HelperTextWrapper
          helperText={errorText || helperText}
        />
      )
      return (
        <FormFieldContainer $marginBottom={marginBottom}>
          <Component
            {...({
              ...rest,
              name,
              value,
              disabled,
              onChange,
              label,
              onBlur,
              helperText: helperTextComponent,
              hasError: !!errorText,
            } as any)}
          />
        </FormFieldContainer>
      )
    }, [Component, disabled, helperText, label, marginBottom, rest])
  return <Controller control={control} name={name} defaultValue={defaultValue} render={render}/>
}
