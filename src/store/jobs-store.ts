import { create } from "zustand";

export interface Job {
	id: string;
	title: string;
	company: {
		id: string;
		name: string;
		logo?: string;
		location: string;
	};
	location: string;
	type: "full-time" | "part-time" | "contract" | "internship" | "remote";
	salary?: {
		min: number;
		max: number;
		currency: string;
	};
	description: string;
	requirements: string[];
	benefits: string[];
	skills: string[];
	postedAt: string;
	deadline?: string;
	applicants?: number;
	isBookmarked?: boolean;
	isApplied?: boolean;
}

interface JobsState {
	jobs: Job[];
	filteredJobs: Job[];
	searchQuery: string;
	filters: {
		location: string;
		type: string[];
		salaryRange: [number, number];
		skills: string[];
		experience: string;
	};
	isLoading: boolean;
	setJobs: (jobs: Job[]) => void;
	setSearchQuery: (query: string) => void;
	setFilters: (filters: Partial<JobsState["filters"]>) => void;
	clearFilters: () => void;
	toggleBookmark: (jobId: string) => void;
	applyToJob: (jobId: string) => void;
	setLoading: (loading: boolean) => void;
	applyFilters: () => void;
}

const defaultFilters = {
	location: "",
	type: [],
	salaryRange: [0, 200000] as [number, number],
	skills: [],
	experience: "",
};

export const useJobsStore = create<JobsState>((set, get) => ({
	jobs: [],
	filteredJobs: [],
	searchQuery: "",
	filters: defaultFilters,
	isLoading: false,

	setJobs: (jobs) => {
		set({ jobs, filteredJobs: jobs });
	},

	setSearchQuery: (query) => {
		set({ searchQuery: query });
		get().applyFilters();
	},

	setFilters: (newFilters) => {
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
		}));
		get().applyFilters();
	},

	clearFilters: () => {
		set({ filters: defaultFilters, searchQuery: "" });
		get().applyFilters();
	},

	applyFilters: () => {
		const { jobs, searchQuery, filters } = get();

		let filtered = jobs.filter((job) => {
			// Search query filter
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				const matchesSearch =
					job.title.toLowerCase().includes(query) ||
					job.company.name.toLowerCase().includes(query) ||
					job.skills.some((skill) => skill.toLowerCase().includes(query)) ||
					job.description.toLowerCase().includes(query);

				if (!matchesSearch) return false;
			}

			// Location filter
			if (
				filters.location &&
				!job.location.toLowerCase().includes(filters.location.toLowerCase())
			) {
				return false;
			}

			// Job type filter
			if (filters.type.length > 0 && !filters.type.includes(job.type)) {
				return false;
			}

			// Salary range filter
			if (
				job.salary &&
				(job.salary.min < filters.salaryRange[0] ||
					job.salary.max > filters.salaryRange[1])
			) {
				return false;
			}

			// Skills filter
			if (filters.skills.length > 0) {
				const hasRequiredSkills = filters.skills.every((skill) =>
					job.skills.some((jobSkill) =>
						jobSkill.toLowerCase().includes(skill.toLowerCase())
					)
				);
				if (!hasRequiredSkills) return false;
			}

			return true;
		});

		set({ filteredJobs: filtered });
	},

	toggleBookmark: (jobId) => {
		set((state) => ({
			jobs: state.jobs.map((job) =>
				job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
			),
			filteredJobs: state.filteredJobs.map((job) =>
				job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
			),
		}));
	},

	applyToJob: (jobId) => {
		set((state) => ({
			jobs: state.jobs.map((job) =>
				job.id === jobId ? { ...job, isApplied: true } : job
			),
			filteredJobs: state.filteredJobs.map((job) =>
				job.id === jobId ? { ...job, isApplied: true } : job
			),
		}));
	},

	setLoading: (loading) => set({ isLoading: loading }),
}));
