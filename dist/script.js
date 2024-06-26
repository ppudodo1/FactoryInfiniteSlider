"use strict";

$(document).ready(function () {
  var prevOriginal = './buttonImages/arrow-blue-right.png';
  var prevGrey = './buttonImages/arrow-gray-right.png';
  var nextOriginal = './buttonImages/arrow-blue-left.png';
  var nextGrey = './buttonImages/arrow-gray-left.png';
  var imagesArr = ["./images/slider-image-1.jpg", "./images/slider-image-7.jpg", "./images/slider-image-3.jpg", "./images/slider-image-4.jpg", "./images/slider-image-5.jpg", "./images/slider-image-6.jpg", "./images/slider-image-2.jpg", "./images/slider-image-8.jpg", "./images/slider-image-9.jpg"];
  var mixedImagesArr = ["./images/slider-image-9.jpg", "./images/slider-image-6.jpg", "./images/slider-image-7.jpg", "./images/slider-image-5.jpg", "./images/slider-image-1.jpg", "./images/slider-image-2.jpg", "./images/slider-image-3.jpg", "./images/slider-image-8.jpg", "./images/slider-image-4.jpg"];
  var indexOfAnImage = 0;
  var mixedIndexOfAnImage = 0;
  var leftImagesIndex = 0;
  var leftBottomImagesIndex = 0;
  function disableButtons() {
    $('#prev, #next').prop('disabled', true);
    setTimeout(function () {
      $('#prev, #next').prop('disabled', false);
    }, 500);
  }
  $('#prev').hover(function () {
    $('#prev').find('img').attr('src', prevGrey).addClass('img-hover-right');
  }, function () {
    $('#prev').find('img').attr('src', prevOriginal).removeClass('img-hover-right');
  });
  $('#next').hover(function () {
    $('#next').find('img').attr('src', nextGrey).addClass('img-hover');
  }, function () {
    $('#next').find('img').attr('src', nextOriginal).removeClass('img-hover');
  });
  $('#next').on('click', function () {
    disableButtons();
    if (indexOfAnImage > 8) {
      indexOfAnImage = 0;
    }
    var $ul = $('.gallery ul').first();
    var $bottomGallery = $('.bottom-gallery');
    var $li = $("<li><img src=\"".concat(imagesArr[indexOfAnImage], "\" alt=\"\"></li>"));
    $ul.append($li);
    var $newImage = $li.find('img');
    var currentImageWidth;
    $newImage.on('load', function () {
      currentImageWidth = $newImage.width();
      $newImage.hide().fadeIn(500);
      var currentTranslateX = $ul.data('translate-x') || 0;
      var newTranslateX = currentTranslateX - (currentImageWidth + 10);
      $ul.css({
        'transform': "translateX(".concat(newTranslateX, "px)"),
        'transition': 'transform 0.5s ease'
      }).data('translate-x', newTranslateX);
      $bottomGallery.css('width', '880px');
      indexOfAnImage++;
    });
    if (mixedIndexOfAnImage > 8) {
      mixedIndexOfAnImage = 0;
    }
    var $bottomUl = $('.bottom-gallery ul');
    var $bottomLi = $("<li><img src=\"".concat(mixedImagesArr[mixedIndexOfAnImage], "\" alt=\"\"></li>"));
    $bottomUl.append($bottomLi);
    var $newImageBottom = $bottomLi.find('img');
    var currentImageWidthBottom;
    $newImageBottom.on('load', function () {
      currentImageWidthBottom = $newImageBottom.width();
      $newImageBottom.hide().fadeIn(500);
      var currentTranslateX = $bottomUl.data('translate-x') || 0;
      var newTranslateX = currentTranslateX - (currentImageWidthBottom + 10);
      $bottomUl.css({
        'transform': "translateX(".concat(newTranslateX, "px)"),
        'transition': 'transform 0.5s ease'
      }).data('translate-x', newTranslateX);
      $bottomGallery.css('width', '880px');
      mixedIndexOfAnImage++;
    });
  });
  $('#prev').on('click', function () {
    disableButtons();
    if (indexOfAnImage > 0) {
      indexOfAnImage--;
    }
    if (mixedIndexOfAnImage > 0) {
      mixedIndexOfAnImage--;
    }
    if (leftImagesIndex > 8) {
      leftImagesIndex = 0;
    }
    var imagesWidth = [-270, -190, -190, -230, -270, -130, -130, -190, -230];
    var $ul = $('.gallery ul').first();
    var ulTransition = $ul.css('transition');
    if (ulTransition && ulTransition !== 'none') {
      $ul.css('transition', 'none');
    }
    var $lastLi = $ul.find('li:last');
    var lastLiWidth = $lastLi.width();
    var currentTranslateX = $ul.data('translate-x') || 0;
    var $li = $("<li><img  src=\"".concat(imagesArr[leftImagesIndex], "\" alt=\"\"></li>"));
    $ul.prepend($li);
    $ul.css({
      'transform': "translateX(".concat(currentTranslateX + imagesWidth[leftImagesIndex], "px)")
    });
    setTimeout(function () {
      $ul.css({
        'transform': "translateX(".concat(currentTranslateX + imagesWidth[leftImagesIndex] + lastLiWidth + 10, "px)"),
        'transition': 'transform 0.5s ease-out'
      }).data('translate-x', currentTranslateX + imagesWidth[leftImagesIndex] + lastLiWidth + 10);
      leftImagesIndex++;
    }, 1);
    setTimeout(function () {
      $lastLi.remove();
    }, 500);
    if (leftBottomImagesIndex > 8) {
      leftBottomImagesIndex = 0;
    }
    var imagesBottomWidth = [-230, -130, -190, -270, -270, -130, -190, -190, -230];
    var $ulBottom = $('.bottom-gallery ul');
    var ulBottomTransition = $ulBottom.css('transition');
    if (ulBottomTransition && ulBottomTransition !== 'none') {
      $ulBottom.css('transition', 'none');
    }
    var $lastBottomLi = $ulBottom.find('li:last');
    var lastBottomLiWidth = $lastBottomLi.width();
    var currentBottomTranslateX = $ulBottom.data('translate-x') || 0;
    var $liBottom = $("<li><img  src=\"".concat(mixedImagesArr[leftBottomImagesIndex], "\" alt=\"\"></li>"));
    $ulBottom.prepend($liBottom);
    $ulBottom.css({
      'transform': "translateX(".concat(currentBottomTranslateX + imagesBottomWidth[leftBottomImagesIndex], "px)")
    });
    setTimeout(function () {
      $ulBottom.css({
        'transform': "translateX(".concat(currentBottomTranslateX + imagesBottomWidth[leftBottomImagesIndex] + lastBottomLiWidth + 10, "px)"),
        'transition': 'transform 0.5s ease-out'
      }).data('translate-x', currentBottomTranslateX + imagesBottomWidth[leftBottomImagesIndex] + lastBottomLiWidth + 10);
      leftBottomImagesIndex++;
    }, 1);
    setTimeout(function () {
      $lastBottomLi.remove();
    }, 500);
  });
});