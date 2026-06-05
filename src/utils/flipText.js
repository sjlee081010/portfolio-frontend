export function initFlipText(selector, words) {
  let index = 0
  const container = document.querySelector(selector)

  function createTextEl(word, animClass) {
    const el = document.createElement('b')
    el.textContent = word
    el.classList.add('flip-text', animClass)
    return el
  }

  function changeWord() {
    const current = container.querySelector('.flip-text')
    index = (index + 1) % words.length
    const next = createTextEl(words[index], 'flip-in')
    container.appendChild(next)
    current.classList.remove('flip-in')
    current.classList.add('flip-out')
    setTimeout(() => current.remove(), 500)
  }

  setInterval(changeWord, 4000)
}