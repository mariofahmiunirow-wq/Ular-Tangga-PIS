import React from 'react';
import { Dices } from 'lucide-react';

export const DiceRoller = ({ diceValue, isRolling, onRoll, disabled, isBot }) => {
  // Dot layout or number presentation
  return (
    <div className="dice-container">
      <div 
        className={`dice-box ${isRolling ? 'rolling' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!disabled && !isRolling) onRoll();
        }}
        title={disabled ? 'Menunggu giliran...' : 'Klik atau tekan tombol untuk melempar dadu'}
      >
        <span>{diceValue || <Dices size={36} />}</span>
      </div>

      <button
        className="btn-primary"
        onClick={onRoll}
        disabled={disabled || isRolling}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <Dices size={18} />
        {isRolling ? 'Mengocok Dadu...' : isBot ? 'Bot Berpikir...' : 'Lempar Dadu'}
      </button>
    </div>
  );
};
