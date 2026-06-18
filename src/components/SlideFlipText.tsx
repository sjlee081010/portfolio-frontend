import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface SlideFlipTextProps {
  words: string[];
  /** Seconds between word swaps. */
  interval?: number;
  /** Slide transition duration in seconds. */
  transition?: number;
  className?: string;
}

export default function SlideFlipText({
  words,
  interval = 8,
  transition = 0.5,
  className,
}: SlideFlipTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const container = document.createElement('span');
    container.style.display = 'block';

    [...words, words[0]].forEach((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'block';
      container.appendChild(span);
    });

    wrapper.appendChild(container);
    wrapper.style.height = `${(container.firstElementChild as HTMLElement).offsetHeight}px`;

    const spans = Array.from(container.children) as HTMLElement[];
    let index = 0;

    const id = setInterval(() => {
      index++;

      spans.forEach((span) => {
        span.style.transition = `transform ${transition}s ease`;
        span.style.transform = `translateY(-${index * 100}%)`;
      });

      if (index === words.length) {
        setTimeout(() => {
          spans.forEach((span) => {
            span.style.transition = 'none';
            span.style.transform = 'translateY(0)';
          });
          index = 0;
        }, transition * 1000 + 50);
      }
    }, interval * 1000);

    return () => {
      clearInterval(id);
      wrapper.innerHTML = '';
      wrapper.style.height = '';
    };
  }, [words, interval, transition]);

  return <Wrapper ref={wrapperRef} className={className} />;
}

const Wrapper = styled.span`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  position: relative;
  padding-bottom: 20px;

  /* 진입/퇴장 텍스트의 상하 가장자리를 배경색으로 페이드 */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--color-bg) 0%,
      transparent 10%,
      transparent 95%,
      var(--color-bg) 100%
    );
    pointer-events: none;
  }
`;
