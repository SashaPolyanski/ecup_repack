import {FC, memo, ReactNode} from 'react'
import styled from "@emotion/styled";
import {Box} from "@mui/material";

type HelperTextWrapperProps = {
  helperText?: ReactNode
  maxLength?: number
  valueLength?: number
}
const HelperTextContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -23px;
`
const labelStyle = {
  color: '#d32f2f'
}
export const HelperTextWrapper: FC<HelperTextWrapperProps> = memo(
  ({helperText}) => {
    if (!helperText) return null
    return (
      <HelperTextContainer>
        {typeof helperText === 'string' ? (
          <label title={helperText} style={labelStyle}>{helperText}</label>
        ) : (
          helperText
        )}
      </HelperTextContainer>
    )
  }
)
