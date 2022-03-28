import React, { FC, useContext, useEffect } from 'react';
import { addData, deleteData, parseData, sortNumericId, updateData } from '../../util';
import { STATION_PLACEHOLDER } from '../../constant';
import { DataList } from '../List';
import { StationContext } from '../../context/stations.context';
import { useFetchData } from '../../hooks/useFetchData';

export const Stations: FC = () => {
	const stationCtx = useContext(StationContext);
	const fetcher = useFetchData('stations');
	const fetchStations = async () => {
		let stations = await fetcher.fetch<Station[]>('stations', true);
		stations = stations.sort(sortNumericId);
		stationCtx.setList(stations);
	};
	const addStation = async (values: Record<string, string>) => {
		await addData(`station`, parseData(values, STATION_PLACEHOLDER));
		await fetchStations();
	};
	const deleteStation = async (id: number) => {
		await deleteData(`station/${id}`);
		await fetchStations();
	};
	const updateStation = async (id: number, values: Record<string, string>) => {
		await updateData(`station/${id}`, parseData(values, STATION_PLACEHOLDER));
		await fetchStations();
	};

	useEffect(() => {
		fetchStations().then();
		const interval = setInterval(() => fetchStations(), 1000);
		return () => clearInterval(interval);
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
