import {FC} from 'react'
import styled from "@emotion/styled";
import {Box} from "@mui/material";
import {transientOptions} from "@utils";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type BannerProps = {
  bannerImage?: string
}
const BannerContainer = styled(Box, transientOptions)<{ $backgroundImage?: string }>`
  width: 100%;
  height: 500px;
  background-image: ${({$backgroundImage}) => $backgroundImage && `url(${$backgroundImage})`};
  background-position: center;
  background-size: cover;
  box-shadow: inset 100px -100px 200px 0px rgb(23, 28, 38);
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    height: 350px;
  }
`
export const Banner: FC<BannerProps> = ({bannerImage}) => {
  return <BannerContainer $backgroundImage={bannerImage}/>
};
