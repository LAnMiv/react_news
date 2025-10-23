import { useState, useEffect } from "react"

export default function useLocalStorage (key="data-news", initialValue = []) {
	const [value, setValue] = useState(() => {
		try {
			const stored = localStorage.getItem(key)
			return stored !== null ? JSON.parse(stored) : initialValue
		} catch (error) {
			console.warn("Ошибка чтения localStorage:", error);
			return initialValue
		}
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}