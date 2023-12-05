import {createTheme} from "@mui/material/styles";
import {outlinedInputClasses} from "@mui/material";

export const light = createTheme({
  backgrounds: {
    sidebarBackground: 'rgb(196,200,203)',
    modalBackground: 'rgb(240, 240, 240)',
  },
  palette: {
    primary: {
      main: 'rgb(0,0,0)',

    },
    background: {
      default: 'rgb(240, 240, 240)',

    },
    text: {
      primary: 'rgb(0,0,0)'
    }
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
            color: `rgb(0, 0, 0)`,
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          // цвет бордера
          borderColor: 'rgba(0,0,0,0.2)',
        },
        root: {
          borderRadius: '40px',
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'rgba(0,0,0,0.6)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            border: `2px solid rgba(0,0,0,1)`,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: 6
        },
        root: {
          svg: {
            color: 'rgb(0,0,0)'
          },
        },
      }
    }
  }
})
