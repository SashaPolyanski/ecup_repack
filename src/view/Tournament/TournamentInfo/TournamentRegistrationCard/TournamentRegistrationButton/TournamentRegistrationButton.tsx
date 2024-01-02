import { FC, useCallback, useState } from "react";
import { useIsAuthStore } from "@/Zustand/isAuthStore";
import { useQuery } from "@/api/hooks/useQuery";
import {
  PaginatedTournamentTeamReadOnlyList,
  TournamentReadOnly,
} from "@/api/types";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { TournamentButton } from "./TournamentButton";
import { useUserStore } from "@/Zustand/userStore.ts";
import { Modal } from "@shared";
import { useTranslation } from "react-i18next";
import { TournamentModalContent } from "./TournamentModalContent";

type TournamentRegistrationButtonProps = WithGamePkProps &
  withTournamentPkProps;
export type Conditions =
  | {
      isAuth: boolean;
      confirm: boolean;
      start: boolean;
      inTournament: boolean;
    }
  | undefined;
export const TournamentRegistrationButtonComponents: FC<
  TournamentRegistrationButtonProps
> = ({ tournamentPk, gamePk }) => {
  const { isAuth } = useIsAuthStore();
  const { user } = useUserStore();
  const { t } = useTranslation("common");
  const [showModal, setShowModal] = useState(true);
  const openModalHandler = useCallback(() => {
    setShowModal(true);
  }, []);
  const closeModalHandler = useCallback(() => {
    setShowModal(false);
  }, []);
  const { data } = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  const { data: userInTournament } =
    useQuery<PaginatedTournamentTeamReadOnlyList>({
      path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/?team__users=${user?.id}`,
    });
  const date = new Date();
  const startDate =
    data && new Date(Object.values(data?.schedule[1])[0] as string);
  const endDate =
    data && new Date(Object.values(data?.schedule[2])[0] as string);
  const conditions: Conditions = data && {
    isAuth,
    inTournament: !!userInTournament?.results?.length,
    confirm: startDate && endDate ? date > startDate && date < endDate : false,
    start: endDate ? date > endDate : false,
  };
  return (
    <>
      <TournamentButton
        conditions={conditions}
        openModalHandler={openModalHandler}
      />
      <Modal
        open={showModal}
        onClose={closeModalHandler}
        title={t("registerTournamentModal")}
        width={500}
        height={300}
      >
        <TournamentModalContent closeModalHandler={closeModalHandler} />
      </Modal>
    </>
  );
};

export const TournamentRegistrationButton = withTournamentPk()(
  withGamePk()(TournamentRegistrationButtonComponents),
);
