$(document).ready(function () {
    get_templates();
})

function get_templates() {
    $.ajax({
        url: "/get-template",
        type: "get",
        success: function (result) {
            fill_blanks(result.word)
        },
        error: function (result) {
            alert(result.responseJSON.message)
        }
    })
}

function fill_blanks(random_word) {
    //Make sure blanks are empty to begin with
    $("#blanks").empty();

    //Show blanks uisng <span>
    for (let i = 0; i < random_word.inputs; i++) {
        let input_html = `<span class="fill_blanks" id="input_${i}">_</span>`
        $("#blanks").append(input_html)
    }

    //Show Hint
    $("#hint").html(random_word.category)

    let game_over = false;
    
    //Fill blanks only if the character match is found
    $(".clickable").click(function () {
        let correct_guess = false;

        let id = $(this).attr("id");
        let life = parseInt($("#life").text());

        for (let i = 0; i < random_word.word.length; i++) {
            if (random_word.word.charAt(i).toLowerCase() === id) {
                if (life > 0 && ($(".fill_blanks").eq(i).html() === "_" || $(".fill_blanks").eq(i).html() === id)) {

                    $(".fill_blanks").eq(i).html(id);
                    correct_guess = true;

                    //Check if the word guess is complete
                    if ($("#blanks").text() === random_word.word.toLowerCase()) {
                        $("#result").text("You Win!!")
                        correct_guess = true;
                        game_over = true
                    }
                }
            }
        }

        if (life > 0 && correct_guess !== true && game_over !== true) {
            life = life - 1
            $("#life").text(life)
        } else if (life === 0) {
            $("#result").text("You Lost!!")
        }
    })
}
