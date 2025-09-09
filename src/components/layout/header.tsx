"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User, Bookmark, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Jobs", href: "/jobs" },
	{ name: "Companies", href: "/companies" },
	{ name: "About", href: "/about" },
];

export function Header() {
	const pathname = usePathname();
	const { user, isAuthenticated, logout } = useAuth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<Briefcase className="h-8 w-8 text-primary" />
						<span className="text-xl font-bold">JobPortal</span>
					</Link>

					{/* Navigation */}
					<nav className="hidden md:flex items-center space-x-6">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"text-sm font-medium transition-colors hover:text-primary",
									pathname === item.href
										? "text-foreground"
										: "text-muted-foreground"
								)}>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Search Bar */}
					<div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder="Search jobs, companies..."
								className="pl-10"
							/>
						</div>
					</div>

					{/* Right Side Actions */}
					<div className="flex items-center space-x-4">
						<ThemeToggle />

						{isAuthenticated ? (
							<>
								{/* Notifications */}
								<Button variant="ghost" size="icon" className="relative">
									<Bell className="h-5 w-5" />
									<span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
										3
									</span>
								</Button>

								{/* Bookmarks */}
								<Button variant="ghost" size="icon" asChild>
									<Link href="/bookmarks">
										<Bookmark className="h-5 w-5" />
									</Link>
								</Button>

								{/* User Menu */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="relative h-8 w-8 rounded-full">
											<Avatar className="h-8 w-8">
												<AvatarImage src={user?.avatar} alt={user?.name} />
												<AvatarFallback>
													{user?.name
														?.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56" align="end" forceMount>
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col space-y-1">
												<p className="text-sm font-medium leading-none">
													{user?.name}
												</p>
												<p className="text-xs leading-none text-muted-foreground">
													{user?.email}
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem asChild>
											<Link href="/profile">Profile</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/applications">My Applications</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link href="/settings">Settings</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => logout()}>
											Log out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
						) : (
							<div className="flex items-center space-x-2">
								<Button variant="ghost" asChild>
									<Link href="/login">Sign In</Link>
								</Button>
								<Button asChild>
									<Link href="/register">Sign Up</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
