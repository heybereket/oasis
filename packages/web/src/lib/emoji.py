import json

largeEmoji = json.loads(open("emoji.json", "rb").read().decode("utf-8"))
smallEmoji = {}

for i in largeEmoji:
    smallEmoji[i["name"].replace(' ', '-')] = i["char"]

out = json.dumps(smallEmoji)
out = out.encode("utf-8")
open("small.json", "wb").write(out)
