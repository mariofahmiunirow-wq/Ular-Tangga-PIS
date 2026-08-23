import React from 'react';
import { Compass, Sparkles, ArrowUpRight, ArrowDownRight, Dices, X } from 'lucide-react';

export const RuleGuideModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: 640 }}>
        
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: 8, borderRadius: 10 }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                Panduan Aturan Permainan
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Ular Tangga Pengantar Ilmu Sosial
              </p>
            </div>
          </div>
          <button className="btn-glass" onClick={onClose} style={{ padding: 6, borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          {/* Rule Item 1 */}
          <div style={{ display: 'flex', gap: 12, background: 'rgba(30, 41, 59, 0.4)', padding: 12, borderRadius: 10 }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: 'rgba(6, 182, 212, 0.2)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              1
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginBottom: 2 }}>Alur Papan 10x10 (Kotak 1-100)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Pemain melempar dadu 1-6 secara bergantian. Pemenang adalah yang pertama kali mendarat atau mencapai <strong>Kotak 100</strong> (Puncak Agen Perubahan).
              </p>
            </div>
          </div>

          {/* Rule Item - Bonus Roll on 6 */}
          <div style={{ display: 'flex', gap: 12, background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: 12, borderRadius: 10 }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              <Dices size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', marginBottom: 2 }}>Bonus Lempar Lagi (Dadu Angka 6)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Jika dadu menunjukkan angka <strong>6</strong>, setelah menyelesaikan giliran langkah (dan kuis/fitur kotak), pemain tersebut <strong>mendapatkan bonus 1 kali giliran lempar dadu lagi</strong>!
              </p>
            </div>
          </div>

          {/* Rule Item 2 - Ladder Quiz */}
          <div style={{ display: 'flex', gap: 12, background: 'rgba(30, 41, 59, 0.4)', padding: 12, borderRadius: 10 }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              <ArrowUpRight size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24', marginBottom: 2 }}>Kuis Tangga Pembelajaran (Opsi Diacak)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Jika mendarat di pangkal tangga, Anda akan ditantang kuis 11 Bab PIS. 
                <br />• <strong>Jawaban Benar:</strong> Memanjat tangga ke puncak + bonus skor wawasan.
                <br />• <strong>Jawaban Salah:</strong> Tetap di tempat dan mempelajari materi pembahasan.
              </p>
            </div>
          </div>

          {/* Rule Item 3 - Antigravity */}
          <div style={{ display: 'flex', gap: 12, background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: 12, borderRadius: 10 }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #9333ea, #c084fc)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc', marginBottom: 2 }}>Zona Antigravity ("Loncatan Pengetahuan")</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Mendarat di Kotak <strong>#14, #38, #64, atau #86</strong> memberikan <strong>Perisai Kebal Ular (Snake Immunity)</strong>. Jika mendarat di jebakan ular, perisai ini otomatis mem-bypass perosotan!
              </p>
            </div>
          </div>

          {/* Rule Item 4 - Snake Pitfalls */}
          <div style={{ display: 'flex', gap: 12, background: 'rgba(30, 41, 59, 0.4)', padding: 12, borderRadius: 10 }}>
            <div style={{ minWidth: 32, height: 32, borderRadius: 8, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
              <ArrowDownRight size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f87171', marginBottom: 2 }}>Jebakan Isu Sosial (Ular)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Mendarat di kepala ular tanpa perisai Antigravity akan membuat pion meluncur turun ke ekor ular.
              </p>
            </div>
          </div>

        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Mengerti & Lanjut Main
          </button>
        </div>
      </div>
    </div>
  );
};
