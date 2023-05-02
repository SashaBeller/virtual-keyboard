const localizationMap = new Map();
const buttonByKey = new Map();
const symbolSet = new Set([
  "Backquote",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "Minus",
  "Equal",
  "Tab",
  "KeyQ",
  "KeyW",
  "KeyE",
  "KeyR",
  "KeyT",
  "KeyY",
  "KeyU",
  "KeyI",
  "KeyO",
  "KeyP",
  "BracketLeft",
  "BracketRight",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyJ",
  "KeyK",
  "KeyL",
  "Semicolon",
  "Quote",
  "Backslash",
  "Enter",
  "KeyZ",
  "KeyX",
  "KeyC",
  "KeyV",
  "KeyB",
  "KeyN",
  "KeyM",
  "Comma",
  "Period",
  "Slash",
  "ArrowUp",
  "Space",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Backspace",
]);

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
    lang: "en",
  },

  async init() {
    const body = document.querySelector("body");

    this.elements.centeralizer = document.createElement("section");
    this.elements.centeralizer.classList.add("centeralizer");

    this.elements.h1 = document.createElement("h1");
    this.elements.h1.textContent = "Virtual Keyboard";

    this.elements.textarea = document.createElement("textarea");
    this.elements.textarea.classList.add("body--textarea", "textarea");
    this.elements.textarea.setAttribute("id", "textarea");

    this.elements.main = document.createElement("div");
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(await this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.h3 = document.createElement("h3");
    this.elements.h4 = document.createElement("h4");
    this.elements.h3.textContent =
      "Клавиатура создана в операционной системе mac OS";
    this.elements.h4.textContent =
      "Для переключения раскладки используйте ShiftLeft + ControlLeft";

    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.centeralizer.appendChild(this.elements.h1);
    this.elements.centeralizer.appendChild(this.elements.textarea);
    this.elements.centeralizer.appendChild(this.elements.main);
    this.elements.centeralizer.appendChild(this.elements.h3);
    this.elements.centeralizer.appendChild(this.elements.h4);
    body.appendChild(this.elements.centeralizer);
  },

  async _createKeys() {
    const response = await fetch("./localization.json");
    const localizationJson = await response.json();
    for (let key in localizationJson) {
      localizationMap.set(key, localizationJson[key]);
    }

    const fragment = document.createDocumentFragment();

    const creatHTMLIcon = (icon_name) => {
      return `<i class="material-symbols-outlined">${icon_name}</i>`;
    };

    localizationMap.forEach((value, key) => {
      const buttonElement = document.createElement("button");
      buttonByKey.set(key, buttonElement);
      const insertLineBreak =
        ["Backspace", "BracketRight", "Enter", "ShiftRight"].indexOf(key) !==
        -1;

      buttonElement.setAttribute("type", "button");
      buttonElement.classList.add("keyboard__key");

      let translatedSymbol;
      switch (key) {
        case "Backspace":
          buttonElement.classList.add("keyboard__key--wide");
          buttonElement.innerHTML = creatHTMLIcon("backspace");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "CapsLock":
          buttonElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--indicator"
          );
          buttonElement.innerHTML = creatHTMLIcon("keyboard_capslock");

          buttonElement.addEventListener("click", () => {
            this._toggleCapsLock();
            // buttonElement.classList.toggle(
            //   "keyboard__key--activated",
            //   this.properties.capsLock
            // );
          });

          break;

        case "Enter":
          buttonElement.classList.add("keyboard__key--wide");
          buttonElement.innerHTML = creatHTMLIcon("keyboard_return");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\n";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "Space":
          buttonElement.classList.add("keyboard__key--space");
          buttonElement.innerHTML = creatHTMLIcon("space_bar");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + " ";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "ControlLeft":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("keyboard_control_key");

          break;

        case "ShiftRight":
          buttonElement.classList.add("keyboard__key--wide");
          buttonElement.innerHTML = creatHTMLIcon("shift");

          break;

        case "ShiftLeft":
          buttonElement.classList.add("keyboard__key--wide");
          buttonElement.innerHTML = creatHTMLIcon("shift");

          break;

        case "AltLeft":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("keyboard_option_key");

          break;
        case "AltRight":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("keyboard_option_key");

          break;

        case "MetaLeft":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("keyboard_command_key");

          break;
        case "MetaRight":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("keyboard_command_key");

          break;

        case "ArrowUp":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("arrow_upward");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\u2191";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "ArrowDown":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("arrow_downward");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\u2193";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "ArrowLeft":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("arrow_back");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\u2190";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "ArrowRight":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("arrow_forward");

          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\u2192";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        case "Tab":
          buttonElement.classList.add("keyboard__key");
          buttonElement.innerHTML = creatHTMLIcon("trending_flat");
          buttonElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "  ";
            keyboard.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;

        default:
          translatedSymbol =
            this.properties.lang === "en"
              ? localizationMap.get(key).en
              : localizationMap.get(key).ru;
          buttonElement.textContent = translatedSymbol.toLowerCase();

          buttonElement.addEventListener("click", () => {
            this.properties.value += buttonElement.textContent;
            this.elements.textarea.value = this.properties.value;
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(buttonElement);

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
    this.elements.keys[27].classList.toggle("keyboard__key--activated");

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

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey) {
    keyboard.properties.lang = keyboard.properties.lang == "ru" ? "en" : "ru";

    for (const buttonKey of buttonByKey.keys()) {
      console.log(buttonKey);
      if (buttonByKey.get(buttonKey).childElementCount === 0) {
        buttonByKey.get(buttonKey).textContent =
          localizationMap.get(buttonKey)[keyboard.properties.lang];
      }
    }
  }

  if (event.code === "CapsLock") {
    keyboard._toggleCapsLock();
    console.log("caps is pressed");
  }

  let element = buttonByKey.get(event.code);
  if (element == null) {
    console.log("There is no such element in the buttonByKey: ", event.code);
    return;
  }
  if (event.code !== "CapsLock") {
    element.classList.add("pressed");
  }
});

window.addEventListener("keyup", (event) => {
  let element = buttonByKey.get(event.code);
  element.classList.remove("pressed");

  if (event.code === "CapsLock") {
    keyboard._toggleCapsLock();
  }
});

document.addEventListener("keydown", function (event) {
  const key = event.code;
  // check if the key corresponds to a symbol in your map
  if (document.activeElement.getAttribute("id") !== "textarea") {
    if (symbolSet.has(key)) {
      console.log(key);
      switch (key) {
        case "Space":
          keyboard.properties.value += " ";
          keyboard.elements.textarea.value += " ";
          break;
        case "Tab":
          keyboard.properties.value += "  ";
          keyboard.elements.textarea.value += "  ";
          break;
        case "Backspace":
          keyboard.properties.value = keyboard.properties.value.slice(0, -1);
          keyboard.elements.textarea.value = keyboard.properties.value.slice(
            0,
            -1
          );
          break;
        case "Enter":
          keyboard.properties.value += "\n";
          keyboard.elements.textarea.value += "\n";
          break;
        case "ArrowLeft":
          keyboard.properties.value += "\u2190";
          keyboard.elements.textarea.value += "\u2190";
          break;
        case "ArrowRight":
          keyboard.properties.value += "\u2192";
          keyboard.elements.textarea.value += "\u2192";
          break;
        case "ArrowDown":
          keyboard.properties.value += "\u2193";
          keyboard.elements.textarea.value += "\u2193";
          break;
        case "ArrowUp":
          keyboard.properties.value += "\u2191";
          keyboard.elements.textarea.value += "\u2191";
          break;

        default:
          keyboard.properties.value += event.shiftKey
            ? buttonByKey.get(key).textContent.toUpperCase()
            : buttonByKey.get(key).textContent;
          keyboard.elements.textarea.value += event.shiftKey
            ? buttonByKey.get(key).textContent.toUpperCase()
            : buttonByKey.get(key).textContent;
      }
      // append the symbol to the textarea
      // keyboard.properties.value += buttonByKey.get(key).textContent;
      // keyboard.elements.textarea.value += buttonByKey.get(key).textContent;

      //  keyboard._triggerEvent("oninput");
    }
  }
});
