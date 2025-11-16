import { useState, useEffect } from "react";
import cacheLocalStorage from "../helpers/cacheLocalStorage";

export default function useLocalStorage(key, initialValue = []) {
	const [value, setValue] = useState(() =>
		cacheLocalStorage.getLocalStorage(key, initialValue)
	);

	useEffect(() => {
		setValue(cacheLocalStorage.getLocalStorage(key, initialValue));
	}, [key]);

	useEffect(() => {
		cacheLocalStorage.setLocalStorage(key, value);
	}, [key, value]);

	return [value, setValue];
}
