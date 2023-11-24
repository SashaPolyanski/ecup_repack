import {useNavigate} from "react-router-dom";

export const About = () => {
  const navigate = useNavigate()
  const gotomain = () => {
    navigate('/')
  }
  return (
    <div>
      About page
      <button onClick={gotomain}>go to main</button>
    </div>
  );
};
