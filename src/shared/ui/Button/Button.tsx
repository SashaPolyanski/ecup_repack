import { FC } from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Preloader } from "@shared";

export const Button: FC<LoadingButtonProps> = ({ children, ...props }) => {
  return (
    <LoadingButton loadingIndicator={<Preloader size={20} />} {...props}>
      {children}
    </LoadingButton>
  );
};
