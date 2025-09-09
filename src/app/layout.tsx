import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { QueryProvider } from "@/lib/query-client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "JobPortal 2025 - Find Your Dream Job",
	description:
		"Connect with top companies and find your perfect job opportunity. Browse thousands of jobs, apply with ease, and advance your career.",
	keywords: ["jobs", "careers", "employment", "hiring", "recruitment"],
	authors: [{ name: "JobPortal Team" }],
	openGraph: {
		title: "JobPortal 2025 - Find Your Dream Job",
		description:
			"Connect with top companies and find your perfect job opportunity.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<QueryProvider>
						<div className="min-h-screen flex flex-col">
							<Header />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
						<Toaster />
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
