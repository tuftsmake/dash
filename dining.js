// Dining.js - gets dining data for dewick and carm

function build_dining_preview(data){
    $(".dining_loading").hide();
    dewick_entrees = data['dewick']['Dinner']['Dinner Entrees'];
    dewick_entrees.forEach(function(elem){
        $('<tr><td class="dining_menu_item">' + elem + '</td></tr>').appendTo("#dewick_table");
    })
    carm_entrees = data['carm']['Dinner']['Dinner Entrees'];
    carm_entrees.forEach(function(elem){
       $('<tr><td class="dining_menu_item">' + elem + '</td></tr>').appendTo("#carm_table");
    })
}  

function build_dining_full_bubble(data){
    $(".meal_name").click(function(){
        $(".selected_meal").removeClass("selected_meal");
        $(this).addClass("selected_meal");
        $(".foodlist").hide()
        $("#" + $(this).html().toLowerCase() + "_list").show()
    });
    dewick_data = data['dewick'];
    meals = ["Breakfast", "Lunch", "Dinner"];
    for (var meal in meals){
        meal_name = meals[meal]
        meal_list_id = "#" + meal_name.toLowerCase() + "_list";
        for (var category in data['dewick'][meal_name]) {
            $('<h4>' + category.toUpperCase() +'</h4>').appendTo(meal_list_id);
            for (var item in data['dewick'][meal_name][category]) {
                $('<h5>' + data['dewick'][meal_name][category][item] + '</h5>').appendTo(meal_list_id);
            }
        }
    }
    $("#lunch_list").hide();
    $("#dinner_list").hide();
}



var refresh_dining = function()
{
    $(".dining_loading").show();

    // $.getJSON('http://tuftsdiningapi.appspot.com/api/', function(data){
    //     console.log(data);
    //     foods = $.parseJSON(data);
    // });
    $.ajax({
        url: 'https://tuftsdiningapi.appspot.com/api/', 
        success: function(data){
                    build_dining_preview(data);
                    build_dining_full_bubble(data);
                },

        error: function(data){
                    $(".dining_loading").value = "Failed to load"
              }
    });
}

$(document).ready(refresh_dining);
