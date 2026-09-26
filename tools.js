/* ============ DARK GEN — TOOLS LOGIC (PART 1: Downloader + Maker) ============ */

// ============ UTIL ============
function setResult(id, html, type = 'info') {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<div class="result-box ${type}">${html}</div>`;
}
function setLoading(id, text = 'Loading...') {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<div class="result-box info"><span class="loader"></span>${text}</div>`;
}
async function fetchJSON(url, opt = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const r = await fetch(url, { ...opt, signal: ctrl.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  a.click(); URL.revokeObjectURL(url);
}
function downloadURL(url, filename) {
  const a = document.createElement('a');
  a.href = url; a.download = filename || 'download';
  a.target = '_blank';
  a.click();
}
function copyResult(text) { copyText(text); }

// ============================================================
// ============ DOWNLOADER ============
// ============================================================

// ============ TIKTOK DOWNLOADER (tikwm.com) ============
async function ttDownload() {
  const url = document.getElementById('ttUrl').value.trim();
  if (!url) { showToast('❌ Masukkan link TikTok!', 'error'); return; }
  setLoading('ttResult', 'Ambil data dari TikTok...');
  playSnd('scan');
  try {
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const data = await fetchJSON(api);
    if (data.code !== 0) throw new Error(data.msg || 'Gagal ambil video');
    const d = data.data;
    const isImages = d.images && d.images.length > 0;
    let html = `
      <div style="text-align:center;margin-bottom:10px">
        <img src="${d.cover}" style="max-width:100%;border-radius:10px;max-height:200px" alt="cover">
      </div>
      <div class="info-row"><span>Judul</span><b>${esc(d.title || '-').substring(0,60)}</b></div>
      <div class="info-row"><span>Author</span><b>${esc(d.author?.nickname || '-')}</b></div>
      <div class="info-row"><span>Duration</span><b>${d.duration || 0}s</b></div>
      <div class="btn-row" style="margin-top:12px">
        ${!isImages ? `<button class="btn btn-p" onclick="downloadURL('${d.play}','tiktok_${Date.now()}.mp4')">📥 Video (No WM)</button>` : ''}
        ${isImages ? `<button class="btn btn-p" onclick="ttDownloadImages('${encodeURIComponent(JSON.stringify(d.images))}')">📥 ${d.images.length} Gambar</button>` : ''}
        <button class="btn btn-b" onclick="downloadURL('${d.music}','tiktok_audio_${Date.now()}.mp3')">🎵 Audio</button>
      </div>
      <div style="margin-top:10px;font-size:11px;color:var(--mt);word-break:break-all">
        🔗 <a href="${d.play}" target="_blank" style="color:var(--bl)">Buka Video</a>
      </div>
    `;
    setResult('ttResult', html, 'success');
    showToast('✅ Berhasil!', 'success');
    playSnd('success');
  } catch (e) {
    setResult('ttResult', `❌ Error: ${esc(e.message)}<br><br>💡 Pastikan link TikTok valid.`, 'error');
    showToast('❌ Gagal', 'error');
    playSnd('error');
  }
}
function ttDownloadImages(imagesJson) {
  const images = JSON.parse(decodeURIComponent(imagesJson));
  images.forEach((img, i) => {
    setTimeout(() => downloadURL(img, `tiktok_slide_${i+1}.jpg`), i * 500);
  });
  showToast(`📥 Download ${images.length} gambar...`, 'info');
}

// ============ TERABOX DOWNLOADER ============
async function tbDownload() {
  const url = document.getElementById('tbUrl').value.trim();
  if (!url) { showToast('❌ Masukkan link Terabox!', 'error'); return; }
  setLoading('tbResult', 'Ambil data dari Terabox...');
  playSnd('scan');
  try {
    const api = `https://terabox-worker.robinkumarshakya103.workers.dev/api?url=${encodeURIComponent(url)}`;
    const data = await fetchJSON(api);
    if (!data || data.status === 'error') throw new Error(data.message || 'Gagal ambil file');
    const list = data.list || data.files || [];
    if (!list.length) throw new Error('File gak ditemukan');
    let html = `<div class="info-row"><span>Total File</span><b>${list.length}</b></div>`;
    list.forEach((f, i) => {
      const name = f.filename || f.name || `file_${i+1}`;
      const size = f.size ? (f.size > 1048576 ? (f.size/1048576).toFixed(2)+' MB' : (f.size/1024).toFixed(1)+' KB') : '-';
      const link = f.downloadLink || f.dlink || f.url || '#';
      html += `
        <div class="result-box" style="margin-top:8px">
          <div class="info-row"><span>Nama</span><b>${esc(name)}</b></div>
          <div class="info-row"><span>Ukuran</span><b>${size}</b></div>
          <button class="btn btn-p btn-sm" style="margin-top:8px" onclick="downloadURL('${link}','${esc(name)}')">📥 Download</button>
        </div>
      `;
    });
    setResult('tbResult', html, 'success');
    showToast('✅ Berhasil!', 'success');
    playSnd('success');
  } catch (e) {
    setResult('tbResult', `❌ Error: ${esc(e.message)}<br><br>💡 API Terabox kadang down. Coba lagi nanti.`, 'error');
    showToast('❌ Gagal', 'error');
    playSnd('error');
  }
}

// ============ SPOTIFY DOWNLOADER ============
async function spDownload() {
  const url = document.getElementById('spUrl').value.trim();
  if (!url) { showToast('❌ Masukkan link Spotify!', 'error'); return; }
  setLoading('spResult', 'Coba ambil data...');
  playSnd('scan');
  try {
    // Coba spotidownloader API
    const api = `https://api.spotidownloader.com/?url=${encodeURIComponent(url)}`;
    const data = await fetchJSON(api);
    if (!data || !data.url) throw new Error('API gak return data');
    let html = `
      <div class="info-row"><span>Title</span><b>${esc(data.title || '-')}</b></div>
      <div class="info-row"><span>Artist</span><b>${esc(data.artist || '-')}</b></div>
      ${data.thumbnail ? `<img src="${data.thumbnail}" style="max-width:150px;border-radius:10px">` : ''}
      <button class="btn btn-p" style="margin-top:12px" onclick="downloadURL('${data.url}','spotify_${Date.now()}.mp3')">📥 Download MP3</button>
    `;
    setResult('spResult', html, 'success');
    showToast('✅ Berhasil!', 'success');
    playSnd('success');
  } catch (e) {
    setResult('spResult', `❌ Spotify API kadang gak stabil. Coba link lain atau ulangi.`, 'error');
    showToast('❌ Gagal', 'error');
    playSnd('error');
  }
}

// ============================================================
// ============ MAKER ============
// ============================================================

// Helper: bikin canvas
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}
function canvasToImg(canvas, resultId) {
  const img = canvas.toDataURL('image/png');
  document.getElementById(resultId).innerHTML = `
    <img src="${img}" alt="result">
    <div class="btn-row" style="margin-top:10px">
      <button class="btn btn-b btn-sm" onclick="downloadCanvas('${resultId}','darkgen_${Date.now()}.png')">📥 Save PNG</button>
    </div>
  `;
  document.getElementById(resultId)._canvas = canvas;
}
function downloadCanvas(resultId, filename) {
  const el = document.getElementById(resultId);
  const img = el.querySelector('img');
  if (!img) return;
  const a = document.createElement('a');
  a.href = img.src; a.download = filename;
  a.click();
  showToast('📥 Downloaded', 'success');
}

// ============ BRAT GENERATOR ============
function bratGen() {
  const text = document.getElementById('bratText').value || 'dark gen';
  const style = document.getElementById('bratStyle').value;
  const c = makeCanvas(500, 500);
  const ctx = c.getContext('2d');
  const colors = {
    white: { bg: '#ffffff', fg: '#000000' },
    black: { bg: '#000000', fg: '#ffffff' },
    green: { bg: '#8ace00', fg: '#000000' },
  };
  const col = colors[style] || colors.white;
  ctx.fillStyle = col.bg;
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = col.fg;
  ctx.font = 'bold 50px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.filter = 'blur(0.5px)';
  const lines = text.split('\n');
  const lineH = 55;
  const startY = 250 - ((lines.length - 1) * lineH) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line.toLowerCase(), 250, startY + i * lineH);
  });
  canvasToImg(c, 'bratResult');
  showToast('🎨 Generated', 'success');
}
function bratDownload() { downloadCanvas('bratResult', `brat_${Date.now()}.png`); }

