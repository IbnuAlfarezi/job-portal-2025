"use client";

import { useState } from "react";
import {
	Bookmark,
	MapPin,
	Clock,
	DollarSign,
	Users,
	ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Job } from "@/store/jobs-store";
import { useJobs } from "@/hooks/use-jobs";
import { cn } from "@/lib/utils";

interface JobCardProps {
	job: Job;
	className?: string;
}

export function JobCard({ job, className }: JobCardProps) {
	const { bookmarkJob, applyToJob, isBookmarking, isApplying } = useJobs();
	const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);

	const handleBookmark = () => {
		setIsBookmarked(!isBookmarked);
		bookmarkJob(job.id);
	};

	const handleApply = () => {
		applyToJob(job.id);
	};

	const formatSalary = (salary: Job["salary"]) => {
		if (!salary) return "Salary not specified";
		return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
	};

	const getJobTypeColor = (type: Job["type"]) => {
		const colors = {
			"full-time":
				"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
			"part-time":
				"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
			contract:
				"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
			internship:
				"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
			remote: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
		};
		return (
			colors[type] ||
			"bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
		);
	};

	return (
		<Card
			className={cn(
				"group hover:shadow-lg transition-all duration-200",
				className
			)}>
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-3">
						<Avatar className="h-12 w-12">
							<AvatarImage src={job.company.logo} alt={job.company.name} />
							<AvatarFallback>
								{job.company.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
								{job.title}
							</h3>
							<p className="text-muted-foreground">{job.company.name}</p>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleBookmark}
						disabled={isBookmarking}
						className={cn(
							"opacity-0 group-hover:opacity-100 transition-opacity",
							isBookmarked && "opacity-100 text-yellow-500"
						)}>
						<Bookmark
							className={cn("h-4 w-4", isBookmarked && "fill-current")}
						/>
					</Button>
				</div>

				<div className="space-y-3 mb-4">
					<div className="flex items-center space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center space-x-1">
							<MapPin className="h-4 w-4" />
							<span>{job.location}</span>
						</div>
						<div className="flex items-center space-x-1">
							<Clock className="h-4 w-4" />
							<span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
						</div>
					</div>

					{job.salary && (
						<div className="flex items-center space-x-1 text-sm text-muted-foreground">
							<DollarSign className="h-4 w-4" />
							<span>{formatSalary(job.salary)}</span>
						</div>
					)}

					{job.applicants && (
						<div className="flex items-center space-x-1 text-sm text-muted-foreground">
							<Users className="h-4 w-4" />
							<span>{job.applicants} applicants</span>
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-2 mb-4">
					<Badge className={getJobTypeColor(job.type)}>
						{job.type.replace("-", " ").toUpperCase()}
					</Badge>
					{job.skills.slice(0, 3).map((skill) => (
						<Badge key={skill} variant="secondary">
							{skill}
						</Badge>
					))}
					{job.skills.length > 3 && (
						<Badge variant="outline">+{job.skills.length - 3} more</Badge>
					)}
				</div>

				<p className="text-sm text-muted-foreground line-clamp-2">
					{job.description}
				</p>
			</CardContent>

			<CardFooter className="p-6 pt-0 flex justify-between">
				<Button variant="outline" size="sm" asChild>
					<a href={`/jobs/${job.id}`} className="flex items-center space-x-1">
						<span>View Details</span>
						<ExternalLink className="h-3 w-3" />
					</a>
				</Button>
				<Button
					size="sm"
					onClick={handleApply}
					disabled={isApplying || job.isApplied}>
					{job.isApplied ? "Applied" : "Apply Now"}
				</Button>
			</CardFooter>
		</Card>
	);
}
