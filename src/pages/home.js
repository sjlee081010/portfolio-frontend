export function homePage() {
    return `
    <div class="home-page">

        <section>
            <div class="container">
                <div class="content">
                    <h1>
                        LEE SEONJAE PORTFOLIO
                    </h1>
                    <hr>
                    <p>Creative <span class="flip-text-container"><b class="flip-text flip-in">Developer</b></span></p>
                    <a href="#project">Go project</a>
                </div>
                <div class="sidebar">
                    <span class="sidebar-name"><b>LEE</b> SEONJAE</span>
                </div>
            </div>
        </section>
        
        <div class="bottom-bar">
            <div class="contact-box">
                <h3>Contact</h3>
                <p>
                    <a href="mailto:sjlee081010@gmail.com" class="contact-link">sjlee081010@gmail.com</a>
                    <span>•</span>
                    <a href="https://github.com/sjlee081010" class="contact-link">github.com/sjlee081010</a>
                </p>
            </div>
            <span class="copyright">© 2026 Lee SeonJae All right reserved</span>
        </div>
    </div>
  `
}

export function initHomePage() {
    const words = ['Developer', 'Tinker'];
    let index = 0;
    const container = document.querySelector('.flip-text-container');

    function createTextEl(word, animClass) {
        const el = document.createElement('b');
        el.textContent = word;
        el.classList.add('flip-text', animClass);
        return el;
    }

    function changeWord() {
        const current = container.querySelector('.flip-text');
        index = (index + 1) % words.length;

        const next = createTextEl(words[index], 'flip-in');
        container.appendChild(next);
        current.classList.remove('flip-in');
        current.classList.add('flip-out');

        setTimeout(() => current.remove(), 500);
    }

    setInterval(changeWord, 4000);
}