// ============ FAKE DANA ============
function danaGen() {
  const saldo = document.getElementById('danaSaldo').value;
  const nama = document.getElementById('danaNama').value;
  const hp = document.getElementById('danaHp').value;
  const c = makeCanvas(600, 400);
  const ctx = c.getContext('2d');
  // Background gradient biru Dana
  const grad = ctx.createLinearGradient(0, 0, 0, 400);
  grad.addColorStop(0, '#118EEA');
  grad.addColorStop(1, '#0066CC');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 400);
  // Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('DANA', 30, 50);
  ctx.font = '14px Arial';
  ctx.fillText('Saldo Kamu', 30, 90);
  ctx.font = 'bold 40px Arial';
  ctx.fillText(saldo, 30, 140);
  // Card putih
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(30, 180, 540, 190, 15);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('👤 ' + nama, 60, 230);
  ctx.font = '14px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText(hp, 60, 260);
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#118EEA';
  ctx.fillText(saldo, 60, 320);
  canvasToImg(c, 'danaResult');
  showToast('💳 Generated', 'success');
}
function danaDownload() { downloadCanvas('danaResult', `dana_${Date.now()}.png`); }

// ============ FAKE OVO ============
function ovoGen() {
  const saldo = document.getElementById('ovoSaldo').value;
  const nama = document.getElementById('ovoNama').value;
  const c = makeCanvas(600, 400);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 400);
  grad.addColorStop(0, '#4C3494');
  grad.addColorStop(1, '#2D1B69');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 400);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('OVO', 30, 50);
  ctx.font = '14px Arial';
  ctx.fillText('Saldo OVO Cash', 30, 90);
  ctx.font = 'bold 40px Arial';
  ctx.fillText(saldo, 30, 140);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(30, 180, 540, 190, 15);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('👤 ' + nama, 60, 240);
  ctx.font = '14px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText('OVO Premier', 60, 270);
  canvasToImg(c, 'ovoResult');
  showToast('💰 Generated', 'success');
}
function ovoDownload() { downloadCanvas('ovoResult', `ovo_${Date.now()}.png`); }

