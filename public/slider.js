export {next,interval}

const d = document,
$slider = d.querySelector('.carrusel'),
$sliderSections = d.querySelectorAll('.carrusel-section'),
$lastSliderSec = $sliderSections[$sliderSections.length - 1];

$slider.insertAdjacentElement('afterbegin', $lastSliderSec);

function next(){
  
    let $firstSliderSec = d.querySelectorAll('.carrusel-section')[0];
    $slider.style.marginLeft = '-200%'
    $slider.style.transition = 'all .5s ease';
    setTimeout(function() {
      $slider.style.transition = 'none';
      $slider.insertAdjacentElement('beforeend', $firstSliderSec);
      $slider.style.marginLeft = "-100%";
    }, 500)
 }

 const interval = setInterval(() => {
   next()
 }, 5000);