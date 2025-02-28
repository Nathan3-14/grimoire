import hashlib

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

to_out = ""

for character in t_characters:
    filename = f"Icon_{character}.png"
    result = hashlib.md5(filename.encode())
    dirs = result.hexdigest()[:2]
    dir_path = f"{dirs[0]}/{dirs}"
    url = f"https://wiki.bloodontheclocktower.com/images/{dir_path}/{filename}"
    img_tag = f"<div class=\"character\">\n<img class=\"icon\" src={url}>\n</div>"

    img_tag = f"<div class=\"character\">\n<img class=\"icon\" src={url}>\n<svg width=\"128\" height=\"128\" viewbox=\"0 0 128 128\">\n<path id=\"character-name-path\" d=\"M 20 84 A 50 50 0 0 0 108 84\" pathLength=\"2\" fill=\"none\" stroke=\"none\"/>\n<text><textPath href=\"#character-name-path\" startOffset=\"1\" color=\"white\">{character.capitalize()}</textPath></text>\n</svg>\n</div>\n"

    """
    <div class="character">
            <img class="icon" src=https://wiki.bloodontheclocktower.com/images/5/5c/Icon_imp.png>
            <img class="icon-background" src="https://github.com/bra1n/townsquare/blob/develop/src/assets/token.png?raw=true">
            <svg width="128" height="128" viewbox="0 0 128 128">
            <path id="character-name-path" d="M 20 84 A 50 50 0 0 0 108 84" pathLength="2" fill="none" stroke="none"/>
            <text><textPath href="#character-name-path" startOffset="1" color="white">imp</textPath></text>
            </svg>
            <div class="reminders"></div>
            <!-- <div class="reminder">
                <img src="https://wiki.bloodontheclocktower.com/images/4/4a/Icon_drunk.png" width="64" height="64">
                <p>Drunk</p>
            </div> -->
            </div>
    """

    to_out += img_tag
    print(url)
    
open("out.txt", "w").write(to_out)
