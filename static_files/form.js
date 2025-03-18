
// wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // kunin form and food cards contrainer elements 
  const foodForm = document.getElementById('foodForm');
  const foodCards = document.getElementById('foodCards');
  
  // for adding food submission 
  foodForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default submission 
  

    // get the values input
    const rank = document.getElementById('rank').value.trim();
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const imageUrl = document.getElementById('imageUrl').value.trim();
    
    // the input cannot be empty
    if (!rank || !name || !description || !imageUrl) {
      alert('Please fill in all fields'); // have pop alert
      return;
    }
    
    // the rank must not be null or less than 0
    if (isNaN(rank) || rank <= 0) {
      alert('Rank must be a positive number');
      return;
    }
    
    // then create a food card with the input as parameters
    addfoodCard(rank, name, description, imageUrl);
    
    // reset the input after adding the forms
    foodForm.reset();
  });
  
  // add function to create the food card after adding 
  function addfoodCard(rank, name, description, imageUrl) {
    // create the card element
    const card = document.createElement('div');
    card.className = 'food-card';
    card.dataset.rank = rank; // store the rank as a data so it can be used for sorting
    
    // creatte the inner html for the card
    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" class="food-image" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
      <div class="food-info">
        <div class="food-rank">Rank: ${rank}</div>
        <h3 class="food-name">${name}</h3>
        <p class="food-description">${description}</p>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    
    // event listener for the button
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      card.remove(); // remove the card
    });
    
    // then find where to insert the card 
    insertCardInOrder(card, rank);
  }
  
  function insertCardInOrder(newCard, newRank) {
    const cards = foodCards.querySelectorAll('.food-card');
    newRank = parseInt(newRank); 
    
    // case if theres nothing yet to be added
    if (cards.length === 0) {
      foodCards.appendChild(newCard);
      return;
    }
    
        let inserted = false;

    // case if the rank is lower 
    for (let i = 0; i < cards.length; i++) {
      const currentRank = parseInt(cards[i].dataset.rank);
      if (newRank < currentRank) {
        foodCards.insertBefore(newCard, cards[i]); // if tthe new card is lower insert then insert before
        inserted = true;  // set to true
        break;
      }
    }
    
    // if the card is not inserted meaning its rank is higher just append at the 
    if (!inserted) {
      foodCards.appendChild(newCard);
    }
  }
});



























