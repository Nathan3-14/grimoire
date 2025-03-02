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
  

const default_names = ["Alice", "Bob", "Catherine", "Doug", "Elliot", "Fiona", "Gary", "Harry", "Imogen", "Jack", "Karen", "Lyra"]
shuffle(default_names)
const urls = {"imp": "https://wiki.bloodontheclocktower.com/images/5/5c/Icon_imp.png", "baron": "https://wiki.bloodontheclocktower.com/images/6/6d/Icon_baron.png", "scarletwoman": "https://wiki.bloodontheclocktower.com/images/1/13/Icon_scarletwoman.png", "spy": "https://wiki.bloodontheclocktower.com/images/5/54/Icon_spy.png", "poisoner": "https://wiki.bloodontheclocktower.com/images/b/b1/Icon_poisoner.png", "butler": "https://wiki.bloodontheclocktower.com/images/1/19/Icon_butler.png", "drunk": "https://wiki.bloodontheclocktower.com/images/4/4a/Icon_drunk.png", "recluse": "https://wiki.bloodontheclocktower.com/images/6/60/Icon_recluse.png", "saint": "https://wiki.bloodontheclocktower.com/images/c/c9/Icon_saint.png", "mayor": "https://wiki.bloodontheclocktower.com/images/a/a1/Icon_mayor.png", "soldier": "https://wiki.bloodontheclocktower.com/images/c/c3/Icon_soldier.png", "slayer": "https://wiki.bloodontheclocktower.com/images/d/d3/Icon_slayer.png", "virgin": "https://wiki.bloodontheclocktower.com/images/d/d3/Icon_virgin.png", "ravenkeeper": "https://wiki.bloodontheclocktower.com/images/e/ef/Icon_ravenkeeper.png", "monk": "https://wiki.bloodontheclocktower.com/images/7/7c/Icon_monk.png", "undertaker": "https://wiki.bloodontheclocktower.com/images/0/05/Icon_undertaker.png", "fortuneteller": "https://wiki.bloodontheclocktower.com/images/9/97/Icon_fortuneteller.png", "empath": "https://wiki.bloodontheclocktower.com/images/1/13/Icon_empath.png", "chef": "https://wiki.bloodontheclocktower.com/images/d/d5/Icon_chef.png", "investigator": "https://wiki.bloodontheclocktower.com/images/a/ad/Icon_investigator.png", "librarian": "https://wiki.bloodontheclocktower.com/images/e/e0/Icon_librarian.png", "washerwoman": "https://wiki.bloodontheclocktower.com/images/8/85/Icon_washerwoman.png"}
const reminders = {"imp.dead": "Dead", "drunk.drunk": "Drunk", "butler.master": "Master", "poisoner.poisoned": "Poisoned", "slayer.noability": "No Ability", "virgin.noability": "No Ability", "monk.protected": "Protected", "undertaker.executed": "Executed", "fortuneteller.redherring": "Red Herring", "investigator.wrong": "Wrong", "investigator.minion": "Minion", "librarian.wrong": "Wrong", "librarian.outsider": "Outsider", "washerwoman.wrong": "Wrong", "washerwoman.townsfolk": "Townsfolk"}

var setup_reminders = () => {
    const template = document.getElementById("reminder-button-template")
    for (var reminder_id in reminders) {
        console.log(reminder_id)
        var reminder_img_name = reminder_id.split(".")[0]
        console.log(reminder_img_name)
        console.log(urls[reminder_img_name])
        var reminder_text = reminders[reminder_id];

        var clone = template.content.cloneNode(true)
        clone.querySelector("button").setAttribute("onclick", `dialog_add_reminder("${reminder_id}")`)
        clone.querySelector("button > .reminder-icon").src = urls[reminder_img_name]
        clone.querySelector("button > svg > text > textPath").innerHTML = reminder_text
        player_modification_dialog.querySelector("#dialog-reminder-button-list").appendChild(clone)

      }

    //TODO DO SOMETHING HERE TODO//

}

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
        clone.querySelector("li").id = default_names[n-1]
        clone.querySelector("li > .player-button").innerHTML = default_names[n-1]
        clone.querySelector("li > .player-button").onclick = () => {
            player_modification_dialog.showModal()
            player_modification_dialog.querySelector("dialog > form > h2").innerHTML = default_names[n-1]
        }

        
        document.getElementsByClassName("radial")[0].appendChild(clone)
        
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
    
    setup_reminders()
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

var dialog_add_reminder = (reminder_id) => {
    var player_name = player_modification_dialog.querySelector("form > h2").innerHTML
    add_reminder(player_name, reminder_id)
    player_modification_dialog.querySelector("#dialog-extrainfo").innerHTML = ""
}

var dialog_change_name = () => {
    var player_name = player_modification_dialog.querySelector("form > h2").innerHTML
    var new_player_name = player_modification_dialog.querySelector("form > #newname-input").value

    var new_name_exists_check = document.getElementById(player_name);
    if (new_name_exists_check) {
        player_modification_dialog.querySelector("#dialog-extrainfo").innerHTML = `Player with name ${player_name} already exists`
        return
    }
    player_modification_dialog.querySelector("#dialog-extrainfo").innerHTML = ""

    document.querySelector(`#${player_name} > .player-button`).innerHTML = new_player_name
    document.querySelector(`#${player_name} > .player-button`).onclick = () => {
        player_modification_dialog.showModal()
        player_modification_dialog.querySelector("dialog > form > h2").innerHTML = new_player_name
    }
    document.querySelector(`#${player_name}`).id = new_player_name
}

var dialog_change_alivedead = () => {
    var player_name = player_modification_dialog.querySelector("form > h2").innerHTML
    var player_token_backgrounds = document.getElementById(player_name).getElementsByClassName("icon-background")
    
    if (player_token_backgrounds[0].style.visibility === 'hidden') {
        player_token_backgrounds[0].style.visibility = 'visible'; // Show the element
    } else {
        player_token_backgrounds[0].style.visibility = 'hidden'; // Hide the element
    }
    if (player_token_backgrounds[1].style.visibility === 'hidden') {
        player_token_backgrounds[1].style.visibility = 'visible'; // Show the element
    } else {
        player_token_backgrounds[1].style.visibility = 'hidden'; // Hide the element
    }
    
    // player_token_backgrounds[0].hidden = !(player_token_backgrounds[0].hidden)
    // player_token_backgrounds[1].hidden = !(player_token_backgrounds[1].hidden)
    player_modification_dialog.querySelector("#dialog-extrainfo").innerHTML = ""
}

var dialog_mark_for_execution = () => {
    var player_name = player_modification_dialog.querySelector("form > h2").innerHTML
    var player_execution_mark = document.getElementById(player_name).querySelector("i")
    var set_to = "visible"
    if (player_execution_mark.style.visibility == "visible") {
        console.log("Made hidden")
        set_to = "hidden"
    }
    document.querySelectorAll(".character").forEach(player => {
        player.querySelector("i").style.visibility = "hidden"
    });

    player_execution_mark.style.visibility = set_to
}


const player_modification_dialog = document.getElementById("player-modification");
const close_dialog_button = document.getElementById("close-dialog-button");

close_dialog_button.onclick = () => {
    player_modification_dialog.close()
}


// TEST PURPOSES ONLY //
// setup(["imp", "investigator", "poisoner", "drunk", "slayer", "ravenkeeper"])
setup(["imp", "investigator", "poisoner", "recluse", "slayer", "ravenkeeper", "fortuneteller", "washerwoman"])
// player_modification_dialog.showModal()