import './styles/style.css';
import { renderHeader } from './components/header';
import { navigate } from './router';

renderHeader();

const initPage = window.location.hash.replace('#', "") || 'home';
navigate(initPage);