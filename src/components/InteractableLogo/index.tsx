import { useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

interface ComponentProps {
  src: string;
  altText: string;
  defaultCursor: string;
  activeCursor: string;
  defaultSize?: number;
  activeSize?: number;
  moveSpeed?: number;
  spinSpeed?: number;
  targetRef?: React.RefObject<HTMLElement | null>;
  onCollision?: () => void;
};

export default function InteractableLogo({
  src,
  altText,
  defaultCursor,
  activeCursor,
  defaultSize = 300,
  activeSize = 50,
  moveSpeed = 2,
  spinSpeed = 4,
  targetRef,
  onCollision
}: ComponentProps) {
  const [phase, setPhase] = useState<'idle' | 'follow' | 'bounce'>('idle');
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: window.innerWidth / 2 - defaultSize / 2,
    y: window.innerHeight / 2 - defaultSize / 2
  });
  const [rotation, setRotation] = useState<number>(0);

  const direction = useRef({ dx: -moveSpeed, dy: moveSpeed });
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const hasCollided = useRef(false);

  const setCursor = useCallback((cursorUrl?: string, hotspotX = 0, hotspotY = 0) => {
    if (cursorUrl) {
      document.body.style.cursor = `url(${cursorUrl}) ${hotspotX} ${hotspotY}, auto`;
    } else {
      document.body.style.cursor = 'auto';
    }
  }, []);

  function handleMouseEnter() {
    setCursor(defaultCursor);
  }

  function handleMouseLeave() {
    setCursor();
  }

  const handleClick = useCallback(() => {
    if (phase !== 'follow') {
      setPhase('follow');
      setCursor(defaultCursor);
      return;
    }

    setCursor(activeCursor);
    setTimeout(() => { setCursor(defaultCursor); }, 150);
    setTimeout(() => { setCursor(); }, 150);

    direction.current = { dx: -moveSpeed, dy: moveSpeed };
    setPhase('bounce');
  }, [phase, defaultCursor, activeCursor, moveSpeed, setCursor]);

  useEffect(function trackMousePosition() {
    function updateMousePosition(event: MouseEvent) {
      lastMousePosition.current = { x: event.clientX, y: event.clientY };
    }
    window.addEventListener('mousemove', updateMousePosition);
    return function cleanup() {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(function followCursor() {
    if (phase !== 'follow') {
      return;
    }

    setPosition({
      x: lastMousePosition.current.x - activeSize / 2,
      y: lastMousePosition.current.y - activeSize / 2
    });

    function moveWithCursor(event: MouseEvent) {
      setPosition({
        x: event.clientX - activeSize / 2,
        y: event.clientY - activeSize / 2
      });
    }

    window.addEventListener('mousemove', moveWithCursor);
    return function cleanup() {
      window.removeEventListener('mousemove', moveWithCursor);
    };
  }, [phase, activeSize]);

  useEffect(function bounceLogic() {
    if (phase !== 'bounce') {
      return;
    }

    function clamp(value: number, min: number, max: number): number {
      return Math.min(Math.max(value, min), max);
    }

    setPosition(function(previousPosition) {
      return {
        x: clamp(previousPosition.x, 0, window.innerWidth - activeSize),
        y: clamp(previousPosition.y, 0, window.innerHeight - activeSize)
      };
    });

    function move() {
      const { innerWidth, innerHeight } = window;
      const { dx, dy } = direction.current;

      setPosition((previousPosition) => {
        let newX = previousPosition.x + dx;
        let newY = previousPosition.y + dy;

        if (newX <= 0) {
          newX = 0;
          direction.current.dx = Math.abs(dx);
        } else if (newX + activeSize >= innerWidth) {
          newX = innerWidth - activeSize;
          direction.current.dx = -Math.abs(dx);
        }

        if (newY <= 0) {
          newY = 0;
          direction.current.dy = Math.abs(dy);
        } else if (newY + activeSize >= innerHeight) {
          newY = innerHeight - activeSize;
          direction.current.dy = -Math.abs(dy);
        }

        const spinDirection = direction.current.dx >= 0 ? 1 : -1;
        setRotation((previousRotation) => previousRotation + spinSpeed * spinDirection);

        if (targetRef?.current && onCollision) {
          const targetRect = targetRef.current.getBoundingClientRect();
          const iconRect = {
            left: newX,
            top: newY,
            right: newX + activeSize,
            bottom: newY + activeSize
          };
          const collided =
            iconRect.right >= targetRect.left &&
            iconRect.left <= targetRect.right &&
            iconRect.bottom >= targetRect.top &&
            iconRect.top <= targetRect.bottom;

          if (collided) {
            if (!hasCollided.current) {
              onCollision();
              hasCollided.current = true;
            }
            if (previousPosition.x + activeSize <= targetRect.left || previousPosition.x >= targetRect.right) {
              direction.current.dx = -dx;
            }
            if (previousPosition.y + activeSize <= targetRect.top || previousPosition.y >= targetRect.bottom) {
              direction.current.dy = -dy;
            }
          } else {
            hasCollided.current = false;
          }
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(move);
    }

    animationFrameRef.current = requestAnimationFrame(move);
    return function cleanup() {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phase, activeSize, moveSpeed, spinSpeed, targetRef, onCollision]);

  useEffect(function spaceBarGrab() {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Space') {
        handleClick();
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, handleClick]);

  return (
    <Box
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        top: position.y,
        left: position.x,
      }}
      // Separate rapidly-changing properties (left/top) from mostly-static styles (sx) to avoid generating extra Emotion styles on each frame, improving performance
      sx={{
        borderRadius: '50%',
        width: defaultSize,
        height: defaultSize,
        userSelect: 'none',
        position: phase !== 'idle' ? 'fixed' : 'static',
        transform: phase !== 'idle' ? `scale(${activeSize / defaultSize})` : 'scale(1)',
        transformOrigin: 'top left',
        transition: 'transform 0.3s ease'
      }}
    >
      <Box
        component="img"
        src={src}
        alt={altText}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        // Separate rapidly-changing properties (left/top) from mostly-static styles (sx) to avoid generating extra Emotion styles on each frame, improving performance
        sx={{
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
          transition: 'transform 0.1s linear'
        }}
      />
    </Box>
  );
}
