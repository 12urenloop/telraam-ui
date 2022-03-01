import React, { FC, useContext, useEffect } from 'react';
import { addData, deleteData, fetchData, parseData, sortNumericId, updateData } from '../util';
import { STATION_PLACEHOLDER } from '../constant';
import { DataList } from './List';
import { StationContext } from '../context/stations.context';

export const Stations: FC = () => {
	const stationCtx = useContext(StationContext);
	const fetchBatons = async () => {
		// TODO: Rename to station when endpoint is changed
		let stations = await fetchData<Station[]>('beacon');
		stations = stations.sort(sortNumericId);
		stationCtx.setList(stations);
	};
	const addStation = async (values: Record<string, string>) => {
		await addData(`beacon`, parseData(values, STATION_PLACEHOLDER));
		await fetchBatons();
	};
	const deleteStation = async (id: number) => {
		await deleteData(`beacon/${id}`);
		await fetchBatons();
	};
	const updateStation = async (id: number, values: Record<string, string>) => {
		await updateData(`beacon/${id}`, parseData(values, STATION_PLACEHOLDER));
		await fetchBatons();
	};

	useEffect(() => {
		fetchBatons().then();
	}, []);

	return (
		<DataList
			title={'Stations'}
			data={stationCtx.list}
			placeholder={STATION_PLACEHOLDER}
			addEntry={addStation}
			deleteEntry={deleteStation}
			updateEntry={updateStation}
		/>
	);
};
