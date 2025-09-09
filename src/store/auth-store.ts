import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
	id: string;
	email: string;
	name: string;
	avatar?: string;
	role: "job_seeker" | "employer" | "admin";
	profile?: {
		title?: string;
		location?: string;
		experience?: string;
		skills?: string[];
		bio?: string;
	};
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (user: User) => void;
	logout: () => void;
	updateUser: (updates: Partial<User>) => void;
	setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			login: (user) => set({ user, isAuthenticated: true }),
			logout: () => set({ user: null, isAuthenticated: false }),
			updateUser: (updates) =>
				set((state) => ({
					user: state.user ? { ...state.user, ...updates } : null,
				})),
			setLoading: (loading) => set({ isLoading: loading }),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
