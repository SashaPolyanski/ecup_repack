import { FC } from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

type RecommendedTournamentTitleProps = {
  title: string;
};
const RecommendedTournamentText = styled(Typography)`
  font-size: 24px;
  margin-top: 16px;
  @media (max-width: 1002px) {
    font-size: 18px;
  }
  @media (max-width: 800px) {
    font-size: 16px;
  }
`;
export const RecommendedTournamentTitle: FC<
  RecommendedTournamentTitleProps
> = ({ title }) => {
  return <RecommendedTournamentText>{title}</RecommendedTournamentText>;
};
