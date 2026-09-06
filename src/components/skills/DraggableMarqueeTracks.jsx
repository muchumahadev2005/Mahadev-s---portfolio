import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * DraggableMarqueeTracks
 * - Background tracks scroll continuously without stopping.
 * - When a skill is selected/grabbed, it detaches from the scrolling flow and locks 1:1
 *   to the user's pointer/finger anywhere on screen via createPortal!
 * - Full 360-degree free movement anywhere on the screen.
 * - Dropping past the threshold moves the skill cleanly between the two tracks.
 */
export const DraggableMarqueeTracks = ({
  row1Items = [],
  row2Items = [],
  onMoveSkill,
}) => {
  const [draggedSkill, setDraggedSkill] = useState(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const handlePointerDown = (item, sourceRow, e) => {
    // Only respond to main click / touch
    if (e.button !== undefined && e.button !== 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggedSkill({
      name: item,
      sourceRow,
      x: e.clientX,
      y: e.clientY,
      offsetX,
      offsetY,
      width: rect.width,
      height: rect.height,
      startY: e.clientY,
    });
  };

  useEffect(() => {
    if (!draggedSkill) return;

    const handlePointerMove = (e) => {
      setDraggedSkill((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          x: e.clientX,
          y: e.clientY,
        };
      });
    };

    const handlePointerUp = (e) => {
      if (!draggedSkill) return;

      const r1 = row1Ref.current?.getBoundingClientRect();
      const r2 = row2Ref.current?.getBoundingClientRect();

      const currentY = e.clientY;
      const startY = draggedSkill.startY;
      const sourceRow = draggedSkill.sourceRow;
      const diffY = currentY - startY;

      // Transfer between rows if dragged across
      if (sourceRow === 'top' && (diffY > 35 || (r2 && currentY >= r2.top - 15))) {
        onMoveSkill(draggedSkill.name, 'top', 'bottom');
      } else if (sourceRow === 'bottom' && (diffY < -35 || (r1 && currentY <= r1.bottom + 15))) {
        onMoveSkill(draggedSkill.name, 'bottom', 'top');
      }

      setDraggedSkill(null);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggedSkill, onMoveSkill]);

  const renderChip = (item, idx, sourceRow) => {
    const isBeingDragged =
      draggedSkill &&
      draggedSkill.name === item &&
      draggedSkill.sourceRow === sourceRow;

    return (
      <div
        key={`${sourceRow}-${item}-${idx}`}
        onPointerDown={(e) => handlePointerDown(item, sourceRow, e)}
        className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border transition-colors duration-200 backdrop-blur-md select-none cursor-grab active:cursor-grabbing ${
          isBeingDragged
            ? 'opacity-20 border-dashed border-accent-cyan bg-surface/30 scale-95'
            : 'bg-surface/70 border-white/[0.08] hover:border-accent-cyan/50 hover:bg-surface-elevated/80 text-slate-200 hover:text-white'
        }`}
        style={{ touchAction: 'none' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-violet group-hover:bg-accent-cyan transition-colors flex-shrink-0" />
        <span className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider whitespace-nowrap">
          {item}
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden select-none py-2 space-y-4">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      {/* Row 1 (Top Scrolling Track - Scrolls non-stop) */}
      <div
        ref={row1Ref}
        className="flex w-max space-x-4 animate-marquee"
        style={{ animationDuration: '30s' }}
      >
        {[...row1Items, ...row1Items, ...row1Items].map((item, idx) =>
          renderChip(item, idx, 'top')
        )}
      </div>

      {/* Row 2 (Bottom Reverse Scrolling Track - Scrolls non-stop) */}
      <div
        ref={row2Ref}
        className="flex w-max space-x-4 animate-marquee-reverse"
        style={{ animationDuration: '34s' }}
      >
        {[...row2Items, ...row2Items, ...row2Items].map((item, idx) =>
          renderChip(item, idx, 'bottom')
        )}
      </div>

      {/* Detached Floating Dragged Skill: Mounted to document.body via Portal to prevent any ancestor transform issues */}
      {draggedSkill &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              left: draggedSkill.x - draggedSkill.offsetX,
              top: draggedSkill.y - draggedSkill.offsetY,
              width: draggedSkill.width,
              height: draggedSkill.height,
              pointerEvents: 'none',
              zIndex: 999999,
            }}
            className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-surface-elevated/95 border border-accent-cyan shadow-[0_0_30px_rgba(6,182,212,0.85)] text-white backdrop-blur-2xl scale-110 rotate-2 select-none cursor-grabbing"
          >
            <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#06B6D4] animate-pulse flex-shrink-0" />
            <span className="font-syne font-bold text-sm sm:text-base uppercase tracking-wider whitespace-nowrap text-white">
              {draggedSkill.name}
            </span>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DraggableMarqueeTracks;
