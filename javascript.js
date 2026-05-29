document.addEventListener("DOMContentLoaded", () => {
    // Navigasi
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

// Fungsi Download
function downloadFlow(btn, smartLink, downloadLink) {
    const originalText = btn.innerText;
    window.open(smartLink, '_blank');
    
    let statusText = btn.parentNode.querySelector('.status-preparing');
    if (!statusText) {
        statusText = document.createElement('p');
        statusText.className = 'status-preparing';
        btn.parentNode.appendChild(statusText);
    }
    statusText.innerText = "Your download will start automatically...";
    
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
    
    let count = 5;
    btn.innerText = `Preparing... ${count}s`;
    
    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            btn.innerText = `Preparing... ${count}s`;
        } else {
            clearInterval(timer);
            btn.innerText = "Starting...";
            
            setTimeout(() => {
                window.location.href = downloadLink;
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.pointerEvents = 'auto';
                    btn.style.opacity = '1';
                    statusText.innerText = ""; 
                }, 1000);
            }, 500);
        }
    }, 1000);
}