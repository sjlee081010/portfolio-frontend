import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import SlideFlipText from '../components/SlideFlipText';

const SECTION_COUNT = 3;

const SKILLS = {
  Tech: ['React', 'React Native', 'Node.js', 'Spring Boot'],
  Tool: ['Figma'],
};

const CERTIFICATES = [
  '정보처리산업기사',
  '웹디자인개발기능사',
  '프로그래밍기능사',
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null); // AboutSections에 부착
  const [current, setCurrent] = useState(0); // dot 하이라이트용

  const posRef = useRef(0);     // 실제 스크롤 위치 (섹션 단위 float)
  const targetRef = useRef(0);  // 이동 목표 섹션 (정수)
  const rafRef = useRef<number | undefined>(undefined);
  const draggingRef = useRef(false);
  const startYRef = useRef(0);
  const startPosRef = useRef(0); // 드래그 시작 시점의 pos
  const dragTargetRef = useRef(0);

  // pos 하나로 transform + 각 섹션 opacity를 매 프레임 계산
  const render = () => {
    const pos = posRef.current;
    const el = sectionsRef.current;
    if (!el) return;
    el.style.transform = `translateY(${-pos * 100}%)`;
    const sections = el.children;
    for (let i = 0; i < sections.length; i++) {
      const FADE = 2.5;
      const opacity = Math.max(0, Math.min(1, 1 - Math.abs(i - pos) * FADE));

      (sections[i] as HTMLElement).style.opacity = String(opacity);
    }
  };

  // target을 향해 pos를 부드럽게 이징 (드래그 중이 아닐 때)
  const animate = () => {
    const diff = targetRef.current - posRef.current;
    if (Math.abs(diff) < 0.001) {
      posRef.current = targetRef.current;
      render();
      rafRef.current = undefined;
      return;
    }
    posRef.current += diff * 0.02;
    render();
    rafRef.current = requestAnimationFrame(animate);
  };

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(SECTION_COUNT - 1, i));
    targetRef.current = clamped;
    setCurrent(clamped);
    rafRef.current ??= requestAnimationFrame(animate);
  };

  const dragAnimate = () => {
    posRef.current += (dragTargetRef.current - posRef.current) * 0.15; // ← 이 값이 "따라오는 속도"
    render();
    if (draggingRef.current) rafRef.current = requestAnimationFrame(dragAnimate);
  };

  // 초기 렌더 + 휠 네비게이션 (preventDefault를 위해 non-passive 리스너 필요)
  useEffect(() => {
    render();
    const page = pageRef.current;
    if (!page) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      goTo(targetRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    page.addEventListener('wheel', onWheel, { passive: false });
    return () => page.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    startYRef.current = e.clientY;
    startPosRef.current = posRef.current;
    dragTargetRef.current = posRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    // 복귀(animate) 루프가 돌고 있으면 취소하고 현재 위치에서 드래그 루프 시작
    if (rafRef.current) cancelAnimationFrame(rafRef.current); // 기존 animate 중단
    rafRef.current = requestAnimationFrame(dragAnimate);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const height = pageRef.current?.clientHeight ?? 1;
    let pos = startPosRef.current - (e.clientY - startYRef.current) / (height * 0.5);
    const max = SECTION_COUNT - 1;
    if (pos < 0) pos *= 0.3;
    else if (pos > max) pos = max + (pos - max) * 0.3;
    dragTargetRef.current = pos; // 목표만 갱신, 즉시 이동 X
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = undefined; }
    goTo(Math.round(posRef.current));
  };

  return (
    <AboutPage ref={pageRef}>
      <AboutSections
        ref={sectionsRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Section>
          <Title>
            <h1>안녕하세요&nbsp;&nbsp;배움을 멈추지 않는</h1>
            <h1>
              <ChangeText
                words={['서울디지텍고등학교', '블루데이타시스템즈']}
                interval={8}
                transition={0.8}
              />{' '}
              개발자 이선재입니다
            </h1>
          </Title>
        </Section>

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <Line />
          <Groups>
            {Object.entries(SKILLS).map(([label, items]) => (
              <Group key={label}>
                <GroupLabel>{label}</GroupLabel>
                <Items>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </Items>
              </Group>
            ))}
          </Groups>
        </Section>

        <Section>
          <SectionTitle>Certificates</SectionTitle>
          <Line />
          <CertList>
            {CERTIFICATES.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </CertList>
        </Section>
      </AboutSections>

      <DotNav>
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
          <Dot
            key={i}
            className={current === i ? 'active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </DotNav>
    </AboutPage>
  );
}

const AboutPage = styled.div`
  position: relative;
  overflow: hidden;
  touch-action: none;   /* 브라우저 기본 세로 스크롤/제스처 차단 (필수) */
  user-select: none;    /* 드래그 시 텍스트 선택 방지 */
  -webkit-user-select: none;
`;

const AboutSections = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;   /* GPU 합성 레이어로 승격 → 더 매끄럽게 */
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 32px;
  padding-bottom: 5%;
  opacity: 0;   /* 위치 기반 opacity를 JS가 매 프레임 설정 */
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  
  /* 추가 */
  position: relative;
  padding: 28px 40px;
  border: 4px solid #555;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    right: -5px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background-color: var(--color-bg);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: -5px;
    height: calc(100% + -12px);
    width: calc(100% - 12px);
    background-color: var(--color-bg);
    z-index: 1;
  }

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 36px;
    color: #333;
    margin: 5px 0;
    letter-spacing: 2px;
    font-weight: 500;
    white-space: nowrap;
    position: relative; /* 추가 */
    z-index: 2;         /* 추가 */
  }
`;

const SectionTitle = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 32px;
  color: #333;
  letter-spacing: 2px;
  font-weight: 500;
`;

const Line = styled.hr`
  width: 60px;
  border: 1px solid #333;
`;

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 32px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const GroupLabel = styled.span`
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888;
`;

const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 28px;
  row-gap: 12px;

  li {
    font-size: 20px;
    color: #333;
  }
`;

const CertList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  li {
    display: flex;
    align-items: center;
    column-gap: 12px;
    font-size: 24px;
    color: #555;
    letter-spacing: 1px;
  }

  li::before {
    content: '';
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #333;
    margin-top: 2px;
    margin-right: 10px;
  }

  padding-left: 24px;
`;

const ChangeText = styled(SlideFlipText)`
  color: #666;
`;

const DotNav = styled.nav`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  z-index: 10;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background-color: #eee;
  cursor: pointer;
  transition: 0.3s;

  &.active {
    height: 16px;
    background-color: #333;
  }
`;
