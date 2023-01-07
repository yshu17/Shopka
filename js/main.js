function RandomInt(min,max)
{
    return Math.floor(Math.random() * (max - min) ) + min
}
function PercentageСalс(value,percent)
{ 
    return parseInt(value, 10)-(parseInt(value, 10) / 100 * parseInt(percent, 10));
}
//pluguns JQ
$('.star-rating').rating(function(vote,event){    
    $(event.target).closest($('.interactive-container')).find($('.star-value')).text(vote);
}); //звездные рейтинг

$('.menu-accordion').click(function() {
  
    if ($(this).parent().find('ul').length) {
      $(this).parent().find('ul').slideToggle(500); 
      return false;
    }

  }); //слайдер для аккордиона

////

ReplaceImgToSvg("img.product-link__img");
ReplaceImgToSvg("img.sortby__img");
function ReplaceImgToSvg(className)
{
    jQuery(`${className}`).each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
    
            // Replace image with new SVG
            $img.replaceWith($svg);
    
        }, 'xml');
    
    });
}


TurnAccordion(document.querySelectorAll(".accordion__link"), true, "block");
TurnAccordion(document.querySelectorAll(".accordion__link2"), false, "block");
function TurnAccordion(array, isDisplayNone, displayType)
{
    for (let i = 0; i < array.length; i++) 
    {      
        if (isDisplayNone) {
            
            array.forEach(element => {
                element.nextElementSibling.style.display="none";
                element.style.margin ="5px 0 10px 10px";
            });
        }
        else
        {
            array.forEach(element => {
                element.nextElementSibling.style.display= displayType;
                element.nextElementSibling.style.margin ="0px 0 5px 10px";
               
            });
        }
        array[i].addEventListener("click", function(){
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.display !== displayType)
            {
                panel.style.display = displayType;
                panel.style.margin ="0px 0 5px 10px";
               
            } 
            else
            {
                panel.style.display = "none";   
            }     
        });   
    }
}

SetRandomRating(document.querySelectorAll(".star-rating"));
function SetRandomRating(listOfStarRating){
    for (let i = 0; i < listOfStarRating.length; i++) {
        let rndInputRating = listOfStarRating[i].querySelectorAll(".rating")[RandomInt(1,5)]; //Math.floor(Math.random() * (max - min) ) + min
        rndInputRating.checked = true; 
        for (let j = 0; j < rndInputRating.value; j++) {
        listOfStarRating[i].querySelectorAll(".star")[j].classList.add("fullStar");
        }
        listOfStarRating[i].closest(".interactive-container").querySelector(".star-value").textContent = rndInputRating.value;
    }
}

ShowActiveButton($(".sortby__link"));
ShowActiveButton($(".sortby__link2"));
function ShowActiveButton(listOfClass)
{
    for (let i = 0; i < listOfClass.length; i++) {
        listOfClass[i].addEventListener("click", function(){
            for (let i = 0; i < listOfClass.length; i++) {
                listOfClass[i].classList.remove("sortby--active");   
            }
            listOfClass[i].classList.add("sortby--active");
        });    
    }
}

SetRandomDiscount(document.querySelectorAll(".card__discount"))
function SetRandomDiscount(listOfDiscount)
{
    listOfDiscount.forEach(element => {
        element.style.display="none";
        element.textContent = RandomInt(5,90);
        listOfDiscount[RandomInt(0,listOfDiscount.length)].style.display="block"; 
    });
    for (let i = 0; i < listOfDiscount.length; i++) {
        if (listOfDiscount[i].style.display == "block") {
            let currentPrice =listOfDiscount[i].closest(".price-container").querySelector(".card__price");
            let currentDiscount = listOfDiscount[i].textContent;

            let newPrice = document.createElement("span");
            newPrice.className = "card__price--new";
            newPrice.classList.add("card__price");
            newPrice.innerHTML = `${PercentageСalс(currentPrice.textContent,currentDiscount)}`;
           
            currentPrice.parentNode.append(newPrice);
            currentPrice.style.textDecoration = "line-through"; currentPrice.style.opacity = "0.7";
        }
    }
}

TurnsBucketModal(document.getElementById("close-button"),document.getElementById("my-cart"))
function TurnsBucketModal(closeElement,openElement)
{
    closeElement.addEventListener("click",function(){
        if(document.querySelector(".bucket").style.display != "none")
            document.querySelector(".bucket").style.display = "none";
        
    })
    openElement.addEventListener("click",function(){ 
        document.querySelector(".bucket").style.display = "block";
    })
}

let menuBtn = document.querySelector(".burger-btn");
let menu = document.querySelector(".adapt2-container-RENAME");
menuBtn.addEventListener("click", function(){
	menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
}) //burger

let filterSliderbtn = document.querySelector(".filter-slider");
let aside = document.querySelector(".left");
filterSliderbtn.addEventListener("click", function(){
	filterSliderbtn.classList.toggle("active");
    aside.classList.toggle("active");
}) //burger

////////////////////////////////////////////////////////

var cardList = document.querySelectorAll(".card__item");
for (let i = 0; i < cardList.length; i++) {
    cardList[i].setAttribute("id",`card__item_${i}`);
}

var cardButtonList = $(".card__link");
var countOfProduct = $(".count-product");
var counter = countOfProduct.text();
countOfProduct.css("display","none");

for (let i = 0; i < cardButtonList.length; i++) {
    cardButtonList[i].addEventListener('click', function(){
        if(counter == 0)
        {
            countOfProduct.css("display","inline");
            countOfProduct.text(++counter);
        }
        else{
            countOfProduct.text(++counter);
        }
        let currentCardItem = cardButtonList[i].closest(".card__item");
    });
}





