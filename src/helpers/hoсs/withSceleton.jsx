import Skeleton from "../../components/Skeleton/Skeleton";

function withSceleton (Component, type, count) {
	return function WithSceleton(props) {
		const {isLoading, ...restProps} = props;
		if (isLoading) {
			return <Skeleton type={type} count={count} />
		}

		return <Component {...restProps} />
	}
}

export default withSceleton;