import NewsImage from '../NewsImage/NewsImage';
import formatTimeAgo from '../../helpers/FormatTimeAgo';
import styles from './styles.module.css'

const NewsBanner = ({item}) => {
	return (
		<div className={styles.banner}>
			<NewsImage image={item?.image} />
			<h3 className={styles.title}>{item?.title}</h3>
			<p className={styles.extra}>{formatTimeAgo(item?.published)} by {item?.author}</p>
		</div>
	)
};

export default NewsBanner;
