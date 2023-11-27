import {css, Global} from "@emotion/react";
import {useContext} from "react";
import {ThemeDefaultValueCtx} from "@theme";

export const GlobalStyles: React.FC = () => {
  const {theme} = useContext(ThemeDefaultValueCtx);
  return (
    <Global
      styles={css`
        ::-webkit-scrollbar {
          opacity: 0;
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(3, 3, 3, 0);
          transition: background 2s ease-in-out;
          border-radius: 5px;
        }

        :hover > ::-webkit-scrollbar-thumb {
          background: rgba(3, 3, 3, 0.5);
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
