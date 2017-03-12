(function(document) {
  "use strict";
  var notes;

  (function(container) {
    container.querySelector('.add-note-content').focus();
    container
      .addEventListener('submit', function(evt) {
        evt.preventDefault();
        var note;
        var content = evt.target.elements["content"];
        if (!content.value) {
          return alert('An empty note isn\'t that usefull right?!');
        }
        note = {
            content: content.value,
            done: false
        };
        content.value = "";
        notes.create(note);
      });
  })(document.querySelector(".add-note"));

  notes = (function(container) {
    var items = [];

    container
      .addEventListener('click', function(evt) {
        var index = evt.target.parentElement.getAttribute('data-index');
        if (evt.target.classList.contains('note-remove')) {
          remove(index);
        }
        if (evt.target.classList.contains('note-done')) {
          update(index, { done: evt.target.checked });
        }
      });

    return { create: create };

    function create(note) {
      items.unshift(note);
      render();
    }

    function remove(index) {
      items.splice(index, 1);
      render();
    }

    function update(index, payload) {
      Object.assign(items[index], payload);
      render();
    }

    function instantiate(item, index) {
      var element = document.createElement('div');
      element.setAttribute('data-index', index);
      element.classList.add('note');
      element.innerHTML = (
        "<input class=\"note-done\" type=\"checkbox\" " + (item.done ? "checked": "") + " />" +
        "<span class=\"note-content\">" + item.content + "</span>" +
        "<button class=\"note-remove\">Remove</button>"
      );
      return element;
    }

    function empty(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }

    function render() {
      empty(container);
      items
        .forEach(function(item, index) {
          var element = instantiate(item, index);
          container.appendChild(element);
        });
    }
  })(document.querySelector('.notes'));
})(document)
