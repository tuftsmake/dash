// Dining.js - gets dining data for dewick and carm

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
                    $(".dining_loading").hide();
                    // foods = $.parseJSON(data);
                    dentrees = data['dewick']['Dinner']['Dinner Entrees'];
                    dentrees.forEach(function(elem){
                       $( '<tr><td class="dining_menu_item">' + elem + "</td></tr>" ).appendTo("#dewick_table");
                    })
                    $("<br>").appendTo("#")
                    centrees = data['carm']['Dinner']['Dinner Entrees'];
                    centrees.forEach(function(elem){
                       $( '<tr><td class="dining_menu_item">' + elem + "</td></tr>" ).appendTo("#carm_table");
                    })
                }
    });
}  

var populate_dining = function() {

}

$(document).ready(refresh_dining);
$("#dining").click(populate_dining);