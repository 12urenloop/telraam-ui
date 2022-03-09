// region Data types
interface BaseEntry {
	id: number;
	name: string;
}

interface Baton extends BaseEntry {
	mac: string;
}

interface Team extends BaseEntry {
	batonId: number;
}

interface Station extends BaseEntry {
	isBroken: boolean;
	url: string;
}

interface basicContext<T> {
	list: T[];
	setList: (list: T[]) => void;
}

type BaseEntryContextProps = basicContext<BaseEntry>;

type TeamContextProps = basicContext<Team>;
type StationContextProps = basicContext<Station>;

type BaseEntrySortFunc = (a: BaseEntry, b: BaseEntry) => number;
// endregion

// region Component Types
interface DataListProps {
	title: string;
	data: BaseEntry[];
	selectElem?: {
		key: string;
		getter: () => DataListSelectEntry[];
	}[];
	placeholder: Record<string, any>;
	addEntry: (values: Record<string, string>) => void;
	deleteEntry: (id: number) => void;
	updateEntry: (id: number, values: Record<string, string>) => void;
}

interface DataListSelectEntry {
	value: string | boolean;
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
	value: string | boolean;
	disabled?: boolean;
	options?: DataListSelectEntry[];
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

// region General Context
type ModuleType = 'teams' | 'stations' | 'batons';

interface GeneralContext {
	enabledModules: Record<ModuleType, boolean>;
	toggleModule: (module: ModuleType) => void;
}

// endregion
