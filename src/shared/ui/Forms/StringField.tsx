import {FC, useCallback, useState} from 'react'
import {FormFieldString} from "@/shared/ui/Forms/types.ts";
import {IconButton, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTheme} from "@emotion/react";


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
      type={!showPassword ? 'password' : 'text'}
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

