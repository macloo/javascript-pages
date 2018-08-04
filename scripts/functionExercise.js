// a typical function exercise
/*
1. Write a function that searches in a string for a shorter string.
2. The function takes two arguments: a string and a shorter string.
3. The function returns true or false.
*/

// version 1
function findString(a, b) {
  if (a.includes(b)) {
    return true;
  } else {
    return false;
  }
}

// version 2
function findString(a, b) {
    return a.includes(b);
}

findString('applesauce', 'pear');

let result = findString('plum pudding', 'pear');
console.log(result);

result = findString('pear and apricot tart', 'pear');
console.log(result);

/*
1. Write a function that searches every item in a list for a given string.
2. The function takes two arguments: an array and a string to search for.
3. Return a new list of all items that contain that string.
*/

const recipes = ['pineapple upside-down cake', 'peach cobbler', 'strawberry shortcake', 'plum pudding',  'applesauce', 'pear and apricot tart'];

function findStringInArray(list, myString) {
  const selectedRecipes = [];
  for (let i = 0; i < list.length; i++) {
      // we can use the previous function here ---
    if ( findString(list[i], myString) ) {
      selectedRecipes.push(list[i])
    }
  }
  return selectedRecipes;
}

result = findStringInArray(recipes, 'cake');
console.log(result);
