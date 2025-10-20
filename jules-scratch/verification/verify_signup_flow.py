from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the signup page
        # The Netlify dev server runs on port 8888 by default.
        page.goto("http://localhost:8888/html/regs/Signup.html")

        # 2. Fill out the registration form
        page.locator("#reg-email").fill("test.user@example.com")
        page.locator("#reg-firstname").fill("Test")
        page.locator("#reg-lastname").fill("User")
        page.locator("#reg-country").fill("Testland")
        page.locator("#reg-password").fill("password123")
        page.locator("#confirm-reg-password").fill("password123")
        page.locator("#accept").check()

        # 3. Click the REGISTER button, which brings up the confirmation
        register_button = page.locator("#register-button")
        expect(register_button).to_be_enabled()
        register_button.click()

        # 4. Click "Proceed" on the details confirmation alert
        proceed_button = page.locator('.alert-button:has-text("Proceed")')
        expect(proceed_button).to_be_visible()
        proceed_button.click()

        # 5. Wait for the email verification alert to appear
        verification_alert_title = page.locator('.alert-title:has-text("Verify Email")')
        expect(verification_alert_title).to_be_visible(timeout=10000)

        # 6. Take a screenshot of the verification alert
        page.screenshot(path="jules-scratch/verification/verification.png")

        print("Verification script completed successfully and took a screenshot.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        # Take a screenshot on error for debugging
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")


    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)
