import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function scrape(url: string) {
  const result = await fetch(url);
  const htmlString = await result.text();
  const $ = cheerio.load(htmlString);
  const element = $('article.post-31183');
  console.log(element.text());
}

scrape(
  'https://www.economicsdiscussion.net/exam-questions/top-12-exam-questions-and-answers-on-economics/31183',
);
