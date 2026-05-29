document.addEventListener("DOMContentLoaded", () => {
    // Navigasi Antar Halaman
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

// Fungsi Download dengan Alur 3 Tahap
function downloadFlow(btn, smartLink, downloadLink) {
    const originalText = btn.innerText; // Menyimpan teks awal "Download"
    
    // 1. Buka iklan (Smartlink) di tab baru
    window.open(smartLink, '_blank');
    
    // 2. Setup pesan status
    let statusText = btn.parentNode.querySelector('.status-preparing');
    if (!statusText) {
        statusText = document.createElement('p');
        statusText.className = 'status-preparing';
        btn.parentNode.appendChild(statusText);
    }
    statusText.innerText = "Your download will start automatically...";
    
    // 3. Matikan klik sementara & mulai countdown
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
    
    let count = 7;
    btn.innerText = `Preparing... ${count}s`;
    
    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            btn.innerText = `Preparing... ${count}s`;
        } else {
            // 4. Tahap Akhir: Tombol berubah jadi "Get File"
            clearInterval(timer);
            
            btn.innerText = "Get File"; // Kata ketiga
            btn.style.pointerEvents = 'auto'; // Tombol bisa diklik lagi
            btn.style.opacity = '1';
            btn.classList.add('ready-to-download'); // Class CSS tambahan untuk styling
            statusText.innerText = "File is ready!";
            
            // 5. Eksekusi download saat diklik manual
            btn.onclick = function() {
                window.location.href = downloadLink;
                
                // Reset tombol ke semula setelah diklik
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('ready-to-download');
                    statusText.innerText = "";
                    // Kembalikan fungsi klik agar bisa dipakai lagi
                    btn.onclick = () => downloadFlow(btn, smartLink, downloadLink);
                }, 1000);
            };
        }
    }, 1000);
}