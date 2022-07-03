import requests

xmen_url = "http://x-men.wikia.com/api/v1/Articles/List?expand=1&category=Characters&limit=10000"
r = requests.get(xmen_url)
response = r.json()
# print response
a = 0
for item in response['items']:
    a += 1
    print("{}\t{}\t({})".format(str(a),item['title'].encode(encoding='utf-8'),item['id']))