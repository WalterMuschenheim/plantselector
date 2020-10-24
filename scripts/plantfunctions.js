function addCards(list, rows, tips) {

    if (tips != undefined) {
        var position = Math.floor((Math.random() * list.length));
        for (i = 0; i < tips.length; i++) {
            list.splice((position + i*3), 0, tips[i])
        };
    };

    var cards = "";
    if (rows) {
        cards = "<div class='row row-cols-1 row-cols-md-3'>";
    } else {
        cards = "<div class='card-columns'>";
    };
    for (i = 0; i < list.length; i++) {
        if (rows == true) {
            cards += '<div class="col mb-4">';
        };
        cards += '<div class="card';
        if (list[i].imageURL) {cards += ' plant-type" data-i="' + i + '"><img class="card-img-top" src="' + list[i].imageURL + '" alt="">';}
        else {cards +=' explainer">'};
        cards += '<div class="card-body"> <h5 class="card-title">' +  list[i].name + '</h5> <p class="card-text">' + list[i].description + '</p>';
        //if (list[i].imageURL) {cards += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#plantModal" data-i="' + i + '">Learn More</button>'};
        cards += '</div> <span class="keywords" style="display: none;">' + list[i].keywords + '</span> <span class="height" style="display: none;">' + list[i].height + '</span> <span class="light" style="display: none;">' + list[i].light + '</span> <span class="care" style="display: none;">' + list[i].care + '</span> </div>';
        if (rows == true) {
            cards += '</div>';
        };
     };

    document.getElementById("plantlist-inner").innerHTML = cards += "</div>";
};

addCards(plants, false, explainers);

$('.carousel').carousel({interval: 99999999});

$('.carousel-care-link').on('click', function() {
    $('.carousel').carousel(1);
});

$('.carousel-light-link').on('click', function() {
    $('.carousel').carousel(2);
});

$('.carousellinkhome').on('click', function() {
    $('.carousel').carousel(0);
});

$(function () {
    $('[data-toggle="popover"]').popover()
});

$('.popover-dismiss').popover({
    trigger: 'focus'
});

$('.plant-type').on('click', function() {
    var integer = $(this).data('i');
    $('#plantModal').modal('toggle');
    
    //var button = $(event.relatedTarget);
    //var integer = button.data('i');
    var title = plants[integer].name;
    var content = plants[integer].longDescription;
    var image = plants[integer].imageURL;
    var light = plants[integer].light;
    var height = plants[integer].height;
    var care = plants[integer].care;

    $('#plantModal').find('.modal-title').html(title);
    $('#plantModal').find('#modal-content-container').html('<p>' + content + '</p>');
    $('#plantModal').find('.modal-popover.top a').attr('data-content', light);
    $('#plantModal').find('.modal-popover.middle a').attr('data-content', height);
    $('#plantModal').find('.modal-popover.bottom a').attr('data-content', care);
    $('#plantModal').find('#modal-image-container').html('<img src="' + image + '" alt="' + title + '" class="img-fluid">');

})

/*$('#plantModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var integer = button.data('i');
        var title = plants[integer].name;
        var content = plants[integer].longDescription;
        var image = plants[integer].imageURL;
        var light = plants[integer].light;
        var height = plants[integer].height;
        var care = plants[integer].care;

        $('#plantModal').find('.modal-title').html(title);
        $('#plantModal').find('#modal-content-container').html('<p>' + content + '</p>');
        $('#plantModal').find('.modal-popover.top a').attr('data-content', light);
        $('#plantModal').find('.modal-popover.middle a').attr('data-content', height);
        $('#plantModal').find('.modal-popover.bottom a').attr('data-content', care);
        $('#plantModal').find('#modal-image-container').html('<img src="' + image + '" alt="' + title + '" class="img-fluid">');
    });*/

function plantfilter() {
    var value = $("#plantsearch").val().toLowerCase();
    var pheight = $("#plantheight").val().toLowerCase();
    var plight = $("#plantlight").val().toLowerCase();
    var pcare = $("#plantcare").val().toLowerCase();
    
    $("#plantlist .card").filter(function() {
        var cardValue = $(this).children(".keywords").text().toLowerCase();
        cardValue += $(this).find(".card-title").text().toLowerCase();
        $(this).toggle($(this).children(".height").text().toLowerCase().indexOf(pheight) > -1 && $(this).children(".light").text().toLowerCase().indexOf(plight) > -1 && $(this).children(".care").text().toLowerCase().indexOf(pcare) > -1 && cardValue.indexOf(value) > -1)
    });
}

$(document).ready(function(){
    $("#plantsearch").on("keyup", function() {
        plantfilter();
    });

    $("select").on("change", function() {
        plantfilter();
    });
});