import {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

export type ThemeContextType = {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
};

export const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  mode: 'light',
});

export function ThemeContextProvider({ children }: PropsWithChildren<{}>) {
  const [mode, setMode] = useState<'light' | 'dark'>(() =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches // If user has dark mode enabled, use dark mode
      ? 'dark'
      : 'light',
  );
  const toggleColorMode = useMemo(() => {
    return () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
