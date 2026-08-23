import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { soundFx } from '../utils/audioEffects';

export const QuizModal = ({ question, ladderInfo, playerName, isBot, onAnswerComplete }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(25);

  useEffect(() => {
    // If bot, auto-answer after a brief realistic pause
    if (isBot && !isAnswered) {
      const timerBot = setTimeout(() => {
        // 75% chance of bot answering correctly
        const isBotSmart = Math.random() < 0.75;
        const answer = isBotSmart ? question.correctIndex : (question.correctIndex + 1) % question.options.length;
        handleSelect(answer);
      }, 1800);
      return () => clearTimeout(timerBot);
    }
  }, [isBot, isAnswered, question]);

  // Countdown timer for human player
  useEffect(() => {
    if (isAnswered || isBot) return;
    if (timer <= 0) {
      // Time out - mark wrong
      handleSelect(-1);
      return;
    }
    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isAnswered, isBot]);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === question.correctIndex;
    if (isCorrect) {
      soundFx.playCorrect();
    } else {
      soundFx.playWrong();
    }
  };

  const handleContinue = () => {
    const isCorrect = selectedIdx === question.correctIndex;
    onAnswerComplete(isCorrect);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content quiz-modal-content">
        
        {/* Header */}
        <div className="modal-header" style={{ padding: '16px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: 8, borderRadius: 10, color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpRight size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fff', letterSpacing: '-0.01em' }}>
                Tantangan Kuis Tangga
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {ladderInfo ? `Tangga: ${ladderInfo.name} (Naik ke Kotak ${ladderInfo.end})` : 'Uji Pemahaman Sosial'}
              </p>
            </div>
          </div>

          {!isAnswered && !isBot && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid var(--border-subtle)', padding: '6px 14px', borderRadius: 20, fontSize: '0.95rem', fontWeight: 700, color: timer < 10 ? '#ef4444' : '#38bdf8' }}>
              <Clock size={16} />
              <span>{timer}s</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '22px' }}>
          
          <div className="quiz-header-badge">
            <BookOpen size={14} />
            {question.chapterTitle}
          </div>

          <p className="quiz-player-turn">
            Giliran Menjawab: <strong style={{ color: '#fff' }}>{playerName}</strong>
          </p>

          {/* Question Text (Large) */}
          <h4 className="quiz-question-text">{question.question}</h4>

          {/* Options List (Large) */}
          <div className="quiz-options-list">
            {question.options.map((option, idx) => {
              const optionLabels = ['A', 'B', 'C', 'D'];
              let optionClass = '';

              if (isAnswered) {
                if (idx === question.correctIndex) {
                  optionClass = 'selected-correct';
                } else if (idx === selectedIdx) {
                  optionClass = 'selected-wrong';
                }
              }

              return (
                <button
                  key={idx}
                  className={`quiz-option-btn ${optionClass}`}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered || isBot}
                >
                  <span style={{ fontWeight: 800, minWidth: 26, color: 'var(--primary)', fontSize: '1.15rem' }}>
                    {optionLabels[idx]}.
                  </span>
                  <span style={{ flex: 1, fontSize: '1.05rem', lineHeight: 1.45 }}>{option}</span>
                  {isAnswered && idx === question.correctIndex && (
                    <CheckCircle2 size={22} color="#10b981" style={{ flexShrink: 0 }} />
                  )}
                  {isAnswered && idx === selectedIdx && idx !== question.correctIndex && (
                    <XCircle size={22} color="#ef4444" style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Card (Large & Clear) */}
          {isAnswered && (
            <div className="explanation-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: '1.02rem', color: selectedIdx === question.correctIndex ? '#34d399' : '#f87171', marginBottom: 6 }}>
                {selectedIdx === question.correctIndex ? (
                  <>
                    <CheckCircle2 size={20} /> Jawaban Tepat! Anda berhak menaiki tangga.
                  </>
                ) : (
                  <>
                    <XCircle size={20} /> Jawaban Kurang Tepat! Kunci jawaban yang benar ditandai hijau di atas.
                  </>
                )}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                <strong style={{ color: '#38bdf8' }}>Penjelasan:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ padding: '16px 22px' }}>
          {isAnswered ? (
            <button className="btn-primary" onClick={handleContinue} style={{ fontSize: '1.05rem', padding: '12px 24px' }}>
              {selectedIdx === question.correctIndex ? 'Naiki Tangga 🚀' : 'Lanjut Permainan'}
            </button>
          ) : (
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
              {isBot ? 'Bot sedang menganalisis jawaban...' : 'Pilihan jawaban diacak setiap kuis muncul!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
