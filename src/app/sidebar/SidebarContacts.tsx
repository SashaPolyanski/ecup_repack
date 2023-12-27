import TelegramIcon from '@assets/telegramIcon.svg'
import DiscordIcon from '@assets/discordIcon.svg'
import InstagramIcon from '@assets/instagramIcon.svg'
import {ElementType, FC} from "react";
import {Box, Stack} from "@mui/material";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

type SocialItems = {
  id: number
  icon: ElementType
  link: string
}
const socialItems: SocialItems[] = [
  {id: 1, icon: TelegramIcon, link: 'https://go.ecup.pro/tg-main'},
  {id: 2, icon: DiscordIcon, link: 'https://go.ecup.pro/ds-main'},
  // {id: 3, icon: TwitterIcon},
  {id: 4, icon: InstagramIcon, link: 'https://go.ecup.pro/instagram-main'},
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
      {socialItems.map(({id, link, icon}) => {
        const Component = icon
        return (
          <SocialIconContainer key={id}>
            <Link to={link} target={'_blank'}><Component/></Link>
          </SocialIconContainer>
        )
      })}
    </Stack>
  );
};
