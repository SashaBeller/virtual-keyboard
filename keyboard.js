const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    const body = document.querySelector("body");

    // Create the section element and set it to the `centeralizer` property using `this`
    this.elements.centeralizer = document.createElement("section");
    this.elements.centeralizer.classList.add("centeralizer");

    // Create the h1 element and set its text content
    this.elements.h1 = document.createElement("h1");
    this.elements.h1.textContent = "Virtual Keyboard";

    // Create the textarea element and set its attributes
    this.elements.textarea = document.createElement("textarea");
    this.elements.textarea.classList.add("body--textarea", "textarea");
    this.elements.textarea.setAttribute("id", "textarea");

    // Create the div elements for the keyboard
    this.elements.main = document.createElement("div");
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Create the h3 element and set its text content
    this.elements.h3 = document.createElement("h3");
    this.elements.h3.textContent =
      "Клавиатура создана в операционной системе mac OS";

    // Append the elements to their respective parents using `this`
    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.centeralizer.appendChild(this.elements.h1);
    this.elements.centeralizer.appendChild(this.elements.textarea);
    this.elements.centeralizer.appendChild(this.elements.main);
    this.elements.centeralizer.appendChild(this.elements.h3);
    body.appendChild(this.elements.centeralizer);
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "backspace",
      "tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "|",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "enter",
      "shift1",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "up",
      "shift",
      "control",
      "option",
      "command",
      "space",
      "command",
      "option",
      "left",
      "down",
      "right",
    ];

    const creatHTMLIcon = (icon_name) => {
      return `<i class="material-symbols-outlined">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "|", "enter", "shift"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = creatHTMLIcon("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--indicator"
          );
          keyElement.innerHTML = creatHTMLIcon("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--activated",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = creatHTMLIcon("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--space");
          keyElement.innerHTML = creatHTMLIcon("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + " ";
            this._triggerEvent("oninput");
          });

          break;

        case "control":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("keyboard_control_key");

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = creatHTMLIcon("shift");

          break;

        case "shift1":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = creatHTMLIcon("shift");

          break;

        case "option":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("keyboard_option_key");

          break;

        case "command":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("keyboard_command_key");

          break;

        case "up":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("arrow_upward");

          break;

        case "down":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("arrow_downward");

          break;

        case "left":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("arrow_back");

          break;

        case "right":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("arrow_forward");

          break;

        case "tab":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = creatHTMLIcon("trending_flat");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "  ";
            this._triggerEvent("oninput");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  start(oninput) {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  keyboard.init();
  keyboard.start(function (currentValue) {
    keyboard.elements.textarea.textContent = currentValue;
  });
});
