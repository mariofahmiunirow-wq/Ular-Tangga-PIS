// Helper fungsi untuk kalkulasi posisi grid zig-zag dan koordinat SVG

/**
 * Mendapatkan posisi (row, col) dari nomor kotak 1 - 100
 * row: 0 (paling atas) - 9 (paling bawah)
 * col: 0 (paling kiri) - 9 (paling kanan)
 */
export function getTileCoordinates(tileNumber) {
  if (tileNumber < 1) tileNumber = 1;
  if (tileNumber > 100) tileNumber = 100;

  const zeroIndexed = tileNumber - 1;
  const rowFromBottom = Math.floor(zeroIndexed / 10);
  const row = 9 - rowFromBottom; // 0 di atas, 9 di bawah

  let col;
  if (rowFromBottom % 2 === 0) {
    // Genap dari bawah (Row 0, 2, 4, 6, 8): Kiri ke Kanan
    col = zeroIndexed % 10;
  } else {
    // Ganjil dari bawah (Row 1, 3, 5, 7, 9): Kanan ke Kiri
    col = 9 - (zeroIndexed % 10);
  }

  return { row, col };
}

/**
 * Mendapatkan persentase X, Y pusat kotak (0% - 100%) untuk penempatan pion atau garis SVG
 */
export function getTileCenterPercent(tileNumber) {
  const { row, col } = getTileCoordinates(tileNumber);
  const x = col * 10 + 5; // 5%, 15%, ..., 95%
  const y = row * 10 + 5; // 5%, 15%, ..., 95%
  return { x, y };
}

/**
 * Membuat kurva lengkung bezier untuk Ular dan Tangga pada SVG overlay
 */
export function generateCurvedPath(startTile, endTile, isSnake = false) {
  const start = getTileCenterPercent(startTile);
  const end = getTileCenterPercent(endTile);

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (!isSnake) {
    // Tangga: Garis rel lurus atau lengkung halus
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  } else {
    // Ular: Kurva S-wave organik
    const normalX = -dy / (dist || 1);
    const normalY = dx / (dist || 1);
    const waveAmp = Math.min(6, dist * 0.15);

    const cp1x = start.x + dx * 0.33 + normalX * waveAmp;
    const cp1y = start.y + dy * 0.33 + normalY * waveAmp;
    const cp2x = start.x + dx * 0.66 - normalX * waveAmp;
    const cp2y = start.y + dy * 0.66 - normalY * waveAmp;

    return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
  }
}
