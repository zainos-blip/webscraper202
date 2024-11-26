from playwright.sync_api import sync_playwright, Playwright
from rich import print
import json

def run(playwright: Playwright):
    store_url = 'https://www.bhphotovideo.com/c/search?Ntt=logitech%20wireless%20mouse&N=0&InitialSearch=yes&sts=ps'
    browser = playwright.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto(store_url)

    json_data_list = []
    page_count = 0

    while(True):

        if page_count > 7:
            break

        for link in page.locator("a[data-selenium='miniProductPageProductNameLink']").all():
            p = browser.new_page(base_url='https://www.bhphotovideo.com/')
            url = link.get_attribute("href")
            
            if url is not None:
                p.goto(url)
            else:
                p.close()

            for script in p.locator("script[type='application/ld+json']").all():
                try:
                    data = script.text_content()
                    json_data = json.loads(data)
                
                    json_data_list.append(json_data)

                except Exception as e:
                    print(f"Error reading the script content: {e}")


            p.close()

        page.locator("a[data-selenium='listingPagingPageNext']").click()
        page_count += 1

    with open('content.json', 'w') as json_file:
        json.dump(json_data_list, json_file, indent=4)

    print("Data saved to content.json")

with sync_playwright() as sp:
    run(sp)

