import {FC, ReactNode} from 'react'
import {Box, Dialog, DialogTitle, useMediaQuery} from "@mui/material";
import styled from "@emotion/styled";
import {useTheme} from "@emotion/react";
import {transientOptions} from "@utils";

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title: string
  width: number
  height: number
}
type ModalContainerProps = {
  $width: number
  $height: number
}
const ModalContainer = styled(Dialog, transientOptions)<ModalContainerProps>`
  .MuiPaper-root {
    border-radius: 8px;
    width: ${({$width}) => ($width ? `${$width}px` : '300px')};
    height: ${({$height}) => ($height ? `${$height}px` : '300px')};
    background-color: ${({theme}) => theme.backgrounds.modalBackground};
  }

  .MuiDialogTitle-root {
    text-align: center;
  }
`
const ContentContainer = styled(Box)`
  padding: 0 40px;
  margin-top: 20px;
  margin-bottom: 36px;
  height: 100%;
`
export const Modal: FC<ModalProps> = ({onClose, open, children, title, width, height}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ModalContainer open={open} onClose={onClose} fullScreen={fullScreen} $width={width} $height={height}>
      <DialogTitle sx={{marginTop: '20px'}}>
        {title}
      </DialogTitle>
      <ContentContainer>
        {children}
      </ContentContainer>
    </ModalContainer>
  );
};