// ============ E-KTP ============
function ktpGen() {
  const nik = document.getElementById('ktpNik').value;
  const nama = document.getElementById('ktpNama').value;
  const ttl = document.getElementById('ktpTtl').value;
  const jk = document.getElementById('ktpJk').value;
  const alamat = document.getElementById('ktpAlamat').value;
  const c = makeCanvas(700, 450);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#D6E5F5';
  ctx.fillRect(0, 0, 700, 450);
  // Border
  ctx.strokeStyle = '#1F5FA0';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 680, 430);
  // Header
  ctx.fillStyle = '#1F5FA0';
  ctx.font = 'bold 14px Arial';
  ctx.fillText('PROVINSI DKI JAKARTA', 230, 40);
  ctx.fillText('KOTA JAKARTA PUSAT', 235, 60);
  // NIK
  ctx.font = 'bold 20px Arial';
  ctx.fillText('NIK : ' + nik, 40, 110);
  // Data rows
  const rows = [
    ['Nama', nama],
    ['Tempat/Tgl Lahir', ttl],
    ['Jenis Kelamin', jk],
    ['Alamat', alamat],
    ['Agama', 'ISLAM'],
    ['Status Perkawinan', 'BELUM KAWIN'],
    ['Pekerjaan', 'PELAJAR/MAHASISWA'],
    ['Kewarganegaraan', 'WNI'],
    ['Berlaku Hingga', 'SEUMUR HIDUP'],
  ];
  ctx.font = '13px Arial';
  rows.forEach((r, i) => {
    ctx.fillStyle = '#000';
    ctx.fillText(r[0], 40, 145 + i * 30);
    ctx.fillText(':', 200, 145 + i * 30);
    ctx.font = 'bold 13px Arial';
    ctx.fillText(r[1], 220, 145 + i * 30);
    ctx.font = '13px Arial';
  });
  // Foto placeholder
  ctx.fillStyle = '#A8C4E0';
  ctx.fillRect(520, 130, 140, 180);
  ctx.fillStyle = '#1F5FA0';
  ctx.font = 'bold 12px Arial';
  ctx.fillText('FOTO', 575, 225);
  canvasToImg(c, 'ktpResult');
  showToast('🆔 Generated', 'success');
}
function ktpDownload() { downloadCanvas('ktpResult', `ktp_${Date.now()}.png`); }

// ============ FAKE TWEET ============
function tweetGen() {
  const nama = document.getElementById('twNama').value;
  const user = document.getElementById('twUser').value;
  const text = document.getElementById('twText').value;
  const c = makeCanvas(600, 300);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 600, 300);
  // Avatar
  ctx.fillStyle = '#1DA1F2';
  ctx.beginPath();
  ctx.arc(70, 80, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(nama.charAt(0).toUpperCase(), 70, 90);
  ctx.textAlign = 'left';
  // Nama
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(nama, 120, 70);
  ctx.fillStyle = '#8899A6';
  ctx.font = '14px Arial';
  ctx.fillText(user, 120, 92);
  // Text
  ctx.fillStyle = '#fff';
  ctx.font = '18px Arial';
  const lines = wrapText(ctx, text, 480);
  lines.forEach((line, i) => {
    ctx.fillText(line, 60, 150 + i * 28);
  });
  // Footer
  ctx.fillStyle = '#8899A6';
  ctx.font = '13px Arial';
  ctx.fillText('🐦  DARK GEN by PANN', 60, 270);
  canvasToImg(c, 'twResult');
  showToast('🐦 Generated', 'success');
}
function tweetDownload() { downloadCanvas('twResult', `tweet_${Date.now()}.png`); }

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  words.forEach(word => {
    const test = current ? current + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  });
  if (current) lines.push(current);
  return lines;
}

// ============ NOKIA MESSAGE ============
function nokiaGen() {
  const from = document.getElementById('nkFrom').value;
  const msg = document.getElementById('nkMsg').value;
  const c = makeCanvas(400, 500);
  const ctx = c.getContext('2d');
  // Body HP
  ctx.fillStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.roundRect(50, 20, 300, 460, 30);
  ctx.fill();
  // Screen
  ctx.fillStyle = '#9BBC0F';
  ctx.fillRect(80, 60, 240, 300);
  // Text
  ctx.fillStyle = '#0F380F';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('SMS', 95, 85);
  ctx.font = '12px monospace';
  ctx.fillText(from, 95, 105);
  ctx.fillText('─'.repeat(20), 95, 120);
  const lines = wrapText(ctx, msg, 210);
  lines.forEach((line, i) => {
    ctx.fillText(line, 95, 145 + i * 18);
  });
  // Keypad
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(80, 380, 240, 80);
  ctx.fillStyle = '#666';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('NOKIA', 200, 425);
  canvasToImg(c, 'nkResult');
  showToast('📟 Generated', 'success');
}
function nokiaDownload() { downloadCanvas('nkResult', `nokia_${Date.now()}.png`); }

// ============ WINDOWS QUOTES ============
function wqGen() {
  const title = document.getElementById('wqTitle').value;
  const msg = document.getElementById('wqMsg').value;
  const c = makeCanvas(500, 300);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, 500, 300);
  // Title bar
  ctx.fillStyle = '#1E90FF';
  ctx.fillRect(0, 0, 500, 40);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px Arial';
  ctx.fillText(title, 15, 25);
  // X button
  ctx.fillStyle = '#E81123';
  ctx.fillRect(460, 0, 40, 40);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('✕', 480, 26);
  ctx.textAlign = 'left';
  // Icon warning
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(70, 120, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('!', 70, 135);
  ctx.textAlign = 'left';
  // Text
  ctx.fillStyle = '#000';
  ctx.font = '14px Arial';
  const lines = wrapText(ctx, msg, 320);
  lines.forEach((line, i) => {
    ctx.fillText(line, 130, 100 + i * 20);
  });
  // OK button
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(200, 240, 100, 35);
  ctx.strokeStyle = '#999';
  ctx.strokeRect(200, 240, 100, 35);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 13px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('OK', 250, 262);
  canvasToImg(c, 'wqResult');
  showToast('🪟 Generated', 'success');
}
function wqDownload() { downloadCanvas('wqResult', `winquote_${Date.now()}.png`); }

