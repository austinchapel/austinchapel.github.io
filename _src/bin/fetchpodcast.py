#!/usr/bin/env python

from dateutil.parser import parse
import json
from urllib2 import urlopen
from xml.etree.ElementTree import iterparse
import yaml

PODCAST_URL = 'https://itunes.apple.com/lookup?id=1131269378&entity=podcast'

SERMON_DATA_PATH = '_data/sermons.yml'

def tag_to_item(item_element):
  dtd_prefix = '{http://www.itunes.com/dtds/podcast-1.0.dtd}'
  datetime = parse(item_element.find('pubDate').text)
  return {
    'title': item_element.find('title').text,
    'speaker': item_element.find('%sauthor' % dtd_prefix).text,
    'date': datetime.strftime('%B %d, %Y'),
    # this could also be item_element.find('guid').text
    'audio': item_element.find('enclosure').attrib['url'],
    'datetime': datetime,
  }

def sermon_items_from_feed(url = PODCAST_URL):
  xml_url = json.loads(urlopen(url).read())['results'][0]['feedUrl']
  elements = iterparse(urlopen(xml_url))
  item_elements = (element for _, element in elements if element.tag == 'item')
  return (tag_to_item(item_element) for item_element in item_elements)

def sermon_item_to_string(item):
  s = ['- title: ', item['title'], '\n']
  for attrib in ('speaker', 'date', 'audio'):
    if attrib in item:
      s += ['  ', attrib, ': ', item[attrib], '\n']
  s.append('\n')
  return ''.join(s)

def add_to_sermon_data(items, sermon_data_path = SERMON_DATA_PATH):
  current_data = yaml.load(open(sermon_data_path))
  print sermon_data_path, current_data
  current_urls = set(item['audio'] for item in current_data if 'audio' in item)
  sorted_items = sorted(items, key=lambda item: item['datetime'])
  items = (item for item in sorted_items if item['audio'] not in current_urls)
  with open(sermon_data_path, 'a') as sermon_data:
    for item in items:
      sermon_data.write(sermon_item_to_string(item))

if __name__ == '__main__':
  add_to_sermon_data(sermon_items_from_feed())
