import { useRef, useState, type PropsWithChildren } from 'react';

import { SidebarContext, type SidebarState, type SidebarWidth } from './SidebarContext';
import type { DeviceSize } from '../../hooks/useScreenSize';

type SidebarWidthMapperReturn = {
  opened: SidebarWidth;
  closed: SidebarWidth;
}

const sidebarWidthMapper: Record<DeviceSize, SidebarWidthMapperReturn> = {
  mobile: {
    opened: '100%',
    closed: 0,
  },
  tablet: {
    opened: 300,
    closed: 90,
  },
  desktop: {
    opened: 300,
    closed: 90,
  }
};

export function SidebarProvider({ children }: PropsWithChildren) {
  const [sidebarState, setSidebarState] = useState<SidebarState>('closed');
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sidebarAnimationDurationMs = 500;

  function clearPendingAnimationTimeout() {
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
      animationTimeout.current = null;
    }
  }

  function toggleSidebar() {
    clearPendingAnimationTimeout();

    if (sidebarState === 'closed' || sidebarState === 'closing') {
      setSidebarState('opening');
      animationTimeout.current = setTimeout(() => {
        setSidebarState('opened');
        animationTimeout.current = null;
      }, sidebarAnimationDurationMs);
    } else if (sidebarState === 'opened' || sidebarState === 'opening') {
      setSidebarState('closing');
      animationTimeout.current = setTimeout(() => {
        setSidebarState('closed');
        animationTimeout.current = null;
      }, sidebarAnimationDurationMs);
    }
  }

  function getSidebarWidth(deviceSize: DeviceSize) {
    const mapping = sidebarWidthMapper[deviceSize];
    if (sidebarState === 'opened' || sidebarState === 'opening') {
      return mapping.opened;
    } else if (sidebarState === 'closed' || sidebarState === 'closing') {
      return mapping.closed;
    }
    return 0;
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        toggleSidebar,
        getSidebarWidth,
        sidebarAnimationDurationMs,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
