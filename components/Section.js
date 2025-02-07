class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._items.forEach((item) => {
      this._renderer(item); // Call the renderer and pass it the item as an argument
    });
  }

  addItem(element) {
    this._container.append(element); // Add element to the container - similar to "todosList.append(todo);"
  }
}

export default Section;
