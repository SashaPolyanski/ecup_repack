import {useGlobalPreloader} from "@/Zustand/globalPreloaderStore";
import {Header} from "./Header";
import {useMediaQuery} from "@mui/material";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";
import {MobileHeader} from "./MobileHeader";


export const Navbar = () => {
  const {isLoading} = useGlobalPreloader()
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`)
  return (
    isLoading
      ? null
      : isSmallScreen
        ? <MobileHeader/>
        : <Header/>
  );
};
