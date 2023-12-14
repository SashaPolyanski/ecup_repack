import {FC} from 'react'
import styled from "@emotion/styled";
import {Box, Typography} from "@mui/material";

type MainDescriptionTextProps = {
  title: string
  desc: string
  id: number
}
const MainDescriptionTitle = styled(Typography)`
  font-size: 35px;
  background: linear-gradient(266deg, #293DFF 0.48%, #45A7D8 39.23%, #45A7D8 61.82%, #293DFF 102.2%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`
const MainDescriptionDesc = styled(Typography)`
  font-size: 18px;
`
export const MainDescriptionText: FC<MainDescriptionTextProps> = ({desc, title, id}) => {
  return (
    <Box mb={6}>
      <MainDescriptionTitle>
        {title}
      </MainDescriptionTitle>
      <MainDescriptionDesc>
        {desc}
      </MainDescriptionDesc>
    </Box>
  );
};
