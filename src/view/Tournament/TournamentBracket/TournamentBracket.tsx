import {FC} from 'react'
import {useQuery} from "@/api/hooks/useQuery";
import {withTournamentPk, withTournamentPkProps} from "@/hocs/withTournamentPk";
import {withGamePk, WithGamePkProps} from "@/hocs/withGamePk";
import {Bracket, IRoundProps} from 'react-brackets';
import {CustomSeed} from "@view/Tournament/TournamentBracket/CustomSeed.tsx";

type TournamentBracketProps = WithGamePkProps & withTournamentPkProps

export const TournamentBracketComponent: FC<TournamentBracketProps> = ({tournamentPk, gamePk}) => {
  const {data} = useQuery({path: `/games/${gamePk}/tournaments/${tournamentPk}/stages/?limit=1000`})


  const rounds: IRoundProps[] = [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [
            {name: 'Team A'},
            {name: 'Team B'},
            {name: 'Team C'},
            {name: 'Team D'},
            {name: 'Team E'},
            {name: 'Team F'},
            {name: 'Team G'},
            {name: 'Team H'},
          ],
        },
      ],
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [
            {name: 'Team A'},
            {name: 'Team B'},
            {name: 'Team C'},
            {name: 'Team D'},
          ],
        }
      ]
    },
    {
      title: 'Round three',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [
            {name: 'Team A'},
            {name: 'Team B'},
          ],
        }
      ]
    },
    {
      title: 'winner',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [
            {name: 'Team A'},
          ],
        }
      ]
    }
  ];
  return (
    <>
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed}/>
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed}/>
      <Bracket rounds={rounds} renderSeedComponent={CustomSeed}/>
    </>
  )

};

export const TournamentBracket = withTournamentPk()(withGamePk()(TournamentBracketComponent))
