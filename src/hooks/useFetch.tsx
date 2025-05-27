import { useEffect, useRef, useState } from 'react';

type ResponseData = { id: string; title: string };
type RefetchFunction = {
	params: {
		_limit: number;
	};
};

function useFetch(link: string) {
	const [data, setData] = useState<ResponseData[]>();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const currentAttempt = useRef<number>(0);

	const fetchData = async () => {
		try {
			const response: Response = await fetch(link);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const responseData = await response.json();
			setData(responseData);
			setError(null);
		} catch (error) {
			//@ts-ignore
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const refetch = async (limit: RefetchFunction) => {
		if (currentAttempt.current < limit.params._limit) {
			currentAttempt.current += 1;
			await fetchData();
			if (error) {
				refetch(limit);
			}
		} else {
			currentAttempt.current = 0;
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		data,
		isLoading,
		error,
		refetch,
	};
}

export default useFetch;
