  const d = document;
  const $inputsPassword = d.querySelectorAll('input[type="password"]');
  const $allSpan = d.querySelectorAll('.form-span'), $btnSubmit = d.querySelector('.button-submit')
  const ArrayInput = Array.from($inputsPassword)

  //Elementos del formulario
  const $inputsText = d.querySelectorAll('input[type="text"]'),
    $inputsEmail = d.querySelectorAll('input[type="email"]'),
    $paragraphStrong = d.querySelector('.p-strong')
  //Mostrar contraseña
  const $checkMostrar = d.getElementById('check-pass'),
   $checkMostrarchilds = d.querySelector('.check-form');

  let $lastSpan = Array.from($allSpan)
    $lastSpan = $lastSpan[$lastSpan.length - 1]


// Click Event
  d.addEventListener('click', e => {
    console.log(e.target)
    
  //Boton Submit Eventhandler
  if(e.target === $btnSubmit){

  
    //Si el valor de los input password no coincide no puede enviar el formulario
    if( ArrayInput[0].value !== ArrayInput[1].value){
      e.preventDefault()
     
    }
  }


  //Mostrar constras check-toggle
  if(e.target === $checkMostrarchilds ){
    
    if($checkMostrar.checked === true){
      $checkMostrar.checked = false 
    }
    else{
      $checkMostrar.checked = true
    }
    tooglePassword($inputsPassword)
  }

  if(e.target === $checkMostrar){
    tooglePassword($inputsPassword)
  }
  
  })


  //Keydown Event
  d.addEventListener('keydown', e => {
    $inputsText.forEach( inputText => {
      if(e.target === inputText){
        // Validaciones front 
      }
    })

    
    if(e.target === ArrayInput[0]){
      if(ArrayInput[0].textContent.length < 4 ){
        $paragraphStrong.textContent = 'Contraseña muy debil' 
        $paragraphStrong.style.color = 'rgba(140, 135, 214, 0.9)'
        ArrayInput[0].classList.add('wrong')
      }
      
      
    }

  })


function tooglePassword(arrayInput){
  if(arrayInput[0].type === "password" || arrayInput[1].type === "password"){
    arrayInput.forEach(input => {
      input.type = "text"
     })
  }else{
    arrayInput.forEach(input => {
      input.type = "password"
    })
  }
}