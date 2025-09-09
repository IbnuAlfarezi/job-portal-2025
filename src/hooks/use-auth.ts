import { useAuthStore } from "@/store/auth-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API functions - replace with actual API calls
const mockLogin = async (email: string, password: string) => {
	// Simulate API call
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Mock user data
	return {
		id: "1",
		email,
		name: "John Doe",
		role: "job_seeker" as const,
		profile: {
			title: "Frontend Developer",
			location: "San Francisco, CA",
			experience: "3 years",
			skills: ["React", "TypeScript", "Next.js"],
			bio: "Passionate frontend developer with 3 years of experience",
		},
	};
};

const mockLogout = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return true;
};

export const useAuth = () => {
	const {
		user,
		isAuthenticated,
		isLoading,
		login,
		logout,
		updateUser,
		setLoading,
	} = useAuthStore();

	const loginMutation = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			mockLogin(email, password),
		onSuccess: (userData) => {
			login(userData);
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});

	const logoutMutation = useMutation({
		mutationFn: mockLogout,
		onSuccess: () => {
			logout();
		},
	});

	return {
		user,
		isAuthenticated,
		isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
		login: loginMutation.mutate,
		logout: logoutMutation.mutate,
		updateUser,
		loginError: loginMutation.error,
		logoutError: logoutMutation.error,
	};
};
