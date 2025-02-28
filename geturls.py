import hashlib
import json
from typing import Dict

characters = [
    "imp",
    "baron", "scarletwoman", "spy", "poisoner",
    "butler", "drunk", "recluse", "saint",
    "mayor", "soldier", "slayer", "virgin", "ravenkeeper", "monk", "undertaker", "fortuneteller", "empath", "chef", "investigator", "librarian", "washerwoman"
]
t_characters = [
    "imp",
    "poisoner",
    "drunk",
    "investigator", "ravenkeeper", "slayer"
]
urls: Dict[str, str] = {}

to_out = ""

for character in t_characters:
    filename = f"Icon_{character}.png"
    result = hashlib.md5(filename.encode())
    dirs = result.hexdigest()[:2]
    dir_path = f"{dirs[0]}/{dirs}"
    url = f"https://wiki.bloodontheclocktower.com/images/{dir_path}/{filename}"
    img_tag = f"<div class=\"character\">\n<img class=\"icon\" src={url}>\n</div>"

    img_tag = open("character.html", "r").read().replace("{{url}}", url).replace("{{character}}", character.capitalize())
    
    to_out += img_tag
    urls[character] = url
    print(url)
    
    """
    <div class="reminder">
        <img src="https://wiki.bloodontheclocktower.com/images/4/4a/Icon_drunk.png" width="64" height="64">
        <p>Drunk</p>
    </div>
    """

open("out.txt", "w").write(to_out)
json.dump(urls, open("urls.json", "w"))