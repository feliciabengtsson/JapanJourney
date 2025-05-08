import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";

const DivHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 3rem;
`;
const Icon = styled.i`
	display: block;
	font-size: 4rem;
	font-weight: 800;
`;
const TitleWrapper = styled.div`
	width: 6rem;
`;
const LoginWrapper = styled.div`
	position: absolute;
	bottom: 15rem;
`;
const LoginPink = styled.div`
	width: 248px;
	height: 76px;
	border-radius: 50px;
	background: rgba(255, 144, 124, 0.68);
`;
const LoginRed = styled.div`
	width: 86px;
	height: 66px;
	border-radius: 50px;
	background: var(--color-secondary);
`;

function Startview() {
    return (
        <Fragment>
            <div id="main-wrapper">
                <DivHeader>
					<div>
						<Icon className="hgi hgi-stroke hgi-location-01" />
					</div>
                    <TitleWrapper>
						<h1>Japan Journey</h1>
					</TitleWrapper>
                </DivHeader>
				<LoginWrapper>
					<LoginPink>
						<span>Login</span>
						<LoginRed>
							<Icon className="hgi hgi-stroke hgi-location-01" />
						</LoginRed>
					</LoginPink>
				</LoginWrapper>
            </div>
        </Fragment>
    );
}

export default Startview;
