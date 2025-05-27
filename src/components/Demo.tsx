import { useViewportSize } from '../hooks/useViewportSize';

function Demo() {
	const { height, width } = useViewportSize();

	return (
		<>
			Width: {width}, height: {height}
		</>
	);
}

export default Demo;
