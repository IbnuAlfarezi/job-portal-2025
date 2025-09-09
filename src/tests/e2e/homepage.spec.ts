import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
	test("should display the homepage correctly", async ({ page }) => {
		await page.goto("/");

		// Check if the main heading is visible
		await expect(
			page.getByRole("heading", { name: /find your dream job/i })
		).toBeVisible();

		// Check if the search bar is present
		await expect(
			page.getByPlaceholder(/job title, keywords, or company/i)
		).toBeVisible();
		await expect(page.getByPlaceholder(/location/i)).toBeVisible();
		await expect(
			page.getByRole("button", { name: /search jobs/i })
		).toBeVisible();

		// Check if stats are displayed
		await expect(page.getByText("10,000+")).toBeVisible();
		await expect(page.getByText("2,500+")).toBeVisible();
		await expect(page.getByText("50,000+")).toBeVisible();
		await expect(page.getByText("25%")).toBeVisible();
	});

	test('should navigate to jobs page when clicking "View All Jobs"', async ({
		page,
	}) => {
		await page.goto("/");

		// Click on "View All Jobs" button
		await page.getByRole("link", { name: /view all jobs/i }).click();

		// Check if we're on the jobs page
		await expect(page).toHaveURL("/jobs");
		await expect(
			page.getByRole("heading", { name: /find your next job/i })
		).toBeVisible();
	});

	test('should navigate to register page when clicking "Get Started"', async ({
		page,
	}) => {
		await page.goto("/");

		// Scroll to the CTA section
		await page
			.getByRole("heading", { name: /ready to start your journey/i })
			.scrollIntoViewIfNeeded();

		// Click on "Get Started" button
		await page.getByRole("link", { name: /get started/i }).click();

		// Check if we're on the register page
		await expect(page).toHaveURL("/register");
		await expect(
			page.getByRole("heading", { name: /create your account/i })
		).toBeVisible();
	});

	test("should display job categories", async ({ page }) => {
		await page.goto("/");

		// Check if job categories section is visible
		await expect(
			page.getByRole("heading", { name: /browse by category/i })
		).toBeVisible();

		// Check if some categories are displayed
		await expect(page.getByText("Software Engineering")).toBeVisible();
		await expect(page.getByText("Data Science")).toBeVisible();
		await expect(page.getByText("Product Management")).toBeVisible();
	});

	test("should display featured companies", async ({ page }) => {
		await page.goto("/");

		// Check if featured companies section is visible
		await expect(
			page.getByRole("heading", { name: /top companies/i })
		).toBeVisible();

		// Check if some companies are displayed
		await expect(page.getByText("TechCorp")).toBeVisible();
		await expect(page.getByText("StartupXYZ")).toBeVisible();
	});

	test("should have working navigation", async ({ page }) => {
		await page.goto("/");

		// Check if navigation links are present
		await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
		await expect(page.getByRole("link", { name: /jobs/i })).toBeVisible();
		await expect(page.getByRole("link", { name: /companies/i })).toBeVisible();
		await expect(page.getByRole("link", { name: /about/i })).toBeVisible();

		// Test navigation to companies page
		await page.getByRole("link", { name: /companies/i }).click();
		await expect(page).toHaveURL("/companies");
	});

	test("should have theme toggle functionality", async ({ page }) => {
		await page.goto("/");

		// Check if theme toggle button is present
		const themeToggle = page.getByRole("button", { name: /toggle theme/i });
		await expect(themeToggle).toBeVisible();

		// Click theme toggle
		await themeToggle.click();

		// Check if theme menu appears
		await expect(page.getByText("Light")).toBeVisible();
		await expect(page.getByText("Dark")).toBeVisible();
		await expect(page.getByText("System")).toBeVisible();
	});
});
