import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StoreState = {
	isCustomerFormOpen: boolean;
	isProductFormOpen: boolean;
	isInvoiceFormOpen: boolean;
	isFinalFormOpen: boolean;
	setCustomerForm: () => void;
	setProductForm: () => void;
	setInvoiceForm: () => void;
	setFinalForm: () => void;
};

const useStore = create<StoreState>()(
	devtools((set) => ({
		isCustomerFormOpen: false,
		isProductFormOpen: false,
		isInvoiceFormOpen: false,
		isFinalFormOpen: false,
		setFinalForm: () =>
			set((state) => ({
				...state,
				isFinalFormOpen: !state.isFinalFormOpen,
			})),
		setInvoiceForm: () =>
			set((state) => ({
				...state,
				isInvoiceFormOpen: !state.isInvoiceFormOpen,
			})),
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
