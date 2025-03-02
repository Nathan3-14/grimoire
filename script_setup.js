var character_list = []

var setup_add_character = () => {
    var new_character_name = document.getElementById("setup-new-character-input").value
    character_list.push(new_character_name.replace(" ", "_"))
    document.querySelector("#game-setup-inputs > p").innerHTML = character_list.join(", ")
}

var start_game = () => {
    setup(character_list)
    document.getElementById("game-setup-inputs").style.visibility = "hidden"
}
