import { navigate } from '../router.js';

export function renderHeader() {
  const header = document.querySelector('#header')

  header.innerHTML = `
    <nav class="navbar">
      <a class="logo" data-page="home"><h1>SJ's</h1></a>
      <ul class="nav-menu">
        <li><a class="nav-link active" data-page="home"><span>Home</span></a></li>
        <li><a class="nav-link" data-page="about"><span>About</span></a></li>
        <li><a class="nav-link" data-page="project"><span>Project</span></a></li>
        <li><a class="nav-link" data-page="board"><span>Board</span></a></li>
        <li><a class="nav-link" data-page="study"><span>Study</span></a></li>
      </ul>
    </nav>
  `;

  document.querySelectorAll('.nav-link').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.page))
  });

  document.querySelector('.logo').addEventListener('click', () => {
    navigate('home');
  });
}