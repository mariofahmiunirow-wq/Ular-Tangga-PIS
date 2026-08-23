import React, { useState } from 'react';
import { BookOpen, Search, X, BookMarked, Layers, Award } from 'lucide-react';
import { CHAPTERS_DATA, GLOSSARY_TERMS } from '../data/glossaryData';

export const EncyclopediaModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('chapters'); // 'chapters' | 'glossary'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGlossary = GLOSSARY_TERMS.filter(item =>
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: 720, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--primary)', padding: 8, borderRadius: 10 }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                Buku Saku Pengantar Ilmu Sosial
              </h3>
            </div>
          </div>
          <button className="btn-glass" onClick={onClose} style={{ padding: 6, borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(30, 41, 59, 0.3)' }}>
          <button
            onClick={() => setActiveTab('chapters')}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: activeTab === 'chapters' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'chapters' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Layers size={14} /> 11 Bab Buku Ajar
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: activeTab === 'glossary' ? 'var(--antigravity)' : 'transparent',
              color: activeTab === 'glossary' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <BookMarked size={14} /> Glosarium Istilah (A-Z)
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body" style={{ overflowY: 'auto', flex: 1, padding: 20 }}>
          
          {activeTab === 'chapters' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CHAPTERS_DATA.map(ch => (
                <div key={ch.chapter} style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                      Bab {ch.chapter}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                    {ch.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
                    {ch.summary}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {ch.keyConcepts.map((k, i) => (
                      <span key={i} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600 }}>
                        #{k}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'glossary' && (
            <div>
              {/* Search Bar */}
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Cari konsep (misal: 'Imajinasi Sosiologis', 'Fakta Sosial', 'Subak')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '10px 14px 10px 38px', color: '#fff', fontSize: '0.875rem' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredGlossary.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 30 }}>
                    Tidak ditemukan istilah yang sesuai.
                  </div>
                ) : (
                  filteredGlossary.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '12px 16px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--antigravity-light)', fontSize: '0.9rem', marginBottom: 4 }}>
                        {item.term}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-glass" onClick={onClose}>
            Tutup Buku Saku
          </button>
        </div>
      </div>
    </div>
  );
};
