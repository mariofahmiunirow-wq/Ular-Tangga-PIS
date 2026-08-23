import React from 'react';
import { Shield, Sparkles, User, Bot, History } from 'lucide-react';

export const PlayerHUD = ({ players, currentPlayerIndex, logs }) => {
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="side-panel">
      {/* Current Turn Status */}
      <div className="glass-card turn-card">
        <div className="turn-header">
          <span className="turn-title">Giliran Bermain</span>
          <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.2)', color: 'var(--primary)', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
            {currentPlayer?.isBot ? 'Bot AI' : 'Pemain'}
          </span>
        </div>

        <div className="active-player-info">
          <div className="player-avatar-badge" style={{ backgroundColor: currentPlayer?.color }}>
            {currentPlayer?.avatar || currentPlayer?.name.charAt(0)}
          </div>
          <div>
            <div className="active-player-name">{currentPlayer?.name}</div>
            <div className="active-player-status">
              <span>Kotak <strong>#{currentPlayer?.position}</strong></span>
              <span>•</span>
              <span>Skor: <strong>{currentPlayer?.score || 0}</strong></span>
            </div>
            {currentPlayer?.hasShield && (
              <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700 }}>
                <Shield size={12} /> Perisai Anti-Ular Aktif
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Players List Table */}
      <div className="glass-card">
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.05em' }}>
          Daftar Pemain & Peringkat
        </div>

        <div className="players-hud-list">
          {players.map((p, idx) => {
            const isCurrent = idx === currentPlayerIndex;
            return (
              <div key={p.id} className={`player-hud-item ${isCurrent ? 'is-current' : ''}`}>
                <div className="hud-item-left">
                  <div className="hud-avatar" style={{ backgroundColor: p.color }}>
                    {p.avatar || p.name.charAt(0)}
                  </div>
                  <div>
                    <div className="hud-name" style={{ color: isCurrent ? 'var(--primary)' : 'var(--text-main)' }}>
                      {p.name} {p.isBot && <Bot size={12} style={{ display: 'inline', marginLeft: 4, color: 'var(--text-muted)' }} />}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Skor: {p.score || 0} pts
                    </div>
                  </div>
                </div>

                <div className="hud-item-right">
                  {p.hasShield && (
                    <span title="Perisai Antigravity Aktif" style={{ color: 'var(--antigravity-light)' }}>
                      <Shield size={16} />
                    </span>
                  )}
                  <div className="hud-tile-badge">
                    #{p.position}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Log */}
      <div className="glass-card" style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.05em' }}>
          <History size={14} /> Log Aktivitas
        </div>

        <div className="game-log-box">
          {logs.length === 0 ? (
            <div style={{ color: 'var(--text-subtle)', fontStyle: 'italic', fontSize: '0.75rem' }}>
              Permainan baru dimulai. Lempar dadu untuk melangkah!
            </div>
          ) : (
            logs.map((log, index) => {
              let logTypeClass = '';
              if (log.type === 'ladder') logTypeClass = 'log-ladder';
              else if (log.type === 'snake') logTypeClass = 'log-snake';
              else if (log.type === 'antigravity') logTypeClass = 'log-antigravity';

              return (
                <div key={index} className={`log-entry ${logTypeClass}`}>
                  {log.message}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
