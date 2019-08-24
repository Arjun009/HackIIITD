$slideShow = document.getElementById('slide-show');

setInterval(()=>{
  $slideShow.classList.remove('activate');
  setTimeout(()=>{
    $slideShow.classList.add('activate');
  },10);
},14500);
