import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

interface SlideTextProps {
  words: string[];
  /** Time between word swaps, in ms. */
  interval?: number;
  /** Clip-path transition duration, in seconds. */
  transition?: number;
  /** Which side the wipe originates from. */
  direction?: 'left' | 'right';
  className?: string;
}

/** Port of utils/slideText.js — wipes one word out and the next in via clip-path. */
export default function SlideText({
  words,
  interval = 10000,
  transition = 0.8,
  direction = 'left',
  className,
}: SlideTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);

  // Measure the widest word once fonts are ready so the box never jumps.
  useEffect(() => {
    const measure = measureRef.current;
    if (!measure) return;
    document.fonts.ready.then(() => {
      const maxWidth = Math.max(
        ...words.map((text) => {
          measure.textContent = text;
          return measure.getBoundingClientRect().width;
        })
      );
      setWidth(maxWidth);
    });
  }, [words]);

  // Drive the wipe-out / swap / wipe-in cycle.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hide = direction === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
    const show = direction === 'right' ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)';

    const id = setInterval(() => {
      container.style.clipPath = hide;
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        container.style.clipPath = show;
      }, transition * 1000);
    }, interval);

    return () => clearInterval(id);
  }, [words, interval, transition]);

  return (
    <>
      <Container
        ref={containerRef}
        className={className}
        style={{
          width,
          transition: `clip-path ${transition}s ease-in-out`,
        }}
      >
        {words[index]}
      </Container>
      {/* Hidden node used only for measuring word widths. */}
      <Measure ref={measureRef} aria-hidden />
    </>
  );
}

const Container = styled.span`
  display: inline-block;
  white-space: nowrap;
  clip-path: inset(0 0% 0 0);
`;

const Measure = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  pointer-events: none;
`;
