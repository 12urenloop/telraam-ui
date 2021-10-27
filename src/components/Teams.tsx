import React, { useContext, useEffect } from 'react';
import { DataList } from './List';
import { addData, deleteData, fetchData, parseData, sortNumericId, updateData } from '../util';
import { TEAM_PLACEHOLDER } from '../constant';
import { BatonContext } from '../context/batons.context';
import { TeamContext } from '../context/teams.context';

export const Teams = () => {
	const teamsContext = useContext(TeamContext);
	const batonContext = useContext(BatonContext);
	const fetchTeams = async () => {
		const teams = await fetchData<Team[]>('team');
		teams.sort(sortNumericId);
		teamsContext.setList(teams);
	};
	const getBatons = () => {
		return batonContext.list.map(b => ({
			name: b.name,
			value: String(b.id),
		}));
	};
	const addTeam = async (values: Record<string, string>) => {
		await addData(`team`, parseData(values, TEAM_PLACEHOLDER));
		await fetchTeams();
	};
	const deleteTeam = async (id: number) => {
		await deleteData(`team/${id}`);
		await fetchTeams();
	};
	const updateTeam = async (id: number, values: Record<string, string>) => {
		await updateData(`team/${id}`, parseData(values, TEAM_PLACEHOLDER));
		await fetchTeams();
	};
	useEffect(() => {
		fetchTeams().then();
	}, []);
	return (
		<DataList
			title={'Teams'}
			data={teamsContext.list}
			selectElem={[
				{
					key: 'batonId',
					getter: getBatons,
				},
			]}
			placeholder={TEAM_PLACEHOLDER}
			addEntry={addTeam}
			deleteEntry={deleteTeam}
			updateEntry={updateTeam}
		/>
	);
};
