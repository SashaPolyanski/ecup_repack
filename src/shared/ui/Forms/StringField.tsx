import {FC, useCallback, useState} from 'react'
import {FormFieldString} from "./types.ts";
import {IconButton, TextField as TextFieldMui} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTheme} from "@emotion/react";
import styled from "@emotion/styled";

const TextField = styled(TextFieldMui)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  input::placeholder {
    transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
    background-color: transparent !important;
  }`
export const StringField: FC<FormFieldString> = ({
                                                   name,
                                                   label,
                                                   value = '',
                                                   onChange,
                                                   helperText,
                                                   hasError,
                                                   disabled, password
                                                 }) => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = useCallback(() => {
    setShowPassword((p) => !p)
  }, [])
  return (
    <TextField
      label={label}
      fullWidth
      type={password && !showPassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: password ? (
          <IconButton onClick={toggleShowPassword} edge='end'>
            {showPassword ? <VisibilityOff htmlColor={theme.palette.text.primary}/> :
              <Visibility htmlColor={theme.palette.text.primary}/>}
          </IconButton>
        ) : null
      }}
      name={name}
      value={value}
      helperText={helperText}
      disabled={disabled}
      error={!!hasError}
      onChange={onChange}/>
  );
};

