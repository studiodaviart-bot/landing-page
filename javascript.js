document.addEventListener("DOMContentLoaded", () => {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            page1.style.display = 'none';
            page1.classList.remove('active');
            page2.style.display = 'block';
            page2.classList.add('active');
        });
        prevBtn.addEventListener('click', () => {
            page2.style.display = 'none';
            page2.classList.remove('active');
            page1.style.display = 'block';
            page1.classList.add('active');
        });
    }
});

function downloadFlow(smartLink, downloadLink) {
    window.open(smartLink, '_blank');
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = downloadLink;
        link.click();
    }, 5000);
}