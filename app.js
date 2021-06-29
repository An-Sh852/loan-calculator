const form = document.getElementById('loan-form');
form.addEventListener('submit', function(e){
  //hide results
  document.querySelector('#results').style.display = 'none'; 
  //show loader
  document.querySelector('#loading').style.display = 'block';
  //after 2 sec --> display results
  setTimeout(calculateResults, 2000)

  e.preventDefault(); 
});



function calculateResults(){
//get input vars
  const amount = document.getElementById('amount');
  const intrest = document.getElementById('interest');
  const years = document.getElementById('years');
//get display vars 
  const totalMonthlyPayment = document.getElementById('monthly-payment');
  const totalYearPayment = document.getElementById('total-payment');
  const totalIntrest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const monthlyIntrest = parseFloat(intrest.value)/100/12; 
  const totalMonthsToRepay = parseFloat(years.value)*12; 

//comptute monthly payment 
  const x = Math.pow(1 + monthlyIntrest, totalMonthsToRepay); 
  const monthly = (principle*x*monthlyIntrest)/(x-1);

  if (isFinite(monthly)){
    totalMonthlyPayment.value = monthly.toFixed(2);
    totalYearPayment.value = (monthly*totalMonthsToRepay).toFixed(2);
    totalIntrest.value = ((monthly*totalMonthsToRepay).toFixed(2) - principle).toFixed(2);
    //hide loader
    document.querySelector('#loading').style.display = 'none';
    //display result 
    document.querySelector('#results').style.display = 'block';
  }else{
    
    showError('Please check your numbers');
  }
  
}

function showError(errorMsg){
  //hide loader
  document.querySelector('#loading').style.display = 'none';
  //hide result 
  document.querySelector('#results').style.display = 'none';
  
//create error div & insert inbetween heading & card top margin (i.e. insert inside card above heading)
   //create div
   const errorDiv = document.createElement('div'); 
   errorDiv.className = 'alert alert-danger';
   errorDiv.appendChild(document.createTextNode(errorMsg));

   //get card & heading
   const card = document.querySelector(".card")
   const heading = document.querySelector(".heading")

   //to insert errorDiv before heading --> apply insertbefore method on Parent element 
   card.insertBefore(errorDiv, heading); 
   
  
//to make the message go away after few seconds 
 //clear error after 2 sec = 2000 milisec
 setTimeout(clearError, 2000);
}

function clearError(){
  document.querySelector(".alert").remove();
}