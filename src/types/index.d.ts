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

type ModalTypes = 'baton' | 'team' | 'none'

interface ModalContextProps {
  isOpen: boolean;
  /**
   * Identifier of data we are editing in modal (Baton/Team)
   */
  id: number;
  setOpen: (isOpen: boolean) => void;
  setId: (id: number) => void;
  type: ModalTypes,
  setType: (type: ModalTypes) => void;
}

