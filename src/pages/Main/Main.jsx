import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css'
import { getNews } from '../../api/apiNews';
import useLocalStorage from '../../hooks/useLocalStorage';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {
	const [currentPage, setCurrentPage] = useState(3);
	const [news, setNews] = useLocalStorage(`news-data-page-${currentPage}`, []);
	// const [news, setNews] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const totalPages = 10;
	const pageSize = 10;

	const controller = new AbortController();

	const fetchNews = async (currentPage) => {
		try {
			setIsLoading(true)
			const data = await getNews(controller.signal, currentPage, pageSize)
			if (data.status !== 'ok') throw new Error('Ошибка загрузки данных с сервера')
			const newsData = data.news;
			setNews(newsData)
			console.log('Используем эндпоинт API: ', news);
		} catch (error) {
			if (error.name === 'CanceledError') return;
			console.error(error);
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {

		if (news.length > 0) {
			console.log(`Используем кэшированные новости. Страница ${currentPage}: `, news);
			return;
		}

		// fetchNews(currentPage)
		return () => controller.abort()
	}, [currentPage])

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	return (
		<main className={styles.main}>
			{news.length > 0 && !isLoading ? (
				<NewsBanner item={news[0]} />
			) : (
				<Skeleton type={'banner'} count={1} />
			)}

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
			/>

			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton type={'item'} count={10} />
			)}

			<Pagination
				totalPages={totalPages}
				currentPage={currentPage}
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
			/>

		</main>
	)
};

export default Main;
