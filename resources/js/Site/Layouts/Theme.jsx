// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  palette: {
    primary: {
      main: "#1C7CBC",
      light: "#C3E7FF",
      // dark: "#0D629A",
      contrastText: "#ffffff",
    },
    Greybg: {
      main: "#F1F1F1",
    },
    secondary: {
      // main: "#3078C0",
      main:"#0D629A",
      contrastText: "#ffffff",

    },
    darkbluebg: {
      main: "#0D629A",
    },
    whitebg: {
      main: "#ffffff",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 14,
    fontFamily: ["poppins", "Raleway", "sans-serif"].join(","),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    color: "#0D629A",
    h1: {
      fontSize: "5.6rem",
      // fontWeight: 600,
      color: "#0D629A",
      fontFamily: "poppins",
      textTransform: "capitalize",
      lineHeight: "1",
      "@media (min-width: 360px)": {
        fontSize: "2.9rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "4rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "5rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
    h2: {
      fontSize: "4.4rem",
      fontWeight: 600,
      textTransform:"capitalize",
      color: "#0D629A",
      "@media (min-width: 360px)": {
        fontSize: "2.6rem", // Font size for h2 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "4rem", // Font size for h2 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "4.2rem", // Font size for h2 on large devices (e.g., desktop)
      },
    },
    h3: {
      fontSize: "3.4rem",
      fontWeight: 600,
      textTransform:"capitalize",
      color: "#0D629A",
      "@media (min-width: 360px)": {
        fontSize: "2.1rem", // Font size for h2 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "2.6rem", // Font size for h2 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "3rem", // Font size for h2 on large devices (e.g., desktop)
      },
    },
    h4: {
      fontSize: "2.7rem",
      fontWeight: 600,
      textTransform:"capitalize",
      color: "#0D629A",
      "@media (min-width: 360px)": {
        fontSize: "1.7rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "2rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "2.4rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
    h5: {
      fontSize: "2.2rem",
      fontWeight: 600,
      color: "#0D629A",
      "@media (min-width: 360px)": {
        fontSize: "1.4rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.6rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.8rem", // Font size for h1 on large devices (e.g., desktop)
      },

    },
    h6: {
      fontSize: "1.8rem",
      fontWeight: 600,
      color: "#0D629A",
      lineHeight: 1,
      "@media (min-width: 360px)": {
        fontSize: "1.2rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.4rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.6rem", // Font size for h1 on large devices (e.g., desktop)
      },

    },
    heading: {
      fontSize: "1.8rem",
      fontWeight: 500,
      "@media (min-width: 360px)": {
        fontSize: "1.2rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.4rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.6rem", // Font size for h1 on large devices (e.g., desktop)
      },

    },
    subtitle: {
      fontSize: "1.8rem",
      fontWeight: 400,
      "@media (min-width: 360px)": {
        fontSize: "1.2rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.4rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.6rem", // Font size for h1 on large devices (e.g., desktop)
      },

    },
    
    subtitle1: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#3078C0",
      lineHeight: 1.5,
      "@media (min-width: 360px)": {
        fontSize: "1rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.2rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.4rem", // Font size for h1 on large devices (e.g., desktop)
      },


    },
    subtitle2: {
      fontSize: "1.6rem",
      fontWeight: 400,
      "@media (min-width: 360px)": {
        fontSize: "1rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.2rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.4rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
    bodytext: {
      fontWeight: 500,
      fontSize: "1.4rem",
      "@media (min-width: 360px)": {
        fontSize: "1.1rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.2rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.3rem", // Font size for h1 on large devices (e.g., desktop)
      },

    },
    body1: {
      fontWeight: 300,
      fontSize: "1.4rem",
      "@media (min-width: 360px)": {
        fontSize: "1.1rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.2rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.3rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
    body2: {
      fontWeight: 400,
      fontSize: "1.4rem",
      "@media (min-width: 360px)": {
        fontSize: "1.1rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1.2rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.3rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
    caption: {
      fontWeight: 300,
      fontSize: "1.2rem",
      "@media (min-width: 360px)": {
        fontSize: "0.9rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.1rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
    captionbold: {
      fontWeight: 600,
      fontSize: "1.2rem",
      "@media (min-width: 360px)": {
        fontSize: "0.9rem", // Font size for h1 on small devices (e.g., mobile)
      },
      "@media (min-width: 960px)": {
        fontSize: "1rem", // Font size for h1 on medium devices (e.g., tablets)
      },
      "@media (min-width: 1280px)": {
        fontSize: "1.1rem", // Font size for h1 on large devices (e.g., desktop)
      },
    },
  },


  components: {
   
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
        header: {
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
        },
        day: {
          "&:hover": {
            backgroundColor: "primary.light",
          },
        },
      },
    },

    MuiChip:{
      styleOverrides: { 
        root: {
          backgroundColor: "transparent",
                border: '3px solid ',
                borderColor:'#0D629A',
                color:"#0D629A",
                fontWeight: '600',
                marginBottom: '1rem',
                
                //   width:50% 
          
                // }

        },    

    },
  },
    MuiButton:{
      styleOverrides: { 
        root: {
               
      primary: {
        fontSize: 16,
        padding: ".8rem 1.6rem",
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",   
        borderColor: "#secondary.main",
        "@media (min-width: 360px)": {
          fontSize: "1.1rem", //  small devices (e.g., mobile)
        },
        "@media (min-width: 960px)": {
          fontSize: "1.3rem", //  medium devices (e.g., tablets)
        },
        "@media (min-width: 1280px)": {
          fontSize: "1.4rem", // large devices (e.g., desktop)
        },
        "&:hover": {
          backgroundColor: "Secondary.contrastText",
          borderColor: "secondary.main",
          color:"Secondary.contrastText",
        },
        "&:active": {
          backgroundColor: "#0062cc",
          borderColor: "#005cbf",
          color:"#fff"

        },
        "&:focus": {
          boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
        },
      },
      outlined: {
        fontSize: 16,
        padding: ".8rem 1.6rem",
        border: "1px solid",
        lineHeight: 1.5,
        backgroundColor: "#ffffff",
        borderColor: "primary.main",
        color: "primary.main",
        "@media (min-width: 360px)": {
          fontSize: "1.1rem", //  small devices (e.g., mobile)
        },
        "@media (min-width: 960px)": {
          fontSize: "1.3rem", //  medium devices (e.g., tablets)
        },
        "@media (min-width: 1280px)": {
          fontSize: "1.4rem", // large devices (e.g., desktop)
        },
        "&:hover": {
          backgroundColor: "primary.main",
          borderColor: "primary.main",
          color:"primary.contrastText",
          boxShadow: "none",
        },
        "&:active": {
          backgroundColor: "primary.main",
          borderColor: "primary.main",
          color:"primary.contrastText",
          boxShadow: "none",
        },
      },
    },
    },
  },
  },
});

export default theme;
