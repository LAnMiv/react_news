import { forwardRef } from 'react';
import styles from './styles.module.css'

const Categories = forwardRef(({ categories, selectedCategory, setSelectedCategory }, ref) => {
	return (
		<div ref={ref} className={styles.categories}>
			<button
				onClick={() => setSelectedCategory(null)}
				className={!selectedCategory ? styles.active : styles.item}
			>
				All
			</button>

			{categories.map(category => (
				<button
					onClick={() => setSelectedCategory(category)}
					className={category === selectedCategory ? styles.active : styles.item}
					key={category}
				>
					{category}
				</button>
			))}
		</div>
	)
});

Categories.displayName = 'Categories'

export default Categories;