// ============ QUOTE GENERATOR ============
function qgGen() {
  const text = document.getElementById('qgText').value;
  const author = document.getElementById('qgAuthor').value;
  const c = makeCanvas(600, 600);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 600, 600);
  grad.addColorStop(0, '#0a0a0f');
  grad.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 600);
  // Quote mark
  ctx.fillStyle = 'rgba(168,85,247,0.3)';
  ctx.font = 'bold 200px Georgia';
  ctx.fillText('"', 50, 200);
  // Text
  ctx.fillStyle = '#fff';
  ctx.font = 'italic 28px Georgia';
  ctx.textAlign = 'center';
  const lines = wrapText(ctx, text, 450);
  const startY = 300 - ((lines.length - 1) * 40) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, 300, startY + i * 40);
  });
  // Author
  ctx.fillStyle = '#a855f7';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('— ' + author, 300, 480);
  // Footer
  ctx.fillStyle = 'rgba(168,85,247,0.5)';
  ctx.font = '11px Arial';
  ctx.fillText('⚡ DARK GEN by PANN', 300, 560);
  ctx.textAlign = 'left';
  canvasToImg(c, 'qgResult');
  showToast('💬 Generated', 'success');
}
function qgDownload() { downloadCanvas('qgResult', `quote_${Date.now()}.png`); }

// ============ SERTIFIKAT TOLOL ============
function stGen() {
  const nama = document.getElementById('stNama').value;
  const pred = document.getElementById('stPred').value;
  const c = makeCanvas(800, 500);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#FAF3E0';
  ctx.fillRect(0, 0, 800, 500);
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 760, 460);
  ctx.lineWidth = 2;
  ctx.strokeRect(35, 35, 730, 430);
  ctx.fillStyle = '#8B0000';
  ctx.font = 'bold 36px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('SERTIFIKAT', 400, 120);
  ctx.font = 'italic 18px Georgia';
  ctx.fillText('Dengan ini menyatakan bahwa', 400, 170);
  ctx.font = 'bold 42px Georgia';
  ctx.fillStyle = '#000';
  ctx.fillText(nama, 400, 240);
  ctx.font = 'italic 16px Georgia';
  ctx.fillStyle = '#444';
  ctx.fillText('Telah berhasil mendapatkan predikat', 400, 290);
  ctx.font = 'bold 22px Georgia';
  ctx.fillStyle = '#8B0000';
  ctx.fillText('"' + pred + '"', 400, 340);
  ctx.font = 'italic 12px Georgia';
  ctx.fillStyle = '#666';
  ctx.fillText('Diberikan dengan penuh kebanggaan (dan sedikit kelucuan)', 400, 380);
  // Tanda tangan
  ctx.font = '13px Georgia';
  ctx.fillStyle = '#000';
  ctx.fillText('DARK GEN', 600, 440);
  ctx.beginPath(); ctx.moveTo(520, 435); ctx.lineTo(680, 435);
  ctx.strokeStyle = '#000'; ctx.lineWidth = 1; ctx.stroke();
  ctx.textAlign = 'left';
  canvasToImg(c, 'stResult');
  showToast('📜 Generated', 'success');
}
function stDownload() { downloadCanvas('stResult', `sertifikat_${Date.now()}.png`); }

