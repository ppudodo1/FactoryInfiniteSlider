$(document).ready(() => {
    const prevOriginal = './buttonImages/arrow-blue-right.png';
    const prevGrey = './buttonImages/arrow-gray-right.png';
    const nextOriginal = './buttonImages/arrow-blue-left.png';
    const nextGrey = './buttonImages/arrow-gray-left.png';

    const imagesArr = [
        "./images/slider-image-1.jpg", "./images/slider-image-7.jpg", "./images/slider-image-3.jpg",
        "./images/slider-image-4.jpg", "./images/slider-image-5.jpg", "./images/slider-image-6.jpg",
        "./images/slider-image-2.jpg", "./images/slider-image-8.jpg", "./images/slider-image-9.jpg"
    ];
    
    const mixedImagesArr = [
        "./images/slider-image-9.jpg", "./images/slider-image-6.jpg", "./images/slider-image-7.jpg",
        "./images/slider-image-5.jpg", "./images/slider-image-1.jpg", "./images/slider-image-2.jpg",
        "./images/slider-image-3.jpg", "./images/slider-image-8.jpg", "./images/slider-image-4.jpg"
    ];
    let indexOfAnImage = 0;
    let mixedIndexOfAnImage = 0;
    let leftImagesIndex = 0;
    let leftBottomImagesIndex = 0;
    function disableButtons() {
        $('#prev, #next').prop('disabled', true);
        setTimeout(() => {
            $('#prev, #next').prop('disabled', false);
        }, 500);
    }
    $('#prev').hover(
        () => {
            $('#prev').find('img').attr('src', prevGrey).addClass('img-hover-right');
        },
        () => {
            $('#prev').find('img').attr('src', prevOriginal).removeClass('img-hover-right');
        }
    );
    $('#next').hover(
        () => {
            $('#next').find('img').attr('src', nextGrey).addClass('img-hover');
        },
        () => {
            $('#next').find('img').attr('src', nextOriginal).removeClass('img-hover');
        }
    );

    $('#next').on('click', () => {
        disableButtons();
        if (indexOfAnImage > 8) {
            indexOfAnImage = 0;
        }
        const $ul = $('.gallery ul').first();
        const $bottomGallery = $('.bottom-gallery');
        const $li = $(`<li><img src="${imagesArr[indexOfAnImage]}" alt=""></li>`);
        $ul.append($li);
        const $newImage = $li.find('img');
        let currentImageWidth;
        $newImage.on('load', () => {
            currentImageWidth = $newImage.width();
            $newImage.hide().fadeIn(500);
            let currentTranslateX = $ul.data('translate-x') || 0;
            let newTranslateX = currentTranslateX - (currentImageWidth+10);
            $ul.css({
                'transform': `translateX(${newTranslateX}px)`,
                'transition': 'transform 0.5s ease'
            }).data('translate-x', newTranslateX);
            $bottomGallery.css('width', '880px');
            indexOfAnImage++;
        });
        if (mixedIndexOfAnImage > 8) {
            mixedIndexOfAnImage = 0;
        }
        const $bottomUl = $('.bottom-gallery ul');
        const $bottomLi = $(`<li><img src="${mixedImagesArr[mixedIndexOfAnImage]}" alt=""></li>`);
        $bottomUl.append($bottomLi);
        const $newImageBottom = $bottomLi.find('img');
        let currentImageWidthBottom;
        $newImageBottom.on('load', () => {
            currentImageWidthBottom = $newImageBottom.width();
            $newImageBottom.hide().fadeIn(500);
            let currentTranslateX = $bottomUl.data('translate-x') || 0;
            let newTranslateX = currentTranslateX - (currentImageWidthBottom + 10);
            $bottomUl.css({
                'transform': `translateX(${newTranslateX}px)`,
                'transition': 'transform 0.5s ease'
            }).data('translate-x', newTranslateX);
            $bottomGallery.css('width', '880px');
            mixedIndexOfAnImage++;
        });
    });
   
    $('#prev').on('click', () => {
        disableButtons();
        if(indexOfAnImage>0){
            indexOfAnImage--;
        }
        if(mixedIndexOfAnImage>0){
            mixedIndexOfAnImage--;
        }
        if(leftImagesIndex>8){
            leftImagesIndex=0;
        }
        let imagesWidth = [-270,-190,-190,-230,-270,-130,-130,-190,-230];
        const $ul = $('.gallery ul').first();
        const ulTransition = $ul.css('transition');
        if (ulTransition && ulTransition !== 'none') {
            $ul.css('transition', 'none');
        }
        const $lastLi = $ul.find('li:last');
        const lastLiWidth = $lastLi.width();
        let currentTranslateX = $ul.data('translate-x') || 0;
        const $li = $(`<li><img  src="${imagesArr[leftImagesIndex]}" alt=""></li>`);
        $ul.prepend($li)
        $ul.css({
            'transform': `translateX(${currentTranslateX+imagesWidth[leftImagesIndex]}px)`,
        })
        setTimeout(()=>{
            $ul.css({
                'transform': `translateX(${((currentTranslateX+imagesWidth[leftImagesIndex])+lastLiWidth)+10}px)`,
                'transition': 'transform 0.5s ease-out'
            }).data('translate-x', ((currentTranslateX+imagesWidth[leftImagesIndex])+lastLiWidth)+10);
            leftImagesIndex++;
        },1)
        setTimeout(()=>{
            $lastLi.remove();
        },500)
      
        if(leftBottomImagesIndex>8){
            leftBottomImagesIndex=0;
        }   
        let imagesBottomWidth = [-230,-130,-190,-270,-270,-130,-190,-190,-230];
        const $ulBottom = $('.bottom-gallery ul');
        const ulBottomTransition = $ulBottom.css('transition');
        if (ulBottomTransition && ulBottomTransition !== 'none') {
            $ulBottom.css('transition', 'none');
        }
        const $lastBottomLi = $ulBottom.find('li:last');
        const lastBottomLiWidth = $lastBottomLi.width();
        let currentBottomTranslateX = $ulBottom.data('translate-x') || 0;
        const $liBottom = $(`<li><img  src="${mixedImagesArr[leftBottomImagesIndex]}" alt=""></li>`);
        $ulBottom.prepend($liBottom);
        $ulBottom.css({
            'transform' : `translateX(${currentBottomTranslateX+imagesBottomWidth[leftBottomImagesIndex]}px)`,
        })
        setTimeout(()=>{
            $ulBottom.css({
                'transform' : `translateX(${((currentBottomTranslateX+imagesBottomWidth[leftBottomImagesIndex])+lastBottomLiWidth)+10}px)`,
                'transition': 'transform 0.5s ease-out'
            }).data('translate-x',((currentBottomTranslateX+imagesBottomWidth[leftBottomImagesIndex])+lastBottomLiWidth)+10)
            leftBottomImagesIndex++;
        },1)
        setTimeout(()=>{
            $lastBottomLi.remove();
        },500)
    });
});