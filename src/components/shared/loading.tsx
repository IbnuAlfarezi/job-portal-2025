import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
	return (
		<div className="border rounded-lg p-6 space-y-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center space-x-3">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-5 w-48" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
				<Skeleton className="h-8 w-8" />
			</div>

			<div className="space-y-2">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-4 w-40" />
			</div>

			<div className="flex space-x-2">
				<Skeleton className="h-6 w-20" />
				<Skeleton className="h-6 w-16" />
				<Skeleton className="h-6 w-18" />
			</div>

			<Skeleton className="h-12 w-full" />

			<div className="flex justify-between">
				<Skeleton className="h-8 w-24" />
				<Skeleton className="h-8 w-20" />
			</div>
		</div>
	);
}

export function JobListSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="space-y-6">
			{Array.from({ length: count }).map((_, i) => (
				<JobCardSkeleton key={i} />
			))}
		</div>
	);
}

export function PageSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8 space-y-8">
			<div className="space-y-4">
				<Skeleton className="h-8 w-64" />
				<Skeleton className="h-4 w-96" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="space-y-4">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>

				<div className="md:col-span-2 space-y-6">
					<JobListSkeleton count={4} />
				</div>
			</div>
		</div>
	);
}
