import {FC} from 'react'
import styled from "@emotion/styled";
import {Box, Typography} from "@mui/material";

type MainDescriptionTextProps = {
  title: string
  desc: string
  id: number
  gradient: string
}
const MainDescriptionTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  &:last-of-type {
    padding-bottom: 40px;
  }
`
const MainDescriptionTitle = styled(Typography)<{ $gradient: string }>`
  font-size: 35px;
  margin-bottom: 20px;
  background: linear-gradient(${({$gradient}) => ($gradient)});
  background-clip: text;
  -webkit-text-fill-color: transparent;
`
const MainDescriptionDesc = styled(Typography)`
  font-size: 18px;
`
export const MainDescriptionText: FC<MainDescriptionTextProps> = ({desc, title, gradient}) => {
  return (
    <MainDescriptionTextContainer>
      <MainDescriptionTitle $gradient={gradient}>
        {title}
      </MainDescriptionTitle>
      <MainDescriptionDesc>
        {desc}
      </MainDescriptionDesc>
    </MainDescriptionTextContainer>
  );
};
