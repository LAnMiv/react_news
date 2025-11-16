const cacheLocalStorage = {
	getLocalStorage(key, defaultValue = null) {
		try {
			const stored = localStorage.getItem(key);
			return stored !== null ? JSON.parse(stored) : defaultValue;
		} catch (error) {
			console.warn(`Ошибка чтения localStorage [${key}]`, error);
			return defaultValue;
		}
	},
	setLocalStorage(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			`Ошибка записи localStorage [${key}]`
		}
	}
}

export default cacheLocalStorage;