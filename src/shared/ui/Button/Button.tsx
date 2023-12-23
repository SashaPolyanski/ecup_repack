import {FC} from 'react'
import {LoadingButton, LoadingButtonProps} from "@mui/lab";


export const Button: FC<LoadingButtonProps> = ({children, ...props}) => {
  return (
    <LoadingButton {...props}>
      {children}
    </LoadingButton>
  );
};
