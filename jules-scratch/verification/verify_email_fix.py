
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the signup page
        page.goto("http://localhost:8888/html/regs/signup.html")

        # Wait for the page to be ready
        page.wait_for_selector("body[style*='visibility: visible']", timeout=10000)

        # Fill out the signup form
        page.locator('input[name="first_name"]').fill("Test")
        page.locator('input[name="last_name"]').fill("User")
        page.locator('input[name="email"]').fill("testuser@example.com")
        page.locator('input[name="password"]').fill("Password123!")

        # Click the "Verify Email" button
        page.locator("text=Verify Email").click()

        # Wait for the OTP modal to appear, which indicates the email was sent
        expect(page.locator("#otp-modal")).to_be_visible(timeout=15000)

        # Take a screenshot of the OTP modal
        page.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification successful: OTP modal appeared.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
