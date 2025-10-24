from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the admin login page
        page.goto("http://localhost:8888/admin/")

        # Enter email and request OTP
        page.get_by_label("Email").fill("healingwithcharlottecasiraghi@gmail.com")
        page.get_by_role("button", name="Request OTP").click()

        # For this test, we'll simulate a successful OTP verification
        # by directly navigating to the dashboard.
        page.goto("http://localhost:8888/admin/dashboard.html")

        # Wait for the user list to be populated
        expect(page.locator(".user-list-item")).to_be_visible()

        # Take a screenshot of the dashboard
        page.screenshot(path="jules-scratch/verification/admin_dashboard.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
