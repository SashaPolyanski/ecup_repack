import {FC, ReactNode} from 'react'
import {Box, Dialog, DialogTitle, IconButton} from "@mui/material";
import styled from "@emotion/styled";
import {useTheme} from "@emotion/react";
import {transientOptions} from "@utils";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";
import CloseIcon from '@mui/icons-material/Close'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title: string
  width: number
  height: number
  showCloseIcon?: boolean
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
const ButtonWrapper = styled(IconButton)`
  position: absolute;
  right: 20px;
  top: 33px;
  width: ${({theme: {spacing}}) => spacing(4)};
`
const ContentContainer = styled(Box)`
  padding: 0 40px;
  margin-top: 20px;
  margin-bottom: 36px;
  height: 100%;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    padding: 0 10px;
    margin-top: 10px;
    margin-bottom: 0px;
  }
`
const ModalTitle = styled(DialogTitle)`
  margin-top: 20px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    margin-top: 0px;
  }
`
export const Modal: FC<ModalProps> = ({onClose, open, children, title, width, height, showCloseIcon}) => {
  const theme = useTheme()
  return (
    <ModalContainer open={open} onClose={onClose} $width={width} $height={height}>
      {showCloseIcon ? <ButtonWrapper onClick={onClose}>
        <CloseIcon htmlColor={theme.palette.text.primary}/>
      </ButtonWrapper> : null}
      <ModalTitle>
        {title}
      </ModalTitle>
      <ContentContainer>
        {children}
      </ContentContainer>
    </ModalContainer>
  );
};
