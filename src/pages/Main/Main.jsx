import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css'
import { getNews } from '../../api/apiNews';
import useLocalStorage from '../../hooks/useLocalStorage';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';

const Main = () => {
	const [news, setNews] = useLocalStorage('news-data', []);
	// const [news, setNews] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {

		if (news.length > 0) {
			console.log('Используем кэшированные новости: ', news);
			return;
		}

		const controller = new AbortController();

		const fetchNews = async () => {
			try {
				setIsLoading(true)
				const data = await getNews(controller.signal)
				if (data.status !== 'ok') throw new Error('Ошибка загрузки данных с сервера')
				const newsData = data.news;
				setNews(newsData)
				console.log(news);
			} catch (error) {
				if (error.name === 'CanceledError') return;
				console.error(error);
			} finally {
				setIsLoading(false)
			}
		}

		// fetchNews()
		return () => controller.abort()
	}, [])

	return (
		<main className={styles.main}>
			{news.length > 0 && !isLoading ? (
				<NewsBanner item={news[10]} />
			) : (
				<Skeleton type={'banner'} count={1} />
			)}

			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton type={'item'} count={10} />
			)}
			
		</main>
	)
};

export default Main;
