import React, { useContext, useRef, useState } from 'react';
import { ModalContext } from '../context/modal.context';
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useToast,
	TableCaption,
	WrapItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const ConfirmDialog = (props: DataListDialog) => {
	const cancelRef = useRef(null);
	return (
		<AlertDialog isOpen={props.isOpen} leastDestructiveRef={cancelRef} onClose={props.onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Delete ${props.title}
					</AlertDialogHeader>

					<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme='red' onClick={props.onConfirm} ml={3}>
							Delete
						</Button>
						<Button ref={cancelRef} onClick={props.onClose}>
							Cancel
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export const DataList = (props: DataListProps) => {
	const modalContext = useContext(ModalContext);
	const toast = useToast();
	const [awaitingDelete, setAwaitingDelete] = useState<number>(0);
	const openModalAdd = () => {
		const _inputs: ModalInput[] = [];
		Object.keys(props.placeholder).forEach(k => {
			const selectElem = props.selectElem?.find(e => e.key == k);
			let selectOpt: DataListSelectEntry[] | undefined = undefined;
			if (k == 'id') return;
			if (selectElem) {
				selectOpt = selectElem.getter();
			}
			_inputs.push({
				name: k,
				value: props.placeholder[k as keyof typeof props.placeholder],
				options: selectOpt,
			});
		});
		modalContext.setInfo({
			inputs: _inputs,
			title: `Add new ${props.title.replace(/s$/, '')}`,
			onSave: values => props.addEntry(values),
			onClose: () => null,
		});
		modalContext.onOpen();
	};
	const openModal = (id: number) => {
		const currentData = props.data.find(d => d.id == id);
		if (!currentData) {
			toast({
				title: "Couldn't find data",
				description: `Data for index: ${id} couldn't be found in the dataset`,
				status: 'error',
			});
			return;
		}
		const _inputs: ModalInput[] = [];
		Object.entries(currentData).forEach(([k, v]) => {
			const selectElem = props.selectElem?.find(e => e.key == k);
			let selectOpt: DataListSelectEntry[] | undefined = undefined;
			if (selectElem) {
				selectOpt = selectElem.getter();
			}
			_inputs.push({
				name: k,
				value: v,
				disabled: k == 'id',
				options: selectOpt,
			});
		});
		modalContext.setInfo({
			inputs: _inputs,
			title: `Edit ${props.title.replace(/s$/, '')}`,
			onSave: values => props.updateEntry(id, values),
			onClose: () => null,
		});
		modalContext.onOpen();
	};
	const deleteEntry = (id: number) => {
		setAwaitingDelete(id);
	};
	return (
		<WrapItem>
			<div className={'dataTable'}>
				<Text fontSize={'4xl'}>{props.title}</Text>
				<ConfirmDialog
					onConfirm={() => {
						props.deleteEntry(awaitingDelete);
						setAwaitingDelete(0);
					}}
					title={props.title}
					isOpen={awaitingDelete !== 0}
					onClose={() => setAwaitingDelete(0)}
				/>
				<Table variant={'simple'}>
					<Thead>
						<Tr>
							{Object.keys(props.placeholder).map(k => (
								<Th key={`${props.title}-header-${k}`}>{k}</Th>
							))}
							<Th>
								<Button colorScheme={'green'} onClick={openModalAdd}>
									Add
								</Button>
							</Th>
						</Tr>
					</Thead>
					{props.data[0] === undefined && <TableCaption>There was no data found</TableCaption>}
					<Tbody>
						{props.data.map((d, i) => (
							<Tr key={`${i}-${d.id}`}>
								{(Object.keys(d) as (keyof BaseEntry)[]).map(dataKey => (
									<Td key={`${props.title}-data-${dataKey}`}>{String(d[dataKey])}</Td>
								))}
								<Td>
									<Menu>
										<MenuButton as={Button} colorScheme={'teal'} rightIcon={<ChevronDownIcon />}>
											Edit
										</MenuButton>
										<MenuList>
											<MenuItem onClick={() => openModal(d.id)}>Edit</MenuItem>
											<MenuItem onClick={() => deleteEntry(d.id)}>Delete</MenuItem>
										</MenuList>
									</Menu>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
		</WrapItem>
	);
};
