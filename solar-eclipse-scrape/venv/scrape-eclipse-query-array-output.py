import requests
from bs4 import BeautifulSoup
from pathlib import Path

basePath = str(Path(__file__).resolve().parent)
scrapePath = str('/hybrid/1901-1910/')

#URL = "https://eclipse.gsfc.nasa.gov/SEpath/SEpath2001/SE2026Aug12Tpath.html"

def scrape(linkQuery, fileName):
    page = requests.get(linkQuery)
    soup = BeautifulSoup(page.content, "html.parser")
    header = soup.find('h3')
    data = soup.find('pre')
    file = open(basePath + scrapePath + fileName + '.txt', 'w+')
    jsOutput = open(basePath + scrapePath + fileName + '.js', 'w+')
    file.writelines(header.text)
    file.writelines(data.text)
    file.seek(0)
    lines = file.read().splitlines()
    for line in lines:
        print('`' + line + '`' + ',', file=jsOutput)
    jsOutput.writelines(']')
    jsOutput.write('\n')
    jsOutput.write('link = ' + '`' + linkQuery + '`')
    jsOutput.seek(0)
    jsOutput.write('\n')
    jsOutput.write(fileName + ' = [`')
    file.close()

def start():
    linkQuery = input('\nInsert the .html link and press enter\n')
    fileName = input('\nEnter the name for the scraped file generated (do not include a file extension)\n')
    scrape(linkQuery, fileName)

start()

# data is in the <pre> tag