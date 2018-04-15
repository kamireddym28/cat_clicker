/** Cat-Clicker Premium **/

/** Model **/

var model = {

  currentCat : null;
  cats = [
    {
      count: 0,
      name : 'tracy',
      imgSrc : 'images/tracy.jpg'
    },
    {
      count: 0,
      name : 'strom',
      imgSrc : 'images/strom.jpg'
    },
    {
      count: 0,
      name : 'sleepy',
      imgSrc : 'images/sleepy.jpg'
    },
    {
      count: 0,
      name : 'twin',
      imgSrc : 'images/twin.jpg'
    },
    {
      count: 0,
      name : 'pugg',
      imgSrc : 'images/pugg.jpg'
    }
  ]
};

/** Octopus **/

var octopus = {

  init: function() {
    /**setting current cat to first cat in the array**/
    model.currentCat = model.cats[0];

    // tell our views to initialize
    catListView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

    /**setting current cat to passed in object**/
  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

    /**incrementing current cats count**/
  incrementCounter: function(){
    model.currentCat.count++;
    catView.render();
  }
};

/** View **/

var catView = {

  init: function() {
    /** Storing pointers to DOM elements **/
    this.catElem = document.getElementbyId('cat');
    this.catNameElem = document.getElementbyId('cat-name');
    this.catImageElem = document.getElementbyId('cat-img');
    this.countElem = document.getElementbyId('cat-count');

    // on click, increment the current cat's counter
    this.catImageElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.countElem.textContent = currentCat.count;
    this.catNameElem.textContent = currentCat.name;
    this.catImageElem.src = currentCat.imgSrc;
  }

};

var catListView = {
  init: function() {
       // store the DOM element for easy access later
       this.catListElem = document.getElementById('cat-list');
       // render this view (update the DOM elements with the right values)
       this.render();
   },

   render: function() {
     var cat, elem, i;
       // get the cats we'll be rendering from the octopus
     var cats = octopus.getCats();

     // empty the catlist
     this.catListElem.innerHTML = '';

     //loop over cat
     for(i = 0; i<cats.length; i++){
       // this is the cat we're currently looping over
        cat = cats[i];

        // make a new cat list item and set its text
        elem = document.createElement('li');
        elem.textContent = cat.name;

        // on click, setCurrentCat and render the catView
       // (this uses our closure-in-a-loop trick to connect the value
      //  of the cat variable to the click event function)

        elem.addEventListener('click', function(cat) {
          return function() {
              octopus.setCurrentCat(cat);
              catView.render();
         };
       })(cat));

     // finally, add the element to the list
      this.catListElem.appendChild(elem);

     }
   }

};

octopus.init();
