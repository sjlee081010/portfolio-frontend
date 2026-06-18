import styled from '@emotion/styled';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../routes';

export default function Header() {
  return (
    <HeaderEl>
      <Navbar>
        <Logo to="/">
          <h1>SJ's</h1>
        </Logo>
        <NavMenu>
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              {/* NavLink가 현재 경로와 일치하면 자동으로 active 클래스 부여 */}
              <NavLink to={path} end>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </NavMenu>
      </Navbar>
    </HeaderEl>
  );
}

const HeaderEl = styled.header`
  width: 100%;
  height: var(--header-height);
  background-color: var(--color-bg);
  display: flex;
  justify-content: center;
`;

const Navbar = styled.nav`
  width: 94%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #333;
  cursor: pointer;

  & > h1 {
    font-size: 36px;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  column-gap: 8px;
`;

const NavLink = styled(RouterNavLink)`
  position: relative;
  padding: 8px 36px;
  color: var(--color-text);
  cursor: pointer;
  font-weight: 550;
  transition: color 0.2s ease-in-out;

  span {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: var(--color-dark);
    transition: width 0.5s ease-in-out;
  }

  &:hover {
    color: var(--color-white);
  }

  &:hover::before {
    width: 100%;
    transition: width 0.5s ease-in-out 0.2s;
  }

  &.active {
    color: var(--color-white);
  }

  &.active::before {
    width: 100%;
    transition: width 0.4s ease-in-out;
  }
`;
