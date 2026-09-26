/* ============ DARK GEN v5.0 — DATA TOOLS ============ */
const TOOLS = [
  // ============================================================
  // ============ DOWNLOADER ============
  // ============================================================
  {
    id: 'terabox',
    name: 'Terabox Downloader',
    desc: 'Ambil file dari link share Terabox',
    icon: '📦',
    cat: 'downloader',
    tag: 'FILE',
    vip: false,
    render: () => `
      <label>Link Terabox</label>
      <input id="tbUrl" type="text" placeholder="https://terabox.com/s/...">
      <button class="btn btn-p" onclick="tbDownload()">📥 Ambil File</button>
      <div id="tbResult"></div>
    `,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    desc: 'Video, foto & audio tanpa watermark',
    icon: '📱',
    cat: 'downloader',
    tag: 'MP4/MP3/JPG',
    vip: false,
    render: () => `
      <label>Link TikTok</label>
      <input id="ttUrl" type="text" placeholder="https://vt.tiktok.com/...">
      <button class="btn btn-p" onclick="ttDownload()">📥 Download</button>
      <div id="ttResult"></div>
    `,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    desc: 'Download video & foto dari Instagram',
    icon: '📷',
    cat: 'downloader',
    tag: 'HD',
    vip: false,
    render: () => `
      <label>Link Instagram</label>
      <input id="igUrl" type="text" placeholder="https://www.instagram.com/p/...">
      <button class="btn btn-p" onclick="igDownload()">📥 Download</button>
      <div id="igResult"></div>
    `,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    desc: 'Video & audio dari YouTube',
    icon: '▶️',
    cat: 'downloader',
    tag: 'MP4/MP3',
    vip: false,
    render: () => `
      <div class="result-box info">⚠️ YouTube sering update API — fitur ini kadang tidak stabil.</div>
      <label>Link YouTube</label>
      <input id="ytUrl" type="text" placeholder="https://youtu.be/...">
      <button class="btn btn-p" onclick="ytDownload()">📥 Coba Download</button>
      <div id="ytResult"></div>
    `,
  },
  {
    id: 'spotify',
    name: 'Spotify Downloader',
    desc: 'Cari lagu, preview audio, unduh ke MP3',
    icon: '🎵',
    cat: 'downloader',
    tag: 'MP3',
    vip: false,
    render: () => `
      <div class="result-box info">⚠️ Fitur unofficial — kadang work, kadang nggak.</div>
      <label>Link Spotify</label>
      <input id="spUrl" type="text" placeholder="https://open.spotify.com/track/...">
      <button class="btn btn-p" onclick="spDownload()">📥 Coba Download</button>
      <div id="spResult"></div>
    `,
  },

  // ============================================================
  // ============ MAKER ============
  // ============================================================
  {
    id: 'brat',
    name: 'BRAT Generator',
    desc: 'Static + animated GIF ala BRAT',
    icon: '🎨',
    cat: 'maker',
    tag: 'GIF',
    vip: false,
    render: () => `
      <label>Teks</label>
      <textarea id="bratText" rows="3">dark gen</textarea>
      <label>Style</label>
      <select id="bratStyle">
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="green">Green</option>
      </select>
      <div class="btn-row">
        <button class="btn btn-p" onclick="bratGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="bratDownload()">📥 Save</button>
      </div>
      <div id="bratResult"></div>
    `,
  },
  {
    id: 'iqc',
    name: 'IQC Generator',
    desc: 'Buat gambar IQC style Operator',
    icon: '🎯',
    cat: 'maker',
    tag: 'STYLE',
    vip: false,
    render: () => `
      <label>Nama</label>
      <input id="iqcNama" type="text" value="PANN">
      <label>Kata-kata</label>
      <textarea id="iqcText" rows="2">Tim ini solid!</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="iqcGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="iqcDownload()">📥 Save</button>
      </div>
      <div id="iqcResult"></div>
    `,
  },
  {
    id: 'sertifikat',
    name: 'Sertifikat Tolol',
    desc: 'Buat sertifikat parodi dari nama',
    icon: '📜',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
    render: () => `
      <label>Nama</label>
      <input id="stNama" type="text" value="PANN">
      <label>Predikat</label>
      <input id="stPred" type="text" value="Juara 1 Rebahan Se-Indonesia">
      <div class="btn-row">
        <button class="btn btn-p" onclick="stGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="stDownload()">📥 Save</button>
      </div>
      <div id="stResult"></div>
    `,
  },
  {
    id: 'ektp',
    name: 'E-KTP Generator',
    desc: 'Buat tampilan E-KTP demo',
    icon: '🆔',
    cat: 'maker',
    tag: 'DEMO',
    vip: false,
    render: () => `
      <div class="result-box info">⚠️ Hanya demo visual.</div>
      <label>NIK</label>
      <input id="ktpNik" type="text" value="3201234567890001" maxlength="16">
      <label>Nama</label>
      <input id="ktpNama" type="text" value="PANN">
      <label>Tempat/Tgl Lahir</label>
      <input id="ktpTtl" type="text" value="Jakarta, 01-01-2000">
      <label>Jenis Kelamin</label>
      <select id="ktpJk"><option>LAKI-LAKI</option><option>PEREMPUAN</option></select>
      <label>Alamat</label>
      <input id="ktpAlamat" type="text" value="Jl. Contoh No. 1">
      <div class="btn-row">
        <button class="btn btn-p" onclick="ktpGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="ktpDownload()">📥 Save</button>
      </div>
      <div id="ktpResult"></div>
    `,
  },
  {
    id: 'fake-dana',
    name: 'Fake Dana',
    desc: 'Generate saldo Dana palsu',
    icon: '💳',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
    render: () => `
      <label>Saldo</label>
      <input id="danaSaldo" type="text" value="Rp 1.000.000">
      <label>Nama</label>
      <input id="danaNama" type="text" value="PANN">
      <label>Nomor HP</label>
      <input id="danaHp" type="text" value="0812-3456-7890">
      <div class="btn-row">
        <button class="btn btn-p" onclick="danaGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="danaDownload()">📥 Save</button>
      </div>
      <div id="danaResult"></div>
    `,
  },
  {
    id: 'fake-ovo',
    name: 'Fake OVO',
    desc: 'Generator tampilan saldo OVO',
    icon: '💰',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
    render: () => `
      <label>Saldo</label>
      <input id="ovoSaldo" type="text" value="Rp 500.000">
      <label>Nama</label>
      <input id="ovoNama" type="text" value="PANN">
      <div class="btn-row">
        <button class="btn btn-p" onclick="ovoGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="ovoDownload()">📥 Save</button>
      </div>
      <div id="ovoResult"></div>
    `,
  },
  {
    id: 'fake-jago',
    name: 'Fake Bank Jago',
    desc: 'Generator visual saldo Bank Jago',
    icon: '🏦',
    cat: 'maker',
    tag: 'VVIP',
    vip: true,
    render: () => `
      <label>Saldo</label>
      <input id="jgSaldo" type="text" value="Rp 10.000.000">
      <label>Nama</label>
      <input id="jgNama" type="text" value="PANN">
      <div class="btn-row">
        <button class="btn btn-p" onclick="jagoGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="jagoDownload()">📥 Save</button>
      </div>
      <div id="jgResult"></div>
    `,
  },
  {
    id: 'fake-tweet',
    name: 'Fake Tweet',
    desc: 'Generator tampilan tweet palsu',
    icon: '🐦',
    cat: 'maker',
    tag: 'VVIP',
    vip: true,
    render: () => `
      <label>Nama</label>
      <input id="twNama" type="text" value="PANN">
      <label>Username</label>
      <input id="twUser" type="text" value="@pann_tech">
      <label>Tweet</label>
      <textarea id="twText" rows="3">DARK GEN by PANN 🔥</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="tweetGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="tweetDownload()">📥 Save</button>
      </div>
      <div id="twResult"></div>
    `,
  },
  {
    id: 'nokia',
    name: 'Nokia Message',
    desc: 'Buat gambar SMS jadul Nokia',
    icon: '📟',
    cat: 'maker',
    tag: 'RETRO',
    vip: false,
    render: () => `
      <label>Pengirim</label>
      <input id="nkFrom" type="text" value="+62 812-3456-7890">
      <label>Pesan</label>
      <textarea id="nkMsg" rows="3">Halo dari DARK GEN!</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="nokiaGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="nokiaDownload()">📥 Save</button>
      </div>
      <div id="nkResult"></div>
    `,
  },
  {
    id: 'winquote',
    name: 'Windows Quotes',
    desc: 'Quote ala Windows error',
    icon: '🪟',
    cat: 'maker',
    tag: 'STYLE',
    vip: false,
    render: () => `
      <label>Judul</label>
      <input id="wqTitle" type="text" value="System Error">
      <label>Pesan</label>
      <textarea id="wqMsg" rows="3">DARK GEN has stopped working.</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="wqGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="wqDownload()">📥 Save</button>
      </div>
      <div id="wqResult"></div>
    `,
  },
  {
    id: 'quote-gen',
    name: 'Quote Generator',
    desc: 'Buat gambar quote monokrom',
    icon: '💬',
    cat: 'maker',
    tag: 'JPG',
    vip: false,
    render: () => `
      <label>Quote</label>
      <textarea id="qgText" rows="3">Hidup ini singkat, jangan lupa bahagia.</textarea>
      <label>Author</label>
      <input id="qgAuthor" type="text" value="PANN">
      <div class="btn-row">
        <button class="btn btn-p" onclick="qgGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="qgDownload()">📥 Save</button>
      </div>
      <div id="qgResult"></div>
    `,
  },
  {
    id: 'fake-lobby',
    name: 'Fake Lobby',
    desc: 'FF & ML lobby palsu',
    icon: '🎮',
    cat: 'maker',
    tag: 'GAME',
    vip: false,
    render: () => `
      <label>Game</label>
      <select id="flGame"><option value="ff">Free Fire</option><option value="ml">Mobile Legends</option></select>
      <label>Nama Squad</label>
      <input id="flSquad" type="text" value="PANN TECH">
      <label>Rank</label>
      <input id="flRank" type="text" value="Heroic">
      <div class="btn-row">
        <button class="btn btn-p" onclick="lobbyGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="lobbyDownload()">📥 Save</button>
      </div>
      <div id="flResult"></div>
    `,
  },
  {
    id: 'fake-dev',
    name: 'FakeDev',
    desc: 'Buat profil developer dari nama & bio',
    icon: '👨‍💻',
    cat: 'maker',
    tag: 'API',
    vip: false,
    render: () => `
      <label>Nama</label>
      <input id="fdNama" type="text" value="PANN">
      <label>Role</label>
      <input id="fdRole" type="text" value="Fullstack Developer">
      <label>Bio</label>
      <textarea id="fdBio" rows="2">Founder of DARK GEN.</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="fdGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="fdDownload()">📥 Save</button>
      </div>
      <div id="fdResult"></div>
    `,
  },
  {
    id: 'tanya-ustadz',
    name: 'Tanya Ustadz',
    desc: 'Meme generator tanya ustadz',
    icon: '🕌',
    cat: 'maker',
    tag: 'LUCU',
    vip: false,
    render: () => `
      <label>Pertanyaan</label>
      <textarea id="usQ" rows="2">Ustadz, kenapa hidupku begini?</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="ustadzGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="ustadzDownload()">📥 Save</button>
      </div>
      <div id="usResult"></div>
    `,
  },
  {
    id: 'fake-tt-chat',
    name: 'Quote TikTok Nexus',
    desc: 'Buat fake TikTok chat versi DARK GEN',
    icon: '💬',
    cat: 'maker',
    tag: 'NEXUS',
    vip: false,
    render: () => `
      <label>Nama Pengirim</label>
      <input id="ftcNama" type="text" value="PANN">
      <label>Pesan</label>
      <textarea id="ftcMsg" rows="2">Pake DARK GEN aja 🔥</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="ttcGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="ttcDownload()">📥 Save</button>
      </div>
      <div id="ftcResult"></div>
    `,
  },

  // ============================================================
  // ============ TOOLS ============
  // ============================================================
  {
    id: 'qr',
    name: 'QR Generator',
    desc: 'Buat QR langsung di sini',
    icon: '🔲',
    cat: 'tools',
    tag: 'QR',
    vip: false,
    render: () => `
      <label>Teks / URL</label>
      <input id="qrText" type="text" value="https://whatsapp.com/channel/0029VbDuDSa6GcGNOUXRos3R">
      <button class="btn btn-p" onclick="qrGen()">🔲 Generate QR</button>
      <div id="qrResult"></div>
    `,
  },
  {
    id: 'password',
    name: 'Password Gen',
    desc: 'Password aman random',
    icon: '🔐',
    cat: 'tools',
    tag: 'SECURE',
    vip: false,
    render: () => `
      <label>Panjang</label>
      <input id="pwLen" type="number" value="16" min="4" max="128">
      <label><input type="checkbox" id="pwUpper" checked> Huruf besar</label>
      <label><input type="checkbox" id="pwLower" checked> Huruf kecil</label>
      <label><input type="checkbox" id="pwNum" checked> Angka</label>
      <label><input type="checkbox" id="pwSym" checked> Simbol</label>
      <button class="btn btn-p" onclick="pwGen()">🔐 Generate</button>
      <div id="pwResult"></div>
    `,
  },
  {
    id: 'calc',
    name: 'Calculator',
    desc: 'Hitung cepat',
    icon: '🧮',
    cat: 'tools',
    tag: 'MATH',
    vip: false,
    render: () => `
      <label>Ekspresi</label>
      <input id="calcExp" type="text" value="2+2*3">
      <div class="btn-row">
        <button class="btn btn-p" onclick="calcDo()">= Hitung</button>
        <button class="btn btn-b" onclick="document.getElementById('calcExp').value=''">Clear</button>
      </div>
      <div id="calcResult"></div>
    `,
  },
  {
    id: 'morse',
    name: 'Morse Code',
    desc: 'Konversi teks ke morse & sebaliknya',
    icon: '📡',
    cat: 'tools',
    tag: 'AUDIO',
    vip: false,
    render: () => `
      <label>Teks / Morse</label>
      <textarea id="morseInput" rows="3">SOS</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="morseEncode()">→ Morse</button>
        <button class="btn btn-b" onclick="morseDecode()">→ Teks</button>
      </div>
      <div id="morseResult"></div>
    `,
  },
  {
    id: 'base64',
    name: 'Base64',
    desc: 'Encode / decode Base64',
    icon: '🔤',
    cat: 'tools',
    tag: 'TEXT',
    vip: false,
    render: () => `
      <label>Teks</label>
      <textarea id="b64Input" rows="3">PANN</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="b64Encode()">Encode</button>
        <button class="btn btn-b" onclick="b64Decode()">Decode</button>
      </div>
      <div id="b64Result"></div>
    `,
  },
  {
    id: 'screenshot',
    name: 'Ssweb',
    desc: 'Screenshot website dari URL',
    icon: '📸',
    cat: 'tools',
    tag: 'IMG',
    vip: true,
    render: () => `
      <label>URL Website</label>
      <input id="ssUrl" type="text" value="https://github.com">
      <button class="btn btn-p" onclick="ssGen()">📸 Screenshot</button>
      <div id="ssResult"></div>
    `,
  },
  {
    id: 'img-compress',
    name: 'Image Compressor',
    desc: 'Kecilkan & ubah format gambar',
    icon: '🖼️',
    cat: 'tools',
    tag: 'IMG',
    vip: false,
    render: () => `
      <label>Pilih Gambar</label>
      <input id="icFile" type="file" accept="image/*" onchange="icLoad(event)">
      <label>Kualitas (0.1 - 1.0)</label>
      <input id="icQual" type="number" value="0.7" min="0.1" max="1" step="0.1">
      <label>Format</label>
      <select id="icFmt">
        <option value="image/jpeg">JPEG</option>
        <option value="image/png">PNG</option>
        <option value="image/webp">WEBP</option>
      </select>
      <button class="btn btn-p" onclick="icDo()">🖼️ Compress</button>
      <div id="icResult"></div>
    `,
  },

  // ============================================================
  // ============ SECURITY ============
  // ============================================================
  {
    id: 'ip-lookup',
    name: 'IP / Domain Lookup',
    desc: 'Cek informasi IP dan domain',
    icon: '🌍',
    cat: 'security',
    tag: 'LOOKUP',
    vip: false,
    render: () => `
      <label>IP / Domain</label>
      <input id="ipInput" type="text" value="8.8.8.8">
      <button class="btn btn-p" onclick="ipLookup()">🌍 Lookup</button>
      <div id="ipResult"></div>
    `,
  },
  {
    id: 'url-scan',
    name: 'Virus Scan URL',
    desc: 'Scan URL malicious via URLhaus',
    icon: '🛡️',
    cat: 'security',
    tag: 'SECURITY',
    vip: false,
    render: () => `
      <label>URL</label>
      <input id="vsUrl" type="text" value="http://example.com">
      <button class="btn btn-p" onclick="vsScan()">🛡️ Scan</button>
      <div id="vsResult"></div>
    `,
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup',
    desc: 'Cek DNS record domain',
    icon: '📡',
    cat: 'security',
    tag: 'DNS',
    vip: false,
    render: () => `
      <label>Domain</label>
      <input id="dnsInput" type="text" value="github.com">
      <button class="btn btn-p" onclick="dnsLookup()">📡 Lookup DNS</button>
      <div id="dnsResult"></div>
    `,
  },

  // ============================================================
  // ============ VVIP ============
  // ============================================================
  {
    id: 'deploy-web',
    name: 'Deploy & Update Web',
    desc: 'Deploy Vercel atau Netlify + update project',
    icon: '🚀',
    cat: 'vvip',
    tag: 'VVIP',
    vip: true,
    render: () => `
      <div class="result-box info">
        <b>🚀 Deploy Web Guide</b><br>
        Deploy website tuan ke Vercel — gratis selamanya.
      </div>
      <label>Nama Project</label>
      <input id="depName2" type="text" placeholder="my-website" value="my-website">
      <label>Vercel Token</label>
      <input id="depToken2" type="password" placeholder="vercel_xxxx">
      <button class="btn btn-p" onclick="showToast('Fitur deploy ada di DARK GEN PWA','info')">🚀 Deploy</button>
      <div class="result-box info" style="margin-top:12px">
        💡 Buka <a href="https://vercel.com/new" target="_blank" style="color:var(--bl)">vercel.com/new</a> untuk deploy manual
      </div>
    `,
  },
  {
    id: 'web-to-apk',
    name: 'Web/HTML to APK',
    desc: 'Ubah web atau file HTML menjadi APK',
    icon: '📱',
    cat: 'vvip',
    tag: 'VVIP',
    vip: true,
    render: () => `
      <div class="result-box info">
        <b>📱 Convert Web to APK</b><br>
        Cara bikin APK dari website:
      </div>
      <ol style="font-size:12px;line-height:1.8;margin-left:20px;padding:10px 0">
        <li>Buka <a href="https://www.pwabuilder.com" target="_blank" style="color:var(--bl)">pwabuilder.com</a></li>
        <li>Masukkan URL web tuan</li>
        <li>Klik <b>Package for Stores</b></li>
        <li>Pilih Android → download APK</li>
      </ol>
      <button class="btn btn-p" onclick="window.open('https://www.pwabuilder.com','_blank')">🚀 Buka PWA Builder</button>
    `,
  },
  {
    id: 'file-hosting',
    name: 'File Hosting',
    desc: 'Upload file dapat link permanen',
    icon: '📁',
    cat: 'vvip',
    tag: 'VVIP',
    vip: true,
    render: () => `
      <div class="result-box info">
        <b>📁 File Hosting</b><br>
        Upload file ke platform gratis:
      </div>
      <a href="https://catbox.moe" target="_blank" class="btn btn-p" style="text-decoration:none;display:block;text-align:center">🐱 Catbox.moe (Gratis)</a>
      <a href="https://0x0.st" target="_blank" class="btn btn-b" style="text-decoration:none;display:block;text-align:center;margin-top:8px">📤 0x0.st (Gratis)</a>
      <a href="https://file.io" target="_blank" class="btn btn-b" style="text-decoration:none;display:block;text-align:center;margin-top:8px">📁 File.io (Gratis)</a>
    `,
  },
  {
    id: 'media-downloader',
    name: 'Media Downloader',
    desc: 'Download media dari berbagai sumber',
    icon: '📥',
    cat: 'vvip',
    tag: 'VVIP',
    vip: true,
    render: () => `
      <div class="result-box info">💡 Pilih platform di bawah:</div>
      <button class="btn btn-p" onclick="openTool('tiktok');closeTool()">📱 TikTok</button>
      <button class="btn btn-p" onclick="openTool('instagram');closeTool()">📷 Instagram</button>
      <button class="btn btn-p" onclick="openTool('terabox');closeTool()">📦 Terabox</button>
      <button class="btn btn-p" onclick="openTool('spotify');closeTool()">🎵 Spotify</button>
    `,
  },
  {
    id: 'prompt-vault',
    name: 'Prompt Vault',
    desc: '110 prompt jailbreak AI berbagai model',
    icon: '💡',
    cat: 'vvip',
    tag: '110 PROMPT',
    vip: true,
    render: () => `
      <div class="result-box info">
        <b>💡 Prompt Vault</b><br>
        Koleksi prompt AI untuk berbagai keperluan.
      </div>
      <label>Cari Prompt</label>
      <input id="pvSearch" type="text" placeholder="contoh: coding, marketing" oninput="filterPrompts()">
      <div id="pvList" style="max-height:300px;overflow-y:auto;margin-top:10px"></div>
    `,
    init: () => renderPrompts(),
  },
  {
    id: 'auto-react',
    name: 'Auto React',
    desc: 'Auto react saluran WhatsApp',
    icon: '⚡',
    cat: 'vvip',
    tag: 'VIP',
    vip: true,
    render: () => `
      <div class="result-box info">
        <b>⚡ Auto React WhatsApp</b><br>
        Fitur ini butuh bot WhatsApp — kunjungi saluran PANN TECH untuk info lebih lanjut.
      </div>
      <a href="https://whatsapp.com/channel/0029VbDuDSa6GcGNOUXRos3R" target="_blank" class="btn btn-p" style="text-decoration:none;display:block;text-align:center">📢 Buka Saluran PANN TECH</a>
    `,
  },
];

console.log(`⚡ DARK GEN — ${TOOLS.length} tools loaded`);
