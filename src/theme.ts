import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6b00",
      light: "#ff9433",
      dark: "#cc5500",
      contrastText: "#ffffff",
    },
    background: {
      default: "#2563eb",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          },
          '&.MuiButton-containedPrimary': {
            boxShadow: '0 4px 20px rgba(255, 107, 0, 0.3)',
            '&:hover': {
              boxShadow: '0 8px 32px rgba(255, 107, 0, 0.4)',
            },
          },
        },
        outlined: {
          borderRadius: 8,
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '16px',
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '14px',
        },
      },
    },
  },
});