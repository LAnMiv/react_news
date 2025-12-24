import styles from './styles.module.css'
import withSceleton from '../../helpers/hoсs/withSceleton';
import NewsBanner from '../NewsBanner/NewsBanner';

const BannersList = ({banners}) => {
	return (
		<ul className={styles.banners}>
			{banners && banners.map(banner => (
				<NewsBanner key={banner.id} item={banner} />
			))}
		</ul>
	)
};

const BannersListWithSceleton = withSceleton(BannersList, 'banner', 10, 'row')

export default BannersListWithSceleton;
