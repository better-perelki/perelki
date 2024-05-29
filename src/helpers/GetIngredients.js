
function GetIngredients(drink) {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (ingredient && ingredient != null) {
            ingredients.push(ingredient);
        } else {
            break;
        }
    }
    return ingredients.join(', ');
}

export default GetIngredients;