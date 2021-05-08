from http.cookiejar import CookieJar, Cookie

import requests
import cloudscraper
import os
import json

from requests.cookies import cookiejar_from_dict, RequestsCookieJar, merge_cookies

if __name__ == '__main__':
    with open(os.path.join(os.path.dirname(__file__), 'headers.json'), 'r') as f:
        headers = json.loads(f.read())

    with open(os.path.join(os.path.dirname(__file__), 'cookies.json'), 'r') as f:
        cookies = json.loads(f.read())

    s = requests.Session()

    #     headers = {
    #
    #         'authority': 'www.etoro.com',
    #         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    #         'upgrade-insecure-requests': '1',
    #         # 'path': '/',
    #         'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    #         'accept-encoding': 'gzip, deflate, br',
    #         'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    #     }
    # scraper = cloudscraper.create_scraper()
    # response = scraper.get('https://www.etoro.com/', headers=headers)
    # print(response.)

    # print(response.cookies)
    #     cookie_value, user_agent = cloudscraper.get_cookie_string('http://www.etoro.com')

    #     print(response.cookies)
    pass_cookie = RequestsCookieJar()
    for cookie in cookies:
        my = requests.cookies.create_cookie(name=cookie['name'], value=cookie['value'])
        # s.cookies.set(my)

        pass_cookie.set_cookie(my)
    print(pass_cookie)
        # c = Cookie(name=cookie['name'], value=cookie['value'], domain=cookie['domain'], path=cookie['path'],
        #            expires=cookie['expires'], secure=cookie['secure'], port=cookie['sourcePort'])
        # pass_cookie.
    # pass_cookie.set_cookie(cookiejar_from_dict(cookie))
    # print(pass_cookie)
    # print(cookies)
    response_2 = requests.get(
        'https://www.etoro.com/sapi/trade-data-real/live/public/portfolios?cid=3378352&format=json',
        cookies=pass_cookie, headers=headers)
    print(response_2)