// ============ TANYA USTADZ ============
function ustadzGen() {
  const q = document.getElementById('usQ').value;
  const c = makeCanvas(500, 500);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 500, 500);
  grad.addColorStop(0, '#1a3a1a');
  grad.addColorStop(1, '#0a1a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 500, 500);
  // Bubble question
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.roundRect(40, 60, 420, 150, 20);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px Arial';
  const lines = wrapText(ctx, q, 380);
  lines.forEach((line, i) => {
    ctx.fillText(line, 60, 100 + i * 24);
  });
  // Avatar ustadz
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(250, 350, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a3a1a';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('👳', 250, 370);
  ctx.textAlign = 'left';
  // Caption
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('"Astaghfirullah..."', 250, 460);
  ctx.textAlign = 'left';
  canvasToImg(c, 'usResult');
  showToast('🕌 Generated', 'success');
}
function ustadzDownload() { downloadCanvas('usResult', `ustadz_${Date.now()}.png`); }

// ============ FAKE LOBBY ============
function lobbyGen() {
  const game = document.getElementById('flGame').value;
  const squad = document.getElementById('flSquad').value;
  const rank = document.getElementById('flRank').value;
  const c = makeCanvas(700, 400);
  const ctx = c.getContext('2d');
  const isFF = game === 'ff';
  const grad = ctx.createLinearGradient(0, 0, 0, 400);
  grad.addColorStop(0, isFF ? '#FF6B00' : '#1a3a8f');
  grad.addColorStop(1, isFF ? '#8B0000' : '#0a1a4f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 700, 400);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(isFF ? 'FREE FIRE' : 'MOBILE LEGENDS', 30, 50);
  ctx.font = '16px Arial';
  ctx.fillText('SQUAD: ' + squad, 30, 100);
  ctx.font = 'bold 20px Arial';
  ctx.fillText('RANK: ' + rank, 30, 140);
  // 4 kotak player
  for (let i = 0; i < 4; i++) {
    const x = 50 + i * 160;
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.roundRect(x, 180, 140, 180, 12);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PLAYER ' + (i + 1), x + 70, 320);
  }
  ctx.textAlign = 'left';
  // Footer
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '10px Arial';
  ctx.fillText('⚡ DARK GEN by PANN', 30, 385);
  canvasToImg(c, 'flResult');
  showToast('🎮 Generated', 'success');
}
function lobbyDownload() { downloadCanvas('flResult', `lobby_${Date.now()}.png`); }

// ============ FAKE DEV ============
function fdGen() {
  const nama = document.getElementById('fdNama').value;
  const role = document.getElementById('fdRole').value;
  const bio = document.getElementById('fdBio').value;
  const c = makeCanvas(600, 400);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 600, 400);
  grad.addColorStop(0, '#0a0a0f');
  grad.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 400);
  // Avatar
  ctx.fillStyle = 'rgba(168,85,247,0.2)';
  ctx.beginPath();
  ctx.arc(100, 130, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 50px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('👨‍💻', 100, 150);
  ctx.textAlign = 'left';
  // Nama
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(nama, 190, 110);
  ctx.fillStyle = '#a855f7';
  ctx.font = '14px Arial';
  ctx.fillText(role, 190, 140);
  // Bio
  ctx.fillStyle = '#8b949e';
  ctx.font = '14px Arial';
  const lines = wrapText(ctx, bio, 500);
  lines.forEach((line, i) => {
    ctx.fillText(line, 40, 250 + i * 22);
  });
  // Footer
  ctx.fillStyle = 'rgba(168,85,247,0.4)';
  ctx.font = '11px Arial';
  ctx.fillText('⚡ DARK GEN by PANN', 40, 380);
  canvasToImg(c, 'fdResult');
  showToast('👨‍💻 Generated', 'success');
}
function fdDownload() { downloadCanvas('fdResult', `dev_${Date.now()}.png`); }

// ============ FAKE TIKTOK CHAT ============
function ttcGen() {
  const nama = document.getElementById('ftcNama').value;
  const msg = document.getElementById('ftcMsg').value;
  const c = makeCanvas(500, 300);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 500, 300);
  // Avatar
  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.arc(60, 100, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(nama.charAt(0).toUpperCase(), 60, 110);
  ctx.textAlign = 'left';
  // Bubble
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.roundRect(110, 60, 350, 100, 20);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px Arial';
  ctx.fillText(nama, 130, 90);
  ctx.font = '14px Arial';
  ctx.fillStyle = '#ccc';
  const lines = wrapText(ctx, msg, 310);
  lines.forEach((line, i) => {
    ctx.fillText(line, 130, 115 + i * 20);
  });
  // Footer
  ctx.fillStyle = 'rgba(168,85,247,0.5)';
  ctx.font = '10px Arial';
  ctx.fillText('⚡ DARK GEN by PANN', 20, 280);
  canvasToImg(c, 'ftcResult');
  showToast('💬 Generated', 'success');
}
function ttcDownload() { downloadCanvas('ftcResult', `ttchat_${Date.now()}.png`); }

// ============ FAKE BANK JAGO ============
function jagoGen() {
  const saldo = document.getElementById('jgSaldo').value;
  const nama = document.getElementById('jgNama').value;
  const c = makeCanvas(600, 400);
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 400);
  grad.addColorStop(0, '#FF8A00');
  grad.addColorStop(1, '#FF5A00');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 400);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('JAGO', 30, 50);
  ctx.font = '14px Arial';
  ctx.fillText('Saldo Utama', 30, 90);
  ctx.font = 'bold 42px Arial';
  ctx.fillText(saldo, 30, 140);
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.roundRect(30, 180, 540, 190, 15);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = 'bold 18px Arial';
  ctx.fillText('👤 ' + nama, 60, 240);
  ctx.font = '14px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText('Kantong Utama', 60, 270);
  ctx.font = 'bold 22px Arial';
  ctx.fillStyle = '#FF5A00';
  ctx.fillText(saldo, 60, 340);
  canvasToImg(c, 'jgResult');
  showToast('🏦 Generated', 'success');
}
function jagoDownload() { downloadCanvas('jgResult', `jago_${Date.now()}.png`); }

// ============ IQC GENERATOR ============
function iqcGen() {
  const nama = document.getElementById('iqcNama').value;
  const text = document.getElementById('iqcText').value;
  const c = makeCanvas(500, 500);
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(250, 250, 50, 250, 250, 300);
  grad.addColorStop(0, '#a855f7');
  grad.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 500, 500);
  // Circle border
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(250, 250, 220, 0, Math.PI * 2);
  ctx.stroke();
  // Nama
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(nama.toUpperCase(), 250, 200);
  // Text
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#fff';
  const lines = wrapText(ctx, text, 380);
  lines.forEach((line, i) => {
    ctx.fillText(line, 250, 270 + i * 28);
  });
  // Footer
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '11px Arial';
  ctx.fillText('⚡ DARK GEN by PANN', 250, 460);
  ctx.textAlign = 'left';
  canvasToImg(c, 'iqcResult');
  showToast('🎯 Generated', 'success');
}
function iqcDownload() { downloadCanvas('iqcResult', `iqc_${Date.now()}.png`); }

