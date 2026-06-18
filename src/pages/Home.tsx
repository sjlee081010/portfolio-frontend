import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import FlipText from '../components/FlipText';

export default function Home() {

  return (
    <HomePage>
      <Section>
        <Container>
          <Content>
            <h1>LEE SEONJAE PORTFOLIO</h1>
            <hr />
            <p>
              Creative{' '}
              <FlipContainer>
                <FlipText words={['Developer', 'Tinker']} />
              </FlipContainer>
            </p>
            <Link to="/project">Go project</Link>
          </Content>
          <Sidebar>
            <SidebarName>
              <b>LEE</b> SEONJAE
            </SidebarName>
          </Sidebar>
        </Container>
      </Section>

      <BottomBar>
        <ContactBox>
          <h3>Contact</h3>
          <p>
            <a href="mailto:sjlee081010@gmail.com" className="contact-link">
              sjlee081010@gmail.com
            </a>
            <span>•</span>
            <a href="https://github.com/sjlee081010" className="contact-link">
              github.com/sjlee081010
            </a>
          </p>
        </ContactBox>
        <Copyright>© 2026 Lee SeonJae All right reserved</Copyright>
      </BottomBar>
    </HomePage>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding-bottom: 5vh;
  flex: 1;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > h1 {
    color: #333;
    font-size: 52px;
    font-weight: 900;
    animation: ${fadeIn} 0.7s ease-in forwards;
    animation-delay: 0.1s;
    opacity: 0;
    text-shadow: 0px 1px 0px #ddd, 1px 3px 0px #ddd, 2px 4px 0px #ddd,
      3px 5px 0px #ddd, 4px 6px 0px #ddd;
  }

  & > hr {
    width: 100px;
    border: 2px solid #333;
    animation: ${fadeDown} 0.3s ease forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }

  & > p {
    color: #333;
    width: fit-content;
    position: relative;
    font-size: 24px;
    animation: ${fadeDown} 0.3s ease forwards;
    animation-delay: 0.7s;
    opacity: 0;
  }

  & > a {
    display: inline-block;
    width: fit-content;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    padding: 20px 40px;
    background-color: #333;
    border: 2px solid #333;
    transition: 0.3s;
    animation: ${fadeDown} 0.3s ease forwards;
    animation-delay: 1s;
    opacity: 0;

    &:hover {
      background-color: #fff;
      color: #333;
    }
  }
`;

const FlipContainer = styled.span`
  position: absolute;
  left: calc(100% + 8px);
  display: inline-block;
`;

const Sidebar = styled.div``;

const SidebarName = styled.span`
  color: #333;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transform-origin: center;
  font-size: 44px;
`;

const BottomBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ContactBox = styled.div`
  color: #333;
  display: flex;
  column-gap: 24px;

  & > p {
    display: flex;
    column-gap: 12px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.span`
  color: #333;
`;
