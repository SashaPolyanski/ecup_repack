import {FC} from 'react';
import {Box} from '@mui/material';
import styled from '@emotion/styled';
import {Tooltip} from "@shared";
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type TournamentTitleProps = {
  name: string;
};

const TournamentName = styled(Box)`
  margin-bottom: 10px;
  font-size: 28px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: ${MEDIA_QUERY_SM}px) {
    font-size: 20px;
    margin-bottom: 0;
  }

`;

export const TournamentTitle: FC<TournamentTitleProps> = ({name}) => {
  return (
    <Tooltip placement={'top'} title={name}>
      <TournamentName px={2}>
        {name}
      </TournamentName>
    </Tooltip>
  );
};
