// region Data types
interface BaseEntry {
	id: number;
	name: string;
}

interface Team extends BaseEntry {
	batonId: number;
}

interface basicContext<T> {
	list: T[];
	setList: (list: T[]) => void;
}

type BatonContextProps = basicContext<Baton>;

type TeamContextProps = basicContext<Team>;
// endregion

// region Component Types
interface DataListProps {
	title: string;
	data: BaseEntry[];
	selectElem?: {
		key: string;
		getter: () => DataListSelectEntry[];
	}[];
	placeholder: Object;
	addEntry: (values: Record<string, string>) => void;
	deleteEntry: (id: number) => void;
	updateEntry: (id: number, values: Record<string, string>) => void;
}

interface DataListSelectEntry {
	value: string;
	name: string;
}

interface DataListDialog {
	onConfirm: () => void;
	title: string;
	isOpen: boolean;
	onClose: () => void;
}

// region Modal
interface ModalInput {
	name: string;
	value: string;
	disabled?: boolean;
	options?: {
		value: string;
		name: string;
	}[];
}

interface ModalInfo {
	title: string;
	onSave: (values: Record<string, string>) => void;
	inputs: ModalInput[];
	onClose: (didSave: boolean) => void;
}

interface ModalContextProps {
	isOpen: boolean;
	/**
	 * Opens the modal on call
	 */
	onOpen: () => void;
	/**
	 * Closes the modal on call
	 */
	onClose: () => void;
	info: ModalInfo;
	setInfo: (info: Partial<ModalInfo>) => void;
}
// endregion
// endregion
