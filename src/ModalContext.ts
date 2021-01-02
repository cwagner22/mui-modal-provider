import { createContext, ComponentType } from 'react';

export type Props = {
  open?: Boolean;
  [key: string]: any;
};

export type StateElement = {
  component: ComponentType<any>;
  props?: Props;
};

export type State = {
  [id: string]: StateElement;
};

export type ModalComponent<P> = ComponentType<P>;
export type ModalComponentProps<P> = Omit<P, 'open'>;

export type MakeShowModalFn = <T extends Props>(
  id: string
) => <P extends T>(
  component: ModalComponent<P>,
  props?: ModalComponentProps<P>
) => {
  id: string;
  hide: () => void;
  destroy: () => void;
  update: (newProps: Partial<ModalComponentProps<P>>) => void;
};

export type UpdateModalFn = <P extends Props>(
  id: string,
  props: Partial<Omit<P, 'open'>>
) => void;
export type HideModalFn = (id: string) => void;
export type DestroyModalFn = (id: string) => void;
export type DestroyModalByRootIdFn = (rootId: string) => void;

type ModalContextState = {
  state: State;
  hideModal: HideModalFn;
  makeShowModal: MakeShowModalFn;
  destroyModal: DestroyModalFn;
  destroyModalsByRootId: DestroyModalByRootIdFn;
  updateModal: UpdateModalFn;
};

const ModalContext = createContext<ModalContextState>({
  state: {},
  hideModal: () => {},
  makeShowModal: () => () => ({
    id: 'id',
    hide: () => {},
    destroy: () => {},
    update: () => {},
  }),
  destroyModal: () => {},
  updateModal: () => {},
  destroyModalsByRootId: () => {},
});

export default ModalContext;
