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
    dewick_data = data['dewick'];
    for (var meal in data['dewick']){
        console.log(meal);
    }
}

var refresh_dining = function()
{
    $(".dining_loading").show();

    // $.getJSON('http://tuftsdiningapi.appspot.com/api/', function(data){
    //     console.log(data);
    //     foods = $.parseJSON(data);
    // });
    $.ajax({
        url: 'http://tuftsdiningapi.appspot.com/api/', 
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
