$(document).ready(function() {
    
    let prevOriginal = './buttonImages/arrow-blue-right.png';
    let prevGrey = './buttonImages/arrow-gray-right.png';
    let nextOriginal = './buttonImages/arrow-blue-left.png';
    let nextGrey = './buttonImages/arrow-gray-left.png';

 
    let imagesArr = ["./images/slider-image-1.jpg","./images/slider-image-2.jpg", "./images/slider-image-3.jpg",
                    "./images/slider-image-4.jpg","./images/slider-image-5.jpg", "./images/slider-image-6.jpg",
                    "./images/slider-image-7.jpg","./images/slider-image-8.jpg","./images/slider-image-9.jpg" ];
    let mixedImagesArr = ["./images/slider-image-9.jpg","./images/slider-image-6.jpg", "./images/slider-image-7.jpg",
    "./images/slider-image-5.jpg","./images/slider-image-1.jpg", "./images/slider-image-2.jpg",
    "./images/slider-image-3.jpg","./images/slider-image-8.jpg","./images/slider-image-4.jpg"];
    let indexOfAnImage = 0;
    let mixedIndexOfAnImage = 0;
  
    $('#prev').hover(
        function() {
            $(this).find('img').attr('src', prevGrey);
            $(this).find('img').addClass('img-hover-right');
        },
        function() {
            $(this).find('img').attr('src', prevOriginal);
            $(this).find('img').removeClass('img-hover-right');
        }
    );

 
    $('#next').hover(
        function() {
            $(this).find('img').attr('src', nextGrey);
            $(this).find('img').addClass('img-hover');
        },
        function() {
            $(this).find('img').attr('src', nextOriginal);
            $(this).find('img').removeClass('img-hover');
        }
    );
   
    $('#next').on('click', function() {
        if(indexOfAnImage>8){
            indexOfAnImage=0;
        }
        let $ul = $('.gallery ul').first();
        var $secondGallery = $('.second-gallery');
        let $li = $('<li><img src="' + imagesArr[indexOfAnImage] + '" alt="" ></li>');
        $ul.append($li);
        let $newImage = $li.find('img');
        let currentImageWidth;
        $newImage.on('load', function() {
            currentImageWidth = $(this).width();
            $newImage.hide().fadeIn(500);
            let currentTranslateX = $ul.data('translate-x') || 0;
            let newTranslateX = currentTranslateX - (currentImageWidth + 5);
            $ul.css({
                 'transform': 'translateX(' + newTranslateX + 'px)',
                 'transition': 'transform 0.5s ease'
            });
     
            $ul.data('translate-x', newTranslateX);
            $secondGallery.css({
                'width':'486.5px'
            })
            indexOfAnImage++;
        });

        //Second row
        if(mixedIndexOfAnImage>8){
            mixedIndexOfAnImage=0;
        }
        var $secondUl = $('.second-gallery ul');
        console.log("Second ul: ",$secondUl);
        var $secondGallery = $('.second-gallery');
        var $secondLi = $('<li><img src="' + mixedImagesArr[mixedIndexOfAnImage] + '" alt="" ></li>');
        $secondUl.append($secondLi);
        var $newImageBottom = $secondLi.find('img');
        let currentImageWidthBottom;
        $newImageBottom.on('load', function() {
            currentImageWidthBottom = $(this).width();
            $newImageBottom.hide().fadeIn(500);
            var currentTranslateX = $secondUl.data('translate-x') || 0;
            var newTranslateX = currentTranslateX - (currentImageWidthBottom + 5);
            $secondUl.css({
                 'transform': 'translateX(' + newTranslateX + 'px)',
                 'transition': 'transform 0.5s ease'
            });
            $secondUl.data('translate-x', newTranslateX);
            $secondGallery.css({
                'width':'486.5px'
            })
            mixedIndexOfAnImage++;
        });
     
        
    });

    $('#prev').on('click', function() {
        if(indexOfAnImage>0){
            indexOfAnImage--;
        }
        if(mixedIndexOfAnImage>0){
            mixedIndexOfAnImage--;
        }
        var $ul = $('.gallery ul').first();
        var $lastLi = $ul.find('li:last');
        var lastLiWidth = $lastLi.width();
        var currentTranslateX = $ul.data('translate-x') || 0;
        var newTranslateX = currentTranslateX + (lastLiWidth+5 );
        if (newTranslateX <= 0) {
            $ul.css({
                'transform': 'translateX(' + newTranslateX + 'px)',
                'transition': 'transform 0.5 ease-out'
            });

            $ul.data('translate-x', newTranslateX);
            setTimeout(()=>{
                $lastLi.remove();
            },500)
            
        }
        var $secondUl = $('.second-gallery ul');
        var $secondLastLi = $secondUl.find('li:last');
        var secondLastLiWidth = $secondLastLi.width();
        var secondCurrentTranslateX = $secondUl.data('translate-x') || 0;
        var newSecondTranslateX = secondCurrentTranslateX + (secondLastLiWidth+5 );
        console.log("Second translate: ",newSecondTranslateX)
        if (newSecondTranslateX <= 0) {
            $secondUl.css({
                'transform': 'translateX(' + newSecondTranslateX + 'px)',
                'transition': 'transform 0.5s ease-out'
            });

            $secondUl.data('translate-x', newSecondTranslateX);
            setTimeout(()=>{
                $secondLastLi.remove();
            },500)
        }
    });
});
