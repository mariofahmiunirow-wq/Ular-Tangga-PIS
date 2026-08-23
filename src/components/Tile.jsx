import React from 'react';
import { Sparkles, ArrowUpRight, ArrowDownRight, BookOpen, ShieldCheck } from 'lucide-react';
import { getTileFeature } from '../data/boardConfig';

export const Tile = ({ tileNumber, playersOnTile }) => {
  const { ladder, snake, antigravity, concept } = getTileFeature(tileNumber);

  let specialClass = '';
  if (tileNumber === 1) specialClass = 'tile-start';
  else if (tileNumber === 100) specialClass = 'tile-finish';
  else if (antigravity) specialClass = 'tile-antigravity';
  else if (ladder) specialClass = 'tile-ladder-start';
  else if (snake) specialClass = 'tile-snake-head';

  return (
    <div 
      className={`tile-cell ${specialClass}`}
      title={
        antigravity ? `${antigravity.name}: ${antigravity.desc}` :
        ladder ? `Tangga (${ladder.name}) -> Naik ke kotak ${ladder.end}` :
        snake ? `Ular (${snake.name}) -> Turun ke kotak ${snake.tail}` :
        concept ? `${concept.title}: ${concept.desc}` : `Kotak ${tileNumber}`
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span className="tile-number">{tileNumber}</span>

        {antigravity && (
          <span className="tile-badge badge-antigravity" title="Antigravity Zone - Loncatan Pengetahuan">
            <Sparkles size={9} style={{ display: 'inline', marginRight: 2 }} /> AG
          </span>
        )}

        {ladder && (
          <span className="tile-badge badge-ladder" title={`Kuis Tangga menuju kotak ${ladder.end}`}>
            <ArrowUpRight size={9} style={{ display: 'inline', marginRight: 2 }} /> {ladder.end}
          </span>
        )}

        {snake && (
          <span className="tile-badge badge-snake" title={`Jebakan Ular menuju kotak ${snake.tail}`}>
            <ArrowDownRight size={9} style={{ display: 'inline', marginRight: 2 }} /> {snake.tail}
          </span>
        )}

        {!antigravity && !ladder && !snake && concept && (
          <span className="tile-badge badge-concept" title={concept.title}>
            <BookOpen size={8} />
          </span>
        )}
      </div>

      {/* Mini Title/Concept preview if available */}
      {concept && (
        <div style={{ fontSize: '0.52rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 'auto' }}>
          {concept.title}
        </div>
      )}

      {antigravity && (
        <div style={{ fontSize: '0.52rem', color: 'var(--antigravity-light)', fontWeight: 700, marginTop: 'auto' }}>
          Anti-G
        </div>
      )}
    </div>
  );
};
