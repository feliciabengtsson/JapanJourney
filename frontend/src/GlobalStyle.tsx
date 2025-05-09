import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root {
	--color-neutral-light: #FFFFFF;
	--color-neutral-dark: #333333;
	--color-neutral-grey: #CCCCCC;
	
	--color-primary-light: #FFC4B2;
	--color-primary-medium: #FF907C;
	--color-secondary: #921613;
	--color-accent: #8ED4C8;
	--color-accent: #3E6C63;
	}
	* {
	box-sizing: border-box;
	}  
	body {
		margin: 0;
		background-image: url('src/assets/images/background-sm.jpg');
		background-size: cover;
		background-position: center;
		color: var(--color-neutral-dark);
		min-height: 100vh;
		min-width: 320px;
		font-family: Poppins;
		font-style: normal;
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
		font-size: 16px;
		font-weight: 400;
	}
/* 	span {
		color: var(--color-neutral-light);
		&:hover {
			color: var(--color-accent) !important;
		} 
		&:visited {
			color: var(--color-secondary) !important;
		} 
	} */
/* 	label {
		display: block;
		color: var(--color-secondary);
		font-size: 16px;
		font-weight: 600;
		margin: 16px 0;
	} */

	@font-face {
  		font-family: Hanayoru;
  		src: url('src/assets/font/HanayoruDemo-woq59.ttf') format('truetype');
	}
`;

export default GlobalStyle;
