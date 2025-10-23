from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8888/html/main/Home.html")
    page.fill("input[type='email']", "test@example.com")
    page.click("button:has-text('SUBSCRIBE')")
    page.screenshot(path="jules-scratch/verification/newsletter_signup.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
