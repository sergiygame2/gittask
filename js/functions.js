var i=0;
var productIsIn=false;
var prevNames=[];


var wasUkraine=false; 
//використовуємо цю змінну, щоб знати чи переглядали ми для України товари
//якщо ні, і вибираємо іншу країну, то нічого змінювати не будемо
//якщо Україна вже була, то при виборі іншої країни, повернемо попередні значення


//підрахунок загальної ціни
//якщо користувач додав в корзтну товар, який коштує більше мілярда (B), 
//то на товари які коштують тисячі (K) йому йде 100% знажка :)
var total=0;
$(document).ready(function(){
    var arr=$('.intPrice');
    $('.intPrice').each(function(){
        var type=$(this).attr("attr");
        if(type=="B")
            total+=parseInt($(this).attr("value")); 
    });
    $("#total-price").text(total+"B");
    $("#shopping-cart-badge").text(arr.length);
});
   
//приховування продукту в корзині при видаленні (просто візуальний ефект)
$(document).ready(function(){
    $(".glyphicon-remove").click(function(){
        $("#product"+$(this).attr("id")).hide();
        $("#shopping-cart-badge").text($("#shopping-cart-badge").text()-1);
    });
});

//перемикання кола при виборі розміру(кількості відділів компанії) під час покупки
var currentCircle="circleFirst";
$(document).ready(function(){
    $("svg").click(function(){
        $("#"+currentCircle).attr("stroke","none");
        currentCircle=$("#"+$(this).attr("id")+" circle").attr("id");
        $("#"+$(this).attr("id")+" circle").attr("stroke","black");
    });
});


//функція кожних 5 секунд на одному з 9 продуктів буде замінювати картинку
//потім повертати її на місце і замінювати на іншому продукті
var intervalID = window.setInterval(myCallback, 5000);
var lastSrc="img/google-1998.jpg";
var lastIndex=1;


function myCallback() {
    var goodIndex=false;
    $("#"+lastIndex).fadeIn(3000);
    $("#"+lastIndex).attr("src",lastSrc);
    while(!goodIndex)
    {
        var index=Math.floor((Math.random() * 9) + 1);
        if(index!=lastIndex)
            goodIndex=true;
    }
    lastIndex=index;
    lastSrc=$("#"+index).attr("src");
    $("#"+lastIndex).attr("src","img/flowdots.gif");
    $("#"+lastIndex).fadeOut(5000);   
}


//Додавання елементів до корзини
$(document).ready(function(){
   $("#addCart").click(function(){
        checkQuantity();
        $("#shopping-cart-badge").text(++i);
        $("#shopping-cart-badge").attr("style","visibility:visible");
    });
});
function checkQuantity(){
    if (i>4)
        alert("Don't be greedy! First pay!");
}

//Заміна головного зоображення
$(document).ready(function(){
    $(".img").click(function(){
        var image=$(this).attr("src");
        $("#mainPhoto").attr("src",image);
    })
});

//Зміна зображення при наведенні, повернення при відведенні мишки
$(document).ready(function(){
    $("#mainPhoto").hover(function(){
        $("#mainPhoto").attr("src","img/flowdots.gif");
    },
    function(){
        $("#mainPhoto").attr("src","img/google-product.jpg");
    });
});

//Шиппінг до України
$(document).ready(function(){
    $("select").click(function(){
        var x=$("select").val();
        var arr=$(".name");
        var j=0;
        if(x=="Ukraine" && !wasUkraine)
        {
            $.each(arr,function(index,value){
                if(index%2==0)
                {
                    prevNames[j++]=arr[index].innerHTML;
                    arr[index].innerHTML="Shipping to Ukraine";
                }
            });
            wasUkraine=true;
        }
        else if(x!="Ukraine" && wasUkraine){
            var j=0;
            if(wasUkraine){
                $.each(arr,function(index,value){
                    if(index%2==0)
                    {
                        arr[index].innerHTML=prevNames[j++];
                    }
                });
                wasUkraine=false;
            }
        }        
    });    
});

//Додаткова функція показатисховати інші продукти
$(document).ready(function(){
    $("#button1").click(function(){
        if($("#button1").text()=="More")
        {
            $("#blockID").show();
            $("#mainBlock").hide();
            $("#button1").text("Less");
        }
        else 
        {
            $("#blockID").hide();
            $("#mainBlock").show();
            $("#button1").text("More");
        }
    });
});

