import React, { useEffect, useContext } from 'react';
import { BatonContext } from '../context/batons.context';
import { Button, Menu, MenuButton, Table, Tbody, Td, Text, Th, Thead, Tr, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ModalContext } from '../context/modal.context';
import { addData, deleteData, fetchData, sortNumericId, updateData } from '../util';
import { BATON_PLACEHOLDER } from '../constant';

export const Batons = () => {
	const batonContext = useContext(BatonContext);
	const modalContext = useContext(ModalContext);
	const fetchBatons = async () => {
		const batons = await fetchData<Baton[]>('baton');
		batons.sort(sortNumericId);
		batonContext.setList(batons);
	};
	const openBatonModal = (batonId: number) => {
		const selectedBaton = batonContext.list.find(b => b.id === batonId);
		if (!selectedBaton) return;
		const _inputs: ModalInput[] = Object.entries(selectedBaton).map(([key, value]) => {
			const input: ModalInput = {
				name: key,
				value,
			};
			if (key == 'id') {
				input.disabled = true;
			}
			return input;
		});
		modalContext.setInfo({
			inputs: _inputs,
			title: 'Edit Baton',
			onClose: _ => fetchBatons(),
			onSave: async values => {
				await updateData(`baton/${batonId}`, values);
				await fetchBatons();
			},
		});
		modalContext.onOpen();
	};
	const deleteBaton = async (id: number) => {
		await deleteData(`baton/${id}`);
		await fetchBatons();
	};
	const openAddBatonModal = () => {
		const _inputs: ModalInput[] = Object.entries(BATON_PLACEHOLDER).map(([key, value]) => ({
			value,
			name: key,
		}));
		modalContext.setInfo({
			inputs: _inputs,
			title: 'Add Baton',
			onClose: _ => fetchBatons(),
			onSave: async values => {
				delete values.id;
				await addData(`baton`, values);
				await fetchBatons();
			},
		});
		modalContext.onOpen();
	};
	useEffect(() => {
		fetchBatons().then();
	}, []);
	return (
		<div className={'dataTable'}>
			<Text fontSize={'4xl'}>Batons</Text>
			<Table variant='simple'>
				<Thead>
					<Tr>
						<Th>Id</Th>
						<Th>Naam</Th>
						<Th>
							<Button colorScheme={'green'} onClick={openAddBatonModal}>
								Add
							</Button>
						</Th>
					</Tr>
				</Thead>
				{(batonContext?.list ?? []).map(b => (
					<Tbody key={b.id}>
						<Tr>
							<Td>{b.id}</Td>
							<Td>{b.name}</Td>
							<Td>
								<Menu>
									<MenuButton as={Button} colorScheme={'teal'} rightIcon={<ChevronDownIcon />}>
										Edit
									</MenuButton>
									<MenuList>
										<MenuItem onClick={() => openBatonModal(b.id)}>Edit</MenuItem>
										<MenuItem onClick={() => deleteBaton(b.id)}>Delete</MenuItem>
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
