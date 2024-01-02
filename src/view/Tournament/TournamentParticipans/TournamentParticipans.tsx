import { FC, useMemo, useRef, useState } from "react";
import {
  withTournamentPk,
  withTournamentPkProps,
} from "@/hocs/withTournamentPk";
import { withGamePk, WithGamePkProps } from "@/hocs/withGamePk";
import { useQuery } from "@/api/hooks/useQuery";
import { PaginatedTournamentTeamReadOnlyList } from "@/api/types";
import styled from "@emotion/styled";
import PlayerIcon from "@assets/playerIcon.svg";
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { Preloader } from "@shared";

type TournamentParticipantsProps = WithGamePkProps & withTournamentPkProps;
type HeaderType = {
  value: string;
  placement: "left" | "right" | "center" | "inherit" | "justify" | undefined;
};
const ParticipantsTableContainer = styled(TableContainer)`
  width: 100%;
  overflow: hidden;
  margin-top: 16px;
`;

const ParticipantsTableRow = styled(TableRow)`
  height: 80px;
  border: 1px solid #4a5568;
`;

const ParticipantsTableCell = styled(TableCell)`
  border-bottom: none;

  &:first-of-type {
    width: 70px;
  }
`;
const ParticipantsTableCella = styled(TableCell)`
  border-bottom: none;

  &:first-of-type {
    width: 70px;
  }

  &:last-of-type {
    width: 70px;
  }
`;

const columnNames: HeaderType[] = [
  { value: "Players", placement: "left" },
  { value: "hui", placement: "right" },
];

export const TournamentParticipantsComponent: FC<
  TournamentParticipantsProps
> = ({ tournamentPk, gamePk }) => {
  const [offset, setOffset] = useState(0);
  const { data, isLoading } = useQuery<PaginatedTournamentTeamReadOnlyList>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/teams/?limit=10&offset=${offset}`,
  });
  const countRef = useRef(0);
  const { t } = useTranslation("common");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (data && data.count) {
      countRef.current = data.count;
    }
    setPage(newPage);
    setOffset(() => newPage * rowsPerPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`);
  const columnValues = useMemo(() => {
    return isLoading ? (
      <Box
        sx={{
          height: rowsPerPage === 10 ? "801px" : "401px",
          border: "1px solid #4a5568",
        }}
      >
        <Preloader />
      </Box>
    ) : (
      data?.results?.slice(0, rowsPerPage).map((rowData) => {
        return (
          <ParticipantsTableRow key={rowData.id} hover>
            <ParticipantsTableCell align="left">
              <Avatar
                sx={{ marginRight: "20px" }}
                src={rowData?.team?.avatar ? rowData?.team?.avatar.file : ""}
              />
            </ParticipantsTableCell>
            <ParticipantsTableCell align="left">
              {rowData.team.name}
            </ParticipantsTableCell>
            <ParticipantsTableCell align="right">
              {rowData.is_confirmed ? (
                <DoneIcon htmlColor={"#3aaf3c"} />
              ) : (
                <ClearIcon htmlColor={"red"} />
              )}
            </ParticipantsTableCell>
          </ParticipantsTableRow>
        );
      })
    );
  }, [data, rowsPerPage, isLoading]);

  return (
    <ParticipantsTableContainer>
      <Table style={{ tableLayout: "fixed" }}>
        <TableHead>
          <ParticipantsTableRow>
            <ParticipantsTableCell align={"center"}>
              <PlayerIcon style={{ marginTop: "10px" }} />
            </ParticipantsTableCell>
            {columnNames &&
              columnNames.map((column) => (
                <ParticipantsTableCella
                  key={column.value}
                  align={column.placement}
                >
                  {column.value}
                </ParticipantsTableCella>
              ))}
          </ParticipantsTableRow>
        </TableHead>
      </Table>
      <Box>
        <Table style={{ tableLayout: "fixed" }} size="small">
          <TableBody>{columnValues}</TableBody>
        </Table>
        <Table style={{ tableLayout: "fixed" }} sx={{ borderBottom: "none" }}>
          <TableFooter sx={{ borderBottom: "none" }}>
            <ParticipantsTableRow>
              <TablePagination
                count={data?.count || countRef.current}
                rowsPerPageOptions={[5, 10]}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={!isSmallScreen ? t("perPage") : t("quantity")}
                sx={{
                  borderBottom: "none",
                  "& .MuiButtonBase-root, & .MuiTablePagination-input, & .MuiSelect-root":
                    {
                      color: "white",
                    },
                  "& .MuiSvgIcon-root": {
                    fill: "white",
                  },
                }}
              />
            </ParticipantsTableRow>
          </TableFooter>
        </Table>
      </Box>
    </ParticipantsTableContainer>
  );
};

export const TournamentParticipants = withTournamentPk()(
  withGamePk()(TournamentParticipantsComponent),
);
