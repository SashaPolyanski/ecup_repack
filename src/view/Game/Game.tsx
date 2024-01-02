import { useQuery } from "@/api/hooks/useQuery";
import { GameReadOnly } from "@/api/types";
import { Box } from "@mui/material";
import { Banner, Tabs } from "@shared";
import styled from "@emotion/styled";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { FC, useState } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { UpcomingTournaments } from "@view/Game/TournamentTab/UpcomingTournaments.tsx";
import { PastTournaments } from "@view/Game/TournamentTab/PastTournaments.tsx";
import { CurrentTournaments } from "@view/Game/TournamentTab/CurrentTournaments.tsx";

const GameContainer = styled(Box)`
  width: 100%;
  height: 100%;
`;
const tabs = (t: TFunction) => {
  return [
    { id: 1, label: t("upcoming"), value: 0 },
    { id: 2, label: t("current"), value: 1 },
    { id: 3, label: t("past"), value: 2 },
  ];
};

const components = [UpcomingTournaments, CurrentTournaments, PastTournaments];
export const GameComponent: FC<WithGamePkProps> = ({ gamePk }) => {
  const { t } = useTranslation("common");

  const { data } = useQuery<GameReadOnly>({
    path: `/games/${gamePk}/`,
    skip: !!gamePk,
  });
  const [tabValue, setTabValue] = useState(0);
  const TabComponents = components[tabValue];
  return (
    <GameContainer pb={3}>
      <>
        <Banner bannerImage={data?.header?.file} />
        <Tabs tabs={tabs(t)} value={tabValue} setTabValue={setTabValue} />
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={5}
          pb={2}
          mt={2}
        >
          <TabComponents />
        </Box>
      </>
    </GameContainer>
  );
};

export const Game = withGamePk()(GameComponent);
