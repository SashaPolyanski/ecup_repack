import {FC, useMemo, useState} from 'react';
import {withTournamentPk, withTournamentPkProps} from '@/hocs/withTournamentPk';
import {withGamePk, WithGamePkProps} from '@/hocs/withGamePk';
import {useQuery} from '@/api/hooks/useQuery';
import {TournamentReadOnly} from '@/api/types';
import styled from '@emotion/styled';
import PlayerIcon from '@assets/playerIcon.svg'
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
} from '@mui/material';
import {MEDIA_QUERY_SM} from "@/constants/breackpoints";
import {useTranslation} from "react-i18next";

type TournamentParticipantsProps = WithGamePkProps & withTournamentPkProps;

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


const columnNames = [{value: 'Players'}];

export const TournamentParticipantsComponent: FC<TournamentParticipantsProps> = ({tournamentPk, gamePk}) => {
  const {data} = useQuery<TournamentReadOnly>({
    path: `/games/${gamePk}/tournaments/${tournamentPk}/`,
  });
  const {t} = useTranslation('common')

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`)
  const columnValues = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return (
      data?.teams.slice(startIndex, endIndex).map((rowData, rowIndex) => (
        <ParticipantsTableRow key={rowIndex} hover>
          <ParticipantsTableCell align="left" key={`id-${rowIndex}`}>
            <Avatar sx={{marginRight: '20px'}} src={rowData?.avatar?.file}/>
          </ParticipantsTableCell>
          <ParticipantsTableCell align="left" key={`name-${rowIndex}`}>
            {rowData.name}
          </ParticipantsTableCell>
        </ParticipantsTableRow>
      ))
    );
  }, [data, page, rowsPerPage]);

  return (
    <ParticipantsTableContainer>
      <Table style={{tableLayout: 'fixed'}}>
        <TableHead>
          <ParticipantsTableRow>
            <ParticipantsTableCell align={'center'}>
              <PlayerIcon style={{marginTop: '10px'}}/>
            </ParticipantsTableCell>
            {columnNames &&
              columnNames.map((column, index) => (
                <ParticipantsTableCell key={index} align="left">
                  {column.value}
                </ParticipantsTableCell>
              ))}
          </ParticipantsTableRow>
        </TableHead>
      </Table>
      <Box>
        <Table style={{tableLayout: 'fixed'}} size="small">
          <TableBody>{columnValues}</TableBody>

        </Table>
        <Table style={{tableLayout: 'fixed'}} sx={{borderBottom: 'none'}}>
          <TableFooter sx={{borderBottom: 'none'}}>
            <ParticipantsTableRow>

              <TablePagination
                count={data?.teams.length || 0}
                rowsPerPageOptions={[5, 10]}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={!isSmallScreen ? t('perPage') : t('quantity')}
                sx={{
                  borderBottom: 'none',
                  '& .MuiButtonBase-root, & .MuiTablePagination-input, & .MuiSelect-root': {
                    color: 'white',
                  },
                  '& .MuiSvgIcon-root': {
                    fill: 'white',
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

export const TournamentParticipants = withTournamentPk()(withGamePk()(TournamentParticipantsComponent));
