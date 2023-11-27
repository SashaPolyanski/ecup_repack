import {FC} from 'react'
import {FormFieldString} from "@/shared/ui/Forms/types.ts";
import {TextField} from "@mui/material";


export const StringField: FC<FormFieldString> = ({name, label, value = '', onChange}) => {
  return (
    <TextField
      label={label}
      fullWidth
      name={name}
      value={value}
      onChange={onChange}/>
  );
};

