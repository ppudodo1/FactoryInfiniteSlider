$(document).ready(() => {
    const prevOriginal = './buttonImages/arrow-blue-right.png';
    const prevGrey = './buttonImages/arrow-gray-right.png';
    const nextOriginal = './buttonImages/arrow-blue-left.png';
    const nextGrey = './buttonImages/arrow-gray-left.png';

    const imagesArr = [
        "./images/slider-image-1.jpg", "./images/slider-image-2.jpg", "./images/slider-image-3.jpg",
        "./images/slider-image-4.jpg", "./images/slider-image-5.jpg", "./images/slider-image-6.jpg",
        "./images/slider-image-7.jpg", "./images/slider-image-8.jpg", "./images/slider-image-9.jpg"
    ];
    
    const mixedImagesArr = [
        "./images/slider-image-9.jpg", "./images/slider-image-6.jpg", "./images/slider-image-7.jpg",
        "./images/slider-image-5.jpg", "./images/slider-image-1.jpg", "./images/slider-image-2.jpg",
        "./images/slider-image-3.jpg", "./images/slider-image-8.jpg", "./images/slider-image-4.jpg"
    ];
    
    let indexOfAnImage = 0;
    let mixedIndexOfAnImage = 0;

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
        const $secondGallery = $('.second-gallery');
        const $li = $(`<li><img src="${imagesArr[indexOfAnImage]}" alt=""></li>`);
        $ul.append($li);

        const $newImage = $li.find('img');
        let currentImageWidth;
        
        $newImage.on('load', () => {
            currentImageWidth = $newImage.width();
            $newImage.hide().fadeIn(500);

            let currentTranslateX = $ul.data('translate-x') || 0;
            let newTranslateX = currentTranslateX - (currentImageWidth+5);
            
            $ul.css({
                'transform': `translateX(${newTranslateX}px)`,
                'transition': 'transform 0.5s ease'
            }).data('translate-x', newTranslateX);

            $secondGallery.css('width', '880px');
            indexOfAnImage++;
        });

        if (mixedIndexOfAnImage > 8) {
            mixedIndexOfAnImage = 0;
        }

        const $secondUl = $('.second-gallery ul');
        const $secondLi = $(`<li><img src="${mixedImagesArr[mixedIndexOfAnImage]}" alt=""></li>`);
        $secondUl.append($secondLi);

        const $newImageBottom = $secondLi.find('img');
        let currentImageWidthBottom;

        $newImageBottom.on('load', () => {
            currentImageWidthBottom = $newImageBottom.width();
            $newImageBottom.hide().fadeIn(500);

            let currentTranslateX = $secondUl.data('translate-x') || 0;
            let newTranslateX = currentTranslateX - (currentImageWidthBottom + 5);

            $secondUl.css({
                'transform': `translateX(${newTranslateX}px)`,
                'transition': 'transform 0.5s ease'
            }).data('translate-x', newTranslateX);

            $secondGallery.css('width', '880px');
            mixedIndexOfAnImage++;
        });
    });

    $('#prev').on('click', () => {
        disableButtons();

        if (indexOfAnImage > 0) {
            indexOfAnImage--;
        }

        if (mixedIndexOfAnImage > 0) {
            mixedIndexOfAnImage--;
        }

        const $ul = $('.gallery ul').first();
        const $lastLi = $ul.find('li:last');
        const lastLiWidth = $lastLi.width();
        let currentTranslateX = $ul.data('translate-x') || 0;
        let newTranslateX = currentTranslateX + (lastLiWidth + 5);

        if (newTranslateX <= 0) {
            $ul.css({
                'transform': `translateX(${newTranslateX}px)`,
                'transition': 'transform 0.5s ease-out'
            }).data('translate-x', newTranslateX);

            setTimeout(() => {
                $lastLi.remove();
            }, 500);
        }

        const $secondUl = $('.second-gallery ul');
        const $secondLastLi = $secondUl.find('li:last');
        const secondLastLiWidth = $secondLastLi.width();
        let secondCurrentTranslateX = $secondUl.data('translate-x') || 0;
        let newSecondTranslateX = secondCurrentTranslateX + (secondLastLiWidth + 5);

        if (newSecondTranslateX <= 0) {
            $secondUl.css({
                'transform': `translateX(${newSecondTranslateX}px)`,
                'transition': 'transform 0.5s ease-out'
            }).data('translate-x', newSecondTranslateX);

            setTimeout(() => {
                $secondLastLi.remove();
            }, 500);
        }
    });
});
