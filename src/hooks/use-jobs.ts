import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useJobsStore } from "@/store/jobs-store";
import { Job } from "@/store/jobs-store";

// Mock API functions - replace with actual API calls
const mockFetchJobs = async (): Promise<Job[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return [
		{
			id: "1",
			title: "Senior Frontend Developer",
			company: {
				id: "1",
				name: "TechCorp",
				logo: "/images/company1.png",
				location: "San Francisco, CA",
			},
			location: "San Francisco, CA",
			type: "full-time",
			salary: {
				min: 120000,
				max: 180000,
				currency: "USD",
			},
			description:
				"We are looking for a senior frontend developer to join our team...",
			requirements: [
				"5+ years of React experience",
				"Strong TypeScript skills",
				"Experience with Next.js",
				"Knowledge of modern CSS frameworks",
			],
			benefits: [
				"Health insurance",
				"401k matching",
				"Flexible work hours",
				"Remote work options",
			],
			skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
			postedAt: "2024-01-15",
			deadline: "2024-02-15",
			applicants: 45,
			isBookmarked: false,
			isApplied: false,
		},
		{
			id: "2",
			title: "Full Stack Developer",
			company: {
				id: "2",
				name: "StartupXYZ",
				logo: "/images/company2.png",
				location: "New York, NY",
			},
			location: "New York, NY",
			type: "full-time",
			salary: {
				min: 100000,
				max: 150000,
				currency: "USD",
			},
			description: "Join our fast-growing startup as a full stack developer...",
			requirements: [
				"3+ years of full stack development",
				"Experience with React and Node.js",
				"Database design skills",
				"API development experience",
			],
			benefits: [
				"Equity options",
				"Health insurance",
				"Learning budget",
				"Team events",
			],
			skills: ["React", "Node.js", "PostgreSQL", "AWS"],
			postedAt: "2024-01-14",
			deadline: "2024-02-14",
			applicants: 32,
			isBookmarked: false,
			isApplied: false,
		},
	];
};

const mockApplyToJob = async (jobId: string) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return { success: true, jobId };
};

const mockBookmarkJob = async (jobId: string) => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { success: true, jobId };
};

export const useJobs = () => {
	const queryClient = useQueryClient();
	const {
		jobs,
		filteredJobs,
		searchQuery,
		filters,
		isLoading: storeLoading,
		setJobs,
		toggleBookmark,
		applyToJob,
		setLoading,
	} = useJobsStore();

	const { data, isLoading, error } = useQuery({
		queryKey: ["jobs"],
		queryFn: mockFetchJobs,
	});

	// Update jobs when data changes
	React.useEffect(() => {
		if (data) {
			setJobs(data);
		}
	}, [data, setJobs]);

	const applyMutation = useMutation({
		mutationFn: mockApplyToJob,
		onSuccess: (_, jobId) => {
			applyToJob(jobId);
			queryClient.invalidateQueries({ queryKey: ["jobs"] });
		},
	});

	const bookmarkMutation = useMutation({
		mutationFn: mockBookmarkJob,
		onSuccess: (_, jobId) => {
			toggleBookmark(jobId);
		},
	});

	return {
		jobs: filteredJobs,
		allJobs: jobs,
		isLoading: isLoading || storeLoading,
		error,
		searchQuery,
		filters,
		applyToJob: applyMutation.mutate,
		bookmarkJob: bookmarkMutation.mutate,
		isApplying: applyMutation.isPending,
		isBookmarking: bookmarkMutation.isPending,
	};
};
