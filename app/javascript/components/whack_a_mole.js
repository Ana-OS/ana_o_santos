const mole = window.addEventListener('load', () => {

  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const title = document.querySelector("h1");
  const subTitle = document.querySelector(".timeUp");
  const startBtn = document.querySelector(".start")
  let lastHole;
  let lockBoard = false;
  let score = 0;
  let peep;

  startBtn.addEventListener("click", startGame)

  moles.forEach(el => {el.addEventListener("click", whack)})
  const randomTime = ((min, max) => Math.round(Math.random() * (max - min) + min))

  function peepingMole(){
    if(lockBoard){
      let time = randomTime(200, 1000);
      let mole = holes[Math.floor(Math.random() * holes.length)];
      if(mole === lastHole){  return peepingMole(); }

      mole.classList.add("up");
      peep = setTimeout(() => {
        mole.classList.remove("up");
        peepingMole();
      }, time)
      lastHole = mole;
    }
  }

function startGame(){
  startBtn.removeEventListener("click", startGame)
  score = 0;
  scoreBoard.textContent = 0;
  title.classList.remove("hidden")
  subTitle.classList.add("hidden")
  lockBoard = true;
  setTimeout(function(){
    lockBoard = false;
    subTitle.classList.remove("hidden")
    title.classList.add("hidden")
     startBtn.addEventListener("click", startGame)
  }, 10000)
  peepingMole()
}

  function whack(e){
    if(!e.isTrusted){return}
      score +=1;
      this.classList.remove("up");
      scoreBoard.textContent = score;
  }

})

export { mole };
