"use client";

import { useState } from "react";
import { Search, MapPin, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { JobCard } from "@/components/shared/job-card";
import { JobListSkeleton } from "@/components/shared/loading";
import { useJobs } from "@/hooks/use-jobs";
import { useJobsStore } from "@/store/jobs-store";
import { cn } from "@/lib/utils";

const jobTypes = [
	{ value: "full-time", label: "Full Time" },
	{ value: "part-time", label: "Part Time" },
	{ value: "contract", label: "Contract" },
	{ value: "internship", label: "Internship" },
	{ value: "remote", label: "Remote" },
];

const experienceLevels = [
	{ value: "entry", label: "Entry Level" },
	{ value: "mid", label: "Mid Level" },
	{ value: "senior", label: "Senior Level" },
	{ value: "lead", label: "Lead/Principal" },
];

const popularSkills = [
	"React",
	"TypeScript",
	"Node.js",
	"Python",
	"JavaScript",
	"Java",
	"Go",
	"Rust",
	"AWS",
	"Docker",
	"Kubernetes",
	"GraphQL",
];

export default function JobsPage() {
	const { jobs, isLoading, searchQuery, filters } = useJobs();
	const { setSearchQuery, setFilters, clearFilters } = useJobsStore();
	const [showFilters, setShowFilters] = useState(false);
	const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

	const handleSearch = () => {
		setSearchQuery(localSearchQuery);
	};

	const handleFilterChange = (key: string, value: any) => {
		setFilters({ [key]: value });
	};

	const handleSkillToggle = (skill: string) => {
		const currentSkills = filters.skills || [];
		const newSkills = currentSkills.includes(skill)
			? currentSkills.filter((s) => s !== skill)
			: [...currentSkills, skill];
		handleFilterChange("skills", newSkills);
	};

	const handleSalaryChange = (value: number[]) => {
		handleFilterChange("salaryRange", value as [number, number]);
	};

	const activeFiltersCount = [
		filters.location,
		filters.type.length,
		filters.skills.length,
		filters.experience,
	].filter(Boolean).length;

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Find Your Next Job</h1>
					<p className="text-muted-foreground">
						Discover opportunities that match your skills and career goals
					</p>
				</div>

				{/* Search Bar */}
				<div className="mb-6">
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="Job title, keywords, or company"
								value={localSearchQuery}
								onChange={(e) => setLocalSearchQuery(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
								className="pl-10"
							/>
						</div>
						<div className="relative">
							<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="Location"
								value={filters.location}
								onChange={(e) => handleFilterChange("location", e.target.value)}
								className="pl-10 w-full lg:w-64"
							/>
						</div>
						<Button onClick={handleSearch} className="w-full lg:w-auto">
							Search Jobs
						</Button>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Filters Sidebar */}
					<div className="lg:w-80">
						<div className="sticky top-24 space-y-6">
							{/* Filter Toggle for Mobile */}
							<div className="lg:hidden">
								<Button
									variant="outline"
									onClick={() => setShowFilters(!showFilters)}
									className="w-full">
									<SlidersHorizontal className="h-4 w-4 mr-2" />
									Filters
									{activeFiltersCount > 0 && (
										<Badge variant="secondary" className="ml-2">
											{activeFiltersCount}
										</Badge>
									)}
								</Button>
							</div>

							{/* Filters Panel */}
							<div
								className={cn("space-y-6", !showFilters && "hidden lg:block")}>
								{/* Clear Filters */}
								{activeFiltersCount > 0 && (
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium">
											{activeFiltersCount} filter(s) applied
										</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={clearFilters}
											className="text-muted-foreground">
											<X className="h-4 w-4 mr-1" />
											Clear all
										</Button>
									</div>
								)}

								{/* Job Type */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-base">Job Type</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3">
										{jobTypes.map((type) => (
											<div
												key={type.value}
												className="flex items-center space-x-2">
												<Checkbox
													id={type.value}
													checked={filters.type.includes(type.value)}
													onCheckedChange={(checked) => {
														const newTypes = checked
															? [...filters.type, type.value]
															: filters.type.filter((t) => t !== type.value);
														handleFilterChange("type", newTypes);
													}}
												/>
												<Label
													htmlFor={type.value}
													className="text-sm font-normal cursor-pointer">
													{type.label}
												</Label>
											</div>
										))}
									</CardContent>
								</Card>

								{/* Experience Level */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-base">
											Experience Level
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Select
											value={filters.experience}
											onValueChange={(value) =>
												handleFilterChange("experience", value)
											}>
											<SelectTrigger>
												<SelectValue placeholder="Select experience level" />
											</SelectTrigger>
											<SelectContent>
												{experienceLevels.map((level) => (
													<SelectItem key={level.value} value={level.value}>
														{level.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</CardContent>
								</Card>

								{/* Salary Range */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-base">Salary Range</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<Slider
											value={filters.salaryRange}
											onValueChange={handleSalaryChange}
											max={200000}
											min={0}
											step={5000}
											className="w-full"
										/>
										<div className="flex justify-between text-sm text-muted-foreground">
											<span>${filters.salaryRange[0].toLocaleString()}</span>
											<span>${filters.salaryRange[1].toLocaleString()}</span>
										</div>
									</CardContent>
								</Card>

								{/* Skills */}
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="text-base">Skills</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-2">
											{popularSkills.map((skill) => (
												<Badge
													key={skill}
													variant={
														filters.skills.includes(skill)
															? "default"
															: "outline"
													}
													className="cursor-pointer"
													onClick={() => handleSkillToggle(skill)}>
													{skill}
												</Badge>
											))}
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>

					{/* Jobs List */}
					<div className="flex-1">
						{/* Results Header */}
						<div className="flex items-center justify-between mb-6">
							<div>
								<h2 className="text-xl font-semibold">
									{jobs.length} job{jobs.length !== 1 ? "s" : ""} found
								</h2>
								{searchQuery && (
									<p className="text-sm text-muted-foreground">
										for "{searchQuery}"
									</p>
								)}
							</div>
							<Select defaultValue="relevance">
								<SelectTrigger className="w-48">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="relevance">Most Relevant</SelectItem>
									<SelectItem value="date">Most Recent</SelectItem>
									<SelectItem value="salary">Highest Salary</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Jobs Grid */}
						{isLoading ? (
							<JobListSkeleton count={8} />
						) : jobs.length > 0 ? (
							<div className="space-y-6">
								{jobs.map((job) => (
									<JobCard key={job.id} job={job} />
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-muted-foreground mb-4">
									<Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
									<h3 className="text-lg font-semibold mb-2">No jobs found</h3>
									<p className="text-sm">
										Try adjusting your search criteria or filters to find more
										opportunities.
									</p>
								</div>
								<Button variant="outline" onClick={clearFilters}>
									Clear all filters
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
