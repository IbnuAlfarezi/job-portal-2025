"use client";

import {
	Search,
	MapPin,
	Briefcase,
	TrendingUp,
	Users,
	Star,
	ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/shared/job-card";
import { useJobs } from "@/hooks/use-jobs";
import { JobListSkeleton } from "@/components/shared/loading";
import Link from "next/link";

const featuredCompanies = [
	{ name: "TechCorp", logo: "/images/company1.png", jobs: 24, rating: 4.8 },
	{ name: "StartupXYZ", logo: "/images/company2.png", jobs: 12, rating: 4.6 },
	{ name: "InnovateLab", logo: "/images/company3.png", jobs: 18, rating: 4.9 },
	{ name: "DataFlow", logo: "/images/company4.png", jobs: 31, rating: 4.7 },
];

const jobCategories = [
	{ name: "Software Engineering", count: 1240, icon: "💻" },
	{ name: "Data Science", count: 890, icon: "📊" },
	{ name: "Product Management", count: 650, icon: "📈" },
	{ name: "Design", count: 420, icon: "🎨" },
	{ name: "Marketing", count: 380, icon: "📢" },
	{ name: "Sales", count: 320, icon: "💼" },
];

const stats = [
	{ label: "Active Jobs", value: "10,000+", icon: Briefcase },
	{ label: "Companies", value: "2,500+", icon: Users },
	{ label: "Success Stories", value: "50,000+", icon: Star },
	{ label: "Growth Rate", value: "25%", icon: TrendingUp },
];

export default function Home() {
	const { jobs, isLoading } = useJobs();
	const featuredJobs = jobs.slice(0, 6);

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<div className="space-y-4">
							<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
								Find Your <span className="text-primary">Dream Job</span>
								<br />
								Today
							</h1>
							<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
								Connect with top companies and discover opportunities that match
								your skills and aspirations. Join thousands of professionals who
								found their perfect career path.
							</p>
						</div>

						{/* Search Bar */}
						<div className="max-w-2xl mx-auto">
							<div className="flex flex-col sm:flex-row gap-4 p-2 bg-background rounded-lg shadow-lg border">
								<div className="flex-1 relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Job title, keywords, or company"
										className="pl-10 border-0 focus-visible:ring-0"
									/>
								</div>
								<div className="relative">
									<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
									<Input
										placeholder="Location"
										className="pl-10 border-0 focus-visible:ring-0 w-full sm:w-48"
									/>
								</div>
								<Button size="lg" className="px-8">
									Search Jobs
								</Button>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
							{stats.map((stat) => (
								<div key={stat.label} className="text-center">
									<div className="flex justify-center mb-2">
										<stat.icon className="h-8 w-8 text-primary" />
									</div>
									<div className="text-2xl font-bold">{stat.value}</div>
									<div className="text-sm text-muted-foreground">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Featured Jobs */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-3xl font-bold">Featured Jobs</h2>
							<p className="text-muted-foreground">
								Handpicked opportunities from top companies
							</p>
						</div>
						<Button variant="outline" asChild>
							<Link href="/jobs">
								View All Jobs
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					{isLoading ? (
						<JobListSkeleton count={6} />
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{featuredJobs.map((job) => (
								<JobCard key={job.id} job={job} />
							))}
						</div>
					)}
				</div>
			</section>

			{/* Job Categories */}
			<section className="py-16 bg-muted/50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
						<p className="text-muted-foreground">
							Find opportunities in your field of expertise
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{jobCategories.map((category) => (
							<Card
								key={category.name}
								className="text-center hover:shadow-md transition-shadow cursor-pointer">
								<CardContent className="p-6">
									<div className="text-3xl mb-2">{category.icon}</div>
									<h3 className="font-semibold mb-1">{category.name}</h3>
									<p className="text-sm text-muted-foreground">
										{category.count} jobs
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Featured Companies */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Top Companies</h2>
						<p className="text-muted-foreground">
							Join industry leaders and innovative startups
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{featuredCompanies.map((company) => (
							<Card
								key={company.name}
								className="text-center hover:shadow-md transition-shadow">
								<CardContent className="p-6">
									<div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
										<span className="text-2xl font-bold">
											{company.name[0]}
										</span>
									</div>
									<h3 className="font-semibold mb-2">{company.name}</h3>
									<div className="flex items-center justify-center space-x-1 mb-2">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span className="text-sm">{company.rating}</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{company.jobs} open positions
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<div className="max-w-2xl mx-auto space-y-6">
						<h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
						<p className="text-lg opacity-90">
							Join thousands of professionals who found their dream jobs through
							our platform. Create your profile and get matched with the perfect
							opportunities.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" asChild>
								<Link href="/register">Get Started</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
								asChild>
								<Link href="/jobs">Browse Jobs</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
