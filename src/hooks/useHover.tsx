import { useEffect, useRef, useState } from 'react';

function useHover<T extends HTMLElement>() {
	const [hovered, setHovered] = useState<boolean>(false);
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const handleMouseEnter = () => setHovered(true);
		const handleMouseLeave = () => setHovered(false);

		element.addEventListener('mouseenter', handleMouseEnter);
		element.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			element.removeEventListener('mouseenter', handleMouseEnter);
			element.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return { hovered, ref };
}
export default useHover;
