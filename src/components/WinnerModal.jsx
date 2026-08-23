import React, { useEffect } from 'react';
import { Trophy, Award, RotateCcw, Home, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioEffects';

export const WinnerModal = ({ winner, stats, onPlayAgain, onBackToLobby }) => {
  useEffect(() => {
    soundFx.playVictory();

    // Trigger celebration confetti blast
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ borderColor: '#f59e0b', boxShadow: '0 0 50px rgba(245, 158, 11, 0.4)' }}>
        <div className="modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
          
          <div style={{ width: 80, height: 80, margin: '0 auto 16px', background: 'linear-gradient(135deg, #f59e0b, #eab308)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)' }}>
            <Trophy size={44} color="#fff" />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '4px 14px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
            <Sparkles size={14} /> Pemenang Ular Tangga PIS
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: 4 }}>
            {winner.name} Mencapai Kotak 100!
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>
            Selamat! Anda telah menguasai konsep 11 Bab Pengantar Ilmu Sosial dan berhasil menavigasi realitas sosial dengan kritis!
          </p>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, background: 'rgba(30, 41, 59, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16, marginBottom: 24, textAlign: 'left' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Skor Total</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{winner.score || 0} pts</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kuis Berhasil Dijawab</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{stats.correctQuizzes || 0}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tangga Dinaiki</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>{stats.laddersClimbed || 0}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Loncatan Antigravity</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#c084fc' }}>{stats.antigravityTriggered || 0}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-glass" onClick={onBackToLobby} style={{ flex: 1, justifyContent: 'center' }}>
              <Home size={18} /> Menu Utama
            </button>
            <button className="btn-primary" onClick={onPlayAgain} style={{ flex: 1, justifyContent: 'center' }}>
              <RotateCcw size={18} /> Main Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
