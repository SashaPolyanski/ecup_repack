import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { UserInfoUploadAvatar } from "./UserInfoUploadAvatar";
import { UserInfoForm } from "./UserInfoForm";
import { UserBalance } from "./UserBalance";
import { MEDIA_QUERY_LG, MEDIA_QUERY_SM } from "@/constants/breackpoints";

const UserSettingsContainer = styled(Box)`
  border: 4px solid #4a5568;
  border-radius: 16px;
  padding: 30px;
  margin-top: 10%;
  width: 60%;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    width: 80%;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 85%;
    padding: 10px;
  }
`;
const UserBalanceContainer = styled(Box)`
  border: 4px solid #4a5568;
  border-radius: 16px;
  padding: 30px;
  margin-top: 10%;
  width: 40%;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    width: 80%;
  }
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    width: 85%;
    padding: 10px;
  }
`;
const UserInfoContainer = styled(Box)`
  display: flex;
  width: 100%;
  gap: 20px;
  padding-bottom: 76px;
  @media (max-width: ${MEDIA_QUERY_LG}px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
  }
`;
export const UserInfo = () => {
  const { t } = useTranslation("common");

  return (
    <UserInfoContainer>
      <UserSettingsContainer>
        <Typography fontSize={30}>{t("userInfo")}</Typography>
        <UserInfoUploadAvatar />
        <UserInfoForm />
      </UserSettingsContainer>
      <UserBalanceContainer>
        <UserBalance />
      </UserBalanceContainer>
    </UserInfoContainer>
  );
};
