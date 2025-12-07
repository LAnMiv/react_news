import withSceleton from '../../helpers/hoсs/withSceleton';
import NewsItem from '../NewsItem/NewsItem'
import styles from './styles.module.css'

const NewsList = ({ news }) => {
	return news ? (
		<div className={styles.list}>
			{news.map(item => (
				<NewsItem key={item.id} item={item}/>
			))}
		</div>
	) : null
};

const NewsListWithSceleton = withSceleton(NewsList, 'item', 10);

export default NewsListWithSceleton;