// ============================================================
// ============ END PART 1 ============
// ============================================================
console.log('⚡ DARK GEN — tools.js PART 1 loaded (Downloader + Maker)');
/* ============ DARK GEN — TOOLS LOGIC (PART 2: Tools + Security) ============ */
/* ⚠️ PASTE DI BAWAH PART 1 — jangan hapus PART 1 */

// ============================================================
// ============ TOOLS ============
// ============================================================

// ============ QR GENERATOR ============
function qrGen() {
  const text = document.getElementById('qrText').value.trim();
  if (!text) { showToast('❌ Masukkan teks!', 'error'); return; }
  setLoading('qrResult', 'Generate QR...');
  try {
    const size = 300;
    const api = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=0a0a0f&color=a855f7`;
    document.getElementById('qrResult').innerHTML = `
      <div style="text-align:center;padding:10px">
        <img src="${api}" style="max-width:100%;border-radius:10px;border:2px solid var(--pn)" alt="QR">
        <div class="btn-row" style="margin-top:12px">
          <button class="btn btn-p btn-sm" onclick="downloadURL('${api}','qr_${Date.now()}.png')">📥 Download QR</button>
          <button class="btn btn-b btn-sm" onclick="copyText('${esc(text)}')">📋 Copy Text</button>
        </div>
        <div style="font-size:11px;color:var(--mt);margin-top:10px;word-break:break-all">${esc(text)}</div>
      </div>
    `;
    showToast('🔲 QR Generated!', 'success');
    playSnd('success');
  } catch (e) {
    setResult('qrResult', `❌ ${esc(e.message)}`, 'error');
  }
}

// ============ PASSWORD GENERATOR ============
function pwGen() {
  const len = parseInt(document.getElementById('pwLen').value) || 16;
  const useU = document.getElementById('pwUpper').checked;
  const useL = document.getElementById('pwLower').checked;
  const useN = document.getElementById('pwNum').checked;
  const useS = document.getElementById('pwSym').checked;
  let chars = '';
  if (useU) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useL) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (useN) chars += '0123456789';
  if (useS) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) { showToast('❌ Pilih minimal 1 opsi!', 'error'); return; }
  let pw = '';
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  for (let i = 0; i < len; i++) {
    pw += chars[arr[i] % chars.length];
  }
  // Strength check
  let strength = 0;
  if (len >= 8) strength++;
  if (len >= 12) strength++;
  if (len >= 16) strength++;
  if (useU && useL) strength++;
  if (useN) strength++;
  if (useS) strength++;
  const levels = ['WEAK', 'WEAK', 'FAIR', 'GOOD', 'STRONG', 'VERY STRONG', 'EXCELLENT'];
  const level = levels[Math.min(strength, 6)];
  const cls = strength >= 5 ? 'success' : strength >= 3 ? 'info' : 'error';
  document.getElementById('pwResult').innerHTML = `
    <div class="result-box ${cls}">
      <div style="font-size:11px;margin-bottom:6px">Password:</div>
      <div style="font-family:monospace;font-size:16px;font-weight:bold;word-break:break-all;user-select:all">${esc(pw)}</div>
      <div style="font-size:11px;margin-top:8px">Strength: <b>${level}</b></div>
    </div>
    <div class="btn-row">
      <button class="btn btn-p btn-sm" onclick="copyText('${esc(pw)}')">📋 Copy</button>
      <button class="btn btn-b btn-sm" onclick="pwGen()">🔄 Regenerate</button>
    </div>
  `;
  showToast('🔐 Password OK!', 'success');
  playSnd('success');
}

// ============ CALCULATOR ============
function calcDo() {
  const exp = document.getElementById('calcExp').value.trim();
  if (!exp) return;
  // Sanitize — cuma angka + operator
  const safe = exp.replace(/[^0-9+\-*/().%\s]/g, '');
  if (safe !== exp) {
    setResult('calcResult', `❌ Karakter gak valid dihapus: <code>${esc(safe)}</code>`, 'error');
  }
  try {
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict";return (' + safe + ')')();
    setResult('calcResult', `
      <div style="font-size:13px;color:var(--mt)">${esc(safe)}</div>
      <div style="font-size:24px;font-weight:bold;color:var(--gn);margin-top:8px">= ${result}</div>
    `, 'success');
    playSnd('success');
  } catch (e) {
    setResult('calcResult', `❌ Ekspresi gak valid`, 'error');
    playSnd('error');
  }
}

// ============ MORSE CODE ============
const MORSE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/', '.': '.-.-.-', ',': '--..--',
  '?': '..--..', '!': '-.-.--', "'": '.----.', '"': '.-..-.', '/': '-..-.',
  '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
  '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '$': '...-..-',
  '@': '.--.-.'
};
function morseEncode() {
  const text = document.getElementById('morseInput').value.toUpperCase();
  if (!text) return;
  const result = text.split('').map(c => MORSE_MAP[c] || '?').join(' ');
  setResult('morseResult', `
    <div style="font-size:11px;color:var(--mt)">Morse:</div>
    <div style="font-family:monospace;font-size:16px;word-break:break-all;margin-top:6px;user-select:all">${esc(result)}</div>
    <button class="btn btn-p btn-sm" style="margin-top:10px" onclick="copyText('${esc(result)}')">📋 Copy</button>
  `, 'success');
  playSnd('success');
}
function morseDecode() {
  const morse = document.getElementById('morseInput').value.trim();
  if (!morse) return;
  const reverse = {};
  for (const [k, v] of Object.entries(MORSE_MAP)) reverse[v] = k;
  const result = morse.split(/\s+/).map(c => reverse[c] || '?').join('');
  setResult('morseResult', `
    <div style="font-size:11px;color:var(--mt)">Text:</div>
    <div style="font-size:18px;font-weight:bold;margin-top:6px;user-select:all">${esc(result)}</div>
    <button class="btn btn-p btn-sm" style="margin-top:10px" onclick="copyText('${esc(result)}')">📋 Copy</button>
  `, 'success');
  playSnd('success');
}

// ============ BASE64 ============
function b64Encode() {
  const text = document.getElementById('b64Input').value;
  if (!text) return;
  try {
    const result = btoa(unescape(encodeURIComponent(text)));
    setResult('b64Result', `
      <div style="font-size:11px;color:var(--mt)">Base64 Encoded:</div>
      <div style="font-family:monospace;font-size:12px;word-break:break-all;margin-top:6px;user-select:all">${esc(result)}</div>
      <button class="btn btn-p btn-sm" style="margin-top:10px" onclick="copyText('${esc(result)}')">📋 Copy</button>
    `, 'success');
    playSnd('success');
  } catch (e) {
    setResult('b64Result', `❌ ${esc(e.message)}`, 'error');
  }
}
function b64Decode() {
  const text = document.getElementById('b64Input').value.trim();
  if (!text) return;
  try {
    const result = decodeURIComponent(escape(atob(text)));
    setResult('b64Result', `
      <div style="font-size:11px;color:var(--mt)">Decoded:</div>
      <div style="font-size:14px;margin-top:6px;user-select:all">${esc(result)}</div>
      <button class="btn btn-p btn-sm" style="margin-top:10px" onclick="copyText('${esc(result)}')">📋 Copy</button>
    `, 'success');
    playSnd('success');
  } catch (e) {
    setResult('b64Result', `❌ Base64 gak valid`, 'error');
    playSnd('error');
  }
}

// ============ SCREENSHOT WEBSITE ============
function ssGen() {
  let url = document.getElementById('ssUrl').value.trim();
  if (!url) { showToast('❌ Masukkan URL!', 'error'); return; }
  if (!url.startsWith('http')) url = 'https://' + url;
  setLoading('ssResult', 'Ambil screenshot...');
  playSnd('scan');
  const api = `https://image.thum.io/get/width/800/crop/1200/noanimate/${encodeURIComponent(url)}`;
  const img = new Image();
  img.onload = () => {
    document.getElementById('ssResult').innerHTML = `
      <img src="${api}" alt="screenshot">
      <div class="btn-row" style="margin-top:10px">
        <button class="btn btn-p btn-sm" onclick="downloadURL('${api}','screenshot_${Date.now()}.png')">📥 Download</button>
        <button class="btn btn-b btn-sm" onclick="window.open('${api}','_blank')">🔗 Buka Full</button>
      </div>
    `;
    showToast('📸 Screenshot OK!', 'success');
    playSnd('success');
  };
  img.onerror = () => {
    setResult('ssResult', `❌ Gagal ambil screenshot. Coba lagi nanti.`, 'error');
    showToast('❌ Gagal', 'error');
  };
  img.src = api;
}

// ============ IMAGE COMPRESSOR ============
let icImage = null;
function icLoad(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    icImage = new Image();
    icImage.onload = () => {
      document.getElementById('icResult').innerHTML = `
        <div style="font-size:11px;color:var(--mt)">Preview:</div>
        <img src="${ev.target.result}" style="max-width:100%;max-height:200px">
        <div style="font-size:11px;color:var(--mt);margin-top:6px">
          Original: ${(file.size/1024).toFixed(1)} KB · ${icImage.width}×${icImage.height}
        </div>
      `;
    };
    icImage.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}
function icDo() {
  if (!icImage) { showToast('❌ Pilih gambar dulu!', 'error'); return; }
  const quality = parseFloat(document.getElementById('icQual').value) || 0.7;
  const format = document.getElementById('icFmt').value;
  const canvas = document.createElement('canvas');
  canvas.width = icImage.width;
  canvas.height = icImage.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(icImage, 0, 0);
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const size = (blob.size / 1024).toFixed(1);
    const origSize = (icImage.src.length * 0.75 / 1024).toFixed(1);
    document.getElementById('icResult').innerHTML = `
      <img src="${url}" style="max-width:100%;max-height:200px">
      <div class="result-box success" style="margin-top:10px">
        <div style="font-size:12px">Compressed: <b>${size} KB</b></div>
        <div style="font-size:11px;margin-top:4px">Format: ${format.split('/')[1].toUpperCase()}</div>
      </div>
      <button class="btn btn-p" style="margin-top:10px" onclick="downloadBlobURL('${url}','compressed_${Date.now()}.${format.split('/')[1]}')">📥 Download</button>
    `;
    showToast('🖼️ Compressed!', 'success');
    playSnd('success');
  }, format, quality);
}
function downloadBlobURL(url, filename) {
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  a.click();
  showToast('📥 Downloaded', 'success');
}

