/* ============ DARK GEN — DATA TOOLS ============ */
const TOOLS = [
  // ============ DOWNLOADER ============
  {
    id: 'tiktok',
    name: 'TikTok Downloader',
    desc: 'Download video, foto & audio TikTok tanpa watermark',
    icon: '📱',
    cat: 'downloader',
    tag: 'MP4/MP3',
    vip: false,
    render: () => `
      <label>Link TikTok</label>
      <input id="ttUrl" type="text" placeholder="https://vt.tiktok.com/... atau https://www.tiktok.com/@user/video/...">
      <button class="btn btn-p" id="ttBtn" onclick="ttDownload()">📥 Download</button>
      <div id="ttResult"></div>
    `,
  },
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
      <button class="btn btn-p" id="tbBtn" onclick="tbDownload()">📥 Ambil File</button>
      <div id="tbResult"></div>
    `,
  },
  {
    id: 'spotify',
    name: 'Spotify Downloader',
    desc: 'Cari lagu, preview audio dan unduh Spotify ke MP3',
    icon: '🎵',
    cat: 'downloader',
    tag: 'MP3',
    vip: false,
    render: () => `
      <div class="result-box info">⚠️ Fitur ini unofficial — kadang work, kadang nggak. Coba aja dulu.</div>
      <label>Link Spotify</label>
      <input id="spUrl" type="text" placeholder="https://open.spotify.com/track/...">
      <button class="btn btn-p" id="spBtn" onclick="spDownload()">📥 Coba Download</button>
      <div id="spResult"></div>
    `,
  },

  // ============ MAKER ============
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
      <textarea id="bratText" placeholder="Tulis teks..." rows="3">dark gen</textarea>
      <label>Style</label>
      <select id="bratStyle">
        <option value="white">White (default)</option>
        <option value="black">Black</option>
        <option value="green">Green</option>
      </select>
      <div class="btn-row">
        <button class="btn btn-p" onclick="bratGen()">🎨 Generate</button>
        <button class="btn btn-b" onclick="bratDownload()">📥 Save PNG</button>
      </div>
      <div id="bratResult"></div>
    `,
  },
  {
    id: 'fake-dana',
    name: 'Fake Dana',
    desc: 'Generate tampilan saldo Dana palsu',
    icon: '💳',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
    render: () => `
      <label>Saldo</label>
      <input id="danaSaldo" type="text" placeholder="Rp 1.000.000" value="Rp 1.000.000">
      <label>Nama Pemilik</label>
      <input id="danaNama" type="text" placeholder="Nama..." value="PANN">
      <label>Nomor HP</label>
      <input id="danaHp" type="text" placeholder="08xxx" value="0812-3456-7890">
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
    id: 'ektp',
    name: 'E-KTP Generator',
    desc: 'Buat tampilan E-KTP demo',
    icon: '🆔',
    cat: 'maker',
    tag: 'DEMO',
    vip: false,
    render: () => `
      <div class="result-box info">⚠️ Hanya demo visual. Gak buat data asli.</div>
      <label>NIK</label>
      <input id="ktpNik" type="text" value="3201234567890001" maxlength="16">
      <label>Nama</label>
      <input id="ktpNama" type="text" value="PANN">
      <label>Tempat/Tgl Lahir</label>
      <input id="ktpTtl" type="text" value="Jakarta, 01-01-2000">
      <label>Jenis Kelamin</label>
      <select id="ktpJk"><option>LAKI-LAKI</option><option>PEREMPUAN</option></select>
      <label>Alamat</label>
      <input id="ktpAlamat" type="text" value="Jl. Contoh No. 1, RT 001 RW 002">
      <button class="btn btn-p" onclick="ktpGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="ktpDownload()">📥 Save PNG</button>
      <div id="ktpResult"></div>
    `,
  },
  {
    id: 'fake-tweet',
    name: 'Fake Tweet',
    desc: 'Generator tampilan tweet palsu',
    icon: '🐦',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
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
      <button class="btn btn-p" onclick="nokiaGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="nokiaDownload()">📥 Save</button>
      <div id="nkResult"></div>
    `,
  },
  {
    id: 'winquote',
    name: 'Windows Quotes',
    desc: 'Quote ala Windows error',
    icon: '🪟',
    cat: 'maker',
    tag: 'RETRO',
    vip: false,
    render: () => `
      <label>Judul</label>
      <input id="wqTitle" type="text" value="System Error">
      <label>Pesan</label>
      <textarea id="wqMsg" rows="3">DARK GEN has stopped working. Contact PANN for support.</textarea>
      <button class="btn btn-p" onclick="wqGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="wqDownload()">📥 Save</button>
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
      <button class="btn btn-p" onclick="qgGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="qgDownload()">📥 Save</button>
      <div id="qgResult"></div>
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
      <button class="btn btn-p" onclick="stGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="stDownload()">📥 Save</button>
      <div id="stResult"></div>
    `,
  },
  {
    id: 'ustadz',
    name: 'Tanya Ustadz',
    desc: 'Meme generator tanya ustadz',
    icon: '🕌',
    cat: 'maker',
    tag: 'MEME',
    vip: false,
    render: () => `
      <label>Pertanyaan</label>
      <textarea id="usQ" rows="2">Ustadz, kenapa hidupku begini?</textarea>
      <button class="btn btn-p" onclick="ustadzGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="ustadzDownload()">📥 Save</button>
      <div id="usResult"></div>
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
      <button class="btn btn-p" onclick="lobbyGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="lobbyDownload()">📥 Save</button>
      <div id="flResult"></div>
    `,
  },
  {
    id: 'fake-dev',
    name: 'FakeDev',
    desc: 'Buat profil developer dari nama & bio',
    icon: '👨‍💻',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
    render: () => `
      <label>Nama</label>
      <input id="fdNama" type="text" value="PANN">
      <label>Role</label>
      <input id="fdRole" type="text" value="Fullstack Developer & Security Researcher">
      <label>Bio</label>
      <textarea id="fdBio" rows="2">Founder of DARK GEN. Building tools for everyone.</textarea>
      <button class="btn btn-p" onclick="fdGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="fdDownload()">📥 Save</button>
      <div id="fdResult"></div>
    `,
  },
  {
    id: 'fake-tt-chat',
    name: 'Fake TikTok Chat',
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
      <button class="btn btn-p" onclick="ttcGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="ttcDownload()">📥 Save</button>
      <div id="ftcResult"></div>
    `,
  },
  {
    id: 'fake-jago',
    name: 'Fake Bank Jago',
    desc: 'Generator visual saldo Bank Jago',
    icon: '🏦',
    cat: 'maker',
    tag: 'CANVAS',
    vip: false,
    render: () => `
      <label>Saldo</label>
      <input id="jgSaldo" type="text" value="Rp 10.000.000">
      <label>Nama</label>
      <input id="jgNama" type="text" value="PANN">
      <button class="btn btn-p" onclick="jagoGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="jagoDownload()">📥 Save</button>
      <div id="jgResult"></div>
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
      <button class="btn btn-p" onclick="iqcGen()">🎨 Generate</button>
      <button class="btn btn-b" onclick="iqcDownload()">📥 Save</button>
      <div id="iqcResult"></div>
    `,
  },

  // ============ TOOLS ============
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
      <input id="qrText" type="text" placeholder="https://..." value="https://whatsapp.com/channel/PANN_TECH">
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
      <input id="calcExp" type="text" placeholder="2+2*3" value="2+2*3">
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
      <textarea id="morseInput" rows="3" placeholder="Halo / .... .- .-.. ---">SOS</textarea>
      <div class="btn-row">
        <button class="btn btn-p" onclick="morseEncode()">→ Morse</button>
        <button class="btn btn-b" onclick="morseDecode()">→ Teks</button>
      </div>
      <div id="morseResult"></div>
    `,
  },
  {
    id: 'base64',
    name: 'Base64 Encoder',
    desc: 'Encode/decode Base64',
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
    vip: false,
    render: () => `
      <label>URL Website</label>
      <input id="ssUrl" type="text" placeholder="https://..." value="https://github.com">
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
      <select id="icFmt"><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option><option value="image/webp">WEBP</option></select>
      <button class="btn btn-p" onclick="icDo()">🖼️ Compress</button>
      <div id="icResult"></div>
    `,
  },

  // ============ SECURITY ============
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
      <input id="ipInput" type="text" placeholder="8.8.8.8 atau github.com" value="8.8.8.8">
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
      <input id="vsUrl" type="text" placeholder="https://..." value="http://example.com">
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
];

console.log(`⚡ DARK GEN — ${TOOLS.length} tools loaded`);