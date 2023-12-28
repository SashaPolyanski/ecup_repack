import {FC} from 'react'
import {Typography} from "@mui/material";
import styled from "@emotion/styled";

type RecommendedTournamentDescProps = {
  desc: string | null
}
const RecommendedTournamentDescription = styled(Typography)`
  font-size: 18px;
  margin-top: 16px;
  @media (max-width: 910px) {
    font-size: 16px;
  }
  @media (max-width: 885px) {
    font-size: 15px;
  }
  @media (max-width: 800px) {
    font-size: 11px;
  }
`

export const RecommendedTournamentDesc: FC<RecommendedTournamentDescProps> = ({desc}) => {
  return (
    <RecommendedTournamentDescription>
      {desc}
    </RecommendedTournamentDescription>
  );
};
