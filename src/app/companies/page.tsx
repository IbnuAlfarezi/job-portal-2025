"use client";

import { useState } from "react";
import { Search, MapPin, Users, Star, ExternalLink, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Company {
	id: string;
	name: string;
	logo?: string;
	description: string;
	location: string;
	industry: string;
	size: string;
	rating: number;
	reviews: number;
	openJobs: number;
	website?: string;
	benefits: string[];
	technologies: string[];
}

// Mock data - replace with actual API calls
const mockCompanies: Company[] = [
	{
		id: "1",
		name: "TechCorp",
		logo: "/images/company1.png",
		description: "Leading technology company focused on innovative solutions for modern businesses. We're building the future of work with cutting-edge software and AI.",
		location: "San Francisco, CA",
		industry: "Technology",
		size: "1000-5000",
		rating: 4.8,
		reviews: 1247,
		openJobs: 24,
		website: "https://techcorp.com",
		benefits: ["Health Insurance", "401k Matching", "Flexible Hours", "Remote Work"],
		technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
	},
	{
		id: "2",
		name: "StartupXYZ",
		logo: "/images/company2.png",
		description: "Fast-growing startup revolutionizing the fintech space. Join us in building the next generation of financial tools.",
		location: "New York, NY",
		industry: "Fintech",
		size: "50-200",
		rating: 4.6,
		reviews: 89,
		openJobs: 12,
		website: "https://startupxyz.com",
		benefits: ["Equity", "Health Insurance", "Learning Budget", "Team Events"],
		technologies: ["Python", "React", "PostgreSQL", "Kubernetes", "GraphQL"],
	},
	{
		id: "3",
		name: "InnovateLab",
		logo: "/images/company3.png",
		description: "Research and development company pushing the boundaries of artificial intelligence and machine learning.",
		location: "Seattle, WA",
		industry: "AI/ML",
		size: "200-500",
		rating: 4.9,
		reviews: 156,
		openJobs: 18,
		website: "https://innovatelab.com",
		benefits: ["Research Time", "Conference Budget", "Health Insurance", "Stock Options"],
		technologies: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "GCP"],
	},
	{
		id: "4",
		name: "DataFlow",
		logo: "/images/company4.png",
		description: "Data analytics company helping businesses make data-driven decisions with advanced analytics and visualization tools.",
		location: "Austin, TX",
		industry: "Data Analytics",
		size: "500-1000",
		rating: 4.7,
		reviews: 234,
		openJobs: 31,
		website: "https://dataflow.com",
		benefits: ["Health Insurance", "401k", "Flexible PTO", "Professional Development"],
		technologies: ["Python", "R", "Tableau", "AWS", "Spark"],
	},
];

const industries = [
	"All Industries",
	"Technology",
	"Fintech",
	"AI/ML",
	"Data Analytics",
	"Healthcare",
	"E-commerce",
	"Education",
	"Manufacturing",
	"Consulting",
];

const companySizes = [
	"All Sizes",
	"1-10",
	"11-50",
	"51-200",
	"201-500",
	"501-1000",
	"1001-5000",
	"5000+",
];

