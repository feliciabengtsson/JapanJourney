import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root {
	--color-neutral-light: #FFFFFF;
	--color-neutral-dark: #333333;
	--color-neutral-grey: #CCCCCC;

	--color-primary-light: #FFC4B2;
	--color-primary-medium: #FF907C;
	--color-secondary: #921613;
	--color-accent-light: #8ED4C8;
	--color-accent-dark: #3E6C63;
	}
	* {
	box-sizing: border-box;
	color: var(--color-neutral-dark);
	}
	body {
		margin: 0;
		background: url('/images/background-sm.jpg');
		background-size: cover;
		background-position: center;
		color: var(--color-neutral-dark);
		min-height: 100vh;
		min-width: 320px;
		font-family: Poppins;
		font-style: normal;
		@media (min-width: 600px) {
			background: url('/images/background-md.jpg');
			background-size: cover;
			background-position: center;
		}
		@media (min-width: 980px) {
			background: url('/images/background-lg.jpg');
			background-size: cover;
			background-position: center;
		}
		@media (min-width: 1200px) {
			background: url('/images/background-original.jpg');
			background-size: cover;
			background-position: center;
		}
	}
	h1 {
		color: var(--color-neutral-dark);
		font-family: Hanayoru;
		font-size: 36px;
		font-weight: 400;
		margin: 10px auto;
	}
	h2 {
		color: var(--color-neutral-dark);
		font-family: Hanayoru;
		font-size: 24px;
		font-weight: 400;
	}
	h3 {
		color: var(--color-neutral-dark);
		font-size: 16px;
		font-weight: 600;
	}
	p {
		color: var(--color-neutral-dark);
		font-size: 1rem;
		font-weight: 400;
		@media (min-width: 600px) {
        	font-size: 1.2rem;
    	}
	}
 	i {
		&:hover {
			color: var(--color-accent);
			cursor: pointer;
		}
		&:visited {
			color: var(--color-secondary);
		}
	}
	a {
		color: var(--color-neutral-light);
	}

	@font-face {
  		font-family: Hanayoru;
  		src: url('/font/HanayoruDemo-woq59.ttf') format('truetype');
	}
`;

export default GlobalStyle;
