import React, { useState, useEffect, useRef } from 'react';
import { Board } from './components/Board';
import { DiceRoller } from './components/DiceRoller';
import { PlayerHUD } from './components/PlayerHUD';
import { GameLobby } from './components/GameLobby';
import { QuizModal } from './components/QuizModal';
import { AntigravityModal } from './components/AntigravityModal';
import { WinnerModal } from './components/WinnerModal';
import { EncyclopediaModal } from './components/EncyclopediaModal';
import { RuleGuideModal } from './components/RuleGuideModal';
import { LADDERS, SNAKES, ANTIGRAVITY_ZONES, getTileFeature } from './data/boardConfig';
import { getRandomQuestion, questionsBank } from './data/questionsBank';
import { soundFx } from './utils/audioEffects';
import { Volume2, VolumeX, BookOpen, Compass, RotateCcw, Sparkles, Maximize2, Minimize2 } from 'lucide-react';

export default function App() {
  // Game States
  const [gameState, setGameState] = useState('lobby'); // 'lobby' | 'playing' | 'gameover'
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [lastRolled, setLastRolled] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Modals state
  const [activeQuiz, setActiveQuiz] = useState(null); // { question, ladderInfo, pendingEndTile }
  const [activeAntigravity, setActiveAntigravity] = useState(null); // { zoneInfo }
  const [winner, setWinner] = useState(null);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);

  // Game Logs & Statistics
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    correctQuizzes: 0,
    laddersClimbed: 0,
    antigravityTriggered: 0,
    snakesBypassed: 0,
    sixRolled: 0
  });

  const addLog = (message, type = 'info') => {
    setLogs(prev => [{ message, type, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 25)]);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.warn(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.warn(err));
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Start new game
  const handleStartGame = (configuredPlayers) => {
    setPlayers(configuredPlayers);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setLastRolled(null);
    setGameState('playing');
    setLogs([]);
    setAskedQuestionIds([]);
    setStats({
      correctQuizzes: 0,
      laddersClimbed: 0,
      antigravityTriggered: 0,
      snakesBypassed: 0,
      sixRolled: 0
    });
    addLog(`🎮 Permainan dimulai! Dadu 6 memberikan bonus 1x lempar lagi. Giliran: ${configuredPlayers[0].name}.`, 'info');
  };

  const currentPlayer = players[currentPlayerIndex];

  // Auto-play for bot turn
  useEffect(() => {
    if (gameState === 'playing' && currentPlayer?.isBot && !isRolling && !isMoving && !activeQuiz && !activeAntigravity && !winner) {
      const botTimer = setTimeout(() => {
        handleRollDice();
      }, 1000);
      return () => clearTimeout(botTimer);
    }
  }, [gameState, currentPlayerIndex, isRolling, isMoving, activeQuiz, activeAntigravity, winner, diceValue]);

  // Roll Dice Logic
  const handleRollDice = () => {
    if (isRolling || isMoving || activeQuiz || activeAntigravity || gameState !== 'playing') return;

    setIsRolling(true);
    soundFx.playDiceRoll();

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolled);
      setLastRolled(rolled);
      setIsRolling(false);

      if (rolled === 6) {
        setStats(s => ({ ...s, sixRolled: s.sixRolled + 1 }));
        addLog(`🎲 ${currentPlayer.name} melempar dadu: 6! ⭐ (Bonus 1x Lempar Lagi)`);
      } else {
        addLog(`🎲 ${currentPlayer.name} melempar dadu: ${rolled}.`);
      }

      movePlayerStepByStep(rolled);
    }, 500);
  };

  // Step-by-step movement animation
  const movePlayerStepByStep = async (steps) => {
    setIsMoving(true);
    let currentPos = currentPlayer.position;
    const targetPos = Math.min(100, currentPos + steps);

    for (let pos = currentPos + 1; pos <= targetPos; pos++) {
      await new Promise(resolve => setTimeout(resolve, 180));
      soundFx.playStep();
      setPlayers(prev => prev.map((p, idx) => idx === currentPlayerIndex ? { ...p, position: pos } : p));
    }

    setIsMoving(false);
    handleTileArrival(targetPos, steps);
  };

  // Process features on the landed tile
  const handleTileArrival = (tileNumber, stepsRolled) => {
    // 1. Check Victory
    if (tileNumber >= 100) {
      setWinner(currentPlayer);
      setGameState('gameover');
      addLog(`🏆 ${currentPlayer.name} mencapai Kotak 100 dan memenangkan permainan!`, 'ladder');
      return;
    }

    const { ladder, snake, antigravity } = getTileFeature(tileNumber);

    // 2. Check Antigravity Zone
    if (antigravity) {
      setPlayers(prev => prev.map((p, idx) => 
        idx === currentPlayerIndex 
          ? { ...p, hasShield: true, score: p.score + antigravity.bonusPoints } 
          : p
      ));
      setStats(s => ({ ...s, antigravityTriggered: s.antigravityTriggered + 1 }));
      addLog(`✨ ${currentPlayer.name} mendarat di ${antigravity.name}! Perisai Antigravity Aktif (+${antigravity.bonusPoints} pts).`, 'antigravity');
      setActiveAntigravity({ zoneInfo: antigravity, stepsRolled });
      return; // Will pass turn on modal close
    }

    // 3. Check Ladder Quiz
    if (ladder) {
      const question = getRandomQuestion(askedQuestionIds);
      setAskedQuestionIds(prev => [...prev, question.id]);
      setActiveQuiz({
        question,
        ladderInfo: ladder,
        targetEnd: ladder.end,
        stepsRolled
      });
      addLog(`🪜 ${currentPlayer.name} di pangkal tangga '${ladder.name}' (Kotak ${ladder.start}). Menjawab kuis...`, 'ladder');
      return; // Turn passes on quiz complete
    }

    // 4. Check Snake Encounter
    if (snake) {
      if (currentPlayer.hasShield) {
        // Bypass Snake with Antigravity Shield!
        soundFx.playShieldBypass();
        setPlayers(prev => prev.map((p, idx) => 
          idx === currentPlayerIndex ? { ...p, hasShield: false, score: p.score + 35 } : p
        ));
        setStats(s => ({ ...s, snakesBypassed: s.snakesBypassed + 1 }));
        addLog(`🛡️ ${currentPlayer.name} mem-bypass jebakan '${snake.name}' berkat Perisai Antigravity!`, 'antigravity');
        passTurn(stepsRolled);
      } else {
        // Slide down the snake
        soundFx.playSnake();
        addLog(`🐍 ${currentPlayer.name} terperosok oleh '${snake.name}'! Meluncur ke Kotak ${snake.tail}.`, 'snake');
        setTimeout(() => {
          setPlayers(prev => prev.map((p, idx) => 
            idx === currentPlayerIndex ? { ...p, position: snake.tail } : p
          ));
          passTurn(stepsRolled);
        }, 500);
      }
      return;
    }

    // Normal tile landing
    passTurn(stepsRolled);
  };

  // Callback when Quiz Modal finishes
  const handleQuizComplete = async (isCorrect) => {
    const { targetEnd, ladderInfo, stepsRolled } = activeQuiz;
    setActiveQuiz(null);

    if (isCorrect) {
      soundFx.playLadder();
      setStats(s => ({ ...s, correctQuizzes: s.correctQuizzes + 1, laddersClimbed: s.laddersClimbed + 1 }));
      setPlayers(prev => prev.map((p, idx) => 
        idx === currentPlayerIndex ? { ...p, position: targetEnd, score: p.score + 50 } : p
      ));
      addLog(`🚀 ${currentPlayer.name} menjawab kuis BENAR! Naik ke Kotak ${targetEnd} (+50 pts).`, 'ladder');

      if (targetEnd >= 100) {
        setWinner(currentPlayer);
        setGameState('gameover');
        return;
      }
    } else {
      addLog(`❌ ${currentPlayer.name} menjawab salah. Tetap di Kotak ${ladderInfo.start}.`, 'info');
    }

    setTimeout(() => {
      passTurn(stepsRolled);
    }, 300);
  };

  // Close Antigravity Modal
  const handleCloseAntigravity = () => {
    const stepsRolled = activeAntigravity?.stepsRolled;
    setActiveAntigravity(null);
    passTurn(stepsRolled);
  };

  // Advance turn to next player or give extra roll if rolled a 6
  const passTurn = (stepsRolled) => {
    if (stepsRolled === 6) {
      addLog(`⭐ Dadu 6! ${currentPlayer.name} berhak melempar dadu 1 kali lagi!`, 'antigravity');
      // Reset diceValue so UI shows ready to roll
      setDiceValue(null);
      // Do NOT increment currentPlayerIndex -> Same player rolls again!
      return;
    }

    setDiceValue(null);
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
  };

  const toggleSound = () => {
    const nextState = soundFx.toggleSound();
    setSoundEnabled(nextState);
  };

  return (
    <div className="app-container">
      {/* Top Header Bar */}
      <header className="header-bar">
        <div className="brand-title">
          <div className="brand-logo-icon">
            <Sparkles size={20} color="#fff" />
          </div>
          <div className="brand-text">
            <h1>ULAR TANGGA PIS</h1>
            <p>Pengantar Ilmu Sosial</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="btn-glass" onClick={() => setShowEncyclopedia(true)} title="Buka Rujukan Materi & Glosarium">
            <BookOpen size={15} /> <span>Buku Saku PIS</span>
          </button>
          
          <button className="btn-glass" onClick={() => setShowRules(true)} title="Panduan Aturan Main">
            <Compass size={15} /> <span>Aturan</span>
          </button>

          <button className="btn-glass" onClick={toggleFullscreen} title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh (Full Screen)'}>
            {isFullscreen ? <Minimize2 size={15} color="#38bdf8" /> : <Maximize2 size={15} color="#38bdf8" />}
          </button>

          <button className="btn-glass" onClick={toggleSound} title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}>
            {soundEnabled ? <Volume2 size={15} color="#38bdf8" /> : <VolumeX size={15} color="#94a3b8" />}
          </button>

          {gameState === 'playing' && (
            <button className="btn-glass" onClick={() => setGameState('lobby')} title="Kembali ke Menu Awal">
              <RotateCcw size={15} /> Menu
            </button>
          )}
        </div>
      </header>

      {/* Screen Content */}
      {gameState === 'lobby' ? (
        <GameLobby
          onStartGame={handleStartGame}
          onOpenEncyclopedia={() => setShowEncyclopedia(true)}
          onOpenRules={() => setShowRules(true)}
        />
      ) : (
        <main className="main-game-layout">
          {/* 10x10 Board Canvas */}
          <Board
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            movingPlayerId={isMoving ? currentPlayer?.id : null}
          />

          {/* Right Sidebar Control & HUD */}
          <div className="side-panel">
            {/* 3D Dice Roller Box */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Kontrol Dadu
                </span>
                {lastRolled === 6 && (
                  <span style={{ fontSize: '0.7rem', background: 'rgba(168, 85, 247, 0.25)', color: '#c084fc', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>
                    ⭐ Bonus 6!
                  </span>
                )}
              </div>
              <DiceRoller
                diceValue={diceValue}
                isRolling={isRolling}
                onRoll={handleRollDice}
                disabled={isRolling || isMoving || currentPlayer?.isBot || activeQuiz !== null || activeAntigravity !== null}
                isBot={currentPlayer?.isBot}
              />
            </div>

            {/* Players Status & Game Logs */}
            <PlayerHUD
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              logs={logs}
            />
          </div>
        </main>
      )}

      {/* Ladder Challenge Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          question={activeQuiz.question}
          ladderInfo={activeQuiz.ladderInfo}
          playerName={currentPlayer?.name}
          isBot={currentPlayer?.isBot}
          onAnswerComplete={handleQuizComplete}
        />
      )}

      {/* Antigravity Zone Activation Modal */}
      {activeAntigravity && (
        <AntigravityModal
          zoneInfo={activeAntigravity.zoneInfo}
          playerName={currentPlayer?.name}
          isBot={currentPlayer?.isBot}
          onClose={handleCloseAntigravity}
        />
      )}

      {/* Winner Podium Celebration Modal */}
      {winner && (
        <WinnerModal
          winner={winner}
          stats={stats}
          onPlayAgain={() => handleStartGame(players)}
          onBackToLobby={() => setGameState('lobby')}
        />
      )}

      {/* Encyclopedia & Glossary Drawer */}
      {showEncyclopedia && (
        <EncyclopediaModal onClose={() => setShowEncyclopedia(false)} />
      )}

      {/* Rules Guide Modal */}
      {showRules && (
        <RuleGuideModal onClose={() => setShowRules(false)} />
      )}
    </div>
  );
}
