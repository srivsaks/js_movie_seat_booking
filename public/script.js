const container=document.querySelector(".container");
const allSeats=document.querySelectorAll(".row .seat:not(.occupied)")
const seats=document.getElementById("count");
const price=document.getElementById("total");
const movieSelect=document.getElementById("movie");
let moviePrice=+movieSelect.value;

container.addEventListener("click",handleSeatSelection)
movieSelect.addEventListener("change",handleMovieChange);

populateUI();

function updateSelectedCount(){
 const selectedSeats=document.querySelectorAll(".row .seat.selected")
 const seatsIndex=[...selectedSeats].map((item)=>{
     return [...allSeats].indexOf(item)
 })
 localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex))
 seats.textContent=selectedSeats.length;
 price.textContent=selectedSeats.length*moviePrice;
}

function handleSeatSelection(e){
    if(e.target.className==="seat"){
        e.target.className="seat selected"
    }
    else if(e.target.className==="seat selected"){
        e.target.className="seat"
    }
    else if(e.target.className==="seat occupied"){
        // do nothing
    }
    updateSelectedCount();
}

function handleMovieChange(e){
    moviePrice=parseInt(e.target.value);
    localStorage.setItem("selectedMovieIndex",e.target.selectedIndex);
    localStorage.setItem("selectedMoviePrice",e.target.value);
    updateSelectedCount()
}

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats&&selectedSeats.length>0){
        [...allSeats].forEach((item,index)=>{
            if(selectedSeats.indexOf(index)!==-1){
                allSeats[index].className="seat selected"
            }
        })
        seats.textContent=selectedSeats.length;
        const selectedMoviePrice=localStorage.getItem("selectedMoviePrice");
     if(selectedMoviePrice){
         console.log(selectedMoviePrice)
         price.textContent=selectedSeats.length*(parseInt(selectedMoviePrice))
     }
     const selectedMovieIndex=localStorage.getItem("selectedMovieIndex");
     if(selectedMovieIndex){
     movieSelect.selectedIndex=selectedMovieIndex;
     }

    }
     
}