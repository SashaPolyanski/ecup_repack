import styled from "@emotion/styled";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "@/constants/breackpoints";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TournamentTabInfoPrizeComponentContainer = styled(Box)`
  border: 1px solid #4a5568;
  border-top: none;
  padding-left: 20px;
  width: 100%;
  margin-bottom: 40px;
  padding-bottom: 30px;
`;
const OverviewTabContactButton = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 13px 24px;
  border-radius: 25px;
  background: #25a2e0;
  text-decoration: none;

  &:hover {
    background: #25a2e0;
    opacity: 0.8;
  }

  @media (max-width: ${MEDIA_QUERY_MD}px) {
    font-size: 14px;
    height: 40px;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    height: 35px;
  }
`;
export const TournamentInfoContact = () => {
  const { t } = useTranslation("common");
  return (
    <TournamentTabInfoPrizeComponentContainer>
      <Box mt={4}>
        <Typography mb={4} variant={"h6"}>
          {t("sendMessage")}
        </Typography>
        <OverviewTabContactButton
          to={"https://go.ecup.pro/tg-main"}
          target="_blank"
        >
          <TelegramIcon sx={{ marginRight: "7px", verticalAlign: "middle" }} />
          Telegram
        </OverviewTabContactButton>
      </Box>
    </TournamentTabInfoPrizeComponentContainer>
  );
};
