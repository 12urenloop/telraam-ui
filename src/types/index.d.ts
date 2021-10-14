interface Baton {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
  batonId: number;
}

interface basicContext<T>{
  list: T[],
  setList: (list: T[]) => void;
}

type BatonContextProps = basicContext<Baton>

type TeamContextProps = basicContext<Team>

interface ModalInput {
  name: string;
  value: string;
  disabled?: boolean;
  options?: {
    value: string,
    name: string,
  }[];
}

interface ModalInfo {
  title: string;
  saveEndpoint: string;
  inputs: ModalInput[]
  onClose: (didSave: boolean) => void;
}

interface ModalContextProps{
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
  setInfo: (info:Partial<ModalInfo>) => void;
}
