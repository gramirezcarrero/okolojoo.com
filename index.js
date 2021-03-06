var width = window.innerWidth;
var height = window.innerHeight;
var imageSelected = false
var stage = new Konva.Stage({
    container: 'canvas',
    width: 1500,
    height: 1500
});
let LOGO = 'white'
$(".miror").on("change", function () {
    LOGO = $("input:checked").attr("id")
    if (LOGO === "logo2") {
        $("#widthSelected").val(200)
        $("#heightSelected").val(200)
    } else if (LOGO === "white" || LOGO === "marca2") {
        $("#widthSelected").val(500)
        $("#heightSelected").val(305)
    }
})
var imageObj
var Logo
function changeLogo(e) {
    if (imageSelected === true) {
        LOGO = $(e).attr("id")
        if (LOGO === "white" || LOGO === "marca2") {
            $("#widthSelected").val(500)
            $("#heightSelected").val(305)
        } else if (LOGO === 'logocaliche') {
            $("#widthSelected").val(500)
            $("#heightSelected").val(500)
        }
        else if (LOGO === 'sai') {
            $("#widthSelected").val(300)
            $("#heightSelected").val(300)
        }
        imageObj.src = LOGO + '.png';
        var widthSelected = $("#widthSelected").val()
        var heightSelected = $("#heightSelected").val()

        imageObj.onload = function () {
            drawImage(this, widthSelected, heightSelected);
        };
    }
}
var layer = new Konva.Layer();
stage.add(layer);
function drawImage(_imageObj, width, height) {
    let log = function () {
        Logo = new Konva.Image({
            image: _imageObj,
            x: 0,
            y: 0,
            width,
            height,
            draggable: true
        });

        // add cursor styling
        Logo.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        Logo.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        // Logo.cache();
        layer.add(Logo);
        layer.draw()


    }
    // debugger
    if (Logo === undefined) {
        log()
    } else {
        Logo.destroy()
        log()
    }

}
// var slider = document.getElementById('slider');
var opacity_ = document.getElementById('slider');
var tamano = document.getElementById('slider1');
var ancho_ = document.getElementById('slider2');
var alto_ = document.getElementById('slider3');

opacity_.oninput = function () {
    Logo.opacity(parseFloat(opacity_.value));
    layer.batchDraw()
};
tamano.oninput = function () {
    Logo.width(Number(tamano.value));
    Logo.height(Number(tamano.value));
    layer.batchDraw()
};
ancho_.oninput = function () {
    Logo.width(Number(ancho_.value));

    layer.batchDraw()
};
alto_.oninput = function () {
    Logo.height(Number(alto_.value));
    layer.batchDraw()
};
$("#widthSelected").val()

$("#file_input").change(function (e) {

    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.src = url;
    img.onload = function () {
        var draggable__;
        if ($("#mover").val() === "Mover") {
            draggable__ = true
        }
        else {
            draggable__ = false
        }
        var img_width = img.width;
        var img_height = img.height;
        img_width < 1500 ? stage.width(img_width) : 1500
        img_height < 1500 ? stage.height(img_height) : 1500
        stage.width(img_width)
        stage.height(img_height)
        // now load the Konva image
        var theImg = new Konva.Image({
            image: img,
            x: 0,
            y: 0,
            width: img_width,
            height: img_height,
            draggable: draggable__
        });

        layer.add(theImg);
        layer.draw();

        imageObj = new Image();

        imageObj.src = LOGO + '.png';
        var widthSelected = $("#widthSelected").val()
        var heightSelected = $("#heightSelected").val()

        imageObj.onload = function () {
            drawImage(this, widthSelected, heightSelected);
        };
        imageSelected = true
    }


});
download_img = function (el) {
    var image = stage.toDataURL();
    el.href = image;
};
var restartButton = function () {
    window.location.reload()
}