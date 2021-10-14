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
		inputs: [],
		saveEndpoint: '',
		title: '',
	},
	setInfo() {
		return;
	},
});

export const ModalProvider: React.FC = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [info, setInfoState] = useState<ModalInfo>({
		inputs: [],
		onClose() {
			return;
		},
		saveEndpoint: '',
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
