import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export const About = () => {
  const navigate = useNavigate()
  const gotomain = () => {
    navigate('/')
  }
  return (
    <div>
      About page
      <Button onClick={gotomain} variant={'contained'} color={'primary'}>go to main</Button>
    </div>
  );
};
