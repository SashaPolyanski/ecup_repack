import {useMemo} from 'react'
import {useTranslation} from "react-i18next";
import descImage from '@assets/homeImage.webp'
import styled from "@emotion/styled";
import {MainDescriptionText} from "./MainDescriptionText";
import {Box} from "@mui/material";
import {MEDIA_QUERY_LG} from "@/constants/breackpoints";

const ImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    display: none;
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;


`
const DescriptionContainer = styled(Box)`
  display: flex;
  width: 100%;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    justify-content: center;
    margin-left: 8px;
  }
`
const MainDescriptionContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 50px;
`
export const MainDescription = () => {
  const {t} = useTranslation('common')
  const descriptionItems = useMemo(() => {
    return [
      {
        id: 1,
        title: t('inYourFreeTime'),
        desc: t('inYourFreeTimeDesc'),
        gradient: '45deg, #293DFF 0%, #45a7d8 50%, #293DFF 100%'
      },
      {
        id: 2,
        title: t('getPrizes'),
        desc: t('getPrizesDesc'),
        gradient: '90deg, #f9dd4d 0%, #E75656 100%'
      },
      {
        id: 3,
        title: t('winAndStronger'),
        desc: t('winAndStrongerDesc'),
        gradient: '90deg, #f45a76 0%, #e756de 100%'
      },
      {
        id: 4,
        title: t('joinCommunity'),
        desc: t('joinCommunityDesc'),
        gradient: '90deg, #fff 100%, #e756de 100%'
      },
    ]
  }, [t])
  return (
    <MainDescriptionContainer>
      <ImageContainer>
        <Image src={descImage}/>
      </ImageContainer>
      <DescriptionContainer>
        <Box sx={{maxWidth: '700px'}}>
          {descriptionItems.map(({desc, title, id, gradient}) => <MainDescriptionText
            key={id}
            title={title}
            gradient={gradient}
            desc={desc}
            id={id}/>)}
        </Box>
      </DescriptionContainer>
    </MainDescriptionContainer>
  );
};
