import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface FlipTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

/** Port of utils/flipText.js — cycles words with a vertical flip animation. */
export default function FlipText({ words, interval = 4000, className }: FlipTextProps) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => {
        setPrev(i);
        return (i + 1) % words.length;
      });
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  // Remove the outgoing word after its flip-out animation finishes.
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 500);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <Container className={className}>
      {prev !== null && (
        <FlipWord key={`out-${prev}`} className="flip-out">
          {words[prev]}
        </FlipWord>
      )}
      <FlipWord key={`in-${index}`} className="flip-in">
        {words[index]}
      </FlipWord>
    </Container>
  );
}

const textIn = keyframes`
  from {
    transform: scaleY(-1);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const textOut = keyframes`
  from {
    transform: scaleY(1);
    opacity: 1;
  }
  to {
    transform: scaleY(-1);
    opacity: 0;
  }
`;

const Container = styled.span`
  display: inline-block;
`;

const FlipWord = styled.b`
  top: 0;
  left: 0;
  position: absolute;
  display: inline-block;
  transform-origin: bottom;

  &.flip-in {
    animation: ${textIn} 0.5s forwards;
  }

  &.flip-out {
    animation: ${textOut} 0.5s forwards;
  }
`;
