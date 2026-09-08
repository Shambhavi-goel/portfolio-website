const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(width, height, colorFn) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8 bit depth
  ihdr.writeUInt8(2, 9); // RGB (3 bytes per pixel)
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw scanlines: width * 3 + 1 per row (filter byte 0)
  const raw = Buffer.alloc(height * (width * 3 + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter byte
    for (let x = 0; x < width; x++) {
      const [r, g, b] = colorFn(x, y, width, height);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
    }
  }

  const compressed = zlib.deflateSync(raw);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

// Target directories
const certDir = path.join(__dirname, '../public/certificates');
const galleryDir = path.join(__dirname, '../public/gallery');

if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

// Certificates: 800x600 elegant credentials with subtle borders & hues
const certThemes = [
  { name: 'cert-1.png', primary: [24, 24, 27], accent: [212, 175, 55] },  // NITORI Scholar (Gold/Dark)
  { name: 'cert-2.png', primary: [15, 23, 42], accent: [56, 189, 248] },  // Ericsson (Slate/Cyan)
  { name: 'cert-3.png', primary: [20, 83, 45], accent: [74, 222, 128] },  // GFG Bharat (Emerald)
  { name: 'cert-4.png', primary: [67, 24, 255], accent: [147, 51, 234] }, // India Innovates (Indigo/Purple)
  { name: 'cert-5.png', primary: [234, 88, 12], accent: [251, 146, 60] }, // AI for Bharat (Orange/AWS)
  { name: 'cert-6.png', primary: [30, 41, 59], accent: [245, 158, 11] },  // AWS ML (Amber)
  { name: 'cert-7.png', primary: [79, 70, 229], accent: [168, 85, 247] }, // AWS GenAI (Violet)
  { name: 'cert-8.png', primary: [14, 116, 144], accent: [56, 189, 248] } // AWS Cloud 101 (Sky)
];

certThemes.forEach(({ name, primary, accent }, idx) => {
  const png = createPng(800, 560, (x, y, w, h) => {
    // Border
    const borderSize = 24;
    const isBorder = (x < borderSize || x > w - borderSize || y < borderSize || y > h - borderSize);
    const isInnerBorder = (x > borderSize + 8 && x < borderSize + 12) || (x < w - borderSize - 8 && x > w - borderSize - 12) ||
                          (y > borderSize + 8 && y < borderSize + 12) || (y < h - borderSize - 8 && y > h - borderSize - 12);
    
    if (isBorder) return primary;
    if (isInnerBorder) return accent;
    
    // Diagonal subtle background pattern
    const grad = Math.sin((x / w) * Math.PI) * 0.15;
    const baseLight = 248 + Math.floor(grad * 7);
    
    // Decorative ribbon/badge circle in center-top
    const cx = w / 2;
    const cy = 180;
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (dist < 46) return accent;
    if (dist < 50) return primary;
    
    // Bottom seal line
    if (y > 440 && y < 443 && x > 200 && x < 600) return accent;

    return [baseLight, baseLight, baseLight + 2];
  });
  
  fs.writeFileSync(path.join(certDir, name), png);
  console.log(`Generated ${name}`);
});

// Gallery: 800x600 photographs with aesthetic atmospheric gradients
const galleryThemes = [
  { name: 'photo-1.jpg', c1: [30, 27, 75], c2: [76, 29, 149] },   // Presentation stage
  { name: 'photo-2.jpg', c1: [15, 23, 42], c2: [30, 58, 138] },   // Night build session
  { name: 'photo-3.jpg', c1: [67, 20, 7], c2: [180, 83, 9] },     // Award auditorium
  { name: 'photo-4.jpg', c1: [6, 78, 59], c2: [13, 148, 136] },   // Tech meetup
  { name: 'photo-5.jpg', c1: [24, 24, 27], c2: [82, 82, 91] },    // SRM Lab research
  { name: 'photo-6.jpg', c1: [136, 19, 55], c2: [225, 29, 72] }   // Women in tech community
];

galleryThemes.forEach(({ name, c1, c2 }) => {
  // We save as PNG format despite .jpg extension so Next.js Image decoder handles it seamlessly
  const png = createPng(800, 600, (x, y, w, h) => {
    const t = (x / w) * 0.6 + (y / h) * 0.4;
    const r = Math.round(c1[0] * (1 - t) + c2[0] * t);
    const g = Math.round(c1[1] * (1 - t) + c2[1] * t);
    const b = Math.round(c1[2] * (1 - t) + c2[2] * t);
    
    // Vignette
    const dx = (x - w/2) / (w/2);
    const dy = (y - h/2) / (h/2);
    const v = Math.max(0, 1 - (dx*dx + dy*dy) * 0.35);
    
    return [Math.round(r * v), Math.round(g * v), Math.round(b * v)];
  });
  
  fs.writeFileSync(path.join(galleryDir, name), png);
  console.log(`Generated ${name}`);
});

console.log('All placeholders successfully created!');
