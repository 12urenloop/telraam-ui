import React, { ChangeEvent, FC, useContext } from 'react';
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
	Switch,
	useToast,
} from '@chakra-ui/react';
import { ModalContext } from '../context/modal.context';

const InputWrap: FC<{
	name: string;
	value: number | string | boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, ...props }) => {
	if (typeof value === 'boolean') {
		return <Switch {...props} isChecked={value} />;
	}
	return <Input {...props} placeholder={props.name} value={value} />;
};

export const EditModal = () => {
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const toast = useToast();
	const { onClose, isOpen, info, setInfo } = useContext(ModalContext);
	const updateValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		const inputInfo = info.inputs.find(i => i.name === e.target.name);
		if (!inputInfo) {
			toast({
				title: 'Modal Input Error',
				description: 'The edited input field was not found in the given fields, try reloading the page',
				status: 'warning',
			});
			return;
		}
		inputInfo.value = e.target.type === 'checkbox' ? (e.target as any).checked : e.target.value;
		const _inputs: ModalInput[] = [...info.inputs];
		_inputs[_inputs.findIndex(i => i.name === e.target.name)] = inputInfo;
		setInfo({ inputs: _inputs });
	};
	const pushUpdate = async () => {
		const values: Record<string, any> = {};
		info.inputs.forEach(i => {
			values[i.name] = i.value;
		});
		info.onSave(values);
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
								<Select placeholder={`Select ${i.name}`} name={i.name} value={String(i.value)} onChange={updateValue}>
									{i.options.map(io => (
										<option value={io.value}>{io.name}</option>
									))}
								</Select>
							) : (
								<InputWrap name={i.name} value={i.value} onChange={updateValue} />
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
