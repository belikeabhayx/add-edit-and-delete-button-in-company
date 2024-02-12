import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StoreState = {
	isCustomerFormOpen: boolean;
	isProductFormOpen: boolean;
	setCustomerForm: () => void;
	setProductForm: () => void;
};

const useStore = create<StoreState>()(
	devtools((set) => ({
		isCustomerFormOpen: false,
		isProductFormOpen: false,
		setCustomerForm: () =>
			set((state) => ({
				...state,
				isCustomerFormOpen: !state.isCustomerFormOpen,
			})),
		setProductForm: () =>
			set((state) => ({
				...state,
				isProductFormOpen: !state.isProductFormOpen,
			})),
	}))
);

export default useStore;
