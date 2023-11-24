import {useNavigate} from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate()
  const gotomain = () => {
    navigate('/about')
  }
  return (
    <div>
      main page
      <button onClick={gotomain}>go to about</button>
    </div>
  );
};
