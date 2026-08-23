import React, { useState } from 'react';
import { Users, Bot, Play, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';

const AVATAR_OPTIONS = ['🎓', '🔍', '⚖️', '🌐', '📚', '🏛️', '💡', '🚀'];
const COLOR_PRESETS = ['#06b6d4', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#3b82f6'];

export const GameLobby = ({ onStartGame, onOpenEncyclopedia, onOpenRules }) => {
  const [gameMode, setGameMode] = useState('single'); // 'single' | 'multi'
  const [numBots, setNumBots] = useState(2);
  const [numPlayers, setNumPlayers] = useState(2);

  const [playersConfig, setPlayersConfig] = useState([
    { name: 'Pemain 1', avatar: '🎓', color: '#06b6d4', isBot: false },
    { name: 'Pemain 2', avatar: '🔍', color: '#f59e0b', isBot: false },
    { name: 'Pemain 3', avatar: '⚖️', color: '#ec4899', isBot: false },
    { name: 'Pemain 4', avatar: '🌐', color: '#10b981', isBot: false }
  ]);

  const BOT_PRESETS = [
    { name: 'Dr. Sosiolog AI', avatar: '🏛️', color: '#8b5cf6', isBot: true },
    { name: 'Prof. Ekonom AI', avatar: '💡', color: '#f59e0b', isBot: true },
    { name: 'Antropolog Bot', avatar: '📚', color: '#10b981', isBot: true }
  ];

  const handlePlayerNameChange = (idx, newName) => {
    setPlayersConfig(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], name: newName };
      return copy;
    });
  };

  const handleAvatarChange = (idx, avatar) => {
    setPlayersConfig(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], avatar };
      return copy;
    });
  };

  const handleColorChange = (idx, color) => {
    setPlayersConfig(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], color };
      return copy;
    });
  };

  const handleLaunch = () => {
    let finalPlayers = [];
    if (gameMode === 'single') {
      const human = { ...playersConfig[0], id: 1, position: 1, score: 0, hasShield: false };
      const bots = BOT_PRESETS.slice(0, numBots).map((b, i) => ({
        ...b,
        id: i + 2,
        position: 1,
        score: 0,
        hasShield: false
      }));
      finalPlayers = [human, ...bots];
    } else {
      finalPlayers = playersConfig.slice(0, numPlayers).map((p, i) => ({
        ...p,
        id: i + 1,
        position: 1,
        score: 0,
        hasShield: false,
        isBot: false
      }));
    }
    onStartGame(finalPlayers);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 800, width: '100%', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(6,182,212,0.2)' }}>
        
        {/* Banner Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', background: 'linear-gradient(90deg, #38bdf8, #c084fc, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>
            ULAR TANGGA ILMU SOSIAL
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 auto' }}>
            Jelajahi 100 kotak bertema Pengantar Ilmu Sosial karya Mario Fahmi Syahrial, M.Pd. Taklukkan kuis tangga untuk melesat ke puncak!
          </p>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div
            onClick={() => setGameMode('single')}
            style={{
              background: gameMode === 'single' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(30, 41, 59, 0.5)',
              border: `2px solid ${gameMode === 'single' ? 'var(--primary)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              padding: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={24} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Single Player vs AI</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bertanding melawan Bot Cerdas akademisi</div>
            </div>
          </div>

          <div
            onClick={() => setGameMode('multi')}
            style={{
              background: gameMode === 'multi' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(30, 41, 59, 0.5)',
              border: `2px solid ${gameMode === 'multi' ? 'var(--antigravity)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              padding: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Multiplayer Pass & Play</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2-4 Pemain bergantian dalam 1 layar</div>
            </div>
          </div>
        </div>

        {/* Configurations based on mode */}
        {gameMode === 'single' ? (
          <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 28 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nama Karakter Anda</label>
              <input
                type="text"
                value={playersConfig[0].name}
                onChange={(e) => handlePlayerNameChange(0, e.target.value)}
                style={{ width: '100%', marginTop: 6, background: '#0f172a', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pilih Avatar</label>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  {AVATAR_OPTIONS.slice(0, 5).map(av => (
                    <button
                      key={av}
                      onClick={() => handleAvatarChange(0, av)}
                      style={{ width: 36, height: 36, borderRadius: 8, background: playersConfig[0].avatar === av ? 'var(--primary)' : 'rgba(51, 65, 85, 0.6)', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Jumlah Lawan Bot AI</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {[1, 2, 3].map(n => (
                    <button
                      key={n}
                      onClick={() => setNumBots(n)}
                      style={{ padding: '6px 14px', borderRadius: 8, background: numBots === n ? 'var(--primary)' : 'rgba(51, 65, 85, 0.6)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {n} Bot
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 20, marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Jumlah Pemain</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setNumPlayers(n)}
                    style={{ padding: '6px 14px', borderRadius: 8, background: numPlayers === n ? 'var(--antigravity)' : 'rgba(51, 65, 85, 0.6)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {n} Pemain
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Array.from({ length: numPlayers }).map((_, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-muted)', width: 24 }}>P{idx + 1}</span>
                  <input
                    type="text"
                    value={playersConfig[idx].name}
                    onChange={(e) => handlePlayerNameChange(idx, e.target.value)}
                    style={{ flex: 1, background: '#0f172a', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: '0.9rem' }}
                  />
                  <div style={{ display: 'flex', gap: 4 }}>
                    {AVATAR_OPTIONS.slice(idx * 2, idx * 2 + 2).map(av => (
                      <button
                        key={av}
                        onClick={() => handleAvatarChange(idx, av)}
                        style={{ width: 32, height: 32, borderRadius: 6, background: playersConfig[idx].avatar === av ? playersConfig[idx].color : 'rgba(51,65,85,0.6)', border: 'none', cursor: 'pointer' }}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-glass" onClick={onOpenEncyclopedia}>
              <BookOpen size={16} /> Buku Saku PIS
            </button>
            <button className="btn-glass" onClick={onOpenRules}>
              <Compass size={16} /> Aturan Main
            </button>
          </div>

          <button className="btn-primary" onClick={handleLaunch} style={{ padding: '12px 28px', fontSize: '1rem' }}>
            <Play size={18} /> Mulai Permainan
          </button>
        </div>
      </div>
    </div>
  );
};
