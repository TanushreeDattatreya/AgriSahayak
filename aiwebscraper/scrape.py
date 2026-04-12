import selenium.webdriver as webdriver
from selenium.webdriver.chrome.service import Service
import time
from bs4 import  BeautifulSoup 
def scrape_website(website):
    print("Launching Chrome browser...")
    chrome_driver_path = r"C:\Users\swana\OneDrive\Desktop\Project Farming\aiwebscraper\chromedriver.exe"
    options = webdriver.ChromeOptions()
    # Uncomment the following line to run Chrome in headless mode
    # options.add_argument("--headless")
    
    driver = webdriver.Chrome(service=Service(chrome_driver_path), options=options)
    
    try:
        driver.get(website)
        print("Page loaded...")
        html = driver.page_source
        time.sleep(10)  # Wait for 10 seconds if needed for additional content to load
        return html
    finally:
        driver.quit()

# # Example usage:
# if __name__ == "__main__":
#     url = "https://techwithtim.net"  # Replace with your target URL
#     page_html = scrape_website(url)
#     print(page_html)
def extract_body_content(html_content):
    soup=BeautifulSoup(html_content,"html.parser")
    body_content=soup.body
    if body_content:
        return str(body_content)
    return ""

def clean_body_content(body_content):
    soup=BeautifulSoup(body_content,"html.parser")

    for script_or_style in soup(["script",'style']):
        script_or_style.extract()

    clean_content=soup.get_text(separator="\n")
    clean_content="\n".join(
        line.strip() for line in  clean_content.splitlines() if line.strip()
    )

    return clean_content

def split_dom_content(dom_content,max_length=6000):
    return [
         dom_content[i : i + max_length] for i in range(0, len(dom_content), max_length)
    ]