import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Board from './pages/Board';
import Study from './pages/Study';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Main>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/board" element={<Board />} />
            <Route path="/study" element={<Study />} />
          </Routes>
        </Content>
      </Main>
    </>
  );
}

const Main = styled.main`
  flex: 1;
  min-height: 0; /* allow the flex item to stay within the viewport instead of growing to content */
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 94vw;
  height: calc(100% - 3vw);
  display: flex;

  & > div:first-of-type {
    flex: 1;
  }
`;
