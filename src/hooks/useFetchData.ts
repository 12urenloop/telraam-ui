import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { fetchData, sortNumericId } from '../util';

export const useFetchData = (module: ModuleType) => {
	const toast = useToast();
	const [isFetching, setIsFetching] = useState(false);
	const [hasErrored, setHasErrored] = useState(false);

	/**
	 * Custom hook to fetch data from the API
	 * @param url The part after the telraam endpoint minus the first / (e.g. baton/1)
	 * @param shouldSort Whether to sort the data by id, its also possible to pass a custom sort function
	 */
	const fetch = useCallback(
		async <T extends any[] = BaseEntry[]>(url: string, shouldSort: BaseEntrySortFunc | boolean = false): Promise<T> => {
			if (isFetching && !hasErrored) {
				toast({
					title: `Couldn't fetch ${module}`,
					description: `A previous request is still busy, this request will be skipped`,
					status: 'warning',
				});
				setHasErrored(true);
			}
			setIsFetching(true);
			setHasErrored(false);
			try {
				const data = await fetchData<T>(url);
				if (shouldSort && Array.isArray(data)) {
					if (typeof shouldSort === 'function') {
						data.sort(shouldSort);
					} else {
						data.sort(sortNumericId);
					}
				}
				return data;
			} catch (e) {
				console.error(e);
				toast({
					title: 'An fetch(GET) error occurred',
					description: `${(e as Error)?.message ?? 'Unknown error'}, check the console for more info`,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				return [] as unknown as T;
			} finally {
				setIsFetching(false);
			}
		},
		[]
	);
	return {
		fetch,
	};
};
