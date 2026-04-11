import { createTheme } from "@mui/material/styles";

export const themeModes = {
  dark: "dark",
  light: "light"
};

const themeConfigs = {
  custom: ({ mode }) => {
    const isDark = mode === themeModes.dark;
    const customPalette = isDark ? {
      primary: {
        main: "#8fb3ff",
        contrastText: "#091120"
      },
      secondary: {
        main: "#d7b56d",
        contrastText: "#0d1525"
      },
      background: {
        default: "#09111d",
        paper: "#0f1b2d"
      },
      text: {
        primary: "#f3f6fb",
        secondary: "#9ca9bf"
      },
      divider: "rgba(143, 179, 255, 0.14)"
    } : {
      primary: {
        main: "#143a66",
        contrastText: "#f4f7fb"
      },
      secondary: {
        main: "#b38b3c",
        contrastText: "#f8f6ef"
      },
      background: {
        default: "#eef3f8",
        paper: "#ffffff"
      },
      text: {
        primary: "#10233c",
        secondary: "#5c6b80"
      },
      divider: "rgba(16, 35, 60, 0.1)"
    };

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      shape: {
        borderRadius: 18
      },
      typography: {
        fontFamily: "\"IBM Plex Sans\", \"Segoe UI\", sans-serif",
        h1: {
          fontFamily: "\"Aptos Display\", \"IBM Plex Sans\", sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em"
        },
        h2: {
          fontFamily: "\"Aptos Display\", \"IBM Plex Sans\", sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em"
        },
        h3: {
          fontFamily: "\"Aptos Display\", \"IBM Plex Sans\", sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em"
        },
        h4: {
          fontFamily: "\"Aptos Display\", \"IBM Plex Sans\", sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.03em"
        },
        h5: {
          fontFamily: "\"Aptos Display\", \"IBM Plex Sans\", sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.02em"
        },
        h6: {
          fontWeight: 600,
          letterSpacing: "0.01em"
        },
        button: {
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: "0.01em"
        },
        subtitle2: {
          fontSize: "0.78rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: 700
        }
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: {
              borderRadius: 999,
              paddingInline: 18
            },
            containedPrimary: {
              boxShadow: isDark
                ? "0 18px 40px rgba(10, 20, 37, 0.35)"
                : "0 16px 36px rgba(20, 58, 102, 0.18)"
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: "none"
            }
          }
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none"
            },
            rounded: {
              borderRadius: 20
            }
          }
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 24
            }
          }
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 999
            }
          }
        },
        MuiTextField: {
          defaultProps: {
            variant: "outlined"
          }
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 18
            }
          }
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: isDark
                ? "radial-gradient(circle at top, rgba(28, 53, 92, 0.45), transparent 32%), linear-gradient(180deg, #09111d 0%, #0a1523 100%)"
                : "radial-gradient(circle at top, rgba(112, 147, 188, 0.16), transparent 30%), linear-gradient(180deg, #eef3f8 0%, #e8eef5 100%)"
            },
            a: {
              color: "inherit",
              textDecoration: "none"
            }
          }
        }
      }
    });
  }
};

export default themeConfigs;
