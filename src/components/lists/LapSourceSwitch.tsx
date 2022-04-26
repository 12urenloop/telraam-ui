import React, { useContext, useEffect, useState } from 'react';
import { addData, deleteData, parseData, updateData } from '../../util';
import { DataList } from '../List';
import { SWITCHOVER_PLACEHOLDER } from '../../constant';
import { useFetchData } from '../../hooks/useFetchData';
import { SwitchContext } from '../../context/lapswitch.context';

export const LapSourceSwitch = () => {
	const switchContext = useContext(SwitchContext);
	const fetcher = useFetchData('lapsourceswitchover');

	const [sources, setSources] = useState<DataListSelectEntry[]>([]);

	const fetchSwitches = async () => {
		const switches = await fetcher.fetch<SwitchOver[]>('lapsourceswitchover', true);
		switchContext.setList(switches);
	};

	const fetchSources = async () => {
		const sources = await fetcher.fetch<BaseEntry[]>('lap-source', true);
		setSources(
			sources.map<DataListSelectEntry>(entry => ({
				name: entry.name,
				value: String(entry.id),
			}))
		);
	};

	const addSwitch = async (values: Record<string, string>) => {
		values.timestamp = String(Date.now());
		await addData(`lapsourceswitchover`, parseData(values, SWITCHOVER_PLACEHOLDER));
		await fetchSwitches();
	};
	const deleteSwitch = async (id: number) => {
		await deleteData(`lapsourceswitchover/${id}`);
		await fetchSwitches();
	};
	const updateSwitch = async (id: number, values: Record<string, string>) => {
		await updateData(`lapsourceswitchover/${id}`, parseData(values, SWITCHOVER_PLACEHOLDER));
		await fetchSwitches();
	};

	useEffect(() => {
		fetchSwitches();
		fetchSources();
		const interval = setInterval(() => fetchSwitches(), Number(import.meta.env.VITE_FETCH_INTERVAL));
		return () => clearInterval(interval);
	}, []);

	return (
		<DataList
			title={'LapSourceSwitchOver'}
			selectElem={[
				{
					key: 'newLapSource',
					getter: () => sources,
				},
			]}
			data={switchContext.list}
			placeholder={SWITCHOVER_PLACEHOLDER}
			addEntry={addSwitch}
			deleteEntry={deleteSwitch}
			updateEntry={updateSwitch}
		/>
	);
};