// ============================================================
// ============ SECURITY ============
// ============================================================

// ============ IP / DOMAIN LOOKUP ============
async function ipLookup() {
  const input = document.getElementById('ipInput').value.trim();
  if (!input) { showToast('❌ Masukkan IP/domain!', 'error'); return; }
  setLoading('ipResult', 'Lookup...');
  playSnd('scan');
  try {
    const r = await fetch(`http://ip-api.com/json/${encodeURIComponent(input)}?fields=status,message,country,regionName,city,isp,org,as,timezone,lat,lon,query`);
    const d = await r.json();
    if (d.status !== 'success') throw new Error(d.message || 'Lookup gagal');
    let html = `
      <div class="info-row"><span>IP</span><b>${esc(d.query)}</b></div>
      <div class="info-row"><span>Negara</span><b>${esc(d.country || '-')}</b></div>
      <div class="info-row"><span>Region</span><b>${esc(d.regionName || '-')}</b></div>
      <div class="info-row"><span>Kota</span><b>${esc(d.city || '-')}</b></div>
      <div class="info-row"><span>ISP</span><b>${esc(d.isp || '-')}</b></div>
      <div class="info-row"><span>Org</span><b>${esc(d.org || '-')}</b></div>
      <div class="info-row"><span>ASN</span><b>${esc(d.as || '-')}</b></div>
      <div class="info-row"><span>Timezone</span><b>${esc(d.timezone || '-')}</b></div>
      <div class="info-row"><span>Koordinat</span><b>${d.lat}, ${d.lon}</b></div>
      <button class="btn btn-b btn-sm" style="margin-top:10px" onclick="window.open('https://www.google.com/maps?q=${d.lat},${d.lon}','_blank')">🗺️ Buka Maps</button>
    `;
    setResult('ipResult', html, 'success');
    showToast('✅ IP OK', 'success');
    playSnd('success');
  } catch (e) {
    setResult('ipResult', `❌ ${esc(e.message)}`, 'error');
    playSnd('error');
  }
}

