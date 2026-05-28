export function aboutPage() {
    return `
        <div class="about-page">
            <div class="about-sections">
                <section class="about-section intro-section">1</section>
                <section class="about-section intro-section">2</section>
                <section class="about-section intro-section">3</section>
                <section class="about-section intro-section">4</section>
            </div>
            <nav class="dot-nav">
                <span class="dot active" data-target="0"></span>
                <span class="dot" data-target="1"></span>
                <span class="dot" data-target="2"></span>
                <span class="dot" data-target="3"></span>
            </nav>
        </div>
    `;
}

export function initAboutPage() {
    const sections = document.querySelectorAll('.about-section')
    const dots = document.querySelectorAll('.dot-nav > .dot')
    const wrapper = document.querySelector('.about-sections')
    let current = 0

    function goTo(index) {
        current = index
        const height = document.querySelector('.about-page').clientHeight
        wrapper.style.transform = `translateY(-${height * index}px)`

        // active dot 변경
        dots.forEach(d => d.classList.remove('active'))
        dots[index].classList.add('active')
    }

    // dot 클릭
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goTo(index))
    })

    // 스크롤 감지
    document.querySelector('.about-page').addEventListener('wheel', (e) => {
        e.preventDefault()
        if (e.deltaY > 0 && current < sections.length - 1) goTo(current + 1)
        if (e.deltaY < 0 && current > 0) goTo(current - 1)
    }, { passive: false })
}