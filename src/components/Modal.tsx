import React, { ChangeEvent, useContext } from 'react';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
} from '@chakra-ui/react';
import { ModalContext } from '../context/modal.context';

export const EditModal = () => {
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const { onClose, isOpen, info, setInfo } = useContext(ModalContext);
	const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
		const inputInfo = info.inputs.find(i => i.name === e.target.name);
		if (!inputInfo) {
			// TODO add some error msg or so
			return;
		}
		inputInfo.value = e.target.value;
		const _inputs: ModalInput[] = [...info.inputs.filter(i => i.name !== e.target.name), inputInfo];
		setInfo({ inputs: _inputs });
	};
	const pushUpdate = async () => {
		const body: Record<string, string> = {};
		info.inputs.forEach(i => {
			body[i.name] = i.value;
		});
		const rawResult: Response = await fetch(info.saveEndpoint, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const data = await rawResult.json();
		info.onClose(data);
		onClose();
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			blockScrollOnMount
			isCentered
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			motionPreset={'scale'}
			scrollBehavior={'inside'}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{info.title}</ModalHeader>
				<ModalBody>
					{(info.inputs ?? []).map(i => (
						<FormControl key={i.name}>
							<FormLabel>{i.name.charAt(0).toUpperCase() + i.name.substr(1)}</FormLabel>
							{i.options ? (
								<Select placeholder='Select batonId' name={i.name} value={i.value} onChange={updateValue}>
									{i.options.map(io => (
										<option value={io.value}>{io.name}</option>
									))}
								</Select>
							) : (
								<Input
									placeholder={i.name}
									name={i.name}
									value={i.value}
									disabled={i.disabled}
									onChange={updateValue}
								/>
							)}
						</FormControl>
					))}
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='teal' mr={3} onClick={pushUpdate}>
						Save
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
