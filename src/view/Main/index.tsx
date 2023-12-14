import {MainImage} from "./MainImage";
import {MainDescription} from "./MainDescription";
import {Box} from "@mui/material";


export const Main = () => {
  return (
    <Box sx={{height: '100%'}}>
      <MainImage/>
      <MainDescription/>
    </Box>
  );
};
