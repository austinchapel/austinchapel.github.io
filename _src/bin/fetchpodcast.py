#!/usr/bin/env python

from dateutil.parser import parse
import json
from urllib2 import urlopen
from xml.etree.ElementTree import iterparse

URL = 'https://itunes.apple.com/lookup?id=1131269378&entity=podcast'

def tag_to_item(item_element):
  dtd_prefix = '{http://www.itunes.com/dtds/podcast-1.0.dtd}'
  return {
    'title': item_element.find('title').text,
    'speaker': item_element.find('%sauthor' % dtd_prefix).text,
    'date': parse(item_element.find('pubDate').text).strftime('%B %d, %Y'),
    # this could also be item_element.find('guid').text
    'audio': item_element.find('enclosure').attrib['url'],
  }

if __name__ == '__main__':
  xml_url = json.loads(urlopen(URL).read())['results'][0]['feedUrl']
  elements = iterparse(urlopen(xml_url))
  item_elements = (element for _, element in elements if element.tag == 'item')
  items = (tag_to_item(item_element) for item_element in item_elements)
  print [i for i in items]
