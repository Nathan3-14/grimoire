function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  

const urls = {"imp": "https://wiki.bloodontheclocktower.com/images/5/5c/Icon_imp.png", "poisoner": "https://wiki.bloodontheclocktower.com/images/b/b1/Icon_poisoner.png", "drunk": "https://wiki.bloodontheclocktower.com/images/4/4a/Icon_drunk.png", "investigator": "https://wiki.bloodontheclocktower.com/images/a/ad/Icon_investigator.png", "ravenkeeper": "https://wiki.bloodontheclocktower.com/images/e/ef/Icon_ravenkeeper.png", "slayer": "https://wiki.bloodontheclocktower.com/images/d/d3/Icon_slayer.png"}
const reminders = {"imp.dead": "Dead", "drunk.drunk": "Drunk", "butler.master": "Master", "poisoner.poisoned": "Poisoned", "slayer.noability": "No Ability", "virgin.noability": "No Ability", "monk.protected": "Protected", "undertaker.executed": "Executed", "fortuneteller.redherring": "Red Herring", "investigator.wrong": "Wrong", "investigator.minion": "Minion", "librarian.wrong": "Wrong", "librarian.outsider": "Outsider", "washerwoman.wrong": "Wrong", "washerwoman.townsfolk": "Townsfolk"}

var setup = (character_list) => {
    shuffle(character_list)
    const template = document.getElementById("character-template")
    var adjust_css_character = ".radial > li:nth-child({{n}}) { transform: rotate({{rotate}}deg) translate(300px) rotate(-{{rotate}}deg);}"
    var adjust_css_reminders = ".radial > li:nth-child({{n}}) > .reminders { transform: rotate({{rotate}}deg) translate(-200px)}" //was -200px
    var adjust_css_reminders_2 = ".radial > li:nth-child({{n}}) > .reminders > * {transform: rotate(-{{rotate}}deg);}"
    var rotate = 0
    var rotate_diff = 360 / character_list.length
    for (let n=1;n<=character_list.length;n++) {
        var current_character = character_list[n-1]
        console.log(`Setting up ${current_character}`)
        var clone = template.content.cloneNode(true)
        clone.querySelector("li > .character-token > .icon").src = urls[current_character]
        clone.querySelector("li > .character-token > svg > text > textPath").innerHTML = capitalize(current_character)

        if (current_character == "slayer") {
            clone.querySelector("li").id = "a"
        }
        
        document.getElementsByClassName("radial")[0].appendChild(clone)
        if (current_character == "slayer") {
            add_reminder("a", "drunk.drunk")
            add_reminder("a", "slayer.noability")
            add_reminder("a", "investigator.wrong")
        }
        
        var style_adjust_character = document.createElement("style")
        style_adjust_character.innerHTML = adjust_css_character.replaceAll("{{rotate}}", rotate).replaceAll("{{n}}", n)
        document.getElementById("radial-grid-adjust").appendChild(style_adjust_character)
        var style_adjust_reminders = document.createElement("style")
        style_adjust_reminders.innerHTML = adjust_css_reminders.replaceAll("{{rotate}}", rotate).replaceAll("{{n}}", n)
        document.getElementById("radial-grid-adjust").appendChild(style_adjust_reminders)
        var style_adjust_reminders_2 = document.createElement("style")
        style_adjust_reminders_2.innerHTML = adjust_css_reminders_2.replaceAll("{{rotate}}", rotate).replaceAll("{{n}}", n)
        document.getElementById("radial-grid-adjust").appendChild(style_adjust_reminders_2)
        rotate = rotate + rotate_diff //make next token be rotated
    }
}

var add_reminder = (player_name, reminder_id) => {
    const reminder_source = reminder_id.split(".")[0]
    const reminder_display = reminders[reminder_id]

    const template = document.getElementById("reminder-template")
    var clone = template.content.cloneNode(true)
    console.log(`Adding ${reminder_id} to ${player_name}`)
    clone.querySelector("li > .reminder-icon").src = urls[reminder_source]
    clone.querySelector("li > svg > text > textPath").innerHTML = reminder_display
    
    document.querySelector(`#${player_name} .reminders`).appendChild(clone)
}

var add_reminder_to = (player_name) => {

}


setup(["imp", "investigator", "poisoner", "drunk", "slayer", "ravenkeeper"])
// setup(["imp", "investigator", "poisoner", "drunk", "slayer"])
