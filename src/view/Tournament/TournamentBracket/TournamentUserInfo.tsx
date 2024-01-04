import { FC } from "react";
import { Avatar, Box, useMediaQuery } from "@mui/material";
import { MEDIA_QUERY_SM } from "@/constants/breackpoints";

type TournamentUserInfoProps = {
  avatar: string;
  battle_tag?: string | null;
  team_name: string;
};

export const TournamentUserInfo: FC<TournamentUserInfoProps> = ({
  avatar,
  team_name,
  battle_tag,
}) => {
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`);
  return (
    <>
      <Avatar sx={{ marginRight: "20px" }} src={avatar} />
      <Box
        sx={{
          overflow: "hidden",
        }}
      >
        <Box>{team_name}</Box>
        {isSmallScreen ? (
          <Box
            mt={1}
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {battle_tag}
          </Box>
        ) : null}
      </Box>
    </>
  );
};
