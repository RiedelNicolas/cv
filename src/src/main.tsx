import { render } from 'preact'
import { ThemeProvider } from '@mui/material'
import { App } from './app.tsx'
import { theme } from './theme'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app')!,
)
