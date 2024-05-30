import { ThemeProvider } from "styled-components";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeName, dark, getTheme, light } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>("light");
  return (
    <>
    <BookStoreThemeProvider>
      <ThemeSwitcher/>
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
    </>
  );
}

export default App;
