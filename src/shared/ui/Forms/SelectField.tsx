import {FC} from 'react'
import {TextField} from "@mui/material";
import {FormFieldString} from "@/shared/ui/Forms/types.ts";


export const SelectField: FC<FormFieldString> = ({name, label, value, onChange}) => {
  return (
    <TextField label={label} fullWidth name={name} value={value} onChange={onChange}/>
  );
};
