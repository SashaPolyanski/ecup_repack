import {createTheme} from "@mui/material/styles";
import {outlinedInputClasses} from "@mui/material";

export const dark = createTheme({
  backgrounds: {
    sidebarBackground: 'rgb(18, 23, 33)',
    modalBackground: 'rgb(37,42,64)',
  },
  palette: {
    primary: {
      main: 'rgb(255,255,255)',
    },
    background: {
      default: 'rgb(23,28,38)',
      paper: 'rgb(23,28,38)'
    },
    text: {
      primary: 'rgb(255,255,255)'
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: `rgba(211, 74, 77, 0.8)`,
          borderRadius: '25px',
          minWidth: '185px',
          '&:hover': {
            backgroundColor: `rgba(211, 74, 77, 1)`,
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: `rgb(255, 255, 255)`,
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          // цвет бордера
          borderColor: 'rgb(255,255,255)',
        },
        root: {
          borderRadius: '40px',
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: '#41a6a8',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            border: `2px solid #41a6a8`,
          },
        },
      },
    }
  }
});