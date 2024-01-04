import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import bgImage from "@assets/homeBg3.webp";
import { useTranslation } from "react-i18next";

const Container = styled(Box)`
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 30px;
`;
const ImageContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background-image: url(${bgImage});
  background-position: center;
  background-size: cover;
  box-shadow: inset 100px -20px 200px 0px rgb(23, 28, 38);
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    height: 350px;
  }
`;
const ImageContentContainer = styled(Box)`
  width: 90%;
  margin: 0 auto;
  padding-top: 10%;
  padding-bottom: 20px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 80%;
  }
`;
const Title = styled(Typography)`
  font-size: 55px;
  font-weight: 700;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    font-size: 30px;
  }
`;

const SubTitle = styled(Typography)`
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 40px;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    font-size: 17px;
  }
`;
export const MainImage = () => {
  const { t } = useTranslation("common");
  return (
    <Container>
      <ImageContainer>
        <ImageContentContainer>
          <Title>{t("amateurESport")}</Title>
          <Title>{t("league")}</Title>
          <SubTitle>{t("weWillEsport")}</SubTitle>
          <Button variant={"contained"}>Complete today</Button>
        </ImageContentContainer>
      </ImageContainer>
    </Container>
  );
};
