import { getCategories } from "../../api/apiNews";
import { useFetch } from "../../helpers/hooks/useFetch";
import Search from '../Search/Search';
import Categories from '../Categories/Categories';
import styles from './styles.module.css'

const NewsFilters = ({filters, changeFilter}) => {
	const { data: dataCategories } = useFetch(getCategories);

	return (
		<div className={styles.filters}>
			{dataCategories ? (
				<Categories
					categories={dataCategories.categories}
					selectedCategory={filters.category}
					setSelectedCategory={(category) => changeFilter('category', category)}
				/>) : null
			}

			<Search
				keywords={filters.keywords}
				setKeywords={(keywords) => changeFilter('keywords', keywords)}
			/>
		</div>
	)
};

export default NewsFilters;
