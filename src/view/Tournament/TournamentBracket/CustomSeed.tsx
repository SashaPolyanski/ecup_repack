import {IRoundProps, Seed, SeedItem, SeedTeam, SingleLineSeed} from "react-brackets";

type CustomSeedProps = {
  seed: any; // You might want to replace 'any' with the actual type of your seed data
  breakpoint: number;
  roundIndex: number;
  seedIndex: number;
};

export const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: CustomSeedProps) => {

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
  const isLineConnector = rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;
  return (
    <Wrapper style={{fontSize: 12}} mobileBreakpoint={breakpoint}>
      <SeedItem>
        {/* Adjust the way you access the teams based on the actual structure of your seed data */}
        {seed.teams?.map((team: any, index: number) => (
          <SeedTeam key={index}>{team?.name || 'NO TEAM'}</SeedTeam>
        ))}
      </SeedItem>
    </Wrapper>
  );
};
