import { useEffect, useState } from 'react';
type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
	LocalStorageReturnValue,
	{
		setItem: (value: LocalStorageSetValue) => void;
		removeItem: () => void;
	}
];

const useLocalStorage: UseLocalStorage = (key: string) => {
	const [value, setValue] = useState<LocalStorageReturnValue>(() => {
		// Инициализация состояния из localStorage
		const storedValue = localStorage.getItem(key);
		return storedValue !== null ? storedValue : null;
	});

	const setItem = (newValue: LocalStorageSetValue): void => {
		localStorage.setItem(key, newValue);
		setValue(newValue);
	};

	const removeItem = (): void => {
		localStorage.removeItem(key);
		setValue(null);
	};

	useEffect(() => {
		// Слушаем изменения key и обновляем состояние
		const storedValue = localStorage.getItem(key);
		if (storedValue !== null) {
			setValue(storedValue);
		} else {
			setValue(null);
		}
	}, [key]);

	// Возвращаем кортеж в нужном формате
	return [value, { setItem, removeItem }];
};

export default useLocalStorage;