// ============ VIRUS SCAN URL (URLhaus) ============
async function vsScan() {
  const url = document.getElementById('vsUrl').value.trim();
  if (!url) { showToast('❌ Masukkan URL!', 'error'); return; }
  setLoading('vsResult', 'Scan URL...');
  playSnd('scan');
  try {
    // URLhaus API
    const body = new URLSearchParams();
    body.append('url', url);
    const r = await fetch('https://urlhaus-api.abuse.ch/v1/url/', {
      method: 'POST',
      body: body,
    });
    const d = await r.json();
    let html = '';
    if (d.query_status === 'no_results') {
      html = `
        <div style="font-size:13px;margin-bottom:8px">URL: <code style="word-break:break-all">${esc(url)}</code></div>
        <div style="font-size:14px;color:var(--gn);font-weight:bold">✅ Gak ditemukan di blacklist URLhaus</div>
        <div style="font-size:11px;color:var(--mt);margin-top:8px">Ini bukan jaminan URL 100% aman. Tetap hati-hati.</div>
      `;
      setResult('vsResult', html, 'success');
    } else if (d.query_status === 'is_listed') {
      html = `
        <div style="font-size:13px;margin-bottom:8px">URL: <code style="word-break:break-all">${esc(url)}</code></div>
        <div style="font-size:14px;color:var(--rd);font-weight:bold">🚨 URL BLACKLISTED!</div>
        <div class="info-row"><span>Threat</span><b>${esc(d.threat || '-')}</b></div>
        <div class="info-row"><span>Tags</span><b>${esc((d.tags || []).join(', ') || '-')}</b></div>
        <div class="info-row"><span>Date Added</span><b>${esc(d.date_added || '-')}</b></div>
        <div class="info-row"><span>Status</span><b>${esc(d.url_status || '-')}</b></div>
      `;
      setResult('vsResult', html, 'error');
    } else {
      html = `⚠️ Query status: ${esc(d.query_status || 'unknown')}`;
      setResult('vsResult', html, 'info');
    }
    showToast('🛡️ Scan selesai', 'success');
    playSnd('success');
  } catch (e) {
    setResult('vsResult', `❌ ${esc(e.message)}<br><br>💡 API URLhaus kadang rate limit. Coba lagi.`, 'error');
    playSnd('error');
  }
}

// ============ DNS LOOKUP ============
async function dnsLookup() {
  const domain = document.getElementById('dnsInput').value.trim();
  if (!domain) { showToast('❌ Masukkan domain!', 'error'); return; }
  setLoading('dnsResult', 'Lookup DNS...');
  playSnd('scan');
  try {
    const types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA'];
    let html = '';
    for (const t of types) {
      try {
        const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${t}`);
        const d = await r.json();
        if (d.Answer && d.Answer.length) {
          d.Answer.forEach(a => {
            html += `<div class="info-row"><span>${t}</span><b style="font-size:10px">${esc(a.data)}</b></div>`;
          });
        } else {
          html += `<div class="info-row"><span>${t}</span><b style="color:var(--mt)">—</b></div>`;
        }
      } catch (e) {
        html += `<div class="info-row"><span>${t}</span><b style="color:var(--rd)">error</b></div>`;
      }
    }
    setResult('dnsResult', html, 'success');
    showToast('📡 DNS OK', 'success');
    playSnd('success');
  } catch (e) {
    setResult('dnsResult', `❌ ${esc(e.message)}`, 'error');
    playSnd('error');
  }
}

// ============================================================
// ============ END PART 2 ============
// ============================================================
console.log('⚡ DARK GEN — tools.js PART 2 loaded (Tools + Security)');
console.log('⚡ DARK GEN FULLY LOADED — All tools ready!');