import {FC, useMemo} from 'react'
import {useTranslation} from "react-i18next";
import descImage from '@assets/homeImage.png'
import styled from "@emotion/styled";
import {MainDescriptionText} from "./MainDescriptionText";
import {Box} from "@mui/material";

type MainDescriptionProps = {}
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const DescriptionContainer = styled(Box)`
  display: flex;
  width: 100%;
`
export const MainDescription: FC<MainDescriptionProps> = ({}) => {
  const {t} = useTranslation('common')
  const descriptionItems = useMemo(() => {
    return [
      {id: 1, title: t('inYourFreeTime'), desc: t('inYourFreeTimeDesc')},
      {id: 2, title: t('getPrizes'), desc: t('getPrizesDesc')},
      {id: 3, title: t('winAndStronger'), desc: t('winAndStrongerDesc')},
      {id: 4, title: t('joinCommunity'), desc: t('joinCommunityDesc')},
    ]
  }, [t])
  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Box>
        <Image src={descImage}/>
      </Box>
      <DescriptionContainer>
        <Box sx={{maxWidth: '700px'}}>
          {descriptionItems.map(({desc, title, id}) => <MainDescriptionText
            key={id}
            title={title}
            desc={desc}
            id={id}/>)}
        </Box>
      </DescriptionContainer>
    </Box>
  );
};
