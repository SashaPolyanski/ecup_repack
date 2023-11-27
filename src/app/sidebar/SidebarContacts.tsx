import TelegramIcon from '@assets/telegramIcon.svg'
import DiscordIcon from '@assets/discordIcon.svg'
import TwitterIcon from '@assets/twitterIcon.svg'
import InstagramIcon from '@assets/instagramIcon.svg'
import {ElementType, FC} from "react";
import {Box, Stack} from "@mui/material";
import styled from "@emotion/styled";

type SocialItems = {
  id: number
  icon: ElementType
}
const socialItems: SocialItems[] = [
  {id: 1, icon: TelegramIcon},
  {id: 2, icon: DiscordIcon},
  {id: 3, icon: TwitterIcon},
  {id: 4, icon: InstagramIcon},
]
type SidebarContactsProps = {
  collapsed: boolean
}
const SocialIconContainer = styled(Box)`
  cursor: pointer;

  svg {
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;

    svg {
      opacity: 1;
    }
  }
`
export const SidebarContacts: FC<SidebarContactsProps> = ({collapsed}) => {
  return (
    <Stack gap={2} direction={collapsed ? 'column' : 'row'}>
      {socialItems.map(({id, icon}) => {
        const Component = icon
        return (
          <SocialIconContainer key={id}>
            <Component/>
          </SocialIconContainer>
        )
      })}
    </Stack>
  );
};
