import { Company } from "@product-checkout-assigment/product-lib";
import create from "zustand";

export interface CompanyState {
    company: Company | null,
    setCompany: (newCompany: Company | null) => void
}

export const usecompanyState = create<CompanyState>((set, get) => ({
    company: null,
    setCompany: (newCompany = null) => set({ company: newCompany })
}))