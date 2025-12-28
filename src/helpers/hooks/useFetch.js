import { useEffect, useState } from "react"

export const useFetch = (fetchFunction, params) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const stringParams = params ? new URLSearchParams(params).toString() : "";

	const controller = new AbortController();

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true)
				// Разблокировать, чтобы запросы к API отправлялись
				const result = await fetchFunction(controller.signal, params)
				setData(result)
			} catch (error) {
				setError(error)
			} finally {
				setIsLoading(false)
			}
		})()

		return () => controller.abort();
	}, [fetchFunction, stringParams])

	return {data, isLoading, error}
}