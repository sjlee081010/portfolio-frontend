import { homePage, initHomePage } from './pages/home.js'
import { aboutPage, initAboutPage } from './pages/about.js'
import { projectPage } from './pages/project.js'
import { boardPage } from './pages/board.js'
import { studyPage } from './pages/study.js'

const routes = {
  home: homePage,
  about: aboutPage,
  project: projectPage,
  board: boardPage,
  study: studyPage,
}

export function navigate(page) {
  const content = document.querySelector('#content')
  content.innerHTML = routes[page]()

  if (page=='home') initHomePage();
  if (page=='about') initAboutPage();

  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page)
  })

  window.location.hash = page
}