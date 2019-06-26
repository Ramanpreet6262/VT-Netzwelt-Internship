var compareProducts = [];

var flag = 0;

$(document).ready(function () {

    // For creating main page products list layout i.e. group of cards showing phones and their specs.
    // Format used to create HTML content is first tag, then its attributes 
    // and then appending it to respective elements. Data is fetched from products array.
    for (var i = 0; i < products.length; i++) {
        $("<div />", {
            class: "col-sm-3",
            id: "col" + i
        }).appendTo("#productRow");
        $("<div />", {
            class: "card",
            id: "card" + i
        }).appendTo("#col" + i);
        $("<img />", {
            src: "../Assets/Images/" + products[i].image,
            class: "card-img-top",
            alt: products[i].image
        }).appendTo("#card" + i);
        $("<div />", {
            class: "card-body",
            id: "cardBody" + i
        }).appendTo("#card" + i);
        $("<h5 />", {
            class: "card-title",
            text: products[i].name
        }).appendTo("#cardBody" + i);
        $("<h6 />", {
            class: "card-subtitle mb-2 text-muted",
            text: products[i].price
        }).appendTo("#cardBody" + i);
        $("<ul />", {
            class: "feature-list",
            id: "ul" + i
        }).appendTo("#cardBody" + i);
        $("<li />", {
            text: products[i].ram
        }).appendTo("#ul" + i);
        $("<li />", {
            text: products[i].rom
        }).appendTo("#ul" + i);
        $("<li />", {
            text: products[i].display
        }).appendTo("#ul" + i);
        $("<li />", {
            text: products[i].battery
        }).appendTo("#ul" + i);
        $("<li />", {
            text: products[i].processor
        }).appendTo("#ul" + i);
        $("<input />", {
            type: "checkbox",
            id: "check" + i
        }).appendTo("#cardBody" + i);
        $("<label />", {
            text: "Add to Compare"
        }).appendTo("#cardBody" + i);
    }

    // On clicking checkbox, Add to compare.
    $(document).on("click", "input[type='checkbox']", function () {
        // Retrieving which checkbox is clicked through its id.
        var checkBoxId = $(this).attr("id");
        var index = checkBoxId.substr(5, 5);
        // Checking whether checkbox is checked or unchecked.
        // If checked then....
        if ($(this).is(":checked")) {
            // Checking that there should be atmost 3 products in comparison div.
            if (flag < 3) {
                // Creating product cards in comparison div.
                $("<div />", {
                    class: "compareCard",
                    id: "compareCard" + index
                }).appendTo("#compcarddiv");
                $("<label />", {
                    class: "delete",
                    html: '&times;',
                    id: index
                }).appendTo("#compareCard" + index);
                $("<img />", {
                    src: "../Assets/Images/" + products[index].image,
                    class: "compare-card-img",
                    alt: products[index].image
                }).appendTo("#compareCard" + index);
                $("<div />", {
                    class: "card-body",
                    id: "card-body" + index
                }).appendTo("#compareCard" + index);
                $("<h5 />", {
                    class: "card-title",
                    text: products[index].name
                }).appendTo("#card-body" + index);
                flag++;

                // Storing data of product to be displayed in comparison div in an object.
                var obj = {
                    name: products[index].name,
                    price: products[index].price,
                    ram: products[index].ram,
                    rom: products[index].rom,
                    display: products[index].display,
                    battery: products[index].battery,
                    processor: products[index].processor
                };
                // Storing data object in new array for comparison modal
                compareProducts.push(obj);
            } else {
                // If someone tries to check 4th checkbox
                // Error alert modal will be displayed
                $("#mymodal").show();
                // It will be hidden after 1.5 sec
                setTimeout(function () {
                    $("#mymodal").hide();
                }, 1500);
                // And checkbox will not be checked
                $(this).prop("checked", false);
            }

            // If more than one product is present in comparison div, show compare button
            if (flag >= 2) {
                $("#compareBtn").show();
            }

        } else {
            // If checkbox is unchecked then..
            // Deleting that product from comparison div
            $("#compareCard" + index).remove();
            flag--;
            // If products are less than 2, then hiding compare button
            if (flag < 2) {
                $("#compareBtn").hide();
            }
            // Deleting that product info from new array that is to be used for comparison modal
            for (var i = 0; i < compareProducts.length; i++) {
                if (products[index].name == compareProducts[i].name) {
                    compareProducts.splice(i, 1);
                }
            }
        }

    });

    // On clicking cross sign present on each card
    $(document).on("click", "label", function () {
        // Retrieving which cross is clicked through its id.
        var arrId = $(this).attr("id");
        // Deleting that product from comparison div
        $("#compareCard" + arrId).remove();
        // Unchecking its checkbox
        $("#check" + arrId).prop("checked", false);
        flag--;
        // If products are less than 2, then hiding compare button
        if (flag < 2) {
            $("#compareBtn").hide();
        }
        // Deleting that product info from new array that is to be used for comparison modal
        for (var i = 0; i < compareProducts.length; i++) {
            if (products[arrId].name == compareProducts[i].name) {
                compareProducts.splice(i, 1);
            }
        }
    });

    // On clicking compare button
    $("#compareBtn").click(function () {
        // Traversing new array and displaying products' specs on comparison modal
        for (var i = 0; i < compareProducts.length; i++) {
            $("<div />", {
                id: "compareList" + i
            }).appendTo("#compareModalBody");
            $("<h6 />", {
                text: compareProducts[i].name
            }).appendTo("#compareList" + i);
            $("<ul />", {
                id: "compareul" + i
            }).appendTo("#compareList" + i);
            $("<li />", {
                text: compareProducts[i].price
            }).appendTo("#compareul" + i);
            $("<li />", {
                text: compareProducts[i].ram
            }).appendTo("#compareul" + i);
            $("<li />", {
                text: compareProducts[i].rom
            }).appendTo("#compareul" + i);
            $("<li />", {
                text: compareProducts[i].display
            }).appendTo("#compareul" + i);
            $("<li />", {
                text: compareProducts[i].battery
            }).appendTo("#compareul" + i);
            $("<li />", {
                text: compareProducts[i].processor
            }).appendTo("#compareul" + i);
        }
        // After creating comparison modal, now showing it which was previously hidden
        $("#compareModal").show();
    });

    // On clicking close button of comparison modal, hiding comparison modal 
    //and deleting its content to prevent repetition.
    $("#btnClose").click(function () {
        $("#compareModal").hide();
        $("#compareModalBody").empty();
    });

    // On clicking cross sign of comparison modal, hiding comparison modal 
    //and deleting its content to prevent repetition.
    $("#btnCross").click(function () {
        $("#compareModal").hide();
        $("#compareModalBody").empty();
    });

});