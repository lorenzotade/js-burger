// references: punto ai vari elementi del DOM
var priceElement = document.getElementById("price");
var nameUser = document.getElementById('name');
var ingredients = document.getElementsByClassName("ingredient-checkbox");
var button = document.getElementById('button');
var coupon = document.getElementById('coupon');

// variabili script
var defaultPrice = 50;
var discount = 0.2;
var coupons = ['sconto2021', 'sconto-bool'];

/* PROCESS */

// scrivo subito il prezzo di default del burger (50)
writePrice(defaultPrice, priceElement);

// con un event listener al bottone in caso di click viene chiamata la 
// funzione checkName che controlla il nome del burger; se è valido
// chiama a sua volta la funziona calcPrice che calcola il prezzo
// totale del burger (default + ingredients); questa a sua volta
// chiama prima la funzione checkDiscount e salva il return in una 
// variabile; poi in ultimo chiama la funzione writePrice che stampa
// nell'elemento del DOM selezionato (target) il valore finale.
button.addEventListener("click", checkName);


/********** FUNCTIONS **********/

// controllo del nome e chiamata alle funzioni di calcolo e scrittura prezzo
function checkName() {
  // il nome del burger è uguale al nome inserito dall'utente privato degli 
  // spazi all'inizio e alla fine
  var nameBurger = nameUser.value.trim();
  // controllo che il nome sia valido, cioè che non sia uno spazio vuoto
  if (nameBurger.length === 0) {
    alert("Per favore inserisci un nome al tuo burger");
  } else {
    calcPrice(defaultPrice, priceElement);
  }
}

// calcolo del prezzo totale del burger: prezzo default + ingredienti
function calcPrice(value, target) {
  // setto una variabile per il prezzo totale degli ingredienti
  var ingredientsPrice = 0;
  // con un ciclo for scorro all'interno dell'array restituito dal
  // .getElementsByClassName() salvando di volta in volta ogni
  // elemento nella variabile ingredient
  for(var i = 0; i < ingredients.length; i++){
    var ingredient = ingredients[i];
    // durante il ciclo controllo se l'elemento dell'array precedentemente
    // salvato in ingredient ha la proprietà checked == true. In questo caso
    // viene sommato al prezzo totale degli ingredienti
    if(ingredient.checked === true){
      ingredientsPrice += parseInt(ingredient.value);
    }
  }
  // il prezzo totale è il prezzo di default + il prezzo degli ingredienti
  var totalPrice = defaultPrice + ingredientsPrice;
  // chiamo la funzione checkDiscount per controllare se c'è da applicare
  // uno sconto e lo salvo in una variabile
  var discountedPrice = checkDiscount(totalPrice, discount);
  // in ultimo chiamo la funzione writePrice per scrivere il prezzo finale
  writePrice(discountedPrice, priceElement);
}

// con questa funzione controllo se il coupon è giusto, applico uno sconto
// e restituisco il valore scontato in caso; sennò valore intero
function checkDiscount(value, disc) {
  if(coupons.includes(coupon.value) === true){
    value -= value * disc;
    return value;
  } else {
    return value;
  }
}

// con questa funzione scrivo il prezzo finale
function writePrice(value, target){
  target.innerHTML = value.toFixed(2);
}