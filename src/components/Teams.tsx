import React, { useContext, useEffect } from 'react';
import { TeamContext } from '../context/teams.context';
import { Button, Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { ModalContext } from '../context/modal.context';
import { addData, deleteData, fetchData, sortNumericId, updateData } from '../util';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BatonContext } from '../context/batons.context';
import { TEAM_PLACEHOLDER } from '../constant';

export const Teams = () => {
	const teamContext = useContext(TeamContext);
	const modalContext = useContext(ModalContext);
	const batonContext = useContext(BatonContext);
	const fetchTeams = async () => {
		const rawResult: Response = await fetch('http://localhost:8080/team', {
			method: 'GET',
			redirect: 'follow',
		});
		if (!rawResult.ok) {
			//Show error or something
		}
		const teams = await fetchData<Team[]>('team');
		teams.sort(sortNumericId);
		teamContext.setList(teams);
	};
	const openTeamModal = (id: number) => {
		const selectedTeal = teamContext.list.find(b => b.id === id);
		if (!selectedTeal) return;
		const _inputs: ModalInput[] = Object.entries(selectedTeal).map(([key, value]) => {
			const input: ModalInput = {
				name: key,
				value: value ?? '',
			};
			if (key == 'id') {
				input.disabled = true;
			}
			if (key == 'batonId') {
				input.options = batonContext.list.map(b => ({
					value: String(b.id),
					name: b.name,
				}));
			}
			return input;
		});
		modalContext.setInfo({
			inputs: _inputs,
			title: 'Edit Team',
			onClose: _ => fetchTeams(),
			onSave: async values => {
				delete values.id;
				await updateData(`team/${id}`, values);
				await fetchTeams();
			},
		});
		modalContext.onOpen();
	};
	const deleteTeam = async (id: number) => {
		await deleteData(`team/${id}`);
		await fetchTeams();
	};
	const openAddTeamModal = () => {
		// Implement select for batonid
		const _inputs: ModalInput[] = Object.entries(TEAM_PLACEHOLDER).map(([key, value]) => ({
			name: key,
			value,
		}));
		modalContext.setInfo({
			inputs: _inputs,
			title: 'Add Team',
			onClose: _ => fetchTeams(),
			onSave: async values => {
				await addData(`team`, values);
				await fetchTeams();
			},
		});
		modalContext.onOpen();
	};
	useEffect(() => {
		fetchTeams().then();
	}, []);
	return (
		<div className={'dataTable'}>
			<Text fontSize={'4xl'}>Teams</Text>
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th>Id</Th>
						<Th>Naam</Th>
						<Th>BatonId</Th>
						<Th>
							<Button colorScheme={'green'} onClick={openAddTeamModal}>
								Add
							</Button>
						</Th>
					</Tr>
				</Thead>
				{(teamContext?.list ?? []).map(t => (
					<Tbody key={t.id}>
						<Tr>
							<Td>{t.id}</Td>
							<Td>{t.name}</Td>
							<Td>{t.batonId ?? 'Unassigned'}</Td>
							<Td>
								<Menu>
									<MenuButton as={Button} colorScheme={'teal'} rightIcon={<ChevronDownIcon />}>
										Edit
									</MenuButton>
									<MenuList>
										<MenuItem onClick={() => openTeamModal(t.id)}>Edit</MenuItem>
										<MenuItem onClick={() => deleteTeam(t.id)}>Delete</MenuItem>
									</MenuList>
								</Menu>
							</Td>
						</Tr>
					</Tbody>
				))}
			</Table>
		</div>
	);
};
