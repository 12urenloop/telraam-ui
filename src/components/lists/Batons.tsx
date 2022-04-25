import React, { useContext, useEffect } from 'react';
import { BatonContext } from '../../context/batons.context';
import { addData, deleteData, parseData, updateData } from '../../util';
import { DataList } from '../List';
import { BATON_PLACEHOLDER } from '../../constant';
import { useFetchData } from '../../hooks/useFetchData';

export const Batons = () => {
	const batonContext = useContext(BatonContext);
	const fetcher = useFetchData('batons');
	const fetchBatons = async () => {
		const batons = await fetcher.fetch<Baton[]>('baton', true);
		batonContext.setList(batons);
	};
	const addBaton = async (values: Record<string, string>) => {
		await addData(`baton`, parseData(values, BATON_PLACEHOLDER));
		await fetchBatons();
	};
	const deleteBaton = async (id: number) => {
		await deleteData(`baton/${id}`);
		await fetchBatons();
	};
	const updateBaton = async (id: number, values: Record<string, string>) => {
		await updateData(`baton/${id}`, parseData(values, BATON_PLACEHOLDER));
		await fetchBatons();
	};

	useEffect(() => {
		fetchBatons();
		const interval = setInterval(() => fetchBatons(), Number(import.meta.env.VITE_FETCH_INTERVAL));
		return () => clearInterval(interval);
	}, []);

	return (
		<DataList
			title={'Batons'}
			data={batonContext.list}
			placeholder={BATON_PLACEHOLDER}
			addEntry={addBaton}
			deleteEntry={deleteBaton}
			updateEntry={updateBaton}
		/>
	);
};
