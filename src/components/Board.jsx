import React from 'react';
import { Tile } from './Tile';
import { LADDERS, SNAKES, ANTIGRAVITY_ZONES, TOTAL_TILES } from '../data/boardConfig';
import { getTileCoordinates, getTileCenterPercent, generateCurvedPath } from '../utils/boardHelpers';
import { Shield } from 'lucide-react';

export const Board = ({ players, currentPlayerIndex, movingPlayerId }) => {
  // Generate grid tiles from top-left (Row 0, Col 0 which is 100) to bottom-right (10)
  // Grid rendered from row 0 to 9, col 0 to 9
  const gridTiles = [];
  for (let r = 0; r < 10; r++) {
    const rowFromBottom = 9 - r;
    for (let c = 0; c < 10; c++) {
      let tileNum;
      if (rowFromBottom % 2 === 0) {
        // Genap dari bawah (Row 0, 2, 4, 6, 8): Kiri ke Kanan
        tileNum = rowFromBottom * 10 + (c + 1);
      } else {
        // Ganjil dari bawah (Row 1, 3, 5, 7, 9): Kanan ke Kiri
        tileNum = rowFromBottom * 10 + (10 - c);
      }
      gridTiles.push(tileNum);
    }
  }

  // Calculate player positions with slight offset if multiple players on the same tile
  const getPlayerPositionStyle = (player, index) => {
    const { x, y } = getTileCenterPercent(player.position);
    
    // Check if other players share this tile
    const playersOnSameTile = players.filter(p => p.position === player.position);
    let offsetX = 0;
    let offsetY = 0;
    
    if (playersOnSameTile.length > 1) {
      const pIdx = playersOnSameTile.findIndex(p => p.id === player.id);
      const angle = (pIdx / playersOnSameTile.length) * 2 * Math.PI;
      offsetX = Math.cos(angle) * 1.5; // percent offset
      offsetY = Math.sin(angle) * 1.5;
    }

    return {
      left: `${x + offsetX}%`,
      top: `${y + offsetY}%`,
      backgroundColor: player.color,
      zIndex: player.id === players[currentPlayerIndex]?.id ? 25 : 20
    };
  };

  return (
    <div className="board-wrapper">
      <div className="board-container">
        {/* SVG Path Layer for Ladders, Snakes, and Antigravity Portals */}
        <svg className="board-svg-overlay" viewBox="0 0 100 100">
          <defs>
            {/* Ladder Gradient */}
            <linearGradient id="ladderGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
            </linearGradient>

            {/* Snake Gradient */}
            <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0.6" />
            </linearGradient>

            {/* Antigravity Portal Glow */}
            <radialGradient id="antiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6b21a8" stopOpacity="0" />
            </radialGradient>

            {/* Filter Glow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Antigravity Rings */}
          {ANTIGRAVITY_ZONES.map(ag => {
            const center = getTileCenterPercent(ag.tile);
            return (
              <g key={`ag-${ag.tile}`}>
                <circle
                  cx={center.x}
                  cy={center.y}
                  r="4.2"
                  fill="url(#antiGlow)"
                  className="animate-pulse"
                />
                <circle
                  cx={center.x}
                  cy={center.y}
                  r="3.8"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="0.4"
                  strokeDasharray="1.2 0.8"
                />
              </g>
            );
          })}

          {/* Render Ladders */}
          {LADDERS.map(ladder => {
            const start = getTileCenterPercent(ladder.start);
            const end = getTileCenterPercent(ladder.end);
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const rungs = Math.max(3, Math.floor(dist / 4.5));

            // Offset rails for realistic 2-rail ladder
            const normalX = (-dy / dist) * 1.0;
            const normalY = (dx / dist) * 1.0;

            return (
              <g key={`ladder-${ladder.start}`} filter="url(#glow)">
                {/* Left Rail */}
                <line
                  x1={start.x - normalX}
                  y1={start.y - normalY}
                  x2={end.x - normalX}
                  y2={end.y - normalY}
                  stroke="url(#ladderGrad)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {/* Right Rail */}
                <line
                  x1={start.x + normalX}
                  y1={start.y + normalY}
                  x2={end.x + normalX}
                  y2={end.y + normalY}
                  stroke="url(#ladderGrad)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {/* Rungs */}
                {Array.from({ length: rungs }).map((_, i) => {
                  const t = (i + 1) / (rungs + 1);
                  const rx = start.x + dx * t;
                  const ry = start.y + dy * t;
                  return (
                    <line
                      key={`rung-${i}`}
                      x1={rx - normalX}
                      y1={ry - normalY}
                      x2={rx + normalX}
                      y2={ry + normalY}
                      stroke="#fef3c7"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Render Snakes */}
          {SNAKES.map(snake => {
            const pathData = generateCurvedPath(snake.head, snake.tail, true);
            const headPos = getTileCenterPercent(snake.head);
            const tailPos = getTileCenterPercent(snake.tail);

            return (
              <g key={`snake-${snake.head}`} filter="url(#glow)">
                {/* Snake Body Outer Glow */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                {/* Snake Body Pattern */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#fecaca"
                  strokeWidth="0.6"
                  strokeDasharray="0.8 1.2"
                  strokeLinecap="round"
                />
                {/* Snake Head Dot */}
                <circle
                  cx={headPos.x}
                  cy={headPos.y}
                  r="1.6"
                  fill="#b91c1c"
                  stroke="#fca5a5"
                  strokeWidth="0.4"
                />
                {/* Snake Tail Dot */}
                <circle
                  cx={tailPos.x}
                  cy={tailPos.y}
                  r="0.8"
                  fill="#ef4444"
                />
              </g>
            );
          })}
        </svg>

        {/* Board 10x10 Grid */}
        <div className="board-grid">
          {gridTiles.map(tileNumber => (
            <Tile
              key={`tile-${tileNumber}`}
              tileNumber={tileNumber}
              playersOnTile={players.filter(p => p.position === tileNumber)}
            />
          ))}
        </div>

        {/* Player Tokens Layer */}
        {players.map((player, idx) => (
          <div
            key={player.id}
            className={`player-token ${player.hasShield ? 'token-shield-active' : ''}`}
            style={getPlayerPositionStyle(player, idx)}
            title={`${player.name} (Kotak ${player.position}) ${player.hasShield ? '- Perisai Antigravity Aktif!' : ''}`}
          >
            {player.avatar || player.name.charAt(0)}
            {player.hasShield && (
              <div style={{ position: 'absolute', top: -6, right: -6, color: '#c084fc', background: '#581c87', borderRadius: '50%', padding: 2 }}>
                <Shield size={10} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
