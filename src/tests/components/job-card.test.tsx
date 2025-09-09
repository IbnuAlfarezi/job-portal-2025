import { render, screen, fireEvent } from "@testing-library/react";
import { JobCard } from "@/components/shared/job-card";
import { Job } from "@/store/jobs-store";

// Mock the useJobs hook
jest.mock("@/hooks/use-jobs", () => ({
	useJobs: () => ({
		bookmarkJob: jest.fn(),
		applyToJob: jest.fn(),
		isBookmarking: false,
		isApplying: false,
	}),
}));

const mockJob: Job = {
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
};

describe("JobCard", () => {
	it("renders job information correctly", () => {
		render(<JobCard job={mockJob} />);

		expect(screen.getByText("Senior Frontend Developer")).toBeInTheDocument();
		expect(screen.getByText("TechCorp")).toBeInTheDocument();
		expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
		expect(screen.getByText("$120,000 - $180,000")).toBeInTheDocument();
		expect(screen.getByText("45 applicants")).toBeInTheDocument();
	});

	it("displays job type badge", () => {
		render(<JobCard job={mockJob} />);

		expect(screen.getByText("FULL TIME")).toBeInTheDocument();
	});

	it("displays skills badges", () => {
		render(<JobCard job={mockJob} />);

		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Next.js")).toBeInTheDocument();
	});

	it("shows apply button", () => {
		render(<JobCard job={mockJob} />);

		expect(screen.getByText("Apply Now")).toBeInTheDocument();
	});

	it("shows applied state when job is applied", () => {
		const appliedJob = { ...mockJob, isApplied: true };
		render(<JobCard job={appliedJob} />);

		expect(screen.getByText("Applied")).toBeInTheDocument();
		expect(screen.getByText("Applied")).toBeDisabled();
	});

	it("calls bookmark function when bookmark button is clicked", () => {
		const { useJobs } = require("@/hooks/use-jobs");
		const mockBookmarkJob = jest.fn();
		useJobs.mockReturnValue({
			bookmarkJob: mockBookmarkJob,
			applyToJob: jest.fn(),
			isBookmarking: false,
			isApplying: false,
		});

		render(<JobCard job={mockJob} />);

		// Hover to show bookmark button
		const card = screen
			.getByText("Senior Frontend Developer")
			.closest(".group");
		fireEvent.mouseEnter(card!);

		const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
		fireEvent.click(bookmarkButton);

		expect(mockBookmarkJob).toHaveBeenCalledWith("1");
	});
});
