import {css, Global} from "@emotion/react";
import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";

export const GlobalStyles: React.FC = () => {
  const {theme} = useContext(ThemeDefaultValueCtx);
  return (
    <Global
      styles={css`
        ::-webkit-scrollbar {
          width: 8px;
          opacity: 0;
          background: transparent;
        }

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 5px;
        }

        :hover > ::-webkit-scrollbar-thumb {
          background: ${theme.backgrounds.sidebarBackground};
        }

        img {
          margin: 0;
          padding: 0;
        }

        body {
          background-color: ${theme.palette.background.default};
          margin: 0;
          padding: 0;
          color: ${theme.palette.text.primary};
        }


        a {
          text-decoration: none;

          :hover {
            text-decoration: underline;
          }
        }
      `}
    />
  )
}
