import React, { useEffect } from 'react';
import { Sparkles, Shield, Zap, Check } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export const AntigravityModal = ({ zoneInfo, playerName, isBot, onClose }) => {
  useEffect(() => {
    soundFx.playAntigravity();

    if (isBot) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isBot, onClose]);

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ borderColor: 'var(--antigravity)', boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}>
        <div className="modal-body antigravity-burst-card">
          <div className="antigravity-icon-glow">
            <Sparkles size={40} color="#fff" />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(168, 85, 247, 0.25)', color: '#d8b4fe', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 12 }}>
            <Zap size={14} /> ANTIGRAVITY ACTIVATED
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', background: 'linear-gradient(90deg, #c084fc, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
            Loncatan Pengetahuan Diperoleh!
          </h3>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: 16 }}>
            Selamat, <strong>{playerName}</strong>! Anda memasuki <em>{zoneInfo?.name || 'Zona Gravitasi Nol'}</em>.
          </p>

          <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: 12, padding: 16, textAlign: 'left', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c084fc', fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
              <Shield size={18} /> Perisai Anti-Ular (Snake Immunity) Aktif!
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Daya kritis Anda mematahkan tarikan gravitasi dogma sosial! Jika Anda mendarat di kepala ular berikutnya, perisai ini akan <strong>melindungi Anda dari perosotan</strong> secara otomatis.
            </p>
          </div>

          <button className="btn-antigravity" onClick={onClose} style={{ width: '100%' }}>
            <Check size={18} style={{ display: 'inline', marginRight: 6 }} /> Terima Kekuatan & Lanjut Main
          </button>
        </div>
      </div>
    </div>
  );
};
