/* Fixing the height of the application window on iPhone */
const setAppHeight = () => {
  document.documentElement.style.setProperty(
    '--app-height',
    `${window.innerHeight}px`
  );
};
window.addEventListener('resize', setAppHeight);
setAppHeight();

/* Add the specified classes to the given HTML element */
function addClasses(element, classes) {
  classes.forEach((_class) => element.classList.add(_class));
}

/* Adds the specified ID to the given HTML element */
function addID(element, id) {
  element.setAttribute("id", id);
}

/* Creates a new HTML element with an object in input */
function createChild(tag, props = {}) {
  const newElement = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    switch (key) {
      case "id":
        addID(newElement, value);
        break;
      case "classes":
        addClasses(newElement, value);
        break;
      case "text":
        newElement.textContent = value;
        break;
      default:
        newElement.setAttribute(key, value);
        break;
    }
  });
  return newElement;
}

/* Remove the specified classes to the given HTML element */
function removeClasses(element, classes) {
  classes.forEach((_class) => element.classList.remove(_class));
}

/* Toggle the specified classes to the given HTML element */
function toggleClasses(element, classes) {
  classes.forEach((_class) => element.classList.toggle(_class));
}

/* Adds the desired attribute to the given element */
function addAttributes(element, props) {
  const { ...rest } = props;
  Object.entries(rest).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

// function to get a random number, extreme included
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
