const createrecipeFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-recipe').value.trim();
    const description = document.querySelector('#description-recipe').value.trim();
    const instructions = document.querySelector('#instructions-recipe').value.trim();
  
    if (title && description && instructions) {
      const instArray = instructions.split('.');
      const recipeJSON = JSON.stringify({title, description, instructions : instArray, foodType});
      console.log(recipeJSON);
      const response = await fetch('/api/recipes/createrecipe', {
        method: 'POST',
        body: recipeJSON,
        // body : "{'user_id':2,'title':'Cake','description':'It is a normal cake','foodType':'dessert','instructions':'make a cake'}",
        // headers: { 'Content-Type': 'application/json' },
        headers: {'Content-Type' : 'application/json'},

      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create recipe');
      }
    }
  };

  document
  .querySelector('.createrecipe-form')
  .addEventListener('submit', createrecipeFormHandler);