function CompanyCard({ company }: { company: Company }) {
	return (
		<Card className="group hover:shadow-lg transition-all duration-200">
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-4">
						<Avatar className="h-16 w-16">
							<AvatarImage src={company.logo} alt={company.name} />
							<AvatarFallback className="text-lg">
								<Building2 className="h-8 w-8" />
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
								{company.name}
							</h3>
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span>{company.location}</span>
							</div>
							<div className="flex items-center space-x-1 mt-1">
								<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								<span className="text-sm font-medium">{company.rating}</span>
								<span className="text-sm text-muted-foreground">
									({company.reviews} reviews)
								</span>
							</div>
						</div>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-primary">{company.openJobs}</div>
						<div className="text-sm text-muted-foreground">open jobs</div>
					</div>
				</div>

				<p className="text-muted-foreground mb-4 line-clamp-2">
					{company.description}
				</p>

				<div className="flex flex-wrap gap-2 mb-4">
					<Badge variant="secondary">{company.industry}</Badge>
					<Badge variant="outline">{company.size} employees</Badge>
				</div>

				<div className="flex flex-wrap gap-1 mb-4">
					{company.technologies.slice(0, 4).map((tech) => (
						<Badge key={tech} variant="outline" className="text-xs">
							{tech}
						</Badge>
					))}
					{company.technologies.length > 4 && (
						<Badge variant="outline" className="text-xs">
							+{company.technologies.length - 4} more
						</Badge>
					)}
				</div>

				<div className="flex items-center justify-between">
					<div className="flex flex-wrap gap-1">
						{company.benefits.slice(0, 2).map((benefit) => (
							<Badge key={benefit} variant="secondary" className="text-xs">
								{benefit}
							</Badge>
						))}
						{company.benefits.length > 2 && (
							<Badge variant="secondary" className="text-xs">
								+{company.benefits.length - 2} more
							</Badge>
						)}
					</div>
					<div className="flex space-x-2">
						<Button variant="outline" size="sm" asChild>
							<Link href={`/companies/${company.id}`}>
								View Details
								<ExternalLink className="h-3 w-3 ml-1" />
							</Link>
						</Button>
						<Button size="sm" asChild>
							<Link href={`/companies/${company.id}/jobs`}>
								View Jobs
							</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

function CompanySkeleton() {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-4">
						<Skeleton className="h-16 w-16 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-6 w-32" />
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-20" />
						</div>
					</div>
					<div className="text-right space-y-1">
						<Skeleton className="h-8 w-8" />
						<Skeleton className="h-4 w-16" />
					</div>
				</div>
				<Skeleton className="h-16 w-full mb-4" />
				<div className="flex space-x-2 mb-4">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-24" />
				</div>
				<div className="flex space-x-1 mb-4">
					<Skeleton className="h-5 w-16" />
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-5 w-14" />
					<Skeleton className="h-5 w-18" />
				</div>
				<div className="flex justify-between">
					<div className="flex space-x-1">
						<Skeleton className="h-5 w-24" />
						<Skeleton className="h-5 w-20" />
					</div>
					<div className="flex space-x-2">
						<Skeleton className="h-8 w-24" />
						<Skeleton className="h-8 w-20" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function CompaniesPage() {
	const [companies] = useState<Company[]>(mockCompanies);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
	const [selectedSize, setSelectedSize] = useState("All Sizes");
	const [isLoading] = useState(false);

	const filteredCompanies = companies.filter((company) => {
		const matchesSearch = searchQuery === "" || 
			company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			company.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
		
		const matchesIndustry = selectedIndustry === "All Industries" || 
			company.industry === selectedIndustry;
		
		const matchesSize = selectedSize === "All Sizes" || 
			company.size === selectedSize;

		return matchesSearch && matchesIndustry && matchesSize;
	});

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Discover Companies</h1>
					<p className="text-muted-foreground">
						Explore top companies and find your next career opportunity
					</p>
				</div>

				{/* Search and Filters */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="Search companies, technologies, or industries"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{industries.map((industry) => (
									<SelectItem key={industry} value={industry}>
										{industry}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={selectedSize} onValueChange={setSelectedSize}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{companySizes.map((size) => (
									<SelectItem key={size} value={size}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Results Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-xl font-semibold">
							{filteredCompanies.length} compan{filteredCompanies.length !== 1 ? "ies" : "y"} found
						</h2>
						{searchQuery && (
							<p className="text-sm text-muted-foreground">
								for "{searchQuery}"
							</p>
						)}
					</div>
					<Select defaultValue="rating">
						<SelectTrigger className="w-48">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="rating">Highest Rated</SelectItem>
							<SelectItem value="jobs">Most Jobs</SelectItem>
							<SelectItem value="size">Company Size</SelectItem>
							<SelectItem value="name">Alphabetical</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Companies Grid */}
				{isLoading ? (
					<div className="space-y-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<CompanySkeleton key={i} />
						))}
					</div>
				) : filteredCompanies.length > 0 ? (
					<div className="space-y-6">
						{filteredCompanies.map((company) => (
							<CompanyCard key={company.id} company={company} />
						))}
					</div>
				) : (
					<div className="text-center py-12">
						<div className="text-muted-foreground mb-4">
							<Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
							<h3 className="text-lg font-semibold mb-2">No companies found</h3>
							<p className="text-sm">
								Try adjusting your search criteria to find more companies.
							</p>
						</div>
						<Button 
							variant="outline" 
							onClick={() => {
								setSearchQuery("");
								setSelectedIndustry("All Industries");
								setSelectedSize("All Sizes");
							}}
						>
							Clear all filters
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
