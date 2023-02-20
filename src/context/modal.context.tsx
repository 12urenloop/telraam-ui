import React, { createContext, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export const ModalContext = createContext<ModalContextProps>({
	isOpen: false,
	onOpen() {
		return;
	},
	onClose() {
		return;
	},
	info: {
		onClose() {
			return;
		},
		onSave() {
			return;
		},
		inputs: [],
		title: '',
	},
	setInfo() {
		return;
	},
});

export const ModalProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [info, setInfoState] = useState<ModalInfo>({
		inputs: [],
		onClose() {
			return;
		},
		onSave() {
			return;
		},
		title: '',
	});
	const setInfo = (newInfo: Partial<ModalInfo>) => {
		setInfoState({ ...info, ...newInfo });
	};
	return (
		<ModalContext.Provider
			value={{
				isOpen,
				onOpen,
				onClose,
				info,
				setInfo,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
