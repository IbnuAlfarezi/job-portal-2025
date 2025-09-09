import Link from "next/link";
import { Briefcase, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
	company: [
		{ name: "About Us", href: "/about" },
		{ name: "Careers", href: "/careers" },
		{ name: "Press", href: "/press" },
		{ name: "Blog", href: "/blog" },
	],
	jobSeekers: [
		{ name: "Find Jobs", href: "/jobs" },
		{ name: "Browse Companies", href: "/companies" },
		{ name: "Career Advice", href: "/advice" },
		{ name: "Salary Calculator", href: "/salary" },
	],
	employers: [
		{ name: "Post a Job", href: "/post-job" },
		{ name: "Browse Candidates", href: "/candidates" },
		{ name: "Pricing", href: "/pricing" },
		{ name: "Recruitment Solutions", href: "/solutions" },
	],
	support: [
		{ name: "Help Center", href: "/help" },
		{ name: "Contact Us", href: "/contact" },
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms of Service", href: "/terms" },
	],
};

export function Footer() {
	return (
		<footer className="bg-muted/50 border-t">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
					{/* Brand */}
					<div className="lg:col-span-1">
						<Link href="/" className="flex items-center space-x-2 mb-4">
							<Briefcase className="h-8 w-8 text-primary" />
							<span className="text-xl font-bold">JobPortal</span>
						</Link>
						<p className="text-sm text-muted-foreground mb-4">
							Connecting talented professionals with amazing opportunities
							worldwide.
						</p>
						<div className="space-y-2">
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<Mail className="h-4 w-4" />
								<span>support@jobportal.com</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<Phone className="h-4 w-4" />
								<span>+1 (555) 123-4567</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span>San Francisco, CA</span>
							</div>
						</div>
					</div>

					{/* Company */}
					<div>
						<h3 className="font-semibold mb-4">Company</h3>
						<ul className="space-y-2">
							{footerLinks.company.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Job Seekers */}
					<div>
						<h3 className="font-semibold mb-4">Job Seekers</h3>
						<ul className="space-y-2">
							{footerLinks.jobSeekers.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Employers */}
					<div>
						<h3 className="font-semibold mb-4">Employers</h3>
						<ul className="space-y-2">
							{footerLinks.employers.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support */}
					<div>
						<h3 className="font-semibold mb-4">Support</h3>
						<ul className="space-y-2">
							{footerLinks.support.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground hover:text-foreground transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-muted-foreground">
						© 2025 JobPortal. All rights reserved.
					</p>
					<div className="flex items-center space-x-4 mt-4 md:mt-0">
						<Link
							href="/privacy"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Terms of Service
						</Link>
						<Link
							href="/cookies"
							className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Cookie Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
