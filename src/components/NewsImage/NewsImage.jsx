import styles from './styles.module.css'

const NewsImage = ({image}) => {
	return (
		<div className={styles.wrapper}>
			{image ? <img src={image} alt='news' className={styles.image} /> : null}
		</div>
	)
};

export default NewsImage;
