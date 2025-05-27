import { useState } from 'react';
import { useWindowEvent } from '../core/helpers/useWindowEvent';

type WindowSize = { width: number; height: number };

export function useViewportSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const handleResize = () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	};

	useWindowEvent('resize', handleResize, false);

	return windowSize;
}
