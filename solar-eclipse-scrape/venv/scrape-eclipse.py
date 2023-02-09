import requests
from bs4 import BeautifulSoup
from pathlib import Path

basePath = str(Path(__file__).resolve().parent)
scrapePath = str('/scrape/')

URL = "https://eclipse.gsfc.nasa.gov/SEpath/SEpath2001/SE2027Aug02Tpath.html"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

header = soup.find('h3')
data = soup.find('pre')

file = open(basePath + scrapePath + 'testFile.txt', 'w+')
file.writelines(header.text)
file.writelines(data.text)
file.close()

# data is in the <pre> tag