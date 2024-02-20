import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StoreState = {
	isCustomerFormOpen: boolean;
	isProductFormOpen: boolean;
	isInvoiceFormOpen: boolean;
	isOrderFormOpen: boolean;
	setCustomerForm: () => void;
	setProductForm: () => void;
	setInvoiceForm: () => void;
	setOrderForm: () => void;
};

const useStore = create<StoreState>()(
	devtools((set) => ({
		isCustomerFormOpen: false,
		isProductFormOpen: false,
		isInvoiceFormOpen: false,
		isOrderFormOpen: false,
		setOrderForm: () =>
			set((state) => ({
				...state,
				isOrderFormOpen: !state.isOrderFormOpen,
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
