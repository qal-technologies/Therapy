from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Verify Login Page Redesign
        page.goto("http://localhost:8888/admin/")
        page.screenshot(path="jules-scratch/verification/login_page_redesign.png")

        # 2. Simulate Login and Navigate to Dashboard
        page.get_by_label("Email").fill("healingwithcharlottecasiraghi@gmail.com")
        page.get_by_role("button", name="Request OTP").click()

        # Set a dummy session token to prevent redirect
        page.evaluate("localStorage.setItem('adminSessionToken', 'dummy_token')")

        page.goto("http://localhost:8888/admin/dashboard.html")

        # 3. Verify Dashboard Light Mode
        # The user list won't be populated, so we just wait for the dashboard to load.
        page.wait_for_selector("#admin-dashboard")
        page.screenshot(path="jules-scratch/verification/dashboard_light_mode.png")

        # 4. Verify Dashboard Dark Mode
        page.locator("#theme-switcher").click()
        expect(page.locator("body")).to_have_class("dark-theme")
        page.screenshot(path="jules-scratch/verification/dashboard_dark_mode.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
