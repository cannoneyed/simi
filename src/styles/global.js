import { injectGlobal } from 'styled-components'

export default function injectGlobalStyles() {
  /* eslint-disable no-unused-expressions */
  injectGlobal`
    body {
      margin: 0;
      background-color: black;
      font-family: 'Fira Mono', monospace;
    }
  `
}
