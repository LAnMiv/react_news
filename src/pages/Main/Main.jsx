import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css'
import { getNews } from '../../api/apiNews';
import useLocalStorage from '../../hooks/useLocalStorage';
import NewsList from '../../components/NewsList/NewsList';

const Main = () => {
	const [news, setNews] = useLocalStorage('news-data', []);

	useEffect(() => {
		
		if (news.length > 0) {
      console.log('Используем кэшированные новости: ', news);
      return;
    }

		const controller = new AbortController();

		const fetchNews = async () => {
			try {
				const data = await getNews(controller.signal)
				if (data.status !== 'ok') throw new Error('Ошибка загрузки данных с сервера')
				const newsData = data.news;
				setNews(newsData)
			} catch (error) {
				if (error.name === 'CanceledError') return;
				console.error(error);
			}
		}

		// fetchNews()
		return () => controller.abort()
	}, [])

	return (
		<main className={styles.main}>
			{news.length > 0 ? <NewsBanner item={news[0]} /> : null}

			<NewsList news={news} />
		</main>
	)
};

export default Main;
