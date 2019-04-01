require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"XMLHttpRequest":[function(require,module,exports){
exports.send = function(text, callback, token, session) {
  var data, xhr;
  xhr = new XMLHttpRequest;
  xhr.open('POST', "https://api.api.ai/v1/query", true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  data = JSON.stringify({
    query: text,
    lang: 'en',
    sessionId: session
  });
  xhr.send(data);
};


},{}],"apiai":[function(require,module,exports){
exports.send = function(text, callback, token, session) {
  var data, xhr;
  xhr = new XMLHttpRequest;
  xhr.open('POST', "https://api.api.ai/v1/query", true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  data = JSON.stringify({
    query: text,
    lang: 'en',
    sessionId: session
  });
  xhr.send(data);
};


},{}],"chatBot":[function(require,module,exports){
var Message, answer, avatar, botImage, botName, buildChoices, ios, messageClass, messages, question,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ios = require("ios-kit");

botName = "";

botImage = "";

messageClass = {
  "padding": "15px 40px"
};

question = {
  "border": "2px solid #E2E2E2",
  "padding": "15px 40px",
  "border-radius": "34px",
  "float": "left"
};

answer = {
  "background": "#FDF8E4",
  "color": "#000000",
  "border-radius": "34px",
  "padding": "15px 40px",
  "float": "left"
};

exports.createMessenger = function(botName, image, likes, botCategory, user) {
  var backgroundA, keyboard, nav, statusBar;
  keyboard = new ios.Keyboard({
    hidden: true
  });
  statusBar = new ios.StatusBar({
    carrier: "Verizon",
    network: "3G",
    battery: 70,
    style: "dark"
  });
  nav = new ios.NavBar({
    right: "",
    left: " < ",
    title: botName,
    blur: true
  });
  window["customTabBar"] = new Layer({
    width: Screen.width,
    height: 100,
    backgroundColor: "white",
    y: Align.bottom,
    shadowY: -1,
    shadowSpread: 2,
    shadowColor: "rgba(123,123,123,0.2)"
  });
  customTabBar.on("change:y", function() {
    return scroll.height = customTabBar.y;
  });
  window["textField"] = new ios.Field({
    width: Screen.width,
    height: 100,
    keyboard: keyboard,
    placeholder: "Type a message",
    borderWidth: 0,
    constraints: {
      top: 0,
      leading: 0
    }
  });
  textField.parent = customTabBar;
  window["scroll"] = new ScrollComponent({
    width: Screen.width,
    name: "scroll",
    height: Screen.height - 60,
    scrollHorizontal: false,
    directionLock: true,
    contentInset: {
      top: nav.height + 20,
      bottom: 40
    }
  });
  scroll.content.backgroundColor = "null";
  scroll.content.height = 0;
  scroll.sendToBack();
  backgroundA = new BackgroundLayer;
  textField.on(Events.TouchEnd, function() {
    textField.keyboard.keys["return"].on(Events.TouchStart, function() {
      var msg;
      if (textField.text.html.length > 0) {
        msg = new Message({
          type: "userMsg",
          text: textField.text.html
        });
        userInput(textField.text.html);
        return textField.text.html = "";
      }
    });
    return textField.keyboard.on("change:y", function() {
      if (textField.keyboard.maxY > Screen.height) {
        customTabBar.maxY = textField.keyboard.y;
      }
      if (textField.keyboard.y === Screen.height) {
        return textField.keyboard.area.visible = true;
      }
    });
  });
  return Events.wrap(window).addEventListener("keydown", function(event) {
    var msg;
    if (event.keyCode === 13) {
      if (textField.text.html.length > 0) {
        msg = new Message({
          type: "userMsg",
          text: textField.text.html
        });
        userInput(textField.text.html);
        return textField.text.html = "";
      }
    }
  });
};

messages = [];

avatar = (function(superClass) {
  extend(avatar, superClass);

  function avatar(opts) {
    avatar.__super__.constructor.call(this, opts);
    this.width = opts.size;
    this.height = opts.size;
    this.borderRadius = opts.size;
  }

  return avatar;

})(Layer);

buildChoices = function(array, parentLayer) {
  var choice, choiceLayer, fn, i, j, len, results;
  fn = function(choiceLayer) {
    choiceLayer.action = choice[1];
    return choiceLayer.onClick(function() {
      var response;
      response = new Message({
        type: "userMsg",
        text: choiceLayer.html
      });
      return choiceFunc(this.action);
    });
  };
  results = [];
  for (i = j = 0, len = array.length; j < len; i = ++j) {
    choice = array[i];
    choiceLayer = new ios.Text({
      fontSize: 16,
      name: "choice",
      fontWeight: 500,
      color: "#0084FF",
      text: choice[0],
      lineHeight: 32,
      y: parentLayer.height,
      constraints: {
        width: parentLayer.width / 2
      },
      superLayer: parentLayer
    });
    fn(choiceLayer);
    if (i > 0) {
      choiceLayer.style = {
        "text-align": "center",
        "border-top": "2px solid #e2e2e2"
      };
    }
    choiceLayer.style = {
      "text-align": "center"
    };
    results.push(parentLayer.height += choiceLayer.height);
  }
  return results;
};

Message = (function() {
  function Message(opts) {
    var bubble, bubbleX, bubbles, card, cardLayer, cardTextHolder, cardWidth, cardsPager, childarray, choice, cover, fn, i, j, k, l, len, len1, len2, link, message, messageHolder, messagesShown, msg, parentObject, posY, ref, ref1, text, titleLayer, userPic;
    cardWidth = Screen.width - 300;
    childarray = scroll.content.children;
    if (childarray[0]) {
      posY = childarray[childarray.length - 1].maxY + 10;
    } else {
      posY = 0;
    }
    if (opts.type === "bubbles") {
      bubbles = new Layer({
        y: -84,
        backgroundColor: "null",
        height: 64,
        superLayer: customTabBar
      });
      bubbleX = 0;
      ref = opts.choices;
      fn = function(bubble) {
        bubble.action = choice[1];
        bubble.width += 80;
        bubble.height += 30;
        bubble.x = bubbleX;
        bubbleX = bubble.maxX + 10;
        bubble.style = answer;
        return bubble.onClick(function() {
          var response;
          response = new Message({
            type: "userMsg",
            text: bubble.html
          });
          bubbles.destroy();
          return choiceFunc(this.action);
        });
      };
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        choice = ref[i];
        bubble = new ios.Text({
          fontSize: 17,
          text: choice[0],
          action: choice[1],
          superLayer: bubbles
        });
        fn(bubble);
      }
      bubbles.width = bubbleX;
      bubbles.constraints = {
        horizontalCenter: customTabBar
      };
      ios.layout.set();
    } else if (opts.type === "userMsg" || opts.type === "botMsg") {
      if (opts.text.length > 30) {
        message = new ios.Text({
          fontSize: 17,
          text: opts.text,
          superLayer: scroll.content,
          y: posY,
          constraints: {
            width: 300
          }
        });
      } else {
        message = new ios.Text({
          fontSize: 17,
          text: opts.text,
          superLayer: scroll.content,
          y: posY
        });
        message.width = message._element.children[0].offsetWidth + 80;
        message._element.style.width = null;
      }
      message.style = messageClass;
      message.height = message._element.children[0].offsetHeight + 40;
      if (opts.choices) {
        message.height += 30;
        if (message.width < cardWidth) {
          message.width = cardWidth;
        }
        buildChoices(opts.choices, message);
        message.children[0].style = {
          "border-top": "2px solid #e2e2e2"
        };
      }
    } else if (opts.type === "cards") {
      message = new Layer({
        width: Screen.width - 90,
        superLayer: scroll.content,
        y: posY,
        backgroundColor: "null"
      });
      messageHolder = new Layer({
        x: 2,
        y: 2,
        width: message.width,
        backgroundColor: "null",
        superLayer: message
      });
      if (opts.cards.length > 1) {
        cardsPager = new PageComponent({
          superLayer: messageHolder,
          width: cardWidth,
          backgroundColor: "null",
          scrollVertical: false,
          directionLock: true,
          clip: false
        });
        parentObject = cardsPager.content;
      } else {
        parentObject = messageHolder;
      }
      ref1 = opts.cards;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        card = ref1[i];
        cardLayer = new Layer({
          width: cardWidth,
          backgroundColor: "#fff",
          superLayer: parentObject,
          borderWidth: 2,
          borderColor: "#E2E2E2",
          borderRadius: 34,
          clip: true,
          x: (cardWidth + 20) * i,
          height: 0
        });
        if (card.image) {
          cover = new Layer({
            width: cardLayer.width,
            height: 300,
            name: "cover",
            image: card.image,
            superLayer: cardLayer
          });
          cardLayer.height = cover.height;
          cover.style = {
            "border-bottom": "2px solid #e2e2e2"
          };
        }
        cardTextHolder = new Layer({
          superLayer: cardLayer,
          width: cardWidth,
          backgroundColor: "#fff",
          y: cardLayer.height,
          height: 0
        });
        if (card.title || card.text || card.link) {
          cardTextHolder.style = {
            "border-bottom": "2px solid #e2e2e2"
          };
        }
        if (card.title) {
          titleLayer = new ios.Text({
            fontSize: 15,
            fontWeight: 500,
            text: card.title,
            x: 20,
            lineHeight: 30,
            y: cardTextHolder.height,
            name: "title",
            constraints: {
              width: (cardLayer.width - 40) / 2
            },
            superLayer: cardTextHolder
          });
          cardTextHolder.height += titleLayer.height;
        }
        if (card.text) {
          text = new ios.Text({
            fontSize: 13,
            x: 20,
            color: "#666666",
            text: card.text,
            y: cardTextHolder.height,
            name: "text",
            constraints: {
              width: (cardLayer.width - 40) / 2
            },
            superLayer: cardTextHolder
          });
          cardTextHolder.height += text.height;
        }
        if (card.link) {
          link = new ios.Text({
            fontSize: 13,
            color: "#666666",
            x: 20,
            lineHeight: 30,
            text: card.link,
            y: cardTextHolder.height,
            name: "link",
            constraints: {
              width: (cardLayer.width - 40) / 2
            },
            superLayer: cardTextHolder
          });
          cardTextHolder.height += link.height;
        }
        cardTextHolder.height += 20;
        cardLayer.height += cardTextHolder.height;
        buildChoices(card.choices, cardLayer);
        message.height = cardLayer.height;
        messageHolder.height = cardLayer.height;
        if (cardsPager) {
          cardsPager.height = cardLayer.height;
          messageHolder.height = cardLayer.height;
        }
      }
    }
    if (opts.type === "userMsg") {
      message.style = answer;
      message.x = Screen.width;
      message.opacity = 0;
      message.animate({
        properties: {
          maxX: Screen.width - 20,
          opacity: 1
        },
        time: 0.2,
        curve: "ease-in-out"
      });
    } else if (opts.type === "botMsg") {
      message.style = question;
    }
    if (opts.type === "botMsg" || opts.type === "cards") {
      message.opacity = 0;
      message.maxX = 0;
      message.animate({
        properties: {
          x: 90,
          opacity: 1
        },
        time: 0.2,
        delay: 0.3,
        curve: "ease-in-out"
      });
      userPic = new avatar({
        parent: message,
        name: "avatar",
        image: botImage,
        size: 60
      });
      userPic.x -= 70;
      userPic.y = Align.bottom;
      userPic.sendToBack();
    }
    if (opts.type !== "bubbles") {
      messages.push(message);
    }
    for (i = l = 0, len2 = messages.length; l < len2; i = ++l) {
      msg = messages[i];
      if (messages[i + 1]) {
        if (msg.children[0] && messages[i + 1].children[0]) {
          msg.childrenWithName("avatar")[0].opacity = 0;
        }
      }
    }
    scroll.updateContent();
    messagesShown = scroll.content.children;
    if ((messagesShown[messagesShown.length - 1].screenFrame.y + 200) > scroll.height) {
      scroll.scrollToPoint({
        y: scroll.content.height + 200
      }, true, {
        curve: "ease"
      });
    }
  }

  exports.Message = Message;

  return Message;

})();


},{"ios-kit":"ios-kit"}],"input":[function(require,module,exports){
var _inputStyle, calculatePixelRatio, growthRatio, imageHeight,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

_inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
  return (value * layer.context.pixelMultiplier) + "px";
}, {
  fontSize: function(layer) {
    return calculatePixelRatio(layer, layer._properties.fontSize);
  },
  lineHeight: function(layer) {
    return layer._properties.lineHeight + "em";
  },
  padding: function(layer) {
    var padding, paddingValue, paddingValues, pixelMultiplier;
    pixelMultiplier = layer.context.pixelMultiplier;
    padding = [];
    paddingValue = layer._properties.padding;
    if (Number.isInteger(paddingValue)) {
      return calculatePixelRatio(layer, paddingValue);
    }
    paddingValues = layer._properties.padding.split(" ");
    switch (paddingValues.length) {
      case 4:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[3]);
        break;
      case 3:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      case 2:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      default:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[0]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[0]);
    }
    return (padding.top * pixelMultiplier) + "px " + (padding.right * pixelMultiplier) + "px " + (padding.bottom * pixelMultiplier) + "px " + (padding.left * pixelMultiplier) + "px";
  }
});

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    this.enable = bind(this.enable, this);
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "rgba(255, 255, 255, .01)";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    if (options.textColor == null) {
      options.textColor = "#000";
    }
    if (options.fontFamily == null) {
      options.fontFamily = "-apple-system";
    }
    if (options.fontWeight == null) {
      options.fontWeight = "500";
    }
    if (options.submit == null) {
      options.submit = false;
    }
    if (options.tabIndex == null) {
      options.tabIndex = 0;
    }
    if (options.textarea == null) {
      options.textarea = false;
    }
    if (options.disabled == null) {
      options.disabled = false;
    }
    if (options.letterSpacing == null) {
      options.letterSpacing = 0;
    }
    Input.__super__.constructor.call(this, options);
    this._properties.fontSize = options.fontSize;
    this._properties.lineHeight = options.lineHeight;
    this._properties.padding = options.padding;
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement(options.textarea ? 'textarea' : 'input');
    this.input.id = "input-" + (_.now());
    this.input.style.width = _inputStyle["width"](this);
    this.input.style.height = _inputStyle["height"](this);
    this.input.style.fontSize = _inputStyle["fontSize"](this);
    this.input.style.lineHeight = _inputStyle["lineHeight"](this);
    this.input.style.outline = "none";
    this.input.style.border = "none";
    this.input.style.backgroundColor = options.backgroundColor;
    this.input.style.padding = _inputStyle["padding"](this);
    this.input.style.fontFamily = options.fontFamily;
    this.input.style.color = options.textColor;
    this.input.style.fontWeight = options.fontWeight;
    this.input.style.letterSpacing = options.letterSpacing;
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("tabindex", options.tabindex);
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.disabled === true) {
      this.input.setAttribute("disabled", true);
    }
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if ((options.goButton && !options.submit) || !options.submit) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.unfocus = function() {
    return this.input.blur();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onUnfocus = Input.onBlur;

  Input.prototype.disable = function() {
    return this.input.setAttribute("disabled", true);
  };

  Input.prototype.enable = function() {
    return this.input.removeAttribute("disabled", true);
  };

  return Input;

})(Layer);


},{}],"ios-kit-alert":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  message: "",
  actions: ["OK"]
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var act, actLabel, actLabel2, action, action2, actionDivider, actions, alert, cleanName, i, index, j, len, len1, ref, setup;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  alert = new ios.View({
    backgroundColor: "transparent",
    name: "alert",
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      bottom: 0
    }
  });
  alert.overlay = new ios.View({
    backgroundColor: "rgba(0,0,0,.3)",
    superLayer: alert,
    name: ".overlay",
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      bottom: 0
    }
  });
  alert.modal = new ios.View({
    backgroundColor: "white",
    superLayer: alert,
    borderRadius: ios.utils.px(10),
    name: ".modal",
    constraints: {
      align: "center",
      width: 280,
      height: 400
    }
  });
  alert.title = new ios.Text({
    superLayer: alert.modal,
    text: setup.title,
    fontWeight: "semibold",
    name: ".title",
    textAlign: "center",
    lineHeight: 20,
    constraints: {
      top: 20,
      width: 220,
      align: "horizontal"
    }
  });
  alert.message = new ios.Text({
    superLayer: alert.modal,
    text: setup.message,
    fontSize: 13,
    name: ".message",
    textAlign: "center",
    lineHeight: 16,
    constraints: {
      top: [alert.title, 10],
      align: "horizontal",
      width: 220
    }
  });
  if (setup.message.length === 0) {
    alert.message.height = -24;
  }
  alert.horiDivider = new ios.View({
    superLayer: alert.modal,
    backgroundColor: "#E2E8EB",
    name: ".horiDivider",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 1,
      bottom: 44
    }
  });
  cleanName = function(n) {
    if (n[0] === "-") {
      return n.slice(9);
    } else {
      return n;
    }
  };
  alert.modal.constraints["height"] = 20 + ios.utils.pt(alert.title.height) + 10 + ios.utils.pt(alert.message.height) + 24 + 44;
  actions = [];
  switch (setup.actions.length) {
    case 1:
      actLabel = ios.utils.capitalize(setup.actions[0]);
      action = new ios.View({
        superLayer: alert.modal,
        backgroundColor: "white",
        name: cleanName(setup.actions[0]),
        borderRadius: ios.utils.px(10),
        constraints: {
          leading: 0,
          trailing: 0,
          bottom: 0,
          height: 44
        }
      });
      action.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action,
        text: actLabel,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action);
      break;
    case 2:
      actLabel = ios.utils.capitalize(setup.actions[0]);
      action = new ios.View({
        superLayer: alert.modal,
        name: cleanName(setup.actions[0]),
        borderRadius: ios.utils.px(10),
        backgroundColor: "white",
        constraints: {
          leading: 0,
          trailing: ios.utils.pt(alert.modal.width / 2),
          bottom: 0,
          height: 44
        }
      });
      action.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action,
        text: actLabel,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action);
      alert.vertDivider = new ios.View({
        superLayer: alert.modal,
        backgroundColor: "#E2E8EB",
        name: ".vertDivider",
        constraints: {
          width: 1,
          bottom: 0,
          height: 44,
          align: "horizontal"
        }
      });
      actLabel2 = ios.utils.capitalize(setup.actions[1]);
      action2 = new ios.View({
        superLayer: alert.modal,
        name: cleanName(setup.actions[1]),
        borderRadius: ios.utils.px(10),
        backgroundColor: "white",
        constraints: {
          leading: ios.utils.pt(alert.modal.width / 2),
          trailing: 0,
          bottom: 0,
          height: 44
        }
      });
      action2.label = new ios.Text({
        color: ios.utils.color("blue"),
        superLayer: action2,
        text: actLabel2,
        name: "label",
        constraints: {
          align: "horizontal",
          bottom: 16
        }
      });
      actions.push(action2);
      break;
    default:
      ref = setup.actions;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        act = ref[index];
        actLabel = ios.utils.capitalize(act);
        action = new ios.View({
          superLayer: alert.modal,
          name: cleanName(act),
          borderRadius: ios.utils.px(10),
          backgroundColor: "white",
          constraints: {
            leading: 0,
            trailing: 0,
            bottom: 0 + ((setup.actions.length - index - 1) * 44),
            height: 44
          }
        });
        actionDivider = new ios.View({
          superLayer: alert.modal,
          backgroundColor: "#E2E8EB",
          name: "action divider",
          constraints: {
            leading: 0,
            trailing: 0,
            height: 1,
            bottom: 0 + ((setup.actions.length - index) * 44)
          }
        });
        action.label = new ios.Text({
          style: "alertAction",
          color: ios.utils.color("blue"),
          superLayer: action,
          text: actLabel,
          name: "label",
          constraints: {
            align: "horizontal",
            bottom: 14
          }
        });
        actions.push(action);
        alert.modal.constraints["height"] = alert.modal.constraints["height"] + 42 - 12;
      }
  }
  alert.actions = {};
  for (index = j = 0, len1 = actions.length; j < len1; index = ++j) {
    act = actions[index];
    act.type = "button";
    ios.utils.specialChar(act);
    if (setup.actions[index].indexOf("-r") === 0) {
      act.origColor = ios.utils.color("red");
    } else {
      act.origColor = ios.utils.color("blue");
    }
    ios.layout.set(act.label);
    act.on(Events.TouchStart, function() {
      this.backgroundColor = "white";
      this.animate({
        properties: {
          backgroundColor: act.backgroundColor.darken(5)
        },
        time: .25
      });
      return this.label.animate({
        properties: {
          color: this.origColor.lighten(10)
        },
        time: .25
      });
    });
    act.on(Events.TouchEnd, function() {
      this.animate({
        properties: {
          backgroundColor: "white"
        },
        time: .25
      });
      this.label.animate({
        properties: {
          color: this.origColor
        },
        time: .25
      });
      return alert.destroy();
    });
    alert.actions[act.name] = act;
  }
  ios.layout.set(actions[actions.length - 1]);
  return alert;
};


},{"ios-kit":"ios-kit"}],"ios-kit-banner":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  message: "Message",
  action: "Action",
  time: "now",
  app: "app",
  icon: void 0,
  duration: 7,
  animated: true,
  reply: true
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var banner, setup, specs;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  specs = {
    leadingIcon: 15,
    topIcon: 8,
    topTitle: 6,
    width: 0
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 304;
      break;
    case "iphone-6s":
      specs.width = 359;
      break;
    case "iphone-6s-plus":
      specs.leadingIcon = 15;
      specs.topIcon = 12;
      specs.topTitle = 10;
      specs.width = 398;
      break;
    case "ipad":
      specs.leadingIcon = 8;
      specs.topIcon = 8;
      specs.topTitle = 11;
      specs.width = 398;
      break;
    case "ipad-pro":
      specs.leadingIcon = 8;
      specs.topIcon = 8;
      specs.topTitle = 9;
      specs.width = 556;
  }
  banner = new ios.View({
    backgroundColor: "rgba(255,255,255,.6)",
    name: "banner",
    borderRadius: ios.px(12),
    shadowColor: "rgba(0,0,0,.3)",
    shadowY: ios.px(2),
    shadowBlur: ios.px(10),
    clip: true,
    constraints: {
      align: 'horizontal',
      width: specs.width,
      top: 8,
      height: 93
    }
  });
  banner.header = new ios.View({
    backgroundColor: "rgba(255,255,255, .3)",
    name: ".header",
    superLayer: banner,
    constraints: {
      height: 36,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.icon === void 0) {
    banner.icon = new ios.View({
      superLayer: banner.header
    });
    banner.icon.style["background"] = "linear-gradient(-180deg, #67FF81 0%, #01B41F 100%)";
  } else {
    banner.header.addSubLayer(setup.icon);
    banner.icon = setup.icon;
  }
  banner.icon.borderRadius = ios.utils.px(4.5);
  banner.icon.name = ".icon";
  banner.icon.constraints = {
    height: 20,
    width: 20,
    leading: specs.leadingIcon,
    align: "vertical"
  };
  ios.layout.set(banner.icon);
  banner.app = new ios.Text({
    text: setup.app.toUpperCase(),
    color: "rgba(0,0,0,.5)",
    fontSize: 13,
    letterSpacing: .5,
    superLayer: banner.header,
    constraints: {
      leading: [banner.icon, 6],
      align: "vertical"
    }
  });
  banner.title = new ios.Text({
    text: setup.title,
    color: "black",
    fontWeight: "semibold",
    fontSize: 15,
    superLayer: banner,
    name: ".title",
    constraints: {
      top: 45,
      leading: 15
    }
  });
  banner.message = new ios.Text({
    text: setup.message,
    color: "black",
    fontSize: 15,
    fontWeight: "light",
    superLayer: banner,
    name: ".message",
    constraints: {
      leadingEdges: banner.title,
      top: [banner.title, 6]
    }
  });
  banner.time = new ios.Text({
    text: setup.time,
    color: "rgba(0,0,0,.5)",
    fontSize: 13,
    superLayer: banner.header,
    name: ".time",
    constraints: {
      trailing: 16,
      align: "vertical"
    }
  });
  if (ios.device.name === "ipad" || ios.device.name === "ipad-pro") {
    banner.time.constraints = {
      bottomEdges: banner.title,
      trailing: specs.leadingIcon
    };
  }
  ios.utils.bgBlur(banner);
  banner.draggable = true;
  banner.draggable.horizontal = false;
  banner.draggable.constraints = {
    y: ios.px(8),
    x: ios.px(8)
  };
  banner.draggable.bounceOptions = {
    friction: 25,
    tension: 250
  };
  banner.on(Events.DragEnd, function() {
    if (banner.maxY < ios.utils.px(68)) {
      banner.animate({
        properties: {
          maxY: 0
        },
        time: .15,
        curve: "ease-in-out"
      });
      return Utils.delay(.25, function() {
        return banner.destroy();
      });
    }
  });
  if (setup.animated === true) {
    banner.y = 0 - banner.height;
    ios.layout.animate({
      target: banner,
      time: .25,
      curve: 'ease-in-out'
    });
  }
  if (setup.duration) {
    Utils.delay(setup.duration, function() {
      return banner.animate({
        properties: {
          maxY: 0
        },
        time: .25,
        curve: "ease-in-out"
      });
    });
    Utils.delay(setup.duration + .25, function() {
      return banner.destroy();
    });
  }
  return banner;
};


},{"ios-kit":"ios-kit"}],"ios-kit-button":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  text: "Button",
  type: "text",
  style: "light",
  backgroundColor: "white",
  color: "#007AFF",
  fontSize: 17,
  fontWeight: "regular",
  name: "button",
  blur: true,
  superLayer: void 0,
  constraints: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var backgroundColor, button, color, rgbString, rgbaString, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  button = new ios.View({
    name: setup.name,
    constraints: setup.constraints,
    superLayer: setup.superLayer
  });
  button.type = setup.type;
  color = "";
  switch (setup.type) {
    case "big":
      setup.fontSize = 20;
      setup.fontWeight = "medium";
      button.borderRadius = ios.utils.px(12.5);
      backgroundColor = "";
      if (button.constraints === void 0) {
        button.constraints = {};
      }
      button.constraints.leading = 10;
      button.constraints.trailing = 10;
      button.constraints.height = 57;
      switch (setup.style) {
        case "light":
          color = ios.utils.color("blue");
          if (setup.blur) {
            backgroundColor = "rgba(255, 255, 255, .9)";
            ios.utils.bgBlur(button);
          } else {
            backgroundColor = "white";
          }
          break;
        case "dark":
          color = "#FFF";
          if (setup.blur) {
            backgroundColor = "rgba(43, 43, 43, .9)";
            ios.utils.bgBlur(button);
          } else {
            backgroundColor = "#282828";
          }
          break;
        default:
          if (setup.blur) {
            color = setup.color;
            backgroundColor = new Color(setup.backgroundColor);
            rgbString = backgroundColor.toRgbString();
            rgbaString = rgbString.replace(")", ", .9)");
            rgbaString = rgbaString.replace("rgb", "rgba");
            backgroundColor = rgbaString;
            ios.utils.bgBlur(button);
          } else {
            color = setup.color;
            backgroundColor = new Color(setup.backgroundColor);
          }
      }
      button.backgroundColor = backgroundColor;
      button.on(Events.TouchStart, function() {
        var newColor;
        newColor = "";
        if (setup.style === "dark") {
          newColor = button.backgroundColor.lighten(10);
        } else {
          newColor = button.backgroundColor.darken(10);
        }
        return button.animate({
          properties: {
            backgroundColor: newColor
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        return button.animate({
          properties: {
            backgroundColor: backgroundColor
          },
          time: .5
        });
      });
      break;
    case "small":
      setup.fontSize = 14;
      setup.top = 4;
      button.borderRadius = ios.utils.px(2.5);
      setup.fontWeight = 500;
      setup.text = setup.text.toUpperCase();
      color = setup.color;
      button.borderColor = setup.color;
      button.backgroundColor = "transparent";
      button.borderWidth = ios.utils.px(1);
      break;
    default:
      button.backgroundColor = "transparent";
      button.origColor = ios.utils.specialChar(button);
      color = setup.color;
      button.labelOrigColor = color;
      button.on(Events.TouchStart, function() {
        var newColor;
        this.labelOrigColor = button.label.color;
        newColor = button.subLayers[0].color.lighten(30);
        return button.subLayers[0].animate({
          properties: {
            color: newColor
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        return this.subLayers[0].animate({
          properties: {
            color: ios.utils.color(this.labelOrigColor)
          },
          time: .5
        });
      });
  }
  button.label = new ios.Text({
    name: ".label",
    text: setup.text,
    color: color,
    lineHeight: 16,
    superLayer: button,
    fontSize: setup.fontSize,
    fontWeight: setup.fontWeight,
    constraints: {
      align: "center"
    }
  });
  switch (setup.type) {
    case "small":
      button.props = {
        width: button.label.width + ios.utils.px(20),
        height: button.label.height + ios.utils.px(10)
      };
      button.on(Events.TouchStart, function() {
        button.animate({
          properties: {
            backgroundColor: color
          },
          time: .5
        });
        return button.label.animate({
          properties: {
            color: "#FFF"
          },
          time: .5
        });
      });
      button.on(Events.TouchEnd, function() {
        button.animate({
          properties: {
            backgroundColor: "transparent"
          },
          time: .5
        });
        return button.label.animate({
          properties: {
            color: color
          },
          time: .5
        });
      });
      break;
    default:
      button.props = {
        width: button.label.width,
        height: button.label.height
      };
  }
  ios.layout.set({
    target: button
  });
  ios.layout.set({
    target: button.label
  });
  return button;
};


},{"ios-kit":"ios-kit"}],"ios-kit-converter":[function(require,module,exports){
var genCSS, ios;

ios = require('ios-kit');

genCSS = function(cssArray) {
  var colonIndex, cssObj, i, j, key, len, prop, value;
  cssObj = {};
  for (i = j = 0, len = cssArray.length; j < len; i = ++j) {
    prop = cssArray[i];
    colonIndex = prop.indexOf(":");
    key = prop.slice(0, colonIndex);
    value = prop.slice(colonIndex + 2, prop.length - 1);
    cssObj[key] = value;
  }
  return cssObj;
};

exports.convert = function(obj) {
  var Artboard, artboards, b, children, device, found, genAlert, genBanner, genButton, genConstraints, genField, genKeyboard, genLayer, genNavBar, genSheet, genStatusBar, genTabBar, genText, getCSS, getColorString, getDesignedDevice, getImage, getLayer, getString, j, key, layerKeys, layers, len, len1, m, newArtboards, newLayers;
  getDesignedDevice = function(w) {
    var device;
    device = {};
    switch (w) {
      case 320:
      case 480:
      case 640:
      case 960:
      case 1280:
        device.scale = 2;
        device.height = 568;
        device.width = 320;
        device.name = 'iphone-5';
        break;
      case 375:
      case 562.5:
      case 750:
      case 1125:
      case 1500:
        device.scale = 2;
        device.height = 667;
        device.width = 375;
        device.name = 'iphone-6s';
        break;
      case 414:
      case 621:
      case 828:
      case 1242:
      case 1656:
        device.scale = 3;
        device.height = 736;
        device.width = 414;
        device.name = 'iphone-6s-plus';
        break;
      case 768:
      case 1152:
      case 1536:
      case 2304:
      case 3072:
        device.scale = 2;
        device.height = 1024;
        device.width = 768;
        device.name = 'ipad';
        break;
      case 1024:
      case 1536:
      case 2048:
      case 3072:
      case 4096:
        device.scale = 2;
        device.height = 1366;
        device.width = 1024;
        device.name = 'ipad-pro';
    }
    switch (w) {
      case 320:
      case 375:
      case 414:
      case 768:
      case 1024:
        device.iScale = 1;
        break;
      case 480:
      case 562.5:
      case 621:
      case 1152:
      case 1536:
        device.iScale = 1.5;
        break;
      case 640:
      case 750:
      case 828:
      case 1536:
      case 2048:
        device.iScale = 2;
        break;
      case 960:
      case 1125:
      case 1242:
      case 2304:
      case 3072:
        device.iScale = 3;
        break;
      case 1280:
      case 1500:
      case 1656:
      case 3072:
      case 4096:
        device.iScale = 4;
    }
    device.obj = 'device';
    return device;
  };
  layerKeys = Object.keys(obj);
  layers = [];
  artboards = [];
  newLayers = {};
  newArtboards = [];
  for (j = 0, len = layerKeys.length; j < len; j++) {
    key = layerKeys[j];
    if (obj[key]._info.kind === 'artboard') {
      artboards.push(obj[key]);
    }
  }
  for (m = 0, len1 = artboards.length; m < len1; m++) {
    b = artboards[m];
    device = getDesignedDevice(b.width);
    Artboard = function(artboard) {
      var board;
      board = new ios.View({
        name: artboard.name,
        backgroundColor: b.backgroundColor,
        constraints: {
          top: 0,
          bottom: 0,
          leading: 0,
          trailing: 0
        }
      });
      return board;
    };
    getString = function(l) {
      return l._info.metadata.string;
    };
    getCSS = function(l) {
      return genCSS(l._info.metadata.css);
    };
    getColorString = function(l) {
      return '-' + getCSS(l).color + ' ' + getString(l);
    };
    getImage = function(l) {
      return l.image;
    };
    getLayer = function(l) {
      return l.copy();
    };
    found = function(o, t) {
      if (o.indexOf(t) !== -1) {
        return true;
      }
    };
    genConstraints = function(l) {
      var bY, cX, cY, constraints, f, lX, r, s, tX, tY;
      constraints = {};
      s = device.iScale;
      cX = device.width / 2;
      cY = device.height / 2;
      tY = device.height / 4 * 3;
      bY = device.height / 4 * 3;
      lX = device.width / 4 * 3;
      tX = device.width / 4 * 3;
      r = function(n) {
        return Math.round(n);
      };
      f = function(n) {
        return Math.floor(n);
      };
      if (cX === l.midX / s || r(cX) === r(l.midX / s) || f(cX) === f(l.midX / s)) {
        constraints.align = 'horizontal';
      }
      if (cY === l.midY / s || r(cY) === r(l.midY / s) || f(cY) === f(l.midY / s)) {
        if (constraints.align === 'horizontal') {
          constraints.align = 'center';
        } else {
          constraints.align = 'vertical';
        }
      }
      if (l.x / s < lX) {
        constraints.leading = r(l.x / s);
      }
      if (l.x / s > tX) {
        constraints.trailing = r(l.parent.width / s - l.maxX / s);
      }
      if (l.y / s < tY) {
        constraints.top = r(l.y / s);
      }
      if (l.y / s > bY) {
        constraints.bottom = r(l.parent.height / s - l.maxY / s);
      }
      if (l.width / s === device.width) {
        constraints.leading = 0;
        constraints.trailing = 0;
      } else {
        constraints.width = l.width / s;
      }
      if (l.height / s === device.height) {
        constraints.top = 0;
        constraints.bottom = 0;
      } else {
        constraints.height = l.height / s;
      }
      return constraints;
    };
    genLayer = function(l, parent) {
      var props;
      props = {
        backgroundColor: 'transparent',
        name: l.name,
        image: l.image,
        superLayer: parent,
        constraints: genConstraints(l)
      };
      return new ios.View(props);
    };
    genAlert = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        actions: [],
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'title')) {
          props.title = getString(c);
        }
        if (found(n, 'message')) {
          props.message = getString(c);
        }
        if (found(n, 'action')) {
          props.actions.unshift(getColorString(c));
        }
        c.destroy();
      }
      return new ios.Alert(props);
    };
    genBanner = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'app')) {
          props.app = getString(c);
        }
        if (found(n, 'title')) {
          props.title = getString(c);
        }
        if (found(n, 'message')) {
          props.message = getString(c);
        }
        if (found(n, 'time')) {
          props.time = getString(c);
        }
        if (found(n, 'icon')) {
          props.icon = getLayer(c);
        }
        c.destroy();
      }
      return new ios.Banner(props);
    };
    genButton = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP,
        constraints: genConstraints(l)
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'small')) {
          props.type = 'small';
        }
        if (found(n, 'big')) {
          props.type = 'big';
        }
        if (found(n, 'dark')) {
          props.style = 'dark';
        }
        if (found(n, 'label')) {
          props.text = getString(c);
          props.color = getCSS(c).color;
          props.fontSize = getCSS(c)['font-size'].replace('px', '');
        }
        c.destroy();
      }
      return new ios.Button(props);
    };
    genField = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP,
        constraints: genConstraints(l)
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'placeholder')) {
          props.placeholder = getString(c);
        }
        c.destroy();
      }
      return new ios.Field(props);
    };
    genKeyboard = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'return')) {
          props.returnText = getString(c);
        }
        if (found(n, 'dark')) {
          props.style = 'dark';
        }
        c.destroy();
      }
      return new ios.Keyboard(props);
    };
    genNavBar = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'title')) {
          props.title = getString(c);
          props.titleColor = getCSS(c).color;
        }
        if (found(n, 'right')) {
          props.right = getString(c);
          props.color = getCSS(c).color;
        }
        if (found(n, 'left')) {
          props.left = getString(c);
        }
        c.destroy();
      }
      return new ios.NavBar(props);
    };
    genSheet = function(l, nP) {
      var c, i, len2, n, props, q, ref;
      props = {
        actions: [],
        superLayer: nP
      };
      ref = l.children;
      for (i = q = 0, len2 = ref.length; q < len2; i = ++q) {
        c = ref[i];
        n = c.name;
        if (found(n, 'action')) {
          props.actions.push(getColorString(c));
        }
        if (found(n, 'exit')) {
          props.exit = getString(c);
        }
        c.destroy();
      }
      return new ios.Sheet(props);
    };
    genStatusBar = function(l, nP) {
      var c, len2, n, props, q, ref;
      props = {
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        if (found(n, 'carrier')) {
          props.carrier = getString(c);
        }
        if (found(n, 'battery')) {
          props.battery = getString(c).replace('%', '');
        }
        if (found(n, 'network')) {
          props.network = getString(c);
        }
        if (found(n, 'dark')) {
          props.style = 'light';
        }
        c.destroy();
      }
      return new ios.StatusBar(props);
    };
    genTabBar = function(l, nP) {
      var c, len2, len3, n, props, q, ref, ref1, t, tn, tprops, u;
      props = {
        tabs: [],
        superLayer: nP
      };
      ref = l.children;
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        tprops = {};
        ref1 = c.children;
        for (u = 0, len3 = ref1.length; u < len3; u++) {
          t = ref1[u];
          tn = t.name;
          if (n === 'tab_active' && tn.indexOf('label') !== -1) {
            props.activeColor = getCSS(t).color;
          }
          if (n !== 'tab_active' && tn.indexOf('label') !== -1) {
            props.inactiveColor = getCSS(t).color;
          }
          if (found(tn, 'active') && tn.indexOf('inactive') === -1) {
            tprops.active = getLayer(t);
          }
          if (found(tn, 'inactive')) {
            tprops.inactive = getLayer(t);
          }
          if (found(tn, 'label')) {
            tprops.label = getString(t);
          }
          t.destroy();
        }
        props.tabs.unshift(new ios.Tab(tprops));
        c.destroy();
      }
      return new ios.TabBar(props);
    };
    genText = function(l, nP) {
      var css, k, keys, len2, props, q;
      props = {
        superLayer: nP,
        text: getString(l),
        constraints: genConstraints(l)
      };
      css = getCSS(l);
      keys = Object.keys(getCSS(l));
      for (q = 0, len2 = keys.length; q < len2; q++) {
        k = keys[q];
        if (found(k, 'font-family')) {
          props.fontFamily = css[k];
        }
        if (found(k, 'opacity')) {
          props.opacity = Number(css[k]);
        }
        if (found(k, 'color')) {
          props.color = css[k];
        }
        if (found(k, 'font-size')) {
          props.fontSize = css[k].replace('px', '');
        }
        if (found(k, 'letter-spacing')) {
          props.letterSpacing = css[k];
        }
        if (found(k, 'line-height')) {
          props.lineHeight = css[k].replace('px', '');
        }
      }
      return new ios.Text(props);
    };
    children = function(p, nP) {
      var c, len2, n, newLayer, q, ref, results;
      ref = p.children;
      results = [];
      for (q = 0, len2 = ref.length; q < len2; q++) {
        c = ref[q];
        n = c.name;
        newLayer = 0;
        if (c.name[0] === '_') {
          if (found(n, '_Alert')) {
            newLayer = genAlert(c, nP);
          }
          if (found(n, '_Banner')) {
            newLayer = genBanner(c, nP);
          }
          if (found(n, '_Button')) {
            newLayer = genButton(c, nP);
          }
          if (found(n, '_Field')) {
            newLayer = genField(c, nP);
          }
          if (found(n, '_Keyboard')) {
            newLayer = genKeyboard(c, nP);
          }
          if (found(n, '_NavBar')) {
            newLayer = genNavBar(c, nP);
          }
          if (found(n, '_Sheet')) {
            newLayer = genSheet(c, nP);
          }
          if (found(n, '_TabBar')) {
            newLayer = genTabBar(c, nP);
          }
          if (found(n, '_StatusBar')) {
            newLayer = new genStatusBar(c, nP);
          }
          if (found(n, '_Text')) {
            newLayer = genText(c, nP);
          }
          if (newLayer === void 0) {
            newLayer = genLayer(c, nP);
          }
        } else {
          newLayer = genLayer(c, nP);
        }
        newLayers[n] = newLayer;
        if (c.children) {
          children(c, newLayer);
        }
        results.push(c.destroy());
      }
      return results;
    };
    ios.l[b.name] = new Artboard(b);
    children(b, ios.l[b.name]);
    b.destroy();
    newArtboards.push(ios.l[b.name]);
    newLayers[b.name] = ios.l[b.name];
  }
  return newLayers;
};


},{"ios-kit":"ios-kit"}],"ios-kit-field":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  name: 'field',
  active: false,
  keyboard: true,
  placeholder: "Enter text",
  placeholderColor: "#999",
  superLayer: void 0,
  backgroundColor: "white",
  borderColor: "#CCCCCC",
  borderRadius: ios.px(5),
  borderWidth: ios.px(1),
  height: ios.px(30),
  width: ios.px(97),
  fontSize: 17,
  color: 'black',
  textConstraints: {
    leading: 4,
    align: "vertical"
  },
  constraints: {
    height: 30,
    width: 97,
    align: "center"
  }
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var field, setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
  field = new ios.View({
    name: setup.name,
    constraints: setup.constraints,
    backgroundColor: setup.backgroundColor,
    borderColor: setup.borderColor,
    borderRadius: setup.borderRadius,
    borderWidth: setup.borderWidth,
    height: setup.height,
    width: setup.width,
    clip: true,
    superLayer: setup.superLayer
  });
  field.text = new ios.Text({
    superLayer: field,
    name: ".text",
    constraints: setup.textConstraints,
    text: '',
    fontSize: 17,
    color: setup.color
  });
  field.text.placeholder = new ios.Text({
    superLayer: field,
    name: ".placeholder",
    constraints: setup.textConstraints,
    text: setup.placeholder,
    fontSize: 17,
    color: setup.placeholderColor
  });
  field.active = setup.active;
  field.type = 'field';
  field.on(Events.TouchEnd, function() {
    if (field.active !== true) {
      field.active = true;
      if (setup.keyboard === true && field.keyboard === void 0) {
        field.keyboard = new ios.Keyboard({
          output: field.text,
          hidden: true
        });
      }
      if (typeof setup.keyboard === 'object') {
        field.input(setup.keyboard);
        field.keyboard = setup.keyboard;
      }
      field.keyboard.call();
      field.text.cursor = new ios.View({
        superLayer: field,
        name: "cursor",
        backgroundColor: ios.color("blue"),
        constraints: {
          width: 2,
          height: setup.fontSize + 6,
          leading: 4,
          align: "vertical"
        }
      });
      if (field.text.html !== setup.placeholder) {
        field.text.cursor.constraints.leading = field.text;
        ios.layout.set(field.text.cursor);
      }
      field.listeningToField = Utils.interval(.1, function() {
        if (field.active === false) {
          clearInterval(field.interval);
          clearInterval(field.listeningToField);
          return field.text.cursor.destroy();
        }
      });
      field.interval = Utils.interval(.6, function() {
        if (field.active) {
          if (field.text.cursor.opacity) {
            return field.text.cursor.animate({
              properties: {
                opacity: 0
              },
              time: .5
            });
          } else {
            return field.text.cursor.animate({
              properties: {
                opacity: 1
              },
              time: .5
            });
          }
        }
      });
      return field.text.on("change:html", function() {
        this.cursor.constraints.leading = this;
        if (this.html === '') {
          this.placeholder.visible = true;
        } else {
          this.placeholder.visible = false;
        }
        if (this.html.indexOf(this.placeholder) !== -1) {
          this.html = this.html.replace(this.placeholder, '');
        }
        return ios.layout.set(this.cursor);
      });
    }
  });
  field.input = function(keyboard) {
    return keyboard.output(field);
  };
  return field;
};


},{"ios-kit":"ios-kit"}],"ios-kit-keyboard":[function(require,module,exports){
var arrayOfCodes, codeMap, device, ios, letters, numbers, symbols;

ios = require('ios-kit');

exports.defaults = {
  style: "light",
  shift: true,
  output: void 0,
  returnText: "return",
  state: "letters",
  hidden: false,
  returnColor: "blue",
  superLayer: void 0
};

device = {
  "google-nexus-5x": {
    popUpChar: 38,
    popUpTop: 6,
    height: 226,
    lineHeight: 42,
    letterKey: {
      keyTop: 12,
      height: 45,
      width: 36,
      borderRadius: 5,
      fontSize: 24,
      top: 10
    },
    specialKeyWidth: 45,
    specialKeyHeight: 45,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 20,
      top: 11
    },
    row3: {
      top: 11,
      leading: 63
    },
    area: {
      top: 8,
      leading: 4,
      trailing: 4,
      bottom: 5
    },
    returnWidth: 97,
    popUpOffset: {
      x: 10,
      y: 38
    }
  },
  "iphone-5": {
    popUpChar: 40,
    popUpTop: 4,
    height: 215,
    lineHeight: 36,
    letterKey: {
      keyTop: 6,
      height: 39,
      width: 26.5,
      borderRadius: 5,
      fontSize: 22.5
    },
    specialKeyWidth: 38.5,
    specialKeyHeight: 38.5,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 19,
      top: 16
    },
    row3: {
      top: 16,
      leading: 51
    },
    area: {
      top: 11,
      leading: 3,
      trailing: 3,
      bottom: 4
    },
    returnWidth: 75,
    popUpOffset: {
      x: 4,
      y: 30
    }
  },
  "iphone-6s": {
    popUpChar: 40,
    popUpTop: 6,
    height: 218,
    lineHeight: 40,
    letterKey: {
      keyTop: 10,
      height: 42,
      width: 31.5,
      borderRadius: 5,
      fontSize: 23,
      top: 10
    },
    specialKeyWidth: 42,
    specialKeyHeight: 42,
    space: 6,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 22,
      top: 12
    },
    row3: {
      top: 12,
      leading: 59
    },
    area: {
      top: 12,
      leading: 3,
      trailing: 3,
      bottom: 4
    },
    returnWidth: 87,
    popUpOffset: {
      x: 5,
      y: 32
    }
  },
  "iphone-6s-plus": {
    popUpChar: 38,
    popUpTop: 6,
    height: 226,
    lineHeight: 42,
    letterKey: {
      keyTop: 12,
      height: 45,
      width: 36,
      borderRadius: 5,
      fontSize: 24,
      top: 10
    },
    specialKeyWidth: 45,
    specialKeyHeight: 45,
    space: 5,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 20,
      top: 11
    },
    row3: {
      top: 11,
      leading: 63
    },
    area: {
      top: 8,
      leading: 4,
      trailing: 4,
      bottom: 5
    },
    returnWidth: 97,
    popUpOffset: {
      x: 10,
      y: 38
    }
  },
  "ipad": {
    height: 313,
    lineHeight: 55,
    letterKey: {
      height: 55,
      width: 56,
      borderRadius: 5,
      fontSize: 23
    },
    specialKeyWidth: 56,
    specialKeyHeight: 55,
    space: 12,
    returnWidth: 106,
    row1: {
      leading: 0,
      top: 0
    },
    row2: {
      leading: 30,
      top: 9
    },
    row3: {
      leading: 68,
      top: 9
    },
    area: {
      top: 55,
      leading: 6,
      trailing: 6,
      bottom: 8
    }
  },
  "ipad-pro": {
    height: 378,
    lineHeight: 61,
    letterKey: {
      height: 61,
      width: 63,
      borderRadius: 5,
      fontSize: 23
    },
    space: 7,
    returnWidth: 120,
    specialKeyHeight: 61,
    specialKeyWidth: 93,
    row1: {
      leading: 111,
      top: 53
    },
    row2: {
      leading: 126,
      top: 7
    },
    row3: {
      leading: 161,
      top: 7
    },
    area: {
      top: 56,
      leading: 4,
      trailing: 4,
      bottom: 4
    }
  }
};

codeMap = {
  8: 'delete',
  9: 'tab',
  13: 'return',
  16: 'shift',
  20: 'caps',
  32: 'space',
  27: "dismiss",
  33: "!",
  34: "\"",
  35: "#",
  36: "$",
  37: "%",
  38: "&",
  39: "\'",
  40: "(",
  41: ")",
  42: "*",
  43: "+",
  44: ",",
  45: "-",
  47: "/",
  46: ".",
  48: "0",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  48: ")",
  59: "_",
  60: "<",
  61: "=",
  62: ">",
  63: "?",
  64: "@",
  65: "A",
  66: "B",
  67: "C",
  68: "D",
  69: "E",
  70: "F",
  71: "G",
  72: "H",
  73: "I",
  74: "J",
  75: "K",
  76: "L",
  77: "M",
  78: "N",
  79: "O",
  80: "P",
  81: "Q",
  82: "R",
  83: "S",
  84: "T",
  85: "U",
  86: "V",
  87: "W",
  88: "X",
  89: "Y",
  90: "Z",
  91: 'cmd',
  219: "[",
  92: "\\",
  221: "]",
  94: "^",
  95: "_",
  96: "`",
  97: "a",
  98: "b",
  99: "c",
  100: "d",
  101: "e",
  102: "f",
  103: "g",
  104: "h",
  105: "i",
  106: "j",
  107: "k",
  108: "l",
  109: "m",
  110: "n",
  111: "o",
  112: "p",
  113: "q",
  114: "r",
  115: "s",
  116: "t",
  117: "u",
  118: "v",
  119: "w",
  120: "x",
  121: "y",
  122: "z",
  123: "{",
  124: "|",
  125: "}",
  126: "~",
  186: ":",
  187: "+",
  188: "<",
  190: ">",
  191: "?",
  189: "_",
  192: "~",
  219: "{",
  220: "\|",
  221: "}",
  222: "&rdquo;"
};

arrayOfCodes = Object.keys(codeMap);

letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "/", ":", ";", "(", ")", "$", "&", "@", "\"", ".", ",", "?", "!", "′"];

symbols = ["[", "]", "{", "}", "#", "%", "^", "*", "+", "=", "_", "\\", "|", "~", "<", ">", "€", "£", "¥", "•"];

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(obj) {
  var Delete, Dismiss, Emoji, Icon, IconWithState, Key, Letter, Numbers, Return, Shift, Space, SpecialKey, Tab, board, capitalizeKeys, colors, handleKeyColor, popUp, setup, specs, style;
  setup = ios.utils.setupComponent(obj, exports.defaults);
  style = {
    light: {
      backgroundColor: "#D1D5DA",
      color: "#000",
      specialKeyBG: "#ACB3BD",
      keyBG: "#F7F7F7",
      shadowY: ios.px(1),
      shadowColor: "#898B8F",
      returnBG: ios.color(setup.returnColor)
    },
    dark: {
      backgroundColor: "rgba(0,0,0,.7)",
      color: "#FFF",
      specialKeyBG: "rgba(67,67,67,.8)",
      keyBG: "rgba(105,105,105,.8)",
      shadowY: ios.px(1),
      shadowColor: "rgba(0,0,0,.4)",
      returnBG: ios.color(setup.returnColor)
    }
  };
  specs = device[ios.device.name];
  colors = style[setup.style];
  device;
  board = new ios.View({
    name: "Keyboard",
    superLayer: setup.superLayer,
    backgroundColor: style[setup.style].backgroundColor,
    y: ios.device.height,
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: -1 * 270,
      height: 270
    }
  });
  ios.utils.bgBlur(board);
  board.output = function(obj) {
    if (board.target) {
      if (board.target.type === 'field') {
        board.target.active = false;
      }
    }
    board.target = obj;
    if (board.target) {
      if (board.target.type === 'field') {
        return board.target.active = true;
      }
    }
  };
  board.hidden = setup.hidden;
  if (board.hidden === false) {
    board.constraints.bottom = 0;
    ios.layout.set(board);
  }
  board.call = function() {
    board.y = ios.device.height;
    board.constraints.bottom = 0;
    if (board.hidden) {
      board.hidden = false;
      ios.layout.animate({
        target: board,
        time: .5,
        curve: 'ease-in-out'
      });
    }
    return board.bringToFront();
  };
  board.dismiss = function() {
    board.constraints.bottom = -1 * ios.pt(board.height);
    board.hidden = true;
    board.target.active = false;
    return ios.layout.animate({
      target: board,
      time: .5,
      curve: 'ease-in-out'
    });
  };
  board["delete"] = function() {
    var isSpace, layer, text;
    layer = "";
    if (board.target) {
      if (board.target.type === 'field') {
        layer = board.target.text;
      } else {
        layer = board.target;
      }
      isSpace = layer.html.slice(layer.html.length - 5, +(layer.html.length - 1) + 1 || 9e9);
      if (isSpace !== 'nbsp;') {
        text = layer.html.slice(0, -1);
        return layer.html = text;
      } else {
        text = layer.html.slice(0, -6);
        return layer.html = text;
      }
    }
  };
  board.capsLock = function() {
    board.isCapsLock = true;
    board.isCapital = true;
    board.keys.shift.icon.toggle('off');
    handleKeyColor(board.keys.shift);
    if (ios.device.name === 'ipad-pro') {
      board.keys.shiftalt.icon.toggle('off');
      return handleKeyColor(board.keys.shiftalt);
    }
  };
  board.output(setup.output);
  board.keysArray = [];
  board.keys = {};
  board.isCapital = setup.shift;
  board.area = new ios.View({
    name: ".area",
    superLayer: board,
    constraints: specs.area,
    backgroundColor: "transparent"
  });
  Key = function(obj) {
    var key;
    key = new ios.View({
      name: ".keys." + obj.name,
      constraints: obj.constraints,
      superLayer: board.area,
      borderRadius: ios.px(specs.letterKey.borderRadius),
      shadowY: colors.shadowY,
      shadowColor: colors.shadowColor
    });
    key.style.fontFamily = "-apple-system, Helvetica, Arial, sans-serif";
    key.on(Events.TouchStart, function(event) {
      return event.preventDefault();
    });
    return key;
  };
  Letter = function(obj) {
    var key;
    key = new Key(obj);
    key.backgroundColor = colors.keyBG;
    key.html = obj.letter;
    key.color = colors.color;
    key.style.textAlign = "center";
    key.style.lineHeight = ios.px(specs.lineHeight) + "px";
    key.style.fontSize = ios.px(specs.letterKey.fontSize) + "px";
    key.value = obj.letter;
    if (key.value === "space") {
      key.value = "&nbsp;";
    }
    if (ios.isPad()) {
      key.down = function() {
        key.backgroundColor = colors.specialKeyBG;
        if (board.target) {
          return ios.utils.write(board.target, key.value);
        }
      };
      key.up = function() {
        key.backgroundColor = colors.keyBG;
        if (board.isCapital && board.isCapsLock !== true) {
          board.isCapital = false;
          capitalizeKeys();
          board.keys.shift.up();
          if (ios.isPad()) {
            return board.keys.shiftalt.up();
          }
        }
      };
      key.on(Events.TouchStart, function() {
        return key.down();
      });
      key.on(Events.TouchEnd, function() {
        return key.up();
      });
    } else {
      if (key.value !== '&nbsp;') {
        key.down = function() {
          board.popUp.visible = true;
          board.bringToFront();
          board.popUp.bringToFront();
          board.popUp.midX = key.midX;
          board.popUp.maxY = key.maxY;
          board.popUp.text.html = key.value;
          if (board.target) {
            return ios.utils.write(board.target, key.value);
          }
        };
        key.up = function() {
          board.popUp.visible = false;
          if (board.isCapital && board.capsLock !== true) {
            board.isCapital = false;
            capitalizeKeys();
            return board.keys.shift.up();
          }
        };
        key.on(Events.TouchStart, function() {
          return key.down();
        });
        key.on(Events.TouchEnd, function() {
          return key.up();
        });
      } else {
        key.down = function() {
          key.backgroundColor = colors.specialKeyBG;
          if (board.target) {
            return ios.utils.write(board.target, key.value);
          }
        };
        key.up = function() {
          return key.backgroundColor = colors.keyBG;
        };
        key.on(Events.TouchStart, function() {
          return key.down();
        });
        key.on(Events.TouchEnd, function() {
          return key.up();
        });
      }
    }
    return key;
  };
  SpecialKey = function(obj) {
    var key;
    key = new Key(obj);
    key.backgroundColor = colors.specialKeyBG;
    key.color = colors.color;
    key.style.textAlign = "center";
    if (ios.device.name === 'ipad-pro') {
      key.style.fontSize = ios.px(18) + "px";
    } else {
      key.style.fontSize = ios.px(16) + "px";
    }
    return key;
  };
  Icon = function(obj) {
    var icon;
    icon = new ios.View({
      name: 'icon',
      backgroundColor: "transparent",
      superLayer: obj.superLayer,
      constraints: {
        align: 'center'
      }
    });
    icon.props = {
      height: obj.icon.height,
      width: obj.icon.width,
      html: obj.icon.svg
    };
    ios.utils.changeFill(icon, colors.color);
    return icon;
  };
  IconWithState = function(obj) {
    var icon;
    icon = new ios.View({
      name: 'icon',
      backgroundColor: "transparent",
      superLayer: obj.superLayer,
      constraints: {
        align: 'center'
      }
    });
    icon.toggle = function(state) {
      if (state === void 0) {
        if (icon.state === 'on') {
          state = 'off';
        } else {
          state = 'on';
        }
      }
      if (state === "on") {
        if (ios.device.name !== 'ipad-pro') {
          icon.html = obj.on.svg;
          icon.width = obj.on.width;
          icon.height = obj.on.height;
        }
        icon.state = 'on';
      } else {
        if (ios.device.name !== 'ipad-pro') {
          icon.html = obj.off.svg;
          icon.width = obj.on.width;
          icon.height = obj.on.height;
        }
        icon.state = 'off';
      }
      return ios.utils.changeFill(icon, colors.color);
    };
    if (obj.state) {
      icon.toggle('on');
    } else {
      icon.toggle('off');
    }
    return icon;
  };
  capitalizeKeys = function() {
    var j, key, len, ref, results;
    ref = board.keysArray;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      key = ref[j];
      if (board.isCapital) {
        if (key.html.length === 1 && key.html.match(/[a-z]/i)) {
          key.html = key.html.toUpperCase();
          key.value = key.html;
        }
        if (key.alt) {
          key.alt.destroy();
          key.alt = void 0;
        }
        if (key.height > ios.px(46)) {
          key.style.lineHeight = ios.px(specs.letterKey.height) + 'px';
          key.style.fontSize = ios.px(23) + 'px';
        } else {
          if (ios.device.name === 'ipad-pro') {
            key.style.lineHeight = ios.px(46) + 'px';
          } else {
            key.style.lineHeight = ios.px(specs.lineHeight) + 'px';
          }
          key.style.fontSize = ios.px(20) + 'px';
        }
        results.push(key.value = key.html);
      } else {
        if (key.html.length === 1 && key.html.match(/[a-z]/i)) {
          key.html = key.html.toLowerCase();
          results.push(key.value = key.html);
        } else {
          if (key.alt === void 0) {
            key.alt = new ios.Text({
              text: "",
              superLayer: key,
              color: colors.color,
              constraints: {
                align: "horizontal",
                bottom: 4
              },
              fontSize: specs.letterKey.fontSize
            });
            if (board.topRow) {
              if (board.topRow.indexOf(key) !== -1) {
                key.style.lineHeight = ios.px(23) + 'px';
                key.style.fontSize = ios.px(16) + 'px';
                key.alt.style.fontSize = ios.px(16) + 'px';
              } else {
                key.style.lineHeight = ios.px(36) + 'px';
                key.style.fontSize = ios.px(20) + 'px';
                key.alt.style.fontSize = ios.px(20) + 'px';
                key.alt.constraints.bottom = 8;
              }
            }
            switch (key.value) {
              case "&lt;":
                key.alt.html = ".";
                break;
              case "&gt;":
                key.alt.html = ",";
                break;
              case "<":
                key.alt.html = ".";
                break;
              case ">":
                key.alt.html = ",";
                break;
              case "?":
                key.alt.html = ".";
                break;
              case "{":
                key.alt.html = "[";
                break;
              case "}":
                key.alt.html = "}";
                break;
              case "\|":
                key.alt.html = "\\";
                break;
              case "~":
                key.alt.html = "`";
                break;
              case "!":
                key.alt.html = ".";
                break;
              case "@":
                key.alt.html = "2";
                break;
              case "#":
                key.alt.html = "3";
                break;
              case "$":
                key.alt.html = "4";
                break;
              case "%":
                key.alt.html = "5";
                break;
              case "^":
                key.alt.html = "6";
                break;
              case "&amp;":
                key.alt.html = "7";
                break;
              case "&":
                key.alt.html = "7";
                break;
              case "*":
                key.alt.html = "8";
                break;
              case "(":
                key.alt.html = "9";
                break;
              case ")":
                key.alt.html = "0";
                break;
              case "_":
                key.alt.html = "-";
                break;
              case "+":
                key.alt.html = "=";
                break;
              default:
                key.alt.html = "&prime;";
            }
            ios.layout.set(key.alt);
            if (ios.device.name === 'ipad-pro' && key.value === '!') {
              key.alt.html = '1';
            }
            if (ios.device.name === 'ipad-pro' && key.value === '?') {
              key.alt.html = '/';
            }
            if (ios.device.name === 'ipad-pro' && key.value === ':') {
              key.alt.html = ';';
            }
            if (ios.device.name === 'ipad-pro' && key.value === '&rdquo;') {
              key.alt.html = '&prime;';
            }
            results.push(key.value = key.alt.html);
          } else {
            results.push(void 0);
          }
        }
      }
    }
    return results;
  };
  handleKeyColor = function(key) {
    if (ios.isPhone) {
      if (key.icon.state === 'on') {
        return key.backgroundColor = colors.keyBG;
      } else {
        return key.backgroundColor = colors.specialKeyBG;
      }
    }
  };
  Space = function(obj) {
    var key;
    key = new Letter(obj);
    key.html = 'space';
    key.backgroundColor = colors.keyBG;
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    key.style.fontSize = ios.px(16) + 'px';
    return key;
  };
  Shift = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new IconWithState({
      superLayer: key,
      state: obj.shift,
      on: ios.utils.svg(ios.assets.shift.on),
      off: ios.utils.svg(ios.assets.shift.off)
    });
    handleKeyColor(key);
    key.on(Events.TouchEnd, function() {
      this.icon.toggle();
      handleKeyColor(key);
      if (this.icon.state === 'on') {
        board.isCapital = true;
      } else {
        board.isCapital = false;
      }
      return capitalizeKeys();
    });
    key.down = function() {
      key.icon.toggle('on');
      handleKeyColor(key);
      board.isCapital = true;
      return capitalizeKeys();
    };
    key.up = function() {
      key.icon.toggle('off');
      handleKeyColor(key);
      board.isCapital = false;
      return capitalizeKeys();
    };
    ios.layout.set(key.icon);
    if (ios.isPad()) {
      key.on(Events.TouchEnd, function() {
        if (this.icon.state === 'on') {
          board.keys.shift.icon.toggle('on');
          board.keys.shiftalt.icon.toggle('on');
        } else {
          board.keys.shift.icon.toggle('off');
          board.keys.shiftalt.icon.toggle('off');
        }
        handleKeyColor(board.keys.shift);
        return handleKeyColor(board.keys.shiftalt);
      });
    }
    return key;
  };
  Delete = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new IconWithState({
      superLayer: key,
      on: ios.utils.svg(ios.assets["delete"].on),
      off: ios.utils.svg(ios.assets["delete"].off)
    });
    key.fire = function() {
      return board["delete"]();
    };
    key.down = function() {
      key.icon.toggle('on');
      handleKeyColor(key);
      return key.fire();
    };
    key.up = function() {
      key.icon.toggle('off');
      return handleKeyColor(key);
    };
    key.on(Events.TouchStart, function() {
      return key.down();
    });
    key.on(Events.TouchEnd, function() {
      return key.up();
    });
    return key;
  };
  Numbers = function(obj) {
    var key;
    key = new SpecialKey(obj);
    if (ios.isPhone()) {
      key.html = '123';
    } else {
      key.html = '.?123';
    }
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    return key;
  };
  Emoji = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new Icon({
      superLayer: key,
      icon: ios.utils.svg(ios.assets.emoji)
    });
    return key;
  };
  Return = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.backgroundColor = colors.returnBG;
    key.html = setup.returnText;
    key.style.lineHeight = ios.px(specs.specialKeyHeight) + "px";
    key.color = ios.utils.autoColor(colors.returnBG);
    key.down = function() {
      var nothingHappens;
      return nothingHappens = true;
    };
    key.up = function() {
      board.dismiss();
      if (board.target) {
        if (board.target.parent) {
          return board.target.parent.active = false;
        }
      }
    };
    key.on(Events.TouchEnd, function() {
      return key.down();
    });
    key.on(Events.TouchStart, function() {
      return key.up();
    });
    return key;
  };
  Dismiss = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.icon = new Icon({
      superLayer: key,
      icon: ios.utils.svg(ios.assets.keyboard)
    });
    key.icon.scale = .8;
    key.icon.constraints = {
      bottom: 12,
      trailing: 12
    };
    ios.layout.set(key.icon);
    key.down = function() {
      return board.dismiss();
    };
    key.up = function() {
      var nothingHappens;
      return nothingHappens = false;
    };
    key.on(Events.TouchEnd, function() {
      return key.down();
    });
    return key;
  };
  Tab = function(obj) {
    var key;
    key = new SpecialKey(obj);
    key.html = 'tab';
    key.style.lineHeight = ios.px(70) + 'px';
    key.style.textAlign = 'left';
    key.style.paddingLeft = ios.px(12) + 'px';
    return key;
  };
  board.switchLetters = function() {
    var i, j, k, key, l, len, len1, row1Break, row2Break, topKey, topLetters;
    row1Break = 10;
    row2Break = 19;
    if (ios.isPad()) {
      letters.push('!');
      letters.push('?');
    }
    if (ios.device.name === "ipad-pro") {
      letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "\|", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "&rdquo;", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?"];
      topLetters = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"];
      row1Break = 13;
      row2Break = 24;
    }
    for (i = j = 0, len = letters.length; j < len; i = ++j) {
      l = letters[i];
      key = new Letter({
        name: l,
        constraints: {
          height: specs.letterKey.height,
          width: specs.letterKey.width
        },
        letter: l
      });
      if (l === 'w' || l === 'r' || l === 'y' || l === 'i' || l === 'p') {
        key.constraints.width = key.constraints.width + 1;
      }
      board.keys[l] = key;
      board.keysArray.push(key);
      if (i === 0) {
        key.constraints.leading = specs.row1.leading;
        key.constraints.top = specs.row1.top;
      }
      if (i > 0 && i < row1Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = specs.row1.top;
      }
      if (i === row1Break) {
        key.constraints.leading = specs.row2.leading;
        key.constraints.top = [board.keysArray[0], specs.row2.top];
      }
      if (i > row1Break && i < row2Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = [board.keysArray[0], specs.row2.top];
      }
      if (i === row2Break) {
        key.constraints.leading = specs.row3.leading;
        key.constraints.top = [board.keysArray[row1Break], specs.row3.top];
      }
      if (i > row2Break) {
        key.constraints.leading = [board.keysArray[i - 1], specs.space];
        key.constraints.top = [board.keysArray[row1Break], specs.row3.top];
      }
      ios.layout.set(key);
    }
    board.keys.shift = new Shift({
      name: "shift",
      shift: setup.shift,
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottomEdges: board.keys.z
      }
    });
    board.keys["delete"] = new Delete({
      name: "delete",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottomEdges: board.keys.z,
        trailing: 0
      }
    });
    board.keys.numbers = new Numbers({
      name: "numbers",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        bottom: 0,
        leading: 0
      }
    });
    board.keys.emoji = new Emoji({
      name: "emoji",
      constraints: {
        height: specs.specialKeyHeight,
        width: specs.specialKeyWidth,
        leading: [board.keys.numbers, specs.space],
        bottom: 0
      }
    });
    board.keys["return"] = new Return({
      name: "return",
      constraints: {
        bottom: 0,
        trailing: 0,
        width: specs.returnWidth,
        height: specs.specialKeyHeight
      }
    });
    board.keys.space = new Space({
      name: "space",
      letter: "space",
      constraints: {
        leading: [board.keys.emoji, specs.space],
        trailing: [board.keys["return"], specs.space],
        bottom: 0,
        height: specs.specialKeyHeight
      }
    });
    if (ios.isPad()) {
      board.keys["return"].constraints.bottom = void 0;
      board.keys["return"].constraints.bottomEdges = board.keysArray[row1Break];
      board.keys["delete"].constraints.top = 0;
      board.keys["delete"].constraints.bottomEdges = void 0;
      board.keys["delete"].constraints.width = 61;
      board.keys.shiftalt = new Shift({
        name: "shiftalt",
        shift: setup.shift,
        constraints: {
          height: specs.specialKeyHeight,
          width: 76,
          bottomEdges: board.keys.z,
          trailing: 0
        }
      });
      board.keys.dismiss = new Dismiss({
        name: "dismiss",
        constraints: {
          height: specs.specialKeyHeight,
          width: specs.specialKeyWidth,
          bottom: 0,
          trailing: 0
        }
      });
      board.keys.numbersalt = new Numbers({
        name: "numbersalt",
        constraints: {
          height: specs.specialKeyHeight,
          width: 93,
          bottom: 0,
          trailing: [board.keys.dismiss, specs.space]
        }
      });
      board.keys.space.html = "";
      board.keys.space.constraints.trailing = [board.keys.numbersalt, specs.space];
      ios.layout.set();
    }
    board.topRow = [];
    if (ios.device.name === 'ipad-pro') {
      for (i = k = 0, len1 = topLetters.length; k < len1; i = ++k) {
        l = topLetters[i];
        topKey = new Letter({
          letter: l,
          name: l,
          constraints: {
            height: 46,
            width: 63,
            top: 0
          }
        });
        if (i === 0) {
          topKey.constraints.leading = 0;
        } else {
          topKey.constraints.leading = [board.topRow[i - 1], specs.space];
        }
        topKey.style.lineHeight = ios.px(46) + 'px';
        ios.layout.set(topKey);
        board.topRow.push(topKey);
        board.keysArray.push(topKey);
        board.keys[l] = topKey;
      }
      board.keys["delete"].icon.destroy();
      board.keys["delete"].html = 'delete';
      board.keys["delete"].style.lineHeight = ios.px(53) + 'px';
      board.keys["delete"].style.textAlign = 'right';
      board.keys["delete"].style.paddingRight = ios.px(12) + 'px';
      board.keys["delete"].constraints = {
        top: 0,
        trailing: 0,
        height: 46,
        width: 106
      };
      board.keys.shift.icon.destroy();
      board.keys.shift.html = 'shift';
      board.keys.shift.style.lineHeight = ios.px(70) + 'px';
      board.keys.shift.style.textAlign = 'left';
      board.keys.shift.style.paddingLeft = ios.px(12) + 'px';
      board.keys.shift.constraints.width = 154;
      board.keys.shiftalt.icon.destroy();
      board.keys.shiftalt.html = 'shift';
      board.keys.shiftalt.style.lineHeight = ios.px(70) + 'px';
      board.keys.shiftalt.style.textAlign = 'right';
      board.keys.shiftalt.style.paddingRight = ios.px(12) + 'px';
      board.keys.shiftalt.constraints.width = 155;
      board.keys.emoji.icon.constraints = {
        leading: 15,
        bottom: 11
      };
      board.keys.emoji.constraints = {
        width: 144,
        height: 61,
        leading: 0,
        bottom: 0
      };
      ios.layout.set();
      board.keys.numbersalt.constraints.width = 93;
      board.keys.dismiss.constraints.width = 93;
      board.keys.com = new Letter({
        name: '.com',
        letter: '.com',
        constraints: {
          height: specs.letterKey.height,
          width: specs.letterKey.width,
          bottom: 0,
          trailing: [board.keys.numbersalt, specs.space]
        }
      });
      board.keys.com.style.fontSize = ios.px(16) + 'px';
      board.keys.numbers.constraints = {
        width: 143,
        height: 61,
        leading: [board.keys.emoji, specs.space]
      };
      board.keys.numbers.style.lineHeight = ios.px(70) + 'px';
      board.keys.numbers.style.textAlign = 'left';
      board.keys.numbers.style.paddingLeft = ios.px(12) + 'px';
      board.keys["return"].style.lineHeight = ios.px(70) + 'px';
      board.keys["return"].style.textAlign = 'right';
      board.keys["return"].style.paddingRight = ios.px(12) + 'px';
      board.keys.space.constraints.leading = [board.keys.numbers, specs.space];
      board.keys.space.constraints.trailing = [board.keys.com, specs.space];
      board.keys.caps = new Shift({
        name: 'caps',
        caps: true,
        constraints: {
          height: specs.specialKeyHeight,
          width: 119,
          bottomEdges: board.keysArray[row1Break]
        }
      });
      board.keys.caps.icon.destroy();
      board.keys.caps.html = 'caps lock';
      board.keys.caps.style.lineHeight = ios.px(70) + 'px';
      board.keys.caps.style.textAlign = 'left';
      board.keys.caps.style.paddingLeft = ios.px(12) + 'px';
      board.keys.caps.down = function() {
        if (board.isCapsLock) {
          return board.isCapsLock = false;
        } else {
          return board.capsLock();
        }
      };
      board.keys.caps.on(Events.TouchEnd, function() {
        return board.keys.caps.down();
      });
      board.keys.caps.up = function() {
        var nothingHappens;
        return nothingHappens = true;
      };
      board.keys.tab = new Tab({
        name: 'tab',
        constraints: {
          height: specs.specialKeyHeight,
          width: 106,
          bottomEdges: board.keysArray[0]
        }
      });
      return ios.layout.set();
    }
  };
  if (ios.isPhone()) {
    popUp = ios.utils.svg(ios.assets.keyPopUp[setup.style][ios.device.name]);
    board.popUp = new Layer({
      height: popUp.height,
      width: popUp.width,
      backgroundColor: 'transparent',
      name: '.popUp',
      superLayer: board.area,
      visible: false
    });
    board.popUp.svg = new Layer({
      html: popUp.svg,
      height: popUp.height,
      width: popUp.width,
      superLayer: board.popUp,
      name: '.svg',
      backgroundColor: 'transparent'
    });
    board.popUp.text = new ios.Text({
      text: 'A',
      superLayer: board.popUp,
      fontSize: specs.popUpChar,
      fontWeight: 300,
      color: colors.color,
      textAlign: 'center',
      constraints: {
        align: 'horizontal',
        top: specs.popUpTop,
        width: ios.pt(popUp.width)
      }
    });
    board.popUp.center();
    switch (ios.device.name) {
      case 'iphone-6s-plus':
        board.popUp.width = board.popUp.width - 18;
        board.popUp.height = board.popUp.height - 24;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-3);
        break;
      case 'iphone-6s':
        board.popUp.width = board.popUp.width - 12;
        board.popUp.height = board.popUp.height - 12;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-2);
        break;
      case 'iphone-5':
        board.popUp.width = board.popUp.width - 12;
        board.popUp.height = board.popUp.height - 12;
        board.popUp.svg.x = ios.px(-3);
        board.popUp.svg.y = ios.px(-2);
    }
    capitalizeKeys();
  }
  board["switch"] = function(state) {
    switch (state) {
      case "letters":
        return board.switchLetters();
    }
  };
  board["switch"]("letters");
  document.addEventListener('keydown', function(e) {
    var key;
    if (arrayOfCodes.indexOf(e.keyCode.toString()) !== -1) {
      key = board.keys[codeMap[e.keyCode].toLowerCase()];
      if (key) {
        key.down();
      }
      if (ios.isPad()) {
        if (key === board.keys.shift || key === board.keys.shiftalt) {
          board.keys.shift.down();
          board.keys.shiftalt.icon.toggle('on');
          return handleKeyColor(board.keys.shiftalt);
        }
      }
    }
  });
  document.addEventListener('keyup', function(e) {
    var key;
    if (arrayOfCodes.indexOf(e.keyCode.toString()) !== -1) {
      key = board.keys[codeMap[e.keyCode].toLowerCase()];
      if (key) {
        key.up();
      }
      if (ios.isPad()) {
        if (key === board.keys.shift || key === board.keys.shiftalt) {
          board.keys.shift.up();
          board.keys.shiftalt.icon.toggle('off');
          return handleKeyColor(board.keys.shiftalt);
        }
      }
    }
  });
  capitalizeKeys();
  return board;
};


},{"ios-kit":"ios-kit"}],"ios-kit-layout":[function(require,module,exports){
var ios, layout;

ios = require('ios-kit');

exports.defaults = {
  animations: {
    target: void 0,
    constraints: void 0,
    curve: "ease-in-out",
    curveOptions: void 0,
    time: 1,
    delay: 0,
    repeat: void 0,
    colorModel: void 0,
    stagger: void 0,
    fadeOut: false,
    fadeIn: false
  }
};

layout = function(array) {
  var blueprint, i, index, j, k, l, layer, len, len1, len2, newConstraint, props, ref, ref1, setup, targetLayers;
  setup = {};
  targetLayers = [];
  blueprint = [];
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  if (setup.target) {
    if (setup.target.length) {
      targetLayers = setup.target;
    } else {
      targetLayers.push(setup.target);
    }
  } else {
    targetLayers = Framer.CurrentContext.layers;
  }
  if (setup.target) {
    if (setup.constraints) {
      ref1 = Object.keys(setup.constraints);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        newConstraint = ref1[k];
        setup.target.constraints[newConstraint] = setup.constraints[newConstraint];
      }
    }
  }
  for (index = l = 0, len2 = targetLayers.length; l < len2; index = ++l) {
    layer = targetLayers[index];
    layer.calculatedPosition = {};
    if (layer.constraints) {
      props = {};
      layer.superFrame = {};
      if (layer.superLayer) {
        layer.superFrame.height = layer.superLayer.height;
        layer.superFrame.width = layer.superLayer.width;
      } else {
        layer.superFrame.height = ios.device.height;
        layer.superFrame.width = ios.device.width;
      }
      if (layer.constraints.leading !== void 0 && layer.constraints.trailing !== void 0) {
        layer.constraints.autoWidth = {};
      }
      if (layer.constraints.top !== void 0 && layer.constraints.bottom !== void 0) {
        layer.constraints.autoHeight = {};
      }
      if (layer.constraints.width !== void 0) {
        props.width = ios.utils.px(layer.constraints.width);
      } else {
        props.width = layer.width;
      }
      if (layer.constraints.height !== void 0) {
        props.height = ios.utils.px(layer.constraints.height);
      } else {
        props.height = layer.height;
      }
      if (layer.constraints.leading !== void 0) {
        if (layer.constraints.leading === parseInt(layer.constraints.leading, 10)) {
          props.x = ios.utils.px(layer.constraints.leading);
        } else {
          if (layer.constraints.leading.length === void 0) {
            props.x = layer.constraints.leading.calculatedPosition.x + layer.constraints.leading.calculatedPosition.width;
          } else {
            props.x = layer.constraints.leading[0].calculatedPosition.x + layer.constraints.leading[0].calculatedPosition.width + ios.utils.px(layer.constraints.leading[1]);
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.startX = props.x;
      }
      if (layer.constraints.trailing !== void 0) {
        if (layer.constraints.trailing === parseInt(layer.constraints.trailing, 10)) {
          props.x = layer.superFrame.width - ios.utils.px(layer.constraints.trailing) - props.width;
        } else {
          if (layer.constraints.trailing.length === void 0) {
            props.x = layer.constraints.trailing.calculatedPosition.x - props.width;
          } else {
            props.x = layer.constraints.trailing[0].calculatedPosition.x - ios.utils.px(layer.constraints.trailing[1]) - props.width;
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.calculatedPositionX = props.x;
        props.x = layer.constraints.autoWidth.startX;
        props.width = layer.constraints.autoWidth.calculatedPositionX - layer.constraints.autoWidth.startX + props.width;
      }
      if (layer.constraints.top !== void 0) {
        if (layer.constraints.top === parseInt(layer.constraints.top, 10)) {
          props.y = ios.utils.px(layer.constraints.top);
        } else {
          if (layer.constraints.top.length === void 0) {
            props.y = layer.constraints.top.calculatedPosition.y + layer.constraints.top.calculatedPosition.height;
          } else {
            props.y = layer.constraints.top[0].calculatedPosition.y + layer.constraints.top[0].calculatedPosition.height + ios.utils.px(layer.constraints.top[1]);
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.startY = props.y;
      }
      if (layer.constraints.bottom !== void 0) {
        if (layer.constraints.bottom === parseInt(layer.constraints.bottom, 10)) {
          props.y = layer.superFrame.height - ios.utils.px(layer.constraints.bottom) - props.height;
        } else {
          if (layer.constraints.bottom.length === void 0) {
            props.y = layer.constraints.bottom.calculatedPosition.y - props.height;
          } else {
            props.y = layer.constraints.bottom[0].calculatedPosition.y - ios.utils.px(layer.constraints.bottom[1]) - props.height;
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.calculatedPositionY = props.y;
        props.height = layer.constraints.autoHeight.calculatedPositionY - layer.constraints.autoHeight.startY + props.height;
        props.y = layer.constraints.autoHeight.startY;
      }
      if (layer.constraints.align !== void 0) {
        if (layer.constraints.align === "horizontal") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
        }
        if (layer.constraints.align === "vertical") {
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
        if (layer.constraints.align === "center") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
      }
      if (layer.constraints.horizontalCenter !== void 0) {
        props.x = layer.constraints.horizontalCenter.calculatedPosition.x + (layer.constraints.horizontalCenter.calculatedPosition.width - props.width) / 2;
      }
      if (layer.constraints.verticalCenter !== void 0) {
        props.y = layer.constraints.verticalCenter.calculatedPosition.y + (layer.constraints.verticalCenter.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.center !== void 0) {
        props.x = layer.constraints.center.calculatedPosition.x + (layer.constraints.center.calculatedPosition.width - props.width) / 2;
        props.y = layer.constraints.center.calculatedPosition.y + (layer.constraints.center.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.leadingEdges !== void 0) {
        props.x = layer.constraints.leadingEdges.calculatedPosition.x;
      }
      if (layer.constraints.trailingEdges !== void 0) {
        props.x = layer.constraints.trailingEdges.calculatedPosition.x - props.width + layer.constraints.trailingEdges.calculatedPosition.width;
      }
      if (layer.constraints.topEdges !== void 0) {
        props.y = layer.constraints.topEdges.calculatedPosition.y;
      }
      if (layer.constraints.bottomEdges !== void 0) {
        props.y = layer.constraints.bottomEdges.calculatedPosition.y - props.height + layer.constraints.bottomEdges.calculatedPosition.height;
      }
      layer.calculatedPosition = props;
    } else {
      layer.calculatedPosition = layer.props;
    }
    blueprint.push(layer);
  }
  return blueprint;
};

exports.set = function(array) {
  var blueprint, i, index, j, k, key, layer, len, len1, props, ref, results, setup;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    results.push((function() {
      var l, len2, ref1, results1;
      ref1 = Object.keys(layer.calculatedPosition);
      results1 = [];
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        key = ref1[l];
        results1.push(layer[key] = layer.calculatedPosition[key]);
      }
      return results1;
    })());
  }
  return results;
};

exports.animate = function(array) {
  var blueprint, delay, i, index, j, k, layer, len, len1, props, ref, results, setup, stag;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    delay = setup.delay;
    if (setup.stagger) {
      stag = setup.stagger;
      delay = (index * stag) + delay;
    }
    if (setup.fadeOut) {
      if (layer === setup.fadeOut) {
        layer.calculatedPosition.opacity = 0;
      }
    }
    if (setup.fadeIn) {
      layer.calculatedPosition.opacity = 1;
    }
    layer.animate({
      properties: layer.calculatedPosition,
      time: setup.time,
      delay: delay,
      curve: setup.curve,
      repeat: setup.repeat,
      colorModel: setup.colorModel,
      curveOptions: setup.curveOptions
    });
    results.push(layer.calculatedPosition = props);
  }
  return results;
};


},{"ios-kit":"ios-kit"}],"ios-kit-library":[function(require,module,exports){
var ios, layer;

ios = require("ios-kit");

layer = new Layer;

exports.layerProps = Object.keys(layer.props);

exports.layerProps.push("superLayer");

exports.layerProps.push("constraints");

exports.layerStyles = Object.keys(layer.style);

layer.destroy();

exports.assets = {
  sheetTip: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='27px' height='13px' viewBox='0 0 27 13' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Triangle</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar-Copy' transform='translate(-2634.000000, -124.000000)' fill='#FFFFFF'> <path d='M2644.71916,125.883834 C2646.25498,124.291136 2648.74585,124.291992 2650.28084,125.883834 L2661,137 L2634,137 L2644.71916,125.883834 Z' id='Triangle'></path> </g> </g> </svg>",
  bluetooth: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='7px' height='13px' viewBox='0 0 8 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Bluetooth</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Status-Icons-(White)' transform='translate(-137.000000, 0.000000)' fill='#FFF'> <path d='M140.5,14.5 L145,10.25 L141.8,7.5 L145,4.75 L140.5,0.5 L140.5,6.07142857 L137.8,3.75 L137,4.5 L140.258333,7.375 L137,10.25 L137.8,11 L140.5,8.67857143 L140.5,14.5 Z M141.5,3 L143.366667,4.75 L141.5,6.25 L141.5,3 Z M141.5,8.5 L143.366667,10.25 L141.5,12 L141.5,8.5 Z' id='Bluetooth'></path> </g> </svg>",
  batteryHigh: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/100%' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.506744,6.5 C346.226877,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.230225,14 346.506744,14 L365.993256,14 C366.273123,14 366.5,13.783628 366.5,13.5079041 L366.5,6.99209595 C366.5,6.72031886 366.269775,6.5 365.993256,6.5 L346.506744,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  batteryMid: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/Low-Power' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.50965,6.5 C346.228178,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.227653,14 346.50965,14 L356,14 L356,6.5 L346.50965,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  batteryLow: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='10px' viewBox='0 0 25 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Battery</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Status-Bar/Black/20%' transform='translate(-345.000000, -5.000000)' fill='#030303'> <path d='M346.493713,5.5 C345.668758,5.5 345,6.16802155 345,7.00530324 L345,13.4946968 C345,14.3260528 345.67338,15 346.493713,15 L366.006287,15 C366.831242,15 367.5,14.3319784 367.5,13.4946968 L367.5,7.00530324 C367.5,6.17394722 366.82662,5.5 366.006287,5.5 L346.493713,5.5 L346.493713,5.5 Z M368,8.5 L368,12 L368.75,12 C369.164214,12 369.5,11.6644053 369.5,11.25774 L369.5,9.24225998 C369.5,8.83232111 369.167101,8.5 368.75,8.5 L368,8.5 L368,8.5 Z M346.508152,6 C345.951365,6 345.5,6.45699692 345.5,7.00844055 L345.5,13.4915594 C345.5,14.0485058 345.949058,14.5 346.508152,14.5 L365.991848,14.5 C366.548635,14.5 367,14.0430031 367,13.4915594 L367,7.00844055 C367,6.45149422 366.550942,6 365.991848,6 L346.508152,6 Z M346.490479,6.5 C346.219595,6.5 346,6.71637201 346,6.99209595 L346,13.5079041 C346,13.7796811 346.215057,14 346.490479,14 L350,14 L350,6.5 L346.490479,6.5 Z' id='Battery'></path> </g> </g> </svg>",
  bannerBG: {
    "iphone-5": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='320px' height='68px' viewBox='0 0 320 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>iphone5</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPhone-5/5S/5C' fill='#1A1A1C'> <path d='M0,0 L320,0 L320,68 L0,68 L0,0 Z M142,61.0048815 C142,59.897616 142.896279,59 144.0024,59 L176.9976,59 C178.103495,59 179,59.8938998 179,61.0048815 L179,61.9951185 C179,63.102384 178.103721,64 176.9976,64 L144.0024,64 C142.896505,64 142,63.1061002 142,61.9951185 L142,61.0048815 Z' id='iphone5'></path> </g> </g> </svg>",
    "iphone-6s": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='375px' height='68px' viewBox='0 0 375 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-58.000000, -23.000000)' fill='#1A1A1C'> <g transform='translate(58.000000, 7.000000)' id='Notification-container'> <g> <path d='M0,16 L375,16 L375,84 L0,84 L0,16 Z M169,77.0048815 C169,75.897616 169.896279,75 171.0024,75 L203.9976,75 C205.103495,75 206,75.8938998 206,77.0048815 L206,77.9951185 C206,79.102384 205.103721,80 203.9976,80 L171.0024,80 C169.896505,80 169,79.1061002 169,77.9951185 L169,77.0048815 Z' id='Notification-background'></path> </g> </g> </g> </g> </svg>",
    "iphone-6s-plus": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='414px' height='68px' viewBox='0 0 414 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background Copy</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-43.000000, -74.000000)' fill='#1A1A1C'> <g transform='translate(43.000000, 74.000000)' id='Notification-container'> <g> <path d='M0,0 L414,0 L414,68 L0,68 L0,0 Z M189,61.0048815 C189,59.897616 189.896279,59 191.0024,59 L223.9976,59 C225.103495,59 226,59.8938998 226,61.0048815 L226,61.9951185 C226,63.102384 225.103721,64 223.9976,64 L191.0024,64 C189.896505,64 189,63.1061002 189,61.9951185 L189,61.0048815 Z' id='Notification-background-Copy'></path> </g> </g> </g> </g> </svg>",
    "ipad": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='768px' height='68px' viewBox='0 0 768 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Portrait' fill='#1A1A1C'> <path d='M0,0 L768,0 L768,68 L0,68 L0,0 Z M366,61.0048815 C366,59.897616 366.896279,59 368.0024,59 L400.9976,59 C402.103495,59 403,59.8938998 403,61.0048815 L403,61.9951185 C403,63.102384 402.103721,64 400.9976,64 L368.0024,64 C366.896505,64 366,63.1061002 366,61.9951185 L366,61.0048815 Z' id='ipad-portrait'></path> </g> </g> </svg>",
    "ipad-pro": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='1024px' height='68px' viewBox='0 0 1024 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-pro-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Pro-Portrait' fill='#1A1A1C'> <path d='M0,0 L1024,0 L1024,68 L0,68 L0,0 Z M494,61.0048815 C494,59.897616 494.896279,59 496.0024,59 L528.9976,59 C530.103495,59 531,59.8938998 531,61.0048815 L531,61.9951185 C531,63.102384 530.103721,64 528.9976,64 L496.0024,64 C494.896505,64 494,63.1061002 494,61.9951185 L494,61.0048815 Z' id='ipad-pro-portrait'></path> </g> </g> </svg>"
  },
  emojiCodes: ["98 80", "98 AC", "98 81", "98 82", "98 83", "98 84", "98 85", "98 86", "98 87", "98 89", "98 8a", "99 82", "99 83", "E2 98 BA EF B8 8F", "98 8B", "98 8C", "98 8D", "98 98", "98 97", "98 99", "98 9A", "98 9C", "98 9D", "98 9B", "A4 91", "A4 93", "98 8E", "A4 97", "98 8F", "98 B6", "98 90", "98 91", "98 92", "99 84", "A4 94", "98 B3", "98 9E", "98 9F", "98 A0", "98 A1", "98 94", "98 95", "99 81", "E2 98 B9 EF B8 8F", "98 A3", "98 96", "98 AB", "98 A9", "98 A4", "98 AE", "98 B1", "98 A8", "98 B0", "98 AF", "98 A6", "98 A7", "98 A2", "98 A5", "98 AA", "98 93", "98 AD", "98 B5", "98 B2", "A4 90", "98 B7", "A4 92", "A4 95", "98 B4", "92 A4", "92 A9", "98 88", "91 BF", "91 B9", "91 BA", "92 80", "91 BB", "91 BD", "A4 96", "98 BA", "98 B8", "98 B9", "98 BB", "98 BC", "98 BD", "99 80", "98 BF", "98 BE", "99 8C", "91 8F", "91 8B", "91 8D", "91 8E", "91 8A", "E2 9C 8A", "E2 9C 8C EF B8 8F", "91 8C", "E2 9C 8B", "91 90", "92 AA", "99 8F", "E2 98 9D EF B8 8F", "91 86", "91 87", "91 88", "91 89", "96 95", "96 90", "A4 98", "96 96", "E2 9C 8D EF B8 8F", "92 85", "91 84", "91 85", "91 82", "91 83", "91 81", "91 80", "91 A4", "91 A5", "97 A3", "91 B6", "91 A6", "91 A7", "91 A8", "91 A9", "91 B1", "91 B4", "91 B5", "91 B2", "91 B3", "91 AE", "91 B7", "92 82", "95 B5", "8E 85", "91 BC", "91 B8", "91 B0", "9A B6", "8F 83", "92 83", "91 AF", "91 AB", "91 AC", "91 AD", "99 87", "92 81", "99 85", "99 86", "99 8B", "99 8E", "99 8D", "92 87", "92 86", "92 91", "91 A9 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 91 A9", "91 A8 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 91 A8", "92 8F", "91 A9 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 92 8B E2 80 8D F0 9F 91 A9", "91 A8 E2 80 8D E2 9D A4 EF B8 8F E2 80 8D F0 9F 92 8B E2 80 8D F0 9F 91 A8", "91 AA", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A9 E2 80 8D F0 9F 91 A9 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A6 E2 80 8D F0 9F 91 A6", "91 A8 E2 80 8D F0 9F 91 A8 E2 80 8D F0 9F 91 A7 E2 80 8D F0 9F 91 A7", "91 9A", "91 95", "91 96", "91 94", "91 97", "91 99", "91 98", "92 84", "92 8B", "91 A3", "91 A0", "91 A1", "91 A2", "91 9E", "91 9F", "91 92", "8E A9", "E2 9B 91", "8E 93", "91 91", "8E 92", "91 9D", "91 9B", "91 9C", "92 BC", "91 93", "95 B6", "92 8D", "8C 82", "9B 91", "90 B6", "90 B1", "90 AD", "90 B9", "90 B0", "90 BB", "90 BC", "90 A8", "90 AF", "A6 81", "90 AE", "90 B7", "90 BD", "90 B8", "90 99", "90 B5", "99 88", "99 89", "99 8A", "90 92", "90 94", "90 A7", "90 A6", "90 A4", "90 A3", "90 A5", "90 BA", "90 97", "90 B4", "A6 84", "90 9D", "90 9B", "90 8C", "90 9E", "90 9C", "95 B7", "A6 82", "A6 80", "90 8D", "90 A2", "90 A0", "90 9F", "90 A1", "90 AC", "90 B3", "90 8B", "90 8A", "90 86", "90 85", "90 83", "90 82", "90 84", "90 AA", "90 AB", "90 98", "90 90", "90 8F", "90 91", "90 8E", "90 96", "90 80", "90 81", "90 93", "A6 83", "95 8A", "90 95", "90 A9", "90 88", "90 87", "90 BF", "90 BE", "90 89", "90 B2", "8C B5", "8E 84", "8C B2", "8C B3", "8C B4", "8C B1", "8C BF", "E2 98 98", "8D 80", "8E 8D", "8E 8B", "8D 83", "8D 82", "8D 81", "8C BE", "8C BA", "8C BA", "8C BB", "8C B9", "8C B7", "8C BC", "8C B8", "92 90", "8D 84", "8C B0", "8E 83", "90 9A", "95 B8", "8C 8E", "8C 8D", "8C 8F", "8C 95", "8C 96", "8C 97", "8C 98", "8C 91", "8C 92", "8C 93", "8C 94", "8C 9A", "8C 9D", "8C 9B", "8C 9C", "8C 9E", "8C 99", "E2 AD 90 EF B8 8F", "8C 9F", "92 AB", "E2 9C A8", "E2 98 84 EF B8 8F", "E2 98 80 EF B8 8F", "8C A4", "E2 9B 85 EF B8 8F", "8C A5", "8C A6", "E2 98 81 EF B8 8F", "8C A7", "E2 9B 88", "8C A9", "E2 9A A1 EF B8 8F", "94 A5", "92 A5", "E2 9D 84 EF B8 8F", "8C A8", "E2 98 83 EF B8 8F", "E2 9B 84 EF B8 8F", "8C AC", "92 A8", "8C AA", "8C AB", "E2 98 82 EF B8 8F", "E2 98 94 EF B8 8F", "92 A7", "92 A6", "8C 8A", "9B 91", "9B 91", "8D 8F", "8D 8E", "8D 90", "8D 8A", "8D 8B", "8D 8C", "8D 89", "8D 87", "8D 93", "8D 88", "8D 92", "8D 91", "8D 8D", "8D 85", "8D 86", "8C B6", "8C BD", "8D A0", "8D AF", "8D 9E", "A7 80", "8D 97", "8D 96", "8D A4", "8D B3", "8D 94", "8D 9F", "8C AD", "8D 95", "8D 9D", "8C AE", "8C AF", "8D 9C", "8D B2", "8D A5", "8D A3", "8D B1", "8D 9B", "8D 99", "8D 9A", "8D 98", "8D A2", "8D A1", "8D A7", "8D A8", "8D A6", "8D B0", "8E 82", "8D AE", "8D AC", "8D AD", "8D AB", "8D BF", "8D A9", "8D AA", "8D BA", "8D BB", "8D B7", "8D B8", "8D B9", "8D BE", "8D B6", "8D B5", "E2 98 95 EF B8 8F", "8D BC", "8D B4", "8D BD", "9B 91", "9B 91", "9B 91", "E2 9A BD EF B8 8F", "8F 80", "8F 88", "E2 9A BE EF B8 8F", "8E BE", "8F 90", "8F 89", "8E B1", "E2 9B B3 EF B8 8F", "8F 8C", "8F 93", "8F B8", "8F 92", "8F 91", "8F 8F", "8E BF", "E2 9B B7", "8F 82", "E2 9B B8", "8F B9", "8E A3", "9A A3", "8F 8A", "8F 84", "9B 80", "E2 9B B9", "8F 8B", "9A B4", "9A B5", "8F 87", "95 B4", "8F 86", "8E BD", "8F 85", "8E 96", "8E 97", "8F B5", "8E AB", "8E 9F", "8E AD", "8E A8", "8E AA", "8E A4", "8E A7", "8E BC", "8E B9", "8E B7", "8E BA", "8E B8", "8E BB", "8E AC", "8E AE", "91 BE", "8E AF", "8E B2", "8E B0", "8E B3", "9B 91", "9B 91", "9B 91", "9A 97", "9A 95", "9A 99", "9A 8C", "9A 8E", "8F 8E", "9A 93", "9A 91", "9A 92", "9A 90", "9A 9A", "9A 9B", "9A 9C", "8F 8D", "9A B2", "9A A8", "9A 94", "9A 8D", "9A 98", "9A 96", "9A A1", "9A A0", "9A AF", "9A 83", "9A 8B", "9A 9D", "9A 84", "9A 85", "9A 88", "9A 9E", "9A 82", "9A 86", "9A 87", "9A 8A", "9A 89", "9A 81", "9B A9", "E2 9C 88 EF B8 8F", "9B AB", "9B AC", "E2 9B B5 EF B8 8F", "9B A5", "9A A4", "E2 9B B4", "9B B3", "9A 80", "9B B0", "92 BA", "E2 9A 93 EF B8 8F", "9A A7", "E2 9B BD EF B8 8F", "9A 8F", "9A A6", "9A A5", "8F 81", "9A A2", "8E A1", "8E A2", "8E A0", "8F 97", "8C 81", "97 BC", "8F AD", "E2 9B B2 EF B8 8F", "8E 91", "E2 9B B0", "8F 94", "97 BB", "8C 8B", "97 BE", "8F 95", "E2 9B BA EF B8 8F", "8F 9E", "9B A3", "9B A4", "8C 85", "8C 84", "8F 9C", "8F 96", "8F 9D", "8C 87", "8C 86", "8F 99", "8C 83", "8C 89", "8C 8C", "8C A0", "8E 87", "8E 86", "8C 88", "8F 98", "8F B0", "8F AF", "8F 9F", "97 BD", "8F A0", "8F A1", "8F 9A", "8F A2", "8F AC", "8F A3", "8F A4", "8F A5", "8F A6", "8F A8", "8F AA", "8F AB", "8F A9", "92 92", "8F 9B", "E2 9B AA EF B8 8F", "95 8C", "95 8D", "95 8B", "E2 9B A9", "E2 8C 9A EF B8 8F", "93 B1", "93 B2", "92 BB", "E2 8C A8 EF B8 8F", "96 A5", "96 A8", "96 B1", "96 B2", "95 B9", "97 9C", "92 BD", "92 BE", "92 BF", "93 80", "93 BC", "93 B7", "93 B8", "93 B9", "8E A5", "93 BD", "8E 9E", "93 9E", "E2 98 8E EF B8 8F", "93 9F", "93 A0", "93 BA", "93 BB", "8E 99", "8E 9A", "8E 9B", "E2 8F B1", "E2 8F B2", "E2 8F B0", "95 B0", "E2 8F B3", "E2 8C 9B EF B8 8F", "93 A1", "94 8B", "94 8C", "92 A1", "94 A6", "95 AF", "97 91", "9B A2", "92 B8", "92 B5", "92 B4", "92 B6", "92 B7", "92 B0", "92 B3", "92 8E", "E2 9A 96", "94 A7", "94 A8", "E2 9A 92", "9B A0", "E2 9B 8F", "94 A9", "E2 9A 99", "E2 9B 93", "94 AB", "92 A3", "94 AA", "97 A1", "E2 9A 94", "9B A1", "9A AC", "E2 98 A0 EF B8 8F", "E2 9A B0", "E2 9A B1", "8F BA", "94 AE", "93 BF", "92 88", "E2 9A 97", "94 AD", "94 AC", "95 B3", "92 8A", "92 89", "8C A1", "8F B7", "94 96", "9A BD", "9A BF", "9B 81", "94 91", "97 9D", "9B 8B", "9B 8C", "9B 8F", "9A AA", "9B 8E", "96 BC", "97 BA", "E2 9B B1", "97 BF", "9B 8D", "8E 88", "8E 8F", "8E 80", "8E 81", "8E 8A", "8E 89", "8E 8E", "8E 90", "8E 8C", "8F AE", "E2 9C 89 EF B8 8F", "93 A9", "93 A8", "93 A7", "92 8C", "93 AE", "93 AA", "93 AB", "93 AC", "93 AD", "93 A6", "93 AF", "93 A5", "93 A4", "93 9C", "93 83", "93 91", "93 8A", "93 88", "93 89", "93 84", "93 85", "93 86", "97 93", "93 87", "97 83", "97 B3", "97 84", "93 8B", "97 92", "93 81", "93 82", "97 82", "97 9E", "93 B0", "93 93", "93 95", "93 97", "93 98", "93 99", "93 94", "93 92", "93 9A", "93 96", "94 97", "93 8E", "96 87", "E2 9C 82 EF B8 8F", "93 90", "93 8F", "93 8C", "93 8D", "9A A9", "8F B3", "8F B4", "94 90", "94 92", "94 93", "94 8F", "96 8A", "96 8B", "E2 9C 92 EF B8 8F", "93 9D", "E2 9C 8F EF B8 8F", "96 8D", "96 8C", "94 8D", "94 8E", "9B 91", "9B 91", "E2 9D A4 EF B8 8F", "92 9B", "92 9A", "92 99", "92 9C", "92 94", "E2 9D A3 EF B8 8F", "92 95", "92 9E", "92 93", "92 97", "92 96", "92 98", "92 9D", "92 9F", "E2 98 AE EF B8 8F", "E2 9C 9D EF B8 8F", "E2 98 AA EF B8 8F", "95 89", "E2 98 B8 EF B8 8F", "E2 9C A1 EF B8 8F", "94 AF", "95 8E", "E2 98 AF EF B8 8F", "E2 98 A6 EF B8 8F", "9B 90", "E2 9B 8E", "E2 99 88 EF B8 8F", "E2 99 89 EF B8 8F", "E2 99 8A EF B8 8F", "E2 99 8B EF B8 8F", "E2 99 8C EF B8 8F", "E2 99 8D EF B8 8F", "E2 99 8E EF B8 8F", "E2 99 8F EF B8 8F", "E2 99 90 EF B8 8F", "E2 99 91 EF B8 8F", "E2 99 92 EF B8 8F", "E2 99 93 EF B8 8F", "86 94", "E2 9A 9B", "88 B3", "88 B9", "E2 98 A2 EF B8 8F", "E2 98 A3 EF B8 8F", "93 B4", "93 B3", "88 B6", "88 9A EF B8 8F", "88 B8", "88 BA", "88 B7 EF B8 8F", "E2 9C B4 EF B8 8F", "86 9A", "89 91", "92 AE", "89 90", "E3 8A 99 EF B8 8F", "E3 8A 97 EF B8 8F", "88 B4", "88 B5", "88 B2", "85 B0 EF B8 8F", "85 B1 EF B8 8F", "86 8E", "86 91", "85 BE EF B8 8F", "86 98", "E2 9B 94 EF B8 8F", "93 9B", "9A AB", "E2 9D 8C", "E2 AD 95 EF B8 8F", "92 A2", "E2 99 A8 EF B8 8F", "9A B7", "9A AF", "9A B3", "9A B1", "94 9E", "93 B5", "E2 9D 97 EF B8 8F", "E2 9D 95", "E2 9D 93", "E2 9D 94", "E2 80 BC EF B8 8F", "E2 81 89 EF B8 8F", "92 AF", "94 85", "94 86", "94 B1", "E2 9A 9C", "E3 80 BD EF B8 8F", "E2 9A A0 EF B8 8F", "9A B8", "94 B0", "E2 99 BB EF B8 8F", "88 AF EF B8 8F", "92 B9", "E2 9D 87 EF B8 8F", "E2 9C B3 EF B8 8F", "E2 9D 8E", "E2 9C 85", "92 A0", "8C 80", "E2 9E BF", "8C 90", "E2 93 82 EF B8 8F", "8F A7", "88 82 EF B8 8F", "9B 82", "9B 83", "9B 84", "9B 85", "E2 99 BF EF B8 8F", "9A AD", "9A BE", "85 BF EF B8 8F", "9A B0", "9A B9", "9A BA", "9A BC", "9A BB", "9A AE", "8E A6", "93 B6", "88 81", "86 96", "86 97", "86 99", "86 92", "86 95", "86 93", "30 EF B8 8F E2 83 A3", "31 EF B8 8F E2 83 A3", "32 EF B8 8F E2 83 A3", "33 EF B8 8F E2 83 A3", "34 EF B8 8F E2 83 A3", "35 EF B8 8F E2 83 A3", "36 EF B8 8F E2 83 A3", "37 EF B8 8F E2 83 A3", "38 EF B8 8F E2 83 A3", "39 EF B8 8F E2 83 A3", "94 9F", "94 A2", "E2 96 B6 EF B8 8F", "E2 8F B8", "E2 8F AF", "E2 8F B9", "E2 8F BA", "E2 8F AD", "E2 8F AE", "E2 8F A9", "E2 8F AA", "94 80", "94 81", "94 82", "E2 97 80 EF B8 8F", "94 BC", "94 BD", "E2 8F AB", "E2 8F AC", "E2 9E A1 EF B8 8F", "E2 AC 85 EF B8 8F", "E2 AC 86 EF B8 8F", "E2 AC 87 EF B8 8F", "E2 86 97 EF B8 8F", "E2 86 98 EF B8 8F", "E2 86 99 EF B8 8F", "E2 86 96 EF B8 8F", "E2 86 95 EF B8 8F", "E2 86 94 EF B8 8F", "94 84", "E2 86 AA EF B8 8F", "E2 86 A9 EF B8 8F", "E2 A4 B4 EF B8 8F", "E2 A4 B5 EF B8 8F", "23 EF B8 8F E2 83 A3", "2A EF B8 8F E2 83 A3", "E2 84 B9 EF B8 8F", "94 A4", "94 A1", "94 A0", "94 A3", "8E B5", "8E B6", "E3 80 B0 EF B8 8F", "E2 9E B0", "E2 9C 94 EF B8 8F", "94 83", "E2 9E 95", "E2 9E 96", "E2 9E 97", "E2 9C 96 EF B8 8F", "92 B2", "92 B1", "C2 A9 EF B8 8F", "C2 AE EF B8 8F", "E2 84 A2 EF B8 8F", "94 9A", "94 99", "94 9B", "94 9D", "94 9C", "E2 98 91 EF B8 8F", "94 98", "E2 9A AA EF B8 8F", "E2 9A AB EF B8 8F", "94 B4", "94 B5", "94 B8", "94 B9", "94 B6", "94 B7", "94 BA", "E2 96 AA EF B8 8F", "E2 96 AB EF B8 8F", "E2 AC 9B EF B8 8F", "E2 AC 9C EF B8 8F", "94 BB", "E2 97 BC EF B8 8F", "E2 97 BB EF B8 8F", "E2 97 BE EF B8 8F", "E2 97 BD EF B8 8F", "94 B2", "94 B3", "94 88", "94 89", "94 8A", "94 87", "93 A3", "93 A2", "94 94", "94 95", "83 8F", "80 84 EF B8 8F", "E2 99 A0 EF B8 8F", "E2 99 A3 EF B8 8F", "E2 99 A5 EF B8 8F", "E2 99 A6 EF B8 8F", "8E B4", "91 81 E2 80 8D F0 9F 97 A8", "92 AD", "97 AF", "92 AC", "95 90", "95 91", "95 92", "95 93", "95 94", "95 95", "95 96", "95 97", "95 98", "95 99", "95 9A", "95 9B", "95 9C", "95 9D", "95 9E", "95 9F", "95 A0", "95 A1", "95 A2", "95 A3", "95 A4", "95 A5", "95 A6", "95 A7", "9B 91", "87 A6 F0 9F 87 AB", "87 A6 F0 9F 87 BD", "87 A6 F0 9F 87 B1", "87 A9 F0 9F 87 BF", "87 A6 F0 9F 87 B8", "87 A6 F0 9F 87 A9", "87 A6 F0 9F 87 B4", "87 A6 F0 9F 87 AE", "87 A6 F0 9F 87 B6", "87 A6 F0 9F 87 AC", "87 A6 F0 9F 87 B7", "87 A6 F0 9F 87 B2", "87 A6 F0 9F 87 BC", "87 A6 F0 9F 87 BA", "87 A6 F0 9F 87 B9", "87 A6 F0 9F 87 BF", "87 A7 F0 9F 87 B8", "87 A7 F0 9F 87 AD", "87 A7 F0 9F 87 A9", "87 A7 F0 9F 87 A7", "87 A7 F0 9F 87 BE", "87 A7 F0 9F 87 AA", "87 A7 F0 9F 87 BF", "87 A7 F0 9F 87 AF", "87 A7 F0 9F 87 B2", "87 A7 F0 9F 87 B9", "87 A7 F0 9F 87 B4", "87 A7 F0 9F 87 B6", "87 A7 F0 9F 87 A6", "87 A7 F0 9F 87 BC", "87 A7 F0 9F 87 B7", "87 AE F0 9F 87 B4", "87 BB F0 9F 87 AC", "87 A7 F0 9F 87 B3", "87 A7 F0 9F 87 AC", "87 A7 F0 9F 87 AB", "87 A7 F0 9F 87 AE", "87 A8 F0 9F 87 BB", "87 B0 F0 9F 87 AD", "87 A8 F0 9F 87 B2", "87 A8 F0 9F 87 A6", "87 AE F0 9F 87 A8", "87 B0 F0 9F 87 BE", "87 A8 F0 9F 87 AB", "87 B9 F0 9F 87 A9", "87 A8 F0 9F 87 B1", "87 A8 F0 9F 87 B3", "87 A8 F0 9F 87 BD", "87 A8 F0 9F 87 A8", "87 A8 F0 9F 87 B4", "87 B0 F0 9F 87 B2", "87 A8 F0 9F 87 AC", "87 A8 F0 9F 87 A9", "87 A8 F0 9F 87 B0", "87 A8 F0 9F 87 B7", "87 AD F0 9F 87 B7", "87 A8 F0 9F 87 BA", "87 A8 F0 9F 87 BC", "87 A8 F0 9F 87 BE", "87 A8 F0 9F 87 BF", "87 A9 F0 9F 87 B0", "87 A9 F0 9F 87 AF", "87 A9 F0 9F 87 B2", "87 A9 F0 9F 87 B4", "87 AA F0 9F 87 A8", "87 AA F0 9F 87 AC", "87 B8 F0 9F 87 BB", "87 AC F0 9F 87 B6", "87 AA F0 9F 87 B7", "87 AA F0 9F 87 AA", "87 AA F0 9F 87 B9", "87 AA F0 9F 87 BA", "87 AB F0 9F 87 B0", "87 AB F0 9F 87 B4", "87 AB F0 9F 87 AF", "87 AB F0 9F 87 AE", "87 AB F0 9F 87 B7", "87 AC F0 9F 87 AB", "87 B5 F0 9F 87 AB", "87 B9 F0 9F 87 AB", "87 AC F0 9F 87 A6", "87 AC F0 9F 87 B2", "87 AC F0 9F 87 AA", "87 A9 F0 9F 87 AA", "87 AC F0 9F 87 AD", "87 AC F0 9F 87 AE", "87 AC F0 9F 87 B7", "87 AC F0 9F 87 B1", "87 AC F0 9F 87 A9", "87 AC F0 9F 87 B5", "87 AC F0 9F 87 BA", "87 AC F0 9F 87 B9", "87 AC F0 9F 87 AC", "87 AC F0 9F 87 B3", "87 AC F0 9F 87 BC", "87 AC F0 9F 87 BE", "87 AD F0 9F 87 B9", "87 AD F0 9F 87 B3", "87 AD F0 9F 87 B0", "87 AD F0 9F 87 BA", "87 AE F0 9F 87 B8", "87 AE F0 9F 87 B3", "87 AE F0 9F 87 A9", "87 AE F0 9F 87 B7", "87 AE F0 9F 87 B6", "87 AE F0 9F 87 AA", "87 AE F0 9F 87 B2", "87 AE F0 9F 87 B1", "87 AE F0 9F 87 B9", "87 A8 F0 9F 87 AE", "87 AF F0 9F 87 B2", "87 AF F0 9F 87 B5", "87 AF F0 9F 87 AA", "87 AF F0 9F 87 B4", "87 B0 F0 9F 87 BF", "87 B0 F0 9F 87 AA", "87 B0 F0 9F 87 AE", "87 BD F0 9F 87 B0", "87 B0 F0 9F 87 BC", "87 B0 F0 9F 87 AC", "87 B1 F0 9F 87 A6", "87 B1 F0 9F 87 BB", "87 B1 F0 9F 87 A7", "87 B1 F0 9F 87 B8", "87 B1 F0 9F 87 B7", "87 B1 F0 9F 87 BE", "87 B1 F0 9F 87 AE", "87 B1 F0 9F 87 B9", "87 B1 F0 9F 87 BA", "87 B2 F0 9F 87 B4", "87 B2 F0 9F 87 B0", "87 B2 F0 9F 87 AC", "87 B2 F0 9F 87 BC", "87 B2 F0 9F 87 BE", "87 B2 F0 9F 87 BB", "87 B2 F0 9F 87 B1", "87 B2 F0 9F 87 B9", "87 B2 F0 9F 87 AD", "87 B2 F0 9F 87 B6", "87 B2 F0 9F 87 B7", "87 B2 F0 9F 87 BA", "87 BE F0 9F 87 B9", "87 B2 F0 9F 87 BD", "87 AB F0 9F 87 B2", "87 B2 F0 9F 87 A9", "87 B2 F0 9F 87 A8", "87 B2 F0 9F 87 B3", "87 B2 F0 9F 87 AA", "87 B2 F0 9F 87 B8", "87 B2 F0 9F 87 A6", "87 B2 F0 9F 87 BF", "87 B2 F0 9F 87 B2", "87 B3 F0 9F 87 A6", "87 B3 F0 9F 87 B7", "87 B3 F0 9F 87 B5", "87 B3 F0 9F 87 B1", "87 B3 F0 9F 87 A8", "87 B3 F0 9F 87 BF", "87 B3 F0 9F 87 AE", "87 B3 F0 9F 87 AA", "87 B3 F0 9F 87 AC", "87 B3 F0 9F 87 BA", "87 B3 F0 9F 87 AB", "87 B2 F0 9F 87 B5", "87 B0 F0 9F 87 B5", "87 B3 F0 9F 87 B4", "87 B4 F0 9F 87 B2", "87 B5 F0 9F 87 B0", "87 B5 F0 9F 87 BC", "87 B5 F0 9F 87 B8", "87 B5 F0 9F 87 A6", "87 B5 F0 9F 87 AC", "87 B5 F0 9F 87 BE", "87 B5 F0 9F 87 AA", "87 B5 F0 9F 87 AD", "87 B5 F0 9F 87 B3", "87 B5 F0 9F 87 B1", "87 B5 F0 9F 87 B9", "87 B5 F0 9F 87 B7", "87 B6 F0 9F 87 A6", "87 B7 F0 9F 87 AA", "87 B7 F0 9F 87 B4", "87 B7 F0 9F 87 BA", "87 B7 F0 9F 87 BC", "87 A7 F0 9F 87 B1", "87 B8 F0 9F 87 AD", "87 B0 F0 9F 87 B3", "87 B1 F0 9F 87 A8", "87 B5 F0 9F 87 B2", "87 BB F0 9F 87 A8", "87 BC F0 9F 87 B8", "87 B8 F0 9F 87 B2", "87 B8 F0 9F 87 B9", "87 B8 F0 9F 87 A6", "87 B8 F0 9F 87 B3", "87 B7 F0 9F 87 B8", "87 B8 F0 9F 87 A8", "87 B8 F0 9F 87 B1", "87 B8 F0 9F 87 AC", "87 B8 F0 9F 87 BD", "87 B8 F0 9F 87 B0", "87 B8 F0 9F 87 AE", "87 B8 F0 9F 87 A7", "87 B8 F0 9F 87 B4", "87 BF F0 9F 87 A6", "87 AC F0 9F 87 B8", "87 B0 F0 9F 87 B7", "87 B8 F0 9F 87 B8", "87 AA F0 9F 87 B8", "87 B1 F0 9F 87 B0", "87 B8 F0 9F 87 A9", "87 B8 F0 9F 87 B7", "87 B8 F0 9F 87 BF", "87 B8 F0 9F 87 AA", "87 A8 F0 9F 87 AD", "87 B8 F0 9F 87 BE", "87 B9 F0 9F 87 BC", "87 B9 F0 9F 87 AF", "87 B9 F0 9F 87 BF", "87 B9 F0 9F 87 AD", "87 B9 F0 9F 87 B1", "87 B9 F0 9F 87 AC", "87 B9 F0 9F 87 B0", "87 B9 F0 9F 87 B4", "87 B9 F0 9F 87 B9", "87 B9 F0 9F 87 B3", "87 B9 F0 9F 87 B7", "87 B9 F0 9F 87 B2", "87 B9 F0 9F 87 A8", "87 B9 F0 9F 87 BB", "87 BA F0 9F 87 AC", "87 BA F0 9F 87 A6", "87 A6 F0 9F 87 AA", "87 AC F0 9F 87 A7", "87 BA F0 9F 87 B8", "87 BB F0 9F 87 AE", "87 BA F0 9F 87 BE", "87 BA F0 9F 87 BF", "87 BB F0 9F 87 BA", "87 BB F0 9F 87 A6", "87 BB F0 9F 87 AA", "87 BB F0 9F 87 B3", "87 BC F0 9F 87 AB", "87 AA F0 9F 87 AD", "87 BE F0 9F 87 AA", "87 BF F0 9F 87 B2", "87 BF F0 9F 87 BC"],
  network: "<svg width='14px' height='10px' viewBox='87 5 14 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <path d='M96.1444208,12.4385043 C95.626374,11.8454456 94.8523616,11.4689119 93.987563,11.4689119 C93.1390073,11.4689119 92.3778594,11.8314341 91.8601652,12.4053177 L94.0225391,14.5 L96.1444208,12.4385043 Z M98.3234964,10.3214425 C97.2447794,9.19174563 95.7014387,8.48445596 93.987563,8.48445596 C92.2882723,8.48445596 90.7566264,9.17975893 89.6792698,10.2926936 L90.7692987,11.3486 C91.567205,10.5053708 92.713648,9.97668394 93.987563,9.97668394 C95.2768836,9.97668394 96.4356305,10.518235 97.2346215,11.3793293 L98.3234964,10.3214425 L98.3234964,10.3214425 Z M100.5,8.20687933 C98.8629578,6.53943672 96.5505699,5.5 93.987563,5.5 C91.4375103,5.5 89.1355496,6.52895605 87.5,8.18164431 L88.5895579,9.23709441 C89.9460798,7.85431655 91.8628921,6.99222798 93.987563,6.99222798 C96.1260026,6.99222798 98.0538809,7.86552609 99.4118698,9.26404272 L100.5,8.20687933 Z' id='Wi-Fi' stroke='none' fill='#030303' fill-rule='evenodd'></path> </svg>",
  activity: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Soccer Ball</title> <desc>Created with Sketch.</desc> <defs> <circle id='path-1' cx='8' cy='8' r='8'></circle> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-179.000000, -639.000000)'> <g id='Soccer-Ball' sketch:type='MSLayerGroup' transform='translate(179.000000, 639.000000)'> <mask id='mask-2' sketch:name='Mask' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='Mask' stroke='#4A5361' sketch:type='MSShapeGroup' xlink:href='#path-1'></use> <path d='M6,12.1203046 L12.8573384,8 L13.3723765,8.8571673 L6.51503807,12.9774719 L6,12.1203046 L6,12.1203046 Z' id='Rectangle-47' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.849648,8.7260551 L19.1001103,5.34510901 L19.5227285,6.2514168 L12.2722662,9.63236289 L11.849648,8.7260551 L11.849648,8.7260551 Z' id='Rectangle-47-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M6,3.1203046 L12.8573384,-1 L13.3723765,-0.142832699 L6.51503807,3.9774719 L6,3.1203046 L6,3.1203046 Z' id='Rectangle-47-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M-1,7.1203046 L5.85733841,3 L6.37237648,3.8571673 L-0.484961925,7.9774719 L-1,7.1203046 L-1,7.1203046 Z' id='Rectangle-47-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <rect id='Rectangle-50' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='4' y='6' width='1' height='5'></rect> <rect id='Rectangle-51' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='11.5' y='3' width='1' height='12'></rect> <path d='M5,4.8571673 L11.8573384,8.9774719 L12.3723765,8.1203046 L5.51503807,4 L5,4.8571673' id='Rectangle-47-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M5,12.8571673 L11.8573384,16.9774719 L12.3723765,16.1203046 L5.51503807,12 L5,12.8571673' id='Rectangle-47-Copy-5' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1' fill='#D8D8D8' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,3.19504739 L7.35514484,6.13218333 L4.5300676,6.9422612 L2.88664089,4.5057809 L4.69602457,2.18987541 L7.45771189,3.19504739' id='Polygon-1-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,11.1950474 L7.35514484,14.1321833 L4.5300676,14.9422612 L2.88664089,12.5057809 L4.69602457,10.1898754 L7.45771189,11.1950474' id='Polygon-1-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M14.5431701,0.0725939314 L14.4406031,3.00972988 L11.6155258,3.81980774 L9.97209912,1.38332745 L11.7814828,-0.93257805 L14.5431701,0.0725939314' id='Polygon-1-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> </g> </g> </g> </svg>",
  animals: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Group</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-117.000000, -639.000000)' stroke='#4A5361'> <g id='ic_Food' sketch:type='MSLayerGroup' transform='translate(118.000000, 640.000000)'> <g id='Group' sketch:type='MSShapeGroup'> <path d='M5.68377537,1.38156646 C6.23926066,1.13624 6.85372005,1 7.5,1 C8.14627995,1 8.76073934,1.13624 9.31622463,1.38156646 C9.80879275,0.562359019 10.8255888,0 12,0 C13.6568542,0 15,1.11928813 15,2.5 C15,3.5571398 14.2126246,4.46102843 13.0999226,4.82662514 C14.2496528,5.64185422 15,6.98330062 15,8.5 C15,10.7167144 13.3971873,12.5590719 11.2872671,12.9313673 C10.4867248,14.1757703 9.08961696,15 7.5,15 C5.91038304,15 4.51327524,14.1757703 3.71273291,12.9313673 C1.60281268,12.5590719 0,10.7167144 0,8.5 C0,6.98330062 0.750347244,5.64185422 1.90007741,4.82662514 C0.787375445,4.46102843 0,3.5571398 0,2.5 C0,1.11928813 1.34314575,0 3,0 C4.17441122,0 5.19120725,0.562359019 5.68377537,1.38156646 Z' id='Oval-8'></path> <path d='M5.73834228,12 C5.86290979,12 6.14642353,12 6.14642353,12 C6.14642353,12 6.43215696,12.4426123 6.5246582,12.4919739 C6.66455601,12.5666277 7,12.4919739 7,12.4919739 L7,12 L8,12 L8,12.4919739 L8.49799228,12.4919739 L8.84301769,12 L9.3918457,12 C9.3918457,12 8.99598457,12.9839478 8.49799228,12.9839478 L6.60702407,12.9839478 C6.21404813,12.9839478 5.45996094,12 5.73834228,12 Z' id='Rectangle-44-Copy-2'></path> <circle id='Oval-14' cx='10.5' cy='7.5' r='0.5'></circle> <circle id='Oval-14-Copy' cx='4.5' cy='7.5' r='0.5'></circle> <path d='M12.6999969,5 C12.6999969,3.06700338 11.1329936,1.5 9.19999695,1.5' id='Oval-16'></path> <path d='M5.5,5 C5.5,3.06700338 3.93299662,1.5 2,1.5' id='Oval-16-Copy' transform='translate(3.750000, 3.250000) scale(-1, 1) translate(-3.750000, -3.250000) '></path> <rect id='Rectangle-44-Copy' x='7' y='11' width='1' height='1'></rect> <path d='M6,10 L6.5,10 L6.49999999,9.5 L8.50000005,9.5 L8.50000005,10 L9,10 L9,10.5 L8.5,10.5 L8.5,11 L6.5,11 L6.5,10.5 L6,10.5 L6,10 Z' id='Path'></path> </g> </g> </g> </g> </svg>",
  chevron: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='13px' height='22px' viewBox='0 0 13 22' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Back Chevron</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar/Back' transform='translate(-8.000000, -31.000000)' fill='#0076FF'> <path d='M8.5,42 L19,31.5 L21,33.5 L12.5,42 L21,50.5 L19,52.5 L8.5,42 Z' id='Back-Chevron'></path> </g> </g> </svg>",
  emojis: ["😀", "😬", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😉", "😊", "🙂", "🙃", "☺️", "😋", "😌", "😍", "😘", "😗", "😙", "😚", "😜", "😝", "😛", "🤑", "🤓", "😎", "🤗", "😏", "😶", "😐", "😑", "😒", "🙄", "🤔", "😳", "😞", "😟", "😠", "😡", "😔", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😮", "😱", "😨", "😰", "😯", "😦", "😧", "😢", "😥", "😪", "😓", "😭", "😵", "😲", "🤐", "😷", "🤒", "🤕", "😴", "💤", "💩", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙌", "👏", "👋", "👍", "👎", "👊", "✊", "✌️", "👌", "✋", "👐", "💪", "🙏", "☝️", "👆", "👇", "👈", "👉", "🖕", "🖐", "🤘", "🖖", "✍️", "💅", "👄", "👅", "👂", "👃", "👁", "👀", "👤", "👥", "🗣", "👶", "👦", "👧", "👨", "👩", "👱", "👴", "👵", "👲", "👳", "👮", "👷", "💂", "🕵", "🎅", "👼", "👸", "👰", "🚶", "🏃", "💃", "👯", "👫", "👬", "👭", "🙇", "💁", "🙅", "🙆", "🙋", "🙎", "🙍", "💇", "💆", "💑", "👩‍❤️‍👩", "👨‍❤️‍👨", "💏", "👩‍❤️‍💋‍👩", "👨‍❤️‍💋‍👨", "👪", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👚", "👕", "👖", "👔", "👗", "👙", "👘", "💄", "💋", "👣", "👠", "👡", "👢", "👞", "👟", "👒", "🎩", "⛑", "🎓", "👑", "🎒", "👝", "👛", "👜", "💼", "👓", "🕶", "💍", "🌂", "🛑", "🐶", "🐱", "🐭", "🐹", "🐰", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐙", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🐌", "🐞", "🐜", "🕷", "🦂", "🦀", "🐍", "🐢", "🐠", "🐟", "🐡", "🐬", "🐳", "🐋", "🐊", "🐆", "🐅", "🐃", "🐂", "🐄", "🐪", "🐫", "🐘", "🐐", "🐏", "🐑", "🐎", "🐖", "🐀", "🐁", "🐓", "🦃", "🕊", "🐕", "🐩", "🐈", "🐇", "🐿", "🐾", "🐉", "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘", "🍀", "🎍", "🎋", "🍃", "🍂", "🍁", "🌾", "🌺", "🌺", "🌻", "🌹", "🌷", "🌼", "🌸", "💐", "🍄", "🌰", "🎃", "🐚", "🕸", "🌎", "🌍", "🌏", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌚", "🌝", "🌛", "🌜", "🌞", "🌙", "⭐️", "🌟", "💫", "✨", "☄️", "☀️", "🌤", "⛅️", "🌥", "🌦", "☁️", "🌧", "⛈", "🌩", "⚡️", "🔥", "💥", "❄️", "🌨", "☃️", "⛄️", "🌬", "💨", "🌪", "🌫", "☂️", "☔️", "💧", "💦", "🌊", "🛑", "🛑", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🍍", "🍅", "🍆", "🌶", "🌽", "🍠", "🍯", "🍞", "🧀", "🍗", "🍖", "🍤", "🍳", "🍔", "🍟", "🌭", "🍕", "🍝", "🌮", "🌯", "🍜", "🍲", "🍥", "🍣", "🍱", "🍛", "🍙", "🍚", "🍘", "🍢", "🍡", "🍧", "🍨", "🍦", "🍰", "🎂", "🍮", "🍬", "🍭", "🍫", "🍿", "🍩", "🍪", "🍺", "🍻", "🍷", "🍸", "🍹", "🍾", "🍶", "🍵", "☕️", "🍼", "🍴", "🍽", "🛑", "🛑", "🛑", "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱", "⛳️", "🏌", "🏓", "🏸", "🏒", "🏑", "🏏", "🎿", "⛷", "🏂", "⛸", "🏹", "🎣", "🚣", "🏊", "🏄", "🛀", "⛹", "🏋", "🚴", "🚵", "🏇", "🕴", "🏆", "🎽", "🏅", "🎖", "🎗", "🏵", "🎫", "🎟", "🎭", "🎨", "🎪", "🎤", "🎧", "🎼", "🎹", "🎷", "🎺", "🎸", "🎻", "🎬", "🎮", "👾", "🎯", "🎲", "🎰", "🎳", "🛑", "🛑", "🛑", "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🏍", "🚲", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚯", "🚃", "🚋", "🚝", "🚄", "🚅", "🚈", "🚞", "🚂", "🚆", "🚇", "🚊", "🚉", "🚁", "🛩", "✈️", "🛫", "🛬", "⛵️", "🛥", "🚤", "⛴", "🛳", "🚀", "🛰", "💺", "⚓️", "🚧", "⛽️", "🚏", "🚦", "🚥", "🏁", "🚢", "🎡", "🎢", "🎠", "🏗", "🌁", "🗼", "🏭", "⛲️", "🎑", "⛰", "🏔", "🗻", "🌋", "🗾", "🏕", "⛺️", "🏞", "🛣", "🛤", "🌅", "🌄", "🏜", "🏖", "🏝", "🌇", "🌆", "🏙", "🌃", "🌉", "🌌", "🌠", "🎇", "🎆", "🌈", "🏘", "🏰", "🏯", "🏟", "🗽", "🏠", "🏡", "🏚", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛", "⛪️", "🕌", "🕍", "🕋", "⛩", "⌚️", "📱", "📲", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽", "🎞", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛", "⏱", "⏲", "⏰", "🕰", "⏳", "⌛️", "📡", "🔋", "🔌", "💡", "🔦", "🕯", "🗑", "🛢", "💸", "💵", "💴", "💶", "💷", "💰", "💳", "💎", "⚖", "🔧", "🔨", "⚒", "🛠", "⛏", "🔩", "⚙", "⛓", "🔫", "💣", "🔪", "🗡", "⚔", "🛡", "🚬", "☠️", "⚰", "⚱", "🏺", "🔮", "📿", "💈", "⚗", "🔭", "🔬", "🕳", "💊", "💉", "🌡", "🏷", "🔖", "🚽", "🚿", "🛁", "🔑", "🗝", "🛋", "🛌", "🛏", "🚪", "🛎", "🖼", "🗺", "⛱", "🗿", "🛍", "🎈", "🎏", "🎀", "🎁", "🎊", "🎉", "🎎", "🎐", "🎌", "🏮", "✉️", "📩", "📨", "📧", "💌", "📮", "📪", "📫", "📬", "📭", "📦", "📯", "📥", "📤", "📜", "📃", "📑", "📊", "📈", "📉", "📄", "📅", "📆", "🗓", "📇", "🗃", "🗳", "🗄", "📋", "🗒", "📁", "📂", "🗂", "🗞", "📰", "📓", "📕", "📗", "📘", "📙", "📔", "📒", "📚", "📖", "🔗", "📎", "🖇", "✂️", "📐", "📏", "📌", "📍", "🚩", "🏳", "🏴", "🔐", "🔒", "🔓", "🔏", "🖊", "🖋", "✒️", "📝", "✏️", "🖍", "🖌", "🔍", "🔎", "🛑", "🛑", "❤️", "💛", "💚", "💙", "💜", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈️", "♉️", "♊️", "♋️", "♌️", "♍️", "♎️", "♏️", "♐️", "♑️", "♒️", "♓️", "🆔", "⚛", "🈳", "🈹", "☢️", "☣️", "📴", "📳", "🈶", "🈚️", "🈸", "🈺", "🈷️", "✴️", "🆚", "🉑", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "⛔️", "📛", "🚫", "❌", "⭕️", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "❗️", "❕", "❓", "❔", "‼️", "⁉️", "💯", "🔅", "🔆", "🔱", "⚜", "〽️", "⚠️", "🚸", "🔰", "♻️", "🈯️", "💹", "❇️", "✳️", "❎", "✅", "💠", "🌀", "➿", "🌐", "Ⓜ️", "🏧", "🈂️", "🛂", "🛃", "🛄", "🛅", "♿️", "🚭", "🚾", "🅿️", "🚰", "🚹", "🚺", "🚼", "🚻", "🚮", "🎦", "📶", "🈁", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "▶️", "⏸", "⏯", "⏹", "⏺", "⏭", "⏮", "⏩", "⏪", "🔀", "🔁", "🔂", "◀️", "🔼", "🔽", "⏫", "⏬", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "🔄", "↪️", "↩️", "⤴️", "⤵️", "#️⃣", "*️⃣", "ℹ️", "🔤", "🔡", "🔠", "🔣", "🎵", "🎶", "〰️", "➰", "✔️", "🔃", "➕", "➖", "➗", "✖️", "💲", "💱", "©️", "®️", "™️", "🔚", "🔙", "🔛", "🔝", "🔜", "☑️", "🔘", "⚪️", "⚫️", "🔴", "🔵", "🔸", "🔹", "🔶", "🔷", "🔺", "▪️", "▫️", "⬛️", "⬜️", "🔻", "◼️", "◻️", "◾️", "◽️", "🔲", "🔳", "🔈", "🔉", "🔊", "🔇", "📣", "📢", "🔔", "🔕", "🃏", "🀄️", "♠️", "♣️", "♥️", "♦️", "🎴", "👁‍🗨", "💭", "🗯", "💬", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧", "🛑", "🇦🇫", "🇦🇽", "🇦🇱", "🇩🇿", "🇦🇸", "🇦🇩", "🇦🇴", "🇦🇮", "🇦🇶", "🇦🇬", "🇦🇷", "🇦🇲", "🇦🇼", "🇦🇺", "🇦🇹", "🇦🇿", "🇧🇸", "🇧🇭", "🇧🇩", "🇧🇧", "🇧🇾", "🇧🇪", "🇧🇿", "🇧🇯", "🇧🇲", "🇧🇹", "🇧🇴", "🇧🇶", "🇧🇦", "🇧🇼", "🇧🇷", "🇮🇴", "🇻🇬", "🇧🇳", "🇧🇬", "🇧🇫", "🇧🇮", "🇨🇻", "🇰🇭", "🇨🇲", "🇨🇦", "🇮🇨", "🇰🇾", "🇨🇫", "🇹🇩", "🇨🇱", "🇨🇳", "🇨🇽", "🇨🇨", "🇨🇴", "🇰🇲", "🇨🇬", "🇨🇩", "🇨🇰", "🇨🇷", "🇭🇷", "🇨🇺", "🇨🇼", "🇨🇾", "🇨🇿", "🇩🇰", "🇩🇯", "🇩🇲", "🇩🇴", "🇪🇨", "🇪🇬", "🇸🇻", "🇬🇶", "🇪🇷", "🇪🇪", "🇪🇹", "🇪🇺", "🇫🇰", "🇫🇴", "🇫🇯", "🇫🇮", "🇫🇷", "🇬🇫", "🇵🇫", "🇹🇫", "🇬🇦", "🇬🇲", "🇬🇪", "🇩🇪", "🇬🇭", "🇬🇮", "🇬🇷", "🇬🇱", "🇬🇩", "🇬🇵", "🇬🇺", "🇬🇹", "🇬🇬", "🇬🇳", "🇬🇼", "🇬🇾", "🇭🇹", "🇭🇳", "🇭🇰", "🇭🇺", "🇮🇸", "🇮🇳", "🇮🇩", "🇮🇷", "🇮🇶", "🇮🇪", "🇮🇲", "🇮🇱", "🇮🇹", "🇨🇮", "🇯🇲", "🇯🇵", "🇯🇪", "🇯🇴", "🇰🇿", "🇰🇪", "🇰🇮", "🇽🇰", "🇰🇼", "🇰🇬", "🇱🇦", "🇱🇻", "🇱🇧", "🇱🇸", "🇱🇷", "🇱🇾", "🇱🇮", "🇱🇹", "🇱🇺", "🇲🇴", "🇲🇰", "🇲🇬", "🇲🇼", "🇲🇾", "🇲🇻", "🇲🇱", "🇲🇹", "🇲🇭", "🇲🇶", "🇲🇷", "🇲🇺", "🇾🇹", "🇲🇽", "🇫🇲", "🇲🇩", "🇲🇨", "🇲🇳", "🇲🇪", "🇲🇸", "🇲🇦", "🇲🇿", "🇲🇲", "🇳🇦", "🇳🇷", "🇳🇵", "🇳🇱", "🇳🇨", "🇳🇿", "🇳🇮", "🇳🇪", "🇳🇬", "🇳🇺", "🇳🇫", "🇲🇵", "🇰🇵", "🇳🇴", "🇴🇲", "🇵🇰", "🇵🇼", "🇵🇸", "🇵🇦", "🇵🇬", "🇵🇾", "🇵🇪", "🇵🇭", "🇵🇳", "🇵🇱", "🇵🇹", "🇵🇷", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇺", "🇷🇼", "🇧🇱", "🇸🇭", "🇰🇳", "🇱🇨", "🇵🇲", "🇻🇨", "🇼🇸", "🇸🇲", "🇸🇹", "🇸🇦", "🇸🇳", "🇷🇸", "🇸🇨", "🇸🇱", "🇸🇬", "🇸🇽", "🇸🇰", "🇸🇮", "🇸🇧", "🇸🇴", "🇿🇦", "🇬🇸", "🇰🇷", "🇸🇸", "🇪🇸", "🇱🇰", "🇸🇩", "🇸🇷", "🇸🇿", "🇸🇪", "🇨🇭", "🇸🇾", "🇹🇼", "🇹🇯", "🇹🇿", "🇹🇭", "🇹🇱", "🇹🇬", "🇹🇰", "🇹🇴", "🇹🇹", "🇹🇳", "🇹🇷", "🇹🇲", "🇹🇨", "🇹🇻", "🇺🇬", "🇺🇦", "🇦🇪", "🇬🇧", "🇺🇸", "🇻🇮", "🇺🇾", "🇺🇿", "🇻🇺", "🇻🇦", "🇻🇪", "🇻🇳", "🇼🇫", "🇪🇭", "🇾🇪", "🇿🇲", "🇿🇼"],
  emoji: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Emoji</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-60.000000, -181.000000)' fill='#030303'> <g id='Bottom-Row' transform='translate(3.000000, 170.000000)' sketch:type='MSShapeGroup'> <path d='M66.75,30.5 C72.1347763,30.5 76.5,26.1347763 76.5,20.75 C76.5,15.3652237 72.1347763,11 66.75,11 C61.3652237,11 57,15.3652237 57,20.75 C57,26.1347763 61.3652237,30.5 66.75,30.5 Z M66.75,29.5 C71.5824916,29.5 75.5,25.5824916 75.5,20.75 C75.5,15.9175084 71.5824916,12 66.75,12 C61.9175084,12 58,15.9175084 58,20.75 C58,25.5824916 61.9175084,29.5 66.75,29.5 Z M63.75,19 C64.4403559,19 65,18.4403559 65,17.75 C65,17.0596441 64.4403559,16.5 63.75,16.5 C63.0596441,16.5 62.5,17.0596441 62.5,17.75 C62.5,18.4403559 63.0596441,19 63.75,19 Z M69.75,19 C70.4403559,19 71,18.4403559 71,17.75 C71,17.0596441 70.4403559,16.5 69.75,16.5 C69.0596441,16.5 68.5,17.0596441 68.5,17.75 C68.5,18.4403559 69.0596441,19 69.75,19 Z M59.8876334,22.1641444 C59.6390316,21.383134 60.065918,20.9785156 60.8530951,21.2329304 C60.8530951,21.2329304 63.0937503,22.2125 66.7500001,22.2125 C70.4062499,22.2125 72.6469047,21.2329304 72.6469047,21.2329304 C73.4287162,20.9662153 73.8812463,21.4044097 73.6058477,22.1807437 C73.6058477,22.1807437 72.6,27.575 66.75,27.575 C60.9,27.575 59.8876334,22.1641444 59.8876334,22.1641444 Z M66.75,23.1875 C64.06875,23.1875 61.8544055,22.4737821 61.8544055,22.4737821 C61.3273019,22.32948 61.1781233,22.5721615 61.5639555,22.957075 C61.5639555,22.957075 62.3625,24.65 66.75,24.65 C71.1375,24.65 71.9508503,22.9438304 71.9508503,22.9438304 C72.3093659,22.5399278 72.1690793,22.3359844 71.6354273,22.476349 C71.6354273,22.476349 69.43125,23.1875 66.75,23.1875 Z' id='Emoji'></path> </g> </g> </g> </svg>",
  "delete": {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z' id='Back'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M338.70972,21.7097195 C338.317752,21.3177522 338.318965,20.6810349 338.70972,20.2902805 L344.643245,14.3567547 C344.840276,14.1597245 345.225639,14 345.493741,14 L355.997239,14 C357.103333,14 357.999999,14.8970601 357.999999,16.0058586 L357.999999,25.9941412 C357.999999,27.1019464 357.106457,27.9999999 355.997239,27.9999999 L345.493741,28 C345.221056,28 344.840643,27.8406431 344.643246,27.6432453 L338.70972,21.7097195 Z' id='Back'></path> </g> </g> </g> </svg>"
  },
  food: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Food</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-148.000000, -637.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Food' transform='translate(149.500000, 229.500000)' sketch:type='MSShapeGroup'> <path d='M5.5,15.5 L1,15.5 L0,5 L6.5,5 L6.26360933,7.48210202' id='Drink' stroke='#4A5461'></path> <path d='M6.01077545,1.96930098 L6.51571352,5.22270539 L5.71908184,5.67947812 L5.0389009,1.96930098 L4.85557247,1.96930098 L4.85557247,0.96930098 L8.85557247,0.96930098 L8.85557247,1.96930098 L6.01077545,1.96930098 Z' id='Straw' fill='#4A5461' transform='translate(6.855572, 3.324390) rotate(24.000000) translate(-6.855572, -3.324390) '></path> <rect id='Bottom-Bun' stroke='#4A5461' x='3' y='14' width='10.5' height='1.5' rx='1'></rect> <path d='M1.5,12.5024408 C1.5,11.948808 1.94916916,11.5 2.49268723,11.5 L14.0073128,11.5 C14.5555588,11.5 15,11.9469499 15,12.5024408 L15,12.9975592 C15,13.551192 14.5508308,14 14.0073128,14 L2.49268723,14 C1.94444121,14 1.5,13.5530501 1.5,12.9975592 L1.5,12.5024408 Z M3.93300003,11.8392727 C3.41771834,11.6518976 3.44483697,11.5 3.9955775,11.5 L13.0044225,11.5 C13.5542648,11.5 13.5866061,11.6503251 13.067,11.8392727 L8.5,13.5 L3.93300003,11.8392727 Z' id='&quot;Patty&quot;' fill='#4A5461'></path> <path d='M2.5,10.5 L13.5,10.5 L15,11.5 L1,11.5 L2.5,10.5 Z' id='Cheese' fill='#4A5461'></path> <path d='M8.25,10.5 C11.4256373,10.5 14,10.3284271 14,9.5 C14,8.67157288 11.4256373,8 8.25,8 C5.07436269,8 2.5,8.67157288 2.5,9.5 C2.5,10.3284271 5.07436269,10.5 8.25,10.5 Z' id='Top-Bun' stroke='#4A5461' stroke-width='0.75'></path> </g> </g> </g> </g> </svg>",
  flags: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='15px' viewBox='0 0 11 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Flag</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-275.000000, -639.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Flag' transform='translate(275.000000, 231.500000)' sketch:type='MSShapeGroup'> <rect id='Pole' fill='#4A5461' x='0' y='0' width='1' height='14'></rect> <path d='M1,1 C1,1 1.25,2 3.5,2 C5.75,2 6,0.749999998 8,0.75 C10,0.749999998 10,1.5 10,1.5 L10,7.5 C10,7.5 10,6.5 8,6.5 C6,6.5 4.80623911,8 3.5,8 C2.19376089,8 1,7 1,7 L1,1 Z' stroke='#4A5461' stroke-linejoin='round'></path> </g> </g> </g> </g> </svg>",
  frequent: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Recent</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-55.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Recent' transform='translate(55.500000, 230.000000)' sketch:type='MSShapeGroup'> <circle id='Body' stroke='#4A5461' cx='8' cy='8' r='8'></circle> <path d='M7.5,7.5 L7.5,8.5 L8.5,8.5 L8.5,2 L7.5,2 L7.5,7.5 L4,7.5 L4,8.5 L8.5,8.5 L8.5,7.5 L7.5,7.5 Z' id='Hands' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  keyboard: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='32.5px' height='23.5px' viewBox='0 0 65 47' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='iPad-Portrait' transform='translate(-1436.000000, -1956.000000)' fill='#000000'> <g id='Keyboard-Light' transform='translate(0.000000, 1422.000000)'> <g id='Keyboard-down' transform='translate(1412.000000, 500.000000)'> <path d='M87.001332,34 C88.1051659,34 89,34.8997127 89,35.9932874 L89,61.0067126 C89,62.1075748 88.1058759,63 87.001332,63 L25.998668,63 C24.8948341,63 24,62.1002873 24,61.0067126 L24,35.9932874 C24,34.8924252 24.8941241,34 25.998668,34 L87.001332,34 Z M26,36 L26,61 L87,61 L87,36 L26,36 Z M79,40 L83,40 L83,44 L79,44 L79,40 Z M72,40 L76,40 L76,44 L72,44 L72,40 Z M65,40 L69,40 L69,44 L65,44 L65,40 Z M58,40 L62,40 L62,44 L58,44 L58,40 Z M51,40 L55,40 L55,44 L51,44 L51,40 Z M44,40 L48,40 L48,44 L44,44 L44,40 Z M37,40 L41,40 L41,44 L37,44 L37,40 Z M30,40 L34,40 L34,44 L30,44 L30,40 Z M79,47 L83,47 L83,51 L79,51 L79,47 Z M72,47 L76,47 L76,51 L72,51 L72,47 Z M65,47 L69,47 L69,51 L65,51 L65,47 Z M58,47 L62,47 L62,51 L58,51 L58,47 Z M51,47 L55,47 L55,51 L51,51 L51,47 Z M44,47 L48,47 L48,51 L44,51 L44,47 Z M37,47 L41,47 L41,51 L37,51 L37,47 Z M30,47 L34,47 L34,51 L30,51 L30,47 Z M79,54 L83,54 L83,58 L79,58 L79,54 Z M72,54 L76,54 L76,58 L72,58 L72,54 Z M44,54 L69,54 L69,58 L44,58 L44,54 Z M37,54 L41,54 L41,58 L37,58 L37,54 Z M30,54 L34,54 L34,58 L30,58 L30,54 Z M44.3163498,69.9771047 C43.3684225,70.5420342 43.3338721,71.5096495 44.2378217,72.1373912 L55.3621539,79.8626088 C56.2667113,80.4907726 57.7338965,80.4903505 58.6378461,79.8626088 L69.7621783,72.1373912 C70.6667357,71.5092274 70.648012,70.5205204 69.7115187,69.9234166 L69.9825731,70.0962396 C69.5181333,69.800115 68.7782557,69.8126493 68.3261307,70.1269323 L57.8154999,77.4331263 C57.3651117,77.746202 56.628165,77.7381786 56.1762103,77.4199424 L45.8386137,70.1408977 C45.3836472,69.8205407 44.6375039,69.7857088 44.1566393,70.0722862 L44.3163498,69.9771047 Z' id='Shape'></path> </g> </g> </g> </g> </svg>",
  keyPopUp: {
    light: {
      "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>"
    },
    dark: {
      "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='##636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>",
      "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#636363' mask='url(#mask-3)' fill='#636363' xlink:href='#path-2'></use> </g> </svg>"
    }
  },
  objects: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='16px' viewBox='0 0 11 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Lightbulb</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-244.000000, -639.000000)' stroke='#4A5361'> <g id='Lightbulb' sketch:type='MSLayerGroup' transform='translate(244.000000, 639.000000)'> <path d='M8,10.4002904 C9.78083795,9.48993491 11,7.63734273 11,5.5 C11,2.46243388 8.53756612,0 5.5,0 C2.46243388,0 0,2.46243388 0,5.5 C0,7.63734273 1.21916205,9.48993491 3,10.4002904 L3,14.0020869 C3,15.1017394 3.89761602,16 5.0048815,16 L5.9951185,16 C7.1061002,16 8,15.1055038 8,14.0020869 L8,10.4002904 Z' id='Oval-17' sketch:type='MSShapeGroup'></path> <rect id='Rectangle-50' sketch:type='MSShapeGroup' x='3' y='12' width='5' height='1'></rect> <rect id='Rectangle-51' sketch:type='MSShapeGroup' x='4' y='13.5' width='1.5' height='1'></rect> <path d='M5,8.5 C5,8.5 3.49999999,7.50000001 4,7 C4.50000001,6.49999999 5,7.66666667 5.5,8 C5.5,8 6.5,6.50000001 7,7 C7.5,7.49999999 6,8.5 6,8.5 L6,11 L5,11 L5,8.5 Z' id='Rectangle-52' sketch:type='MSShapeGroup'></path> </g> </g> </g> </svg>",
  shift: {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-14.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.7052388,13.2052388 C21.3157462,12.8157462 20.6857559,12.8142441 20.2947612,13.2052388 L11.9160767,21.5839233 C11.1339991,22.3660009 11.3982606,23 12.4979131,23 L16.5,23 L16.5,28.009222 C16.5,28.5564136 16.9463114,29 17.4975446,29 L24.5024554,29 C25.053384,29 25.5,28.5490248 25.5,28.009222 L25.5,23 L29.5020869,23 C30.6055038,23 30.866824,22.366824 30.0839233,21.5839233 L21.7052388,13.2052388 Z' id='Shift'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-14.000000, -129.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.6719008,12.2325898 C21.301032,11.8279916 20.6946892,11.8334731 20.3288195,12.2325898 L11.6947023,21.6512983 C10.7587441,22.672308 11.1285541,23.5 12.5097751,23.5 L15.9999999,23.5000002 L15.9999999,28.0014241 C15.9999999,28.8290648 16.6716559,29.5000001 17.497101,29.5000001 L24.5028992,29.5000001 C25.3297253,29.5000001 26.0000003,28.8349703 26.0000003,28.0014241 L26.0000003,23.5000001 L29.4902251,23.5000002 C30.8763357,23.5000002 31.2439521,22.6751916 30.3054161,21.6512985 L21.6719008,12.2325898 Z M21.341748,14.3645316 C21.1530056,14.1632064 20.8433515,14.1670914 20.6582514,14.3645316 L13.5,21.9999998 L17.5000001,21.9999999 L17.5000002,27.5089956 C17.5000002,27.7801703 17.7329027,28.0000008 18.0034229,28.0000008 L23.996577,28.0000008 C24.2746097,28.0000008 24.4999997,27.7721203 24.4999997,27.5089956 L24.4999997,21.9999999 L28.5,21.9999999 L21.341748,14.3645316 Z' id='Shift'></path> </g> </g> </g> </svg>"
  },
  messages_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Messages Copy</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#66FD7F' offset='0%'></stop> <stop stop-color='#09B826' offset='100%'></stop> </linearGradient> </defs> <g id='iOS-Kit' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen' transform='translate(-1452.000000, -853.000000)'> <g id='Home-Screen-•-iPhone-6s-Plus' transform='translate(1417.000000, 812.000000)'> <g id='Messages-Copy' transform='translate(35.000000, 41.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <path d='M19.4223976,44.3088006 C13.1664228,41.1348949 9,35.4655421 9,29 C9,19.0588745 18.8497355,11 31,11 C43.1502645,11 53,19.0588745 53,29 C53,38.9411255 43.1502645,47 31,47 C28.6994588,47 26.4813914,46.7110897 24.3970409,46.1751953 C23.9442653,46.8838143 21.9065377,49.5 16.5,49.5 C15.6150187,49.5 17.1834749,48.5915921 18,47.5 C18.7894286,46.4446326 19.2505625,44.9480362 19.4223976,44.3088006 Z' id='Bubble' fill='#FFFFFF'></path> </g> </g> </g> </g> </svg>",
  calendar_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Calendar</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Calendar' transform='translate(92.000000, 0.000000)'> <rect id='BG' fill='#FFFFFF' x='0' y='0' width='60' height='60' rx='14'></rect> <text id='25' font-family='SFUIDisplay-Ultralight, SF UI Display' font-size='40' font-weight='200' letter-spacing='0.379999995' fill='#000000'> <tspan x='7.10828125' y='49'>25</tspan> </text> <text id='Monday' font-family='SFUIDisplay-Medium, SF UI Display' font-size='11' font-weight='400' letter-spacing='0.379999995' fill='#FF3B30'> <tspan x='9.02992189' y='15'>Monday</tspan> </text> </g> </g> </g> </g> </svg>",
  photos_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Photos</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Photos' transform='translate(168.000000, 0.000000)'> <rect id='BG' fill='#FFFFFF' x='0' y='0' width='60' height='60' rx='14'></rect> <rect id='Pedal' fill='#F26E64' style='mix-blend-mode: multiply;' transform='translate(20.142136, 20.142136) rotate(45.000000) translate(-20.142136, -20.142136) ' x='8.14213562' y='12.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#F0E22A' style='mix-blend-mode: multiply;' transform='translate(39.142136, 19.142136) rotate(135.000000) translate(-39.142136, -19.142136) ' x='27.1421356' y='11.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#D288B1' style='mix-blend-mode: multiply;' x='4' y='22' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#FBAD31' style='mix-blend-mode: multiply;' transform='translate(30.000000, 16.000000) rotate(90.000000) translate(-30.000000, -16.000000) ' x='18' y='8' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#A58EC2' style='mix-blend-mode: multiply;' transform='translate(20.142136, 40.142136) scale(1, -1) rotate(45.000000) translate(-20.142136, -40.142136) ' x='8.14213562' y='32.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#6CC199' style='mix-blend-mode: multiply;' transform='translate(40.142136, 40.142136) scale(1, -1) rotate(135.000000) translate(-40.142136, -40.142136) ' x='28.1421356' y='32.1421356' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#77AEDD' style='mix-blend-mode: multiply;' transform='translate(30.000000, 44.000000) scale(1, -1) rotate(90.000000) translate(-30.000000, -44.000000) ' x='18' y='36' width='24' height='16' rx='8'></rect> <rect id='Pedal' fill='#B5D655' style='mix-blend-mode: multiply;' transform='translate(44.000000, 30.000000) rotate(180.000000) translate(-44.000000, -30.000000) ' x='32' y='22' width='24' height='16' rx='8'></rect> </g> </g> </g> </g> </svg>",
  camera_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Camera</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#DBDDDE' offset='0%'></stop> <stop stop-color='#898B91' offset='100%'></stop> </linearGradient> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-2'> <stop stop-color='#474747' offset='0%'></stop> <stop stop-color='#2B2B2B' offset='100%'></stop> </linearGradient> <path d='M9,20 L51,20 L51,42 L9,42 L9,20 Z M9,42.9975722 C9,44.3795877 10.1199653,45.5 11.5015125,45.5 L48.4984875,45.5 C49.8766015,45.5 51,44.3796249 51,42.9975722 L51,42.5 L9,42.5 L9,42.9975722 Z M9,19.5 L9,19.0024278 C9,17.6203751 10.1233985,16.5 11.5015125,16.5 L17.5304496,16.5 C18.4572011,16.4180186 19.3218208,16.2416313 19.9205322,15.8902588 C21.8326425,14.7680772 21.9641113,11.5 24.996205,11.5 L30.026083,11.5 L35.0559611,11.5 C38.0880548,11.5 38.2195236,14.7680772 40.1316339,15.8902588 C40.7303453,16.2416313 41.594965,16.4180186 42.5217165,16.5 L48.4984875,16.5 C49.8800347,16.5 51,17.6204123 51,19.0024278 L51,19.5 L9,19.5 L9,19.5 Z M39.25,31 C39.25,25.8913661 35.1086339,21.75 30,21.75 C24.8913661,21.75 20.75,25.8913661 20.75,31 C20.75,36.1086339 24.8913661,40.25 30,40.25 C35.1086339,40.25 39.25,36.1086339 39.25,31 L39.25,31 Z M22.25,31 C22.25,26.7197932 25.7197932,23.25 30,23.25 C34.2802068,23.25 37.75,26.7197932 37.75,31 C37.75,35.2802068 34.2802068,38.75 30,38.75 C25.7197932,38.75 22.25,35.2802068 22.25,31 L22.25,31 Z' id='path-3'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-4'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feGaussianBlur stdDeviation='1' in='SourceAlpha' result='shadowBlurInner1'></feGaussianBlur> <feOffset dx='0' dy='1' in='shadowBlurInner1' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner1' result='shadowMatrixInner1'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner2'></feGaussianBlur> <feOffset dx='0' dy='1' in='shadowBlurInner2' result='shadowOffsetInner2'></feOffset> <feComposite in='shadowOffsetInner2' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner2'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner2' result='shadowMatrixInner2'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner3'></feGaussianBlur> <feOffset dx='0' dy='0' in='shadowBlurInner3' result='shadowOffsetInner3'></feOffset> <feComposite in='shadowOffsetInner3' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner3'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner3' result='shadowMatrixInner3'></feColorMatrix> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner4'></feGaussianBlur> <feOffset dx='-0' dy='0' in='shadowBlurInner4' result='shadowOffsetInner4'></feOffset> <feComposite in='shadowOffsetInner4' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner4'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner4' result='shadowMatrixInner4'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixInner1'></feMergeNode> <feMergeNode in='shadowMatrixInner2'></feMergeNode> <feMergeNode in='shadowMatrixInner3'></feMergeNode> <feMergeNode in='shadowMatrixInner4'></feMergeNode> </feMerge> </filter> <path d='M13,15.25 C13,14.8357864 13.3355947,14.5 13.7508378,14.5 L15.7491622,14.5 C16.1638385,14.5 16.5,14.8328986 16.5,15.25 L16.5,16 L13,16 L13,15.25 L13,15.25 Z' id='path-6'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-8'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> <circle id='path-9' cx='39.5' cy='23' r='1'></circle> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-10'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-11'> <feGaussianBlur stdDeviation='0.5' in='SourceAlpha' result='shadowBlurInner1'></feGaussianBlur> <feOffset dx='0' dy='0' in='shadowBlurInner1' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -27.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Camera' transform='translate(244.000000, 0.000000)'> <g id='icon'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='Icon' fill='url(#linearGradient-1)'></path> <g id='Camera'> <use fill='black' fill-opacity='1' filter='url(#filter-4)' xlink:href='#path-3'></use> <use fill='url(#linearGradient-2)' fill-rule='evenodd' xlink:href='#path-3'></use> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-3'></use> </g> <g id='Path'> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-6'></use> <use fill='url(#linearGradient-2)' fill-rule='evenodd' xlink:href='#path-6'></use> <use fill='black' fill-opacity='1' filter='url(#filter-8)' xlink:href='#path-6'></use> </g> <g id='Oval-16'> <use fill='black' fill-opacity='1' filter='url(#filter-10)' xlink:href='#path-9'></use> <use fill='#FFC209' fill-rule='evenodd' xlink:href='#path-9'></use> <use fill='black' fill-opacity='1' filter='url(#filter-11)' xlink:href='#path-9'></use> </g> </g> </g> </g> </g> </g> </svg>",
  weather_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Wealther</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#1D62F0' offset='0%'></stop> <stop stop-color='#19D5FD' offset='100%'></stop> </linearGradient> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-16.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Wealther' transform='translate(16.000000, 88.000000)'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='BG' fill='url(#linearGradient-1)'></path> <circle id='Sun' fill='#FFD800' cx='19.75' cy='24.25' r='11.25'></circle> <path d='M41.5,43.996687 C46.4930625,43.8642035 50.5,39.775037 50.5,34.75 C50.5,29.6413661 46.3586339,25.5 41.25,25.5 C41.0574549,25.5 40.8662838,25.505883 40.6766567,25.5174791 C39.0043353,21.4018889 34.9660539,18.5 30.25,18.5 C24.0367966,18.5 19,23.5367966 19,29.75 C19,30.0391915 19.0109117,30.3258344 19.032346,30.6095395 C15.8856244,31.1828157 13.5,33.9378116 13.5,37.25 C13.5,40.8942242 16.3879002,43.8639431 20,43.9954562 L20,44 L41.5,44 L41.5,43.996687 L41.5,43.996687 Z' id='Cloud' fill='#FFFFFF' opacity='0.900536381'></path> </g> </g> </g> </g> </svg>",
  clock_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Clock</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#F1F1F1' offset='0%'></stop> <stop stop-color='#EEEEEE' offset='100%'></stop> </linearGradient> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Clock' transform='translate(92.000000, 88.000000)'> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='Icon' fill='#1E1E1F'></path> <circle id='Oval-12' fill='url(#linearGradient-1)' cx='30' cy='30' r='26'></circle> <g id='Digits' transform='translate(8.000000, 7.000000)' fill='#616161'> <path d='M32.468,8 L32.468,3.746 L32.078,3.746 C32.0499999,3.9060008 31.9980004,4.03799948 31.922,4.142 C31.8459996,4.24600052 31.7530005,4.3279997 31.643,4.388 C31.5329994,4.4480003 31.4100007,4.48899989 31.274,4.511 C31.1379993,4.53300011 30.9980007,4.544 30.854,4.544 L30.854,4.952 L31.958,4.952 L31.958,8 L32.468,8 Z' id='1'></path> <path d='M38.096,12.752 L38.606,12.752 C38.602,12.6239994 38.6149999,12.4970006 38.645,12.371 C38.6750002,12.2449994 38.7239997,12.1320005 38.792,12.032 C38.8600003,11.9319995 38.9469995,11.8510003 39.053,11.789 C39.1590005,11.7269997 39.2859993,11.696 39.434,11.696 C39.5460006,11.696 39.6519995,11.7139998 39.752,11.75 C39.8520005,11.7860002 39.9389996,11.8379997 40.013,11.906 C40.0870004,11.9740003 40.1459998,12.0549995 40.19,12.149 C40.2340002,12.2430005 40.256,12.3479994 40.256,12.464 C40.256,12.6120007 40.2330002,12.7419994 40.187,12.854 C40.1409998,12.9660006 40.0730005,13.0699995 39.983,13.166 C39.8929996,13.2620005 39.7800007,13.3569995 39.644,13.451 C39.5079993,13.5450005 39.3500009,13.6479994 39.17,13.76 C39.0219993,13.8480004 38.8800007,13.9419995 38.744,14.042 C38.6079993,14.1420005 38.4860005,14.2579993 38.378,14.39 C38.2699995,14.5220007 38.1810004,14.6769991 38.111,14.855 C38.0409997,15.0330009 37.9960001,15.2479987 37.976,15.5 L40.754,15.5 L40.754,15.05 L38.57,15.05 C38.5940001,14.9179993 38.6449996,14.8010005 38.723,14.699 C38.8010004,14.5969995 38.8949995,14.5020004 39.005,14.414 C39.1150006,14.3259996 39.2359993,14.2430004 39.368,14.165 C39.5000007,14.0869996 39.6319993,14.0080004 39.764,13.928 C39.8960007,13.8439996 40.0239994,13.7560005 40.148,13.664 C40.2720006,13.5719995 40.3819995,13.4690006 40.478,13.355 C40.5740005,13.2409994 40.6509997,13.1120007 40.709,12.968 C40.7670003,12.8239993 40.796,12.6580009 40.796,12.47 C40.796,12.269999 40.7610004,12.0940008 40.691,11.942 C40.6209997,11.7899992 40.5260006,11.6630005 40.406,11.561 C40.2859994,11.4589995 40.1450008,11.3810003 39.983,11.327 C39.8209992,11.2729997 39.6480009,11.246 39.464,11.246 C39.2399989,11.246 39.0400009,11.2839996 38.864,11.36 C38.6879991,11.4360004 38.5410006,11.5409993 38.423,11.675 C38.3049994,11.8090007 38.2180003,11.9679991 38.162,12.152 C38.1059997,12.3360009 38.0839999,12.5359989 38.096,12.752 L38.096,12.752 Z' id='2'></path> <path d='M42.14,22.57 L42.14,23.002 C42.2360005,22.9899999 42.3379995,22.984 42.446,22.984 C42.5740006,22.984 42.6929995,23.0009998 42.803,23.035 C42.9130006,23.0690002 43.0079996,23.1209997 43.088,23.191 C43.1680004,23.2610004 43.2319998,23.3469995 43.28,23.449 C43.3280002,23.5510005 43.352,23.6679993 43.352,23.8 C43.352,23.9280006 43.3270003,24.0429995 43.277,24.145 C43.2269998,24.2470005 43.1600004,24.3329997 43.076,24.403 C42.9919996,24.4730004 42.8940006,24.5269998 42.782,24.565 C42.6699994,24.6030002 42.5520006,24.622 42.428,24.622 C42.1359985,24.622 41.9140008,24.5350009 41.762,24.361 C41.6099992,24.1869991 41.53,23.9620014 41.522,23.686 L41.012,23.686 C41.008,23.9060011 41.0389997,24.1019991 41.105,24.274 C41.1710003,24.4460009 41.2659994,24.5909994 41.39,24.709 C41.5140006,24.8270006 41.6639991,24.9159997 41.84,24.976 C42.0160009,25.0360003 42.2119989,25.066 42.428,25.066 C42.628001,25.066 42.8169991,25.0390003 42.995,24.985 C43.1730009,24.9309997 43.3279993,24.8500005 43.46,24.742 C43.5920007,24.6339995 43.6969996,24.4990008 43.775,24.337 C43.8530004,24.1749992 43.892,23.9880011 43.892,23.776 C43.892,23.5199987 43.8290006,23.2980009 43.703,23.11 C43.5769994,22.9219991 43.3840013,22.8000003 43.124,22.744 L43.124,22.732 C43.2920008,22.6559996 43.4319994,22.5440007 43.544,22.396 C43.6560006,22.2479993 43.712,22.078001 43.712,21.886 C43.712,21.689999 43.6790003,21.5200007 43.613,21.376 C43.5469997,21.2319993 43.4560006,21.1140005 43.34,21.022 C43.2239994,20.9299995 43.0870008,20.8610002 42.929,20.815 C42.7709992,20.7689998 42.6000009,20.746 42.416,20.746 C42.2039989,20.746 42.0170008,20.7799997 41.855,20.848 C41.6929992,20.9160003 41.5580005,21.0099994 41.45,21.13 C41.3419995,21.2500006 41.2590003,21.3939992 41.201,21.562 C41.1429997,21.7300008 41.11,21.915999 41.102,22.12 L41.612,22.12 C41.612,21.9959994 41.6279998,21.8780006 41.66,21.766 C41.6920002,21.6539994 41.7409997,21.5560004 41.807,21.472 C41.8730003,21.3879996 41.9569995,21.3210003 42.059,21.271 C42.1610005,21.2209998 42.2799993,21.196 42.416,21.196 C42.6320011,21.196 42.8119993,21.2529994 42.956,21.367 C43.1000007,21.4810006 43.172,21.6519989 43.172,21.88 C43.172,21.9920006 43.1500002,22.0919996 43.106,22.18 C43.0619998,22.2680004 43.0030004,22.3409997 42.929,22.399 C42.8549996,22.4570003 42.7690005,22.5009999 42.671,22.531 C42.5729995,22.5610002 42.4700005,22.576 42.362,22.576 L42.254,22.576 L42.194,22.576 C42.1779999,22.576 42.1600001,22.574 42.14,22.57 L42.14,22.57 Z' id='3'></path> <path d='M40.366,34.054 L38.938,34.054 L40.354,31.972 L40.366,31.972 L40.366,34.054 Z M40.846,34.054 L40.846,31.246 L40.438,31.246 L38.5,34.012 L38.5,34.504 L40.366,34.504 L40.366,35.5 L40.846,35.5 L40.846,34.504 L41.422,34.504 L41.422,34.054 L40.846,34.054 Z' id='4'></path> <path d='M33.652,38.768 L33.652,38.318 L31.552,38.318 L31.156,40.526 L31.594,40.55 C31.6940005,40.4299994 31.8089993,40.3330004 31.939,40.259 C32.0690006,40.1849996 32.2179992,40.148 32.386,40.148 C32.5300007,40.148 32.6609994,40.1719998 32.779,40.22 C32.8970006,40.2680002 32.9979996,40.3349996 33.082,40.421 C33.1660004,40.5070004 33.2309998,40.6089994 33.277,40.727 C33.3230002,40.8450006 33.346,40.9739993 33.346,41.114 C33.346,41.2820008 33.3220002,41.4289994 33.274,41.555 C33.2259998,41.6810006 33.1610004,41.7859996 33.079,41.87 C32.9969996,41.9540004 32.9010005,42.0169998 32.791,42.059 C32.6809994,42.1010002 32.5660006,42.122 32.446,42.122 C32.3179994,42.122 32.2010005,42.1030002 32.095,42.065 C31.9889995,42.0269998 31.8970004,41.9730004 31.819,41.903 C31.7409996,41.8329997 31.6790002,41.7510005 31.633,41.657 C31.5869998,41.5629995 31.56,41.4620005 31.552,41.354 L31.042,41.354 C31.046,41.546001 31.0839996,41.7179992 31.156,41.87 C31.2280004,42.0220008 31.3259994,42.1489995 31.45,42.251 C31.5740006,42.3530005 31.7169992,42.4309997 31.879,42.485 C32.0410008,42.5390003 32.2139991,42.566 32.398,42.566 C32.6460012,42.566 32.8629991,42.5270004 33.049,42.449 C33.2350009,42.3709996 33.3899994,42.2660007 33.514,42.134 C33.6380006,42.0019993 33.7309997,41.8510009 33.793,41.681 C33.8550003,41.5109992 33.886,41.3360009 33.886,41.156 C33.886,40.9119988 33.8500004,40.6990009 33.778,40.517 C33.7059996,40.3349991 33.6080006,40.1830006 33.484,40.061 C33.3599994,39.9389994 33.2140008,39.8480003 33.046,39.788 C32.8779992,39.7279997 32.7000009,39.698 32.512,39.698 C32.3679993,39.698 32.2230007,39.7229998 32.077,39.773 C31.9309993,39.8230003 31.8120005,39.8999995 31.72,40.004 L31.708,39.992 L31.936,38.768 L33.652,38.768 Z' id='5'></path> <path d='M22.816,42.332 L23.326,42.332 C23.2939998,41.9799982 23.174001,41.7110009 22.966,41.525 C22.757999,41.3389991 22.4780018,41.246 22.126,41.246 C21.8219985,41.246 21.570001,41.3099994 21.37,41.438 C21.169999,41.5660006 21.0100006,41.7359989 20.89,41.948 C20.7699994,42.1600011 20.6850002,42.4029986 20.635,42.677 C20.5849997,42.9510014 20.56,43.2339985 20.56,43.526 C20.56,43.7500011 20.5769998,43.9819988 20.611,44.222 C20.6450002,44.4620012 20.7139995,44.681999 20.818,44.882 C20.9220005,45.082001 21.069999,45.2459994 21.262,45.374 C21.454001,45.5020006 21.7079984,45.566 22.024,45.566 C22.2920013,45.566 22.5169991,45.5210005 22.699,45.431 C22.8810009,45.3409996 23.0269994,45.2270007 23.137,45.089 C23.2470005,44.9509993 23.3259998,44.7980008 23.374,44.63 C23.4220002,44.4619992 23.446,44.3000008 23.446,44.144 C23.446,43.947999 23.4160003,43.7660008 23.356,43.598 C23.2959997,43.4299992 23.2110005,43.2840006 23.101,43.16 C22.9909994,43.0359994 22.8550008,42.9390004 22.693,42.869 C22.5309992,42.7989997 22.348001,42.764 22.144,42.764 C21.9119988,42.764 21.7070009,42.8079996 21.529,42.896 C21.3509991,42.9840004 21.2020006,43.125999 21.082,43.322 L21.07,43.31 C21.074,43.1459992 21.0899999,42.9700009 21.118,42.782 C21.1460001,42.5939991 21.1969996,42.4190008 21.271,42.257 C21.3450004,42.0949992 21.4479993,41.9610005 21.58,41.855 C21.7120007,41.7489995 21.8859989,41.696 22.102,41.696 C22.306001,41.696 22.4699994,41.7539994 22.594,41.87 C22.7180006,41.9860006 22.7919999,42.139999 22.816,42.332 L22.816,42.332 Z M22.048,43.214 C22.1920007,43.214 22.3179995,43.2399997 22.426,43.292 C22.5340005,43.3440003 22.6239996,43.4129996 22.696,43.499 C22.7680004,43.5850004 22.8209998,43.6869994 22.855,43.805 C22.8890002,43.9230006 22.906,44.0479993 22.906,44.18 C22.906,44.3040006 22.8870002,44.4229994 22.849,44.537 C22.8109998,44.6510006 22.7560004,44.7519996 22.684,44.84 C22.6119996,44.9280004 22.5230005,44.9969998 22.417,45.047 C22.3109995,45.0970003 22.1880007,45.122 22.048,45.122 C21.9079993,45.122 21.7830005,45.0970003 21.673,45.047 C21.5629994,44.9969998 21.4710004,44.9300004 21.397,44.846 C21.3229996,44.7619996 21.2660002,44.6620006 21.226,44.546 C21.1859998,44.4299994 21.166,44.3060007 21.166,44.174 C21.166,44.0419993 21.1849998,43.9170006 21.223,43.799 C21.2610002,43.6809994 21.3179996,43.5790004 21.394,43.493 C21.4700004,43.4069996 21.5619995,43.3390003 21.67,43.289 C21.7780005,43.2389998 21.9039993,43.214 22.048,43.214 L22.048,43.214 Z' id='6'></path> <path d='M12.886,38.756 L12.886,38.318 L10.132,38.318 L10.132,38.798 L12.364,38.798 C12.1399989,39.0340012 11.931001,39.2919986 11.737,39.572 C11.542999,39.8520014 11.3720007,40.1489984 11.224,40.463 C11.0759993,40.7770016 10.9550005,41.1049983 10.861,41.447 C10.7669995,41.7890017 10.7080001,42.1399982 10.684,42.5 L11.254,42.5 C11.2740001,42.1679983 11.3299995,41.8260018 11.422,41.474 C11.5140005,41.1219982 11.6329993,40.7800017 11.779,40.448 C11.9250007,40.1159983 12.0919991,39.8040015 12.28,39.512 C12.4680009,39.2199985 12.6699989,38.9680011 12.886,38.756 L12.886,38.756 Z' id='7'></path> <path d='M3.262,32.35 C3.262,32.2419995 3.2819998,32.1480004 3.322,32.068 C3.3620002,31.9879996 3.41499967,31.9200003 3.481,31.864 C3.54700033,31.8079997 3.62599954,31.7660001 3.718,31.738 C3.81000046,31.7099999 3.9059995,31.696 4.006,31.696 C4.21400104,31.696 4.38499933,31.7509995 4.519,31.861 C4.65300067,31.9710006 4.72,32.1339989 4.72,32.35 C4.72,32.5660011 4.65400066,32.7339994 4.522,32.854 C4.38999934,32.9740006 4.22200102,33.034 4.018,33.034 C3.91399948,33.034 3.81600046,33.0200001 3.724,32.992 C3.63199954,32.9639999 3.55200034,32.9220003 3.484,32.866 C3.41599966,32.8099997 3.3620002,32.7390004 3.322,32.653 C3.2819998,32.5669996 3.262,32.4660006 3.262,32.35 L3.262,32.35 Z M2.722,32.332 C2.722,32.524001 2.77599946,32.7009992 2.884,32.863 C2.99200054,33.0250008 3.1359991,33.1419996 3.316,33.214 C3.0759988,33.2980004 2.89200064,33.4329991 2.764,33.619 C2.63599936,33.8050009 2.572,34.0239987 2.572,34.276 C2.572,34.4920011 2.60899963,34.6809992 2.683,34.843 C2.75700037,35.0050008 2.85899935,35.1399995 2.989,35.248 C3.11900065,35.3560005 3.27199912,35.4359997 3.448,35.488 C3.62400088,35.5400003 3.81399898,35.566 4.018,35.566 C4.21400098,35.566 4.39799914,35.5380003 4.57,35.482 C4.74200086,35.4259997 4.89099937,35.3430006 5.017,35.233 C5.14300063,35.1229995 5.24299963,34.9880008 5.317,34.828 C5.39100037,34.6679992 5.428,34.484001 5.428,34.276 C5.428,34.0119987 5.36600062,33.7890009 5.242,33.607 C5.11799938,33.4249991 4.92800128,33.2940004 4.672,33.214 C4.8520009,33.1339996 4.99499947,33.0150008 5.101,32.857 C5.20700053,32.6989992 5.26,32.524001 5.26,32.332 C5.26,32.1959993 5.23600024,32.0630007 5.188,31.933 C5.13999976,31.8029994 5.06500051,31.6870005 4.963,31.585 C4.86099949,31.4829995 4.72800082,31.4010003 4.564,31.339 C4.39999918,31.2769997 4.20200116,31.246 3.97,31.246 C3.80599918,31.246 3.64900075,31.2699998 3.499,31.318 C3.34899925,31.3660002 3.21600058,31.4359995 3.1,31.528 C2.98399942,31.6200005 2.89200034,31.7329993 2.824,31.867 C2.75599966,32.0010007 2.722,32.1559991 2.722,32.332 L2.722,32.332 Z M3.112,34.3 C3.112,34.1759994 3.13499977,34.0640005 3.181,33.964 C3.22700023,33.8639995 3.29099959,33.7780004 3.373,33.706 C3.45500041,33.6339996 3.55099945,33.5790002 3.661,33.541 C3.77100055,33.5029998 3.88799938,33.484 4.012,33.484 C4.1320006,33.484 4.24499947,33.5049998 4.351,33.547 C4.45700053,33.5890002 4.5499996,33.6459996 4.63,33.718 C4.7100004,33.7900004 4.77299977,33.8749995 4.819,33.973 C4.86500023,34.0710005 4.888,34.1779994 4.888,34.294 C4.888,34.4140006 4.86700021,34.5239995 4.825,34.624 C4.78299979,34.7240005 4.72300039,34.8109996 4.645,34.885 C4.56699961,34.9590004 4.47500053,35.0169998 4.369,35.059 C4.26299947,35.1010002 4.14600064,35.122 4.018,35.122 C3.75399868,35.122 3.53700085,35.0490007 3.367,34.903 C3.19699915,34.7569993 3.112,34.5560013 3.112,34.3 L3.112,34.3 Z' id='8'></path> <path d='M1.136,23.974 L0.626,23.974 C0.65800016,24.3420018 0.79199882,24.6159991 1.028,24.796 C1.26400118,24.9760009 1.55999822,25.066 1.916,25.066 C2.43200258,25.066 2.80699883,24.869002 3.041,24.475 C3.27500117,24.080998 3.392,23.5160037 3.392,22.78 C3.392,22.375998 3.35300039,22.0430013 3.275,21.781 C3.19699961,21.5189987 3.09200066,21.3120008 2.96,21.16 C2.82799934,21.0079992 2.67400088,20.9010003 2.498,20.839 C2.32199912,20.7769997 2.134001,20.746 1.934,20.746 C1.72999898,20.746 1.54200086,20.7799997 1.37,20.848 C1.19799914,20.9160003 1.05000062,21.0109994 0.926,21.133 C0.80199938,21.2550006 0.70600034,21.4009992 0.638,21.571 C0.56999966,21.7410009 0.536,21.927999 0.536,22.132 C0.536,22.340001 0.56499971,22.5319991 0.623,22.708 C0.68100029,22.8840009 0.76699943,23.0339994 0.881,23.158 C0.99500057,23.2820006 1.13599916,23.3789997 1.304,23.449 C1.47200084,23.5190004 1.66399892,23.554 1.88,23.554 C2.08800104,23.554 2.27999912,23.5010005 2.456,23.395 C2.63200088,23.2889995 2.76799952,23.1460009 2.864,22.966 L2.876,22.978 C2.85999992,23.5340028 2.77400078,23.9469987 2.618,24.217 C2.46199922,24.4870014 2.22800156,24.622 1.916,24.622 C1.71199898,24.622 1.53600074,24.5660006 1.388,24.454 C1.23999926,24.3419994 1.1560001,24.182001 1.136,23.974 L1.136,23.974 Z M2.786,22.168 C2.786,22.2920006 2.7660002,22.4109994 2.726,22.525 C2.6859998,22.6390006 2.62800038,22.7389996 2.552,22.825 C2.47599962,22.9110004 2.38400054,22.9789998 2.276,23.029 C2.16799946,23.0790003 2.04800066,23.104 1.916,23.104 C1.79199938,23.104 1.67900051,23.0790003 1.577,23.029 C1.47499949,22.9789998 1.38700037,22.9120004 1.313,22.828 C1.23899963,22.7439996 1.18100021,22.6480005 1.139,22.54 C1.09699979,22.4319995 1.076,22.3200006 1.076,22.204 C1.076,22.0719993 1.09099985,21.9460006 1.121,21.826 C1.15100015,21.7059994 1.19899967,21.5990005 1.265,21.505 C1.33100033,21.4109995 1.41699947,21.3360003 1.523,21.28 C1.62900053,21.2239997 1.75799924,21.196 1.91,21.196 C2.05400072,21.196 2.17999946,21.2219997 2.288,21.274 C2.39600054,21.3260003 2.48699963,21.3969996 2.561,21.487 C2.63500037,21.5770005 2.69099981,21.6799994 2.729,21.796 C2.76700019,21.9120006 2.786,22.0359993 2.786,22.168 L2.786,22.168 Z' id='9'></path> <path d='M2.8,15.5 L2.8,11.246 L2.41,11.246 C2.38199986,11.4060008 2.33000038,11.5379995 2.254,11.642 C2.17799962,11.7460005 2.08500055,11.8279997 1.975,11.888 C1.86499945,11.9480003 1.74200068,11.9889999 1.606,12.011 C1.46999932,12.0330001 1.33000072,12.044 1.186,12.044 L1.186,12.452 L2.29,12.452 L2.29,15.5 L2.8,15.5 Z M4.792,13.406 C4.792,13.3019995 4.79299999,13.1870006 4.795,13.061 C4.79700001,12.9349994 4.80699991,12.8090006 4.825,12.683 C4.84300009,12.5569994 4.86899983,12.4340006 4.903,12.314 C4.93700017,12.1939994 4.98699967,12.0890005 5.053,11.999 C5.11900033,11.9089996 5.2019995,11.8360003 5.302,11.78 C5.4020005,11.7239997 5.52399928,11.696 5.668,11.696 C5.81200072,11.696 5.9339995,11.7239997 6.034,11.78 C6.1340005,11.8360003 6.21699967,11.9089996 6.283,11.999 C6.34900033,12.0890005 6.39899983,12.1939994 6.433,12.314 C6.46700017,12.4340006 6.49299991,12.5569994 6.511,12.683 C6.52900009,12.8090006 6.53899999,12.9349994 6.541,13.061 C6.54300001,13.1870006 6.544,13.3019995 6.544,13.406 C6.544,13.5660008 6.53900005,13.744999 6.529,13.943 C6.51899995,14.141001 6.48700027,14.3269991 6.433,14.501 C6.37899973,14.6750009 6.2920006,14.8219994 6.172,14.942 C6.0519994,15.0620006 5.88400108,15.122 5.668,15.122 C5.45199892,15.122 5.2840006,15.0620006 5.164,14.942 C5.0439994,14.8219994 4.95700027,14.6750009 4.903,14.501 C4.84899973,14.3269991 4.81700005,14.141001 4.807,13.943 C4.79699995,13.744999 4.792,13.5660008 4.792,13.406 L4.792,13.406 Z M4.252,13.412 C4.252,13.5680008 4.25599996,13.7299992 4.264,13.898 C4.27200004,14.0660008 4.29199984,14.2299992 4.324,14.39 C4.35600016,14.5500008 4.4019997,14.7009993 4.462,14.843 C4.5220003,14.9850007 4.60399948,15.1099995 4.708,15.218 C4.81200052,15.3260005 4.94299921,15.4109997 5.101,15.473 C5.25900079,15.5350003 5.4479989,15.566 5.668,15.566 C5.89200112,15.566 6.08199922,15.5350003 6.238,15.473 C6.39400078,15.4109997 6.52399948,15.3260005 6.628,15.218 C6.73200052,15.1099995 6.8139997,14.9850007 6.874,14.843 C6.9340003,14.7009993 6.97999984,14.5500008 7.012,14.39 C7.04400016,14.2299992 7.06399996,14.0660008 7.072,13.898 C7.08000004,13.7299992 7.084,13.5680008 7.084,13.412 C7.084,13.2559992 7.08000004,13.0940008 7.072,12.926 C7.06399996,12.7579992 7.04400016,12.5940008 7.012,12.434 C6.97999984,12.2739992 6.9340003,12.1220007 6.874,11.978 C6.8139997,11.8339993 6.73200052,11.7080005 6.628,11.6 C6.52399948,11.4919995 6.39300079,11.4060003 6.235,11.342 C6.07699921,11.2779997 5.8880011,11.246 5.668,11.246 C5.4479989,11.246 5.25900079,11.2779997 5.101,11.342 C4.94299921,11.4060003 4.81200052,11.4919995 4.708,11.6 C4.60399948,11.7080005 4.5220003,11.8339993 4.462,11.978 C4.4019997,12.1220007 4.35600016,12.2739992 4.324,12.434 C4.29199984,12.5940008 4.27200004,12.7579992 4.264,12.926 C4.25599996,13.0940008 4.252,13.2559992 4.252,13.412 L4.252,13.412 Z' id='10'></path> <path d='M10.8,8 L10.8,3.746 L10.41,3.746 C10.3819999,3.9060008 10.3300004,4.03799948 10.254,4.142 C10.1779996,4.24600052 10.0850005,4.3279997 9.975,4.388 C9.86499945,4.4480003 9.74200068,4.48899989 9.606,4.511 C9.46999932,4.53300011 9.33000072,4.544 9.186,4.544 L9.186,4.952 L10.29,4.952 L10.29,8 L10.8,8 Z M14.136,8 L14.136,3.746 L13.746,3.746 C13.7179999,3.9060008 13.6660004,4.03799948 13.59,4.142 C13.5139996,4.24600052 13.4210005,4.3279997 13.311,4.388 C13.2009994,4.4480003 13.0780007,4.48899989 12.942,4.511 C12.8059993,4.53300011 12.6660007,4.544 12.522,4.544 L12.522,4.952 L13.626,4.952 L13.626,8 L14.136,8 Z' id='11'></path> <path d='M20.8,5 L20.8,0.746 L20.41,0.746 C20.3819999,0.9060008 20.3300004,1.03799948 20.254,1.142 C20.1779996,1.24600052 20.0850005,1.3279997 19.975,1.388 C19.8649994,1.4480003 19.7420007,1.48899989 19.606,1.511 C19.4699993,1.53300011 19.3300007,1.544 19.186,1.544 L19.186,1.952 L20.29,1.952 L20.29,5 L20.8,5 Z M22.264,2.252 L22.774,2.252 C22.77,2.12399936 22.7829998,1.99700063 22.813,1.871 C22.8430001,1.74499937 22.8919997,1.6320005 22.96,1.532 C23.0280003,1.4319995 23.1149995,1.35100031 23.221,1.289 C23.3270005,1.22699969 23.4539993,1.196 23.602,1.196 C23.7140006,1.196 23.8199995,1.21399982 23.92,1.25 C24.0200005,1.28600018 24.1069996,1.33799966 24.181,1.406 C24.2550004,1.47400034 24.3139998,1.55499953 24.358,1.649 C24.4020002,1.74300047 24.424,1.84799942 24.424,1.964 C24.424,2.11200074 24.4010002,2.24199944 24.355,2.354 C24.3089998,2.46600056 24.2410004,2.56999952 24.151,2.666 C24.0609995,2.76200048 23.9480007,2.85699953 23.812,2.951 C23.6759993,3.04500047 23.5180009,3.14799944 23.338,3.26 C23.1899993,3.34800044 23.0480007,3.4419995 22.912,3.542 C22.7759993,3.6420005 22.6540005,3.75799934 22.546,3.89 C22.4379995,4.02200066 22.3490003,4.17699911 22.279,4.355 C22.2089996,4.53300089 22.1640001,4.74799874 22.144,5 L24.922,5 L24.922,4.55 L22.738,4.55 C22.7620001,4.41799934 22.8129996,4.30100051 22.891,4.199 C22.9690004,4.09699949 23.0629994,4.00200044 23.173,3.914 C23.2830005,3.82599956 23.4039993,3.74300039 23.536,3.665 C23.6680007,3.58699961 23.7999993,3.5080004 23.932,3.428 C24.0640007,3.34399958 24.1919994,3.25600046 24.316,3.164 C24.4400006,3.07199954 24.5499995,2.96900057 24.646,2.855 C24.7420005,2.74099943 24.8189997,2.61200072 24.877,2.468 C24.9350003,2.32399928 24.964,2.15800094 24.964,1.97 C24.964,1.769999 24.9290003,1.59400076 24.859,1.442 C24.7889996,1.28999924 24.6940006,1.16300051 24.574,1.061 C24.4539994,0.95899949 24.3130008,0.88100027 24.151,0.827 C23.9889992,0.77299973 23.8160009,0.746 23.632,0.746 C23.4079989,0.746 23.2080009,0.78399962 23.032,0.86 C22.8559991,0.93600038 22.7090006,1.04099933 22.591,1.175 C22.4729994,1.30900067 22.3860003,1.46799908 22.33,1.652 C22.2739997,1.83600092 22.2519999,2.03599892 22.264,2.252 L22.264,2.252 Z' id='12'></path> </g> <polygon id='Hour' fill='#2A2929' transform='translate(25.319297, 23.611917) rotate(-38.000000) translate(-25.319297, -23.611917) ' points='24.8192972 15.6119168 25.8192972 15.6119168 25.8192972 31.6119168 24.8192972 31.6119168'></polygon> <polygon id='Minute' fill='#2A2929' transform='translate(19.329949, 35.730028) rotate(62.000000) translate(-19.329949, -35.730028) ' points='19.0494321 24.2986991 19.9184363 24.2986991 19.7874404 47.2986991 18.9184363 47.2986991'></polygon> <polygon id='Second' fill='#DD4524' transform='translate(39.644621, 32.129480) rotate(-76.000000) translate(-39.644621, -32.129480) ' points='38.9523565 18.2482315 39.9221138 18.2482315 39.9523565 46.2482315 38.9825992 46.2482315'></polygon> <circle id='Oval-13' fill='#2A2929' cx='30' cy='30' r='1.25'></circle> <circle id='Oval-14' fill='#DD4524' cx='30' cy='30' r='0.75'></circle> </g> </g> </g> </g> </svg>",
  maps_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Maps</title> <desc>Created with Sketch.</desc> <defs> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-1'></path> <path d='M-4.5,30 C-4.5,30 -4.47462625,30.4967807 -4.42511695,30.4912401 C-3.44229055,30.3812506 9.10445696,28.4946923 17.5075684,34.5092773 C23.2683105,38.6325684 26.42078,43.7490087 31,48.1848145 C36.7919922,53.7954102 44.3314042,55.6680664 50.4058144,56.250293 C56.4802246,56.8325195 65,56 65,56 L65,66 C65,66 53.5489633,65.3769385 47.8234863,64.6784668 C42.0980093,63.9799951 33.2470703,62.026123 27.392334,57.927002 C17.9909668,50.1728516 19.277874,47.8193763 12.291748,43.2246094 C5.24072266,38.5871582 -4.5,40.5 -4.5,40.5 L-4.5,30 Z' id='path-3'></path> <mask id='mask-4' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='70.5' height='37'> <rect x='-5' y='29.5' width='70.5' height='37' fill='white'></rect> <use xlink:href='#path-3' fill='black'></use> </mask> <polygon id='path-5' points='50.5 60 41.5 60 41.5 18.8429752 0 18.8429752 0 9.91735537 41.5 9.91735537 41.5 0 50.5 0 50.5 9.91735537 60 9.91735537 60 18.8429752 50.5 18.8429752 50.5 36.6942149 60 36.6942149 60 45.6198347 50.5 45.6198347'></polygon> <mask id='mask-6' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='61' height='61'> <rect x='-0.5' y='-0.5' width='61' height='61' fill='white'></rect> <use xlink:href='#path-5' fill='black'></use> </mask> <path d='M0.5,7.5 C0.814961548,13.8459051 5.03679656,19.5 12.75,19.5 C20.4632034,19.5 24.6314755,13.8439381 25,7.5 C25.1235352,5.37341309 24.3674316,2.56555176 23.5068131,1.2710142 C22.4549565,2.02599285 20.4373562,2.5 18.75,2.5 C16.1596631,2.5 13.4693848,1.88292106 12.75,0.347133799 C12.0306152,1.88292106 9.34033689,2.5 6.75,2.5 C5.06264383,2.5 3.04504346,2.02599285 1.99318686,1.2710142 C1.13293457,2.76416016 0.392089844,5.32580566 0.5,7.5 Z' id='path-7'></path> <mask id='mask-8' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-7'></use> </mask> <mask id='mask-10' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-7'></use> </mask> <rect id='path-11' x='0' y='0.5' width='25' height='5'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-12'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 1 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> <path d='M0.5,7.5 C0.814961548,13.8459051 5.03679656,19.5 12.75,19.5 C20.4632034,19.5 24.6314755,13.8439381 25,7.5 C25.1235352,5.37341309 24.3674316,2.56555176 23.5068131,1.2710142 C22.4549565,2.02599285 20.4373562,2.5 18.75,2.5 C16.1596631,2.5 13.4693848,1.88292106 12.75,0.347133799 C12.0306152,1.88292106 9.34033689,2.5 6.75,2.5 C5.06264383,2.5 3.04504346,2.02599285 1.99318686,1.2710142 C1.13293457,2.76416016 0.392089844,5.32580566 0.5,7.5 Z' id='path-13'></path> <mask id='mask-14' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='24.5237787' height='19.1528662' fill='white'> <use xlink:href='#path-13'></use> </mask> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Maps' transform='translate(168.000000, 88.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#E4DDC9' xlink:href='#path-1'></use> <rect id='Block' fill='#76C63B' mask='url(#mask-2)' x='0' y='0' width='42' height='10'></rect> <rect id='Block' fill='#FBC6D1' mask='url(#mask-2)' x='45' y='0.5' width='15' height='10'></rect> <g id='Highway' mask='url(#mask-2)'> <use fill='#FFDE02' fill-rule='evenodd' xlink:href='#path-3'></use> <use stroke='#FEB312' mask='url(#mask-4)' stroke-width='1' xlink:href='#path-3'></use> </g> <g id='Map' mask='url(#mask-2)'> <use fill='#FFFFFF' fill-rule='evenodd' xlink:href='#path-5'></use> <use stroke-opacity='0.1' stroke='#000000' mask='url(#mask-6)' stroke-width='1' xlink:href='#path-5'></use> </g> <path d='M43.6565914,35.5 L43.4489796,35.5 L43.4489796,17 L-1,17 L-1,12 L48.5,12 L48.5,14.5 L48.5,14.5 L48.5,35.5 L48.2923882,35.5 C47.586899,35.178996 46.801811,35 45.9744898,35 C45.1471685,35 44.3620806,35.178996 43.6565914,35.5 L43.6565914,35.5 Z' id='Route' fill='#409BFF' mask='url(#mask-2)'></path> <g id='Indicator' mask='url(#mask-2)'> <g transform='translate(40.500000, 35.500000)'> <circle id='Circle' fill='#007AFF' cx='5.5' cy='5.5' r='5.5'></circle> <polygon id='Arrow' fill='#FFFFFF' points='7.75 8.75 5.5 1.65380592 3.25 8.75 5.5 6.65380592'></polygon> </g> </g> <g id='280' mask='url(#mask-2)'> <g transform='translate(8.000000, 22.500000)'> <mask id='mask-9' fill='white'> <use xlink:href='#path-7'></use> </mask> <g id='Oval-20' stroke='#FFFFFF' mask='url(#mask-8)' stroke-width='1' fill='#007AFF' fill-rule='evenodd'> <use mask='url(#mask-10)' xlink:href='#path-7'></use> </g> <g id='Top' stroke='none' fill='none' mask='url(#mask-9)'> <use fill='black' fill-opacity='1' filter='url(#filter-12)' xlink:href='#path-11'></use> <use fill='#DE1D26' fill-rule='evenodd' xlink:href='#path-11'></use> </g> <g id='Shield' stroke='none' fill='none' mask='url(#mask-9)' stroke-width='1.5'> <use stroke='#FFFFFF' mask='url(#mask-14)' xlink:href='#path-13'></use> </g> <path d='M5.64,9.378 L6.405,9.378 C6.39899997,9.18599904 6.41849978,8.99550095 6.4635,8.8065 C6.50850023,8.61749906 6.58199949,8.44800075 6.684,8.298 C6.78600051,8.14799925 6.91649921,8.02650047 7.0755,7.9335 C7.2345008,7.84049954 7.42499889,7.794 7.647,7.794 C7.81500084,7.794 7.97399925,7.82099973 8.124,7.875 C8.27400075,7.92900027 8.40449945,8.00699949 8.5155,8.109 C8.62650056,8.21100051 8.71499967,8.3324993 8.781,8.4735 C8.84700033,8.61450071 8.88,8.77199913 8.88,8.946 C8.88,9.16800111 8.84550035,9.36299916 8.7765,9.531 C8.70749966,9.69900084 8.60550068,9.85499928 8.4705,9.999 C8.33549933,10.1430007 8.16600102,10.2854993 7.962,10.4265 C7.75799898,10.5675007 7.52100135,10.7219992 7.251,10.89 C7.02899889,11.0220007 6.81600102,11.1629993 6.612,11.313 C6.40799898,11.4630008 6.22500081,11.636999 6.063,11.835 C5.90099919,12.033001 5.76750053,12.2654987 5.6625,12.5325 C5.55749948,12.7995013 5.49000015,13.1219981 5.46,13.5 L9.627,13.5 L9.627,12.825 L6.351,12.825 C6.38700018,12.626999 6.46349942,12.4515008 6.5805,12.2985 C6.69750059,12.1454992 6.83849918,12.0030007 7.0035,11.871 C7.16850083,11.7389993 7.34999901,11.6145006 7.548,11.4975 C7.74600099,11.3804994 7.94399901,11.2620006 8.142,11.142 C8.34000099,11.0159994 8.53199907,10.8840007 8.718,10.746 C8.90400093,10.6079993 9.06899928,10.4535009 9.213,10.2825 C9.35700072,10.1114991 9.47249957,9.91800108 9.5595,9.702 C9.64650044,9.48599892 9.69,9.23700141 9.69,8.955 C9.69,8.6549985 9.63750053,8.39100114 9.5325,8.163 C9.42749948,7.93499886 9.2850009,7.74450077 9.105,7.5915 C8.9249991,7.43849924 8.71350122,7.32150041 8.4705,7.2405 C8.22749879,7.1594996 7.96800138,7.119 7.692,7.119 C7.35599832,7.119 7.05600132,7.17599943 6.792,7.29 C6.52799868,7.40400057 6.30750089,7.561499 6.1305,7.7625 C5.95349912,7.96350101 5.82300042,8.20199862 5.739,8.478 C5.65499958,8.75400138 5.62199991,9.05399838 5.64,9.378 L5.64,9.378 Z M11.643,8.775 C11.643,8.61299919 11.6729997,8.4720006 11.733,8.352 C11.7930003,8.2319994 11.8724995,8.13000042 11.9715,8.046 C12.0705005,7.96199958 12.1889993,7.89900021 12.327,7.857 C12.4650007,7.81499979 12.6089993,7.794 12.759,7.794 C13.0710016,7.794 13.327499,7.87649918 13.5285,8.0415 C13.729501,8.20650083 13.83,8.45099838 13.83,8.775 C13.83,9.09900162 13.731001,9.3509991 13.533,9.531 C13.334999,9.7110009 13.0830015,9.801 12.777,9.801 C12.6209992,9.801 12.4740007,9.78000021 12.336,9.738 C12.1979993,9.69599979 12.0780005,9.63300042 11.976,9.549 C11.8739995,9.46499958 11.7930003,9.35850065 11.733,9.2295 C11.6729997,9.10049936 11.643,8.94900087 11.643,8.775 L11.643,8.775 Z M10.833,8.748 C10.833,9.03600144 10.9139992,9.30149879 11.076,9.5445 C11.2380008,9.78750122 11.4539987,9.96299946 11.724,10.071 C11.3639982,10.1970006 11.088001,10.3994986 10.896,10.6785 C10.703999,10.9575014 10.608,11.2859981 10.608,11.664 C10.608,11.9880016 10.6634994,12.2714988 10.7745,12.5145 C10.8855006,12.7575012 11.038499,12.9599992 11.2335,13.122 C11.428501,13.2840008 11.6579987,13.4039996 11.922,13.482 C12.1860013,13.5600004 12.4709985,13.599 12.777,13.599 C13.0710015,13.599 13.3469987,13.5570004 13.605,13.473 C13.8630013,13.3889996 14.0864991,13.2645008 14.2755,13.0995 C14.4645009,12.9344992 14.6144994,12.7320012 14.7255,12.492 C14.8365006,12.2519988 14.892,11.9760016 14.892,11.664 C14.892,11.267998 14.7990009,10.9335014 14.613,10.6605 C14.4269991,10.3874986 14.1420019,10.1910006 13.758,10.071 C14.0280014,9.9509994 14.2424992,9.77250119 14.4015,9.5355 C14.5605008,9.29849882 14.64,9.03600144 14.64,8.748 C14.64,8.54399898 14.6040004,8.34450098 14.532,8.1495 C14.4599996,7.95449903 14.3475008,7.78050077 14.1945,7.6275 C14.0414992,7.47449924 13.8420012,7.35150047 13.596,7.2585 C13.3499988,7.16549954 13.0530017,7.119 12.705,7.119 C12.4589988,7.119 12.2235011,7.15499964 11.9985,7.227 C11.7734989,7.29900036 11.5740009,7.40399931 11.4,7.542 C11.2259991,7.68000069 11.0880005,7.849499 10.986,8.0505 C10.8839995,8.25150101 10.833,8.48399868 10.833,8.748 L10.833,8.748 Z M11.418,11.7 C11.418,11.5139991 11.4524997,11.3460008 11.5215,11.196 C11.5905003,11.0459993 11.6864994,10.9170005 11.8095,10.809 C11.9325006,10.7009995 12.0764992,10.6185003 12.2415,10.5615 C12.4065008,10.5044997 12.5819991,10.476 12.768,10.476 C12.9480009,10.476 13.1174992,10.5074997 13.2765,10.5705 C13.4355008,10.6335003 13.5749994,10.7189995 13.695,10.827 C13.8150006,10.9350005 13.9094997,11.0624993 13.9785,11.2095 C14.0475003,11.3565007 14.082,11.5169991 14.082,11.691 C14.082,11.8710009 14.0505003,12.0359993 13.9875,12.186 C13.9244997,12.3360008 13.8345006,12.4664994 13.7175,12.5775 C13.6004994,12.6885006 13.4625008,12.7754997 13.3035,12.8385 C13.1444992,12.9015003 12.969001,12.933 12.777,12.933 C12.380998,12.933 12.0555013,12.8235011 11.8005,12.6045 C11.5454987,12.3854989 11.418,12.0840019 11.418,11.7 L11.418,11.7 Z M16.44,10.359 C16.44,10.2029992 16.4415,10.0305009 16.4445,9.8415 C16.4475,9.65249906 16.4624999,9.46350095 16.4895,9.2745 C16.5165001,9.08549906 16.5554997,8.9010009 16.6065,8.721 C16.6575003,8.5409991 16.7324995,8.38350068 16.8315,8.2485 C16.9305005,8.11349933 17.0549993,8.00400042 17.205,7.92 C17.3550008,7.83599958 17.5379989,7.794 17.754,7.794 C17.9700011,7.794 18.1529993,7.83599958 18.303,7.92 C18.4530008,8.00400042 18.5774995,8.11349933 18.6765,8.2485 C18.7755005,8.38350068 18.8504997,8.5409991 18.9015,8.721 C18.9525003,8.9010009 18.9914999,9.08549906 19.0185,9.2745 C19.0455001,9.46350095 19.0605,9.65249906 19.0635,9.8415 C19.0665,10.0305009 19.068,10.2029992 19.068,10.359 C19.068,10.5990012 19.0605001,10.8674985 19.0455,11.1645 C19.0304999,11.4615015 18.9825004,11.7404987 18.9015,12.0015 C18.8204996,12.2625013 18.6900009,12.4829991 18.51,12.663 C18.3299991,12.8430009 18.0780016,12.933 17.754,12.933 C17.4299984,12.933 17.1780009,12.8430009 16.998,12.663 C16.8179991,12.4829991 16.6875004,12.2625013 16.6065,12.0015 C16.5254996,11.7404987 16.4775001,11.4615015 16.4625,11.1645 C16.4474999,10.8674985 16.44,10.5990012 16.44,10.359 L16.44,10.359 Z M15.63,10.368 C15.63,10.6020012 15.6359999,10.8449987 15.648,11.097 C15.6600001,11.3490013 15.6899998,11.5949988 15.738,11.835 C15.7860002,12.0750012 15.8549996,12.3014989 15.945,12.5145 C16.0350005,12.7275011 16.1579992,12.9149992 16.314,13.077 C16.4700008,13.2390008 16.6664988,13.3664995 16.9035,13.4595 C17.1405012,13.5525005 17.4239984,13.599 17.754,13.599 C18.0900017,13.599 18.3749988,13.5525005 18.609,13.4595 C18.8430012,13.3664995 19.0379992,13.2390008 19.194,13.077 C19.3500008,12.9149992 19.4729996,12.7275011 19.563,12.5145 C19.6530005,12.3014989 19.7219998,12.0750012 19.77,11.835 C19.8180002,11.5949988 19.8479999,11.3490013 19.86,11.097 C19.8720001,10.8449987 19.878,10.6020012 19.878,10.368 C19.878,10.1339988 19.8720001,9.89100126 19.86,9.639 C19.8479999,9.38699874 19.8180002,9.1410012 19.77,8.901 C19.7219998,8.6609988 19.6530005,8.43300108 19.563,8.217 C19.4729996,8.00099892 19.3500008,7.81200081 19.194,7.65 C19.0379992,7.48799919 18.8415012,7.35900048 18.6045,7.263 C18.3674988,7.16699952 18.0840017,7.119 17.754,7.119 C17.4239984,7.119 17.1405012,7.16699952 16.9035,7.263 C16.6664988,7.35900048 16.4700008,7.48799919 16.314,7.65 C16.1579992,7.81200081 16.0350005,8.00099892 15.945,8.217 C15.8549996,8.43300108 15.7860002,8.6609988 15.738,8.901 C15.6899998,9.1410012 15.6600001,9.38699874 15.648,9.639 C15.6359999,9.89100126 15.63,10.1339988 15.63,10.368 L15.63,10.368 Z' id='280' stroke='none' fill='#FFFFFF' fill-rule='evenodd' mask='url(#mask-9)'></path> </g> </g> </g> </g> </g> </g> </svg>",
  news_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>News</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#FC5363' offset='0%'></stop> <stop stop-color='#FC3359' offset='100%'></stop> </linearGradient> <path d='M10.136624,47.3823853 C11,47.3823853 11,46.5 11,46.5 L11,12.0052617 C11,11.450071 11.4532303,11 11.9968754,11 L48.0031246,11 C48.5536837,11 49,11.4413032 49,12.0088498 L49,46.9911502 C49,47.5483226 48.543925,48.0029034 47.9964076,48.0062782 C47.9964076,48.0062782 18.6084831,48.1997544 11.0000001,48 C10.1174113,47.9768284 9.41662598,47.668457 9.05755615,47.3823853 C8.69848633,47.0963135 8.36309815,46.7116462 8.36309814,46.6607056 C8.36309814,46.457472 9.27324796,47.3823853 10.136624,47.3823853 Z' id='path-2'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-4'> <feOffset dx='-1' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -115.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='News' transform='translate(244.000000, 88.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <path d='M8,45.9165262 L8,16.9953764 C8,16.4456452 8.45526288,16 8.99545703,16 L32.004543,16 C32.5543187,16 33,16.4523621 33,16.9927864 L33,47.0072136 C33,47.5555144 32.5447371,48 32.004543,48 L10.9907522,48 C9.33900538,48 8,46.6569475 8,45.9165262 L8,45.9165262 Z' id='Fold' fill='#FFFFFF'></path> <mask id='mask-3' fill='white'> <use xlink:href='#path-2'></use> </mask> <g id='Mask'> <use fill='black' fill-opacity='1' filter='url(#filter-4)' xlink:href='#path-2'></use> <use fill='#FFFFFF' fill-rule='evenodd' xlink:href='#path-2'></use> </g> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='35' width='33' height='2' rx='1'></rect> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='39' width='33' height='2' rx='1'></rect> <rect id='lines' fill='#BDBDBD' mask='url(#mask-3)' x='17' y='43' width='33' height='2' rx='1'></rect> <path d='M16,20.1213203 L16,16.9976567 C16,16.4466661 16.4410535,16 16.9976567,16 L20.1213203,16 L20,16.1213203 L31,27.1213203 L31,30.0011436 C31,30.5527968 30.5550661,31 30.0011436,31 L27.1213203,31 L16.1213203,20 L16,20.1213203 L16,20.1213203 Z M16,29.9997809 C16,30.5521867 16.4513294,31 17.0002191,31 L21.8784606,31 C22.4308663,31 22.5652427,30.6865631 22.1684484,30.2897688 L16.7102312,24.8315516 C16.3179814,24.4393017 16,24.5726497 16,25.1215394 L16,29.9997809 Z M29.9997809,16 C30.5521867,16 31,16.4513294 31,17.0002191 L31,21.8784606 C31,22.4308663 30.6873855,22.5660652 30.2956989,22.1743785 L29.5913977,21.4700774 L24.825239,16.7039186 C24.4364754,16.3151551 24.5726497,16 25.1215394,16 L29.9997809,16 Z' id='Logo' fill='#FD4C61' mask='url(#mask-3)'></path> </g> </g> </g> </g> </svg>",
  wallet_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Wallet</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#1E1E1F' offset='0%'></stop> <stop stop-color='#1E1E1F' offset='100%'></stop> </linearGradient> <rect id='path-2' x='9' y='15' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-3'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-4' x='9' y='18' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-6' x='9' y='21' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <rect id='path-8' x='9' y='25' width='42' height='13' rx='2'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-9'> <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <path d='M7,28 L7,42 L53,42 L53,28 L38.9065073,28 C37.7983339,28 36.3057558,28.6722229 35.5501237,29.4784882 C35.5501237,29.4784882 32.4189579,33.3076923 30,33.3076923 C27.5810421,33.3076923 24.4498763,29.4784882 24.4498763,29.4784882 C23.7043702,28.6619417 22.2114781,28 21.0934927,28 L7,28 Z' id='path-10'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-11'> <feOffset dx='0' dy='-1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-16.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Wallet' transform='translate(16.000000, 176.000000)'> <rect id='BG' fill='url(#linearGradient-1)' x='0' y='0' width='60' height='60' rx='14'></rect> <rect id='wallet' fill='#D9D6CC' x='7' y='12' width='46' height='34' rx='4'></rect> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-3)' xlink:href='#path-2'></use> <use fill='#3B99C9' fill-rule='evenodd' xlink:href='#path-2'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-4'></use> <use fill='#FFB003' fill-rule='evenodd' xlink:href='#path-4'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-6'></use> <use fill='#50BE3D' fill-rule='evenodd' xlink:href='#path-6'></use> </g> <g id='cards'> <use fill='black' fill-opacity='1' filter='url(#filter-9)' xlink:href='#path-8'></use> <use fill='#F16C5E' fill-rule='evenodd' xlink:href='#path-8'></use> </g> <g id='Combined-Shape'> <use fill='black' fill-opacity='1' filter='url(#filter-11)' xlink:href='#path-10'></use> <use fill='#D9D6CC' fill-rule='evenodd' xlink:href='#path-10'></use> </g> </g> </g> </g> </g> </svg>",
  notes_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Notes</title> <desc>Created with Sketch.</desc> <defs> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-1'> <stop stop-color='#F8F8F8' offset='0%'></stop> <stop stop-color='#EDEDED' offset='100%'></stop> </linearGradient> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-2'></path> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-4'> <stop stop-color='#FFDF63' offset='0%'></stop> <stop stop-color='#FFCD02' offset='100%'></stop> </linearGradient> <rect id='path-5' x='0' y='-1' width='60' height='20'></rect> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-6'> <feOffset dx='0' dy='0.5' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='0.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0' type='matrix' in='shadowBlurOuter1'></feColorMatrix> </filter> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-7'> <feOffset dx='0' dy='-0.5' in='SourceAlpha' result='shadowOffsetInner1'></feOffset> <feComposite in='shadowOffsetInner1' in2='SourceAlpha' operator='arithmetic' k2='-1' k3='1' result='shadowInnerInner1'></feComposite> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0' type='matrix' in='shadowInnerInner1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-92.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Notes' transform='translate(92.000000, 176.000000)'> <mask id='mask-3' fill='white'> <use xlink:href='#path-2'></use> </mask> <use id='BG' fill='url(#linearGradient-1)' xlink:href='#path-2'></use> <g id='header' mask='url(#mask-3)'> <use fill='black' fill-opacity='1' filter='url(#filter-6)' xlink:href='#path-5'></use> <use fill='url(#linearGradient-4)' fill-rule='evenodd' xlink:href='#path-5'></use> <use fill='black' fill-opacity='1' filter='url(#filter-7)' xlink:href='#path-5'></use> </g> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 30.5 60 30.5 60 30 59.75 30 -0.25 30 -0.5 30 -0.5 30.5 -0.25 30.5'></polygon> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 41.5 60 41.5 60 41 59.75 41 -0.25 41 -0.5 41 -0.5 41.5 -0.25 41.5'></polygon> <polygon id='line' fill='#B7B7B7' mask='url(#mask-3)' points='59.75 53 60 53 60 52.5 59.75 52.5 -0.25 52.5 -0.5 52.5 -0.5 53 -0.25 53'></polygon> <path d='M58.5,22 L59.5,22 L59.5,23 L58.5,23 L58.5,22 L58.5,22 Z M56.5,22 L57.5,22 L57.5,23 L56.5,23 L56.5,22 L56.5,22 Z M54.5,22 L55.5,22 L55.5,23 L54.5,23 L54.5,22 L54.5,22 Z M52.5,22 L53.5,22 L53.5,23 L52.5,23 L52.5,22 L52.5,22 Z M50.5,22 L51.5,22 L51.5,23 L50.5,23 L50.5,22 L50.5,22 Z M48.5,22 L49.5,22 L49.5,23 L48.5,23 L48.5,22 L48.5,22 Z M46.5,22 L47.5,22 L47.5,23 L46.5,23 L46.5,22 L46.5,22 Z M44.5,22 L45.5,22 L45.5,23 L44.5,23 L44.5,22 L44.5,22 Z M42.5,22 L43.5,22 L43.5,23 L42.5,23 L42.5,22 L42.5,22 Z M40.5,22 L41.5,22 L41.5,23 L40.5,23 L40.5,22 L40.5,22 Z M38.5,22 L39.5,22 L39.5,23 L38.5,23 L38.5,22 L38.5,22 Z M36.5,22 L37.5,22 L37.5,23 L36.5,23 L36.5,22 L36.5,22 Z M34.5,22 L35.5,22 L35.5,23 L34.5,23 L34.5,22 L34.5,22 Z M32.5,22 L33.5,22 L33.5,23 L32.5,23 L32.5,22 L32.5,22 Z M30.5,22 L31.5,22 L31.5,23 L30.5,23 L30.5,22 L30.5,22 Z M28.5,22 L29.5,22 L29.5,23 L28.5,23 L28.5,22 L28.5,22 Z M26.5,22 L27.5,22 L27.5,23 L26.5,23 L26.5,22 L26.5,22 Z M24.5,22 L25.5,22 L25.5,23 L24.5,23 L24.5,22 L24.5,22 Z M22.5,22 L23.5,22 L23.5,23 L22.5,23 L22.5,22 L22.5,22 Z M20.5,22 L21.5,22 L21.5,23 L20.5,23 L20.5,22 L20.5,22 Z M18.5,22 L19.5,22 L19.5,23 L18.5,23 L18.5,22 L18.5,22 Z M16.5,22 L17.5,22 L17.5,23 L16.5,23 L16.5,22 L16.5,22 Z M14.5,22 L15.5,22 L15.5,23 L14.5,23 L14.5,22 L14.5,22 Z M12.5,22 L13.5,22 L13.5,23 L12.5,23 L12.5,22 L12.5,22 Z M10.5,22 L11.5,22 L11.5,23 L10.5,23 L10.5,22 L10.5,22 Z M8.5,22 L9.5,22 L9.5,23 L8.5,23 L8.5,22 L8.5,22 Z M6.5,22 L7.5,22 L7.5,23 L6.5,23 L6.5,22 L6.5,22 Z M4.5,22 L5.5,22 L5.5,23 L4.5,23 L4.5,22 L4.5,22 Z M2.5,22 L3.5,22 L3.5,23 L2.5,23 L2.5,22 L2.5,22 Z M0.5,22 L1.5,22 L1.5,23 L0.5,23 L0.5,22 L0.5,22 Z' id='Rectangle-37' fill='#AAAAAA' mask='url(#mask-3)'></path> </g> </g> </g> </g> </svg>",
  reminders_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>min</title> <desc>Created with Sketch.</desc> <defs> <rect id='path-1' x='0' y='0' width='60' height='60' rx='14'></rect> <circle id='path-3' cx='10' cy='12' r='4'></circle> <mask id='mask-4' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-3'></use> </mask> <mask id='mask-5' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='7.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-3' fill='black'></use> </mask> <circle id='path-6' cx='10' cy='23' r='4'></circle> <mask id='mask-7' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-6'></use> </mask> <mask id='mask-8' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='18.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-6' fill='black'></use> </mask> <circle id='path-9' cx='10' cy='35' r='4'></circle> <mask id='mask-10' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-9'></use> </mask> <mask id='mask-11' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='30.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-9' fill='black'></use> </mask> <circle id='path-12' cx='10' cy='46' r='4'></circle> <mask id='mask-13' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='8' height='8' fill='white'> <use xlink:href='#path-12'></use> </mask> <mask id='mask-14' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='-0.5' y='-0.5' width='9' height='9'> <rect x='5.5' y='41.5' width='9' height='9' fill='white'></rect> <use xlink:href='#path-12' fill='black'></use> </mask> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-168.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='min' transform='translate(168.000000, 176.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#FFFFFF' xlink:href='#path-1'></use> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-4)' fill='#FF9500' fill-rule='evenodd' xlink:href='#path-3'></use> <use stroke='#FF9500' mask='url(#mask-5)' xlink:href='#path-3'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-7)' fill='#1BADF8' fill-rule='evenodd' xlink:href='#path-6'></use> <use stroke='#1BADF8' mask='url(#mask-8)' xlink:href='#path-6'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-10)' fill='#63DA38' fill-rule='evenodd' xlink:href='#path-9'></use> <use stroke='#63DA38' mask='url(#mask-11)' xlink:href='#path-9'></use> </g> <g id='circle' mask='url(#mask-2)'> <use stroke='#FFFFFF' mask='url(#mask-13)' fill='#CC73E1' fill-rule='evenodd' xlink:href='#path-12'></use> <use stroke='#CC73E1' mask='url(#mask-14)' xlink:href='#path-12'></use> </g> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='17.5' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='6' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='29' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='40' width='41' height='0.5'></rect> <rect id='line' fill='#AEAEAE' mask='url(#mask-2)' x='19' y='51.5' width='41' height='0.5'></rect> </g> </g> </g> </g> </svg>",
  stocks_app: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='60px' height='60px' viewBox='0 0 60 60' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>Stocks</title> <desc>Created with Sketch.</desc> <defs> <path d='M39.0815,0 C45.105,0 48.116,0 51.3585,1.025 C54.8985,2.3135 57.6865,5.1015 58.975,8.6415 C60,11.8835 60,14.8955 60,20.9185 L60,39.0815 C60,45.105 60,48.116 58.975,51.3585 C57.6865,54.8985 54.8985,57.6865 51.3585,58.9745 C48.116,60 45.105,60 39.0815,60 L20.9185,60 C14.895,60 11.8835,60 8.6415,58.9745 C5.1015,57.6865 2.3135,54.8985 1.025,51.3585 C0,48.116 0,45.105 0,39.0815 L0,20.9185 C0,14.8955 0,11.8835 1.025,8.6415 C2.3135,5.1015 5.1015,2.3135 8.6415,1.025 C11.8835,0 14.895,0 20.9185,0 L39.0815,0 Z' id='path-1'></path> <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='linearGradient-3'> <stop stop-color='#454545' offset='0%'></stop> <stop stop-color='#111112' offset='100%'></stop> </linearGradient> <path d='M41.5,16.0112108 L41.5,-1.5 L41,-1.5 L41,16.0112108 C41.0823405,16.0037907 41.1657276,16 41.25,16 C41.3342724,16 41.4176595,16.0037907 41.5,16.0112108 Z M41.5,21.4887892 L41.5,63 L41,63 L41,21.4887892 C41.0823405,21.4962093 41.1657276,21.5 41.25,21.5 C41.3342724,21.5 41.4176595,21.4962093 41.5,21.4887892 Z M41.25,21 C42.4926407,21 43.5,19.9926407 43.5,18.75 C43.5,17.5073593 42.4926407,16.5 41.25,16.5 C40.0073593,16.5 39,17.5073593 39,18.75 C39,19.9926407 40.0073593,21 41.25,21 Z' id='path-4'></path> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-5'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowOffsetOuter1'></feColorMatrix> </filter> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Home-Screen-•-iPhone-SE' transform='translate(-244.000000, -203.000000)'> <g id='Home-Screen-•-iPhone-6s-Copy' transform='translate(0.000000, 27.000000)'> <g id='Stocks' transform='translate(244.000000, 176.000000)'> <mask id='mask-2' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='BG' fill='#141416' xlink:href='#path-1'></use> <path d='M-0.484863281,34.0537109 C-0.484863281,34.0537109 1.27239211,34.0644686 3.11938477,34.6320801 C4.70794495,35.120271 6.30098176,36.2523786 7.23388672,36.1945801 C9.25146484,36.0695801 11.3344727,35.3759766 11.3344727,35.3759766 L15.1208496,30.4450684 L18.7275391,33.5263672 L22.4941406,24.6245117 L26.1196289,34.3369141 L30.25,36.8659668 L33.9467773,30.2084961 L37.5385742,29.276123 L41.4316406,18.1323242 L45.1474609,27.2033691 L48.9438477,24.6655273 L52.7734375,31.9936523 L56.3422852,23.8173828 L60.3457031,19.65625 L60.3457031,60.4791166 L-0.304989325,60.4791166 L-0.484863281,34.0537109 Z' id='graph' stroke='#FFFFFF' stroke-width='0.75' fill='url(#linearGradient-3)' mask='url(#mask-2)'></path> <g id='mark' mask='url(#mask-2)'> <use fill='black' fill-opacity='1' filter='url(#filter-5)' xlink:href='#path-4'></use> <use fill='#01A6F1' fill-rule='evenodd' xlink:href='#path-4'></use> </g> <g id='Spark-line' mask='url(#mask-2)' fill='#777778'> <g transform='translate(7.000000, -1.500000)' id='mark'> <rect x='0' y='0' width='0.5' height='64.5'></rect> <rect x='11.5' y='0' width='0.5' height='64.5'></rect> <rect x='23' y='0' width='0.5' height='64.5'></rect> <rect x='45.5' y='0' width='0.5' height='64.5'></rect> </g> </g> </g> </g> </g> </g> </svg>"
};

exports.frames = {
  "fullscreen": {
    height: window.innerHeight,
    width: window.innerWidth,
    scale: 1,
    mobile: false,
    platform: "web"
  },
  "apple-iphone-5s-space-gray": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5s-silver": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5s-gold": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-green": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-blue": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-red": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-white": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-yellow": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-5c-pink": {
    height: 1136,
    width: 640,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-space-gray": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-silver": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-gold": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-rose-gold": {
    height: 1334,
    width: 750,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-gold": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-silver": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-space-gray": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-iphone-6s-plus-rose-gold": {
    height: 2208,
    width: 1242,
    scale: 3,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-gold": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-silver": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-air-2-space-gray": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-gold": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-space-gray": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-mini-4-silver": {
    height: 2048,
    width: 1536,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-gold": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-silver": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  },
  "apple-ipad-pro-space-gray": {
    height: 2732,
    width: 2048,
    scale: 2,
    mobile: true,
    platform: "iOS"
  }
};

exports.framerFrames = {
  640: 2,
  750: 2,
  768: 2,
  1080: 3,
  1242: 3,
  1440: 4,
  1536: 2
};

exports.realDevices = {
  320: {
    480: {
      name: "iphone",
      display_name: "iPhone",
      width: 320,
      height: 480,
      scale: 1
    }
  },
  480: {
    854: {
      name: "Android One",
      width: 480,
      height: 854,
      scale: 1.5
    }
  },
  640: {
    960: {
      name: "iphone-5",
      display_name: "iPhone 4",
      width: 640,
      height: 960,
      scale: 2
    },
    1136: {
      name: "iphone-5",
      display_name: "iPhone 5",
      width: 640,
      height: 1136,
      scale: 2
    }
  },
  720: {
    1280: {
      name: "XHDPI",
      width: 720,
      height: 1280,
      scale: 2
    }
  },
  750: {
    1118: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1118,
      scale: 2
    },
    1334: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  768: {
    1024: {
      name: "ipad",
      display_name: "iPad",
      width: 768,
      height: 1024,
      scale: 1
    },
    1280: {
      name: "Nexus 4",
      width: 768,
      height: 1280,
      scale: 2
    }
  },
  800: {
    1280: {
      name: "Nexus 7",
      width: 800,
      height: 1280,
      scale: 1
    }
  },
  1080: {
    1920: {
      name: "XXHDPI",
      width: 1080,
      height: 1920,
      scale: 3
    }
  },
  1200: {
    1920: {
      name: "Nexus 7",
      width: 1200,
      height: 1920,
      scale: 2
    }
  },
  1242: {
    2208: {
      name: "iphone-6s-plus",
      display_name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  1334: {
    750: {
      name: "iphone-6s",
      display_name: "iPhone 6s",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  1440: {
    2560: {
      name: "XXXHDPI",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1441: {
    2561: {
      name: "Nexus 6",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1536: {
    2048: {
      name: "ipad",
      display_name: "iPad",
      width: 1536,
      height: 2048,
      scale: 2
    }
  },
  1600: {
    2056: {
      name: "Nexus 10",
      width: 1600,
      height: 2056,
      scale: 2
    }
  },
  2208: {
    1242: {
      name: "iphone-6s-plus",
      display_name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  2048: {
    1536: {
      name: "Nexus 9",
      width: 2048,
      height: 1536,
      scale: 2
    },
    2732: {
      name: "ipad-pro",
      display_name: "iPad Pro",
      width: 2048,
      height: 2732,
      scale: 2
    }
  },
  2560: {
    1600: {
      name: "Nexus 10",
      width: 2560,
      height: 1600,
      scale: 2
    }
  },
  2732: {
    2048: {
      name: "ipad-pro",
      display_name: "iPad Pro",
      width: 2732,
      height: 2048,
      scale: 2
    }
  }
};


},{"ios-kit":"ios-kit"}],"ios-kit-nav-bar":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  title: "Title",
  left: void 0,
  right: "Edit",
  blur: true,
  superLayer: void 0,
  type: "navBar",
  color: 'blue',
  titleColor: 'black',
  backgroundColor: "rgba(255, 255, 255, .8)",
  dividerBackgroundColor: "#fff"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var bar, i, layer, len, ref, setLeading, setup, svg;
  setup = ios.utils.setupComponent(array, exports.defaults);
  bar = new ios.View({
    name: "navBar",
    backgroundColor: setup.backgroundColor,
    constraints: {
      leading: 0,
      trailing: 0,
      top: 0,
      height: 64
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    backgroundColor: 'transparent',
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      height: 44,
      bottom: 0
    }
  });
  bar.divider = new ios.View({
    backgroundColor: setup.dividerBackgroundColor,
    name: ".divider",
    superLayer: bar.bg,
    constraints: {
      height: .5,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(bar);
  }
  if (setup.blur) {
    ios.utils.bgBlur(bar);
  }
  if (setup.blur === false && setup.backgroundColor === "rgba(255, 255, 255, .8)") {
    bar.backgroundColor = 'white';
  }
  bar.type = setup.type;
  ref = Framer.CurrentContext.layers;
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.type === "statusBar") {
      this.statusBar = layer;
      bar.placeBehind(this.statusBar);
    }
  }
  if (typeof setup.title === "object") {
    setup.title = setup.title.label.html;
  }
  bar.title = new ios.Text({
    fontWeight: "semibold",
    superLayer: bar.bg,
    text: setup.title,
    name: ".title",
    color: setup.titleColor,
    constraints: {
      align: "horizontal",
      bottom: 12
    }
  });
  ios.utils.specialChar(bar.title);
  if (typeof setup.right === "string" && typeof setup.right !== "boolean") {
    bar.right = new ios.Button({
      name: ".right",
      superLayer: bar.bg,
      text: setup.right,
      color: setup.color,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        trailing: 8
      }
    });
    bar.right.type = "button";
    ios.utils.specialChar(bar.right);
  }
  if (typeof setup.right === "object") {
    bar.right = setup.right;
    bar.right.name = ".right";
    bar.right.superLayer = bar.bg;
    bar.right.constraints = {
      trailing: 8,
      bottom: 12
    };
    ios.layout.set(bar.right);
  }
  if (typeof setup.left === "string" && typeof setup.left !== "boolean") {
    setLeading = 8;
    if (setup.left.indexOf("<") !== -1) {
      svg = ios.utils.svg(ios.assets.chevron);
      bar.chevron = new ios.View({
        name: ".chevron",
        width: svg.width,
        height: svg.height,
        backgroundColor: "transparent",
        superLayer: bar.bg
      });
      bar.chevron.html = svg.svg;
      bar.chevron.constraints = {
        bottom: 9,
        leading: 8
      };
      setup.left = setup.left.replace("<", "");
      ios.utils.changeFill(bar.chevron, setup.color);
      setLeading = [bar.chevron, 4];
      ios.layout.set(bar.chevron);
    }
    bar.left = new ios.Button({
      name: ".left",
      superLayer: bar.bg,
      text: setup.left,
      color: setup.color,
      fontWeight: 500,
      constraints: {
        bottom: 12,
        leading: setLeading
      }
    });
    bar.left.type = "button";
    ios.utils.specialChar(bar.left);
    bar.left.on(Events.TouchStart, function() {
      if (bar.chevron) {
        return bar.chevron.animate({
          properties: {
            opacity: .25
          },
          time: .5
        });
      }
    });
    bar.left.on(Events.TouchEnd, function() {
      if (bar.chevron) {
        return bar.chevron.animate({
          properties: {
            opacity: 1
          },
          time: .5
        });
      }
    });
  }
  if (typeof setup.left === "object") {
    bar.left = setup.left;
    bar.left.name = ".left";
    bar.left.superLayer = bar.bg;
    bar.left.constraints = {
      leading: 8,
      bottom: 12
    };
  }
  ios.layout.set(bar.left);
  return bar;
};


},{"ios-kit":"ios-kit"}],"ios-kit-sheet":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  actions: ["Reply", "Reply All", "Forward", "Print"],
  exit: "Cancel",
  animated: true,
  description: void 0,
  target: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var a, action, i, j, k, l, len, len1, place, ref, ref1, setup, sheet, sheetTip;
  setup = ios.utils.setupComponent(array, exports.defaults);
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    l = ref[j];
    if (l.type === 'sheet') {
      l.dismiss();
    }
  }
  sheet = new ios.View({
    name: "sheet",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      bottom: 0
    }
  });
  sheet.type = 'sheet';
  sheet.menu = new Layer({
    name: "menu",
    superLayer: sheet,
    backgroundColor: "transparent",
    borderRadius: ios.px(12),
    clip: true
  }, ios.isPad() ? (sheetTip = ios.utils.svg(ios.assets.sheetTip), sheet.tip = new ios.View({
    name: '.tip',
    color: 'black',
    superLayer: sheet,
    html: sheetTip.svg,
    height: sheetTip.height - 4,
    width: sheetTip.width,
    backgroundColor: 'transparent',
    constraints: {
      horizontalCenter: setup.target
    }
  }), sheet.linked = setup.target, sheet.linked.ignoreEvents = true) : void 0);
  place = function(t, l) {
    var centerX, h, w;
    w = ios.device.width;
    h = ios.device.height;
    centerX = w / 2;
    if (w - t.x > centerX) {
      if (t.x - ios.px(150) < 0) {
        l.constraints.leading = 10;
      } else {
        l.constraints.horizontalCenter = t;
      }
    } else {
      if (t.x + ios.px(150) > w) {
        l.constraints.trailing = 10;
      } else {
        l.constraints.horizontalCenter = t;
      }
    }
    if (t.y + l.height < h) {
      l.constraints.top = [t, 40];
      if (ios.isPad()) {
        sheet.tip.constraints.bottom = [l, 1];
      }
    } else {
      l.constraints.bottom = [t, 40];
      if (ios.isPad()) {
        sheet.tip.constraints.top = [l, 1];
        sheet.tip.rotation = 180;
      }
    }
    if (ios.isPad()) {
      return ios.layout.set(sheet.tip);
    }
  };
  sheet.dismiss = function() {
    if (ios.isPhone()) {
      sheet.menu.animate({
        properties: {
          y: ios.device.height
        },
        time: .25
      });
      sheet.cancel.animate({
        properties: {
          y: ios.device.height + ios.px(75)
        },
        time: .25
      });
      sheet.overlay.animate({
        properties: {
          opacity: 0
        },
        time: .25
      });
      return Utils.delay(.25, function() {
        return sheet.destroy();
      });
    } else {
      sheet.linked.ignoreEvents = false;
      return Utils.delay(.15, function() {
        return sheet.destroy();
      });
    }
  };
  sheet.call = function() {
    if (ios.isPhone()) {
      sheet.menu.y = ios.device.height;
      sheet.cancel.y = ios.device.height + ios.px(75);
      sheet.overlay.opacity = 0;
      sheet.overlay.animate({
        properties: {
          opacity: .5
        },
        time: .25
      });
      return ios.layout.animate({
        target: [sheet.menu, sheet.cancel],
        time: .25
      });
    } else {
      place(setup.target, sheet.menu);
      return ios.layout.set(sheet.menu);
    }
  };
  if (ios.device.name.indexOf("ipad") === -1) {
    sheet.overlay = new ios.View({
      name: ".overlay",
      backgroundColor: "black",
      opacity: .5,
      superLayer: sheet,
      constraints: {
        top: 0,
        leading: 0,
        trailing: 0,
        bottom: 0
      }
    });
    sheet.overlay.sendToBack();
    sheet.menu.constraints = {
      leading: 10,
      trailing: 10,
      bottom: 57 + 8 + 10,
      height: setup.actions.length * 57
    };
    sheet.cancel = new ios.Button({
      name: ".cancel",
      type: "big",
      text: setup.exit,
      superLayer: sheet,
      constraints: {
        bottom: 10,
        leading: 0,
        trailing: 0
      }
    });
    sheet.cancel.on(Events.TouchEnd, function() {
      return sheet.dismiss();
    });
  } else {
    sheet.menu.constraints = {
      width: 300,
      height: setup.actions.length * 57
    };
    sheet.menu.props = {
      shadowY: 2,
      shadowBlur: ios.px(100),
      shadowColor: "rgba(0,0,0,0.1)"
    };
  }
  ios.layout.set(sheet);
  sheet.actionsArray = [];
  sheet.actions = {};
  ref1 = setup.actions;
  for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
    a = ref1[i];
    action = new ios.View({
      name: ".actions.[\"" + a.toLowerCase() + "\"]",
      backgroundColor: "rgba(255,255,255,1)",
      superLayer: sheet.menu,
      constraints: {
        leading: 0,
        trailing: 0,
        height: 57
      }
    });
    action.style["-webkit-box-shadow"] = "inset 0 0 " + ios.px(.5) + "px rgba(0,0,0,.25)";
    action.label = new ios.Text({
      text: a,
      color: ios.color("blue"),
      fontSize: 20,
      superLayer: action,
      constraints: {
        align: "center"
      }
    });
    ios.utils.specialChar(action.label);
    if (i === 0) {
      action.constraints.top = 0;
    } else {
      action.constraints.top = sheet.actionsArray[i - 1];
    }
    action.on(Events.TouchStart, function() {
      return this.animate({
        properties: {
          backgroundColor: this.backgroundColor.darken(10),
          time: .2
        }
      });
    });
    action.on(Events.TouchEnd, function() {
      this.animate({
        properties: {
          backgroundColor: "rgba(255,255,255, .8)"
        },
        time: .2
      });
      return sheet.dismiss();
    });
    ios.layout.set(action);
    sheet.actionsArray.push(action);
    sheet.actions[a.toLowerCase()] = action;
  }
  if (setup.animated) {
    sheet.call();
  }
  if (ios.isPad()) {
    sheet.tip.bringToFront();
  }
  return sheet;
};


},{"ios-kit":"ios-kit"}],"ios-kit-status-bar":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  carrier: "",
  network: "LTE",
  battery: 100,
  signal: 5,
  style: "dark",
  clock24: false,
  type: "statusBar",
  superLayer: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var batteryIcon, batteryPercent, bluetooth, bluetoothSVG, carrier, dot, gripper, highBattery, i, j, k, l, layer, len, lowBattery, midBattery, network, networkIcon, noNetwork, nonDot, nonDots, ref, ref1, ref2, setup, signal, statusBar, time;
  setup = ios.utils.setupComponent(array, exports.defaults);
  statusBar = new Layer({
    backgroundColor: "transparent",
    name: "statusBar.all",
    superLayer: setup.superLayer
  });
  statusBar.type = setup.type;
  statusBar.constraints = {
    leading: 0,
    trailing: 0,
    height: 20
  };
  switch (ios.device.name) {
    case "iphone-6s-plus":
      this.topConstraint = 5;
      this.batteryIcon = 5;
      this.bluetooth = 5;
      break;
    case "fullscreen":
      this.topConstraint = 5;
      this.batteryIcon = -12;
      this.bluetooth = -10;
      break;
    default:
      this.topConstraint = 3;
      this.batteryIcon = 2;
      this.bluetooth = 3;
  }
  if (setup.style === "light") {
    this.color = "white";
  } else {
    this.color = "black";
  }
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    layer = ref[j];
    if (layer.type === "lockScreen") {
      this.isLockScreenPutilsent = true;
    }
  }
  if (this.isLockScreenPutilsent) {
    gripper = new Layer({
      superLayer: statusBar,
      width: utils.px(37),
      height: utils.px(5),
      name: "gripper",
      backgroundColor: "transparent",
      opacity: .5,
      name: "gripper"
    });
    gripper.html = "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='" + (utils.px(37)) + "px' height='" + (utils.px(5)) + "px' viewBox='0 0 37 5' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Gripper</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Keyboard/Auto-Complete-Bar-Closed' transform='translate(-169.000000, -2.000000)' fill='#FFFFFF'> <rect id='Gripper' x='169.5' y='2.5' width='36' height='4' rx='2.5'></rect> </g> </g> </svg>";
    gripper.constraints = {
      align: "horizontal",
      top: 2
    };
  } else {
    this.time = ios.utils.getTime();
    if (setup.clock24 === false) {
      if (this.time.hours > 11) {
        this.time.stamp = "PM";
      } else {
        this.time.stamp = "AM";
      }
    } else {
      this.time.stamp = "";
    }
    time = new ios.Text({
      style: "statusBarTime",
      text: ios.utils.timeFormatter(this.time, setup.clock24) + " " + this.time.stamp,
      fontSize: 12,
      fontWeight: "semibold",
      superLayer: statusBar,
      color: this.color,
      name: "time"
    });
    time.constraints = {
      align: "horizontal",
      top: this.topConstraint
    };
  }
  signal = [];
  if (setup.signal < 1) {
    noNetwork = new ios.Text({
      superLayer: statusBar,
      fontSize: 12,
      text: "No Network"
    });
    noNetwork.constraints = {
      leading: 7,
      top: 3
    };
  } else {
    for (i = k = 0, ref1 = setup.signal; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      dot = new Layer({
        height: ios.utils.px(5.5),
        width: ios.utils.px(5.5),
        backgroundColor: "black",
        superLayer: statusBar,
        borderRadius: ios.utils.px(5.5) / 2,
        backgroundColor: this.color,
        name: "signal[" + i + "]"
      });
      if (i === 0) {
        dot.constraints = {
          leading: 7,
          top: 7
        };
      } else {
        dot.constraints = {
          leading: [signal[i - 1], 1],
          top: 7
        };
      }
      signal.push(dot);
      ios.layout.set();
    }
    if (setup.signal < 5) {
      nonDots = 5 - setup.signal;
      for (i = l = 0, ref2 = nonDots; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
        nonDot = new Layer({
          height: ios.utils.px(5.5),
          width: ios.utils.px(5.5),
          superLayer: statusBar,
          borderRadius: ios.utils.px(5.5) / 2,
          backgroundColor: "transparent",
          name: "signal[" + signal.length + "]"
        });
        nonDot.style.border = (ios.utils.px(1)) + "px solid " + this.color;
        nonDot.constraints = {
          leading: [signal[signal.length - 1], 1],
          top: 7
        };
        signal.push(nonDot);
        ios.layout.set();
      }
    }
    carrier = new ios.Text({
      style: "statusBarCarrier",
      text: setup.carrier,
      superLayer: statusBar,
      fontSize: 12,
      color: this.color,
      name: "carrier",
      textTransform: "capitalize"
    });
    carrier.constraints = {
      leading: [signal[signal.length - 1], 7],
      top: 3
    };
    ios.layout.set();
    if (setup.carrier) {
      network = new ios.Text({
        style: "statusBarNetwork",
        text: setup.network,
        superLayer: statusBar,
        fontSize: 12,
        color: this.color,
        name: "network",
        textTransform: "uppercase"
      });
      network.constraints = {
        leading: [carrier, 5],
        top: 3
      };
    }
    if (setup.carrier === "" || setup.carrier === "wifi") {
      networkIcon = ios.utils.svg(ios.assets.network, this.color);
      network = new Layer({
        width: networkIcon.width,
        height: networkIcon.height,
        superLayer: statusBar,
        backgroundColor: "transparent",
        name: "network"
      });
      network.html = networkIcon.svg;
      ios.utils.changeFill(network, this.color);
      network.constraints = {
        leading: [signal[signal.length - 1], 5],
        top: this.topConstraint
      };
    }
  }
  batteryIcon = new Layer({
    width: ios.utils.px(25),
    height: ios.utils.px(10),
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "batteryIcon"
  });
  if (setup.battery > 70) {
    highBattery = ios.utils.svg(ios.assets.batteryHigh);
    batteryIcon.html = highBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  if (setup.battery <= 70 && setup.battery > 20) {
    midBattery = ios.utils.svg(ios.assets.batteryMid);
    batteryIcon.html = midBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  if (setup.battery <= 20) {
    lowBattery = ios.utils.svg(ios.assets.batteryLow);
    batteryIcon.html = lowBattery.svg;
    ios.utils.changeFill(batteryIcon, this.color);
  }
  batteryIcon.constraints = {
    trailing: 7,
    top: this.batteryIcon
  };
  batteryPercent = new ios.Text({
    style: "statusBarBatteryPercent",
    text: setup.battery + "%",
    superLayer: statusBar,
    fontSize: 12,
    color: this.color,
    name: "batteryPercent"
  });
  batteryPercent.constraints = {
    trailing: [batteryIcon, 3],
    verticalCenter: time
  };
  bluetoothSVG = ios.utils.svg(ios.assets.bluetooth);
  bluetooth = new Layer({
    width: bluetoothSVG.width,
    height: bluetoothSVG.height,
    superLayer: statusBar,
    opacity: .5,
    backgroundColor: "transparent",
    name: "bluetooth"
  });
  bluetooth.html = bluetoothSVG.svg;
  ios.utils.changeFill(bluetooth, this.color);
  bluetooth.constraints = {
    top: this.bluetooth,
    trailing: [batteryPercent, 7]
  };
  ios.layout.set();
  statusBar.battery = {};
  statusBar.battery.percent = batteryPercent;
  statusBar.battery.icon = batteryIcon;
  statusBar.bluetooth = bluetooth;
  statusBar.time = time;
  statusBar.network = network;
  statusBar.carrier = carrier;
  statusBar.signal = signal;
  return statusBar;
};


},{"ios-kit":"ios-kit"}],"ios-kit-tab-bar":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  tab: {
    label: "label",
    icon: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='25px' height='25px' viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>1</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='1'> <g id='Bottom-Bar/Tab-Bar' transform='translate(-25.000000, -7.000000)' fill='#0076FF'> <g id='Placeholders' transform='translate(25.000000, 7.000000)'> <rect id='1' x='0' y='0' width='25' height='25' rx='3'></rect> </g> </g> </g> </svg>",
    active: void 0,
    inactive: void 0,
    tabBar: void 0,
    type: "tab"
  },
  bar: {
    tabs: [],
    start: 0,
    type: "tabBar",
    backgroundColor: "white",
    activeColor: "blue",
    inactiveColor: "gray",
    blur: true
  }
};

exports.defaults.tab.props = Object.keys(exports.defaults.tab);

exports.defaults.bar.props = Object.keys(exports.defaults.bar);

exports.tab = function(array) {
  var setup, specs, svgFrame, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.tab);
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  tab = new ios.View({
    backgroundColor: "transparent",
    name: setup.label,
    constraints: {
      width: specs.width,
      height: 49
    }
  });
  tab.view = new ios.View({
    name: setup.label + ".view",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    }
  });
  tab.active = new ios.View({
    name: ".active",
    backgroundColor: "transparent",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.active.icon = new ios.View({
    name: ".active.icon",
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    superLayer: tab.active
  });
  if (setup.active === void 0) {
    svgFrame = ios.utils.svg(setup.icon);
    tab.active.icon.html = svgFrame.svg;
    tab.active.icon.width = svgFrame.width;
    tab.active.icon.height = svgFrame.height;
  } else {
    setup.active.superLayer = tab.active.icon;
    setup.active.props = {
      width: tab.active.icon.width,
      height: tab.active.icon.height
    };
  }
  tab.inactive = new ios.View({
    backgroundColor: "transparent",
    name: ".inactive",
    constraints: {
      top: 0,
      bottom: 0,
      leading: 0,
      trailing: 0
    },
    superLayer: tab
  });
  tab.inactive.icon = new ios.View({
    constraints: {
      width: 25,
      height: 25,
      align: "horizontal",
      top: 7
    },
    backgroundColor: "transparent",
    name: ".inactive.icon",
    superLayer: tab.inactive
  });
  tab.label = new ios.Text({
    text: setup.label,
    superLayer: tab,
    color: "#929292",
    fontSize: 10,
    name: ".label",
    textTransform: "capitalize"
  });
  tab.label.constraints = {
    bottom: 2,
    horizontalCenter: tab.active.icon
  };
  if (setup.inactive === void 0) {
    svgFrame = ios.utils.svg(setup.icon);
    tab.inactive.icon.html = svgFrame.svg;
    tab.inactive.icon.width = svgFrame.width;
    tab.inactive.icon.height = svgFrame.height;
  } else {
    setup.inactive.superLayer = tab.inactive.icon;
    setup.inactive.props = {
      width: tab.inactive.icon.width,
      height: tab.inactive.icon.height
    };
  }
  return tab;
};

exports.bar = function(array) {
  var bar, dummyTab, dummyTab2, i, index, len, ref, setActive, setup, specs, tab;
  setup = ios.utils.setupComponent(array, exports.defaults.bar);
  if (setup.tabs.length === 0) {
    dummyTab = new exports.tab;
    dummyTab2 = new exports.tab;
    setup.tabs.push(dummyTab);
    setup.tabs.push(dummyTab2);
  }
  specs = {
    width: 75
  };
  switch (ios.device.name) {
    case "iphone-5":
      specs.width = 55;
  }
  bar = new ios.View({
    backgroundColor: "transparent",
    name: "tabBar",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 49
    }
  });
  bar.bg = new ios.View({
    superLayer: bar,
    name: ".bg",
    constraints: {
      leading: 0,
      trailing: 0,
      bottom: 0,
      height: 49
    }
  });
  bar.divider = new ios.View({
    backgroundColor: "#B2B2B2",
    name: ".divider",
    superLayer: bar,
    constraints: {
      top: 0,
      leading: 0,
      trailing: 0,
      height: .5
    }
  });
  bar.box = new ios.View({
    superLayer: bar,
    backgroundColor: "transparent",
    name: ".box",
    constraints: {
      height: 49,
      width: setup.tabs.length * specs.width
    }
  });
  setActive = function(tabIndex) {
    var i, index, len, ref, results, tab;
    ref = setup.tabs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      tab = ref[index];
      if (index === tabIndex) {
        tab.label.color = ios.utils.color(setup.activeColor);
        tab.active.visible = true;
        tab.inactive.visible = false;
        results.push(tab.view.visible = true);
      } else {
        tab.label.color = ios.utils.color(setup.inactiveColor);
        tab.active.visible = false;
        tab.inactive.visible = true;
        results.push(tab.view.visible = false);
      }
    }
    return results;
  };
  ref = setup.tabs;
  for (index = i = 0, len = ref.length; i < len; index = ++i) {
    tab = ref[index];
    bar.box.addSubLayer(tab);
    ios.utils.changeFill(tab.active.icon, ios.utils.color(setup.activeColor));
    ios.utils.changeFill(tab.inactive.icon, ios.utils.color(setup.inactiveColor));
    tab.label.color = ios.utils.color(setup.inactiveColor);
    bar.bg.backgroundColor = setup.backgroundColor;
    if (setup.blur) {
      bar.bg.backgroundColor = "rgba(255,255,255, .9)";
      ios.utils.bgBlur(bar.bg);
    }
    if (index === 0) {
      tab.constraints.leading = 0;
    } else {
      tab.constraints.leading = setup.tabs[index - 1];
    }
    ios.layout.set(tab);
    tab.on(Events.TouchStart, function() {
      var tabIndex;
      tabIndex = this.x / ios.utils.px(specs.width);
      return setActive(tabIndex);
    });
  }
  bar.box.constraints = {
    align: "horizontal"
  };
  ios.layout.set(bar.box);
  setActive(setup.start);
  bar.tabs = setup.tabs;
  return bar;
};


},{"ios-kit":"ios-kit"}],"ios-kit-temp":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  key: "value"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var setup;
  setup = ios.utils.setupComponent(array, exports.defaults);
};


},{"ios-kit":"ios-kit"}],"ios-kit-text":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.defaults = {
  editable: true,
  constraints: void 0,
  text: "iOS Text Layer",
  type: "text",
  x: 0,
  y: 0,
  width: -1,
  height: -1,
  superLayer: void 0,
  style: "default",
  lines: 1,
  textAlign: "left",
  backgroundColor: "transparent",
  color: "black",
  fontSize: 17,
  fontFamily: "-apple-system, Helvetica, Arial, sans-serif",
  fontWeight: "regular",
  lineHeight: "auto",
  name: "text layer",
  opacity: 1,
  textTransform: "none",
  letterSpacing: 0,
  name: "text layer",
  selectable: true,
  selectColor: "rgba(0, 118, 255, .2)",
  selectControls: "#0076FF"
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var exceptions, i, j, len, len1, prop, ref, ref1, setup, textFrame, textLayer;
  setup = ios.utils.setupComponent(array, exports.defaults);
  exceptions = Object.keys(setup);
  textLayer = new ios.View({
    backgroundColor: "transparent",
    name: setup.name,
    superLayer: setup.superLayer,
    constraints: setup.constraints
  });
  textLayer.type = "text";
  textLayer.html = setup.text;
  ref = ios.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (setup[prop]) {
      if (prop === "color") {
        setup[prop] = ios.utils.color(setup[prop]);
      }
      textLayer[prop] = setup[prop];
    }
  }
  ref1 = ios.lib.layerStyles;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    prop = ref1[j];
    if (setup[prop]) {
      if (prop === "lineHeight" && setup[prop] === "auto") {
        textLayer.style.lineHeight = setup.fontSize;
      }
      if (prop === "fontWeight") {
        switch (setup[prop]) {
          case "ultrathin":
            setup[prop] = 100;
            break;
          case "thin":
            setup[prop] = 200;
            break;
          case "light":
            setup[prop] = 300;
            break;
          case "regular":
            setup[prop] = 400;
            break;
          case "medium":
            setup[prop] = 500;
            break;
          case "semibold":
            setup[prop] = 600;
            break;
          case "bold":
            setup[prop] = 700;
            break;
          case "black":
            setup[prop] = 800;
        }
      }
      if (prop === "fontSize" || prop === "lineHeight" || prop === "letterSpacing") {
        setup[prop] = ios.utils.px(setup[prop]) + "px";
      }
      textLayer.style[prop] = setup[prop];
    }
  }
  textFrame = ios.utils.textAutoSize(textLayer);
  textLayer.props = {
    height: textFrame.height,
    width: textFrame.width
  };
  if (setup.editable) {
    textLayer.on("change:html", function() {
      textFrame = ios.utils.textAutoSize(textLayer);
      return textLayer.props = {
        height: textFrame.height,
        width: textFrame.width
      };
    });
  }
  ios.layout.set({
    target: textLayer
  });
  return textLayer;
};


},{"ios-kit":"ios-kit"}],"ios-kit-utils":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.pt = function(px) {
  var pt;
  pt = px / ios.device.scale;
  pt = Math.round(pt);
  return pt;
};

exports.px = function(pt) {
  var px;
  px = pt * ios.device.scale;
  px = Math.round(px);
  return px;
};

exports.color = function(colorString) {
  var color;
  color = "";
  if (typeof colorString === "string") {
    colorString = colorString.toLowerCase();
    if (colorString.slice(0, 4) === "rgba") {
      return colorString;
    }
  }
  switch (colorString) {
    case "red":
      color = new Color("#FE3824");
      break;
    case "blue":
      color = new Color("#0076FF");
      break;
    case "pink":
      color = new Color("#FE2851");
      break;
    case "grey":
      color = new Color("#929292");
      break;
    case "gray":
      color = new Color("#929292");
      break;
    case "black":
      color = new Color("#030303");
      break;
    case "white":
      color = new Color("#EFEFF4");
      break;
    case "orange":
      color = new Color("#FF9600");
      break;
    case "green":
      color = new Color("#44DB5E");
      break;
    case "light blue":
      color = new Color("#54C7FC");
      break;
    case "light-blue":
      color = new Color("#54C7FC");
      break;
    case "yellow":
      color = new Color("#FFCD00");
      break;
    case "light key":
      color = new Color("#9DA7B3");
      break;
    case "light-key":
      color = new Color("#9DA7B3");
      break;
    default:
      if (colorString[0] === "#" || colorString.toHexString()[0] === "#") {
        color = new Color(colorString);
      } else {
        color = new Color("#929292");
      }
  }
  return color;
};

exports.clean = function(string) {
  string = string.replace(/[&]nbsp[;]/gi, " ").replace(/[<]br[>]/gi, "");
  return string;
};

exports.svg = function(svg) {
  var endIndex, hEndIndex, hStartIndex, height, heightString, newHeight, newString, newWidth, startIndex, string, wEndIndex, wStartIndex, width;
  startIndex = svg.search("<svg width=");
  endIndex = svg.search(" viewBox");
  string = svg.slice(startIndex, endIndex);
  wStartIndex = string.search("=") + 2;
  wEndIndex = string.search("px");
  width = string.slice(wStartIndex, wEndIndex);
  newWidth = exports.px(width);
  heightString = string.slice(wEndIndex + 4, string.length);
  hStartIndex = heightString.search("=") + 2;
  hEndIndex = heightString.search("px");
  height = heightString.slice(hStartIndex, hEndIndex);
  newHeight = exports.px(height);
  newString = string.replace(width, newWidth);
  newString = newString.replace(height, newHeight);
  svg = svg.replace(string, newString);
  return {
    svg: svg,
    width: newWidth,
    height: newHeight
  };
};

exports.changeFill = function(layer, color) {
  var endIndex, fillString, newString, startIndex, string;
  startIndex = layer.html.search("fill=\"#");
  fillString = layer.html.slice(startIndex, layer.html.length);
  endIndex = fillString.search("\">");
  string = fillString.slice(0, endIndex);
  newString = "fill=\"" + exports.color(color);
  return layer.html = layer.html.replace(string, newString);
};

exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.getTime = function() {
  var date, dateObj, day, daysOfTheWeek, hours, mins, month, monthsOfTheYear, secs;
  daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateObj = new Date();
  month = monthsOfTheYear[dateObj.getMonth()];
  date = dateObj.getDate();
  day = daysOfTheWeek[dateObj.getDay()];
  hours = dateObj.getHours();
  mins = dateObj.getMinutes();
  secs = dateObj.getSeconds();
  return {
    month: month,
    date: date,
    day: day,
    hours: hours,
    mins: mins,
    secs: secs
  };
};

exports.bgBlur = function(layer) {
  layer.style["-webkit-backdrop-filter"] = "blur(" + (exports.px(5)) + "px)";
  return layer;
};

exports.textAutoSize = function(textLayer) {
  var constraints, styles, textFrame;
  constraints = {};
  if (textLayer.constraints) {
    if (textLayer.constraints.height) {
      constraints.height = exports.px(textLayer.constraints.height);
    }
    if (textLayer.constraints.width) {
      constraints.width = exports.px(textLayer.constraints.width);
    }
  }
  styles = {
    fontSize: textLayer.style.fontSize,
    fontFamily: textLayer.style.fontFamily,
    fontWeight: textLayer.style.fontWeight,
    lineHeight: textLayer.style.lineHeight,
    letterSpacing: textLayer.style.letterSpacing,
    textTransform: textLayer.style.textTransform
  };
  textFrame = Utils.textSize(textLayer.html, styles, constraints);
  return {
    width: textFrame.width,
    height: textFrame.height
  };
};

exports.getDevice = function() {
  var device, frame, nameFormatter;
  nameFormatter = function(name) {
    var j, len, removeTerms, term;
    removeTerms = ["apple-", "-gold", "-silver", "-rose", "-space-gray", "-yellow", "-green", "-red", "-white", "-blue", "-mini", "-air", "-2", "-4"];
    for (j = 0, len = removeTerms.length; j < len; j++) {
      term = removeTerms[j];
      name = name.replace(term, "");
    }
    if (name.indexOf("-5s") !== -1) {
      name = name.replace("-5s", "-5");
    }
    if (name.indexOf("-5c") !== -1) {
      name = name.replace("-5c", "-5");
    }
    return name;
  };
  device = "";
  frame = true;
  if (ios.lib.realDevices[innerWidth] && ios.lib.realDevices[innerWidth][innerHeight]) {
    device = ios.lib.realDevices[innerWidth][innerHeight];
    frame = false;
    Framer.Device.deviceType = "fullscreen";
  }
  if (frame) {
    device = {
      name: nameFormatter(Framer.Device.deviceType),
      display_name: Framer.DeviceView.Devices[Framer.Device.deviceType].display_name,
      width: Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth,
      height: Framer.DeviceView.Devices[Framer.Device.deviceType].screenHeight,
      scale: ios.lib.framerFrames[Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth]
    };
  }
  if (device.scale === void 0) {
    device.scale = 2;
  }
  if (device.width === void 0) {
    device.width = innerWidth;
  }
  if (device.height === void 0) {
    device.height = innerHeight;
  }
  return device;
  exports.scale = ios.lib.frames[device].scale;
  if (device === "fullscreen") {
    exports.width = window.innerWidth;
    exports.height = window.innerHeight;
  } else {
    exports.width = ios.lib.frames[device].width;
    exports.height = ios.lib.frames[device].height;
    if (window.innerWidth === 1242 || window.innerWidth === 2208) {
      exports.width = window.innerWidth;
      exports.height = window.innerHeight;
      exports.scale = 3;
    }
  }
  exports.mobile = ios.lib.frames[device].mobile;
  exports.platform = ios.lib.frames[device].platform;
  exports.orientation = Framer.Device.orientation;
  device = device.replace("apple-", "");
  device = device.replace("-gold", "");
  device = device.replace("-green", "");
  device = device.replace("-blue", "");
  device = device.replace("-red", "");
  device = device.replace("-white", "");
  device = device.replace("-yellow", "");
  device = device.replace("-pink", "");
  device = device.replace("-space-grey", "");
  device = device.replace("-rose", "");
  device = device.replace("5s", "5");
  device = device.replace("5c", "5");
  device = device.replace("-mini", "");
  device = device.replace("-air", "");
  device = device.replace("-2", "");
  device = device.replace("-4", "");
  device = device.replace("-silver", "");
  capturedDevice.name = device;
  return capturedDevice;
};

exports.specialChar = function(layer) {
  var chosenColor, newText, text;
  text = layer;
  if (layer.type === "button") {
    text = layer.label;
  }
  if (text.html.indexOf("-b") !== -1) {
    newText = text.html.replace("-b ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        fontWeight: 600
      }
    ]);
  }
  if (text.html.indexOf("-r") !== -1) {
    newText = text.html.replace("-r ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "red"
      }
    ]);
  }
  if (text.html.indexOf("-rb") !== -1) {
    newText = text.html.replace("-rb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "blue"
      }
    ]);
  }
  if (text.html.indexOf("-lb") !== -1) {
    newText = text.html.replace("-lb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "light-blue"
      }
    ]);
  }
  if (text.html.indexOf("-g") !== -1) {
    newText = text.html.replace("-g ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "green"
      }
    ]);
  }
  if (text.html.indexOf("-o") !== -1) {
    newText = text.html.replace("-o ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-p") !== -1) {
    newText = text.html.replace("-p ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-y") !== -1) {
    newText = text.html.replace("-y ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "yellow"
      }
    ]);
  }
  if (text.html.indexOf("-#") !== -1) {
    chosenColor = text.html.slice(1, 8);
    newText = text.html.slice(9, text.html.length);
    exports.update(text, [
      {
        text: newText
      }, {
        color: chosenColor
      }
    ]);
  }
  if (text.html.indexOf("-") !== -1) {
    newText = text.html.replace("- ", "");
    exports.update(text, [
      {
        text: newText
      }
    ]);
  }
  if (layer.buttonType === "text") {
    layer.width = text.width;
  }
  ios.layout.set(layer);
  if (layer.type === "button") {
    layer.width = text.width;
  }
  return text.color;
};

exports.update = function(layer, array) {
  var change, j, key, len, textFrame, value;
  if (array === void 0) {
    array = [];
  }
  if (layer.type === "text") {
    for (j = 0, len = array.length; j < len; j++) {
      change = array[j];
      key = Object.keys(change)[0];
      value = change[key];
      if (key === "text") {
        layer.html = value;
      }
      if (key === "fontWeight") {
        layer.style[key] = value;
      }
      if (key === "color") {
        layer.color = exports.color(value);
      }
    }
    textFrame = exports.textAutoSize(layer);
    layer.width = textFrame.width;
    layer.height = textFrame.height;
  }
  return ios.layout.set();
};

exports.autoColor = function(colorObject) {
  var blue, color, green, red, rgb;
  rgb = colorObject.toRgbString();
  rgb = rgb.substring(4, rgb.length - 1);
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.split(',');
  red = rgb[0];
  green = rgb[1];
  blue = rgb[2];
  color = "";
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    color = "#000";
  } else {
    color = "#FFF";
  }
  return color;
};

exports.sameParent = function(layer1, layer2) {
  var parentOne, parentTwo;
  parentOne = layer1.superLayer;
  parentTwo = layer2.superLayer;
  if (parentOne === parentTwo) {
    return true;
  } else {
    return false;
  }
};

exports.timeDelegate = function(layer, clockType) {
  this.time = exports.getTime();
  return Utils.delay(60 - this.time.secs, function() {
    this.time = exports.getTime();
    exports.update(layer, [
      {
        text: exports.timeFormatter(this.time, clockType)
      }
    ]);
    return Utils.interval(60, function() {
      this.time = exports.getTime();
      return exports.update(layer, [
        {
          text: exports.timeFormatter(this.time, clockType)
        }
      ]);
    });
  });
};

exports.timeFormatter = function(timeObj, clockType) {
  if (clockType === false) {
    if (timeObj.hours > 12) {
      timeObj.hours = timeObj.hours - 12;
    }
    if (timeObj.hours === 0) {
      timeObj.hours = 12;
    }
  }
  if (timeObj.mins < 10) {
    timeObj.mins = "0" + timeObj.mins;
  }
  return timeObj.hours + ":" + timeObj.mins;
};

exports.setupComponent = function(array, defaults) {
  var i, j, len, obj, ref;
  if (array === void 0) {
    array = [];
  }
  obj = {};
  ref = defaults.props;
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (array[i] !== void 0) {
      obj[i] = array[i];
    } else {
      obj[i] = defaults[i];
    }
  }
  return obj;
};

exports.emojiFormatter = function(string) {
  var arrayOfCodes, code, decoded, j, k, len, len1, unicodeFormat;
  unicodeFormat = "";
  if (string[0] === "E" || string[0] === "3" || string[0] === "2" || string[0] === "C") {
    arrayOfCodes = string.split(" ");
    for (j = 0, len = arrayOfCodes.length; j < len; j++) {
      code = arrayOfCodes[j];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  } else {
    arrayOfCodes = string.split(" ");
    unicodeFormat = "%F0%9F";
    for (k = 0, len1 = arrayOfCodes.length; k < len1; k++) {
      code = arrayOfCodes[k];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  }
  decoded = decodeURIComponent(unicodeFormat);
  return decoded;
};

exports.buildEmojisObject = function() {
  var code, emoji, emojis, index, j, len, ref, results;
  emojis = [];
  ref = ios.assets.emojiCodes;
  results = [];
  for (index = j = 0, len = ref.length; j < len; index = ++j) {
    code = ref[index];
    emoji = exports.emojiFormatter(code);
    results.push(emojis.push(emoji));
  }
  return results;
};

exports.write = function(obj, text) {
  if (obj.type === 'field') {
    return obj.text.html = obj.text.html + text;
  } else {
    return obj.html = obj.html + text;
  }
};


},{"ios-kit":"ios-kit"}],"ios-kit-view":[function(require,module,exports){
var ios;

ios = require('ios-kit');

exports.create = function(obj) {
  var i, len, prop, ref, view;
  if (obj === void 0) {
    obj = {};
  }
  view = new Layer;
  view.constraints = {};
  ref = ios.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (obj[prop]) {
      view[prop] = obj[prop];
    }
  }
  if (obj["constraints"]) {
    view.constraints = obj["constraints"];
    ios.layout.set(view);
  }
  return view;
};


},{"ios-kit":"ios-kit"}],"ios-kit":[function(require,module,exports){
var conv, layout, library, utils;

exports.layout = layout = require('ios-kit-layout');

exports.lib = library = require('ios-kit-library');

exports.utils = utils = require('ios-kit-utils');

exports.converter = conv = require('ios-kit-converter');

exports.device = utils.getDevice();

exports.assets = library.assets;

exports.isPad = function() {
  if (exports.device.name.indexOf('ipad') !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.isPhone = function() {
  if (exports.device.name.indexOf('iphone') !== -1) {
    return true;
  } else {
    return false;
  }
};

exports.convert = function(sketchObj) {
  return conv.convert(sketchObj);
};

exports.color = function(string) {
  return utils.color(string);
};

exports.px = function(num) {
  return utils.px(num);
};

exports.pt = function(num) {
  return utils.pt(num);
};

exports.alert = require('ios-kit-alert');

exports.banner = require('ios-kit-banner');

exports.button = require('ios-kit-button');

exports.field = require('ios-kit-field');

exports.keyboard = require('ios-kit-keyboard');

exports.nav = require('ios-kit-nav-bar');

exports.sheet = require('ios-kit-sheet');

exports.status = require('ios-kit-status-bar');

exports.tab = require('ios-kit-tab-bar');

exports.text = require('ios-kit-text');

exports.view = require('ios-kit-view');

exports.Alert = exports.alert.create;

exports.Banner = exports.banner.create;

exports.Button = exports.button.create;

exports.Field = exports.field.create;

exports.Keyboard = exports.keyboard.create;

exports.NavBar = exports.nav.create;

exports.Sheet = exports.sheet.create;

exports.StatusBar = exports.status.create;

exports.Tab = exports.tab.tab;

exports.TabBar = exports.tab.bar;

exports.Text = exports.text.create;

exports.View = exports.view.create;

exports.l = {};


},{"ios-kit-alert":"ios-kit-alert","ios-kit-banner":"ios-kit-banner","ios-kit-button":"ios-kit-button","ios-kit-converter":"ios-kit-converter","ios-kit-field":"ios-kit-field","ios-kit-keyboard":"ios-kit-keyboard","ios-kit-layout":"ios-kit-layout","ios-kit-library":"ios-kit-library","ios-kit-nav-bar":"ios-kit-nav-bar","ios-kit-sheet":"ios-kit-sheet","ios-kit-status-bar":"ios-kit-status-bar","ios-kit-tab-bar":"ios-kit-tab-bar","ios-kit-text":"ios-kit-text","ios-kit-utils":"ios-kit-utils","ios-kit-view":"ios-kit-view"}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2lvcy1raXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC12aWV3LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2lvcy1raXQtdXRpbHMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC10ZXh0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2lvcy1raXQtdGVtcC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy94aWFveGl6aGVuZy9Eb2N1bWVudHMvR2l0aHViL01lbnRvci5mcmFtZXIvbW9kdWxlcy9pb3Mta2l0LXRhYi1iYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC1zdGF0dXMtYmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2lvcy1raXQtc2hlZXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC1uYXYtYmFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2lvcy1raXQtbGlicmFyeS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy94aWFveGl6aGVuZy9Eb2N1bWVudHMvR2l0aHViL01lbnRvci5mcmFtZXIvbW9kdWxlcy9pb3Mta2l0LWxheW91dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy94aWFveGl6aGVuZy9Eb2N1bWVudHMvR2l0aHViL01lbnRvci5mcmFtZXIvbW9kdWxlcy9pb3Mta2l0LWtleWJvYXJkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2lvcy1raXQtZmllbGQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC1jb252ZXJ0ZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC1idXR0b24uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC1iYW5uZXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMveGlhb3hpemhlbmcvRG9jdW1lbnRzL0dpdGh1Yi9NZW50b3IuZnJhbWVyL21vZHVsZXMvaW9zLWtpdC1hbGVydC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy94aWFveGl6aGVuZy9Eb2N1bWVudHMvR2l0aHViL01lbnRvci5mcmFtZXIvbW9kdWxlcy9pbnB1dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy94aWFveGl6aGVuZy9Eb2N1bWVudHMvR2l0aHViL01lbnRvci5mcmFtZXIvbW9kdWxlcy9jaGF0Qm90LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL2FwaWFpLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3hpYW94aXpoZW5nL0RvY3VtZW50cy9HaXRodWIvTWVudG9yLmZyYW1lci9tb2R1bGVzL1hNTEh0dHBSZXF1ZXN0LmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiNpT1NLaXQgTW9kdWxlXG4jQnkgS2V2eW4gQXJub3R0XG5cbiMgSW1wb3J0IGZyYW1ld29ya1xuZXhwb3J0cy5sYXlvdXQgPSBsYXlvdXQgPSByZXF1aXJlICdpb3Mta2l0LWxheW91dCdcbmV4cG9ydHMubGliID0gbGlicmFyeSA9IHJlcXVpcmUgJ2lvcy1raXQtbGlicmFyeSdcbmV4cG9ydHMudXRpbHMgPSB1dGlscyA9IHJlcXVpcmUgJ2lvcy1raXQtdXRpbHMnXG5leHBvcnRzLmNvbnZlcnRlciA9IGNvbnYgPSByZXF1aXJlICdpb3Mta2l0LWNvbnZlcnRlcidcblxuIyBTZXR1cCByZXNvdXJjZXNcbmV4cG9ydHMuZGV2aWNlID0gdXRpbHMuZ2V0RGV2aWNlKClcbmV4cG9ydHMuYXNzZXRzID0gbGlicmFyeS5hc3NldHNcbmV4cG9ydHMuaXNQYWQgPSAtPiBpZiBleHBvcnRzLmRldmljZS5uYW1lLmluZGV4T2YoJ2lwYWQnKSAhPSAtMSB0aGVuIHJldHVybiB0cnVlIGVsc2UgcmV0dXJuIGZhbHNlXG5leHBvcnRzLmlzUGhvbmUgPSAtPiBpZiBleHBvcnRzLmRldmljZS5uYW1lLmluZGV4T2YoJ2lwaG9uZScpICE9IC0xIHRoZW4gcmV0dXJuIHRydWUgZWxzZSByZXR1cm4gZmFsc2VcblxuIyBTaG9ydGN1dHNcbmV4cG9ydHMuY29udmVydCA9IChza2V0Y2hPYmopIC0+XG4gIGNvbnYuY29udmVydChza2V0Y2hPYmopXG5cbmV4cG9ydHMuY29sb3IgPSAoc3RyaW5nKSAtPlxuICByZXR1cm4gdXRpbHMuY29sb3Ioc3RyaW5nKVxuXG5leHBvcnRzLnB4ID0gKG51bSkgLT5cbiAgcmV0dXJuIHV0aWxzLnB4KG51bSlcblxuZXhwb3J0cy5wdCA9IChudW0pIC0+XG4gIHJldHVybiB1dGlscy5wdChudW0pXG5cbiNJbXBvcnQgQ29tcG9uZW50c1xuZXhwb3J0cy5hbGVydCA9IHJlcXVpcmUgJ2lvcy1raXQtYWxlcnQnXG5leHBvcnRzLmJhbm5lciA9IHJlcXVpcmUgJ2lvcy1raXQtYmFubmVyJ1xuZXhwb3J0cy5idXR0b24gPSByZXF1aXJlICdpb3Mta2l0LWJ1dHRvbidcbmV4cG9ydHMuZmllbGQgPSByZXF1aXJlICdpb3Mta2l0LWZpZWxkJ1xuZXhwb3J0cy5rZXlib2FyZCA9IHJlcXVpcmUgJ2lvcy1raXQta2V5Ym9hcmQnXG5leHBvcnRzLm5hdiA9IHJlcXVpcmUgJ2lvcy1raXQtbmF2LWJhcidcbmV4cG9ydHMuc2hlZXQgPSByZXF1aXJlICdpb3Mta2l0LXNoZWV0J1xuZXhwb3J0cy5zdGF0dXMgPSByZXF1aXJlICdpb3Mta2l0LXN0YXR1cy1iYXInXG5leHBvcnRzLnRhYiA9IHJlcXVpcmUgJ2lvcy1raXQtdGFiLWJhcidcbmV4cG9ydHMudGV4dCA9IHJlcXVpcmUgJ2lvcy1raXQtdGV4dCdcbmV4cG9ydHMudmlldyA9IHJlcXVpcmUgJ2lvcy1raXQtdmlldydcblxuXG4jI1NldHVwIENvbXBvbmVudHNcbmV4cG9ydHMuQWxlcnQgPSBleHBvcnRzLmFsZXJ0LmNyZWF0ZVxuZXhwb3J0cy5CYW5uZXIgPSBleHBvcnRzLmJhbm5lci5jcmVhdGVcbmV4cG9ydHMuQnV0dG9uID0gZXhwb3J0cy5idXR0b24uY3JlYXRlXG5leHBvcnRzLkZpZWxkID0gZXhwb3J0cy5maWVsZC5jcmVhdGVcbmV4cG9ydHMuS2V5Ym9hcmQgPSBleHBvcnRzLmtleWJvYXJkLmNyZWF0ZVxuZXhwb3J0cy5OYXZCYXIgPSBleHBvcnRzLm5hdi5jcmVhdGVcbmV4cG9ydHMuU2hlZXQgPSBleHBvcnRzLnNoZWV0LmNyZWF0ZVxuZXhwb3J0cy5TdGF0dXNCYXIgPSBleHBvcnRzLnN0YXR1cy5jcmVhdGVcbmV4cG9ydHMuVGFiID0gZXhwb3J0cy50YWIudGFiXG5leHBvcnRzLlRhYkJhciA9IGV4cG9ydHMudGFiLmJhclxuZXhwb3J0cy5UZXh0ID0gZXhwb3J0cy50ZXh0LmNyZWF0ZVxuZXhwb3J0cy5WaWV3ID0gZXhwb3J0cy52aWV3LmNyZWF0ZVxuXG5cbiMgTGF5ZXJzIGZyb20gY29udmVydGluZ1xuZXhwb3J0cy5sID0ge31cbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuY3JlYXRlID0gKG9iaikgLT5cblx0aWYgb2JqID09IHVuZGVmaW5lZCB0aGVuIG9iaiA9IHt9XG5cblx0dmlldyA9IG5ldyBMYXllclxuXHR2aWV3LmNvbnN0cmFpbnRzID0ge31cblxuXHQjIFNldCBmcmFtZXIgcHJvcHNcblx0Zm9yIHByb3AgaW4gaW9zLmxpYi5sYXllclByb3BzXG5cdFx0XHRpZiBvYmpbcHJvcF0gdGhlbiB2aWV3W3Byb3BdID0gb2JqW3Byb3BdXG5cblx0IyBTZXQgY29uc3RyYWludHNcblx0aWYgb2JqW1wiY29uc3RyYWludHNcIl1cblx0XHR2aWV3LmNvbnN0cmFpbnRzID0gb2JqW1wiY29uc3RyYWludHNcIl1cblx0XHRpb3MubGF5b3V0LnNldCh2aWV3KVxuXG5cdHJldHVybiB2aWV3XG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG4jIyBDb252ZXJ0cyBweCB0byBwdFxuZXhwb3J0cy5wdCA9IChweCkgLT5cblx0cHQgPSBweC9pb3MuZGV2aWNlLnNjYWxlXG5cdHB0ID0gTWF0aC5yb3VuZChwdClcblx0cmV0dXJuIHB0XG5cbiMjIENvbnZlcnRzIHB0IHRvIHB4XG5leHBvcnRzLnB4ID0gKHB0KSAtPlxuXHRweCA9IHB0ICogaW9zLmRldmljZS5zY2FsZVxuXHRweCA9IE1hdGgucm91bmQocHgpXG5cdHJldHVybiBweFxuXG4jIyBpT1MgQ29sb3Ig4oCTIFRoaXMgd2lsbCBzdG9yZSBhbGwgb2YgdGhlIGRlZmF1bHQgaU9TIGNvbG9ycyBpbnRlYWQgb2YgdGhlIGRlZmF1bHQgQ1NTIGNvbG9ycy4gKlRoaXMgaXMgb25seSB1cCBoZXJlIGJlY2F1c2UgSSByZWZlciB0byBpdCBpbiB0aGUgZGVmYXVsdHMuKlxuZXhwb3J0cy5jb2xvciA9IChjb2xvclN0cmluZykgLT5cblx0Y29sb3IgPSBcIlwiXG5cdGlmIHR5cGVvZiBjb2xvclN0cmluZyA9PSBcInN0cmluZ1wiXG5cdFx0Y29sb3JTdHJpbmcgPSBjb2xvclN0cmluZy50b0xvd2VyQ2FzZSgpXG5cdFx0aWYgY29sb3JTdHJpbmdbMC4uLjRdID09IFwicmdiYVwiXG5cdFx0XHRyZXR1cm4gY29sb3JTdHJpbmdcblx0c3dpdGNoIGNvbG9yU3RyaW5nXG5cdFx0d2hlbiBcInJlZFwiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiNGRTM4MjRcIilcblx0XHR3aGVuIFwiYmx1ZVwiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiMwMDc2RkZcIilcblx0XHR3aGVuIFwicGlua1wiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiNGRTI4NTFcIilcblx0XHR3aGVuIFwiZ3JleVwiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiM5MjkyOTJcIilcblx0XHR3aGVuIFwiZ3JheVwiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiM5MjkyOTJcIilcblx0XHR3aGVuIFwiYmxhY2tcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjMDMwMzAzXCIpXG5cdFx0d2hlbiBcIndoaXRlXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiI0VGRUZGNFwiKVxuXHRcdHdoZW4gXCJvcmFuZ2VcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjRkY5NjAwXCIpXG5cdFx0d2hlbiBcImdyZWVuXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzQ0REI1RVwiKVxuXHRcdHdoZW4gXCJsaWdodCBibHVlXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzU0QzdGQ1wiKVxuXHRcdHdoZW4gXCJsaWdodC1ibHVlXCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzU0QzdGQ1wiKVxuXHRcdHdoZW4gXCJ5ZWxsb3dcIlxuXHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoXCIjRkZDRDAwXCIpXG5cdFx0d2hlbiBcImxpZ2h0IGtleVwiXG5cdFx0XHRjb2xvciA9IG5ldyBDb2xvcihcIiM5REE3QjNcIilcblx0XHR3aGVuIFwibGlnaHQta2V5XCJcblx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzlEQTdCM1wiKVxuXHRcdGVsc2Vcblx0XHRcdGlmIGNvbG9yU3RyaW5nWzBdID09IFwiI1wiIHx8IGNvbG9yU3RyaW5nLnRvSGV4U3RyaW5nKClbMF0gPT0gXCIjXCJcblx0XHRcdFx0Y29sb3IgPSBuZXcgQ29sb3IoY29sb3JTdHJpbmcpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNvbG9yID0gbmV3IENvbG9yKFwiIzkyOTI5MlwiKVxuXHRyZXR1cm4gY29sb3JcblxuIyBTdXBwb3J0aW5nIEZ1bmN0aW9uc1xuIyBVdGlsc1xuXG4jIENsZWFucyBhIHN0cmluZyBvZiA8YnI+IGFuZCAmbmJzcDtcbmV4cG9ydHMuY2xlYW4gPSAoc3RyaW5nKSAtPlxuXHQjIyByZW1vdmUgd2hpdGUgc3BhY2Vcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1smXW5ic3BbO10vZ2ksIFwiIFwiKS5yZXBsYWNlKC9bPF1icls+XS9naSwgXCJcIilcblx0cmV0dXJuIHN0cmluZ1xuXG4jIENvbnZlcnRzIHB4J3Mgb2YgYW4gU1ZHIHRvIHNjYWxhYmxlIHZhcmlhYmxlc1xuZXhwb3J0cy5zdmcgPSAoc3ZnKSAtPlxuXHQjIEZpbmQgU3RyaW5nXG5cdHN0YXJ0SW5kZXggPSBzdmcuc2VhcmNoKFwiPHN2ZyB3aWR0aD1cIilcblx0ZW5kSW5kZXggPSBzdmcuc2VhcmNoKFwiIHZpZXdCb3hcIilcblx0c3RyaW5nID0gc3ZnLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KVxuXG5cdCNGaW5kIHdpZHRoXG5cdHdTdGFydEluZGV4ID0gc3RyaW5nLnNlYXJjaChcIj1cIikgKyAyXG5cdHdFbmRJbmRleCA9ICBzdHJpbmcuc2VhcmNoKFwicHhcIilcblx0d2lkdGggPSBzdHJpbmcuc2xpY2Uod1N0YXJ0SW5kZXgsIHdFbmRJbmRleClcblx0bmV3V2lkdGggPSBleHBvcnRzLnB4KHdpZHRoKVxuXG5cdCMgRmluZCBIZWlnaHRcblx0aGVpZ2h0U3RyaW5nID0gc3RyaW5nLnNsaWNlKHdFbmRJbmRleCArIDQsIHN0cmluZy5sZW5ndGgpXG5cdGhTdGFydEluZGV4ID0gaGVpZ2h0U3RyaW5nLnNlYXJjaChcIj1cIikrIDJcblx0aEVuZEluZGV4ID0gaGVpZ2h0U3RyaW5nLnNlYXJjaChcInB4XCIpXG5cdGhlaWdodCA9IGhlaWdodFN0cmluZy5zbGljZShoU3RhcnRJbmRleCwgaEVuZEluZGV4KVxuXHRuZXdIZWlnaHQgPSBleHBvcnRzLnB4KGhlaWdodClcblxuXHQjQ3JlYXRlIG5ldyBzdHJpbmdcblx0bmV3U3RyaW5nID0gc3RyaW5nLnJlcGxhY2Uod2lkdGgsIG5ld1dpZHRoKVxuXHRuZXdTdHJpbmcgPSBuZXdTdHJpbmcucmVwbGFjZShoZWlnaHQsIG5ld0hlaWdodClcblxuXHQjUmVwbGFjZSBzdHJpbmdzXG5cdHN2ZyA9IHN2Zy5yZXBsYWNlKHN0cmluZywgbmV3U3RyaW5nKVxuXG5cdHJldHVybiB7XG5cdFx0c3ZnOnN2Z1xuXHRcdHdpZHRoOm5ld1dpZHRoXG5cdFx0aGVpZ2h0Om5ld0hlaWdodFxuXHR9XG5cbiMgQ2hhbmdlcyB0aGUgZmlsbCBvZiBhbiBTVkdcbmV4cG9ydHMuY2hhbmdlRmlsbCA9IChsYXllciwgY29sb3IpIC0+XG5cdHN0YXJ0SW5kZXggPSBsYXllci5odG1sLnNlYXJjaChcImZpbGw9XFxcIiNcIilcblx0ZmlsbFN0cmluZyA9IGxheWVyLmh0bWwuc2xpY2Uoc3RhcnRJbmRleCwgbGF5ZXIuaHRtbC5sZW5ndGgpXG5cdGVuZEluZGV4ID0gZmlsbFN0cmluZy5zZWFyY2goXCJcXFwiPlwiKVxuXHRzdHJpbmcgPSBmaWxsU3RyaW5nLnNsaWNlKDAsIGVuZEluZGV4KVxuXHRuZXdTdHJpbmcgPSBcImZpbGw9XFxcIlwiICsgZXhwb3J0cy5jb2xvcihjb2xvcilcblx0bGF5ZXIuaHRtbCA9IGxheWVyLmh0bWwucmVwbGFjZShzdHJpbmcsIG5ld1N0cmluZylcblxuZXhwb3J0cy5jYXBpdGFsaXplID0gKHN0cmluZykgLT5cblx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKVxuXG4jIFJldHVybnMgdGhlIGN1cnJlbnQgdGltZVxuZXhwb3J0cy5nZXRUaW1lID0gLT5cblx0ZGF5c09mVGhlV2VlayA9IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG5cdG1vbnRoc09mVGhlWWVhciA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdXG5cdGRhdGVPYmogPSBuZXcgRGF0ZSgpXG5cdG1vbnRoID0gbW9udGhzT2ZUaGVZZWFyW2RhdGVPYmouZ2V0TW9udGgoKV1cblx0ZGF0ZSA9IGRhdGVPYmouZ2V0RGF0ZSgpXG5cdGRheSA9IGRheXNPZlRoZVdlZWtbZGF0ZU9iai5nZXREYXkoKV1cblx0aG91cnMgPSBkYXRlT2JqLmdldEhvdXJzKClcblx0bWlucyA9IGRhdGVPYmouZ2V0TWludXRlcygpXG5cdHNlY3MgPSBkYXRlT2JqLmdldFNlY29uZHMoKVxuXHRyZXR1cm4ge1xuXHRcdG1vbnRoOm1vbnRoXG5cdFx0ZGF0ZTpkYXRlXG5cdFx0ZGF5OmRheVxuXHRcdGhvdXJzOmhvdXJzXG5cdFx0bWluczptaW5zXG5cdFx0c2VjczpzZWNzXG5cdH1cblxuZXhwb3J0cy5iZ0JsdXIgPSAobGF5ZXIpIC0+XG5cdGxheWVyLnN0eWxlW1wiLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXJcIl0gPSBcImJsdXIoI3tleHBvcnRzLnB4KDUpfXB4KVwiXG5cdHJldHVybiBsYXllclxuXG5leHBvcnRzLnRleHRBdXRvU2l6ZSA9ICh0ZXh0TGF5ZXIpIC0+XG5cdCNEZWZpbmUgV2lkdGhcblx0Y29uc3RyYWludHMgPSB7fVxuXHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHNcblx0XHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHMuaGVpZ2h0XG5cdFx0XHRjb25zdHJhaW50cy5oZWlnaHQgPSBleHBvcnRzLnB4KHRleHRMYXllci5jb25zdHJhaW50cy5oZWlnaHQpXG5cdFx0aWYgdGV4dExheWVyLmNvbnN0cmFpbnRzLndpZHRoXG5cdFx0XHRjb25zdHJhaW50cy53aWR0aCA9IGV4cG9ydHMucHgodGV4dExheWVyLmNvbnN0cmFpbnRzLndpZHRoKVxuXG5cdHN0eWxlcyA9XG5cdFx0Zm9udFNpemU6IHRleHRMYXllci5zdHlsZS5mb250U2l6ZVxuXHRcdGZvbnRGYW1pbHk6IHRleHRMYXllci5zdHlsZS5mb250RmFtaWx5XG5cdFx0Zm9udFdlaWdodDogdGV4dExheWVyLnN0eWxlLmZvbnRXZWlnaHRcblx0XHRsaW5lSGVpZ2h0OiB0ZXh0TGF5ZXIuc3R5bGUubGluZUhlaWdodFxuXHRcdGxldHRlclNwYWNpbmc6IHRleHRMYXllci5zdHlsZS5sZXR0ZXJTcGFjaW5nXG5cdFx0dGV4dFRyYW5zZm9ybTogdGV4dExheWVyLnN0eWxlLnRleHRUcmFuc2Zvcm1cblx0dGV4dEZyYW1lID0gVXRpbHMudGV4dFNpemUodGV4dExheWVyLmh0bWwsIHN0eWxlcywgY29uc3RyYWludHMpXG5cdHJldHVybiB7XG5cdFx0d2lkdGggOiB0ZXh0RnJhbWUud2lkdGhcblx0XHRoZWlnaHQ6IHRleHRGcmFtZS5oZWlnaHRcblx0fVxuXG4jIGV4cG9ydHMuZ2V0RGV2aWNlID0gLT5cbiNcbiMgXHQjIExvYWRzIHRoZSBpbml0aWFsIGZyYW1lXG4jIFx0ZGV2aWNlID0gRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG4jXG4jIFx0IyMjIFRoaXMgc3dpdGNoIGxvb2tzIGF0IHRoZSBpbm5lcldpZHRoIHRvIGRldGVybWluZSBpZiB0aGUgcHJvdG90eXBlIGlzIGJlaW5nIG9wZW5lZCBvbiBhIGRldmljZS5cbiMgXHRJZiBzbywgaXQnbGwgb3ZlcnJpZGUgdGhlIGRldmljZSwgYW5kIGl0J2xsIGFkanVzdCB0aGUgdmlldyB0byBmdWxsc2NyZWVuLiMjI1xuIyBcdGNhcHR1cmVkRGV2aWNlID0ge1xuIyBcdFx0d2lkdGg6aW9zLmxpYi5mcmFtZXNbZGV2aWNlXS53aWR0aFxuIyBcdFx0aGVpZ2h0Omlvcy5saWIuZnJhbWVzW2RldmljZV0uaGVpZ2h0XG4jIFx0XHRzY2FsZTppb3MubGliLmZyYW1lc1tkZXZpY2VdLnNjYWxlXG4jIFx0XHRtb2JpbGU6aW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5tb2JpbGVcbiMgXHRcdHBsYXRmb3JtOmlvcy5saWIuZnJhbWVzW2RldmljZV0ucGxhdGZvcm1cbiMgXHR9XG4jXG4jIFx0c3dpdGNoIGlubmVyV2lkdGhcbiMgXHRcdCMgaVBob25lIDVjLzVzL1NFXG4jIFx0XHR3aGVuIDY0MFxuIyBcdFx0XHRkZXZpY2UgPSBcImFwcGxlLWlwaG9uZS01cy1zaWx2ZXJcIlxuIyBcdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuI1xuIyBcdFx0IyBpUGhvbmUgNnNcbiMgXHRcdHdoZW4gNzUwXG4jIFx0XHRcdGRldmljZSA9IFwiYXBwbGUtaXBob25lLTZzLXNpbHZlclwiXG4jIFx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG4jXG4jIFx0XHQjIGlQaG9uZSA2cytcbiMgXHRcdHdoZW4gMTI0MlxuIyBcdFx0XHRpZiBpbm5lckhlaWdodCA9PSAyMjA4XG4jIFx0XHRcdFx0ZGV2aWNlID0gXCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zaWx2ZXJcIlxuIyBcdFx0XHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG4jIFx0XHRcdFx0cHJpbnQgXCJ5b1wiXG4jXG4jIFx0XHQjIGlQYWQgaW4gcG9ydHJhaXRcbiMgXHRcdHdoZW4gMTUzNlxuIyBcdFx0XHRpZiBpbm5lckhlaWdodCA9PSAyMDQ4XG4jIFx0XHRcdFx0ZGV2aWNlID0gXCJhcHBsZS1pcGFkLWFpci0yLXNpbHZlclwiXG4jIFx0XHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcbiNcbiMgXHRcdCMgaVBhZFxuIyBcdFx0d2hlbiAyMDQ4XG4jXG4jIFx0XHRcdCMgaVBhZCBQcm8gaW4gcG9ydHJhaXRcbiMgXHRcdFx0aWYgaW5uZXJIZWlnaHQgPT0gMjczMlxuIyBcdFx0XHRcdGRldmljZSA9IFwiYXBwbGUtaXBhZC1wcm8tc2lsdmVyXCJcbiNcbiMgXHRcdFx0IyBpUGFkIGluIGxhbmRzY2NhcGVcbiMgXHRcdFx0aWYgaW5uZXJIZWlnaHQgPT0gMTUzNlxuIyBcdFx0XHRcdGRldmljZSA9IFwiYXBwbGUtaXBhZC1haXItMi1zaWx2ZXJcIlxuIyBcdFx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuI1xuIyBcdFx0IyBpUGFkIFByb1xuIyBcdFx0d2hlbiAyNzMyXG4jIFx0XHRcdGlmIGlubmVySGVpZ2h0ID09IDIwNDhcbiMgXHRcdFx0XHRkZXZpY2UgPSBcImFwcGxlLWlwYWQtcHJvLXNpbHZlclwiXG4jIFx0XHRcdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcbmV4cG9ydHMuZ2V0RGV2aWNlID0gLT5cblx0IyBMb2FkcyB0aGUgaW5pdGlhbCBmcmFtZVxuXHRuYW1lRm9ybWF0dGVyID0gKG5hbWUpIC0+XG5cdFx0cmVtb3ZlVGVybXMgPSBbXCJhcHBsZS1cIiwgXCItZ29sZFwiLCBcIi1zaWx2ZXJcIiwgXCItcm9zZVwiLCBcIi1zcGFjZS1ncmF5XCIsIFwiLXllbGxvd1wiLCBcIi1ncmVlblwiLCBcIi1yZWRcIiwgXCItd2hpdGVcIiwgXCItYmx1ZVwiLCBcIi1taW5pXCIsIFwiLWFpclwiLCBcIi0yXCIsIFwiLTRcIl1cblx0XHRmb3IgdGVybSBpbiByZW1vdmVUZXJtc1xuXHRcdFx0bmFtZSA9IG5hbWUucmVwbGFjZSh0ZXJtLCBcIlwiKVxuXHRcdGlmIG5hbWUuaW5kZXhPZihcIi01c1wiKSAhPSAtMSB0aGVuIG5hbWUgPSBuYW1lLnJlcGxhY2UoXCItNXNcIiwgXCItNVwiKVxuXHRcdGlmIG5hbWUuaW5kZXhPZihcIi01Y1wiKSAhPSAtMSB0aGVuIG5hbWUgPSBuYW1lLnJlcGxhY2UoXCItNWNcIiwgXCItNVwiKVxuXHRcdHJldHVybiBuYW1lXG5cdGRldmljZSA9IFwiXCJcblx0ZnJhbWUgPSB0cnVlXG5cdGlmIGlvcy5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF0gJiYgaW9zLmxpYi5yZWFsRGV2aWNlc1tpbm5lcldpZHRoXVtpbm5lckhlaWdodF1cblx0XHRkZXZpY2UgPSBpb3MubGliLnJlYWxEZXZpY2VzW2lubmVyV2lkdGhdW2lubmVySGVpZ2h0XVxuXHRcdGZyYW1lID0gZmFsc2Vcblx0XHRGcmFtZXIuRGV2aWNlLmRldmljZVR5cGUgPSBcImZ1bGxzY3JlZW5cIlxuXG5cdGlmIGZyYW1lXG5cdFx0ZGV2aWNlID1cblx0XHRcdG5hbWU6IG5hbWVGb3JtYXR0ZXIoRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlKVxuXHRcdFx0ZGlzcGxheV9uYW1lIDogIEZyYW1lci5EZXZpY2VWaWV3LkRldmljZXNbRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXS5kaXNwbGF5X25hbWVcblx0XHRcdHdpZHRoIDogIEZyYW1lci5EZXZpY2VWaWV3LkRldmljZXNbRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXS5zY3JlZW5XaWR0aFxuXHRcdFx0aGVpZ2h0OiAgRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLnNjcmVlbkhlaWdodFxuXHRcdFx0c2NhbGU6IGlvcy5saWIuZnJhbWVyRnJhbWVzW0ZyYW1lci5EZXZpY2VWaWV3LkRldmljZXNbRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXS5zY3JlZW5XaWR0aF1cblxuXHRpZiBkZXZpY2Uuc2NhbGUgPT0gdW5kZWZpbmVkXG5cdFx0ZGV2aWNlLnNjYWxlID0gMlxuXHRpZiBkZXZpY2Uud2lkdGggPT0gdW5kZWZpbmVkXG5cdFx0ZGV2aWNlLndpZHRoID0gaW5uZXJXaWR0aFxuXHRpZiBkZXZpY2UuaGVpZ2h0ID09IHVuZGVmaW5lZFxuXHRcdGRldmljZS5oZWlnaHQgPSBpbm5lckhlaWdodFxuXG5cdHJldHVybiBkZXZpY2VcblxuXHRleHBvcnRzLnNjYWxlID0gaW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5zY2FsZVxuXG5cdGlmIGRldmljZSA9PSBcImZ1bGxzY3JlZW5cIlxuXHRcdGV4cG9ydHMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuXHRcdGV4cG9ydHMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cdGVsc2Vcblx0XHRleHBvcnRzLndpZHRoID0gaW9zLmxpYi5mcmFtZXNbZGV2aWNlXS53aWR0aFxuXHRcdGV4cG9ydHMuaGVpZ2h0ID0gaW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5oZWlnaHRcblx0XHRpZiB3aW5kb3cuaW5uZXJXaWR0aCA9PSAxMjQyIHx8IHdpbmRvdy5pbm5lcldpZHRoID09IDIyMDhcblx0XHRcdGV4cG9ydHMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuXHRcdFx0ZXhwb3J0cy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblx0XHRcdGV4cG9ydHMuc2NhbGUgPSAzXG5cdGV4cG9ydHMubW9iaWxlID0gaW9zLmxpYi5mcmFtZXNbZGV2aWNlXS5tb2JpbGVcblx0ZXhwb3J0cy5wbGF0Zm9ybSA9IGlvcy5saWIuZnJhbWVzW2RldmljZV0ucGxhdGZvcm1cblx0ZXhwb3J0cy5vcmllbnRhdGlvbiA9ICBGcmFtZXIuRGV2aWNlLm9yaWVudGF0aW9uXG5cblx0IyBEZXZpY2UgU3RyaW5nIFNjcnViYmVyXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiYXBwbGUtXCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLWdvbGRcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItZ3JlZW5cIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItYmx1ZVwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1yZWRcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItd2hpdGVcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCIteWVsbG93XCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLXBpbmtcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItc3BhY2UtZ3JleVwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1yb3NlXCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiNXNcIiwgXCI1XCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiNWNcIiwgXCI1XCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLW1pbmlcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItYWlyXCIsIFwiXCIpXG5cdGRldmljZSA9IGRldmljZS5yZXBsYWNlKFwiLTJcIiwgXCJcIilcblx0ZGV2aWNlID0gZGV2aWNlLnJlcGxhY2UoXCItNFwiLCBcIlwiKVxuXHRkZXZpY2UgPSBkZXZpY2UucmVwbGFjZShcIi1zaWx2ZXJcIiwgXCJcIilcblxuXHRjYXB0dXJlZERldmljZS5uYW1lID0gZGV2aWNlXG5cblx0IyBleHBvcnRzLmRldmljZSBiZWNvbWVzIGVpdGhlciBpcGFkLCBpcGFkLXBybywgaXBob25lLTUsIGlwaG9uZS02cywgaXBob25lLTZzLXBsdXNcblx0cmV0dXJuIGNhcHR1cmVkRGV2aWNlXG5cblxuIyBTcGVjaWFsIENoYXJhY3RlcnNcbmV4cG9ydHMuc3BlY2lhbENoYXIgPSAobGF5ZXIpIC0+XG5cdHRleHQgPSBsYXllclxuXHRpZiBsYXllci50eXBlID09IFwiYnV0dG9uXCIgdGhlbiB0ZXh0ID0gbGF5ZXIubGFiZWxcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItYlwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1iIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2ZvbnRXZWlnaHQ6NjAwfV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXJcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItciBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcInJlZFwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXJiXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLXJiIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwiYmx1ZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLWxiXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLWxiIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwibGlnaHQtYmx1ZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLWdcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItZyBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcImdyZWVuXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItb1wiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1vIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwib3JhbmdlXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItcFwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1wIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwib3JhbmdlXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCIteVwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi15IFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwieWVsbG93XCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItI1wiKSAhPSAtMVxuXHRcdGNob3NlbkNvbG9yID0gdGV4dC5odG1sLnNsaWNlKDEsIDgpXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5zbGljZSg5LCB0ZXh0Lmh0bWwubGVuZ3RoKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOmNob3NlbkNvbG9yfV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLVwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi0gXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9XSlcblx0aWYgbGF5ZXIuYnV0dG9uVHlwZSA9PSBcInRleHRcIlxuXHRcdGxheWVyLndpZHRoID0gdGV4dC53aWR0aFxuXHRpb3MubGF5b3V0LnNldChsYXllcilcblx0aWYgbGF5ZXIudHlwZSA9PSBcImJ1dHRvblwiIHRoZW4gbGF5ZXIud2lkdGggPSB0ZXh0LndpZHRoXG5cdHJldHVybiB0ZXh0LmNvbG9yXG5cbmV4cG9ydHMudXBkYXRlID0gKGxheWVyLCBhcnJheSkgLT5cblx0aWYgYXJyYXkgPT0gdW5kZWZpbmVkXG5cdFx0YXJyYXkgPSBbXVxuXHRpZiBsYXllci50eXBlID09IFwidGV4dFwiXG5cdFx0Zm9yIGNoYW5nZSBpbiBhcnJheVxuXHRcdFx0a2V5ID0gT2JqZWN0LmtleXMoY2hhbmdlKVswXVxuXHRcdFx0dmFsdWUgPSBjaGFuZ2Vba2V5XVxuXHRcdFx0aWYga2V5ID09IFwidGV4dFwiXG5cdFx0XHRcdGxheWVyLmh0bWwgPSB2YWx1ZVxuXHRcdFx0aWYga2V5ID09IFwiZm9udFdlaWdodFwiXG5cdFx0XHRcdGxheWVyLnN0eWxlW2tleV0gPSB2YWx1ZVxuXHRcdFx0aWYga2V5ID09IFwiY29sb3JcIlxuXHRcdFx0XHRsYXllci5jb2xvciA9IGV4cG9ydHMuY29sb3IodmFsdWUpXG5cblx0XHR0ZXh0RnJhbWUgPSBleHBvcnRzLnRleHRBdXRvU2l6ZShsYXllcilcblx0XHRsYXllci53aWR0aCA9IHRleHRGcmFtZS53aWR0aFxuXHRcdGxheWVyLmhlaWdodCA9IHRleHRGcmFtZS5oZWlnaHRcblxuXG5cdGlvcy5sYXlvdXQuc2V0KClcblxuIyBEZWNpZGVzIGlmIGl0IHNob3VsZCBiZSB3aGl0ZS9ibGFjayB0ZXh0XG5leHBvcnRzLmF1dG9Db2xvciA9IChjb2xvck9iamVjdCkgLT5cblx0cmdiID0gY29sb3JPYmplY3QudG9SZ2JTdHJpbmcoKVxuXHRyZ2IgPSByZ2Iuc3Vic3RyaW5nKDQsIHJnYi5sZW5ndGgtMSlcblx0cmdiID0gcmdiLnJlcGxhY2UoLyAvZywgJycpXG5cdHJnYiA9IHJnYi5yZXBsYWNlKC8gL2csICcnKVxuXHRyZ2IgPSByZ2Iuc3BsaXQoJywnKVxuXHRyZWQgPSByZ2JbMF1cblx0Z3JlZW4gPSByZ2JbMV1cblx0Ymx1ZSA9IHJnYlsyXVxuXHRjb2xvciA9IFwiXCJcblx0aWYgKHJlZCowLjI5OSArIGdyZWVuKjAuNTg3ICsgYmx1ZSowLjExNCkgPiAxODZcblx0XHRjb2xvciA9IFwiIzAwMFwiXG5cdGVsc2Vcblx0XHRjb2xvciA9IFwiI0ZGRlwiXG5cdHJldHVybiBjb2xvclxuXG5leHBvcnRzLnNhbWVQYXJlbnQgPSAobGF5ZXIxLCBsYXllcjIpIC0+XG5cdHBhcmVudE9uZSA9IGxheWVyMS5zdXBlckxheWVyXG5cdHBhcmVudFR3byA9IGxheWVyMi5zdXBlckxheWVyXG5cdGlmIHBhcmVudE9uZSA9PSBwYXJlbnRUd29cblx0XHRyZXR1cm4gdHJ1ZVxuXHRlbHNlXG5cdFx0cmV0dXJuIGZhbHNlXG5cblxuZXhwb3J0cy50aW1lRGVsZWdhdGUgPSAobGF5ZXIsIGNsb2NrVHlwZSkgLT5cblx0QHRpbWUgPSBleHBvcnRzLmdldFRpbWUoKVxuXHRVdGlscy5kZWxheSA2MCAtIEB0aW1lLnNlY3MsIC0+XG5cdFx0QHRpbWUgPSBleHBvcnRzLmdldFRpbWUoKVxuXHRcdGV4cG9ydHMudXBkYXRlKGxheWVyLCBbdGV4dDpleHBvcnRzLnRpbWVGb3JtYXR0ZXIoQHRpbWUsIGNsb2NrVHlwZSldKVxuXHRcdFV0aWxzLmludGVydmFsIDYwLCAtPlxuXHRcdFx0QHRpbWUgPSBleHBvcnRzLmdldFRpbWUoKVxuXHRcdFx0ZXhwb3J0cy51cGRhdGUobGF5ZXIsIFt0ZXh0OmV4cG9ydHMudGltZUZvcm1hdHRlcihAdGltZSwgY2xvY2tUeXBlKV0pXG5cbmV4cG9ydHMudGltZUZvcm1hdHRlciA9ICh0aW1lT2JqLCBjbG9ja1R5cGUpIC0+XG5cdGlmIGNsb2NrVHlwZSA9PSBmYWxzZVxuXHRcdGlmIHRpbWVPYmouaG91cnMgPiAxMlxuXHRcdFx0dGltZU9iai5ob3VycyA9IHRpbWVPYmouaG91cnMgLSAxMlxuXHRcdGlmIHRpbWVPYmouaG91cnMgPT0gMCB0aGVuIHRpbWVPYmouaG91cnMgPSAxMlxuXHRpZiB0aW1lT2JqLm1pbnMgPCAxMFxuXHRcdHRpbWVPYmoubWlucyA9IFwiMFwiICsgdGltZU9iai5taW5zXG5cdHJldHVybiB0aW1lT2JqLmhvdXJzICsgXCI6XCIgKyB0aW1lT2JqLm1pbnNcblxuZXhwb3J0cy5zZXR1cENvbXBvbmVudCA9IChhcnJheSwgZGVmYXVsdHMpIC0+XG5cdGlmIGFycmF5ID09IHVuZGVmaW5lZFxuXHRcdGFycmF5ID0gW11cblx0b2JqID0ge31cblx0Zm9yIGkgaW4gZGVmYXVsdHMucHJvcHNcblx0XHRpZiBhcnJheVtpXSAhPSB1bmRlZmluZWRcblx0XHRcdG9ialtpXSA9IGFycmF5W2ldXG5cdFx0ZWxzZVxuXHRcdFx0b2JqW2ldID0gZGVmYXVsdHNbaV1cblx0cmV0dXJuIG9ialxuXG5cbmV4cG9ydHMuZW1vamlGb3JtYXR0ZXIgPSAoc3RyaW5nKSAtPlxuXHRcdHVuaWNvZGVGb3JtYXQgPSBcIlwiXG5cdFx0aWYgc3RyaW5nWzBdID09IFwiRVwiIHx8IHN0cmluZ1swXSA9PSBcIjNcIiB8fCBzdHJpbmdbMF0gPT0gXCIyXCIgfHwgc3RyaW5nWzBdID09IFwiQ1wiXG5cdFx0XHRhcnJheU9mQ29kZXMgPSBzdHJpbmcuc3BsaXQoXCIgXCIpXG5cdFx0XHRmb3IgY29kZSBpbiBhcnJheU9mQ29kZXNcblx0XHRcdFx0dW5pY29kZUZvcm1hdCA9IHVuaWNvZGVGb3JtYXQgKyBcIiVcIiArIGNvZGVcblx0XHRlbHNlXG5cdFx0XHRhcnJheU9mQ29kZXMgPSBzdHJpbmcuc3BsaXQoXCIgXCIpXG5cdFx0XHR1bmljb2RlRm9ybWF0ID0gXCIlRjAlOUZcIlxuXHRcdFx0Zm9yIGNvZGUgaW4gYXJyYXlPZkNvZGVzXG5cdFx0XHRcdHVuaWNvZGVGb3JtYXQgPSB1bmljb2RlRm9ybWF0ICsgXCIlXCIgKyBjb2RlXG5cdFx0ZGVjb2RlZCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmljb2RlRm9ybWF0KVxuXHRcdHJldHVybiBkZWNvZGVkXG5cbmV4cG9ydHMuYnVpbGRFbW9qaXNPYmplY3QgPSAoKSAtPlxuXHRlbW9qaXMgPSBbXVxuXHRmb3IgY29kZSwgaW5kZXggaW4gaW9zLmFzc2V0cy5lbW9qaUNvZGVzXG5cdFx0ZW1vamkgPSBleHBvcnRzLmVtb2ppRm9ybWF0dGVyKGNvZGUpXG5cdFx0ZW1vamlzLnB1c2ggZW1vamlcblxuZXhwb3J0cy53cml0ZSA9IChvYmosIHRleHQpIC0+XG5cdGlmIG9iai50eXBlID09ICdmaWVsZCdcblx0XHRvYmoudGV4dC5odG1sID0gb2JqLnRleHQuaHRtbCArIHRleHRcblx0ZWxzZVxuXHRcdG9iai5odG1sID0gb2JqLmh0bWwgKyB0ZXh0XG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5cbmV4cG9ydHMuZGVmYXVsdHMgPVxuXHRlZGl0YWJsZTp0cnVlXG5cdGNvbnN0cmFpbnRzOnVuZGVmaW5lZFxuXHR0ZXh0OiBcImlPUyBUZXh0IExheWVyXCJcblx0dHlwZTpcInRleHRcIlxuXHR4OjBcblx0eTowXG5cdHdpZHRoOi0xXG5cdGhlaWdodDotMVxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRzdHlsZTpcImRlZmF1bHRcIlxuXHRsaW5lczoxXG5cdHRleHRBbGlnbjpcImxlZnRcIlxuXHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdGNvbG9yOlwiYmxhY2tcIlxuXHRmb250U2l6ZTogMTdcblx0Zm9udEZhbWlseTpcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWZcIlxuXHRmb250V2VpZ2h0OlwicmVndWxhclwiXG5cdGxpbmVIZWlnaHQ6XCJhdXRvXCJcblx0bmFtZTpcInRleHQgbGF5ZXJcIlxuXHRvcGFjaXR5OjFcblx0dGV4dFRyYW5zZm9ybTpcIm5vbmVcIlxuXHRsZXR0ZXJTcGFjaW5nOjBcblx0bmFtZTpcInRleHQgbGF5ZXJcIlxuXHRzZWxlY3RhYmxlOnRydWVcblx0c2VsZWN0Q29sb3I6XCJyZ2JhKDAsIDExOCwgMjU1LCAuMilcIlxuXHRzZWxlY3RDb250cm9sczpcIiMwMDc2RkZcIlxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdGV4Y2VwdGlvbnMgPSBPYmplY3Qua2V5cyhzZXR1cClcblxuXHR0ZXh0TGF5ZXIgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpzZXR1cC5uYW1lXG5cdFx0c3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG5cdFx0Y29uc3RyYWludHM6c2V0dXAuY29uc3RyYWludHNcblxuXHR0ZXh0TGF5ZXIudHlwZSA9IFwidGV4dFwiXG5cdHRleHRMYXllci5odG1sID0gc2V0dXAudGV4dFxuXHRmb3IgcHJvcCBpbiBpb3MubGliLmxheWVyUHJvcHNcblx0XHRpZiBzZXR1cFtwcm9wXVxuXHRcdFx0aWYgcHJvcCA9PSBcImNvbG9yXCJcblx0XHRcdFx0c2V0dXBbcHJvcF0gPSBpb3MudXRpbHMuY29sb3Ioc2V0dXBbcHJvcF0pXG5cdFx0XHR0ZXh0TGF5ZXJbcHJvcF0gPSBzZXR1cFtwcm9wXVxuXHRmb3IgcHJvcCBpbiBpb3MubGliLmxheWVyU3R5bGVzXG5cdFx0aWYgc2V0dXBbcHJvcF1cblx0XHRcdGlmIHByb3AgPT0gXCJsaW5lSGVpZ2h0XCIgJiYgc2V0dXBbcHJvcF0gPT0gXCJhdXRvXCJcblx0XHRcdFx0dGV4dExheWVyLnN0eWxlLmxpbmVIZWlnaHQgPSAgc2V0dXAuZm9udFNpemVcblx0XHRcdGlmIHByb3AgPT0gXCJmb250V2VpZ2h0XCJcblx0XHRcdFx0c3dpdGNoIHNldHVwW3Byb3BdXG5cdFx0XHRcdFx0d2hlbiBcInVsdHJhdGhpblwiIHRoZW4gc2V0dXBbcHJvcF0gPSAxMDBcblx0XHRcdFx0XHR3aGVuIFwidGhpblwiIHRoZW4gc2V0dXBbcHJvcF0gPSAyMDBcblx0XHRcdFx0XHR3aGVuIFwibGlnaHRcIiB0aGVuIHNldHVwW3Byb3BdID0gMzAwXG5cdFx0XHRcdFx0d2hlbiBcInJlZ3VsYXJcIiB0aGVuIHNldHVwW3Byb3BdID0gNDAwXG5cdFx0XHRcdFx0d2hlbiBcIm1lZGl1bVwiIHRoZW4gc2V0dXBbcHJvcF0gPSA1MDBcblx0XHRcdFx0XHR3aGVuIFwic2VtaWJvbGRcIiB0aGVuIHNldHVwW3Byb3BdID0gNjAwXG5cdFx0XHRcdFx0d2hlbiBcImJvbGRcIiB0aGVuIHNldHVwW3Byb3BdID0gNzAwXG5cdFx0XHRcdFx0d2hlbiBcImJsYWNrXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDgwMFxuXHRcdFx0aWYgcHJvcCA9PSBcImZvbnRTaXplXCIgfHwgcHJvcCA9PSBcImxpbmVIZWlnaHRcIiB8fCBwcm9wID09IFwibGV0dGVyU3BhY2luZ1wiXG5cdFx0XHRcdHNldHVwW3Byb3BdID0gaW9zLnV0aWxzLnB4KHNldHVwW3Byb3BdKSArIFwicHhcIlxuXHRcdFx0dGV4dExheWVyLnN0eWxlW3Byb3BdID0gc2V0dXBbcHJvcF1cblxuXHR0ZXh0RnJhbWUgPSBpb3MudXRpbHMudGV4dEF1dG9TaXplKHRleHRMYXllcilcblx0dGV4dExheWVyLnByb3BzID0gKGhlaWdodDp0ZXh0RnJhbWUuaGVpZ2h0LCB3aWR0aDp0ZXh0RnJhbWUud2lkdGgpXG5cblx0aWYgc2V0dXAuZWRpdGFibGVcblx0XHR0ZXh0TGF5ZXIub24gXCJjaGFuZ2U6aHRtbFwiLCAtPlxuXHRcdFx0dGV4dEZyYW1lID0gaW9zLnV0aWxzLnRleHRBdXRvU2l6ZSh0ZXh0TGF5ZXIpXG5cdFx0XHR0ZXh0TGF5ZXIucHJvcHMgPSAoaGVpZ2h0OnRleHRGcmFtZS5oZWlnaHQsIHdpZHRoOnRleHRGcmFtZS53aWR0aClcblxuXG5cdGlvcy5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OnRleHRMYXllclxuXHRyZXR1cm4gdGV4dExheWVyXG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5cbmV4cG9ydHMuZGVmYXVsdHMgPVxuICBrZXk6XCJ2YWx1ZVwiXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cbiAgc2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG4gIHJldHVyblxuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0dGFiOiB7XG5cdFx0bGFiZWw6IFwibGFiZWxcIlxuXHRcdGljb246XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzI1cHgnIGhlaWdodD0nMjVweCcgdmlld0JveD0nMCAwIDI1IDI1JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT4xPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScxJz5cblx0XHRcdFx0XHQ8ZyBpZD0nQm90dG9tLUJhci9UYWItQmFyJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjUuMDAwMDAwLCAtNy4wMDAwMDApJyBmaWxsPScjMDA3NkZGJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdQbGFjZWhvbGRlcnMnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI1LjAwMDAwMCwgNy4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9JzEnIHg9JzAnIHk9JzAnIHdpZHRoPScyNScgaGVpZ2h0PScyNScgcng9JzMnPjwvcmVjdD5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdFx0YWN0aXZlOiB1bmRlZmluZWRcblx0XHRpbmFjdGl2ZTogdW5kZWZpbmVkXG5cdFx0dGFiQmFyOiB1bmRlZmluZWRcblx0XHR0eXBlOiBcInRhYlwiXG5cdH1cblx0YmFyOiB7XG5cdFx0dGFiczogW11cblx0XHRzdGFydDowXG5cdFx0dHlwZTpcInRhYkJhclwiXG5cdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdGFjdGl2ZUNvbG9yOlwiYmx1ZVwiXG5cdFx0aW5hY3RpdmVDb2xvcjpcImdyYXlcIlxuXHRcdGJsdXI6dHJ1ZVxuXHR9XG59XG5cbmV4cG9ydHMuZGVmYXVsdHMudGFiLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy50YWIpXG5leHBvcnRzLmRlZmF1bHRzLmJhci5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMuYmFyKVxuXG5leHBvcnRzLnRhYiA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMudGFiKVxuXHRzcGVjcyA9XG5cdFx0d2lkdGg6IDc1XG5cblx0c3dpdGNoIGlvcy5kZXZpY2UubmFtZVxuXHRcdHdoZW4gXCJpcGhvbmUtNVwiXG5cdFx0XHRzcGVjcy53aWR0aCA9IDU1XG5cblx0dGFiID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6c2V0dXAubGFiZWxcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHdpZHRoOnNwZWNzLndpZHRoXG5cdFx0XHRoZWlnaHQ6NDlcblxuXHR0YWIudmlldyA9IG5ldyBpb3MuVmlld1xuXHRcdG5hbWU6c2V0dXAubGFiZWwgKyBcIi52aWV3XCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6MFxuXHRcdFx0Ym90dG9tOjBcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXG5cdCMgQ3JlYXRlIEFjdGl2ZVxuXHR0YWIuYWN0aXZlID0gbmV3IGlvcy5WaWV3XG5cdFx0bmFtZTpcIi5hY3RpdmVcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDowXG5cdFx0XHRib3R0b206MFxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0c3VwZXJMYXllcjp0YWJcblxuXHR0YWIuYWN0aXZlLmljb24gPSBuZXcgaW9zLlZpZXdcblx0XHRuYW1lOlwiLmFjdGl2ZS5pY29uXCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHdpZHRoOjI1XG5cdFx0XHRoZWlnaHQ6MjVcblx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cdFx0XHR0b3A6N1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRzdXBlckxheWVyOnRhYi5hY3RpdmVcblx0aWYgc2V0dXAuYWN0aXZlID09IHVuZGVmaW5lZFxuXHRcdHN2Z0ZyYW1lID0gaW9zLnV0aWxzLnN2ZyhzZXR1cC5pY29uKVxuXHRcdHRhYi5hY3RpdmUuaWNvbi5odG1sID0gc3ZnRnJhbWUuc3ZnXG5cdFx0dGFiLmFjdGl2ZS5pY29uLndpZHRoID0gc3ZnRnJhbWUud2lkdGhcblx0XHR0YWIuYWN0aXZlLmljb24uaGVpZ2h0ID0gc3ZnRnJhbWUuaGVpZ2h0XG5cdGVsc2Vcblx0XHRzZXR1cC5hY3RpdmUuc3VwZXJMYXllciA9IHRhYi5hY3RpdmUuaWNvblxuXHRcdHNldHVwLmFjdGl2ZS5wcm9wcyA9XG5cdFx0XHR3aWR0aDp0YWIuYWN0aXZlLmljb24ud2lkdGhcblx0XHRcdGhlaWdodDp0YWIuYWN0aXZlLmljb24uaGVpZ2h0XG5cblx0IyBDcmVhdGUgSW5hY3RpdmVcblx0dGFiLmluYWN0aXZlID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCIuaW5hY3RpdmVcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjBcblx0XHRcdGJvdHRvbTowXG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRzdXBlckxheWVyOnRhYlxuXG5cdHRhYi5pbmFjdGl2ZS5pY29uID0gbmV3IGlvcy5WaWV3XG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR3aWR0aDoyNVxuXHRcdFx0aGVpZ2h0OjI1XG5cdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0dG9wOjdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpcIi5pbmFjdGl2ZS5pY29uXCJcblx0XHRzdXBlckxheWVyOnRhYi5pbmFjdGl2ZVxuXG5cdHRhYi5sYWJlbCA9IG5ldyBpb3MuVGV4dFxuXHRcdHRleHQ6c2V0dXAubGFiZWxcblx0XHRzdXBlckxheWVyOnRhYlxuXHRcdGNvbG9yOlwiIzkyOTI5MlwiXG5cdFx0Zm9udFNpemU6MTBcblx0XHRuYW1lOlwiLmxhYmVsXCJcblx0XHR0ZXh0VHJhbnNmb3JtOlwiY2FwaXRhbGl6ZVwiXG5cblx0dGFiLmxhYmVsLmNvbnN0cmFpbnRzID1cblx0XHRib3R0b206MlxuXHRcdGhvcml6b250YWxDZW50ZXI6dGFiLmFjdGl2ZS5pY29uXG5cblx0aWYgc2V0dXAuaW5hY3RpdmUgPT0gdW5kZWZpbmVkXG5cdFx0c3ZnRnJhbWUgPSBpb3MudXRpbHMuc3ZnKHNldHVwLmljb24pXG5cdFx0dGFiLmluYWN0aXZlLmljb24uaHRtbCA9IHN2Z0ZyYW1lLnN2Z1xuXHRcdHRhYi5pbmFjdGl2ZS5pY29uLndpZHRoID0gc3ZnRnJhbWUud2lkdGhcblx0XHR0YWIuaW5hY3RpdmUuaWNvbi5oZWlnaHQgPSBzdmdGcmFtZS5oZWlnaHRcblxuXHRlbHNlXG5cdFx0c2V0dXAuaW5hY3RpdmUuc3VwZXJMYXllciA9IHRhYi5pbmFjdGl2ZS5pY29uXG5cdFx0c2V0dXAuaW5hY3RpdmUucHJvcHMgPVxuXHRcdFx0d2lkdGg6dGFiLmluYWN0aXZlLmljb24ud2lkdGhcblx0XHRcdGhlaWdodDp0YWIuaW5hY3RpdmUuaWNvbi5oZWlnaHRcblxuXHRyZXR1cm4gdGFiXG5cbmV4cG9ydHMuYmFyID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cy5iYXIpXG5cblx0IyBJZiBubyB0YWJzLCBtYWtlIGR1bW15IHRhYnNcblx0aWYgc2V0dXAudGFicy5sZW5ndGggPT0gMFxuXHRcdGR1bW15VGFiID0gbmV3IGV4cG9ydHMudGFiXG5cdFx0ZHVtbXlUYWIyID0gbmV3IGV4cG9ydHMudGFiXG5cdFx0c2V0dXAudGFicy5wdXNoIGR1bW15VGFiXG5cdFx0c2V0dXAudGFicy5wdXNoIGR1bW15VGFiMlxuXG5cdHNwZWNzID1cblx0XHR3aWR0aDogNzVcblx0c3dpdGNoIGlvcy5kZXZpY2UubmFtZVxuXHRcdHdoZW4gXCJpcGhvbmUtNVwiXG5cdFx0XHRzcGVjcy53aWR0aCA9IDU1XG5cblx0YmFyID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJ0YWJCYXJcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHRib3R0b206MFxuXHRcdFx0aGVpZ2h0OjQ5XG5cblx0YmFyLmJnID0gbmV3IGlvcy5WaWV3XG5cdFx0c3VwZXJMYXllcjpiYXJcblx0XHRuYW1lOlwiLmJnXCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0Ym90dG9tOjBcblx0XHRcdGhlaWdodDo0OVxuXG5cdGJhci5kaXZpZGVyID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwiI0IyQjJCMlwiXG5cdFx0bmFtZTpcIi5kaXZpZGVyXCJcblx0XHRzdXBlckxheWVyOmJhclxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjBcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0aGVpZ2h0Oi41XG5cdGJhci5ib3ggPSBuZXcgaW9zLlZpZXdcblx0XHRzdXBlckxheWVyOmJhclxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiLmJveFwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRoZWlnaHQ6NDlcblx0XHRcdHdpZHRoOnNldHVwLnRhYnMubGVuZ3RoICogc3BlY3Mud2lkdGhcblxuXG5cdHNldEFjdGl2ZSA9ICh0YWJJbmRleCkgLT5cblx0XHRmb3IgdGFiLCBpbmRleCBpbiBzZXR1cC50YWJzXG5cdFx0XHRpZiBpbmRleCA9PSB0YWJJbmRleFxuXHRcdFx0XHR0YWIubGFiZWwuY29sb3IgPSBpb3MudXRpbHMuY29sb3Ioc2V0dXAuYWN0aXZlQ29sb3IpXG5cdFx0XHRcdHRhYi5hY3RpdmUudmlzaWJsZSA9IHRydWVcblx0XHRcdFx0dGFiLmluYWN0aXZlLnZpc2libGUgPSBmYWxzZVxuXHRcdFx0XHR0YWIudmlldy52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0YWIubGFiZWwuY29sb3IgPSBpb3MudXRpbHMuY29sb3Ioc2V0dXAuaW5hY3RpdmVDb2xvcilcblx0XHRcdFx0dGFiLmFjdGl2ZS52aXNpYmxlID0gZmFsc2Vcblx0XHRcdFx0dGFiLmluYWN0aXZlLnZpc2libGUgPSB0cnVlXG5cdFx0XHRcdHRhYi52aWV3LnZpc2libGUgPSBmYWxzZVxuXG5cblx0Zm9yIHRhYiwgaW5kZXggaW4gc2V0dXAudGFic1xuXHRcdCNDaGVjayBmb3IgdmFpbGQgdGFiIG9iamVjdFxuXHRcdGJhci5ib3guYWRkU3ViTGF5ZXIodGFiKVxuXHRcdCMgQ2hhbmdlIGNvbG9yc1xuXHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKHRhYi5hY3RpdmUuaWNvbiwgaW9zLnV0aWxzLmNvbG9yKHNldHVwLmFjdGl2ZUNvbG9yKSlcblx0XHRpb3MudXRpbHMuY2hhbmdlRmlsbCh0YWIuaW5hY3RpdmUuaWNvbiwgaW9zLnV0aWxzLmNvbG9yKHNldHVwLmluYWN0aXZlQ29sb3IpKVxuXHRcdHRhYi5sYWJlbC5jb2xvciA9IGlvcy51dGlscy5jb2xvcihzZXR1cC5pbmFjdGl2ZUNvbG9yKVxuXHRcdGJhci5iZy5iYWNrZ3JvdW5kQ29sb3IgPSBzZXR1cC5iYWNrZ3JvdW5kQ29sb3JcblxuXHRcdGlmIHNldHVwLmJsdXJcblx0XHRcdGJhci5iZy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsIC45KVwiXG5cdFx0XHRpb3MudXRpbHMuYmdCbHVyKGJhci5iZylcblxuXHRcdGlmIGluZGV4ID09IDBcblx0XHRcdHRhYi5jb25zdHJhaW50cy5sZWFkaW5nID0gMFxuXHRcdGVsc2Vcblx0XHRcdHRhYi5jb25zdHJhaW50cy5sZWFkaW5nID0gc2V0dXAudGFic1tpbmRleCAtIDFdXG5cblx0XHRpb3MubGF5b3V0LnNldCh0YWIpXG5cblx0XHR0YWIub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHR0YWJJbmRleCA9IEAueCAvIGlvcy51dGlscy5weChzcGVjcy53aWR0aClcblx0XHRcdHNldEFjdGl2ZSh0YWJJbmRleClcblxuXHRiYXIuYm94LmNvbnN0cmFpbnRzID1cblx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXG5cdGlvcy5sYXlvdXQuc2V0KGJhci5ib3gpXG5cdHNldEFjdGl2ZShzZXR1cC5zdGFydClcblxuXHRiYXIudGFicyA9IHNldHVwLnRhYnNcblxuXHRyZXR1cm4gYmFyXG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHRjYXJyaWVyOlwiXCJcblx0bmV0d29yazpcIkxURVwiXG5cdGJhdHRlcnk6MTAwXG5cdHNpZ25hbDo1XG5cdHN0eWxlOlwiZGFya1wiXG5cdGNsb2NrMjQ6ZmFsc2Vcblx0dHlwZTpcInN0YXR1c0JhclwiXG5cdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdHN0YXR1c0JhciA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwic3RhdHVzQmFyLmFsbFwiXG5cdFx0c3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG5cdHN0YXR1c0Jhci50eXBlID0gc2V0dXAudHlwZVxuXHRzdGF0dXNCYXIuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MFxuXHRcdHRyYWlsaW5nOjBcblx0XHRoZWlnaHQ6MjBcblxuXHRzd2l0Y2ggaW9zLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwaG9uZS02cy1wbHVzXCJcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gNVxuXHRcdFx0QGJhdHRlcnlJY29uID0gNVxuXHRcdFx0QGJsdWV0b290aCA9IDVcblxuXHRcdHdoZW4gXCJmdWxsc2NyZWVuXCJcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gNVxuXHRcdFx0QGJhdHRlcnlJY29uID0gLSAxMlxuXHRcdFx0QGJsdWV0b290aCA9IC0gMTBcblx0XHRlbHNlXG5cdFx0XHRAdG9wQ29uc3RyYWludCA9IDNcblx0XHRcdEBiYXR0ZXJ5SWNvbiA9IDJcblx0XHRcdEBibHVldG9vdGggPSAzXG5cblx0aWYgc2V0dXAuc3R5bGUgPT0gXCJsaWdodFwiXG5cdFx0QGNvbG9yID0gXCJ3aGl0ZVwiXG5cdGVsc2Vcblx0XHRAY29sb3IgPSBcImJsYWNrXCJcblx0Zm9yIGxheWVyIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5sYXllcnNcblx0XHRpZiBsYXllci50eXBlID09IFwibG9ja1NjcmVlblwiXG5cdFx0XHRAaXNMb2NrU2NyZWVuUHV0aWxzZW50ID0gdHJ1ZVxuXHRpZiBAaXNMb2NrU2NyZWVuUHV0aWxzZW50XG5cdFx0Z3JpcHBlciA9IG5ldyBMYXllciBzdXBlckxheWVyOnN0YXR1c0Jhciwgd2lkdGg6dXRpbHMucHgoMzcpLCBoZWlnaHQ6dXRpbHMucHgoNSksIG5hbWU6XCJncmlwcGVyXCIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG9wYWNpdHk6LjUsIG5hbWU6XCJncmlwcGVyXCJcblx0XHRncmlwcGVyLmh0bWwgPSBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nI3t1dGlscy5weCgzNyl9cHgnIGhlaWdodD0nI3t1dGlscy5weCg1KX1weCcgdmlld0JveD0nMCAwIDM3IDUnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkdyaXBwZXI8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvQXV0by1Db21wbGV0ZS1CYXItQ2xvc2VkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTY5LjAwMDAwMCwgLTIuMDAwMDAwKScgZmlsbD0nI0ZGRkZGRic+XG5cdFx0XHRcdFx0XHQ8cmVjdCBpZD0nR3JpcHBlcicgeD0nMTY5LjUnIHk9JzIuNScgd2lkdGg9JzM2JyBoZWlnaHQ9JzQnIHJ4PScyLjUnPjwvcmVjdD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdFx0Z3JpcHBlci5jb25zdHJhaW50cyA9XG5cdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0dG9wOjJcblx0ZWxzZVxuXHRcdEB0aW1lID0gaW9zLnV0aWxzLmdldFRpbWUoKVxuXHRcdGlmIHNldHVwLmNsb2NrMjQgPT0gZmFsc2Vcblx0XHRcdGlmIEB0aW1lLmhvdXJzID4gMTFcblx0XHRcdFx0QHRpbWUuc3RhbXAgPSBcIlBNXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHRpbWUuc3RhbXAgPSBcIkFNXCJcblx0XHRlbHNlXG5cdFx0XHRAdGltZS5zdGFtcCA9IFwiXCJcblx0XHR0aW1lID0gbmV3IGlvcy5UZXh0IHN0eWxlOlwic3RhdHVzQmFyVGltZVwiLCB0ZXh0Omlvcy51dGlscy50aW1lRm9ybWF0dGVyKEB0aW1lLCBzZXR1cC5jbG9jazI0KSArIFwiIFwiICsgQHRpbWUuc3RhbXAsIGZvbnRTaXplOjEyLCBmb250V2VpZ2h0Olwic2VtaWJvbGRcIiwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGNvbG9yOkBjb2xvciwgbmFtZTpcInRpbWVcIlxuXHRcdHRpbWUuY29uc3RyYWludHMgPVxuXHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblx0XHRcdHRvcDpAdG9wQ29uc3RyYWludFxuXHRzaWduYWwgPSBbXVxuXHRpZiBzZXR1cC5zaWduYWwgPCAxXG5cdFx0bm9OZXR3b3JrID0gbmV3IGlvcy5UZXh0IHN1cGVyTGF5ZXI6c3RhdHVzQmFyLCBmb250U2l6ZToxMiwgdGV4dDpcIk5vIE5ldHdvcmtcIlxuXHRcdG5vTmV0d29yay5jb25zdHJhaW50cyA9XG5cdFx0XHRsZWFkaW5nOjdcblx0XHRcdHRvcDozXG5cdGVsc2Vcblx0XHRmb3IgaSBpbiBbMC4uLnNldHVwLnNpZ25hbF1cblx0XHRcdGRvdCA9IG5ldyBMYXllciBoZWlnaHQ6aW9zLnV0aWxzLnB4KDUuNSksIHdpZHRoOmlvcy51dGlscy5weCg1LjUpLCBiYWNrZ3JvdW5kQ29sb3I6XCJibGFja1wiLCBzdXBlckxheWVyOnN0YXR1c0JhciwgYm9yZGVyUmFkaXVzOmlvcy51dGlscy5weCg1LjUpLzIsIGJhY2tncm91bmRDb2xvcjpAY29sb3IsIG5hbWU6XCJzaWduYWxbI3tpfV1cIlxuXHRcdFx0aWYgaSA9PSAwXG5cdFx0XHRcdGRvdC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdFx0bGVhZGluZzo3XG5cdFx0XHRcdFx0dG9wOjdcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZG90LmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHRsZWFkaW5nOltzaWduYWxbaSAtIDEgXSwgMV1cblx0XHRcdFx0XHR0b3A6N1xuXHRcdFx0c2lnbmFsLnB1c2ggZG90XG5cdFx0XHRpb3MubGF5b3V0LnNldCgpXG5cdFx0aWYgc2V0dXAuc2lnbmFsIDwgNVxuXHRcdFx0bm9uRG90cyA9IDUgLSBzZXR1cC5zaWduYWxcblx0XHRcdGZvciBpIGluIFswLi4ubm9uRG90c11cblx0XHRcdFx0bm9uRG90ID0gbmV3IExheWVyIGhlaWdodDppb3MudXRpbHMucHgoNS41KSwgd2lkdGg6aW9zLnV0aWxzLnB4KDUuNSksIHN1cGVyTGF5ZXI6c3RhdHVzQmFyLCBib3JkZXJSYWRpdXM6aW9zLnV0aWxzLnB4KDUuNSkvMiwgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpcInNpZ25hbFsje3NpZ25hbC5sZW5ndGh9XVwiXG5cdFx0XHRcdG5vbkRvdC5zdHlsZS5ib3JkZXIgPSBcIiN7aW9zLnV0aWxzLnB4KDEpfXB4IHNvbGlkICN7QGNvbG9yfVwiXG5cdFx0XHRcdG5vbkRvdC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdFx0bGVhZGluZzpbc2lnbmFsW3NpZ25hbC5sZW5ndGggLSAxXSwgMV1cblx0XHRcdFx0XHR0b3A6N1xuXHRcdFx0XHRzaWduYWwucHVzaCBub25Eb3Rcblx0XHRcdFx0aW9zLmxheW91dC5zZXQoKVxuXHRcdGNhcnJpZXIgPSBuZXcgaW9zLlRleHQgc3R5bGU6XCJzdGF0dXNCYXJDYXJyaWVyXCIsIHRleHQ6c2V0dXAuY2Fycmllciwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGZvbnRTaXplOjEyLCBjb2xvcjpAY29sb3IsIG5hbWU6XCJjYXJyaWVyXCIsIHRleHRUcmFuc2Zvcm06XCJjYXBpdGFsaXplXCJcblx0XHRjYXJyaWVyLmNvbnN0cmFpbnRzID1cblx0XHRcdGxlYWRpbmc6W3NpZ25hbFtzaWduYWwubGVuZ3RoIC0gMV0sIDddXG5cdFx0XHR0b3A6M1xuXHRcdGlvcy5sYXlvdXQuc2V0KClcblx0XHRpZiBzZXR1cC5jYXJyaWVyXG5cdFx0XHRuZXR3b3JrID0gbmV3IGlvcy5UZXh0IHN0eWxlOlwic3RhdHVzQmFyTmV0d29ya1wiLCB0ZXh0OnNldHVwLm5ldHdvcmssIHN1cGVyTGF5ZXI6c3RhdHVzQmFyLCBmb250U2l6ZToxMiwgY29sb3I6QGNvbG9yLCBuYW1lOlwibmV0d29ya1wiLCB0ZXh0VHJhbnNmb3JtOlwidXBwZXJjYXNlXCJcblx0XHRcdG5ldHdvcmsuY29uc3RyYWludHMgPVxuXHRcdFx0XHRsZWFkaW5nOltjYXJyaWVyLCA1XVxuXHRcdFx0XHR0b3A6M1xuXG5cdFx0aWYgc2V0dXAuY2FycmllciA9PSBcIlwiIHx8IHNldHVwLmNhcnJpZXIgPT0gXCJ3aWZpXCJcblx0XHRcdG5ldHdvcmtJY29uID0gaW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLm5ldHdvcmssIEBjb2xvcilcblx0XHRcdG5ldHdvcmsgPSBuZXcgTGF5ZXIgd2lkdGg6bmV0d29ya0ljb24ud2lkdGgsIGhlaWdodDpuZXR3b3JrSWNvbi5oZWlnaHQsIHN1cGVyTGF5ZXI6c3RhdHVzQmFyLCBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiLCBuYW1lOlwibmV0d29ya1wiXG5cdFx0XHRuZXR3b3JrLmh0bWwgPSBuZXR3b3JrSWNvbi5zdmdcblx0XHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKG5ldHdvcmssIEBjb2xvcilcblx0XHRcdG5ldHdvcmsuY29uc3RyYWludHMgPVxuXHRcdFx0XHRsZWFkaW5nOltzaWduYWxbc2lnbmFsLmxlbmd0aCAtIDFdLCA1XVxuXHRcdFx0XHR0b3A6QHRvcENvbnN0cmFpbnRcblxuXHRiYXR0ZXJ5SWNvbiA9IG5ldyBMYXllciB3aWR0aDppb3MudXRpbHMucHgoMjUpLCBoZWlnaHQ6aW9zLnV0aWxzLnB4KDEwKSwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJiYXR0ZXJ5SWNvblwiXG5cdGlmIHNldHVwLmJhdHRlcnkgPiA3MFxuXHRcdGhpZ2hCYXR0ZXJ5ID0gaW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLmJhdHRlcnlIaWdoKVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBoaWdoQmF0dGVyeS5zdmdcblx0XHRpb3MudXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgQGNvbG9yKVxuXG5cdGlmIHNldHVwLmJhdHRlcnkgPD0gNzAgJiYgc2V0dXAuYmF0dGVyeSA+IDIwXG5cdFx0bWlkQmF0dGVyeSA9IGlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5iYXR0ZXJ5TWlkKVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBtaWRCYXR0ZXJ5LnN2Z1xuXHRcdGlvcy51dGlscy5jaGFuZ2VGaWxsKGJhdHRlcnlJY29uLCBAY29sb3IpXG5cblx0aWYgc2V0dXAuYmF0dGVyeSA8PSAyMFxuXHRcdGxvd0JhdHRlcnkgPSBpb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMuYmF0dGVyeUxvdylcblx0XHRiYXR0ZXJ5SWNvbi5odG1sID0gbG93QmF0dGVyeS5zdmdcblx0XHRpb3MudXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgQGNvbG9yKVxuXG5cdGJhdHRlcnlJY29uLmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZyA6IDdcblx0XHR0b3A6QGJhdHRlcnlJY29uXG5cblx0YmF0dGVyeVBlcmNlbnQgPSBuZXcgaW9zLlRleHQgc3R5bGU6XCJzdGF0dXNCYXJCYXR0ZXJ5UGVyY2VudFwiLCB0ZXh0OnNldHVwLmJhdHRlcnkgKyBcIiVcIiwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGZvbnRTaXplOjEyLCBjb2xvcjpAY29sb3IsIG5hbWU6XCJiYXR0ZXJ5UGVyY2VudFwiXG5cdGJhdHRlcnlQZXJjZW50LmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZzogW2JhdHRlcnlJY29uLCAzXVxuXHRcdHZlcnRpY2FsQ2VudGVyOnRpbWVcblxuXHRibHVldG9vdGhTVkcgPSBpb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMuYmx1ZXRvb3RoKVxuXHRibHVldG9vdGggPSBuZXcgTGF5ZXIgd2lkdGg6Ymx1ZXRvb3RoU1ZHLndpZHRoLCBoZWlnaHQ6Ymx1ZXRvb3RoU1ZHLmhlaWdodCwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIG9wYWNpdHk6LjUsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJibHVldG9vdGhcIlxuXHRibHVldG9vdGguaHRtbCA9IGJsdWV0b290aFNWRy5zdmdcblx0aW9zLnV0aWxzLmNoYW5nZUZpbGwoYmx1ZXRvb3RoLCBAY29sb3IpXG5cdGJsdWV0b290aC5jb25zdHJhaW50cyA9XG5cdFx0dG9wOiBAYmx1ZXRvb3RoXG5cdFx0dHJhaWxpbmc6IFtiYXR0ZXJ5UGVyY2VudCwgN11cblxuXHRpb3MubGF5b3V0LnNldCgpXG5cblx0IyBFeHBvcnQgc3RhdHVzQmFyXG5cdHN0YXR1c0Jhci5iYXR0ZXJ5ID0ge31cblx0c3RhdHVzQmFyLmJhdHRlcnkucGVyY2VudCA9IGJhdHRlcnlQZXJjZW50XG5cdHN0YXR1c0Jhci5iYXR0ZXJ5Lmljb24gPSBiYXR0ZXJ5SWNvblxuXHRzdGF0dXNCYXIuYmx1ZXRvb3RoID0gYmx1ZXRvb3RoXG5cdHN0YXR1c0Jhci50aW1lID0gdGltZVxuXHRzdGF0dXNCYXIubmV0d29yayA9IG5ldHdvcmtcblx0c3RhdHVzQmFyLmNhcnJpZXIgPSBjYXJyaWVyXG5cdHN0YXR1c0Jhci5zaWduYWwgPSBzaWduYWxcblx0cmV0dXJuIHN0YXR1c0JhclxuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0YWN0aW9uczpbXCJSZXBseVwiLCBcIlJlcGx5IEFsbFwiLCBcIkZvcndhcmRcIiwgXCJQcmludFwiXVxuXHRleGl0OlwiQ2FuY2VsXCJcblx0YW5pbWF0ZWQ6dHJ1ZVxuXHRkZXNjcmlwdGlvbjp1bmRlZmluZWRcblx0dGFyZ2V0OnVuZGVmaW5lZFxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gaW9zLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXHRmb3IgbCBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQubGF5ZXJzXG5cdFx0aWYgbC50eXBlID09ICdzaGVldCdcblx0XHRcdGwuZGlzbWlzcygpXG5cblx0c2hlZXQgPSBuZXcgaW9zLlZpZXdcblx0XHRuYW1lOlwic2hlZXRcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDowXG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdGJvdHRvbTowXG5cblx0c2hlZXQudHlwZSA9ICdzaGVldCdcblxuXHRzaGVldC5tZW51ID0gbmV3IExheWVyXG5cdFx0bmFtZTpcIm1lbnVcIlxuXHRcdHN1cGVyTGF5ZXI6c2hlZXRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0Ym9yZGVyUmFkaXVzOmlvcy5weCgxMilcblx0XHRjbGlwOnRydWVcblxuXHRcdGlmIGlvcy5pc1BhZCgpXG5cdFx0XHRzaGVldFRpcCA9IGlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5zaGVldFRpcClcblx0XHRcdHNoZWV0LnRpcCA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRuYW1lOicudGlwJ1xuXHRcdFx0XHRjb2xvcjonYmxhY2snXG5cdFx0XHRcdHN1cGVyTGF5ZXI6c2hlZXRcblx0XHRcdFx0aHRtbDpzaGVldFRpcC5zdmdcblx0XHRcdFx0aGVpZ2h0OnNoZWV0VGlwLmhlaWdodCAtIDRcblx0XHRcdFx0d2lkdGg6c2hlZXRUaXAud2lkdGhcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCdcblx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0aG9yaXpvbnRhbENlbnRlcjpzZXR1cC50YXJnZXRcblx0XHRcdHNoZWV0LmxpbmtlZCA9IHNldHVwLnRhcmdldFxuXHRcdFx0c2hlZXQubGlua2VkLmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRwbGFjZSA9ICh0LCBsKS0+XG5cdFx0dyA9IGlvcy5kZXZpY2Uud2lkdGhcblx0XHRoID0gaW9zLmRldmljZS5oZWlnaHRcblx0XHRjZW50ZXJYID0gdy8yXG5cdFx0IyB4IC0gYXhpc1xuXHRcdGlmIHcgLSB0LnggPiBjZW50ZXJYICNsZWZ0XG5cdFx0XHRpZiB0LnggLSBpb3MucHgoMTUwKSA8IDBcblx0XHRcdFx0bC5jb25zdHJhaW50cy5sZWFkaW5nID0gMTBcblx0XHRcdGVsc2Vcblx0XHRcdFx0bC5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyID0gdFxuXG5cdFx0ZWxzZSAjcmlnaHRcblx0XHRcdGlmIHQueCArIGlvcy5weCgxNTApID4gd1xuXHRcdFx0XHRsLmNvbnN0cmFpbnRzLnRyYWlsaW5nID0gMTBcblx0XHRcdGVsc2Vcblx0XHRcdFx0bC5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyID0gdFxuXG5cdFx0aWYgdC55ICsgbC5oZWlnaHQgPCBoICN0b3Bcblx0XHRcdFx0bC5jb25zdHJhaW50cy50b3AgPSBbdCwgNDBdXG5cdFx0XHRcdGlmIGlvcy5pc1BhZCgpXG5cdFx0XHRcdFx0c2hlZXQudGlwLmNvbnN0cmFpbnRzLmJvdHRvbSA9IFtsLCAxXVxuXHRcdGVsc2UgI2JvdHRvbVxuXHRcdFx0XHRsLmNvbnN0cmFpbnRzLmJvdHRvbSA9IFt0LCA0MF1cblx0XHRcdFx0aWYgaW9zLmlzUGFkKClcblx0XHRcdFx0XHRzaGVldC50aXAuY29uc3RyYWludHMudG9wID0gW2wsIDFdXG5cdFx0XHRcdFx0c2hlZXQudGlwLnJvdGF0aW9uID0gMTgwXG5cdFx0aWYgaW9zLmlzUGFkKClcblx0XHRcdGlvcy5sYXlvdXQuc2V0KHNoZWV0LnRpcClcblx0c2hlZXQuZGlzbWlzcyA9IC0+XG5cblx0XHRpZiBpb3MuaXNQaG9uZSgpXG5cdFx0XHRzaGVldC5tZW51LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHR5Omlvcy5kZXZpY2UuaGVpZ2h0XG5cdFx0XHRcdHRpbWU6LjI1XG5cblx0XHRcdHNoZWV0LmNhbmNlbC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0eTppb3MuZGV2aWNlLmhlaWdodCArIGlvcy5weCg3NSlcblx0XHRcdFx0dGltZTouMjVcblx0XHRcdHNoZWV0Lm92ZXJsYXkuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdG9wYWNpdHk6MFxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0VXRpbHMuZGVsYXkgLjI1LCAtPlxuXHRcdFx0XHRzaGVldC5kZXN0cm95KClcblx0XHRlbHNlXG5cdFx0XHRzaGVldC5saW5rZWQuaWdub3JlRXZlbnRzID0gZmFsc2Vcblx0XHRcdFV0aWxzLmRlbGF5IC4xNSwgLT5cblx0XHRcdFx0c2hlZXQuZGVzdHJveSgpXG5cblxuXHRzaGVldC5jYWxsID0gLT5cblx0XHRpZiBpb3MuaXNQaG9uZSgpXG5cdFx0XHRzaGVldC5tZW51LnkgPSBpb3MuZGV2aWNlLmhlaWdodFxuXHRcdFx0c2hlZXQuY2FuY2VsLnkgPSBpb3MuZGV2aWNlLmhlaWdodCArIGlvcy5weCg3NSlcblx0XHRcdHNoZWV0Lm92ZXJsYXkub3BhY2l0eSA9IDBcblxuXHRcdFx0c2hlZXQub3ZlcmxheS5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0b3BhY2l0eTouNVxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0aW9zLmxheW91dC5hbmltYXRlXG5cdFx0XHRcdHRhcmdldDpbc2hlZXQubWVudSwgc2hlZXQuY2FuY2VsXVxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdGVsc2Vcblx0XHRcdHBsYWNlKHNldHVwLnRhcmdldCwgc2hlZXQubWVudSlcblx0XHRcdGlvcy5sYXlvdXQuc2V0KHNoZWV0Lm1lbnUpXG5cblxuXG5cdGlmIGlvcy5kZXZpY2UubmFtZS5pbmRleE9mKFwiaXBhZFwiKSA9PSAtMVxuXHRcdHNoZWV0Lm92ZXJsYXkgPSBuZXcgaW9zLlZpZXdcblx0XHRcdG5hbWU6XCIub3ZlcmxheVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJibGFja1wiXG5cdFx0XHRvcGFjaXR5Oi41XG5cdFx0XHRzdXBlckxheWVyOnNoZWV0XG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0dG9wOjBcblx0XHRcdFx0bGVhZGluZzowXG5cdFx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdFx0Ym90dG9tOjBcblx0XHRzaGVldC5vdmVybGF5LnNlbmRUb0JhY2soKVxuXG5cdFx0c2hlZXQubWVudS5jb25zdHJhaW50cyA9XG5cdFx0XHRsZWFkaW5nOjEwXG5cdFx0XHR0cmFpbGluZzoxMFxuXHRcdFx0Ym90dG9tOjU3ICsgOCArIDEwXG5cdFx0XHRoZWlnaHQ6KHNldHVwLmFjdGlvbnMubGVuZ3RoKSAqIDU3XG5cblx0XHRzaGVldC5jYW5jZWwgPSBuZXcgaW9zLkJ1dHRvblxuXHRcdFx0bmFtZTpcIi5jYW5jZWxcIlxuXHRcdFx0dHlwZTpcImJpZ1wiXG5cdFx0XHR0ZXh0OnNldHVwLmV4aXRcblx0XHRcdHN1cGVyTGF5ZXI6c2hlZXRcblx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRib3R0b206MTBcblx0XHRcdFx0bGVhZGluZzowXG5cdFx0XHRcdHRyYWlsaW5nOjBcblx0XHRzaGVldC5jYW5jZWwub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0c2hlZXQuZGlzbWlzcygpXG5cdGVsc2Vcblx0XHRzaGVldC5tZW51LmNvbnN0cmFpbnRzID1cblx0XHRcdHdpZHRoOjMwMFxuXHRcdFx0aGVpZ2h0OihzZXR1cC5hY3Rpb25zLmxlbmd0aCkgKiA1N1xuXG5cdFx0c2hlZXQubWVudS5wcm9wcyA9XG5cdFx0XHRzaGFkb3dZOjJcblx0XHRcdHNoYWRvd0JsdXI6aW9zLnB4KDEwMClcblx0XHRcdHNoYWRvd0NvbG9yOlwicmdiYSgwLDAsMCwwLjEpXCJcblxuXHRpb3MubGF5b3V0LnNldChzaGVldClcblxuXHRzaGVldC5hY3Rpb25zQXJyYXkgPSBbXVxuXHRzaGVldC5hY3Rpb25zID0ge31cblx0Zm9yIGEsaSBpbiBzZXR1cC5hY3Rpb25zXG5cdFx0YWN0aW9uID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRuYW1lOiBcIi5hY3Rpb25zLltcXFwiXCIgKyBhLnRvTG93ZXJDYXNlKCkgKyBcIlxcXCJdXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjpcInJnYmEoMjU1LDI1NSwyNTUsMSlcIlxuXHRcdFx0c3VwZXJMYXllcjpzaGVldC5tZW51XG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0bGVhZGluZzowXG5cdFx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdFx0aGVpZ2h0OjU3XG5cdFx0YWN0aW9uLnN0eWxlW1wiLXdlYmtpdC1ib3gtc2hhZG93XCJdID0gXCJpbnNldCAwIDAgXCIgKyBpb3MucHgoLjUpICsgXCJweCByZ2JhKDAsMCwwLC4yNSlcIlxuXG5cdFx0YWN0aW9uLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0XHR0ZXh0OmFcblx0XHRcdGNvbG9yOmlvcy5jb2xvcihcImJsdWVcIilcblx0XHRcdGZvbnRTaXplOjIwXG5cdFx0XHRzdXBlckxheWVyOmFjdGlvblxuXHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdGFsaWduOlwiY2VudGVyXCJcblxuXHRcdGlvcy51dGlscy5zcGVjaWFsQ2hhcihhY3Rpb24ubGFiZWwpXG5cblx0XHRpZiBpID09IDBcblx0XHRcdGFjdGlvbi5jb25zdHJhaW50cy50b3AgPSAwXG5cdFx0ZWxzZVxuXHRcdFx0YWN0aW9uLmNvbnN0cmFpbnRzLnRvcCA9IHNoZWV0LmFjdGlvbnNBcnJheVtpIC0gMV1cblxuXHRcdGFjdGlvbi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdEAuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpALmJhY2tncm91bmRDb2xvci5kYXJrZW4oMTApXG5cdFx0XHRcdFx0dGltZTouMlxuXG5cdFx0YWN0aW9uLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdEAuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcInJnYmEoMjU1LDI1NSwyNTUsIC44KVwiXG5cdFx0XHRcdHRpbWU6LjJcblx0XHRcdHNoZWV0LmRpc21pc3MoKVxuXG5cblxuXHRcdGlvcy5sYXlvdXQuc2V0KGFjdGlvbilcblxuXHRcdHNoZWV0LmFjdGlvbnNBcnJheS5wdXNoIGFjdGlvblxuXHRcdHNoZWV0LmFjdGlvbnNbYS50b0xvd2VyQ2FzZSgpXSA9IGFjdGlvblxuXG5cblx0aWYgc2V0dXAuYW5pbWF0ZWRcblx0XHRzaGVldC5jYWxsKClcblx0aWYgaW9zLmlzUGFkKClcblx0XHRzaGVldC50aXAuYnJpbmdUb0Zyb250KClcblx0cmV0dXJuIHNoZWV0XG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID1cblx0dGl0bGU6XCJUaXRsZVwiXG5cdGxlZnQ6dW5kZWZpbmVkXG5cdHJpZ2h0OlwiRWRpdFwiXG5cdGJsdXI6dHJ1ZVxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHR0eXBlOlwibmF2QmFyXCJcblx0Y29sb3I6J2JsdWUnXG5cdHRpdGxlQ29sb3I6J2JsYWNrJ1xuXHRiYWNrZ3JvdW5kQ29sb3I6XCJyZ2JhKDI1NSwgMjU1LCAyNTUsIC44KVwiXG5cdGRpdmlkZXJCYWNrZ3JvdW5kQ29sb3I6XCIjZmZmXCJcblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRiYXIgPSBuZXcgaW9zLlZpZXdcblx0XHRuYW1lOlwibmF2QmFyXCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHNldHVwLmJhY2tncm91bmRDb2xvclxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHR0b3A6MFxuXHRcdFx0aGVpZ2h0OjY0XG5cblx0YmFyLmJnID0gbmV3IGlvcy5WaWV3XG5cdFx0c3VwZXJMYXllcjpiYXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J1xuXHRcdG5hbWU6XCIuYmdcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cdFx0XHRoZWlnaHQ6NDRcblx0XHRcdGJvdHRvbTowXG5cblx0YmFyLmRpdmlkZXIgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6c2V0dXAuZGl2aWRlckJhY2tncm91bmRDb2xvclxuXHRcdG5hbWU6XCIuZGl2aWRlclwiXG5cdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGhlaWdodDouNVxuXHRcdFx0Ym90dG9tOjBcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXG5cdGlmIHNldHVwLnN1cGVyTGF5ZXJcblx0XHRzZXR1cC5zdXBlckxheWVyLmFkZFN1YkxheWVyKGJhcilcblxuXG5cdGlmIHNldHVwLmJsdXJcblx0XHRpb3MudXRpbHMuYmdCbHVyKGJhcilcblxuXHRpZiBzZXR1cC5ibHVyID09IGZhbHNlICYmIHNldHVwLmJhY2tncm91bmRDb2xvciA9PSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjgpXCJcblx0XHRiYXIuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJ1xuXG5cdGJhci50eXBlID0gc2V0dXAudHlwZVxuXG5cdGZvciBsYXllciBpbiBGcmFtZXIuQ3VycmVudENvbnRleHQubGF5ZXJzXG5cdFx0aWYgbGF5ZXIudHlwZSA9PSBcInN0YXR1c0JhclwiXG5cdFx0XHRAc3RhdHVzQmFyID0gbGF5ZXJcblx0XHRcdGJhci5wbGFjZUJlaGluZChAc3RhdHVzQmFyKVxuXG5cblx0aWYgdHlwZW9mIHNldHVwLnRpdGxlID09IFwib2JqZWN0XCJcblx0XHRzZXR1cC50aXRsZSA9IHNldHVwLnRpdGxlLmxhYmVsLmh0bWxcblxuXG5cdGJhci50aXRsZSA9IG5ldyBpb3MuVGV4dFxuXHRcdGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiXG5cdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHR0ZXh0OnNldHVwLnRpdGxlXG5cdFx0bmFtZTpcIi50aXRsZVwiXG5cdFx0Y29sb3I6c2V0dXAudGl0bGVDb2xvclxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblx0XHRcdGJvdHRvbToxMlxuXG5cdGlvcy51dGlscy5zcGVjaWFsQ2hhcihiYXIudGl0bGUpXG5cblx0IyBIYW5kbGUgUmlnaHRcblx0aWYgdHlwZW9mIHNldHVwLnJpZ2h0ID09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHNldHVwLnJpZ2h0ICE9IFwiYm9vbGVhblwiXG5cdFx0YmFyLnJpZ2h0ID0gbmV3IGlvcy5CdXR0b25cblx0XHRcdG5hbWU6XCIucmlnaHRcIlxuXHRcdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHRcdHRleHQ6c2V0dXAucmlnaHRcblx0XHRcdGNvbG9yOnNldHVwLmNvbG9yXG5cdFx0XHRmb250V2VpZ2h0OjUwMFxuXHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdGJvdHRvbToxMlxuXHRcdFx0XHR0cmFpbGluZzo4XG5cdFx0YmFyLnJpZ2h0LnR5cGUgPSBcImJ1dHRvblwiXG5cdFx0aW9zLnV0aWxzLnNwZWNpYWxDaGFyKGJhci5yaWdodClcblx0aWYgdHlwZW9mIHNldHVwLnJpZ2h0ID09IFwib2JqZWN0XCJcblx0XHRiYXIucmlnaHQgPSBzZXR1cC5yaWdodFxuXHRcdGJhci5yaWdodC5uYW1lID0gXCIucmlnaHRcIlxuXHRcdGJhci5yaWdodC5zdXBlckxheWVyID0gYmFyLmJnXG5cdFx0YmFyLnJpZ2h0LmNvbnN0cmFpbnRzID1cblx0XHRcdHRyYWlsaW5nOjhcblx0XHRcdGJvdHRvbToxMlxuXHRcdGlvcy5sYXlvdXQuc2V0KGJhci5yaWdodClcblxuXHQjIEhhbmRsZSBMZWZ0XG5cdGlmIHR5cGVvZiBzZXR1cC5sZWZ0ID09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHNldHVwLmxlZnQgIT0gXCJib29sZWFuXCJcblx0XHRzZXRMZWFkaW5nID0gOFxuXHRcdGlmIHNldHVwLmxlZnQuaW5kZXhPZihcIjxcIikgIT0gLTFcblx0XHRcdHN2ZyA9IGlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5jaGV2cm9uKVxuXHRcdFx0YmFyLmNoZXZyb24gPSBuZXcgaW9zLlZpZXdcblx0XHRcdFx0bmFtZTpcIi5jaGV2cm9uXCJcblx0XHRcdFx0d2lkdGg6c3ZnLndpZHRoXG5cdFx0XHRcdGhlaWdodDpzdmcuaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRcdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHRcdGJhci5jaGV2cm9uLmh0bWwgPSBzdmcuc3ZnXG5cdFx0XHRiYXIuY2hldnJvbi5jb25zdHJhaW50cyA9XG5cdFx0XHRcdFx0Ym90dG9tOjlcblx0XHRcdFx0XHRsZWFkaW5nOjhcblx0XHRcdHNldHVwLmxlZnQgPSBzZXR1cC5sZWZ0LnJlcGxhY2UoXCI8XCIsIFwiXCIpXG5cdFx0XHRpb3MudXRpbHMuY2hhbmdlRmlsbChiYXIuY2hldnJvbiwgc2V0dXAuY29sb3IpXG5cdFx0XHRzZXRMZWFkaW5nID0gW2Jhci5jaGV2cm9uLCA0XVxuXHRcdFx0aW9zLmxheW91dC5zZXQoYmFyLmNoZXZyb24pXG5cblx0XHRiYXIubGVmdCA9IG5ldyBpb3MuQnV0dG9uXG5cdFx0XHRuYW1lOlwiLmxlZnRcIlxuXHRcdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHRcdHRleHQ6c2V0dXAubGVmdFxuXHRcdFx0Y29sb3I6c2V0dXAuY29sb3Jcblx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0Ym90dG9tOjEyXG5cdFx0XHRcdGxlYWRpbmc6c2V0TGVhZGluZ1xuXHRcdGJhci5sZWZ0LnR5cGUgPSBcImJ1dHRvblwiXG5cdFx0aW9zLnV0aWxzLnNwZWNpYWxDaGFyKGJhci5sZWZ0KVxuXG5cdFx0YmFyLmxlZnQub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRpZiBiYXIuY2hldnJvblxuXHRcdFx0XHRiYXIuY2hldnJvbi5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczoob3BhY2l0eTouMjUpXG5cdFx0XHRcdFx0dGltZTouNVxuXHRcdGJhci5sZWZ0Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdGlmIGJhci5jaGV2cm9uXG5cdFx0XHRcdGJhci5jaGV2cm9uLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5OjEpXG5cdFx0XHRcdFx0dGltZTouNVxuXG5cdGlmIHR5cGVvZiBzZXR1cC5sZWZ0ID09IFwib2JqZWN0XCJcblx0XHRiYXIubGVmdCA9IHNldHVwLmxlZnRcblx0XHRiYXIubGVmdC5uYW1lID0gXCIubGVmdFwiXG5cdFx0YmFyLmxlZnQuc3VwZXJMYXllciA9IGJhci5iZ1xuXHRcdGJhci5sZWZ0LmNvbnN0cmFpbnRzID1cblx0XHRcdGxlYWRpbmc6OFxuXHRcdFx0Ym90dG9tOjEyXG5cblx0aW9zLmxheW91dC5zZXQoYmFyLmxlZnQpXG5cdHJldHVybiBiYXJcbiIsImlvcyA9IHJlcXVpcmUgXCJpb3Mta2l0XCJcblxuIyBCdWlsZCBMaWJyYXJ5ICBQcm9wZXJ0aWVzXG5sYXllciA9IG5ldyBMYXllclxuZXhwb3J0cy5sYXllclByb3BzID0gT2JqZWN0LmtleXMobGF5ZXIucHJvcHMpXG5leHBvcnRzLmxheWVyUHJvcHMucHVzaCBcInN1cGVyTGF5ZXJcIlxuZXhwb3J0cy5sYXllclByb3BzLnB1c2ggXCJjb25zdHJhaW50c1wiXG5leHBvcnRzLmxheWVyU3R5bGVzID0gT2JqZWN0LmtleXMobGF5ZXIuc3R5bGUpXG5sYXllci5kZXN0cm95KClcblxuZXhwb3J0cy5hc3NldHMgPSB7XG5cdHNoZWV0VGlwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzI3cHgnIGhlaWdodD0nMTNweCcgdmlld0JveD0nMCAwIDI3IDEzJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+VHJpYW5nbGU8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz48L2RlZnM+XG5cdCAgICA8ZyBpZD0naU9TLUtpdCcgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J05hdmlnYXRpb24tQmFyLUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNjM0LjAwMDAwMCwgLTEyNC4wMDAwMDApJyBmaWxsPScjRkZGRkZGJz5cblx0ICAgICAgICAgICAgPHBhdGggZD0nTTI2NDQuNzE5MTYsMTI1Ljg4MzgzNCBDMjY0Ni4yNTQ5OCwxMjQuMjkxMTM2IDI2NDguNzQ1ODUsMTI0LjI5MTk5MiAyNjUwLjI4MDg0LDEyNS44ODM4MzQgTDI2NjEsMTM3IEwyNjM0LDEzNyBMMjY0NC43MTkxNiwxMjUuODgzODM0IFonIGlkPSdUcmlhbmdsZSc+PC9wYXRoPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0Ymx1ZXRvb3RoOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzdweCcgaGVpZ2h0PScxM3B4JyB2aWV3Qm94PScwIDAgOCAxNScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdDx0aXRsZT5CbHVldG9vdGg8L3RpdGxlPlxuXHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdTdGF0dXMtSWNvbnMtKFdoaXRlKScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTEzNy4wMDAwMDAsIDAuMDAwMDAwKScgZmlsbD0nI0ZGRic+XG5cdFx0XHRcdFx0PHBhdGggZD0nTTE0MC41LDE0LjUgTDE0NSwxMC4yNSBMMTQxLjgsNy41IEwxNDUsNC43NSBMMTQwLjUsMC41IEwxNDAuNSw2LjA3MTQyODU3IEwxMzcuOCwzLjc1IEwxMzcsNC41IEwxNDAuMjU4MzMzLDcuMzc1IEwxMzcsMTAuMjUgTDEzNy44LDExIEwxNDAuNSw4LjY3ODU3MTQzIEwxNDAuNSwxNC41IFogTTE0MS41LDMgTDE0My4zNjY2NjcsNC43NSBMMTQxLjUsNi4yNSBMMTQxLjUsMyBaIE0xNDEuNSw4LjUgTDE0My4zNjY2NjcsMTAuMjUgTDE0MS41LDEyIEwxNDEuNSw4LjUgWicgaWQ9J0JsdWV0b290aCc+PC9wYXRoPlxuXHRcdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XCJcblx0YmF0dGVyeUhpZ2ggOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzI1cHgnIGhlaWdodD0nMTBweCcgdmlld0JveD0nMCAwIDI1IDEwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0ICAgIDx0aXRsZT5CYXR0ZXJ5PC90aXRsZT5cblx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHQgICAgPGcgaWQ9J1N5bWJvbHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdCAgICAgICAgPGcgaWQ9J1N0YXR1cy1CYXIvQmxhY2svMTAwJScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTM0NS4wMDAwMDAsIC01LjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J00zNDYuNDkzNzEzLDUuNSBDMzQ1LjY2ODc1OCw1LjUgMzQ1LDYuMTY4MDIxNTUgMzQ1LDcuMDA1MzAzMjQgTDM0NSwxMy40OTQ2OTY4IEMzNDUsMTQuMzI2MDUyOCAzNDUuNjczMzgsMTUgMzQ2LjQ5MzcxMywxNSBMMzY2LjAwNjI4NywxNSBDMzY2LjgzMTI0MiwxNSAzNjcuNSwxNC4zMzE5Nzg0IDM2Ny41LDEzLjQ5NDY5NjggTDM2Ny41LDcuMDA1MzAzMjQgQzM2Ny41LDYuMTczOTQ3MjIgMzY2LjgyNjYyLDUuNSAzNjYuMDA2Mjg3LDUuNSBMMzQ2LjQ5MzcxMyw1LjUgWiBNMzY4LDguNSBMMzY4LDEyIEwzNjguNzUsMTIgQzM2OS4xNjQyMTQsMTIgMzY5LjUsMTEuNjY0NDA1MyAzNjkuNSwxMS4yNTc3NCBMMzY5LjUsOS4yNDIyNTk5OCBDMzY5LjUsOC44MzIzMjExMSAzNjkuMTY3MTAxLDguNSAzNjguNzUsOC41IEwzNjgsOC41IFogTTM0Ni41MDgxNTIsNiBDMzQ1Ljk1MTM2NSw2IDM0NS41LDYuNDU2OTk2OTIgMzQ1LjUsNy4wMDg0NDA1NSBMMzQ1LjUsMTMuNDkxNTU5NCBDMzQ1LjUsMTQuMDQ4NTA1OCAzNDUuOTQ5MDU4LDE0LjUgMzQ2LjUwODE1MiwxNC41IEwzNjUuOTkxODQ4LDE0LjUgQzM2Ni41NDg2MzUsMTQuNSAzNjcsMTQuMDQzMDAzMSAzNjcsMTMuNDkxNTU5NCBMMzY3LDcuMDA4NDQwNTUgQzM2Nyw2LjQ1MTQ5NDIyIDM2Ni41NTA5NDIsNiAzNjUuOTkxODQ4LDYgTDM0Ni41MDgxNTIsNiBaIE0zNDYuNTA2NzQ0LDYuNSBDMzQ2LjIyNjg3Nyw2LjUgMzQ2LDYuNzE2MzcyMDEgMzQ2LDYuOTkyMDk1OTUgTDM0NiwxMy41MDc5MDQxIEMzNDYsMTMuNzc5NjgxMSAzNDYuMjMwMjI1LDE0IDM0Ni41MDY3NDQsMTQgTDM2NS45OTMyNTYsMTQgQzM2Ni4yNzMxMjMsMTQgMzY2LjUsMTMuNzgzNjI4IDM2Ni41LDEzLjUwNzkwNDEgTDM2Ni41LDYuOTkyMDk1OTUgQzM2Ni41LDYuNzIwMzE4ODYgMzY2LjI2OTc3NSw2LjUgMzY1Ljk5MzI1Niw2LjUgTDM0Ni41MDY3NDQsNi41IFonIGlkPSdCYXR0ZXJ5Jz48L3BhdGg+XG5cdFx0ICAgICAgICA8L2c+XG5cdFx0ICAgIDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHRiYXR0ZXJ5TWlkIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScyNXB4JyBoZWlnaHQ9JzEwcHgnIHZpZXdCb3g9JzAgMCAyNSAxMCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdCAgICA8dGl0bGU+QmF0dGVyeTwvdGl0bGU+XG5cdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0ICAgIDxnIGlkPSdTeW1ib2xzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0XHQgICAgICAgIDxnIGlkPSdTdGF0dXMtQmFyL0JsYWNrL0xvdy1Qb3dlcicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTM0NS4wMDAwMDAsIC01LjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J00zNDYuNDkzNzEzLDUuNSBDMzQ1LjY2ODc1OCw1LjUgMzQ1LDYuMTY4MDIxNTUgMzQ1LDcuMDA1MzAzMjQgTDM0NSwxMy40OTQ2OTY4IEMzNDUsMTQuMzI2MDUyOCAzNDUuNjczMzgsMTUgMzQ2LjQ5MzcxMywxNSBMMzY2LjAwNjI4NywxNSBDMzY2LjgzMTI0MiwxNSAzNjcuNSwxNC4zMzE5Nzg0IDM2Ny41LDEzLjQ5NDY5NjggTDM2Ny41LDcuMDA1MzAzMjQgQzM2Ny41LDYuMTczOTQ3MjIgMzY2LjgyNjYyLDUuNSAzNjYuMDA2Mjg3LDUuNSBMMzQ2LjQ5MzcxMyw1LjUgWiBNMzY4LDguNSBMMzY4LDEyIEwzNjguNzUsMTIgQzM2OS4xNjQyMTQsMTIgMzY5LjUsMTEuNjY0NDA1MyAzNjkuNSwxMS4yNTc3NCBMMzY5LjUsOS4yNDIyNTk5OCBDMzY5LjUsOC44MzIzMjExMSAzNjkuMTY3MTAxLDguNSAzNjguNzUsOC41IEwzNjgsOC41IFogTTM0Ni41MDgxNTIsNiBDMzQ1Ljk1MTM2NSw2IDM0NS41LDYuNDU2OTk2OTIgMzQ1LjUsNy4wMDg0NDA1NSBMMzQ1LjUsMTMuNDkxNTU5NCBDMzQ1LjUsMTQuMDQ4NTA1OCAzNDUuOTQ5MDU4LDE0LjUgMzQ2LjUwODE1MiwxNC41IEwzNjUuOTkxODQ4LDE0LjUgQzM2Ni41NDg2MzUsMTQuNSAzNjcsMTQuMDQzMDAzMSAzNjcsMTMuNDkxNTU5NCBMMzY3LDcuMDA4NDQwNTUgQzM2Nyw2LjQ1MTQ5NDIyIDM2Ni41NTA5NDIsNiAzNjUuOTkxODQ4LDYgTDM0Ni41MDgxNTIsNiBaIE0zNDYuNTA5NjUsNi41IEMzNDYuMjI4MTc4LDYuNSAzNDYsNi43MTYzNzIwMSAzNDYsNi45OTIwOTU5NSBMMzQ2LDEzLjUwNzkwNDEgQzM0NiwxMy43Nzk2ODExIDM0Ni4yMjc2NTMsMTQgMzQ2LjUwOTY1LDE0IEwzNTYsMTQgTDM1Niw2LjUgTDM0Ni41MDk2NSw2LjUgWicgaWQ9J0JhdHRlcnknPjwvcGF0aD5cblx0XHQgICAgICAgIDwvZz5cblx0XHQgICAgPC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGJhdHRlcnlMb3cgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzI1cHgnIGhlaWdodD0nMTBweCcgdmlld0JveD0nMCAwIDI1IDEwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0ICAgIDx0aXRsZT5CYXR0ZXJ5PC90aXRsZT5cblx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHQgICAgPGcgaWQ9J1N5bWJvbHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdCAgICAgICAgPGcgaWQ9J1N0YXR1cy1CYXIvQmxhY2svMjAlJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMzQ1LjAwMDAwMCwgLTUuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTM0Ni40OTM3MTMsNS41IEMzNDUuNjY4NzU4LDUuNSAzNDUsNi4xNjgwMjE1NSAzNDUsNy4wMDUzMDMyNCBMMzQ1LDEzLjQ5NDY5NjggQzM0NSwxNC4zMjYwNTI4IDM0NS42NzMzOCwxNSAzNDYuNDkzNzEzLDE1IEwzNjYuMDA2Mjg3LDE1IEMzNjYuODMxMjQyLDE1IDM2Ny41LDE0LjMzMTk3ODQgMzY3LjUsMTMuNDk0Njk2OCBMMzY3LjUsNy4wMDUzMDMyNCBDMzY3LjUsNi4xNzM5NDcyMiAzNjYuODI2NjIsNS41IDM2Ni4wMDYyODcsNS41IEwzNDYuNDkzNzEzLDUuNSBMMzQ2LjQ5MzcxMyw1LjUgWiBNMzY4LDguNSBMMzY4LDEyIEwzNjguNzUsMTIgQzM2OS4xNjQyMTQsMTIgMzY5LjUsMTEuNjY0NDA1MyAzNjkuNSwxMS4yNTc3NCBMMzY5LjUsOS4yNDIyNTk5OCBDMzY5LjUsOC44MzIzMjExMSAzNjkuMTY3MTAxLDguNSAzNjguNzUsOC41IEwzNjgsOC41IEwzNjgsOC41IFogTTM0Ni41MDgxNTIsNiBDMzQ1Ljk1MTM2NSw2IDM0NS41LDYuNDU2OTk2OTIgMzQ1LjUsNy4wMDg0NDA1NSBMMzQ1LjUsMTMuNDkxNTU5NCBDMzQ1LjUsMTQuMDQ4NTA1OCAzNDUuOTQ5MDU4LDE0LjUgMzQ2LjUwODE1MiwxNC41IEwzNjUuOTkxODQ4LDE0LjUgQzM2Ni41NDg2MzUsMTQuNSAzNjcsMTQuMDQzMDAzMSAzNjcsMTMuNDkxNTU5NCBMMzY3LDcuMDA4NDQwNTUgQzM2Nyw2LjQ1MTQ5NDIyIDM2Ni41NTA5NDIsNiAzNjUuOTkxODQ4LDYgTDM0Ni41MDgxNTIsNiBaIE0zNDYuNDkwNDc5LDYuNSBDMzQ2LjIxOTU5NSw2LjUgMzQ2LDYuNzE2MzcyMDEgMzQ2LDYuOTkyMDk1OTUgTDM0NiwxMy41MDc5MDQxIEMzNDYsMTMuNzc5NjgxMSAzNDYuMjE1MDU3LDE0IDM0Ni40OTA0NzksMTQgTDM1MCwxNCBMMzUwLDYuNSBMMzQ2LjQ5MDQ3OSw2LjUgWicgaWQ9J0JhdHRlcnknPjwvcGF0aD5cblx0XHQgICAgICAgIDwvZz5cblx0XHQgICAgPC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGJhbm5lckJHIDoge1xuXHRcdFwiaXBob25lLTVcIjogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzMyMHB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCAzMjAgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0ICAgIDx0aXRsZT5pcGhvbmU1PC90aXRsZT5cblx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0ICAgICAgICA8ZyBpZD0naVBob25lLTUvNVMvNUMnIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTAsMCBMMzIwLDAgTDMyMCw2OCBMMCw2OCBMMCwwIFogTTE0Miw2MS4wMDQ4ODE1IEMxNDIsNTkuODk3NjE2IDE0Mi44OTYyNzksNTkgMTQ0LjAwMjQsNTkgTDE3Ni45OTc2LDU5IEMxNzguMTAzNDk1LDU5IDE3OSw1OS44OTM4OTk4IDE3OSw2MS4wMDQ4ODE1IEwxNzksNjEuOTk1MTE4NSBDMTc5LDYzLjEwMjM4NCAxNzguMTAzNzIxLDY0IDE3Ni45OTc2LDY0IEwxNDQuMDAyNCw2NCBDMTQyLjg5NjUwNSw2NCAxNDIsNjMuMTA2MTAwMiAxNDIsNjEuOTk1MTE4NSBMMTQyLDYxLjAwNDg4MTUgWicgaWQ9J2lwaG9uZTUnPjwvcGF0aD5cblx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0ICAgIDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGhvbmUtNnNcIjogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMzc1cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDM3NSA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNiAoMjYzMDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdDx0aXRsZT5Ob3RpZmljYXRpb24gYmFja2dyb3VuZDwvdGl0bGU+XG5cdFx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdFx0XHRcdDxnIGlkPSdpT1M4LVB1c2gtTm90aWZpY2F0aW9uJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNTguMDAwMDAwLCAtMjMuMDAwMDAwKScgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHRcdFx0XHRcdDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDU4LjAwMDAwMCwgNy4wMDAwMDApJyBpZD0nTm90aWZpY2F0aW9uLWNvbnRhaW5lcic+XG5cdFx0XHRcdFx0XHRcdFx0PGc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMCwxNiBMMzc1LDE2IEwzNzUsODQgTDAsODQgTDAsMTYgWiBNMTY5LDc3LjAwNDg4MTUgQzE2OSw3NS44OTc2MTYgMTY5Ljg5NjI3OSw3NSAxNzEuMDAyNCw3NSBMMjAzLjk5NzYsNzUgQzIwNS4xMDM0OTUsNzUgMjA2LDc1Ljg5Mzg5OTggMjA2LDc3LjAwNDg4MTUgTDIwNiw3Ny45OTUxMTg1IEMyMDYsNzkuMTAyMzg0IDIwNS4xMDM3MjEsODAgMjAzLjk5NzYsODAgTDE3MS4wMDI0LDgwIEMxNjkuODk2NTA1LDgwIDE2OSw3OS4xMDYxMDAyIDE2OSw3Ny45OTUxMTg1IEwxNjksNzcuMDA0ODgxNSBaJyBpZD0nTm90aWZpY2F0aW9uLWJhY2tncm91bmQnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGhvbmUtNnMtcGx1c1wiIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nNDE0cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDQxNCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYgKDI2MzA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPk5vdGlmaWNhdGlvbiBiYWNrZ3JvdW5kIENvcHk8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lPUzgtUHVzaC1Ob3RpZmljYXRpb24nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00My4wMDAwMDAsIC03NC4wMDAwMDApJyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0XHRcdDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQzLjAwMDAwMCwgNzQuMDAwMDAwKScgaWQ9J05vdGlmaWNhdGlvbi1jb250YWluZXInPlxuXHRcdFx0XHRcdFx0XHQ8Zz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMCwwIEw0MTQsMCBMNDE0LDY4IEwwLDY4IEwwLDAgWiBNMTg5LDYxLjAwNDg4MTUgQzE4OSw1OS44OTc2MTYgMTg5Ljg5NjI3OSw1OSAxOTEuMDAyNCw1OSBMMjIzLjk5NzYsNTkgQzIyNS4xMDM0OTUsNTkgMjI2LDU5Ljg5Mzg5OTggMjI2LDYxLjAwNDg4MTUgTDIyNiw2MS45OTUxMTg1IEMyMjYsNjMuMTAyMzg0IDIyNS4xMDM3MjEsNjQgMjIzLjk5NzYsNjQgTDE5MS4wMDI0LDY0IEMxODkuODk2NTA1LDY0IDE4OSw2My4xMDYxMDAyIDE4OSw2MS45OTUxMTg1IEwxODksNjEuMDA0ODgxNSBaJyBpZD0nTm90aWZpY2F0aW9uLWJhY2tncm91bmQtQ29weSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBhZFwiIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nNzY4cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDc2OCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0ICAgIDx0aXRsZT5pcGFkLXBvcnRyYWl0PC90aXRsZT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHQgICAgICAgIDxnIGlkPSdpUGFkLVBvcnRyYWl0JyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTAsMCBMNzY4LDAgTDc2OCw2OCBMMCw2OCBMMCwwIFogTTM2Niw2MS4wMDQ4ODE1IEMzNjYsNTkuODk3NjE2IDM2Ni44OTYyNzksNTkgMzY4LjAwMjQsNTkgTDQwMC45OTc2LDU5IEM0MDIuMTAzNDk1LDU5IDQwMyw1OS44OTM4OTk4IDQwMyw2MS4wMDQ4ODE1IEw0MDMsNjEuOTk1MTE4NSBDNDAzLDYzLjEwMjM4NCA0MDIuMTAzNzIxLDY0IDQwMC45OTc2LDY0IEwzNjguMDAyNCw2NCBDMzY2Ljg5NjUwNSw2NCAzNjYsNjMuMTA2MTAwMiAzNjYsNjEuOTk1MTE4NSBMMzY2LDYxLjAwNDg4MTUgWicgaWQ9J2lwYWQtcG9ydHJhaXQnPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGFkLXByb1wiIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMTAyNHB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCAxMDI0IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPHRpdGxlPmlwYWQtcHJvLXBvcnRyYWl0PC90aXRsZT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHQgICAgICAgIDxnIGlkPSdpUGFkLVByby1Qb3J0cmFpdCcgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J00wLDAgTDEwMjQsMCBMMTAyNCw2OCBMMCw2OCBMMCwwIFogTTQ5NCw2MS4wMDQ4ODE1IEM0OTQsNTkuODk3NjE2IDQ5NC44OTYyNzksNTkgNDk2LjAwMjQsNTkgTDUyOC45OTc2LDU5IEM1MzAuMTAzNDk1LDU5IDUzMSw1OS44OTM4OTk4IDUzMSw2MS4wMDQ4ODE1IEw1MzEsNjEuOTk1MTE4NSBDNTMxLDYzLjEwMjM4NCA1MzAuMTAzNzIxLDY0IDUyOC45OTc2LDY0IEw0OTYuMDAyNCw2NCBDNDk0Ljg5NjUwNSw2NCA0OTQsNjMuMTA2MTAwMiA0OTQsNjEuOTk1MTE4NSBMNDk0LDYxLjAwNDg4MTUgWicgaWQ9J2lwYWQtcHJvLXBvcnRyYWl0Jz48L3BhdGg+XG5cdFx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHR9XG5cdGVtb2ppQ29kZXM6IFtcIjk4IDgwXCIsIFwiOTggQUNcIiwgXCI5OCA4MVwiLCBcIjk4IDgyXCIsIFwiOTggODNcIiwgXCI5OCA4NFwiLCBcIjk4IDg1XCIsIFwiOTggODZcIiwgXCI5OCA4N1wiLCBcIjk4IDg5XCIsIFwiOTggOGFcIiwgXCI5OSA4MlwiLCBcIjk5IDgzXCIsIFwiRTIgOTggQkEgRUYgQjggOEZcIiwgXCI5OCA4QlwiICwgXCI5OCA4Q1wiLCBcIjk4IDhEXCIsIFwiOTggOThcIiwgXCI5OCA5N1wiLCBcIjk4IDk5XCIsIFwiOTggOUFcIiwgXCI5OCA5Q1wiLCBcIjk4IDlEXCIsIFwiOTggOUJcIiwgXCJBNCA5MVwiLCBcIkE0IDkzXCIsIFwiOTggOEVcIiwgXCJBNCA5N1wiLCBcIjk4IDhGXCIsIFwiOTggQjZcIiwgXCI5OCA5MFwiLCBcIjk4IDkxXCIsIFwiOTggOTJcIiwgXCI5OSA4NFwiLCBcIkE0IDk0XCIsIFwiOTggQjNcIiwgXCI5OCA5RVwiLCBcIjk4IDlGXCIsIFwiOTggQTBcIiwgXCI5OCBBMVwiLCBcIjk4IDk0XCIsIFwiOTggOTVcIiwgXCI5OSA4MVwiLCBcIkUyIDk4IEI5IEVGIEI4IDhGXCIsIFwiOTggQTNcIiwgXCI5OCA5NlwiLCBcIjk4IEFCXCIsIFwiOTggQTlcIiwgXCI5OCBBNFwiLCBcIjk4IEFFXCIsIFwiOTggQjFcIiwgXCI5OCBBOFwiLCBcIjk4IEIwXCIsIFwiOTggQUZcIiwgXCI5OCBBNlwiLCBcIjk4IEE3XCIsIFwiOTggQTJcIiwgXCI5OCBBNVwiLCBcIjk4IEFBXCIsIFwiOTggOTNcIiwgXCI5OCBBRFwiLCBcIjk4IEI1XCIsIFwiOTggQjJcIiwgXCJBNCA5MFwiLCBcIjk4IEI3XCIsIFwiQTQgOTJcIiwgXCJBNCA5NVwiLCBcIjk4IEI0XCIsIFwiOTIgQTRcIiwgXCI5MiBBOVwiLCBcIjk4IDg4XCIsIFwiOTEgQkZcIiwgXCI5MSBCOVwiLCBcIjkxIEJBXCIsIFwiOTIgODBcIiwgXCI5MSBCQlwiLCBcIjkxIEJEXCIsIFwiQTQgOTZcIiwgXCI5OCBCQVwiLCBcIjk4IEI4XCIsIFwiOTggQjlcIiwgXCI5OCBCQlwiLCBcIjk4IEJDXCIsIFwiOTggQkRcIiwgXCI5OSA4MFwiLCBcIjk4IEJGXCIsIFwiOTggQkVcIiwgXCI5OSA4Q1wiLCBcIjkxIDhGXCIsIFwiOTEgOEJcIiwgXCI5MSA4RFwiLCBcIjkxIDhFXCIsIFwiOTEgOEFcIiwgXCJFMiA5QyA4QVwiLCBcIkUyIDlDIDhDIEVGIEI4IDhGXCIsIFwiOTEgOENcIiwgXCJFMiA5QyA4QlwiLCBcIjkxIDkwXCIsIFwiOTIgQUFcIiwgXCI5OSA4RlwiLCBcIkUyIDk4IDlEIEVGIEI4IDhGXCIsIFwiOTEgODZcIiwgXCI5MSA4N1wiLCBcIjkxIDg4XCIsIFwiOTEgODlcIiwgXCI5NiA5NVwiLCBcIjk2IDkwXCIsIFwiQTQgOThcIiwgXCI5NiA5NlwiLCBcIkUyIDlDIDhEIEVGIEI4IDhGXCIsIFwiOTIgODVcIiwgXCI5MSA4NFwiLCBcIjkxIDg1XCIsIFwiOTEgODJcIiwgXCI5MSA4M1wiLCBcIjkxIDgxXCIsIFwiOTEgODBcIiwgXCI5MSBBNFwiLCBcIjkxIEE1XCIsIFwiOTcgQTNcIiwgXCI5MSBCNlwiLCBcIjkxIEE2XCIsIFwiOTEgQTdcIiwgXCI5MSBBOFwiLCBcIjkxIEE5XCIsIFwiOTEgQjFcIiwgXCI5MSBCNFwiLCBcIjkxIEI1XCIsIFwiOTEgQjJcIiwgXCI5MSBCM1wiLCBcIjkxIEFFXCIsIFwiOTEgQjdcIiwgXCI5MiA4MlwiLCBcIjk1IEI1XCIsIFwiOEUgODVcIiwgXCI5MSBCQ1wiLCBcIjkxIEI4XCIsIFwiOTEgQjBcIiwgXCI5QSBCNlwiLCBcIjhGIDgzXCIsIFwiOTIgODNcIiwgXCI5MSBBRlwiLCBcIjkxIEFCXCIsIFwiOTEgQUNcIiwgXCI5MSBBRFwiLCBcIjk5IDg3XCIsIFwiOTIgODFcIiwgXCI5OSA4NVwiLCBcIjk5IDg2XCIsIFwiOTkgOEJcIiwgXCI5OSA4RVwiLCBcIjk5IDhEXCIsIFwiOTIgODdcIiwgXCI5MiA4NlwiLCBcIjkyIDkxXCIsIFwiOTEgQTkgRTIgODAgOEQgRTIgOUQgQTQgRUYgQjggOEYgRTIgODAgOEQgRjAgOUYgOTEgQTlcIiwgXCI5MSBBOCBFMiA4MCA4RCBFMiA5RCBBNCBFRiBCOCA4RiBFMiA4MCA4RCBGMCA5RiA5MSBBOFwiLCBcIjkyIDhGXCIsIFwiOTEgQTkgRTIgODAgOEQgRTIgOUQgQTQgRUYgQjggOEYgRTIgODAgOEQgRjAgOUYgOTIgOEIgRTIgODAgOEQgRjAgOUYgOTEgQTlcIiwgXCI5MSBBOCBFMiA4MCA4RCBFMiA5RCBBNCBFRiBCOCA4RiBFMiA4MCA4RCBGMCA5RiA5MiA4QiBFMiA4MCA4RCBGMCA5RiA5MSBBOFwiLCBcIjkxIEFBXCIsIFwiOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTdcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBNyBFMiA4MCA4RCBGMCA5RiA5MSBBNlwiLCBcIjkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE2IEUyIDgwIDhEIEYwIDlGIDkxIEE2XCIsIFwiOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTcgRTIgODAgOEQgRjAgOUYgOTEgQTdcIiwgXCI5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBNlwiLCBcIjkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE3XCIsIFwiOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTkgRTIgODAgOEQgRjAgOUYgOTEgQTcgRTIgODAgOEQgRjAgOUYgOTEgQTZcIiwgXCI5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBOSBFMiA4MCA4RCBGMCA5RiA5MSBBNiBFMiA4MCA4RCBGMCA5RiA5MSBBNlwiLCBcIjkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE5IEUyIDgwIDhEIEYwIDlGIDkxIEE3IEUyIDgwIDhEIEYwIDlGIDkxIEE3XCIsIFwiOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTZcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBN1wiLCBcIjkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE4IEUyIDgwIDhEIEYwIDlGIDkxIEE3IEUyIDgwIDhEIEYwIDlGIDkxIEE2XCIsIFwiOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTggRTIgODAgOEQgRjAgOUYgOTEgQTYgRTIgODAgOEQgRjAgOUYgOTEgQTZcIiwgXCI5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBOCBFMiA4MCA4RCBGMCA5RiA5MSBBNyBFMiA4MCA4RCBGMCA5RiA5MSBBN1wiLCBcIjkxIDlBXCIsIFwiOTEgOTVcIiwgXCI5MSA5NlwiLCBcIjkxIDk0XCIsIFwiOTEgOTdcIiwgXCI5MSA5OVwiLCBcIjkxIDk4XCIsIFwiOTIgODRcIiwgXCI5MiA4QlwiLCBcIjkxIEEzXCIsIFwiOTEgQTBcIiwgXCI5MSBBMVwiLCBcIjkxIEEyXCIsIFwiOTEgOUVcIiwgXCI5MSA5RlwiLCBcIjkxIDkyXCIsIFwiOEUgQTlcIiwgXCJFMiA5QiA5MVwiLCBcIjhFIDkzXCIsIFwiOTEgOTFcIiwgXCI4RSA5MlwiLCBcIjkxIDlEXCIsIFwiOTEgOUJcIiwgXCI5MSA5Q1wiLCBcIjkyIEJDXCIsIFwiOTEgOTNcIiwgXCI5NSBCNlwiLCBcIjkyIDhEXCIsIFwiOEMgODJcIiwgXCI5QiA5MVwiLCBcIjkwIEI2XCIsIFwiOTAgQjFcIiwgXCI5MCBBRFwiLCBcIjkwIEI5XCIsIFwiOTAgQjBcIiwgXCI5MCBCQlwiLCBcIjkwIEJDXCIsIFwiOTAgQThcIiwgXCI5MCBBRlwiLCBcIkE2IDgxXCIsIFwiOTAgQUVcIiwgXCI5MCBCN1wiLCBcIjkwIEJEXCIsIFwiOTAgQjhcIiwgXCI5MCA5OVwiLCBcIjkwIEI1XCIsIFwiOTkgODhcIiwgXCI5OSA4OVwiLCBcIjk5IDhBXCIsIFwiOTAgOTJcIiwgXCI5MCA5NFwiLCBcIjkwIEE3XCIsIFwiOTAgQTZcIiwgXCI5MCBBNFwiLCBcIjkwIEEzXCIsIFwiOTAgQTVcIiwgXCI5MCBCQVwiLCBcIjkwIDk3XCIsIFwiOTAgQjRcIiwgXCJBNiA4NFwiLCBcIjkwIDlEXCIsIFwiOTAgOUJcIiwgXCI5MCA4Q1wiLCBcIjkwIDlFXCIsIFwiOTAgOUNcIiwgXCI5NSBCN1wiLCBcIkE2IDgyXCIsIFwiQTYgODBcIiwgXCI5MCA4RFwiLCBcIjkwIEEyXCIsIFwiOTAgQTBcIiwgXCI5MCA5RlwiLCBcIjkwIEExXCIsIFwiOTAgQUNcIiwgXCI5MCBCM1wiLCBcIjkwIDhCXCIsIFwiOTAgOEFcIiwgXCI5MCA4NlwiLCBcIjkwIDg1XCIsIFwiOTAgODNcIiwgXCI5MCA4MlwiLCBcIjkwIDg0XCIsIFwiOTAgQUFcIiwgXCI5MCBBQlwiLCBcIjkwIDk4XCIsIFwiOTAgOTBcIiwgXCI5MCA4RlwiLCBcIjkwIDkxXCIsIFwiOTAgOEVcIiwgXCI5MCA5NlwiLCBcIjkwIDgwXCIsIFwiOTAgODFcIiwgXCI5MCA5M1wiLCBcIkE2IDgzXCIsIFwiOTUgOEFcIiwgXCI5MCA5NVwiLCBcIjkwIEE5XCIsIFwiOTAgODhcIiwgXCI5MCA4N1wiLCBcIjkwIEJGXCIsIFwiOTAgQkVcIiwgXCI5MCA4OVwiLCBcIjkwIEIyXCIsIFwiOEMgQjVcIiwgXCI4RSA4NFwiLCBcIjhDIEIyXCIsIFwiOEMgQjNcIiwgXCI4QyBCNFwiLCBcIjhDIEIxXCIsIFwiOEMgQkZcIiwgXCJFMiA5OCA5OFwiLCBcIjhEIDgwXCIsIFwiOEUgOERcIiwgXCI4RSA4QlwiLCBcIjhEIDgzXCIsIFwiOEQgODJcIiwgXCI4RCA4MVwiLCBcIjhDIEJFXCIsIFwiOEMgQkFcIiwgXCI4QyBCQVwiLCBcIjhDIEJCXCIsIFwiOEMgQjlcIiwgXCI4QyBCN1wiLCBcIjhDIEJDXCIsIFwiOEMgQjhcIiwgXCI5MiA5MFwiLCBcIjhEIDg0XCIsIFwiOEMgQjBcIiwgXCI4RSA4M1wiLCBcIjkwIDlBXCIsIFwiOTUgQjhcIiwgXCI4QyA4RVwiLCBcIjhDIDhEXCIsIFwiOEMgOEZcIiwgXCI4QyA5NVwiLCBcIjhDIDk2XCIsIFwiOEMgOTdcIiwgXCI4QyA5OFwiLCBcIjhDIDkxXCIsIFwiOEMgOTJcIiwgXCI4QyA5M1wiLCBcIjhDIDk0XCIsIFwiOEMgOUFcIiwgXCI4QyA5RFwiLCBcIjhDIDlCXCIsIFwiOEMgOUNcIiwgXCI4QyA5RVwiLCBcIjhDIDk5XCIsIFwiRTIgQUQgOTAgRUYgQjggOEZcIiwgXCI4QyA5RlwiLCBcIjkyIEFCXCIsIFwiRTIgOUMgQThcIiwgXCJFMiA5OCA4NCBFRiBCOCA4RlwiLCBcIkUyIDk4IDgwIEVGIEI4IDhGXCIsIFwiOEMgQTRcIiwgXCJFMiA5QiA4NSBFRiBCOCA4RlwiLCBcIjhDIEE1XCIsIFwiOEMgQTZcIiwgXCJFMiA5OCA4MSBFRiBCOCA4RlwiLCBcIjhDIEE3XCIsIFwiRTIgOUIgODhcIiwgXCI4QyBBOVwiLCBcIkUyIDlBIEExIEVGIEI4IDhGXCIsIFwiOTQgQTVcIiwgXCI5MiBBNVwiLCBcIkUyIDlEIDg0IEVGIEI4IDhGXCIsIFwiOEMgQThcIiwgXCJFMiA5OCA4MyBFRiBCOCA4RlwiLCBcIkUyIDlCIDg0IEVGIEI4IDhGXCIsIFwiOEMgQUNcIiwgXCI5MiBBOFwiLCBcIjhDIEFBXCIsIFwiOEMgQUJcIiwgXCJFMiA5OCA4MiBFRiBCOCA4RlwiLCBcIkUyIDk4IDk0IEVGIEI4IDhGXCIsIFwiOTIgQTdcIiwgXCI5MiBBNlwiLCBcIjhDIDhBXCIsIFwiOUIgOTFcIiwgXCI5QiA5MVwiLCBcIjhEIDhGXCIsIFwiOEQgOEVcIiwgXCI4RCA5MFwiLCBcIjhEIDhBXCIsIFwiOEQgOEJcIiwgXCI4RCA4Q1wiLCBcIjhEIDg5XCIsIFwiOEQgODdcIiwgXCI4RCA5M1wiLCBcIjhEIDg4XCIsIFwiOEQgOTJcIiwgXCI4RCA5MVwiLCBcIjhEIDhEXCIsIFwiOEQgODVcIiwgXCI4RCA4NlwiLCBcIjhDIEI2XCIsIFwiOEMgQkRcIiwgXCI4RCBBMFwiLCBcIjhEIEFGXCIsIFwiOEQgOUVcIiwgXCJBNyA4MFwiLCBcIjhEIDk3XCIsIFwiOEQgOTZcIiwgXCI4RCBBNFwiLCBcIjhEIEIzXCIsIFwiOEQgOTRcIiwgXCI4RCA5RlwiLCBcIjhDIEFEXCIsIFwiOEQgOTVcIiwgXCI4RCA5RFwiLCBcIjhDIEFFXCIsIFwiOEMgQUZcIiwgXCI4RCA5Q1wiLCBcIjhEIEIyXCIsIFwiOEQgQTVcIiwgXCI4RCBBM1wiLCBcIjhEIEIxXCIsIFwiOEQgOUJcIiwgXCI4RCA5OVwiLCBcIjhEIDlBXCIsIFwiOEQgOThcIiwgXCI4RCBBMlwiLCBcIjhEIEExXCIsIFwiOEQgQTdcIiwgXCI4RCBBOFwiLCBcIjhEIEE2XCIsIFwiOEQgQjBcIiwgXCI4RSA4MlwiLCBcIjhEIEFFXCIsIFwiOEQgQUNcIiwgXCI4RCBBRFwiLCBcIjhEIEFCXCIsIFwiOEQgQkZcIiwgXCI4RCBBOVwiLCBcIjhEIEFBXCIsIFwiOEQgQkFcIiwgXCI4RCBCQlwiLCBcIjhEIEI3XCIsIFwiOEQgQjhcIiwgXCI4RCBCOVwiLCBcIjhEIEJFXCIsIFwiOEQgQjZcIiwgXCI4RCBCNVwiLCBcIkUyIDk4IDk1IEVGIEI4IDhGXCIsIFwiOEQgQkNcIiwgXCI4RCBCNFwiLCBcIjhEIEJEXCIsXCI5QiA5MVwiLCBcIjlCIDkxXCIsIFwiOUIgOTFcIiwgXCJFMiA5QSBCRCBFRiBCOCA4RlwiLCBcIjhGIDgwXCIsIFwiOEYgODhcIiwgXCJFMiA5QSBCRSBFRiBCOCA4RlwiLCBcIjhFIEJFXCIsIFwiOEYgOTBcIiwgXCI4RiA4OVwiLCBcIjhFIEIxXCIsIFwiRTIgOUIgQjMgRUYgQjggOEZcIiwgXCI4RiA4Q1wiLCBcIjhGIDkzXCIsIFwiOEYgQjhcIiwgXCI4RiA5MlwiLCBcIjhGIDkxXCIsIFwiOEYgOEZcIiwgXCI4RSBCRlwiLCBcIkUyIDlCIEI3XCIsIFwiOEYgODJcIiwgXCJFMiA5QiBCOFwiLCBcIjhGIEI5XCIsIFwiOEUgQTNcIiwgXCI5QSBBM1wiLCBcIjhGIDhBXCIsIFwiOEYgODRcIiwgXCI5QiA4MFwiLCBcIkUyIDlCIEI5XCIsIFwiOEYgOEJcIiwgXCI5QSBCNFwiLCBcIjlBIEI1XCIsIFwiOEYgODdcIiwgXCI5NSBCNFwiLCBcIjhGIDg2XCIsIFwiOEUgQkRcIiwgXCI4RiA4NVwiLCBcIjhFIDk2XCIsIFwiOEUgOTdcIiwgXCI4RiBCNVwiLCBcIjhFIEFCXCIsIFwiOEUgOUZcIiwgXCI4RSBBRFwiLCBcIjhFIEE4XCIsIFwiOEUgQUFcIiwgXCI4RSBBNFwiLCBcIjhFIEE3XCIsIFwiOEUgQkNcIiwgXCI4RSBCOVwiLCBcIjhFIEI3XCIsIFwiOEUgQkFcIiwgXCI4RSBCOFwiLCBcIjhFIEJCXCIsIFwiOEUgQUNcIiwgXCI4RSBBRVwiLCBcIjkxIEJFXCIsIFwiOEUgQUZcIiwgXCI4RSBCMlwiLCBcIjhFIEIwXCIsIFwiOEUgQjNcIiwgXCI5QiA5MVwiLCBcIjlCIDkxXCIsIFwiOUIgOTFcIiwgXCI5QSA5N1wiLCBcIjlBIDk1XCIsIFwiOUEgOTlcIiwgXCI5QSA4Q1wiLCBcIjlBIDhFXCIsIFwiOEYgOEVcIiwgXCI5QSA5M1wiLCBcIjlBIDkxXCIsIFwiOUEgOTJcIiwgXCI5QSA5MFwiLCBcIjlBIDlBXCIsIFwiOUEgOUJcIiwgXCI5QSA5Q1wiLFwiOEYgOERcIiwgXCI5QSBCMlwiLCBcIjlBIEE4XCIsIFwiOUEgOTRcIiwgXCI5QSA4RFwiLCBcIjlBIDk4XCIsIFwiOUEgOTZcIiwgXCI5QSBBMVwiLCBcIjlBIEEwXCIsIFwiOUEgQUZcIiwgXCI5QSA4M1wiLCBcIjlBIDhCXCIsIFwiOUEgOURcIiwgXCI5QSA4NFwiLCBcIjlBIDg1XCIsIFwiOUEgODhcIiwgXCI5QSA5RVwiLCBcIjlBIDgyXCIsIFwiOUEgODZcIiwgXCI5QSA4N1wiLCBcIjlBIDhBXCIsIFwiOUEgODlcIiwgXCI5QSA4MVwiLCBcIjlCIEE5XCIsIFwiRTIgOUMgODggRUYgQjggOEZcIiwgXCI5QiBBQlwiLCBcIjlCIEFDXCIsIFwiRTIgOUIgQjUgRUYgQjggOEZcIiwgXCI5QiBBNVwiLCBcIjlBIEE0XCIsIFwiRTIgOUIgQjRcIiwgXCI5QiBCM1wiLCBcIjlBIDgwXCIsIFwiOUIgQjBcIiwgXCI5MiBCQVwiLCBcIkUyIDlBIDkzIEVGIEI4IDhGXCIsIFwiOUEgQTdcIiwgXCJFMiA5QiBCRCBFRiBCOCA4RlwiLCBcIjlBIDhGXCIsIFwiOUEgQTZcIiwgXCI5QSBBNVwiLCBcIjhGIDgxXCIsIFwiOUEgQTJcIiwgXCI4RSBBMVwiLCBcIjhFIEEyXCIsIFwiOEUgQTBcIiwgXCI4RiA5N1wiLCBcIjhDIDgxXCIsIFwiOTcgQkNcIiwgXCI4RiBBRFwiLCBcIkUyIDlCIEIyIEVGIEI4IDhGXCIsIFwiOEUgOTFcIiwgXCJFMiA5QiBCMFwiLCBcIjhGIDk0XCIsIFwiOTcgQkJcIiwgXCI4QyA4QlwiLCBcIjk3IEJFXCIsIFwiOEYgOTVcIiwgXCJFMiA5QiBCQSBFRiBCOCA4RlwiLCBcIjhGIDlFXCIsIFwiOUIgQTNcIiwgXCI5QiBBNFwiLCBcIjhDIDg1XCIsIFwiOEMgODRcIiwgXCI4RiA5Q1wiLCBcIjhGIDk2XCIsIFwiOEYgOURcIiwgXCI4QyA4N1wiLCBcIjhDIDg2XCIsIFwiOEYgOTlcIiwgXCI4QyA4M1wiLCBcIjhDIDg5XCIsIFwiOEMgOENcIiwgXCI4QyBBMFwiLCBcIjhFIDg3XCIsIFwiOEUgODZcIiwgXCI4QyA4OFwiLCBcIjhGIDk4XCIsIFwiOEYgQjBcIiwgXCI4RiBBRlwiLCBcIjhGIDlGXCIsIFwiOTcgQkRcIiwgXCI4RiBBMFwiLCBcIjhGIEExXCIsIFwiOEYgOUFcIiwgXCI4RiBBMlwiLCBcIjhGIEFDXCIsIFwiOEYgQTNcIiwgXCI4RiBBNFwiLCBcIjhGIEE1XCIsIFwiOEYgQTZcIiwgXCI4RiBBOFwiLCBcIjhGIEFBXCIsIFwiOEYgQUJcIiwgXCI4RiBBOVwiLCBcIjkyIDkyXCIsIFwiOEYgOUJcIiwgXCJFMiA5QiBBQSBFRiBCOCA4RlwiLCBcIjk1IDhDXCIsIFwiOTUgOERcIiwgXCI5NSA4QlwiLCBcIkUyIDlCIEE5XCIsIFwiRTIgOEMgOUEgRUYgQjggOEZcIiwgXCI5MyBCMVwiLCBcIjkzIEIyXCIsIFwiOTIgQkJcIiwgXCJFMiA4QyBBOCBFRiBCOCA4RlwiLCBcIjk2IEE1XCIsIFwiOTYgQThcIiwgXCI5NiBCMVwiLCBcIjk2IEIyXCIsIFwiOTUgQjlcIiwgXCI5NyA5Q1wiLCBcIjkyIEJEXCIsIFwiOTIgQkVcIiwgXCI5MiBCRlwiLCBcIjkzIDgwXCIsIFwiOTMgQkNcIiwgXCI5MyBCN1wiLCBcIjkzIEI4XCIsIFwiOTMgQjlcIiwgXCI4RSBBNVwiLCBcIjkzIEJEXCIsIFwiOEUgOUVcIiwgXCI5MyA5RVwiLCBcIkUyIDk4IDhFIEVGIEI4IDhGXCIsIFwiOTMgOUZcIiwgXCI5MyBBMFwiLCBcIjkzIEJBXCIsIFwiOTMgQkJcIiwgXCI4RSA5OVwiLCBcIjhFIDlBXCIsIFwiOEUgOUJcIiwgXCJFMiA4RiBCMVwiLCBcIkUyIDhGIEIyXCIsIFwiRTIgOEYgQjBcIiwgXCI5NSBCMFwiLCBcIkUyIDhGIEIzXCIsIFwiRTIgOEMgOUIgRUYgQjggOEZcIiwgXCI5MyBBMVwiLCBcIjk0IDhCXCIsIFwiOTQgOENcIiwgXCI5MiBBMVwiLCBcIjk0IEE2XCIsIFwiOTUgQUZcIiwgXCI5NyA5MVwiLCBcIjlCIEEyXCIsIFwiOTIgQjhcIiwgXCI5MiBCNVwiLCBcIjkyIEI0XCIsIFwiOTIgQjZcIiwgXCI5MiBCN1wiLCBcIjkyIEIwXCIsIFwiOTIgQjNcIiwgXCI5MiA4RVwiLCBcIkUyIDlBIDk2XCIsIFwiOTQgQTdcIiwgXCI5NCBBOFwiLCBcIkUyIDlBIDkyXCIsIFwiOUIgQTBcIiwgXCJFMiA5QiA4RlwiLCBcIjk0IEE5XCIsIFwiRTIgOUEgOTlcIiwgXCJFMiA5QiA5M1wiLCBcIjk0IEFCXCIsIFwiOTIgQTNcIiwgXCI5NCBBQVwiLCBcIjk3IEExXCIsIFwiRTIgOUEgOTRcIiwgXCI5QiBBMVwiLCBcIjlBIEFDXCIsIFwiRTIgOTggQTAgRUYgQjggOEZcIiwgXCJFMiA5QSBCMFwiLCBcIkUyIDlBIEIxXCIsIFwiOEYgQkFcIiwgXCI5NCBBRVwiLCBcIjkzIEJGXCIsIFwiOTIgODhcIiwgXCJFMiA5QSA5N1wiLCBcIjk0IEFEXCIsIFwiOTQgQUNcIiwgXCI5NSBCM1wiLCBcIjkyIDhBXCIsIFwiOTIgODlcIiwgXCI4QyBBMVwiLCBcIjhGIEI3XCIsIFwiOTQgOTZcIiwgXCI5QSBCRFwiLCBcIjlBIEJGXCIsIFwiOUIgODFcIiwgXCI5NCA5MVwiLCBcIjk3IDlEXCIsIFwiOUIgOEJcIiwgXCI5QiA4Q1wiLCBcIjlCIDhGXCIsIFwiOUEgQUFcIiwgXCI5QiA4RVwiLCBcIjk2IEJDXCIsIFwiOTcgQkFcIiwgXCJFMiA5QiBCMVwiLCBcIjk3IEJGXCIsIFwiOUIgOERcIiwgXCI4RSA4OFwiLCBcIjhFIDhGXCIsIFwiOEUgODBcIiwgXCI4RSA4MVwiLCBcIjhFIDhBXCIsIFwiOEUgODlcIiwgXCI4RSA4RVwiLCBcIjhFIDkwXCIsIFwiOEUgOENcIiwgXCI4RiBBRVwiLCBcIkUyIDlDIDg5IEVGIEI4IDhGXCIsIFwiOTMgQTlcIiwgXCI5MyBBOFwiLCBcIjkzIEE3XCIsIFwiOTIgOENcIiwgXCI5MyBBRVwiLCBcIjkzIEFBXCIsIFwiOTMgQUJcIiwgXCI5MyBBQ1wiLCBcIjkzIEFEXCIsIFwiOTMgQTZcIiwgXCI5MyBBRlwiLCBcIjkzIEE1XCIsIFwiOTMgQTRcIiwgXCI5MyA5Q1wiLCBcIjkzIDgzXCIsIFwiOTMgOTFcIiwgXCI5MyA4QVwiLCBcIjkzIDg4XCIsIFwiOTMgODlcIiwgXCI5MyA4NFwiLCBcIjkzIDg1XCIsIFwiOTMgODZcIiwgXCI5NyA5M1wiLCBcIjkzIDg3XCIsIFwiOTcgODNcIiwgXCI5NyBCM1wiLCBcIjk3IDg0XCIsIFwiOTMgOEJcIiwgXCI5NyA5MlwiLCBcIjkzIDgxXCIsIFwiOTMgODJcIiwgXCI5NyA4MlwiLCBcIjk3IDlFXCIsIFwiOTMgQjBcIiwgXCI5MyA5M1wiLCBcIjkzIDk1XCIsIFwiOTMgOTdcIiwgXCI5MyA5OFwiLCBcIjkzIDk5XCIsIFwiOTMgOTRcIiwgXCI5MyA5MlwiLCBcIjkzIDlBXCIsIFwiOTMgOTZcIiwgXCI5NCA5N1wiLCBcIjkzIDhFXCIsIFwiOTYgODdcIiwgXCJFMiA5QyA4MiBFRiBCOCA4RlwiLCBcIjkzIDkwXCIsIFwiOTMgOEZcIiwgXCI5MyA4Q1wiLCBcIjkzIDhEXCIsIFwiOUEgQTlcIiwgXCI4RiBCM1wiLCBcIjhGIEI0XCIsIFwiOTQgOTBcIiwgXCI5NCA5MlwiLCBcIjk0IDkzXCIsIFwiOTQgOEZcIiwgXCI5NiA4QVwiLCBcIjk2IDhCXCIsIFwiRTIgOUMgOTIgRUYgQjggOEZcIiwgXCI5MyA5RFwiLCBcIkUyIDlDIDhGIEVGIEI4IDhGXCIsIFwiOTYgOERcIiwgXCI5NiA4Q1wiLCBcIjk0IDhEXCIsIFwiOTQgOEVcIiwgXCI5QiA5MVwiLCBcIjlCIDkxXCIsIFwiRTIgOUQgQTQgRUYgQjggOEZcIiwgXCI5MiA5QlwiLCBcIjkyIDlBXCIsIFwiOTIgOTlcIiwgXCI5MiA5Q1wiLCBcIjkyIDk0XCIsIFwiRTIgOUQgQTMgRUYgQjggOEZcIiwgXCI5MiA5NVwiLCBcIjkyIDlFXCIsIFwiOTIgOTNcIiwgXCI5MiA5N1wiLCBcIjkyIDk2XCIsIFwiOTIgOThcIiwgXCI5MiA5RFwiLCBcIjkyIDlGXCIsIFwiRTIgOTggQUUgRUYgQjggOEZcIiwgXCJFMiA5QyA5RCBFRiBCOCA4RlwiLCBcIkUyIDk4IEFBIEVGIEI4IDhGXCIsIFwiOTUgODlcIiwgXCJFMiA5OCBCOCBFRiBCOCA4RlwiLCBcIkUyIDlDIEExIEVGIEI4IDhGXCIsIFwiOTQgQUZcIiwgXCI5NSA4RVwiLCBcIkUyIDk4IEFGIEVGIEI4IDhGXCIsIFwiRTIgOTggQTYgRUYgQjggOEZcIiwgXCI5QiA5MFwiLCBcIkUyIDlCIDhFXCIsIFwiRTIgOTkgODggRUYgQjggOEZcIiwgXCJFMiA5OSA4OSBFRiBCOCA4RlwiLCBcIkUyIDk5IDhBIEVGIEI4IDhGXCIsIFwiRTIgOTkgOEIgRUYgQjggOEZcIiwgXCJFMiA5OSA4QyBFRiBCOCA4RlwiLCBcIkUyIDk5IDhEIEVGIEI4IDhGXCIsIFwiRTIgOTkgOEUgRUYgQjggOEZcIiwgXCJFMiA5OSA4RiBFRiBCOCA4RlwiLCBcIkUyIDk5IDkwIEVGIEI4IDhGXCIsIFwiRTIgOTkgOTEgRUYgQjggOEZcIiwgXCJFMiA5OSA5MiBFRiBCOCA4RlwiLCBcIkUyIDk5IDkzIEVGIEI4IDhGXCIsIFwiODYgOTRcIiwgXCJFMiA5QSA5QlwiLCBcIjg4IEIzXCIsIFwiODggQjlcIiwgXCJFMiA5OCBBMiBFRiBCOCA4RlwiLCBcIkUyIDk4IEEzIEVGIEI4IDhGXCIsIFwiOTMgQjRcIiwgXCI5MyBCM1wiLCBcIjg4IEI2XCIsIFwiODggOUEgRUYgQjggOEZcIiwgXCI4OCBCOFwiLCBcIjg4IEJBXCIsIFwiODggQjcgRUYgQjggOEZcIiwgXCJFMiA5QyBCNCBFRiBCOCA4RlwiLCBcIjg2IDlBXCIsIFwiODkgOTFcIiwgXCI5MiBBRVwiLCBcIjg5IDkwXCIsIFwiRTMgOEEgOTkgRUYgQjggOEZcIiwgXCJFMyA4QSA5NyBFRiBCOCA4RlwiLCBcIjg4IEI0XCIsIFwiODggQjVcIiwgXCI4OCBCMlwiLCBcIjg1IEIwIEVGIEI4IDhGXCIsIFwiODUgQjEgRUYgQjggOEZcIiwgXCI4NiA4RVwiLCBcIjg2IDkxXCIsIFwiODUgQkUgRUYgQjggOEZcIiwgXCI4NiA5OFwiLCBcIkUyIDlCIDk0IEVGIEI4IDhGXCIsIFwiOTMgOUJcIiwgXCI5QSBBQlwiLCBcIkUyIDlEIDhDXCIsIFwiRTIgQUQgOTUgRUYgQjggOEZcIiwgXCI5MiBBMlwiLCBcIkUyIDk5IEE4IEVGIEI4IDhGXCIsIFwiOUEgQjdcIiwgXCI5QSBBRlwiLCBcIjlBIEIzXCIsIFwiOUEgQjFcIiwgXCI5NCA5RVwiLCBcIjkzIEI1XCIsIFwiRTIgOUQgOTcgRUYgQjggOEZcIiwgXCJFMiA5RCA5NVwiLCBcIkUyIDlEIDkzXCIsIFwiRTIgOUQgOTRcIiwgXCJFMiA4MCBCQyBFRiBCOCA4RlwiLCBcIkUyIDgxIDg5IEVGIEI4IDhGXCIsIFwiOTIgQUZcIiwgXCI5NCA4NVwiLCBcIjk0IDg2XCIsIFwiOTQgQjFcIiwgXCJFMiA5QSA5Q1wiLCBcIkUzIDgwIEJEIEVGIEI4IDhGXCIsIFwiRTIgOUEgQTAgRUYgQjggOEZcIiwgXCI5QSBCOFwiLCBcIjk0IEIwXCIsIFwiRTIgOTkgQkIgRUYgQjggOEZcIiwgXCI4OCBBRiBFRiBCOCA4RlwiLCBcIjkyIEI5XCIsIFwiRTIgOUQgODcgRUYgQjggOEZcIiwgXCJFMiA5QyBCMyBFRiBCOCA4RlwiLCBcIkUyIDlEIDhFXCIsIFwiRTIgOUMgODVcIiwgXCI5MiBBMFwiLCBcIjhDIDgwXCIsIFwiRTIgOUUgQkZcIiwgXCI4QyA5MFwiLCBcIkUyIDkzIDgyIEVGIEI4IDhGXCIsIFwiOEYgQTdcIiwgXCI4OCA4MiBFRiBCOCA4RlwiLCBcIjlCIDgyXCIsIFwiOUIgODNcIiwgXCI5QiA4NFwiLCBcIjlCIDg1XCIsIFwiRTIgOTkgQkYgRUYgQjggOEZcIiwgXCI5QSBBRFwiLCBcIjlBIEJFXCIsIFwiODUgQkYgRUYgQjggOEZcIiwgXCI5QSBCMFwiLCBcIjlBIEI5XCIsIFwiOUEgQkFcIiwgXCI5QSBCQ1wiLCBcIjlBIEJCXCIsIFwiOUEgQUVcIiwgXCI4RSBBNlwiLCBcIjkzIEI2XCIsIFwiODggODFcIiwgXCI4NiA5NlwiLCBcIjg2IDk3XCIsIFwiODYgOTlcIiwgXCI4NiA5MlwiLCBcIjg2IDk1XCIsIFwiODYgOTNcIiwgXCIzMCBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjMxIEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiMzIgRUYgQjggOEYgRTIgODMgQTNcIiwgXCIzMyBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjM0IEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiMzUgRUYgQjggOEYgRTIgODMgQTNcIiwgXCIzNiBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjM3IEVGIEI4IDhGIEUyIDgzIEEzXCIsIFwiMzggRUYgQjggOEYgRTIgODMgQTNcIiwgXCIzOSBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIjk0IDlGXCIsIFwiOTQgQTJcIiwgXCJFMiA5NiBCNiBFRiBCOCA4RlwiLCBcIkUyIDhGIEI4XCIsIFwiRTIgOEYgQUZcIiwgXCJFMiA4RiBCOVwiLCBcIkUyIDhGIEJBXCIsIFwiRTIgOEYgQURcIiwgXCJFMiA4RiBBRVwiLCBcIkUyIDhGIEE5XCIsIFwiRTIgOEYgQUFcIiwgXCI5NCA4MFwiLCBcIjk0IDgxXCIsIFwiOTQgODJcIiwgXCJFMiA5NyA4MCBFRiBCOCA4RlwiLCBcIjk0IEJDXCIsIFwiOTQgQkRcIiwgXCJFMiA4RiBBQlwiLCBcIkUyIDhGIEFDXCIsIFwiRTIgOUUgQTEgRUYgQjggOEZcIiwgXCJFMiBBQyA4NSBFRiBCOCA4RlwiLCBcIkUyIEFDIDg2IEVGIEI4IDhGXCIsIFwiRTIgQUMgODcgRUYgQjggOEZcIiwgXCJFMiA4NiA5NyBFRiBCOCA4RlwiLCBcIkUyIDg2IDk4IEVGIEI4IDhGXCIsIFwiRTIgODYgOTkgRUYgQjggOEZcIiwgXCJFMiA4NiA5NiBFRiBCOCA4RlwiLCBcIkUyIDg2IDk1IEVGIEI4IDhGXCIsIFwiRTIgODYgOTQgRUYgQjggOEZcIiwgXCI5NCA4NFwiLCBcIkUyIDg2IEFBIEVGIEI4IDhGXCIsIFwiRTIgODYgQTkgRUYgQjggOEZcIiwgXCJFMiBBNCBCNCBFRiBCOCA4RlwiLCBcIkUyIEE0IEI1IEVGIEI4IDhGXCIsIFwiMjMgRUYgQjggOEYgRTIgODMgQTNcIiwgXCIyQSBFRiBCOCA4RiBFMiA4MyBBM1wiLCBcIkUyIDg0IEI5IEVGIEI4IDhGXCIsIFwiOTQgQTRcIiwgXCI5NCBBMVwiLCBcIjk0IEEwXCIsIFwiOTQgQTNcIiwgXCI4RSBCNVwiLCBcIjhFIEI2XCIsIFwiRTMgODAgQjAgRUYgQjggOEZcIiwgXCJFMiA5RSBCMFwiLCBcIkUyIDlDIDk0IEVGIEI4IDhGXCIsIFwiOTQgODNcIiwgXCJFMiA5RSA5NVwiLCBcIkUyIDlFIDk2XCIsIFwiRTIgOUUgOTdcIiwgXCJFMiA5QyA5NiBFRiBCOCA4RlwiLCBcIjkyIEIyXCIsIFwiOTIgQjFcIiwgXCJDMiBBOSBFRiBCOCA4RlwiLCBcIkMyIEFFIEVGIEI4IDhGXCIsIFwiRTIgODQgQTIgRUYgQjggOEZcIiwgXCI5NCA5QVwiLCBcIjk0IDk5XCIsIFwiOTQgOUJcIiwgXCI5NCA5RFwiLCBcIjk0IDlDXCIsIFwiRTIgOTggOTEgRUYgQjggOEZcIiwgXCI5NCA5OFwiLCBcIkUyIDlBIEFBIEVGIEI4IDhGXCIsIFwiRTIgOUEgQUIgRUYgQjggOEZcIiwgXCI5NCBCNFwiLCBcIjk0IEI1XCIsIFwiOTQgQjhcIiwgXCI5NCBCOVwiLCBcIjk0IEI2XCIsIFwiOTQgQjdcIiwgXCI5NCBCQVwiLCBcIkUyIDk2IEFBIEVGIEI4IDhGXCIsIFwiRTIgOTYgQUIgRUYgQjggOEZcIiwgXCJFMiBBQyA5QiBFRiBCOCA4RlwiLCBcIkUyIEFDIDlDIEVGIEI4IDhGXCIsIFwiOTQgQkJcIiwgXCJFMiA5NyBCQyBFRiBCOCA4RlwiLCBcIkUyIDk3IEJCIEVGIEI4IDhGXCIsIFwiRTIgOTcgQkUgRUYgQjggOEZcIiwgXCJFMiA5NyBCRCBFRiBCOCA4RlwiLCBcIjk0IEIyXCIsIFwiOTQgQjNcIiwgXCI5NCA4OFwiLCBcIjk0IDg5XCIsIFwiOTQgOEFcIiwgXCI5NCA4N1wiLCBcIjkzIEEzXCIsIFwiOTMgQTJcIiwgXCI5NCA5NFwiLCBcIjk0IDk1XCIsIFwiODMgOEZcIiwgXCI4MCA4NCBFRiBCOCA4RlwiLCBcIkUyIDk5IEEwIEVGIEI4IDhGXCIsIFwiRTIgOTkgQTMgRUYgQjggOEZcIiwgXCJFMiA5OSBBNSBFRiBCOCA4RlwiLCBcIkUyIDk5IEE2IEVGIEI4IDhGXCIsIFwiOEUgQjRcIiwgXCI5MSA4MSBFMiA4MCA4RCBGMCA5RiA5NyBBOFwiLCBcIjkyIEFEXCIsIFwiOTcgQUZcIiwgXCI5MiBBQ1wiLCBcIjk1IDkwXCIsIFwiOTUgOTFcIiwgXCI5NSA5MlwiLCBcIjk1IDkzXCIsIFwiOTUgOTRcIiwgXCI5NSA5NVwiLCBcIjk1IDk2XCIsIFwiOTUgOTdcIiwgXCI5NSA5OFwiLCBcIjk1IDk5XCIsIFwiOTUgOUFcIiwgXCI5NSA5QlwiLCBcIjk1IDlDXCIsIFwiOTUgOURcIiwgXCI5NSA5RVwiLCBcIjk1IDlGXCIsIFwiOTUgQTBcIiwgXCI5NSBBMVwiLCBcIjk1IEEyXCIsIFwiOTUgQTNcIiwgXCI5NSBBNFwiLCBcIjk1IEE1XCIsIFwiOTUgQTZcIiwgXCI5NSBBN1wiLCBcIjlCIDkxXCIsIFwiODcgQTYgRjAgOUYgODcgQUJcIiwgXCI4NyBBNiBGMCA5RiA4NyBCRFwiLCBcIjg3IEE2IEYwIDlGIDg3IEIxXCIsIFwiODcgQTkgRjAgOUYgODcgQkZcIiwgXCI4NyBBNiBGMCA5RiA4NyBCOFwiLCBcIjg3IEE2IEYwIDlGIDg3IEE5XCIsIFwiODcgQTYgRjAgOUYgODcgQjRcIiwgXCI4NyBBNiBGMCA5RiA4NyBBRVwiLCBcIjg3IEE2IEYwIDlGIDg3IEI2XCIsIFwiODcgQTYgRjAgOUYgODcgQUNcIiwgXCI4NyBBNiBGMCA5RiA4NyBCN1wiLCBcIjg3IEE2IEYwIDlGIDg3IEIyXCIsIFwiODcgQTYgRjAgOUYgODcgQkNcIiwgXCI4NyBBNiBGMCA5RiA4NyBCQVwiLCBcIjg3IEE2IEYwIDlGIDg3IEI5XCIsIFwiODcgQTYgRjAgOUYgODcgQkZcIiwgXCI4NyBBNyBGMCA5RiA4NyBCOFwiLCBcIjg3IEE3IEYwIDlGIDg3IEFEXCIsIFwiODcgQTcgRjAgOUYgODcgQTlcIiwgXCI4NyBBNyBGMCA5RiA4NyBBN1wiLCBcIjg3IEE3IEYwIDlGIDg3IEJFXCIsIFwiODcgQTcgRjAgOUYgODcgQUFcIiwgXCI4NyBBNyBGMCA5RiA4NyBCRlwiLCBcIjg3IEE3IEYwIDlGIDg3IEFGXCIsIFwiODcgQTcgRjAgOUYgODcgQjJcIiwgXCI4NyBBNyBGMCA5RiA4NyBCOVwiLCBcIjg3IEE3IEYwIDlGIDg3IEI0XCIsIFwiODcgQTcgRjAgOUYgODcgQjZcIiwgXCI4NyBBNyBGMCA5RiA4NyBBNlwiLCBcIjg3IEE3IEYwIDlGIDg3IEJDXCIsIFwiODcgQTcgRjAgOUYgODcgQjdcIiwgXCI4NyBBRSBGMCA5RiA4NyBCNFwiLCBcIjg3IEJCIEYwIDlGIDg3IEFDXCIsIFwiODcgQTcgRjAgOUYgODcgQjNcIiwgXCI4NyBBNyBGMCA5RiA4NyBBQ1wiLCBcIjg3IEE3IEYwIDlGIDg3IEFCXCIsIFwiODcgQTcgRjAgOUYgODcgQUVcIiwgXCI4NyBBOCBGMCA5RiA4NyBCQlwiLCBcIjg3IEIwIEYwIDlGIDg3IEFEXCIsIFwiODcgQTggRjAgOUYgODcgQjJcIiwgXCI4NyBBOCBGMCA5RiA4NyBBNlwiLCBcIjg3IEFFIEYwIDlGIDg3IEE4XCIsIFwiODcgQjAgRjAgOUYgODcgQkVcIiwgXCI4NyBBOCBGMCA5RiA4NyBBQlwiLCBcIjg3IEI5IEYwIDlGIDg3IEE5XCIsIFwiODcgQTggRjAgOUYgODcgQjFcIiwgXCI4NyBBOCBGMCA5RiA4NyBCM1wiLCBcIjg3IEE4IEYwIDlGIDg3IEJEXCIsIFwiODcgQTggRjAgOUYgODcgQThcIiwgXCI4NyBBOCBGMCA5RiA4NyBCNFwiLCBcIjg3IEIwIEYwIDlGIDg3IEIyXCIsIFwiODcgQTggRjAgOUYgODcgQUNcIiwgXCI4NyBBOCBGMCA5RiA4NyBBOVwiLCBcIjg3IEE4IEYwIDlGIDg3IEIwXCIsIFwiODcgQTggRjAgOUYgODcgQjdcIiwgXCI4NyBBRCBGMCA5RiA4NyBCN1wiLCBcIjg3IEE4IEYwIDlGIDg3IEJBXCIsIFwiODcgQTggRjAgOUYgODcgQkNcIiwgXCI4NyBBOCBGMCA5RiA4NyBCRVwiLCBcIjg3IEE4IEYwIDlGIDg3IEJGXCIsIFwiODcgQTkgRjAgOUYgODcgQjBcIiwgXCI4NyBBOSBGMCA5RiA4NyBBRlwiLCBcIjg3IEE5IEYwIDlGIDg3IEIyXCIsIFwiODcgQTkgRjAgOUYgODcgQjRcIiwgXCI4NyBBQSBGMCA5RiA4NyBBOFwiLCBcIjg3IEFBIEYwIDlGIDg3IEFDXCIsIFwiODcgQjggRjAgOUYgODcgQkJcIiwgXCI4NyBBQyBGMCA5RiA4NyBCNlwiLCBcIjg3IEFBIEYwIDlGIDg3IEI3XCIsIFwiODcgQUEgRjAgOUYgODcgQUFcIiwgXCI4NyBBQSBGMCA5RiA4NyBCOVwiLCBcIjg3IEFBIEYwIDlGIDg3IEJBXCIsIFwiODcgQUIgRjAgOUYgODcgQjBcIiwgXCI4NyBBQiBGMCA5RiA4NyBCNFwiLCBcIjg3IEFCIEYwIDlGIDg3IEFGXCIsIFwiODcgQUIgRjAgOUYgODcgQUVcIiwgXCI4NyBBQiBGMCA5RiA4NyBCN1wiLCBcIjg3IEFDIEYwIDlGIDg3IEFCXCIsIFwiODcgQjUgRjAgOUYgODcgQUJcIiwgXCI4NyBCOSBGMCA5RiA4NyBBQlwiLCBcIjg3IEFDIEYwIDlGIDg3IEE2XCIsIFwiODcgQUMgRjAgOUYgODcgQjJcIiwgXCI4NyBBQyBGMCA5RiA4NyBBQVwiLCBcIjg3IEE5IEYwIDlGIDg3IEFBXCIsIFwiODcgQUMgRjAgOUYgODcgQURcIiwgXCI4NyBBQyBGMCA5RiA4NyBBRVwiLCBcIjg3IEFDIEYwIDlGIDg3IEI3XCIsIFwiODcgQUMgRjAgOUYgODcgQjFcIiwgXCI4NyBBQyBGMCA5RiA4NyBBOVwiLCBcIjg3IEFDIEYwIDlGIDg3IEI1XCIsIFwiODcgQUMgRjAgOUYgODcgQkFcIiwgXCI4NyBBQyBGMCA5RiA4NyBCOVwiLCBcIjg3IEFDIEYwIDlGIDg3IEFDXCIsIFwiODcgQUMgRjAgOUYgODcgQjNcIiwgXCI4NyBBQyBGMCA5RiA4NyBCQ1wiLCBcIjg3IEFDIEYwIDlGIDg3IEJFXCIsIFwiODcgQUQgRjAgOUYgODcgQjlcIiwgXCI4NyBBRCBGMCA5RiA4NyBCM1wiLCBcIjg3IEFEIEYwIDlGIDg3IEIwXCIsIFwiODcgQUQgRjAgOUYgODcgQkFcIiwgXCI4NyBBRSBGMCA5RiA4NyBCOFwiLCBcIjg3IEFFIEYwIDlGIDg3IEIzXCIsIFwiODcgQUUgRjAgOUYgODcgQTlcIiwgXCI4NyBBRSBGMCA5RiA4NyBCN1wiLCBcIjg3IEFFIEYwIDlGIDg3IEI2XCIsIFwiODcgQUUgRjAgOUYgODcgQUFcIiwgXCI4NyBBRSBGMCA5RiA4NyBCMlwiLCBcIjg3IEFFIEYwIDlGIDg3IEIxXCIsIFwiODcgQUUgRjAgOUYgODcgQjlcIiwgXCI4NyBBOCBGMCA5RiA4NyBBRVwiLCBcIjg3IEFGIEYwIDlGIDg3IEIyXCIsIFwiODcgQUYgRjAgOUYgODcgQjVcIiwgXCI4NyBBRiBGMCA5RiA4NyBBQVwiLCBcIjg3IEFGIEYwIDlGIDg3IEI0XCIsIFwiODcgQjAgRjAgOUYgODcgQkZcIiwgXCI4NyBCMCBGMCA5RiA4NyBBQVwiLCBcIjg3IEIwIEYwIDlGIDg3IEFFXCIsIFwiODcgQkQgRjAgOUYgODcgQjBcIiwgXCI4NyBCMCBGMCA5RiA4NyBCQ1wiLCBcIjg3IEIwIEYwIDlGIDg3IEFDXCIsIFwiODcgQjEgRjAgOUYgODcgQTZcIiwgXCI4NyBCMSBGMCA5RiA4NyBCQlwiLCBcIjg3IEIxIEYwIDlGIDg3IEE3XCIsIFwiODcgQjEgRjAgOUYgODcgQjhcIiwgXCI4NyBCMSBGMCA5RiA4NyBCN1wiLCBcIjg3IEIxIEYwIDlGIDg3IEJFXCIsIFwiODcgQjEgRjAgOUYgODcgQUVcIiwgXCI4NyBCMSBGMCA5RiA4NyBCOVwiLCBcIjg3IEIxIEYwIDlGIDg3IEJBXCIsIFwiODcgQjIgRjAgOUYgODcgQjRcIiwgXCI4NyBCMiBGMCA5RiA4NyBCMFwiLCBcIjg3IEIyIEYwIDlGIDg3IEFDXCIsIFwiODcgQjIgRjAgOUYgODcgQkNcIiwgXCI4NyBCMiBGMCA5RiA4NyBCRVwiLCBcIjg3IEIyIEYwIDlGIDg3IEJCXCIsIFwiODcgQjIgRjAgOUYgODcgQjFcIiwgXCI4NyBCMiBGMCA5RiA4NyBCOVwiLCBcIjg3IEIyIEYwIDlGIDg3IEFEXCIsIFwiODcgQjIgRjAgOUYgODcgQjZcIiwgXCI4NyBCMiBGMCA5RiA4NyBCN1wiLCBcIjg3IEIyIEYwIDlGIDg3IEJBXCIsIFwiODcgQkUgRjAgOUYgODcgQjlcIiwgXCI4NyBCMiBGMCA5RiA4NyBCRFwiLCBcIjg3IEFCIEYwIDlGIDg3IEIyXCIsIFwiODcgQjIgRjAgOUYgODcgQTlcIiwgXCI4NyBCMiBGMCA5RiA4NyBBOFwiLCBcIjg3IEIyIEYwIDlGIDg3IEIzXCIsIFwiODcgQjIgRjAgOUYgODcgQUFcIiwgXCI4NyBCMiBGMCA5RiA4NyBCOFwiLCBcIjg3IEIyIEYwIDlGIDg3IEE2XCIsIFwiODcgQjIgRjAgOUYgODcgQkZcIiwgXCI4NyBCMiBGMCA5RiA4NyBCMlwiLCBcIjg3IEIzIEYwIDlGIDg3IEE2XCIsIFwiODcgQjMgRjAgOUYgODcgQjdcIiwgXCI4NyBCMyBGMCA5RiA4NyBCNVwiLCBcIjg3IEIzIEYwIDlGIDg3IEIxXCIsIFwiODcgQjMgRjAgOUYgODcgQThcIiwgXCI4NyBCMyBGMCA5RiA4NyBCRlwiLCBcIjg3IEIzIEYwIDlGIDg3IEFFXCIsIFwiODcgQjMgRjAgOUYgODcgQUFcIiwgXCI4NyBCMyBGMCA5RiA4NyBBQ1wiLCBcIjg3IEIzIEYwIDlGIDg3IEJBXCIsIFwiODcgQjMgRjAgOUYgODcgQUJcIiwgXCI4NyBCMiBGMCA5RiA4NyBCNVwiLCBcIjg3IEIwIEYwIDlGIDg3IEI1XCIsIFwiODcgQjMgRjAgOUYgODcgQjRcIiwgXCI4NyBCNCBGMCA5RiA4NyBCMlwiLCBcIjg3IEI1IEYwIDlGIDg3IEIwXCIsIFwiODcgQjUgRjAgOUYgODcgQkNcIiwgXCI4NyBCNSBGMCA5RiA4NyBCOFwiLCBcIjg3IEI1IEYwIDlGIDg3IEE2XCIsIFwiODcgQjUgRjAgOUYgODcgQUNcIiwgXCI4NyBCNSBGMCA5RiA4NyBCRVwiLCBcIjg3IEI1IEYwIDlGIDg3IEFBXCIsIFwiODcgQjUgRjAgOUYgODcgQURcIiwgXCI4NyBCNSBGMCA5RiA4NyBCM1wiLCBcIjg3IEI1IEYwIDlGIDg3IEIxXCIsIFwiODcgQjUgRjAgOUYgODcgQjlcIiwgXCI4NyBCNSBGMCA5RiA4NyBCN1wiLCBcIjg3IEI2IEYwIDlGIDg3IEE2XCIsIFwiODcgQjcgRjAgOUYgODcgQUFcIiwgXCI4NyBCNyBGMCA5RiA4NyBCNFwiLCBcIjg3IEI3IEYwIDlGIDg3IEJBXCIsIFwiODcgQjcgRjAgOUYgODcgQkNcIiwgXCI4NyBBNyBGMCA5RiA4NyBCMVwiLCBcIjg3IEI4IEYwIDlGIDg3IEFEXCIsIFwiODcgQjAgRjAgOUYgODcgQjNcIiwgXCI4NyBCMSBGMCA5RiA4NyBBOFwiLCBcIjg3IEI1IEYwIDlGIDg3IEIyXCIsIFwiODcgQkIgRjAgOUYgODcgQThcIiwgXCI4NyBCQyBGMCA5RiA4NyBCOFwiLCBcIjg3IEI4IEYwIDlGIDg3IEIyXCIsIFwiODcgQjggRjAgOUYgODcgQjlcIiwgXCI4NyBCOCBGMCA5RiA4NyBBNlwiLCBcIjg3IEI4IEYwIDlGIDg3IEIzXCIsIFwiODcgQjcgRjAgOUYgODcgQjhcIiwgXCI4NyBCOCBGMCA5RiA4NyBBOFwiLCBcIjg3IEI4IEYwIDlGIDg3IEIxXCIsIFwiODcgQjggRjAgOUYgODcgQUNcIiwgXCI4NyBCOCBGMCA5RiA4NyBCRFwiLCBcIjg3IEI4IEYwIDlGIDg3IEIwXCIsIFwiODcgQjggRjAgOUYgODcgQUVcIiwgXCI4NyBCOCBGMCA5RiA4NyBBN1wiLCBcIjg3IEI4IEYwIDlGIDg3IEI0XCIsIFwiODcgQkYgRjAgOUYgODcgQTZcIiwgXCI4NyBBQyBGMCA5RiA4NyBCOFwiLCBcIjg3IEIwIEYwIDlGIDg3IEI3XCIsIFwiODcgQjggRjAgOUYgODcgQjhcIiwgXCI4NyBBQSBGMCA5RiA4NyBCOFwiLCBcIjg3IEIxIEYwIDlGIDg3IEIwXCIsIFwiODcgQjggRjAgOUYgODcgQTlcIiwgXCI4NyBCOCBGMCA5RiA4NyBCN1wiLCBcIjg3IEI4IEYwIDlGIDg3IEJGXCIsIFwiODcgQjggRjAgOUYgODcgQUFcIiwgXCI4NyBBOCBGMCA5RiA4NyBBRFwiLCBcIjg3IEI4IEYwIDlGIDg3IEJFXCIsIFwiODcgQjkgRjAgOUYgODcgQkNcIiwgXCI4NyBCOSBGMCA5RiA4NyBBRlwiLCBcIjg3IEI5IEYwIDlGIDg3IEJGXCIsIFwiODcgQjkgRjAgOUYgODcgQURcIiwgXCI4NyBCOSBGMCA5RiA4NyBCMVwiLCBcIjg3IEI5IEYwIDlGIDg3IEFDXCIsIFwiODcgQjkgRjAgOUYgODcgQjBcIiwgXCI4NyBCOSBGMCA5RiA4NyBCNFwiLCBcIjg3IEI5IEYwIDlGIDg3IEI5XCIsIFwiODcgQjkgRjAgOUYgODcgQjNcIiwgXCI4NyBCOSBGMCA5RiA4NyBCN1wiLCBcIjg3IEI5IEYwIDlGIDg3IEIyXCIsIFwiODcgQjkgRjAgOUYgODcgQThcIiwgXCI4NyBCOSBGMCA5RiA4NyBCQlwiLCBcIjg3IEJBIEYwIDlGIDg3IEFDXCIsIFwiODcgQkEgRjAgOUYgODcgQTZcIiwgXCI4NyBBNiBGMCA5RiA4NyBBQVwiLCBcIjg3IEFDIEYwIDlGIDg3IEE3XCIsIFwiODcgQkEgRjAgOUYgODcgQjhcIiwgXCI4NyBCQiBGMCA5RiA4NyBBRVwiLCBcIjg3IEJBIEYwIDlGIDg3IEJFXCIsIFwiODcgQkEgRjAgOUYgODcgQkZcIiwgXCI4NyBCQiBGMCA5RiA4NyBCQVwiLCBcIjg3IEJCIEYwIDlGIDg3IEE2XCIsIFwiODcgQkIgRjAgOUYgODcgQUFcIiwgXCI4NyBCQiBGMCA5RiA4NyBCM1wiLCBcIjg3IEJDIEYwIDlGIDg3IEFCXCIsIFwiODcgQUEgRjAgOUYgODcgQURcIiwgXCI4NyBCRSBGMCA5RiA4NyBBQVwiLCBcIjg3IEJGIEYwIDlGIDg3IEIyXCIsIFwiODcgQkYgRjAgOUYgODcgQkNcIl1cblx0bmV0d29yazpcIlxuPHN2ZyB3aWR0aD0nMTRweCcgaGVpZ2h0PScxMHB4JyB2aWV3Qm94PSc4NyA1IDE0IDEwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cbiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cbiAgICA8ZGVmcz48L2RlZnM+XG4gICAgPHBhdGggZD0nTTk2LjE0NDQyMDgsMTIuNDM4NTA0MyBDOTUuNjI2Mzc0LDExLjg0NTQ0NTYgOTQuODUyMzYxNiwxMS40Njg5MTE5IDkzLjk4NzU2MywxMS40Njg5MTE5IEM5My4xMzkwMDczLDExLjQ2ODkxMTkgOTIuMzc3ODU5NCwxMS44MzE0MzQxIDkxLjg2MDE2NTIsMTIuNDA1MzE3NyBMOTQuMDIyNTM5MSwxNC41IEw5Ni4xNDQ0MjA4LDEyLjQzODUwNDMgWiBNOTguMzIzNDk2NCwxMC4zMjE0NDI1IEM5Ny4yNDQ3Nzk0LDkuMTkxNzQ1NjMgOTUuNzAxNDM4Nyw4LjQ4NDQ1NTk2IDkzLjk4NzU2Myw4LjQ4NDQ1NTk2IEM5Mi4yODgyNzIzLDguNDg0NDU1OTYgOTAuNzU2NjI2NCw5LjE3OTc1ODkzIDg5LjY3OTI2OTgsMTAuMjkyNjkzNiBMOTAuNzY5Mjk4NywxMS4zNDg2IEM5MS41NjcyMDUsMTAuNTA1MzcwOCA5Mi43MTM2NDgsOS45NzY2ODM5NCA5My45ODc1NjMsOS45NzY2ODM5NCBDOTUuMjc2ODgzNiw5Ljk3NjY4Mzk0IDk2LjQzNTYzMDUsMTAuNTE4MjM1IDk3LjIzNDYyMTUsMTEuMzc5MzI5MyBMOTguMzIzNDk2NCwxMC4zMjE0NDI1IEw5OC4zMjM0OTY0LDEwLjMyMTQ0MjUgWiBNMTAwLjUsOC4yMDY4NzkzMyBDOTguODYyOTU3OCw2LjUzOTQzNjcyIDk2LjU1MDU2OTksNS41IDkzLjk4NzU2Myw1LjUgQzkxLjQzNzUxMDMsNS41IDg5LjEzNTU0OTYsNi41Mjg5NTYwNSA4Ny41LDguMTgxNjQ0MzEgTDg4LjU4OTU1NzksOS4yMzcwOTQ0MSBDODkuOTQ2MDc5OCw3Ljg1NDMxNjU1IDkxLjg2Mjg5MjEsNi45OTIyMjc5OCA5My45ODc1NjMsNi45OTIyMjc5OCBDOTYuMTI2MDAyNiw2Ljk5MjIyNzk4IDk4LjA1Mzg4MDksNy44NjU1MjYwOSA5OS40MTE4Njk4LDkuMjY0MDQyNzIgTDEwMC41LDguMjA2ODc5MzMgWicgaWQ9J1dpLUZpJyBzdHJva2U9J25vbmUnIGZpbGw9JyMwMzAzMDMnIGZpbGwtcnVsZT0nZXZlbm9kZCc+PC9wYXRoPlxuPC9zdmc+XCJcblx0YWN0aXZpdHk6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNiAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPlNvY2NlciBCYWxsPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPlxuXHRcdFx0XHRcdDxjaXJjbGUgaWQ9J3BhdGgtMScgY3g9JzgnIGN5PSc4JyByPSc4Jz48L2NpcmNsZT5cblx0XHRcdFx0PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYnIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNzkuMDAwMDAwLCAtNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J1NvY2Nlci1CYWxsJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNzkuMDAwMDAwLCA2MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxtYXNrIGlkPSdtYXNrLTInIHNrZXRjaDpuYW1lPSdNYXNrJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdFx0XHRcdFx0PHVzZSB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0XHRcdFx0XHRcdFx0PC9tYXNrPlxuXHRcdFx0XHRcdFx0XHQ8dXNlIGlkPSdNYXNrJyBzdHJva2U9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNiwxMi4xMjAzMDQ2IEwxMi44NTczMzg0LDggTDEzLjM3MjM3NjUsOC44NTcxNjczIEw2LjUxNTAzODA3LDEyLjk3NzQ3MTkgTDYsMTIuMTIwMzA0NiBMNiwxMi4xMjAzMDQ2IFonIGlkPSdSZWN0YW5nbGUtNDcnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuODQ5NjQ4LDguNzI2MDU1MSBMMTkuMTAwMTEwMyw1LjM0NTEwOTAxIEwxOS41MjI3Mjg1LDYuMjUxNDE2OCBMMTIuMjcyMjY2Miw5LjYzMjM2Mjg5IEwxMS44NDk2NDgsOC43MjYwNTUxIEwxMS44NDk2NDgsOC43MjYwNTUxIFonIGlkPSdSZWN0YW5nbGUtNDctQ29weS0zJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYsMy4xMjAzMDQ2IEwxMi44NTczMzg0LC0xIEwxMy4zNzIzNzY1LC0wLjE0MjgzMjY5OSBMNi41MTUwMzgwNywzLjk3NzQ3MTkgTDYsMy4xMjAzMDQ2IEw2LDMuMTIwMzA0NiBaJyBpZD0nUmVjdGFuZ2xlLTQ3LUNvcHktMicgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00tMSw3LjEyMDMwNDYgTDUuODU3MzM4NDEsMyBMNi4zNzIzNzY0OCwzLjg1NzE2NzMgTC0wLjQ4NDk2MTkyNSw3Ljk3NzQ3MTkgTC0xLDcuMTIwMzA0NiBMLTEsNy4xMjAzMDQ2IFonIGlkPSdSZWN0YW5nbGUtNDctQ29weS00JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS01MCcgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PSc0JyB5PSc2JyB3aWR0aD0nMScgaGVpZ2h0PSc1Jz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTEnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMTEuNScgeT0nMycgd2lkdGg9JzEnIGhlaWdodD0nMTInPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUsNC44NTcxNjczIEwxMS44NTczMzg0LDguOTc3NDcxOSBMMTIuMzcyMzc2NSw4LjEyMDMwNDYgTDUuNTE1MDM4MDcsNCBMNSw0Ljg1NzE2NzMnIGlkPSdSZWN0YW5nbGUtNDctQ29weScgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LDEyLjg1NzE2NzMgTDExLjg1NzMzODQsMTYuOTc3NDcxOSBMMTIuMzcyMzc2NSwxNi4xMjAzMDQ2IEw1LjUxNTAzODA3LDEyIEw1LDEyLjg1NzE2NzMnIGlkPSdSZWN0YW5nbGUtNDctQ29weS01JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTExLjkwNDg5NzIsNi4xNDc2NjA2NCBMMTMuODcxNDIyNyw4LjMzMTcwODQ5IEwxMi40MDE5NTk2LDEwLjg3Njg5MzMgTDkuNTI3MjU1ODksMTAuMjY1ODU2MiBMOS4yMjAwNTQ0NSw3LjM0MzAyOTY1IEwxMS45MDQ4OTcyLDYuMTQ3NjYwNjQnIGlkPSdQb2x5Z29uLTEnIGZpbGw9JyNEOEQ4RDgnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuOTA0ODk3Miw2LjE0NzY2MDY0IEwxMy44NzE0MjI3LDguMzMxNzA4NDkgTDEyLjQwMTk1OTYsMTAuODc2ODkzMyBMOS41MjcyNTU4OSwxMC4yNjU4NTYyIEw5LjIyMDA1NDQ1LDcuMzQzMDI5NjUgTDExLjkwNDg5NzIsNi4xNDc2NjA2NCcgaWQ9J1BvbHlnb24tMS1Db3B5JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNDU3NzExODksMy4xOTUwNDczOSBMNy4zNTUxNDQ4NCw2LjEzMjE4MzMzIEw0LjUzMDA2NzYsNi45NDIyNjEyIEwyLjg4NjY0MDg5LDQuNTA1NzgwOSBMNC42OTYwMjQ1NywyLjE4OTg3NTQxIEw3LjQ1NzcxMTg5LDMuMTk1MDQ3MzknIGlkPSdQb2x5Z29uLTEtQ29weS0yJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTcuNDU3NzExODksMTEuMTk1MDQ3NCBMNy4zNTUxNDQ4NCwxNC4xMzIxODMzIEw0LjUzMDA2NzYsMTQuOTQyMjYxMiBMMi44ODY2NDA4OSwxMi41MDU3ODA5IEw0LjY5NjAyNDU3LDEwLjE4OTg3NTQgTDcuNDU3NzExODksMTEuMTk1MDQ3NCcgaWQ9J1BvbHlnb24tMS1Db3B5LTMnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTQuNTQzMTcwMSwwLjA3MjU5MzkzMTQgTDE0LjQ0MDYwMzEsMy4wMDk3Mjk4OCBMMTEuNjE1NTI1OCwzLjgxOTgwNzc0IEw5Ljk3MjA5OTEyLDEuMzgzMzI3NDUgTDExLjc4MTQ4MjgsLTAuOTMyNTc4MDUgTDE0LjU0MzE3MDEsMC4wNzI1OTM5MzE0JyBpZD0nUG9seWdvbi0xLUNvcHktNCcgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRhbmltYWxzOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5Hcm91cDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNicgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTExNy4wMDAwMDAsIC02MzkuMDAwMDAwKScgc3Ryb2tlPScjNEE1MzYxJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdpY19Gb29kJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxMTguMDAwMDAwLCA2NDAuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdHcm91cCcgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuNjgzNzc1MzcsMS4zODE1NjY0NiBDNi4yMzkyNjA2NiwxLjEzNjI0IDYuODUzNzIwMDUsMSA3LjUsMSBDOC4xNDYyNzk5NSwxIDguNzYwNzM5MzQsMS4xMzYyNCA5LjMxNjIyNDYzLDEuMzgxNTY2NDYgQzkuODA4NzkyNzUsMC41NjIzNTkwMTkgMTAuODI1NTg4OCwwIDEyLDAgQzEzLjY1Njg1NDIsMCAxNSwxLjExOTI4ODEzIDE1LDIuNSBDMTUsMy41NTcxMzk4IDE0LjIxMjYyNDYsNC40NjEwMjg0MyAxMy4wOTk5MjI2LDQuODI2NjI1MTQgQzE0LjI0OTY1MjgsNS42NDE4NTQyMiAxNSw2Ljk4MzMwMDYyIDE1LDguNSBDMTUsMTAuNzE2NzE0NCAxMy4zOTcxODczLDEyLjU1OTA3MTkgMTEuMjg3MjY3MSwxMi45MzEzNjczIEMxMC40ODY3MjQ4LDE0LjE3NTc3MDMgOS4wODk2MTY5NiwxNSA3LjUsMTUgQzUuOTEwMzgzMDQsMTUgNC41MTMyNzUyNCwxNC4xNzU3NzAzIDMuNzEyNzMyOTEsMTIuOTMxMzY3MyBDMS42MDI4MTI2OCwxMi41NTkwNzE5IDAsMTAuNzE2NzE0NCAwLDguNSBDMCw2Ljk4MzMwMDYyIDAuNzUwMzQ3MjQ0LDUuNjQxODU0MjIgMS45MDAwNzc0MSw0LjgyNjYyNTE0IEMwLjc4NzM3NTQ0NSw0LjQ2MTAyODQzIDAsMy41NTcxMzk4IDAsMi41IEMwLDEuMTE5Mjg4MTMgMS4zNDMxNDU3NSwwIDMsMCBDNC4xNzQ0MTEyMiwwIDUuMTkxMjA3MjUsMC41NjIzNTkwMTkgNS42ODM3NzUzNywxLjM4MTU2NjQ2IFonIGlkPSdPdmFsLTgnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS43MzgzNDIyOCwxMiBDNS44NjI5MDk3OSwxMiA2LjE0NjQyMzUzLDEyIDYuMTQ2NDIzNTMsMTIgQzYuMTQ2NDIzNTMsMTIgNi40MzIxNTY5NiwxMi40NDI2MTIzIDYuNTI0NjU4MiwxMi40OTE5NzM5IEM2LjY2NDU1NjAxLDEyLjU2NjYyNzcgNywxMi40OTE5NzM5IDcsMTIuNDkxOTczOSBMNywxMiBMOCwxMiBMOCwxMi40OTE5NzM5IEw4LjQ5Nzk5MjI4LDEyLjQ5MTk3MzkgTDguODQzMDE3NjksMTIgTDkuMzkxODQ1NywxMiBDOS4zOTE4NDU3LDEyIDguOTk1OTg0NTcsMTIuOTgzOTQ3OCA4LjQ5Nzk5MjI4LDEyLjk4Mzk0NzggTDYuNjA3MDI0MDcsMTIuOTgzOTQ3OCBDNi4yMTQwNDgxMywxMi45ODM5NDc4IDUuNDU5OTYwOTQsMTIgNS43MzgzNDIyOCwxMiBaJyBpZD0nUmVjdGFuZ2xlLTQ0LUNvcHktMic+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxjaXJjbGUgaWQ9J092YWwtMTQnIGN4PScxMC41JyBjeT0nNy41JyByPScwLjUnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxjaXJjbGUgaWQ9J092YWwtMTQtQ29weScgY3g9JzQuNScgY3k9JzcuNScgcj0nMC41Jz48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTIuNjk5OTk2OSw1IEMxMi42OTk5OTY5LDMuMDY3MDAzMzggMTEuMTMyOTkzNiwxLjUgOS4xOTk5OTY5NSwxLjUnIGlkPSdPdmFsLTE2Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuNSw1IEM1LjUsMy4wNjcwMDMzOCAzLjkzMjk5NjYyLDEuNSAyLDEuNScgaWQ9J092YWwtMTYtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy43NTAwMDAsIDMuMjUwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0zLjc1MDAwMCwgLTMuMjUwMDAwKSAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTQ0LUNvcHknIHg9JzcnIHk9JzExJyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYsMTAgTDYuNSwxMCBMNi40OTk5OTk5OSw5LjUgTDguNTAwMDAwMDUsOS41IEw4LjUwMDAwMDA1LDEwIEw5LDEwIEw5LDEwLjUgTDguNSwxMC41IEw4LjUsMTEgTDYuNSwxMSBMNi41LDEwLjUgTDYsMTAuNSBMNiwxMCBaJyBpZD0nUGF0aCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRjaGV2cm9uIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScxM3B4JyBoZWlnaHQ9JzIycHgnIHZpZXdCb3g9JzAgMCAxMyAyMicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdCAgICA8dGl0bGU+QmFjayBDaGV2cm9uPC90aXRsZT5cblx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdFx0ICAgICAgICA8ZyBpZD0nTmF2aWdhdGlvbi1CYXIvQmFjaycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTguMDAwMDAwLCAtMzEuMDAwMDAwKScgZmlsbD0nIzAwNzZGRic+XG5cdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTguNSw0MiBMMTksMzEuNSBMMjEsMzMuNSBMMTIuNSw0MiBMMjEsNTAuNSBMMTksNTIuNSBMOC41LDQyIFonIGlkPSdCYWNrLUNoZXZyb24nPjwvcGF0aD5cblx0XHQgICAgICAgIDwvZz5cblx0XHQgICAgPC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGVtb2ppczogW1wi8J+YgFwiLCBcIvCfmKxcIiwgXCLwn5iBXCIsIFwi8J+YglwiLCBcIvCfmINcIiwgXCLwn5iEXCIsIFwi8J+YhVwiLCBcIvCfmIZcIiwgXCLwn5iHXCIsIFwi8J+YiVwiLCBcIvCfmIpcIiwgXCLwn5mCXCIsIFwi8J+Zg1wiLCBcIuKYuu+4j1wiLCBcIvCfmItcIiwgXCLwn5iMXCIsIFwi8J+YjVwiLCBcIvCfmJhcIiwgXCLwn5iXXCIsIFwi8J+YmVwiLCBcIvCfmJpcIiwgXCLwn5icXCIsIFwi8J+YnVwiLCBcIvCfmJtcIiwgXCLwn6SRXCIsIFwi8J+kk1wiLCBcIvCfmI5cIiwgXCLwn6SXXCIsIFwi8J+Yj1wiLCBcIvCfmLZcIiwgXCLwn5iQXCIsIFwi8J+YkVwiLCBcIvCfmJJcIiwgXCLwn5mEXCIsIFwi8J+klFwiLCBcIvCfmLNcIiwgXCLwn5ieXCIsIFwi8J+Yn1wiLCBcIvCfmKBcIiwgXCLwn5ihXCIsIFwi8J+YlFwiLCBcIvCfmJVcIiwgXCLwn5mBXCIsIFwi4pi577iPXCIsIFwi8J+Yo1wiLCBcIvCfmJZcIiwgXCLwn5irXCIsIFwi8J+YqVwiLCBcIvCfmKRcIiwgXCLwn5iuXCIsIFwi8J+YsVwiLCBcIvCfmKhcIiwgXCLwn5iwXCIsIFwi8J+Yr1wiLCBcIvCfmKZcIiwgXCLwn5inXCIsIFwi8J+YolwiLCBcIvCfmKVcIiwgXCLwn5iqXCIsIFwi8J+Yk1wiLCBcIvCfmK1cIiwgXCLwn5i1XCIsIFwi8J+YslwiLCBcIvCfpJBcIiwgXCLwn5i3XCIsIFwi8J+kklwiLCBcIvCfpJVcIiwgXCLwn5i0XCIsIFwi8J+SpFwiLCBcIvCfkqlcIiwgXCLwn5iIXCIsIFwi8J+Rv1wiLCBcIvCfkblcIiwgXCLwn5G6XCIsIFwi8J+SgFwiLCBcIvCfkbtcIiwgXCLwn5G9XCIsIFwi8J+kllwiLCBcIvCfmLpcIiwgXCLwn5i4XCIsIFwi8J+YuVwiLCBcIvCfmLtcIiwgXCLwn5i8XCIsIFwi8J+YvVwiLCBcIvCfmYBcIiwgXCLwn5i/XCIsIFwi8J+YvlwiLCBcIvCfmYxcIiwgXCLwn5GPXCIsIFwi8J+Ri1wiLCBcIvCfkY1cIiwgXCLwn5GOXCIsIFwi8J+RilwiLCBcIuKcilwiLCBcIuKcjO+4j1wiLCBcIvCfkYxcIiwgXCLinItcIiwgXCLwn5GQXCIsIFwi8J+SqlwiLCBcIvCfmY9cIiwgXCLimJ3vuI9cIiwgXCLwn5GGXCIsIFwi8J+Rh1wiLCBcIvCfkYhcIiwgXCLwn5GJXCIsIFwi8J+WlVwiLCBcIvCflpBcIiwgXCLwn6SYXCIsIFwi8J+WllwiLCBcIuKcje+4j1wiLCBcIvCfkoVcIiwgXCLwn5GEXCIsIFwi8J+RhVwiLCBcIvCfkYJcIiwgXCLwn5GDXCIsIFwi8J+RgVwiLCBcIvCfkYBcIiwgXCLwn5GkXCIsIFwi8J+RpVwiLCBcIvCfl6NcIiwgXCLwn5G2XCIsIFwi8J+RplwiLCBcIvCfkadcIiwgXCLwn5GoXCIsIFwi8J+RqVwiLCBcIvCfkbFcIiwgXCLwn5G0XCIsIFwi8J+RtVwiLCBcIvCfkbJcIiwgXCLwn5GzXCIsIFwi8J+RrlwiLCBcIvCfkbdcIiwgXCLwn5KCXCIsIFwi8J+VtVwiLCBcIvCfjoVcIiwgXCLwn5G8XCIsIFwi8J+RuFwiLCBcIvCfkbBcIiwgXCLwn5q2XCIsIFwi8J+Pg1wiLCBcIvCfkoNcIiwgXCLwn5GvXCIsIFwi8J+Rq1wiLCBcIvCfkaxcIiwgXCLwn5GtXCIsIFwi8J+Zh1wiLCBcIvCfkoFcIiwgXCLwn5mFXCIsIFwi8J+ZhlwiLCBcIvCfmYtcIiwgXCLwn5mOXCIsIFwi8J+ZjVwiLCBcIvCfkodcIiwgXCLwn5KGXCIsIFwi8J+SkVwiLCBcIvCfkanigI3inaTvuI/igI3wn5GpXCIsIFwi8J+RqOKAjeKdpO+4j+KAjfCfkahcIiwgXCLwn5KPXCIsIFwi8J+RqeKAjeKdpO+4j+KAjfCfkovigI3wn5GpXCIsIFwi8J+RqOKAjeKdpO+4j+KAjfCfkovigI3wn5GoXCIsIFwi8J+RqlwiLCBcIvCfkajigI3wn5Gp4oCN8J+Rp1wiLCBcIvCfkajigI3wn5Gp4oCN8J+Rp+KAjfCfkaZcIiwgXCLwn5Go4oCN8J+RqeKAjfCfkabigI3wn5GmXCIsIFwi8J+RqOKAjfCfkanigI3wn5Gn4oCN8J+Rp1wiLCBcIvCfkanigI3wn5Gp4oCN8J+RplwiLCBcIvCfkanigI3wn5Gp4oCN8J+Rp1wiLCBcIvCfkanigI3wn5Gp4oCN8J+Rp+KAjfCfkaZcIiwgXCLwn5Gp4oCN8J+RqeKAjfCfkabigI3wn5GmXCIsIFwi8J+RqeKAjfCfkanigI3wn5Gn4oCN8J+Rp1wiLCBcIvCfkajigI3wn5Go4oCN8J+RplwiLCBcIvCfkajigI3wn5Go4oCN8J+Rp1wiLCBcIvCfkajigI3wn5Go4oCN8J+Rp+KAjfCfkaZcIiwgXCLwn5Go4oCN8J+RqOKAjfCfkabigI3wn5GmXCIsIFwi8J+RqOKAjfCfkajigI3wn5Gn4oCN8J+Rp1wiLCBcIvCfkZpcIiwgXCLwn5GVXCIsIFwi8J+RllwiLCBcIvCfkZRcIiwgXCLwn5GXXCIsIFwi8J+RmVwiLCBcIvCfkZhcIiwgXCLwn5KEXCIsIFwi8J+Si1wiLCBcIvCfkaNcIiwgXCLwn5GgXCIsIFwi8J+RoVwiLCBcIvCfkaJcIiwgXCLwn5GeXCIsIFwi8J+Rn1wiLCBcIvCfkZJcIiwgXCLwn46pXCIsIFwi4puRXCIsIFwi8J+Ok1wiLCBcIvCfkZFcIiwgXCLwn46SXCIsIFwi8J+RnVwiLCBcIvCfkZtcIiwgXCLwn5GcXCIsIFwi8J+SvFwiLCBcIvCfkZNcIiwgXCLwn5W2XCIsIFwi8J+SjVwiLCBcIvCfjIJcIiwgXCLwn5uRXCIsIFwi8J+QtlwiLCBcIvCfkLFcIiwgXCLwn5CtXCIsIFwi8J+QuVwiLCBcIvCfkLBcIiwgXCLwn5C7XCIsIFwi8J+QvFwiLCBcIvCfkKhcIiwgXCLwn5CvXCIsIFwi8J+mgVwiLCBcIvCfkK5cIiwgXCLwn5C3XCIsIFwi8J+QvVwiLCBcIvCfkLhcIiwgXCLwn5CZXCIsIFwi8J+QtVwiLCBcIvCfmYhcIiwgXCLwn5mJXCIsIFwi8J+ZilwiLCBcIvCfkJJcIiwgXCLwn5CUXCIsIFwi8J+Qp1wiLCBcIvCfkKZcIiwgXCLwn5CkXCIsIFwi8J+Qo1wiLCBcIvCfkKVcIiwgXCLwn5C6XCIsIFwi8J+Ql1wiLCBcIvCfkLRcIiwgXCLwn6aEXCIsIFwi8J+QnVwiLCBcIvCfkJtcIiwgXCLwn5CMXCIsIFwi8J+QnlwiLCBcIvCfkJxcIiwgXCLwn5W3XCIsIFwi8J+mglwiLCBcIvCfpoBcIiwgXCLwn5CNXCIsIFwi8J+QolwiLCBcIvCfkKBcIiwgXCLwn5CfXCIsIFwi8J+QoVwiLCBcIvCfkKxcIiwgXCLwn5CzXCIsIFwi8J+Qi1wiLCBcIvCfkIpcIiwgXCLwn5CGXCIsIFwi8J+QhVwiLCBcIvCfkINcIiwgXCLwn5CCXCIsIFwi8J+QhFwiLCBcIvCfkKpcIiwgXCLwn5CrXCIsIFwi8J+QmFwiLCBcIvCfkJBcIiwgXCLwn5CPXCIsIFwi8J+QkVwiLCBcIvCfkI5cIiwgXCLwn5CWXCIsIFwi8J+QgFwiLCBcIvCfkIFcIiwgXCLwn5CTXCIsIFwi8J+mg1wiLCBcIvCflYpcIiwgXCLwn5CVXCIsIFwi8J+QqVwiLCBcIvCfkIhcIiwgXCLwn5CHXCIsIFwi8J+Qv1wiLCBcIvCfkL5cIiwgXCLwn5CJXCIsIFwi8J+QslwiLCBcIvCfjLVcIiwgXCLwn46EXCIsIFwi8J+MslwiLCBcIvCfjLNcIiwgXCLwn4y0XCIsIFwi8J+MsVwiLCBcIvCfjL9cIiwgXCLimJhcIiwgXCLwn42AXCIsIFwi8J+OjVwiLCBcIvCfjotcIiwgXCLwn42DXCIsIFwi8J+NglwiLCBcIvCfjYFcIiwgXCLwn4y+XCIsIFwi8J+MulwiLCBcIvCfjLpcIiwgXCLwn4y7XCIsIFwi8J+MuVwiLCBcIvCfjLdcIiwgXCLwn4y8XCIsIFwi8J+MuFwiLCBcIvCfkpBcIiwgXCLwn42EXCIsIFwi8J+MsFwiLCBcIvCfjoNcIiwgXCLwn5CaXCIsIFwi8J+VuFwiLCBcIvCfjI5cIiwgXCLwn4yNXCIsIFwi8J+Mj1wiLCBcIvCfjJVcIiwgXCLwn4yWXCIsIFwi8J+Ml1wiLCBcIvCfjJhcIiwgXCLwn4yRXCIsIFwi8J+MklwiLCBcIvCfjJNcIiwgXCLwn4yUXCIsIFwi8J+MmlwiLCBcIvCfjJ1cIiwgXCLwn4ybXCIsIFwi8J+MnFwiLCBcIvCfjJ5cIiwgXCLwn4yZXCIsIFwi4q2Q77iPXCIsIFwi8J+Mn1wiLCBcIvCfkqtcIiwgXCLinKhcIiwgXCLimITvuI9cIiwgXCLimIDvuI9cIiwgXCLwn4ykXCIsIFwi4puF77iPXCIsIFwi8J+MpVwiLCBcIvCfjKZcIiwgXCLimIHvuI9cIiwgXCLwn4ynXCIsIFwi4puIXCIsIFwi8J+MqVwiLCBcIuKaoe+4j1wiLCBcIvCflKVcIiwgXCLwn5KlXCIsIFwi4p2E77iPXCIsIFwi8J+MqFwiLCBcIuKYg++4j1wiLCBcIuKbhO+4j1wiLCBcIvCfjKxcIiwgXCLwn5KoXCIsIFwi8J+MqlwiLCBcIvCfjKtcIiwgXCLimILvuI9cIiwgXCLimJTvuI9cIiwgXCLwn5KnXCIsIFwi8J+SplwiLCBcIvCfjIpcIiwgXCLwn5uRXCIsIFwi8J+bkVwiLCBcIvCfjY9cIiwgXCLwn42OXCIsIFwi8J+NkFwiLCBcIvCfjYpcIiwgXCLwn42LXCIsIFwi8J+NjFwiLCBcIvCfjYlcIiwgXCLwn42HXCIsIFwi8J+Nk1wiLCBcIvCfjYhcIiwgXCLwn42SXCIsIFwi8J+NkVwiLCBcIvCfjY1cIiwgXCLwn42FXCIsIFwi8J+NhlwiLCBcIvCfjLZcIiwgXCLwn4y9XCIsIFwi8J+NoFwiLCBcIvCfja9cIiwgXCLwn42eXCIsIFwi8J+ngFwiLCBcIvCfjZdcIiwgXCLwn42WXCIsIFwi8J+NpFwiLCBcIvCfjbNcIiwgXCLwn42UXCIsIFwi8J+Nn1wiLCBcIvCfjK1cIiwgXCLwn42VXCIsIFwi8J+NnVwiLCBcIvCfjK5cIiwgXCLwn4yvXCIsIFwi8J+NnFwiLCBcIvCfjbJcIiwgXCLwn42lXCIsIFwi8J+No1wiLCBcIvCfjbFcIiwgXCLwn42bXCIsIFwi8J+NmVwiLCBcIvCfjZpcIiwgXCLwn42YXCIsIFwi8J+NolwiLCBcIvCfjaFcIiwgXCLwn42nXCIsIFwi8J+NqFwiLCBcIvCfjaZcIiwgXCLwn42wXCIsIFwi8J+OglwiLCBcIvCfja5cIiwgXCLwn42sXCIsIFwi8J+NrVwiLCBcIvCfjatcIiwgXCLwn42/XCIsIFwi8J+NqVwiLCBcIvCfjapcIiwgXCLwn426XCIsIFwi8J+Nu1wiLCBcIvCfjbdcIiwgXCLwn424XCIsIFwi8J+NuVwiLCBcIvCfjb5cIiwgXCLwn422XCIsIFwi8J+NtVwiLCBcIuKYle+4j1wiLCBcIvCfjbxcIiwgXCLwn420XCIsIFwi8J+NvVwiLCBcIvCfm5FcIiwgXCLwn5uRXCIsIFwi8J+bkVwiLCBcIuKave+4j1wiLCBcIvCfj4BcIiwgXCLwn4+IXCIsIFwi4pq+77iPXCIsIFwi8J+OvlwiLCBcIvCfj5BcIiwgXCLwn4+JXCIsIFwi8J+OsVwiLCBcIuKbs++4j1wiLCBcIvCfj4xcIiwgXCLwn4+TXCIsIFwi8J+PuFwiLCBcIvCfj5JcIiwgXCLwn4+RXCIsIFwi8J+Pj1wiLCBcIvCfjr9cIiwgXCLim7dcIiwgXCLwn4+CXCIsIFwi4pu4XCIsIFwi8J+PuVwiLCBcIvCfjqNcIiwgXCLwn5qjXCIsIFwi8J+PilwiLCBcIvCfj4RcIiwgXCLwn5uAXCIsIFwi4pu5XCIsIFwi8J+Pi1wiLCBcIvCfmrRcIiwgXCLwn5q1XCIsIFwi8J+Ph1wiLCBcIvCflbRcIiwgXCLwn4+GXCIsIFwi8J+OvVwiLCBcIvCfj4VcIiwgXCLwn46WXCIsIFwi8J+Ol1wiLCBcIvCfj7VcIiwgXCLwn46rXCIsIFwi8J+On1wiLCBcIvCfjq1cIiwgXCLwn46oXCIsIFwi8J+OqlwiLCBcIvCfjqRcIiwgXCLwn46nXCIsIFwi8J+OvFwiLCBcIvCfjrlcIiwgXCLwn463XCIsIFwi8J+OulwiLCBcIvCfjrhcIiwgXCLwn467XCIsIFwi8J+OrFwiLCBcIvCfjq5cIiwgXCLwn5G+XCIsIFwi8J+Or1wiLCBcIvCfjrJcIiwgXCLwn46wXCIsIFwi8J+Os1wiLCBcIvCfm5FcIiwgXCLwn5uRXCIsIFwi8J+bkVwiLCBcIvCfmpdcIiwgXCLwn5qVXCIsIFwi8J+amVwiLCBcIvCfmoxcIiwgXCLwn5qOXCIsIFwi8J+PjlwiLCBcIvCfmpNcIiwgXCLwn5qRXCIsIFwi8J+aklwiLCBcIvCfmpBcIiwgXCLwn5qaXCIsIFwi8J+am1wiLCBcIvCfmpxcIiwgXCLwn4+NXCIsIFwi8J+aslwiLCBcIvCfmqhcIiwgXCLwn5qUXCIsIFwi8J+ajVwiLCBcIvCfmphcIiwgXCLwn5qWXCIsIFwi8J+aoVwiLCBcIvCfmqBcIiwgXCLwn5qvXCIsIFwi8J+ag1wiLCBcIvCfmotcIiwgXCLwn5qdXCIsIFwi8J+ahFwiLCBcIvCfmoVcIiwgXCLwn5qIXCIsIFwi8J+anlwiLCBcIvCfmoJcIiwgXCLwn5qGXCIsIFwi8J+ah1wiLCBcIvCfmopcIiwgXCLwn5qJXCIsIFwi8J+agVwiLCBcIvCfm6lcIiwgXCLinIjvuI9cIiwgXCLwn5urXCIsIFwi8J+brFwiLCBcIuKbte+4j1wiLCBcIvCfm6VcIiwgXCLwn5qkXCIsIFwi4pu0XCIsIFwi8J+bs1wiLCBcIvCfmoBcIiwgXCLwn5uwXCIsIFwi8J+SulwiLCBcIuKak++4j1wiLCBcIvCfmqdcIiwgXCLim73vuI9cIiwgXCLwn5qPXCIsIFwi8J+aplwiLCBcIvCfmqVcIiwgXCLwn4+BXCIsIFwi8J+aolwiLCBcIvCfjqFcIiwgXCLwn46iXCIsIFwi8J+OoFwiLCBcIvCfj5dcIiwgXCLwn4yBXCIsIFwi8J+XvFwiLCBcIvCfj61cIiwgXCLim7LvuI9cIiwgXCLwn46RXCIsIFwi4puwXCIsIFwi8J+PlFwiLCBcIvCfl7tcIiwgXCLwn4yLXCIsIFwi8J+XvlwiLCBcIvCfj5VcIiwgXCLim7rvuI9cIiwgXCLwn4+eXCIsIFwi8J+bo1wiLCBcIvCfm6RcIiwgXCLwn4yFXCIsIFwi8J+MhFwiLCBcIvCfj5xcIiwgXCLwn4+WXCIsIFwi8J+PnVwiLCBcIvCfjIdcIiwgXCLwn4yGXCIsIFwi8J+PmVwiLCBcIvCfjINcIiwgXCLwn4yJXCIsIFwi8J+MjFwiLCBcIvCfjKBcIiwgXCLwn46HXCIsIFwi8J+OhlwiLCBcIvCfjIhcIiwgXCLwn4+YXCIsIFwi8J+PsFwiLCBcIvCfj69cIiwgXCLwn4+fXCIsIFwi8J+XvVwiLCBcIvCfj6BcIiwgXCLwn4+hXCIsIFwi8J+PmlwiLCBcIvCfj6JcIiwgXCLwn4+sXCIsIFwi8J+Po1wiLCBcIvCfj6RcIiwgXCLwn4+lXCIsIFwi8J+PplwiLCBcIvCfj6hcIiwgXCLwn4+qXCIsIFwi8J+Pq1wiLCBcIvCfj6lcIiwgXCLwn5KSXCIsIFwi8J+Pm1wiLCBcIuKbqu+4j1wiLCBcIvCflYxcIiwgXCLwn5WNXCIsIFwi8J+Vi1wiLCBcIuKbqVwiLCBcIuKMmu+4j1wiLCBcIvCfk7FcIiwgXCLwn5OyXCIsIFwi8J+Su1wiLCBcIuKMqO+4j1wiLCBcIvCflqVcIiwgXCLwn5aoXCIsIFwi8J+WsVwiLCBcIvCflrJcIiwgXCLwn5W5XCIsIFwi8J+XnFwiLCBcIvCfkr1cIiwgXCLwn5K+XCIsIFwi8J+Sv1wiLCBcIvCfk4BcIiwgXCLwn5O8XCIsIFwi8J+Tt1wiLCBcIvCfk7hcIiwgXCLwn5O5XCIsIFwi8J+OpVwiLCBcIvCfk71cIiwgXCLwn46eXCIsIFwi8J+TnlwiLCBcIuKYju+4j1wiLCBcIvCfk59cIiwgXCLwn5OgXCIsIFwi8J+TulwiLCBcIvCfk7tcIiwgXCLwn46ZXCIsIFwi8J+OmlwiLCBcIvCfjptcIiwgXCLij7FcIiwgXCLij7JcIiwgXCLij7BcIiwgXCLwn5WwXCIsIFwi4o+zXCIsIFwi4oyb77iPXCIsIFwi8J+ToVwiLCBcIvCflItcIiwgXCLwn5SMXCIsIFwi8J+SoVwiLCBcIvCflKZcIiwgXCLwn5WvXCIsIFwi8J+XkVwiLCBcIvCfm6JcIiwgXCLwn5K4XCIsIFwi8J+StVwiLCBcIvCfkrRcIiwgXCLwn5K2XCIsIFwi8J+St1wiLCBcIvCfkrBcIiwgXCLwn5KzXCIsIFwi8J+SjlwiLCBcIuKallwiLCBcIvCflKdcIiwgXCLwn5SoXCIsIFwi4pqSXCIsIFwi8J+boFwiLCBcIuKbj1wiLCBcIvCflKlcIiwgXCLimplcIiwgXCLim5NcIiwgXCLwn5SrXCIsIFwi8J+So1wiLCBcIvCflKpcIiwgXCLwn5ehXCIsIFwi4pqUXCIsIFwi8J+boVwiLCBcIvCfmqxcIiwgXCLimKDvuI9cIiwgXCLimrBcIiwgXCLimrFcIiwgXCLwn4+6XCIsIFwi8J+UrlwiLCBcIvCfk79cIiwgXCLwn5KIXCIsIFwi4pqXXCIsIFwi8J+UrVwiLCBcIvCflKxcIiwgXCLwn5WzXCIsIFwi8J+SilwiLCBcIvCfkolcIiwgXCLwn4yhXCIsIFwi8J+Pt1wiLCBcIvCflJZcIiwgXCLwn5q9XCIsIFwi8J+av1wiLCBcIvCfm4FcIiwgXCLwn5SRXCIsIFwi8J+XnVwiLCBcIvCfm4tcIiwgXCLwn5uMXCIsIFwi8J+bj1wiLCBcIvCfmqpcIiwgXCLwn5uOXCIsIFwi8J+WvFwiLCBcIvCfl7pcIiwgXCLim7FcIiwgXCLwn5e/XCIsIFwi8J+bjVwiLCBcIvCfjohcIiwgXCLwn46PXCIsIFwi8J+OgFwiLCBcIvCfjoFcIiwgXCLwn46KXCIsIFwi8J+OiVwiLCBcIvCfjo5cIiwgXCLwn46QXCIsIFwi8J+OjFwiLCBcIvCfj65cIiwgXCLinInvuI9cIiwgXCLwn5OpXCIsIFwi8J+TqFwiLCBcIvCfk6dcIiwgXCLwn5KMXCIsIFwi8J+TrlwiLCBcIvCfk6pcIiwgXCLwn5OrXCIsIFwi8J+TrFwiLCBcIvCfk61cIiwgXCLwn5OmXCIsIFwi8J+Tr1wiLCBcIvCfk6VcIiwgXCLwn5OkXCIsIFwi8J+TnFwiLCBcIvCfk4NcIiwgXCLwn5ORXCIsIFwi8J+TilwiLCBcIvCfk4hcIiwgXCLwn5OJXCIsIFwi8J+ThFwiLCBcIvCfk4VcIiwgXCLwn5OGXCIsIFwi8J+Xk1wiLCBcIvCfk4dcIiwgXCLwn5eDXCIsIFwi8J+Xs1wiLCBcIvCfl4RcIiwgXCLwn5OLXCIsIFwi8J+XklwiLCBcIvCfk4FcIiwgXCLwn5OCXCIsIFwi8J+XglwiLCBcIvCfl55cIiwgXCLwn5OwXCIsIFwi8J+Tk1wiLCBcIvCfk5VcIiwgXCLwn5OXXCIsIFwi8J+TmFwiLCBcIvCfk5lcIiwgXCLwn5OUXCIsIFwi8J+TklwiLCBcIvCfk5pcIiwgXCLwn5OWXCIsIFwi8J+Ul1wiLCBcIvCfk45cIiwgXCLwn5aHXCIsIFwi4pyC77iPXCIsIFwi8J+TkFwiLCBcIvCfk49cIiwgXCLwn5OMXCIsIFwi8J+TjVwiLCBcIvCfmqlcIiwgXCLwn4+zXCIsIFwi8J+PtFwiLCBcIvCflJBcIiwgXCLwn5SSXCIsIFwi8J+Uk1wiLCBcIvCflI9cIiwgXCLwn5aKXCIsIFwi8J+Wi1wiLCBcIuKcku+4j1wiLCBcIvCfk51cIiwgXCLinI/vuI9cIiwgXCLwn5aNXCIsIFwi8J+WjFwiLCBcIvCflI1cIiwgXCLwn5SOXCIsIFwi8J+bkVwiLCBcIvCfm5FcIiwgXCLinaTvuI9cIiwgXCLwn5KbXCIsIFwi8J+SmlwiLCBcIvCfkplcIiwgXCLwn5KcXCIsIFwi8J+SlFwiLCBcIuKdo++4j1wiLCBcIvCfkpVcIiwgXCLwn5KeXCIsIFwi8J+Sk1wiLCBcIvCfkpdcIiwgXCLwn5KWXCIsIFwi8J+SmFwiLCBcIvCfkp1cIiwgXCLwn5KfXCIsIFwi4piu77iPXCIsIFwi4pyd77iPXCIsIFwi4piq77iPXCIsIFwi8J+ViVwiLCBcIuKYuO+4j1wiLCBcIuKcoe+4j1wiLCBcIvCflK9cIiwgXCLwn5WOXCIsIFwi4piv77iPXCIsIFwi4pim77iPXCIsIFwi8J+bkFwiLCBcIuKbjlwiLCBcIuKZiO+4j1wiLCBcIuKZie+4j1wiLCBcIuKZiu+4j1wiLCBcIuKZi++4j1wiLCBcIuKZjO+4j1wiLCBcIuKZje+4j1wiLCBcIuKZju+4j1wiLCBcIuKZj++4j1wiLCBcIuKZkO+4j1wiLCBcIuKZke+4j1wiLCBcIuKZku+4j1wiLCBcIuKZk++4j1wiLCBcIvCfhpRcIiwgXCLimptcIiwgXCLwn4izXCIsIFwi8J+IuVwiLCBcIuKYou+4j1wiLCBcIuKYo++4j1wiLCBcIvCfk7RcIiwgXCLwn5OzXCIsIFwi8J+ItlwiLCBcIvCfiJrvuI9cIiwgXCLwn4i4XCIsIFwi8J+IulwiLCBcIvCfiLfvuI9cIiwgXCLinLTvuI9cIiwgXCLwn4aaXCIsIFwi8J+JkVwiLCBcIvCfkq5cIiwgXCLwn4mQXCIsIFwi44qZ77iPXCIsIFwi44qX77iPXCIsIFwi8J+ItFwiLCBcIvCfiLVcIiwgXCLwn4iyXCIsIFwi8J+FsO+4j1wiLCBcIvCfhbHvuI9cIiwgXCLwn4aOXCIsIFwi8J+GkVwiLCBcIvCfhb7vuI9cIiwgXCLwn4aYXCIsIFwi4puU77iPXCIsIFwi8J+Tm1wiLCBcIvCfmqtcIiwgXCLinYxcIiwgXCLirZXvuI9cIiwgXCLwn5KiXCIsIFwi4pmo77iPXCIsIFwi8J+at1wiLCBcIvCfmq9cIiwgXCLwn5qzXCIsIFwi8J+asVwiLCBcIvCflJ5cIiwgXCLwn5O1XCIsIFwi4p2X77iPXCIsIFwi4p2VXCIsIFwi4p2TXCIsIFwi4p2UXCIsIFwi4oC877iPXCIsIFwi4oGJ77iPXCIsIFwi8J+Sr1wiLCBcIvCflIVcIiwgXCLwn5SGXCIsIFwi8J+UsVwiLCBcIuKanFwiLCBcIuOAve+4j1wiLCBcIuKaoO+4j1wiLCBcIvCfmrhcIiwgXCLwn5SwXCIsIFwi4pm777iPXCIsIFwi8J+Ir++4j1wiLCBcIvCfkrlcIiwgXCLinYfvuI9cIiwgXCLinLPvuI9cIiwgXCLinY5cIiwgXCLinIVcIiwgXCLwn5KgXCIsIFwi8J+MgFwiLCBcIuKev1wiLCBcIvCfjJBcIiwgXCLik4LvuI9cIiwgXCLwn4+nXCIsIFwi8J+Igu+4j1wiLCBcIvCfm4JcIiwgXCLwn5uDXCIsIFwi8J+bhFwiLCBcIvCfm4VcIiwgXCLimb/vuI9cIiwgXCLwn5qtXCIsIFwi8J+avlwiLCBcIvCfhb/vuI9cIiwgXCLwn5qwXCIsIFwi8J+auVwiLCBcIvCfmrpcIiwgXCLwn5q8XCIsIFwi8J+au1wiLCBcIvCfmq5cIiwgXCLwn46mXCIsIFwi8J+TtlwiLCBcIvCfiIFcIiwgXCLwn4aWXCIsIFwi8J+Gl1wiLCBcIvCfhplcIiwgXCLwn4aSXCIsIFwi8J+GlVwiLCBcIvCfhpNcIiwgXCIw77iP4oOjXCIsIFwiMe+4j+KDo1wiLCBcIjLvuI/ig6NcIiwgXCIz77iP4oOjXCIsIFwiNO+4j+KDo1wiLCBcIjXvuI/ig6NcIiwgXCI277iP4oOjXCIsIFwiN++4j+KDo1wiLCBcIjjvuI/ig6NcIiwgXCI577iP4oOjXCIsIFwi8J+Un1wiLCBcIvCflKJcIiwgXCLilrbvuI9cIiwgXCLij7hcIiwgXCLij69cIiwgXCLij7lcIiwgXCLij7pcIiwgXCLij61cIiwgXCLij65cIiwgXCLij6lcIiwgXCLij6pcIiwgXCLwn5SAXCIsIFwi8J+UgVwiLCBcIvCflIJcIiwgXCLil4DvuI9cIiwgXCLwn5S8XCIsIFwi8J+UvVwiLCBcIuKPq1wiLCBcIuKPrFwiLCBcIuKeoe+4j1wiLCBcIuKshe+4j1wiLCBcIuKshu+4j1wiLCBcIuKsh++4j1wiLCBcIuKGl++4j1wiLCBcIuKGmO+4j1wiLCBcIuKGme+4j1wiLCBcIuKGlu+4j1wiLCBcIuKGle+4j1wiLCBcIuKGlO+4j1wiLCBcIvCflIRcIiwgXCLihqrvuI9cIiwgXCLihqnvuI9cIiwgXCLipLTvuI9cIiwgXCLipLXvuI9cIiwgXCIj77iP4oOjXCIsIFwiKu+4j+KDo1wiLCBcIuKEue+4j1wiLCBcIvCflKRcIiwgXCLwn5ShXCIsIFwi8J+UoFwiLCBcIvCflKNcIiwgXCLwn461XCIsIFwi8J+OtlwiLCBcIuOAsO+4j1wiLCBcIuKesFwiLCBcIuKclO+4j1wiLCBcIvCflINcIiwgXCLinpVcIiwgXCLinpZcIiwgXCLinpdcIiwgXCLinJbvuI9cIiwgXCLwn5KyXCIsIFwi8J+SsVwiLCBcIsKp77iPXCIsIFwiwq7vuI9cIiwgXCLihKLvuI9cIiwgXCLwn5SaXCIsIFwi8J+UmVwiLCBcIvCflJtcIiwgXCLwn5SdXCIsIFwi8J+UnFwiLCBcIuKYke+4j1wiLCBcIvCflJhcIiwgXCLimqrvuI9cIiwgXCLimqvvuI9cIiwgXCLwn5S0XCIsIFwi8J+UtVwiLCBcIvCflLhcIiwgXCLwn5S5XCIsIFwi8J+UtlwiLCBcIvCflLdcIiwgXCLwn5S6XCIsIFwi4paq77iPXCIsIFwi4par77iPXCIsIFwi4qyb77iPXCIsIFwi4qyc77iPXCIsIFwi8J+Uu1wiLCBcIuKXvO+4j1wiLCBcIuKXu++4j1wiLCBcIuKXvu+4j1wiLCBcIuKXve+4j1wiLCBcIvCflLJcIiwgXCLwn5SzXCIsIFwi8J+UiFwiLCBcIvCflIlcIiwgXCLwn5SKXCIsIFwi8J+Uh1wiLCBcIvCfk6NcIiwgXCLwn5OiXCIsIFwi8J+UlFwiLCBcIvCflJVcIiwgXCLwn4OPXCIsIFwi8J+AhO+4j1wiLCBcIuKZoO+4j1wiLCBcIuKZo++4j1wiLCBcIuKZpe+4j1wiLCBcIuKZpu+4j1wiLCBcIvCfjrRcIiwgXCLwn5GB4oCN8J+XqFwiLCBcIvCfkq1cIiwgXCLwn5evXCIsIFwi8J+SrFwiLCBcIvCflZBcIiwgXCLwn5WRXCIsIFwi8J+VklwiLCBcIvCflZNcIiwgXCLwn5WUXCIsIFwi8J+VlVwiLCBcIvCflZZcIiwgXCLwn5WXXCIsIFwi8J+VmFwiLCBcIvCflZlcIiwgXCLwn5WaXCIsIFwi8J+Vm1wiLCBcIvCflZxcIiwgXCLwn5WdXCIsIFwi8J+VnlwiLCBcIvCflZ9cIiwgXCLwn5WgXCIsIFwi8J+VoVwiLCBcIvCflaJcIiwgXCLwn5WjXCIsIFwi8J+VpFwiLCBcIvCflaVcIiwgXCLwn5WmXCIsIFwi8J+Vp1wiLCBcIvCfm5FcIiwgXCLwn4em8J+Hq1wiLCBcIvCfh6bwn4e9XCIsIFwi8J+HpvCfh7FcIiwgXCLwn4ep8J+Hv1wiLCBcIvCfh6bwn4e4XCIsIFwi8J+HpvCfh6lcIiwgXCLwn4em8J+HtFwiLCBcIvCfh6bwn4euXCIsIFwi8J+HpvCfh7ZcIiwgXCLwn4em8J+HrFwiLCBcIvCfh6bwn4e3XCIsIFwi8J+HpvCfh7JcIiwgXCLwn4em8J+HvFwiLCBcIvCfh6bwn4e6XCIsIFwi8J+HpvCfh7lcIiwgXCLwn4em8J+Hv1wiLCBcIvCfh6fwn4e4XCIsIFwi8J+Hp/Cfh61cIiwgXCLwn4en8J+HqVwiLCBcIvCfh6fwn4enXCIsIFwi8J+Hp/Cfh75cIiwgXCLwn4en8J+HqlwiLCBcIvCfh6fwn4e/XCIsIFwi8J+Hp/Cfh69cIiwgXCLwn4en8J+HslwiLCBcIvCfh6fwn4e5XCIsIFwi8J+Hp/Cfh7RcIiwgXCLwn4en8J+HtlwiLCBcIvCfh6fwn4emXCIsIFwi8J+Hp/Cfh7xcIiwgXCLwn4en8J+Ht1wiLCBcIvCfh67wn4e0XCIsIFwi8J+Hu/Cfh6xcIiwgXCLwn4en8J+Hs1wiLCBcIvCfh6fwn4esXCIsIFwi8J+Hp/Cfh6tcIiwgXCLwn4en8J+HrlwiLCBcIvCfh6jwn4e7XCIsIFwi8J+HsPCfh61cIiwgXCLwn4eo8J+HslwiLCBcIvCfh6jwn4emXCIsIFwi8J+HrvCfh6hcIiwgXCLwn4ew8J+HvlwiLCBcIvCfh6jwn4erXCIsIFwi8J+HufCfh6lcIiwgXCLwn4eo8J+HsVwiLCBcIvCfh6jwn4ezXCIsIFwi8J+HqPCfh71cIiwgXCLwn4eo8J+HqFwiLCBcIvCfh6jwn4e0XCIsIFwi8J+HsPCfh7JcIiwgXCLwn4eo8J+HrFwiLCBcIvCfh6jwn4epXCIsIFwi8J+HqPCfh7BcIiwgXCLwn4eo8J+Ht1wiLCBcIvCfh63wn4e3XCIsIFwi8J+HqPCfh7pcIiwgXCLwn4eo8J+HvFwiLCBcIvCfh6jwn4e+XCIsIFwi8J+HqPCfh79cIiwgXCLwn4ep8J+HsFwiLCBcIvCfh6nwn4evXCIsIFwi8J+HqfCfh7JcIiwgXCLwn4ep8J+HtFwiLCBcIvCfh6rwn4eoXCIsIFwi8J+HqvCfh6xcIiwgXCLwn4e48J+Hu1wiLCBcIvCfh6zwn4e2XCIsIFwi8J+HqvCfh7dcIiwgXCLwn4eq8J+HqlwiLCBcIvCfh6rwn4e5XCIsIFwi8J+HqvCfh7pcIiwgXCLwn4er8J+HsFwiLCBcIvCfh6vwn4e0XCIsIFwi8J+Hq/Cfh69cIiwgXCLwn4er8J+HrlwiLCBcIvCfh6vwn4e3XCIsIFwi8J+HrPCfh6tcIiwgXCLwn4e18J+Hq1wiLCBcIvCfh7nwn4erXCIsIFwi8J+HrPCfh6ZcIiwgXCLwn4es8J+HslwiLCBcIvCfh6zwn4eqXCIsIFwi8J+HqfCfh6pcIiwgXCLwn4es8J+HrVwiLCBcIvCfh6zwn4euXCIsIFwi8J+HrPCfh7dcIiwgXCLwn4es8J+HsVwiLCBcIvCfh6zwn4epXCIsIFwi8J+HrPCfh7VcIiwgXCLwn4es8J+HulwiLCBcIvCfh6zwn4e5XCIsIFwi8J+HrPCfh6xcIiwgXCLwn4es8J+Hs1wiLCBcIvCfh6zwn4e8XCIsIFwi8J+HrPCfh75cIiwgXCLwn4et8J+HuVwiLCBcIvCfh63wn4ezXCIsIFwi8J+HrfCfh7BcIiwgXCLwn4et8J+HulwiLCBcIvCfh67wn4e4XCIsIFwi8J+HrvCfh7NcIiwgXCLwn4eu8J+HqVwiLCBcIvCfh67wn4e3XCIsIFwi8J+HrvCfh7ZcIiwgXCLwn4eu8J+HqlwiLCBcIvCfh67wn4eyXCIsIFwi8J+HrvCfh7FcIiwgXCLwn4eu8J+HuVwiLCBcIvCfh6jwn4euXCIsIFwi8J+Hr/Cfh7JcIiwgXCLwn4ev8J+HtVwiLCBcIvCfh6/wn4eqXCIsIFwi8J+Hr/Cfh7RcIiwgXCLwn4ew8J+Hv1wiLCBcIvCfh7Dwn4eqXCIsIFwi8J+HsPCfh65cIiwgXCLwn4e98J+HsFwiLCBcIvCfh7Dwn4e8XCIsIFwi8J+HsPCfh6xcIiwgXCLwn4ex8J+HplwiLCBcIvCfh7Hwn4e7XCIsIFwi8J+HsfCfh6dcIiwgXCLwn4ex8J+HuFwiLCBcIvCfh7Hwn4e3XCIsIFwi8J+HsfCfh75cIiwgXCLwn4ex8J+HrlwiLCBcIvCfh7Hwn4e5XCIsIFwi8J+HsfCfh7pcIiwgXCLwn4ey8J+HtFwiLCBcIvCfh7Lwn4ewXCIsIFwi8J+HsvCfh6xcIiwgXCLwn4ey8J+HvFwiLCBcIvCfh7Lwn4e+XCIsIFwi8J+HsvCfh7tcIiwgXCLwn4ey8J+HsVwiLCBcIvCfh7Lwn4e5XCIsIFwi8J+HsvCfh61cIiwgXCLwn4ey8J+HtlwiLCBcIvCfh7Lwn4e3XCIsIFwi8J+HsvCfh7pcIiwgXCLwn4e+8J+HuVwiLCBcIvCfh7Lwn4e9XCIsIFwi8J+Hq/Cfh7JcIiwgXCLwn4ey8J+HqVwiLCBcIvCfh7Lwn4eoXCIsIFwi8J+HsvCfh7NcIiwgXCLwn4ey8J+HqlwiLCBcIvCfh7Lwn4e4XCIsIFwi8J+HsvCfh6ZcIiwgXCLwn4ey8J+Hv1wiLCBcIvCfh7Lwn4eyXCIsIFwi8J+Hs/Cfh6ZcIiwgXCLwn4ez8J+Ht1wiLCBcIvCfh7Pwn4e1XCIsIFwi8J+Hs/Cfh7FcIiwgXCLwn4ez8J+HqFwiLCBcIvCfh7Pwn4e/XCIsIFwi8J+Hs/Cfh65cIiwgXCLwn4ez8J+HqlwiLCBcIvCfh7Pwn4esXCIsIFwi8J+Hs/Cfh7pcIiwgXCLwn4ez8J+Hq1wiLCBcIvCfh7Lwn4e1XCIsIFwi8J+HsPCfh7VcIiwgXCLwn4ez8J+HtFwiLCBcIvCfh7Twn4eyXCIsIFwi8J+HtfCfh7BcIiwgXCLwn4e18J+HvFwiLCBcIvCfh7Xwn4e4XCIsIFwi8J+HtfCfh6ZcIiwgXCLwn4e18J+HrFwiLCBcIvCfh7Xwn4e+XCIsIFwi8J+HtfCfh6pcIiwgXCLwn4e18J+HrVwiLCBcIvCfh7Xwn4ezXCIsIFwi8J+HtfCfh7FcIiwgXCLwn4e18J+HuVwiLCBcIvCfh7Xwn4e3XCIsIFwi8J+HtvCfh6ZcIiwgXCLwn4e38J+HqlwiLCBcIvCfh7fwn4e0XCIsIFwi8J+Ht/Cfh7pcIiwgXCLwn4e38J+HvFwiLCBcIvCfh6fwn4exXCIsIFwi8J+HuPCfh61cIiwgXCLwn4ew8J+Hs1wiLCBcIvCfh7Hwn4eoXCIsIFwi8J+HtfCfh7JcIiwgXCLwn4e78J+HqFwiLCBcIvCfh7zwn4e4XCIsIFwi8J+HuPCfh7JcIiwgXCLwn4e48J+HuVwiLCBcIvCfh7jwn4emXCIsIFwi8J+HuPCfh7NcIiwgXCLwn4e38J+HuFwiLCBcIvCfh7jwn4eoXCIsIFwi8J+HuPCfh7FcIiwgXCLwn4e48J+HrFwiLCBcIvCfh7jwn4e9XCIsIFwi8J+HuPCfh7BcIiwgXCLwn4e48J+HrlwiLCBcIvCfh7jwn4enXCIsIFwi8J+HuPCfh7RcIiwgXCLwn4e/8J+HplwiLCBcIvCfh6zwn4e4XCIsIFwi8J+HsPCfh7dcIiwgXCLwn4e48J+HuFwiLCBcIvCfh6rwn4e4XCIsIFwi8J+HsfCfh7BcIiwgXCLwn4e48J+HqVwiLCBcIvCfh7jwn4e3XCIsIFwi8J+HuPCfh79cIiwgXCLwn4e48J+HqlwiLCBcIvCfh6jwn4etXCIsIFwi8J+HuPCfh75cIiwgXCLwn4e58J+HvFwiLCBcIvCfh7nwn4evXCIsIFwi8J+HufCfh79cIiwgXCLwn4e58J+HrVwiLCBcIvCfh7nwn4exXCIsIFwi8J+HufCfh6xcIiwgXCLwn4e58J+HsFwiLCBcIvCfh7nwn4e0XCIsIFwi8J+HufCfh7lcIiwgXCLwn4e58J+Hs1wiLCBcIvCfh7nwn4e3XCIsIFwi8J+HufCfh7JcIiwgXCLwn4e58J+HqFwiLCBcIvCfh7nwn4e7XCIsIFwi8J+HuvCfh6xcIiwgXCLwn4e68J+HplwiLCBcIvCfh6bwn4eqXCIsIFwi8J+HrPCfh6dcIiwgXCLwn4e68J+HuFwiLCBcIvCfh7vwn4euXCIsIFwi8J+HuvCfh75cIiwgXCLwn4e68J+Hv1wiLCBcIvCfh7vwn4e6XCIsIFwi8J+Hu/Cfh6ZcIiwgXCLwn4e78J+HqlwiLCBcIvCfh7vwn4ezXCIsIFwi8J+HvPCfh6tcIiwgXCLwn4eq8J+HrVwiLCBcIvCfh77wn4eqXCIsIFwi8J+Hv/Cfh7JcIiwgXCLwn4e/8J+HvFwiXVxuXHRlbW9qaSA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjBweCcgaGVpZ2h0PScyMHB4JyB2aWV3Qm94PScwIDAgMjAgMjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPkVtb2ppPC90aXRsZT5cblx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9Mb3dlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTYwLjAwMDAwMCwgLTE4MS4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHQ8ZyBpZD0nQm90dG9tLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDE3MC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9J002Ni43NSwzMC41IEM3Mi4xMzQ3NzYzLDMwLjUgNzYuNSwyNi4xMzQ3NzYzIDc2LjUsMjAuNzUgQzc2LjUsMTUuMzY1MjIzNyA3Mi4xMzQ3NzYzLDExIDY2Ljc1LDExIEM2MS4zNjUyMjM3LDExIDU3LDE1LjM2NTIyMzcgNTcsMjAuNzUgQzU3LDI2LjEzNDc3NjMgNjEuMzY1MjIzNywzMC41IDY2Ljc1LDMwLjUgWiBNNjYuNzUsMjkuNSBDNzEuNTgyNDkxNiwyOS41IDc1LjUsMjUuNTgyNDkxNiA3NS41LDIwLjc1IEM3NS41LDE1LjkxNzUwODQgNzEuNTgyNDkxNiwxMiA2Ni43NSwxMiBDNjEuOTE3NTA4NCwxMiA1OCwxNS45MTc1MDg0IDU4LDIwLjc1IEM1OCwyNS41ODI0OTE2IDYxLjkxNzUwODQsMjkuNSA2Ni43NSwyOS41IFogTTYzLjc1LDE5IEM2NC40NDAzNTU5LDE5IDY1LDE4LjQ0MDM1NTkgNjUsMTcuNzUgQzY1LDE3LjA1OTY0NDEgNjQuNDQwMzU1OSwxNi41IDYzLjc1LDE2LjUgQzYzLjA1OTY0NDEsMTYuNSA2Mi41LDE3LjA1OTY0NDEgNjIuNSwxNy43NSBDNjIuNSwxOC40NDAzNTU5IDYzLjA1OTY0NDEsMTkgNjMuNzUsMTkgWiBNNjkuNzUsMTkgQzcwLjQ0MDM1NTksMTkgNzEsMTguNDQwMzU1OSA3MSwxNy43NSBDNzEsMTcuMDU5NjQ0MSA3MC40NDAzNTU5LDE2LjUgNjkuNzUsMTYuNSBDNjkuMDU5NjQ0MSwxNi41IDY4LjUsMTcuMDU5NjQ0MSA2OC41LDE3Ljc1IEM2OC41LDE4LjQ0MDM1NTkgNjkuMDU5NjQ0MSwxOSA2OS43NSwxOSBaIE01OS44ODc2MzM0LDIyLjE2NDE0NDQgQzU5LjYzOTAzMTYsMjEuMzgzMTM0IDYwLjA2NTkxOCwyMC45Nzg1MTU2IDYwLjg1MzA5NTEsMjEuMjMyOTMwNCBDNjAuODUzMDk1MSwyMS4yMzI5MzA0IDYzLjA5Mzc1MDMsMjIuMjEyNSA2Ni43NTAwMDAxLDIyLjIxMjUgQzcwLjQwNjI0OTksMjIuMjEyNSA3Mi42NDY5MDQ3LDIxLjIzMjkzMDQgNzIuNjQ2OTA0NywyMS4yMzI5MzA0IEM3My40Mjg3MTYyLDIwLjk2NjIxNTMgNzMuODgxMjQ2MywyMS40MDQ0MDk3IDczLjYwNTg0NzcsMjIuMTgwNzQzNyBDNzMuNjA1ODQ3NywyMi4xODA3NDM3IDcyLjYsMjcuNTc1IDY2Ljc1LDI3LjU3NSBDNjAuOSwyNy41NzUgNTkuODg3NjMzNCwyMi4xNjQxNDQ0IDU5Ljg4NzYzMzQsMjIuMTY0MTQ0NCBaIE02Ni43NSwyMy4xODc1IEM2NC4wNjg3NSwyMy4xODc1IDYxLjg1NDQwNTUsMjIuNDczNzgyMSA2MS44NTQ0MDU1LDIyLjQ3Mzc4MjEgQzYxLjMyNzMwMTksMjIuMzI5NDggNjEuMTc4MTIzMywyMi41NzIxNjE1IDYxLjU2Mzk1NTUsMjIuOTU3MDc1IEM2MS41NjM5NTU1LDIyLjk1NzA3NSA2Mi4zNjI1LDI0LjY1IDY2Ljc1LDI0LjY1IEM3MS4xMzc1LDI0LjY1IDcxLjk1MDg1MDMsMjIuOTQzODMwNCA3MS45NTA4NTAzLDIyLjk0MzgzMDQgQzcyLjMwOTM2NTksMjIuNTM5OTI3OCA3Mi4xNjkwNzkzLDIyLjMzNTk4NDQgNzEuNjM1NDI3MywyMi40NzYzNDkgQzcxLjYzNTQyNzMsMjIuNDc2MzQ5IDY5LjQzMTI1LDIzLjE4NzUgNjYuNzUsMjMuMTg3NSBaJyBpZD0nRW1vamknPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHRkZWxldGU6IHtcblx0XHRvbiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzI0cHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDI0IDE4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0PHRpdGxlPkJhY2s8L3RpdGxlPlxuXHRcdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9VcHBlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTMzOS4wMDAwMDAsIC0xMzAuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdUaGlyZC1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxMTguMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTM1MS42NDI2NjMsMjAuOTc3NjkwMyBMMzU0LjQ2Njc5NSwxOC4xNTM1NTg1IEMzNTQuNzYwMTA2LDE3Ljg2MDI0NzYgMzU0Ljc2Mzk4MywxNy4zODE0OTYyIDM1NC40NzEwOSwxNy4wODg2MDMgQzM1NC4xNzYxNTUsMTYuNzkzNjY3NyAzNTMuNzAxNCwxNi43OTc2MzI4IDM1My40MDYxMzUsMTcuMDkyODk4MyBMMzUwLjU4MjAwMywxOS45MTcwMzAxIEwzNDcuNzU3ODcxLDE3LjA5Mjg5ODMgQzM0Ny40NjQ1NiwxNi43OTk1ODc0IDM0Ni45ODU4MDksMTYuNzk1NzA5NyAzNDYuNjkyOTE2LDE3LjA4ODYwMyBDMzQ2LjM5Nzk4LDE3LjM4MzUzODIgMzQ2LjQwMTk0NSwxNy44NTgyOTMgMzQ2LjY5NzIxMSwxOC4xNTM1NTg1IEwzNDkuNTIxMzQzLDIwLjk3NzY5MDMgTDM0Ni42OTcyMTEsMjMuODAxODIyIEMzNDYuNDAzOSwyNC4wOTUxMzI5IDM0Ni40MDAwMjIsMjQuNTczODg0MyAzNDYuNjkyOTE2LDI0Ljg2Njc3NzYgQzM0Ni45ODc4NTEsMjUuMTYxNzEyOCAzNDcuNDYyNjA2LDI1LjE1Nzc0NzcgMzQ3Ljc1Nzg3MSwyNC44NjI0ODIyIEwzNTAuNTgyMDAzLDIyLjAzODM1MDQgTDM1My40MDYxMzUsMjQuODYyNDgyMiBDMzUzLjY5OTQ0NSwyNS4xNTU3OTMxIDM1NC4xNzgxOTcsMjUuMTU5NjcwOCAzNTQuNDcxMDksMjQuODY2Nzc3NiBDMzU0Ljc2NjAyNSwyNC41NzE4NDIzIDM1NC43NjIwNiwyNC4wOTcwODc1IDM1NC40NjY3OTUsMjMuODAxODIyIEwzNTEuNjQyNjYzLDIwLjk3NzY5MDMgWiBNMzM3LjA1OTM0NSwyMi4wNTkzNDQ1IEMzMzYuNDc0Mjg1LDIxLjQ3NDI4NDcgMzM2LjQ4MTM1MSwyMC41MTg2NDg5IDMzNy4wNTkzNDUsMTkuOTQwNjU1NSBMMzQzLjc4OTkxNSwxMy4yMTAwODUzIEMzNDQuMTgyMDg0LDEyLjgxNzkxNiAzNDQuOTQ4OTIsMTIuNSAzNDUuNTA3NDg0LDEyLjUgTDM1Ni4wMDIwOTgsMTIuNSBDMzU3LjkzMzkzNiwxMi41IDM1OS41LDE0LjA2ODg0NzcgMzU5LjUsMTYuMDAxNzk4MyBMMzU5LjUsMjUuOTk4MjAxNyBDMzU5LjUsMjcuOTMyMTkxNSAzNTcuOTIzMDg4LDI5LjUgMzU2LjAwMjA5OCwyOS41IEwzNDUuNTA3NDg0LDI5LjUgQzM0NC45NTEwNjYsMjkuNSAzNDQuMTc3MTY5LDI5LjE3NzE2OTMgMzQzLjc4OTkxNSwyOC43ODk5MTQ4IEwzMzcuMDU5MzQ1LDIyLjA1OTM0NDUgWicgaWQ9J0JhY2snPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRvZmYgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzI0cHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDI0IDE4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdDx0aXRsZT5CYWNrPC90aXRsZT5cblx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9VcHBlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTMzOS4wMDAwMDAsIC0xMzAuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9J00zMzcuMDU5MzQ1LDIyLjA1OTM0NDUgQzMzNi40NzQyODUsMjEuNDc0Mjg0NyAzMzYuNDgxMzUxLDIwLjUxODY0ODkgMzM3LjA1OTM0NSwxOS45NDA2NTU1IEwzNDMuNzg5OTE1LDEzLjIxMDA4NTMgQzM0NC4xODIwODQsMTIuODE3OTE2IDM0NC45NDg5MiwxMi41IDM0NS41MDc0ODQsMTIuNSBMMzU2LjAwMjA5OCwxMi41IEMzNTcuOTMzOTM2LDEyLjUgMzU5LjUsMTQuMDY4ODQ3NyAzNTkuNSwxNi4wMDE3OTgzIEwzNTkuNSwyNS45OTgyMDE3IEMzNTkuNSwyNy45MzIxOTE1IDM1Ny45MjMwODgsMjkuNSAzNTYuMDAyMDk4LDI5LjUgTDM0NS41MDc0ODQsMjkuNSBDMzQ0Ljk1MTA2NiwyOS41IDM0NC4xNzcxNjksMjkuMTc3MTY5MyAzNDMuNzg5OTE1LDI4Ljc4OTkxNDggTDMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBaIE0zNTEuNjQyNjYzLDIwLjk3NzY5MDMgTDM1NC40NjY3OTUsMTguMTUzNTU4NSBDMzU0Ljc2MDEwNiwxNy44NjAyNDc2IDM1NC43NjM5ODMsMTcuMzgxNDk2MiAzNTQuNDcxMDksMTcuMDg4NjAzIEMzNTQuMTc2MTU1LDE2Ljc5MzY2NzcgMzUzLjcwMTQsMTYuNzk3NjMyOCAzNTMuNDA2MTM1LDE3LjA5Mjg5ODMgTDM1MC41ODIwMDMsMTkuOTE3MDMwMSBMMzQ3Ljc1Nzg3MSwxNy4wOTI4OTgzIEMzNDcuNDY0NTYsMTYuNzk5NTg3NCAzNDYuOTg1ODA5LDE2Ljc5NTcwOTcgMzQ2LjY5MjkxNiwxNy4wODg2MDMgQzM0Ni4zOTc5OCwxNy4zODM1MzgyIDM0Ni40MDE5NDUsMTcuODU4MjkzIDM0Ni42OTcyMTEsMTguMTUzNTU4NSBMMzQ5LjUyMTM0MywyMC45Nzc2OTAzIEwzNDYuNjk3MjExLDIzLjgwMTgyMiBDMzQ2LjQwMzksMjQuMDk1MTMyOSAzNDYuNDAwMDIyLDI0LjU3Mzg4NDMgMzQ2LjY5MjkxNiwyNC44NjY3Nzc2IEMzNDYuOTg3ODUxLDI1LjE2MTcxMjggMzQ3LjQ2MjYwNiwyNS4xNTc3NDc3IDM0Ny43NTc4NzEsMjQuODYyNDgyMiBMMzUwLjU4MjAwMywyMi4wMzgzNTA0IEwzNTMuNDA2MTM1LDI0Ljg2MjQ4MjIgQzM1My42OTk0NDUsMjUuMTU1NzkzMSAzNTQuMTc4MTk3LDI1LjE1OTY3MDggMzU0LjQ3MTA5LDI0Ljg2Njc3NzYgQzM1NC43NjYwMjUsMjQuNTcxODQyMyAzNTQuNzYyMDYsMjQuMDk3MDg3NSAzNTQuNDY2Nzk1LDIzLjgwMTgyMiBMMzUxLjY0MjY2MywyMC45Nzc2OTAzIFogTTMzOC43MDk3MiwyMS43MDk3MTk1IEMzMzguMzE3NzUyLDIxLjMxNzc1MjIgMzM4LjMxODk2NSwyMC42ODEwMzQ5IDMzOC43MDk3MiwyMC4yOTAyODA1IEwzNDQuNjQzMjQ1LDE0LjM1Njc1NDcgQzM0NC44NDAyNzYsMTQuMTU5NzI0NSAzNDUuMjI1NjM5LDE0IDM0NS40OTM3NDEsMTQgTDM1NS45OTcyMzksMTQgQzM1Ny4xMDMzMzMsMTQgMzU3Ljk5OTk5OSwxNC44OTcwNjAxIDM1Ny45OTk5OTksMTYuMDA1ODU4NiBMMzU3Ljk5OTk5OSwyNS45OTQxNDEyIEMzNTcuOTk5OTk5LDI3LjEwMTk0NjQgMzU3LjEwNjQ1NywyNy45OTk5OTk5IDM1NS45OTcyMzksMjcuOTk5OTk5OSBMMzQ1LjQ5Mzc0MSwyOCBDMzQ1LjIyMTA1NiwyOCAzNDQuODQwNjQzLDI3Ljg0MDY0MzEgMzQ0LjY0MzI0NiwyNy42NDMyNDUzIEwzMzguNzA5NzIsMjEuNzA5NzE5NSBaJyBpZD0nQmFjayc+PC9wYXRoPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPlwiXG5cdH1cblx0Zm9vZCA6ICBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5Gb29kPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNDguMDAwMDAwLCAtNjM3LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J0Zvb2QnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE0OS41MDAwMDAsIDIyOS41MDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS41LDE1LjUgTDEsMTUuNSBMMCw1IEw2LjUsNSBMNi4yNjM2MDkzMyw3LjQ4MjEwMjAyJyBpZD0nRHJpbmsnIHN0cm9rZT0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J002LjAxMDc3NTQ1LDEuOTY5MzAwOTggTDYuNTE1NzEzNTIsNS4yMjI3MDUzOSBMNS43MTkwODE4NCw1LjY3OTQ3ODEyIEw1LjAzODkwMDksMS45NjkzMDA5OCBMNC44NTU1NzI0NywxLjk2OTMwMDk4IEw0Ljg1NTU3MjQ3LDAuOTY5MzAwOTggTDguODU1NTcyNDcsMC45NjkzMDA5OCBMOC44NTU1NzI0NywxLjk2OTMwMDk4IEw2LjAxMDc3NTQ1LDEuOTY5MzAwOTggWicgaWQ9J1N0cmF3JyBmaWxsPScjNEE1NDYxJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg2Ljg1NTU3MiwgMy4zMjQzOTApIHJvdGF0ZSgyNC4wMDAwMDApIHRyYW5zbGF0ZSgtNi44NTU1NzIsIC0zLjMyNDM5MCkgJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J0JvdHRvbS1CdW4nIHN0cm9rZT0nIzRBNTQ2MScgeD0nMycgeT0nMTQnIHdpZHRoPScxMC41JyBoZWlnaHQ9JzEuNScgcng9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMS41LDEyLjUwMjQ0MDggQzEuNSwxMS45NDg4MDggMS45NDkxNjkxNiwxMS41IDIuNDkyNjg3MjMsMTEuNSBMMTQuMDA3MzEyOCwxMS41IEMxNC41NTU1NTg4LDExLjUgMTUsMTEuOTQ2OTQ5OSAxNSwxMi41MDI0NDA4IEwxNSwxMi45OTc1NTkyIEMxNSwxMy41NTExOTIgMTQuNTUwODMwOCwxNCAxNC4wMDczMTI4LDE0IEwyLjQ5MjY4NzIzLDE0IEMxLjk0NDQ0MTIxLDE0IDEuNSwxMy41NTMwNTAxIDEuNSwxMi45OTc1NTkyIEwxLjUsMTIuNTAyNDQwOCBaIE0zLjkzMzAwMDAzLDExLjgzOTI3MjcgQzMuNDE3NzE4MzQsMTEuNjUxODk3NiAzLjQ0NDgzNjk3LDExLjUgMy45OTU1Nzc1LDExLjUgTDEzLjAwNDQyMjUsMTEuNSBDMTMuNTU0MjY0OCwxMS41IDEzLjU4NjYwNjEsMTEuNjUwMzI1MSAxMy4wNjcsMTEuODM5MjcyNyBMOC41LDEzLjUgTDMuOTMzMDAwMDMsMTEuODM5MjcyNyBaJyBpZD0nJnF1b3Q7UGF0dHkmcXVvdDsnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMi41LDEwLjUgTDEzLjUsMTAuNSBMMTUsMTEuNSBMMSwxMS41IEwyLjUsMTAuNSBaJyBpZD0nQ2hlZXNlJyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTguMjUsMTAuNSBDMTEuNDI1NjM3MywxMC41IDE0LDEwLjMyODQyNzEgMTQsOS41IEMxNCw4LjY3MTU3Mjg4IDExLjQyNTYzNzMsOCA4LjI1LDggQzUuMDc0MzYyNjksOCAyLjUsOC42NzE1NzI4OCAyLjUsOS41IEMyLjUsMTAuMzI4NDI3MSA1LjA3NDM2MjY5LDEwLjUgOC4yNSwxMC41IFonIGlkPSdUb3AtQnVuJyBzdHJva2U9JyM0QTU0NjEnIHN0cm9rZS13aWR0aD0nMC43NSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRmbGFnczogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzExcHgnIGhlaWdodD0nMTVweCcgdmlld0JveD0nMCAwIDExIDE1JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+RmxhZzwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjc1LjAwMDAwMCwgLTYzOS4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdGbGFnJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNzUuMDAwMDAwLCAyMzEuNTAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1BvbGUnIGZpbGw9JyM0QTU0NjEnIHg9JzAnIHk9JzAnIHdpZHRoPScxJyBoZWlnaHQ9JzE0Jz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTEsMSBDMSwxIDEuMjUsMiAzLjUsMiBDNS43NSwyIDYsMC43NDk5OTk5OTggOCwwLjc1IEMxMCwwLjc0OTk5OTk5OCAxMCwxLjUgMTAsMS41IEwxMCw3LjUgQzEwLDcuNSAxMCw2LjUgOCw2LjUgQzYsNi41IDQuODA2MjM5MTEsOCAzLjUsOCBDMi4xOTM3NjA4OSw4IDEsNyAxLDcgTDEsMSBaJyBzdHJva2U9JyM0QTU0NjEnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0ZnJlcXVlbnQ6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPlJlY2VudDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNTUuMDAwMDAwLCAtNjM4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1JlY2VudCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNTUuNTAwMDAwLCAyMzAuMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nQm9keScgc3Ryb2tlPScjNEE1NDYxJyBjeD0nOCcgY3k9JzgnIHI9JzgnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J003LjUsNy41IEw3LjUsOC41IEw4LjUsOC41IEw4LjUsMiBMNy41LDIgTDcuNSw3LjUgTDQsNy41IEw0LDguNSBMOC41LDguNSBMOC41LDcuNSBMNy41LDcuNSBaJyBpZD0nSGFuZHMnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0a2V5Ym9hcmQgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMzIuNXB4JyBoZWlnaHQ9JzIzLjVweCcgdmlld0JveD0nMCAwIDY1IDQ3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdCAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPlxuXHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0XHRcdCAgICAgICAgPGcgaWQ9J2lQYWQtUG9ydHJhaXQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNDM2LjAwMDAwMCwgLTE5NTYuMDAwMDAwKScgZmlsbD0nIzAwMDAwMCc+XG5cdFx0XHQgICAgICAgICAgICA8ZyBpZD0nS2V5Ym9hcmQtTGlnaHQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAxNDIyLjAwMDAwMCknPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxnIGlkPSdLZXlib2FyZC1kb3duJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNDEyLjAwMDAwMCwgNTAwLjAwMDAwMCknPlxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNODcuMDAxMzMyLDM0IEM4OC4xMDUxNjU5LDM0IDg5LDM0Ljg5OTcxMjcgODksMzUuOTkzMjg3NCBMODksNjEuMDA2NzEyNiBDODksNjIuMTA3NTc0OCA4OC4xMDU4NzU5LDYzIDg3LjAwMTMzMiw2MyBMMjUuOTk4NjY4LDYzIEMyNC44OTQ4MzQxLDYzIDI0LDYyLjEwMDI4NzMgMjQsNjEuMDA2NzEyNiBMMjQsMzUuOTkzMjg3NCBDMjQsMzQuODkyNDI1MiAyNC44OTQxMjQxLDM0IDI1Ljk5ODY2OCwzNCBMODcuMDAxMzMyLDM0IFogTTI2LDM2IEwyNiw2MSBMODcsNjEgTDg3LDM2IEwyNiwzNiBaIE03OSw0MCBMODMsNDAgTDgzLDQ0IEw3OSw0NCBMNzksNDAgWiBNNzIsNDAgTDc2LDQwIEw3Niw0NCBMNzIsNDQgTDcyLDQwIFogTTY1LDQwIEw2OSw0MCBMNjksNDQgTDY1LDQ0IEw2NSw0MCBaIE01OCw0MCBMNjIsNDAgTDYyLDQ0IEw1OCw0NCBMNTgsNDAgWiBNNTEsNDAgTDU1LDQwIEw1NSw0NCBMNTEsNDQgTDUxLDQwIFogTTQ0LDQwIEw0OCw0MCBMNDgsNDQgTDQ0LDQ0IEw0NCw0MCBaIE0zNyw0MCBMNDEsNDAgTDQxLDQ0IEwzNyw0NCBMMzcsNDAgWiBNMzAsNDAgTDM0LDQwIEwzNCw0NCBMMzAsNDQgTDMwLDQwIFogTTc5LDQ3IEw4Myw0NyBMODMsNTEgTDc5LDUxIEw3OSw0NyBaIE03Miw0NyBMNzYsNDcgTDc2LDUxIEw3Miw1MSBMNzIsNDcgWiBNNjUsNDcgTDY5LDQ3IEw2OSw1MSBMNjUsNTEgTDY1LDQ3IFogTTU4LDQ3IEw2Miw0NyBMNjIsNTEgTDU4LDUxIEw1OCw0NyBaIE01MSw0NyBMNTUsNDcgTDU1LDUxIEw1MSw1MSBMNTEsNDcgWiBNNDQsNDcgTDQ4LDQ3IEw0OCw1MSBMNDQsNTEgTDQ0LDQ3IFogTTM3LDQ3IEw0MSw0NyBMNDEsNTEgTDM3LDUxIEwzNyw0NyBaIE0zMCw0NyBMMzQsNDcgTDM0LDUxIEwzMCw1MSBMMzAsNDcgWiBNNzksNTQgTDgzLDU0IEw4Myw1OCBMNzksNTggTDc5LDU0IFogTTcyLDU0IEw3Niw1NCBMNzYsNTggTDcyLDU4IEw3Miw1NCBaIE00NCw1NCBMNjksNTQgTDY5LDU4IEw0NCw1OCBMNDQsNTQgWiBNMzcsNTQgTDQxLDU0IEw0MSw1OCBMMzcsNTggTDM3LDU0IFogTTMwLDU0IEwzNCw1NCBMMzQsNTggTDMwLDU4IEwzMCw1NCBaIE00NC4zMTYzNDk4LDY5Ljk3NzEwNDcgQzQzLjM2ODQyMjUsNzAuNTQyMDM0MiA0My4zMzM4NzIxLDcxLjUwOTY0OTUgNDQuMjM3ODIxNyw3Mi4xMzczOTEyIEw1NS4zNjIxNTM5LDc5Ljg2MjYwODggQzU2LjI2NjcxMTMsODAuNDkwNzcyNiA1Ny43MzM4OTY1LDgwLjQ5MDM1MDUgNTguNjM3ODQ2MSw3OS44NjI2MDg4IEw2OS43NjIxNzgzLDcyLjEzNzM5MTIgQzcwLjY2NjczNTcsNzEuNTA5MjI3NCA3MC42NDgwMTIsNzAuNTIwNTIwNCA2OS43MTE1MTg3LDY5LjkyMzQxNjYgTDY5Ljk4MjU3MzEsNzAuMDk2MjM5NiBDNjkuNTE4MTMzMyw2OS44MDAxMTUgNjguNzc4MjU1Nyw2OS44MTI2NDkzIDY4LjMyNjEzMDcsNzAuMTI2OTMyMyBMNTcuODE1NDk5OSw3Ny40MzMxMjYzIEM1Ny4zNjUxMTE3LDc3Ljc0NjIwMiA1Ni42MjgxNjUsNzcuNzM4MTc4NiA1Ni4xNzYyMTAzLDc3LjQxOTk0MjQgTDQ1LjgzODYxMzcsNzAuMTQwODk3NyBDNDUuMzgzNjQ3Miw2OS44MjA1NDA3IDQ0LjYzNzUwMzksNjkuNzg1NzA4OCA0NC4xNTY2MzkzLDcwLjA3MjI4NjIgTDQ0LjMxNjM0OTgsNjkuOTc3MTA0NyBaJyBpZD0nU2hhcGUnPjwvcGF0aD5cblx0XHRcdCAgICAgICAgICAgICAgICA8L2c+XG5cdFx0XHQgICAgICAgICAgICA8L2c+XG5cdFx0XHQgICAgICAgIDwvZz5cblx0XHRcdCAgICA8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRrZXlQb3BVcDpcblx0XHRsaWdodDpcblx0XHRcdFwiaXBob25lLTVcIiA6IFwiPHN2ZyB3aWR0aD0nNTVweCcgaGVpZ2h0PSc5MnB4JyB2aWV3Qm94PSc1MyAzMTYgNTUgOTInIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS4zNDE3MzIzMSw0MC45MzkxNzAxIEMwLjUxNzQ2NjEyOCw0MC4yMDU4OSAwLDM5LjEzNzQyNTEgMCwzNy45NDc3NjM1IEwwLDQuMDAzNDU1OTggQzAsMS43ODkxNzEzNiAxLjc5NTI4MjQ4LDAgNC4wMDk4NzU2NiwwIEw0NC45OTAxMjQzLDAgQzQ3LjIxMjU2MDgsMCA0OSwxLjc5MjQwODMgNDksNC4wMDM0NTU5OCBMNDksMzcuOTQ3NzYzNSBDNDksMzguOTEyNDA1MSA0OC42NTkyNzk4LDM5Ljc5NjM2NTkgNDguMDkxNjA0MSw0MC40ODY4NjY1IEM0OC4wNDE0MjMzLDQwLjkwMzIyODkgNDcuNzExMTg4OCw0MS40MDc0NjcyIDQ3LjA4MjU5MDgsNDEuOTUyMjUgQzQ3LjA4MjU5MDgsNDEuOTUyMjUgMzguNTI5OTE0NSw0OS4wNjQzMzYyIDM4LjUyOTkxNDUsNTEuMTUyNjQyNCBDMzguNTI5OTE0NSw2MS42NDk3NTYxIDM4LjE3NzAwOTksODIuMDAyNTQwNiAzOC4xNzcwMDk5LDgyLjAwMjU0MDYgQzM4LjE0MTIzMDQsODQuMjAyNDM1NCAzNi4zMjEwMjg0LDg2IDM0LjExMjg0OTUsODYgTDE1LjMwNTk1MzksODYgQzEzLjEwNzk2LDg2IDExLjI3ODE4ODQsODQuMjEwMDc4OSAxMS4yNDE3OTM2LDgyLjAwMjA5OTMgQzExLjI0MTc5MzYsODIuMDAyMDk5MyAxMC44ODg4ODg5LDYxLjY0NzA4NTIgMTAuODg4ODg4OSw1MS4xNDg2MzYxIEMxMC44ODg4ODg5LDQ5LjA2MTY2NTQgMi4zNDE0MzY2Miw0Mi4yMzg2NTUgMi4zNDE0MzY2Miw0Mi4yMzg2NTUgQzEuNzc4MjczMTEsNDEuNzY0MTM2NSAxLjQ0ODgxMzU0LDQxLjMyMDQyMzcgMS4zNDE3MzIzMSw0MC45MzkxNzAxIFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNDknIGhlaWdodD0nODYnIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdFx0XHRcdCAgICA8L2RlZnM+XG5cdFx0XHRcdFx0ICAgIDxnIGlkPSdQb3BvdmVyJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEpJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1Ni4wMDAwMDAsIDMxOC4wMDAwMDApJz5cblx0XHRcdFx0XHQgICAgICAgIDx1c2UgaWQ9J1JlY3RhbmdsZS0xNCcgc3Ryb2tlPScjQjJCNEI5JyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyNGQ0ZDRkMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdFx0PC9zdmc+XCJcblx0XHRcdFwiaXBob25lLTZzXCIgOiBcIjxzdmcgd2lkdGg9JzY0cHgnIGhlaWdodD0nMTA3cHgnIHZpZXdCb3g9JzI0IDM4NyA2NCAxMDcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS40ODY0NzY0Niw0OC4zNzc5OTQ3IEMwLjU4MDI2NjQ5LDQ3LjY0NjQyOTYgMCw0Ni41Mjk1ODcgMCw0NS4yNzgxOTQ4IEwwLDMuOTkwMDk3ODcgQzAsMS43ODI1OTEyIDEuNzk1MDk1NzcsMCA0LjAwOTQ1ODYyLDAgTDUzLjk5MDU0MTQsMCBDNTYuMjAwNTc0NiwwIDU4LDEuNzg2NDI3NjcgNTgsMy45OTAwOTc4NyBMNTgsNDUuMjc4MTk0OCBDNTgsNDYuMTgzMzAwNCA1Ny42OTgyMjU4LDQ3LjAxNjk3MzMgNTcuMTg5NTA5Nyw0Ny42ODU2MzI1IEM1Ny4wMzk2ODY1LDQ4LjAyMTI0OTcgNTYuNzM2MDA5OCw0OC4zOTcyODM0IDU2LjI3MTgzNjMsNDguNzk1MDY2MSBDNTYuMjcxODM2Myw0OC43OTUwNjYxIDQ1LjYwNjgzNzYsNTcuNjIyMDY5MyA0NS42MDY4Mzc2LDYwLjA3NDYxNDkgQzQ1LjYwNjgzNzYsNzIuNDAyNjIwNSA0NS4xNzc5NjcsOTYuOTkyMzE2NCA0NS4xNzc5NjcsOTYuOTkyMzE2NCBDNDUuMTQxMzc0OCw5OS4yMTIyMjE0IDQzLjMxOTMwNjUsMTAxIDQxLjEwOTAwMzUsMTAxIEwxNy4zODY3MjMsMTAxIEMxNS4xODEyNzIyLDEwMSAxMy4zNTQ2ODMsOTkuMjA1NTAwOSAxMy4zMTc3NTk1LDk2Ljk5MTg3NDEgQzEzLjMxNzc1OTUsOTYuOTkxODc0MSAxMi44ODg4ODg5LDcyLjM5OTQ4MzggMTIuODg4ODg4OSw2MC4wNjk5MDk5IEMxMi44ODg4ODg5LDU3LjYxODkzMjYgMi4yMjY3MzQzNyw0OS4xNDYyOTM2IDIuMjI2NzM0MzcsNDkuMTQ2MjkzNiBDMS45MDUyNDA4Nyw0OC44Nzg4MzI3IDEuNjU5MTE2NTUsNDguNjIwNzMzIDEuNDg2NDc2NDYsNDguMzc3OTk0NyBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdFx0XHRcdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzU4JyBoZWlnaHQ9JzEwMScgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI3LjAwMDAwMCwgMzg5LjAwMDAwMCknPlxuXHRcdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyNCMkI0QjknIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nI0ZDRkNGQycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFx0XCJpcGhvbmUtNnMtcGx1c1wiIDogXCI8c3ZnIHdpZHRoPSc3MHB4JyBoZWlnaHQ9JzExOXB4JyB2aWV3Qm94PScyOCA0NTAgNzAgMTE5JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdCAgICA8ZGVmcz5cblx0XHRcdFx0XHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTEnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMS41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNCAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJyByZXN1bHQ9J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdTb3VyY2VHcmFwaGljJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDwvZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgIDwvZmlsdGVyPlxuXHRcdFx0XHRcdCAgICAgICAgPHBhdGggZD0nTTEuOTU3MjkzOTUsNTQuMDcyODMwNCBDMC43ODU5MTExMzIsNTMuMzc1NzY5OSAwLDUyLjA5ODc3NiAwLDUwLjYzODkwMjIgTDAsMy45OTUyNDQxOSBDMCwxLjc4NjcxNDI4IDEuNzkyNDIyMDIsMCA0LjAwMzQ4NjYzLDAgTDU5Ljk5NjUxMzQsMCBDNjIuMjA0NjIzNSwwIDY0LDEuNzg4NzMxNzUgNjQsMy45OTUyNDQxOSBMNjQsNTAuNjM4OTAyMiBDNjQsNTEuOTIzMzY4NiA2My4zOTM3MTE2LDUzLjA2NTE1NTYgNjIuNDUxMzkxLDUzLjc5NTc1NCBDNjIuNDQyNzc1Miw1My44MDMyNDMzIDYyLjQzNDEwMTksNTMuODEwNzQwNCA2Mi40MjUzNzA5LDUzLjgxODI0NTQgQzYyLjQyNTM3MDksNTMuODE4MjQ1NCA1MC4zMjQ3ODYzLDYzLjg5Nzc0MDIgNTAuMzI0Nzg2Myw2Ni42MTczOTQ3IEM1MC4zMjQ3ODYzLDgwLjI4ODA1NDQgNDkuODQ0MzA0OSwxMDguMDAyMDA3IDQ5Ljg0NDMwNDksMTA4LjAwMjAwNyBDNDkuODA3OTY2NSwxMTAuMjEwMjM0IDQ3Ljk4NzQyMzIsMTEyIDQ1Ljc3ODkwODksMTEyIEwxOC43NjgwOTk3LDExMiBDMTYuNTUzNDM5NywxMTIgMTQuNzM5NDQ1NiwxMTAuMjA5ODQgMTQuNzAyNzAzNywxMDguMDAxNTY2IEMxNC43MDI3MDM3LDEwOC4wMDE1NjYgMTQuMjIyMjIyMiw4MC4yODQ1NzYxIDE0LjIyMjIyMjIsNjYuNjEyMTc3MyBDMTQuMjIyMjIyMiw2My44OTQyNjE5IDIuMTQwODE0MjIsNTQuMjMyMTMzNyAyLjE0MDgxNDIyLDU0LjIzMjEzMzcgQzIuMDc2NjQ5MTMsNTQuMTc4NjI5OCAyLjAxNTQ4MTExLDU0LjEyNTUxMzQgMS45NTcyOTM5NSw1NC4wNzI4MzA0IFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNjQnIGhlaWdodD0nMTEyJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgICAgIDwvbWFzaz5cblx0XHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzEuMDAwMDAwLCA0NTIuMDAwMDAwKSc+XG5cdFx0XHRcdFx0ICAgICAgICA8dXNlIGlkPSdSZWN0YW5nbGUtMTQnIHN0cm9rZT0nI0IyQjRCOScgbWFzaz0ndXJsKCNtYXNrLTMpJyBmaWxsPScjRkNGQ0ZDJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHRcdDwvc3ZnPlwiXG5cdFx0ZGFyazpcblx0XHRcdFwiaXBob25lLTVcIiA6IFwiPHN2ZyB3aWR0aD0nNTVweCcgaGVpZ2h0PSc5MnB4JyB2aWV3Qm94PSc1MyAzMTYgNTUgOTInIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS4zNDE3MzIzMSw0MC45MzkxNzAxIEMwLjUxNzQ2NjEyOCw0MC4yMDU4OSAwLDM5LjEzNzQyNTEgMCwzNy45NDc3NjM1IEwwLDQuMDAzNDU1OTggQzAsMS43ODkxNzEzNiAxLjc5NTI4MjQ4LDAgNC4wMDk4NzU2NiwwIEw0NC45OTAxMjQzLDAgQzQ3LjIxMjU2MDgsMCA0OSwxLjc5MjQwODMgNDksNC4wMDM0NTU5OCBMNDksMzcuOTQ3NzYzNSBDNDksMzguOTEyNDA1MSA0OC42NTkyNzk4LDM5Ljc5NjM2NTkgNDguMDkxNjA0MSw0MC40ODY4NjY1IEM0OC4wNDE0MjMzLDQwLjkwMzIyODkgNDcuNzExMTg4OCw0MS40MDc0NjcyIDQ3LjA4MjU5MDgsNDEuOTUyMjUgQzQ3LjA4MjU5MDgsNDEuOTUyMjUgMzguNTI5OTE0NSw0OS4wNjQzMzYyIDM4LjUyOTkxNDUsNTEuMTUyNjQyNCBDMzguNTI5OTE0NSw2MS42NDk3NTYxIDM4LjE3NzAwOTksODIuMDAyNTQwNiAzOC4xNzcwMDk5LDgyLjAwMjU0MDYgQzM4LjE0MTIzMDQsODQuMjAyNDM1NCAzNi4zMjEwMjg0LDg2IDM0LjExMjg0OTUsODYgTDE1LjMwNTk1MzksODYgQzEzLjEwNzk2LDg2IDExLjI3ODE4ODQsODQuMjEwMDc4OSAxMS4yNDE3OTM2LDgyLjAwMjA5OTMgQzExLjI0MTc5MzYsODIuMDAyMDk5MyAxMC44ODg4ODg5LDYxLjY0NzA4NTIgMTAuODg4ODg4OSw1MS4xNDg2MzYxIEMxMC44ODg4ODg5LDQ5LjA2MTY2NTQgMi4zNDE0MzY2Miw0Mi4yMzg2NTUgMi4zNDE0MzY2Miw0Mi4yMzg2NTUgQzEuNzc4MjczMTEsNDEuNzY0MTM2NSAxLjQ0ODgxMzU0LDQxLjMyMDQyMzcgMS4zNDE3MzIzMSw0MC45MzkxNzAxIFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNDknIGhlaWdodD0nODYnIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdFx0XHRcdCAgICA8L2RlZnM+XG5cdFx0XHRcdFx0ICAgIDxnIGlkPSdQb3BvdmVyJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEpJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1Ni4wMDAwMDAsIDMxOC4wMDAwMDApJz5cblx0XHRcdFx0XHQgICAgICAgIDx1c2UgaWQ9J1JlY3RhbmdsZS0xNCcgc3Ryb2tlPScjNjM2MzYzJyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyM2MzYzNjMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdFx0PC9zdmc+XCJcblx0XHRcdFwiaXBob25lLTZzXCIgOiBcIjxzdmcgd2lkdGg9JzY0cHgnIGhlaWdodD0nMTA3cHgnIHZpZXdCb3g9JzI0IDM4NyA2NCAxMDcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS40ODY0NzY0Niw0OC4zNzc5OTQ3IEMwLjU4MDI2NjQ5LDQ3LjY0NjQyOTYgMCw0Ni41Mjk1ODcgMCw0NS4yNzgxOTQ4IEwwLDMuOTkwMDk3ODcgQzAsMS43ODI1OTEyIDEuNzk1MDk1NzcsMCA0LjAwOTQ1ODYyLDAgTDUzLjk5MDU0MTQsMCBDNTYuMjAwNTc0NiwwIDU4LDEuNzg2NDI3NjcgNTgsMy45OTAwOTc4NyBMNTgsNDUuMjc4MTk0OCBDNTgsNDYuMTgzMzAwNCA1Ny42OTgyMjU4LDQ3LjAxNjk3MzMgNTcuMTg5NTA5Nyw0Ny42ODU2MzI1IEM1Ny4wMzk2ODY1LDQ4LjAyMTI0OTcgNTYuNzM2MDA5OCw0OC4zOTcyODM0IDU2LjI3MTgzNjMsNDguNzk1MDY2MSBDNTYuMjcxODM2Myw0OC43OTUwNjYxIDQ1LjYwNjgzNzYsNTcuNjIyMDY5MyA0NS42MDY4Mzc2LDYwLjA3NDYxNDkgQzQ1LjYwNjgzNzYsNzIuNDAyNjIwNSA0NS4xNzc5NjcsOTYuOTkyMzE2NCA0NS4xNzc5NjcsOTYuOTkyMzE2NCBDNDUuMTQxMzc0OCw5OS4yMTIyMjE0IDQzLjMxOTMwNjUsMTAxIDQxLjEwOTAwMzUsMTAxIEwxNy4zODY3MjMsMTAxIEMxNS4xODEyNzIyLDEwMSAxMy4zNTQ2ODMsOTkuMjA1NTAwOSAxMy4zMTc3NTk1LDk2Ljk5MTg3NDEgQzEzLjMxNzc1OTUsOTYuOTkxODc0MSAxMi44ODg4ODg5LDcyLjM5OTQ4MzggMTIuODg4ODg4OSw2MC4wNjk5MDk5IEMxMi44ODg4ODg5LDU3LjYxODkzMjYgMi4yMjY3MzQzNyw0OS4xNDYyOTM2IDIuMjI2NzM0MzcsNDkuMTQ2MjkzNiBDMS45MDUyNDA4Nyw0OC44Nzg4MzI3IDEuNjU5MTE2NTUsNDguNjIwNzMzIDEuNDg2NDc2NDYsNDguMzc3OTk0NyBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdFx0XHRcdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzU4JyBoZWlnaHQ9JzEwMScgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI3LjAwMDAwMCwgMzg5LjAwMDAwMCknPlxuXHRcdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyMjNjM2MzYzJyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyM2MzYzNjMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdFx0PC9zdmc+XCJcblx0XHRcdFwiaXBob25lLTZzLXBsdXNcIiA6IFwiPHN2ZyB3aWR0aD0nNzBweCcgaGVpZ2h0PScxMTlweCcgdmlld0JveD0nMjggNDUwIDcwIDExOScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjk1NzI5Mzk1LDU0LjA3MjgzMDQgQzAuNzg1OTExMTMyLDUzLjM3NTc2OTkgMCw1Mi4wOTg3NzYgMCw1MC42Mzg5MDIyIEwwLDMuOTk1MjQ0MTkgQzAsMS43ODY3MTQyOCAxLjc5MjQyMjAyLDAgNC4wMDM0ODY2MywwIEw1OS45OTY1MTM0LDAgQzYyLjIwNDYyMzUsMCA2NCwxLjc4ODczMTc1IDY0LDMuOTk1MjQ0MTkgTDY0LDUwLjYzODkwMjIgQzY0LDUxLjkyMzM2ODYgNjMuMzkzNzExNiw1My4wNjUxNTU2IDYyLjQ1MTM5MSw1My43OTU3NTQgQzYyLjQ0Mjc3NTIsNTMuODAzMjQzMyA2Mi40MzQxMDE5LDUzLjgxMDc0MDQgNjIuNDI1MzcwOSw1My44MTgyNDU0IEM2Mi40MjUzNzA5LDUzLjgxODI0NTQgNTAuMzI0Nzg2Myw2My44OTc3NDAyIDUwLjMyNDc4NjMsNjYuNjE3Mzk0NyBDNTAuMzI0Nzg2Myw4MC4yODgwNTQ0IDQ5Ljg0NDMwNDksMTA4LjAwMjAwNyA0OS44NDQzMDQ5LDEwOC4wMDIwMDcgQzQ5LjgwNzk2NjUsMTEwLjIxMDIzNCA0Ny45ODc0MjMyLDExMiA0NS43Nzg5MDg5LDExMiBMMTguNzY4MDk5NywxMTIgQzE2LjU1MzQzOTcsMTEyIDE0LjczOTQ0NTYsMTEwLjIwOTg0IDE0LjcwMjcwMzcsMTA4LjAwMTU2NiBDMTQuNzAyNzAzNywxMDguMDAxNTY2IDE0LjIyMjIyMjIsODAuMjg0NTc2MSAxNC4yMjIyMjIyLDY2LjYxMjE3NzMgQzE0LjIyMjIyMjIsNjMuODk0MjYxOSAyLjE0MDgxNDIyLDU0LjIzMjEzMzcgMi4xNDA4MTQyMiw1NC4yMzIxMzM3IEMyLjA3NjY0OTEzLDU0LjE3ODYyOTggMi4wMTU0ODExMSw1NC4xMjU1MTM0IDEuOTU3MjkzOTUsNTQuMDcyODMwNCBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdFx0XHRcdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzY0JyBoZWlnaHQ9JzExMicgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdFx0ICAgIDwvZGVmcz5cblx0XHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMxLjAwMDAwMCwgNDUyLjAwMDAwMCknPlxuXHRcdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyM2MzYzNjMnIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nIzYzNjM2MycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0XHQ8L3N2Zz5cIlxuXG5cdG9iamVjdHMgOlxuXHRcdFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzExcHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDExIDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+TGlnaHRidWxiPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjQ0LjAwMDAwMCwgLTYzOS4wMDAwMDApJyBzdHJva2U9JyM0QTUzNjEnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0xpZ2h0YnVsYicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjQ0LjAwMDAwMCwgNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNOCwxMC40MDAyOTA0IEM5Ljc4MDgzNzk1LDkuNDg5OTM0OTEgMTEsNy42MzczNDI3MyAxMSw1LjUgQzExLDIuNDYyNDMzODggOC41Mzc1NjYxMiwwIDUuNSwwIEMyLjQ2MjQzMzg4LDAgMCwyLjQ2MjQzMzg4IDAsNS41IEMwLDcuNjM3MzQyNzMgMS4yMTkxNjIwNSw5LjQ4OTkzNDkxIDMsMTAuNDAwMjkwNCBMMywxNC4wMDIwODY5IEMzLDE1LjEwMTczOTQgMy44OTc2MTYwMiwxNiA1LjAwNDg4MTUsMTYgTDUuOTk1MTE4NSwxNiBDNy4xMDYxMDAyLDE2IDgsMTUuMTA1NTAzOCA4LDE0LjAwMjA4NjkgTDgsMTAuNDAwMjkwNCBaJyBpZD0nT3ZhbC0xNycgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUwJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyB4PSczJyB5PScxMicgd2lkdGg9JzUnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyB4PSc0JyB5PScxMy41JyB3aWR0aD0nMS41JyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUsOC41IEM1LDguNSAzLjQ5OTk5OTk5LDcuNTAwMDAwMDEgNCw3IEM0LjUwMDAwMDAxLDYuNDk5OTk5OTkgNSw3LjY2NjY2NjY3IDUuNSw4IEM1LjUsOCA2LjUsNi41MDAwMDAwMSA3LDcgQzcuNSw3LjQ5OTk5OTk5IDYsOC41IDYsOC41IEw2LDExIEw1LDExIEw1LDguNSBaJyBpZD0nUmVjdGFuZ2xlLTUyJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRzaGlmdCA6IHtcblx0XHRvbiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzIwcHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDIwIDE3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0PHRpdGxlPlNoaWZ0PC90aXRsZT5cblx0XHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvVXBwZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNC4wMDAwMDAsIC0xMzAuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdUaGlyZC1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxMTguMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTIxLjcwNTIzODgsMTMuMjA1MjM4OCBDMjEuMzE1NzQ2MiwxMi44MTU3NDYyIDIwLjY4NTc1NTksMTIuODE0MjQ0MSAyMC4yOTQ3NjEyLDEzLjIwNTIzODggTDExLjkxNjA3NjcsMjEuNTgzOTIzMyBDMTEuMTMzOTk5MSwyMi4zNjYwMDA5IDExLjM5ODI2MDYsMjMgMTIuNDk3OTEzMSwyMyBMMTYuNSwyMyBMMTYuNSwyOC4wMDkyMjIgQzE2LjUsMjguNTU2NDEzNiAxNi45NDYzMTE0LDI5IDE3LjQ5NzU0NDYsMjkgTDI0LjUwMjQ1NTQsMjkgQzI1LjA1MzM4NCwyOSAyNS41LDI4LjU0OTAyNDggMjUuNSwyOC4wMDkyMjIgTDI1LjUsMjMgTDI5LjUwMjA4NjksMjMgQzMwLjYwNTUwMzgsMjMgMzAuODY2ODI0LDIyLjM2NjgyNCAzMC4wODM5MjMzLDIxLjU4MzkyMzMgTDIxLjcwNTIzODgsMTMuMjA1MjM4OCBaJyBpZD0nU2hpZnQnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRvZmYgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzIwcHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDIwIDE5JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdDx0aXRsZT5TaGlmdDwvdGl0bGU+XG5cdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvTG93ZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNC4wMDAwMDAsIC0xMjkuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9J00yMS42NzE5MDA4LDEyLjIzMjU4OTggQzIxLjMwMTAzMiwxMS44Mjc5OTE2IDIwLjY5NDY4OTIsMTEuODMzNDczMSAyMC4zMjg4MTk1LDEyLjIzMjU4OTggTDExLjY5NDcwMjMsMjEuNjUxMjk4MyBDMTAuNzU4NzQ0MSwyMi42NzIzMDggMTEuMTI4NTU0MSwyMy41IDEyLjUwOTc3NTEsMjMuNSBMMTUuOTk5OTk5OSwyMy41MDAwMDAyIEwxNS45OTk5OTk5LDI4LjAwMTQyNDEgQzE1Ljk5OTk5OTksMjguODI5MDY0OCAxNi42NzE2NTU5LDI5LjUwMDAwMDEgMTcuNDk3MTAxLDI5LjUwMDAwMDEgTDI0LjUwMjg5OTIsMjkuNTAwMDAwMSBDMjUuMzI5NzI1MywyOS41MDAwMDAxIDI2LjAwMDAwMDMsMjguODM0OTcwMyAyNi4wMDAwMDAzLDI4LjAwMTQyNDEgTDI2LjAwMDAwMDMsMjMuNTAwMDAwMSBMMjkuNDkwMjI1MSwyMy41MDAwMDAyIEMzMC44NzYzMzU3LDIzLjUwMDAwMDIgMzEuMjQzOTUyMSwyMi42NzUxOTE2IDMwLjMwNTQxNjEsMjEuNjUxMjk4NSBMMjEuNjcxOTAwOCwxMi4yMzI1ODk4IFogTTIxLjM0MTc0OCwxNC4zNjQ1MzE2IEMyMS4xNTMwMDU2LDE0LjE2MzIwNjQgMjAuODQzMzUxNSwxNC4xNjcwOTE0IDIwLjY1ODI1MTQsMTQuMzY0NTMxNiBMMTMuNSwyMS45OTk5OTk4IEwxNy41MDAwMDAxLDIxLjk5OTk5OTkgTDE3LjUwMDAwMDIsMjcuNTA4OTk1NiBDMTcuNTAwMDAwMiwyNy43ODAxNzAzIDE3LjczMjkwMjcsMjguMDAwMDAwOCAxOC4wMDM0MjI5LDI4LjAwMDAwMDggTDIzLjk5NjU3NywyOC4wMDAwMDA4IEMyNC4yNzQ2MDk3LDI4LjAwMDAwMDggMjQuNDk5OTk5NywyNy43NzIxMjAzIDI0LjQ5OTk5OTcsMjcuNTA4OTk1NiBMMjQuNDk5OTk5NywyMS45OTk5OTk5IEwyOC41LDIxLjk5OTk5OTkgTDIxLjM0MTc0OCwxNC4zNjQ1MzE2IFonIGlkPSdTaGlmdCc+PC9wYXRoPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPlwiXG5cdH1cblx0bWVzc2FnZXNfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+TWVzc2FnZXMgQ29weTwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtMSc+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyM2NkZEN0YnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzA5QjgyNicgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdpT1MtS2l0JyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNDUyLjAwMDAwMCwgLTg1My4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtUGx1cycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTQxNy4wMDAwMDAsIDgxMi4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgIDxnIGlkPSdNZXNzYWdlcy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzNS4wMDAwMDAsIDQxLjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdCRycgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC0xKScgeD0nMCcgeT0nMCcgd2lkdGg9JzYwJyBoZWlnaHQ9JzYwJyByeD0nMTQnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMTkuNDIyMzk3Niw0NC4zMDg4MDA2IEMxMy4xNjY0MjI4LDQxLjEzNDg5NDkgOSwzNS40NjU1NDIxIDksMjkgQzksMTkuMDU4ODc0NSAxOC44NDk3MzU1LDExIDMxLDExIEM0My4xNTAyNjQ1LDExIDUzLDE5LjA1ODg3NDUgNTMsMjkgQzUzLDM4Ljk0MTEyNTUgNDMuMTUwMjY0NSw0NyAzMSw0NyBDMjguNjk5NDU4OCw0NyAyNi40ODEzOTE0LDQ2LjcxMTA4OTcgMjQuMzk3MDQwOSw0Ni4xNzUxOTUzIEMyMy45NDQyNjUzLDQ2Ljg4MzgxNDMgMjEuOTA2NTM3Nyw0OS41IDE2LjUsNDkuNSBDMTUuNjE1MDE4Nyw0OS41IDE3LjE4MzQ3NDksNDguNTkxNTkyMSAxOCw0Ny41IEMxOC43ODk0Mjg2LDQ2LjQ0NDYzMjYgMTkuMjUwNTYyNSw0NC45NDgwMzYyIDE5LjQyMjM5NzYsNDQuMzA4ODAwNiBaJyBpZD0nQnViYmxlJyBmaWxsPScjRkZGRkZGJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdGNhbGVuZGFyX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPkNhbGVuZGFyPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+PC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC05Mi4wMDAwMDAsIC0yNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J0NhbGVuZGFyJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg5Mi4wMDAwMDAsIDAuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0JHJyBmaWxsPScjRkZGRkZGJyB4PScwJyB5PScwJyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHJ4PScxNCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGlkPScyNScgZm9udC1mYW1pbHk9J1NGVUlEaXNwbGF5LVVsdHJhbGlnaHQsIFNGIFVJIERpc3BsYXknIGZvbnQtc2l6ZT0nNDAnIGZvbnQtd2VpZ2h0PScyMDAnIGxldHRlci1zcGFjaW5nPScwLjM3OTk5OTk5NScgZmlsbD0nIzAwMDAwMCc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx0c3BhbiB4PSc3LjEwODI4MTI1JyB5PSc0OSc+MjU8L3RzcGFuPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvdGV4dD5cblx0ICAgICAgICAgICAgICAgICAgICA8dGV4dCBpZD0nTW9uZGF5JyBmb250LWZhbWlseT0nU0ZVSURpc3BsYXktTWVkaXVtLCBTRiBVSSBEaXNwbGF5JyBmb250LXNpemU9JzExJyBmb250LXdlaWdodD0nNDAwJyBsZXR0ZXItc3BhY2luZz0nMC4zNzk5OTk5OTUnIGZpbGw9JyNGRjNCMzAnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dHNwYW4geD0nOS4wMjk5MjE4OScgeT0nMTUnPk1vbmRheTwvdHNwYW4+XG5cdCAgICAgICAgICAgICAgICAgICAgPC90ZXh0PlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRwaG90b3NfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+UGhvdG9zPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+PC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNjguMDAwMDAwLCAtMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLTZzLUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAyNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgIDxnIGlkPSdQaG90b3MnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2OC4wMDAwMDAsIDAuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0JHJyBmaWxsPScjRkZGRkZGJyB4PScwJyB5PScwJyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHJ4PScxNCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdQZWRhbCcgZmlsbD0nI0YyNkU2NCcgc3R5bGU9J21peC1ibGVuZC1tb2RlOiBtdWx0aXBseTsnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDIwLjE0MjEzNiwgMjAuMTQyMTM2KSByb3RhdGUoNDUuMDAwMDAwKSB0cmFuc2xhdGUoLTIwLjE0MjEzNiwgLTIwLjE0MjEzNikgJyB4PSc4LjE0MjEzNTYyJyB5PScxMi4xNDIxMzU2JyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHJ4PSc4Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J1BlZGFsJyBmaWxsPScjRjBFMjJBJyBzdHlsZT0nbWl4LWJsZW5kLW1vZGU6IG11bHRpcGx5OycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzkuMTQyMTM2LCAxOS4xNDIxMzYpIHJvdGF0ZSgxMzUuMDAwMDAwKSB0cmFuc2xhdGUoLTM5LjE0MjEzNiwgLTE5LjE0MjEzNikgJyB4PScyNy4xNDIxMzU2JyB5PScxMS4xNDIxMzU2JyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHJ4PSc4Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J1BlZGFsJyBmaWxsPScjRDI4OEIxJyBzdHlsZT0nbWl4LWJsZW5kLW1vZGU6IG11bHRpcGx5OycgeD0nNCcgeT0nMjInIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyNGQkFEMzEnIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzMC4wMDAwMDAsIDE2LjAwMDAwMCkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0zMC4wMDAwMDAsIC0xNi4wMDAwMDApICcgeD0nMTgnIHk9JzgnIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyNBNThFQzInIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyMC4xNDIxMzYsIDQwLjE0MjEzNikgc2NhbGUoMSwgLTEpIHJvdGF0ZSg0NS4wMDAwMDApIHRyYW5zbGF0ZSgtMjAuMTQyMTM2LCAtNDAuMTQyMTM2KSAnIHg9JzguMTQyMTM1NjInIHk9JzMyLjE0MjEzNTYnIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyM2Q0MxOTknIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0MC4xNDIxMzYsIDQwLjE0MjEzNikgc2NhbGUoMSwgLTEpIHJvdGF0ZSgxMzUuMDAwMDAwKSB0cmFuc2xhdGUoLTQwLjE0MjEzNiwgLTQwLjE0MjEzNikgJyB4PScyOC4xNDIxMzU2JyB5PSczMi4xNDIxMzU2JyB3aWR0aD0nMjQnIGhlaWdodD0nMTYnIHJ4PSc4Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J1BlZGFsJyBmaWxsPScjNzdBRUREJyBzdHlsZT0nbWl4LWJsZW5kLW1vZGU6IG11bHRpcGx5OycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzAuMDAwMDAwLCA0NC4wMDAwMDApIHNjYWxlKDEsIC0xKSByb3RhdGUoOTAuMDAwMDAwKSB0cmFuc2xhdGUoLTMwLjAwMDAwMCwgLTQ0LjAwMDAwMCkgJyB4PScxOCcgeT0nMzYnIHdpZHRoPScyNCcgaGVpZ2h0PScxNicgcng9JzgnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nUGVkYWwnIGZpbGw9JyNCNUQ2NTUnIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbXVsdGlwbHk7JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0NC4wMDAwMDAsIDMwLjAwMDAwMCkgcm90YXRlKDE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtNDQuMDAwMDAwLCAtMzAuMDAwMDAwKSAnIHg9JzMyJyB5PScyMicgd2lkdGg9JzI0JyBoZWlnaHQ9JzE2JyByeD0nOCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRjYW1lcmFfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+Q2FtZXJhPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0xJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0RCRERERScgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjODk4QjkxJyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtMic+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyM0NzQ3NDcnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzJCMkIyQicgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgICAgICA8cGF0aCBkPSdNOSwyMCBMNTEsMjAgTDUxLDQyIEw5LDQyIEw5LDIwIFogTTksNDIuOTk3NTcyMiBDOSw0NC4zNzk1ODc3IDEwLjExOTk2NTMsNDUuNSAxMS41MDE1MTI1LDQ1LjUgTDQ4LjQ5ODQ4NzUsNDUuNSBDNDkuODc2NjAxNSw0NS41IDUxLDQ0LjM3OTYyNDkgNTEsNDIuOTk3NTcyMiBMNTEsNDIuNSBMOSw0Mi41IEw5LDQyLjk5NzU3MjIgWiBNOSwxOS41IEw5LDE5LjAwMjQyNzggQzksMTcuNjIwMzc1MSAxMC4xMjMzOTg1LDE2LjUgMTEuNTAxNTEyNSwxNi41IEwxNy41MzA0NDk2LDE2LjUgQzE4LjQ1NzIwMTEsMTYuNDE4MDE4NiAxOS4zMjE4MjA4LDE2LjI0MTYzMTMgMTkuOTIwNTMyMiwxNS44OTAyNTg4IEMyMS44MzI2NDI1LDE0Ljc2ODA3NzIgMjEuOTY0MTExMywxMS41IDI0Ljk5NjIwNSwxMS41IEwzMC4wMjYwODMsMTEuNSBMMzUuMDU1OTYxMSwxMS41IEMzOC4wODgwNTQ4LDExLjUgMzguMjE5NTIzNiwxNC43NjgwNzcyIDQwLjEzMTYzMzksMTUuODkwMjU4OCBDNDAuNzMwMzQ1MywxNi4yNDE2MzEzIDQxLjU5NDk2NSwxNi40MTgwMTg2IDQyLjUyMTcxNjUsMTYuNSBMNDguNDk4NDg3NSwxNi41IEM0OS44ODAwMzQ3LDE2LjUgNTEsMTcuNjIwNDEyMyA1MSwxOS4wMDI0Mjc4IEw1MSwxOS41IEw5LDE5LjUgTDksMTkuNSBaIE0zOS4yNSwzMSBDMzkuMjUsMjUuODkxMzY2MSAzNS4xMDg2MzM5LDIxLjc1IDMwLDIxLjc1IEMyNC44OTEzNjYxLDIxLjc1IDIwLjc1LDI1Ljg5MTM2NjEgMjAuNzUsMzEgQzIwLjc1LDM2LjEwODYzMzkgMjQuODkxMzY2MSw0MC4yNSAzMCw0MC4yNSBDMzUuMTA4NjMzOSw0MC4yNSAzOS4yNSwzNi4xMDg2MzM5IDM5LjI1LDMxIEwzOS4yNSwzMSBaIE0yMi4yNSwzMSBDMjIuMjUsMjYuNzE5NzkzMiAyNS43MTk3OTMyLDIzLjI1IDMwLDIzLjI1IEMzNC4yODAyMDY4LDIzLjI1IDM3Ljc1LDI2LjcxOTc5MzIgMzcuNzUsMzEgQzM3Ljc1LDM1LjI4MDIwNjggMzQuMjgwMjA2OCwzOC43NSAzMCwzOC43NSBDMjUuNzE5NzkzMiwzOC43NSAyMi4yNSwzNS4yODAyMDY4IDIyLjI1LDMxIEwyMi4yNSwzMSBaJyBpZD0ncGF0aC0zJz48L3BhdGg+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNCc+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAxICAgMCAwIDAgMCAxICAgMCAwIDAgMCAxICAwIDAgMCAwLjUgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNSc+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dCbHVySW5uZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nc2hhZG93Qmx1cklubmVyMScgcmVzdWx0PSdzaGFkb3dPZmZzZXRJbm5lcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0nc2hhZG93T2Zmc2V0SW5uZXIxJyBpbjI9J1NvdXJjZUFscGhhJyBvcGVyYXRvcj0nYXJpdGhtZXRpYycgazI9Jy0xJyBrMz0nMScgcmVzdWx0PSdzaGFkb3dJbm5lcklubmVyMSc+PC9mZUNvbXBvc2l0ZT5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMyAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dJbm5lcklubmVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhJbm5lcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93Qmx1cklubmVyMic+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J3NoYWRvd0JsdXJJbm5lcjInIHJlc3VsdD0nc2hhZG93T2Zmc2V0SW5uZXIyJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49J3NoYWRvd09mZnNldElubmVyMicgaW4yPSdTb3VyY2VBbHBoYScgb3BlcmF0b3I9J2FyaXRobWV0aWMnIGsyPSctMScgazM9JzEnIHJlc3VsdD0nc2hhZG93SW5uZXJJbm5lcjInPjwvZmVDb21wb3NpdGU+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjMgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93SW5uZXJJbm5lcjInIHJlc3VsdD0nc2hhZG93TWF0cml4SW5uZXIyJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzAuNScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd0JsdXJJbm5lcjMnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzAnIGluPSdzaGFkb3dCbHVySW5uZXIzJyByZXN1bHQ9J3NoYWRvd09mZnNldElubmVyMyc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSdzaGFkb3dPZmZzZXRJbm5lcjMnIGluMj0nU291cmNlQWxwaGEnIG9wZXJhdG9yPSdhcml0aG1ldGljJyBrMj0nLTEnIGszPScxJyByZXN1bHQ9J3NoYWRvd0lubmVySW5uZXIzJz48L2ZlQ29tcG9zaXRlPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4zIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0lubmVySW5uZXIzJyByZXN1bHQ9J3NoYWRvd01hdHJpeElubmVyMyc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScwLjUnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dCbHVySW5uZXI0Jz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9Jy0wJyBkeT0nMCcgaW49J3NoYWRvd0JsdXJJbm5lcjQnIHJlc3VsdD0nc2hhZG93T2Zmc2V0SW5uZXI0Jz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49J3NoYWRvd09mZnNldElubmVyNCcgaW4yPSdTb3VyY2VBbHBoYScgb3BlcmF0b3I9J2FyaXRobWV0aWMnIGsyPSctMScgazM9JzEnIHJlc3VsdD0nc2hhZG93SW5uZXJJbm5lcjQnPjwvZmVDb21wb3NpdGU+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjMgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93SW5uZXJJbm5lcjQnIHJlc3VsdD0nc2hhZG93TWF0cml4SW5uZXI0Jz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgICAgIDxmZU1lcmdlPlxuXHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhJbm5lcjEnPjwvZmVNZXJnZU5vZGU+XG5cdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeElubmVyMic+PC9mZU1lcmdlTm9kZT5cblx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4SW5uZXIzJz48L2ZlTWVyZ2VOb2RlPlxuXHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhJbm5lcjQnPjwvZmVNZXJnZU5vZGU+XG5cdCAgICAgICAgICAgIDwvZmVNZXJnZT5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8cGF0aCBkPSdNMTMsMTUuMjUgQzEzLDE0LjgzNTc4NjQgMTMuMzM1NTk0NywxNC41IDEzLjc1MDgzNzgsMTQuNSBMMTUuNzQ5MTYyMiwxNC41IEMxNi4xNjM4Mzg1LDE0LjUgMTYuNSwxNC44MzI4OTg2IDE2LjUsMTUuMjUgTDE2LjUsMTYgTDEzLDE2IEwxMywxNS4yNSBMMTMsMTUuMjUgWicgaWQ9J3BhdGgtNic+PC9wYXRoPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTcnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScwJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMSAgIDAgMCAwIDAgMSAgIDAgMCAwIDAgMSAgMCAwIDAgMC41IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTgnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0SW5uZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49J3NoYWRvd09mZnNldElubmVyMScgaW4yPSdTb3VyY2VBbHBoYScgb3BlcmF0b3I9J2FyaXRobWV0aWMnIGsyPSctMScgazM9JzEnIHJlc3VsdD0nc2hhZG93SW5uZXJJbm5lcjEnPjwvZmVDb21wb3NpdGU+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjUgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93SW5uZXJJbm5lcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8Y2lyY2xlIGlkPSdwYXRoLTknIGN4PSczOS41JyBjeT0nMjMnIHI9JzEnPjwvY2lyY2xlPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTEwJz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xMSc+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzAuNScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd0JsdXJJbm5lcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzAnIGluPSdzaGFkb3dCbHVySW5uZXIxJyByZXN1bHQ9J3NoYWRvd09mZnNldElubmVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSdzaGFkb3dPZmZzZXRJbm5lcjEnIGluMj0nU291cmNlQWxwaGEnIG9wZXJhdG9yPSdhcml0aG1ldGljJyBrMj0nLTEnIGszPScxJyByZXN1bHQ9J3NoYWRvd0lubmVySW5uZXIxJz48L2ZlQ29tcG9zaXRlPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4zIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0lubmVySW5uZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICA8L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTI0NC4wMDAwMDAsIC0yNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J0NhbWVyYScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjQ0LjAwMDAwMCwgMC4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0naWNvbic+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00zOS4wODE1LDAgQzQ1LjEwNSwwIDQ4LjExNiwwIDUxLjM1ODUsMS4wMjUgQzU0Ljg5ODUsMi4zMTM1IDU3LjY4NjUsNS4xMDE1IDU4Ljk3NSw4LjY0MTUgQzYwLDExLjg4MzUgNjAsMTQuODk1NSA2MCwyMC45MTg1IEw2MCwzOS4wODE1IEM2MCw0NS4xMDUgNjAsNDguMTE2IDU4Ljk3NSw1MS4zNTg1IEM1Ny42ODY1LDU0Ljg5ODUgNTQuODk4NSw1Ny42ODY1IDUxLjM1ODUsNTguOTc0NSBDNDguMTE2LDYwIDQ1LjEwNSw2MCAzOS4wODE1LDYwIEwyMC45MTg1LDYwIEMxNC44OTUsNjAgMTEuODgzNSw2MCA4LjY0MTUsNTguOTc0NSBDNS4xMDE1LDU3LjY4NjUgMi4zMTM1LDU0Ljg5ODUgMS4wMjUsNTEuMzU4NSBDMCw0OC4xMTYgMCw0NS4xMDUgMCwzOS4wODE1IEwwLDIwLjkxODUgQzAsMTQuODk1NSAwLDExLjg4MzUgMS4wMjUsOC42NDE1IEMyLjMxMzUsNS4xMDE1IDUuMTAxNSwyLjMxMzUgOC42NDE1LDEuMDI1IEMxMS44ODM1LDAgMTQuODk1LDAgMjAuOTE4NSwwIEwzOS4wODE1LDAgWicgaWQ9J0ljb24nIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtMSknPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J0NhbWVyYSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItNCknIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTIpJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTUpJyB4bGluazpocmVmPScjcGF0aC0zJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nUGF0aCc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItNyknIHhsaW5rOmhyZWY9JyNwYXRoLTYnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTIpJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTYnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTgpJyB4bGluazpocmVmPScjcGF0aC02Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nT3ZhbC0xNic+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItMTApJyB4bGluazpocmVmPScjcGF0aC05Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nI0ZGQzIwOScgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC05Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci0xMSknIHhsaW5rOmhyZWY9JyNwYXRoLTknPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHR3ZWF0aGVyX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPldlYWx0aGVyPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0xJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzFENjJGMCcgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMTlENUZEJyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNi4wMDAwMDAsIC0xMTUuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLTZzLUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAyNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgIDxnIGlkPSdXZWFsdGhlcicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTYuMDAwMDAwLCA4OC4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMzkuMDgxNSwwIEM0NS4xMDUsMCA0OC4xMTYsMCA1MS4zNTg1LDEuMDI1IEM1NC44OTg1LDIuMzEzNSA1Ny42ODY1LDUuMTAxNSA1OC45NzUsOC42NDE1IEM2MCwxMS44ODM1IDYwLDE0Ljg5NTUgNjAsMjAuOTE4NSBMNjAsMzkuMDgxNSBDNjAsNDUuMTA1IDYwLDQ4LjExNiA1OC45NzUsNTEuMzU4NSBDNTcuNjg2NSw1NC44OTg1IDU0Ljg5ODUsNTcuNjg2NSA1MS4zNTg1LDU4Ljk3NDUgQzQ4LjExNiw2MCA0NS4xMDUsNjAgMzkuMDgxNSw2MCBMMjAuOTE4NSw2MCBDMTQuODk1LDYwIDExLjg4MzUsNjAgOC42NDE1LDU4Ljk3NDUgQzUuMTAxNSw1Ny42ODY1IDIuMzEzNSw1NC44OTg1IDEuMDI1LDUxLjM1ODUgQzAsNDguMTE2IDAsNDUuMTA1IDAsMzkuMDgxNSBMMCwyMC45MTg1IEMwLDE0Ljg5NTUgMCwxMS44ODM1IDEuMDI1LDguNjQxNSBDMi4zMTM1LDUuMTAxNSA1LjEwMTUsMi4zMTM1IDguNjQxNSwxLjAyNSBDMTEuODgzNSwwIDE0Ljg5NSwwIDIwLjkxODUsMCBMMzkuMDgxNSwwIFonIGlkPSdCRycgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC0xKSc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9J1N1bicgZmlsbD0nI0ZGRDgwMCcgY3g9JzE5Ljc1JyBjeT0nMjQuMjUnIHI9JzExLjI1Jz48L2NpcmNsZT5cblx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNNDEuNSw0My45OTY2ODcgQzQ2LjQ5MzA2MjUsNDMuODY0MjAzNSA1MC41LDM5Ljc3NTAzNyA1MC41LDM0Ljc1IEM1MC41LDI5LjY0MTM2NjEgNDYuMzU4NjMzOSwyNS41IDQxLjI1LDI1LjUgQzQxLjA1NzQ1NDksMjUuNSA0MC44NjYyODM4LDI1LjUwNTg4MyA0MC42NzY2NTY3LDI1LjUxNzQ3OTEgQzM5LjAwNDMzNTMsMjEuNDAxODg4OSAzNC45NjYwNTM5LDE4LjUgMzAuMjUsMTguNSBDMjQuMDM2Nzk2NiwxOC41IDE5LDIzLjUzNjc5NjYgMTksMjkuNzUgQzE5LDMwLjAzOTE5MTUgMTkuMDEwOTExNywzMC4zMjU4MzQ0IDE5LjAzMjM0NiwzMC42MDk1Mzk1IEMxNS44ODU2MjQ0LDMxLjE4MjgxNTcgMTMuNSwzMy45Mzc4MTE2IDEzLjUsMzcuMjUgQzEzLjUsNDAuODk0MjI0MiAxNi4zODc5MDAyLDQzLjg2Mzk0MzEgMjAsNDMuOTk1NDU2MiBMMjAsNDQgTDQxLjUsNDQgTDQxLjUsNDMuOTk2Njg3IEw0MS41LDQzLjk5NjY4NyBaJyBpZD0nQ2xvdWQnIGZpbGw9JyNGRkZGRkYnIG9wYWNpdHk9JzAuOTAwNTM2MzgxJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdGNsb2NrX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPkNsb2NrPC90aXRsZT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+XG5cdCAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSc1MCUnIHkxPScwJScgeDI9JzUwJScgeTI9JzEwMCUnIGlkPSdsaW5lYXJHcmFkaWVudC0xJz5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0YxRjFGMScgb2Zmc2V0PScwJSc+PC9zdG9wPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjRUVFRUVFJyBvZmZzZXQ9JzEwMCUnPjwvc3RvcD5cblx0ICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC05Mi4wMDAwMDAsIC0xMTUuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLTZzLUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAyNy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgIDxnIGlkPSdDbG9jaycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoOTIuMDAwMDAwLCA4OC4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMzkuMDgxNSwwIEM0NS4xMDUsMCA0OC4xMTYsMCA1MS4zNTg1LDEuMDI1IEM1NC44OTg1LDIuMzEzNSA1Ny42ODY1LDUuMTAxNSA1OC45NzUsOC42NDE1IEM2MCwxMS44ODM1IDYwLDE0Ljg5NTUgNjAsMjAuOTE4NSBMNjAsMzkuMDgxNSBDNjAsNDUuMTA1IDYwLDQ4LjExNiA1OC45NzUsNTEuMzU4NSBDNTcuNjg2NSw1NC44OTg1IDU0Ljg5ODUsNTcuNjg2NSA1MS4zNTg1LDU4Ljk3NDUgQzQ4LjExNiw2MCA0NS4xMDUsNjAgMzkuMDgxNSw2MCBMMjAuOTE4NSw2MCBDMTQuODk1LDYwIDExLjg4MzUsNjAgOC42NDE1LDU4Ljk3NDUgQzUuMTAxNSw1Ny42ODY1IDIuMzEzNSw1NC44OTg1IDEuMDI1LDUxLjM1ODUgQzAsNDguMTE2IDAsNDUuMTA1IDAsMzkuMDgxNSBMMCwyMC45MTg1IEMwLDE0Ljg5NTUgMCwxMS44ODM1IDEuMDI1LDguNjQxNSBDMi4zMTM1LDUuMTAxNSA1LjEwMTUsMi4zMTM1IDguNjQxNSwxLjAyNSBDMTEuODgzNSwwIDE0Ljg5NSwwIDIwLjkxODUsMCBMMzkuMDgxNSwwIFonIGlkPSdJY29uJyBmaWxsPScjMUUxRTFGJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0nT3ZhbC0xMicgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC0xKScgY3g9JzMwJyBjeT0nMzAnIHI9JzI2Jz48L2NpcmNsZT5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nRGlnaXRzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg4LjAwMDAwMCwgNy4wMDAwMDApJyBmaWxsPScjNjE2MTYxJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTMyLjQ2OCw4IEwzMi40NjgsMy43NDYgTDMyLjA3OCwzLjc0NiBDMzIuMDQ5OTk5OSwzLjkwNjAwMDggMzEuOTk4MDAwNCw0LjAzNzk5OTQ4IDMxLjkyMiw0LjE0MiBDMzEuODQ1OTk5Niw0LjI0NjAwMDUyIDMxLjc1MzAwMDUsNC4zMjc5OTk3IDMxLjY0Myw0LjM4OCBDMzEuNTMyOTk5NCw0LjQ0ODAwMDMgMzEuNDEwMDAwNyw0LjQ4ODk5OTg5IDMxLjI3NCw0LjUxMSBDMzEuMTM3OTk5Myw0LjUzMzAwMDExIDMwLjk5ODAwMDcsNC41NDQgMzAuODU0LDQuNTQ0IEwzMC44NTQsNC45NTIgTDMxLjk1OCw0Ljk1MiBMMzEuOTU4LDggTDMyLjQ2OCw4IFonIGlkPScxJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00zOC4wOTYsMTIuNzUyIEwzOC42MDYsMTIuNzUyIEMzOC42MDIsMTIuNjIzOTk5NCAzOC42MTQ5OTk5LDEyLjQ5NzAwMDYgMzguNjQ1LDEyLjM3MSBDMzguNjc1MDAwMiwxMi4yNDQ5OTk0IDM4LjcyMzk5OTcsMTIuMTMyMDAwNSAzOC43OTIsMTIuMDMyIEMzOC44NjAwMDAzLDExLjkzMTk5OTUgMzguOTQ2OTk5NSwxMS44NTEwMDAzIDM5LjA1MywxMS43ODkgQzM5LjE1OTAwMDUsMTEuNzI2OTk5NyAzOS4yODU5OTkzLDExLjY5NiAzOS40MzQsMTEuNjk2IEMzOS41NDYwMDA2LDExLjY5NiAzOS42NTE5OTk1LDExLjcxMzk5OTggMzkuNzUyLDExLjc1IEMzOS44NTIwMDA1LDExLjc4NjAwMDIgMzkuOTM4OTk5NiwxMS44Mzc5OTk3IDQwLjAxMywxMS45MDYgQzQwLjA4NzAwMDQsMTEuOTc0MDAwMyA0MC4xNDU5OTk4LDEyLjA1NDk5OTUgNDAuMTksMTIuMTQ5IEM0MC4yMzQwMDAyLDEyLjI0MzAwMDUgNDAuMjU2LDEyLjM0Nzk5OTQgNDAuMjU2LDEyLjQ2NCBDNDAuMjU2LDEyLjYxMjAwMDcgNDAuMjMzMDAwMiwxMi43NDE5OTk0IDQwLjE4NywxMi44NTQgQzQwLjE0MDk5OTgsMTIuOTY2MDAwNiA0MC4wNzMwMDA1LDEzLjA2OTk5OTUgMzkuOTgzLDEzLjE2NiBDMzkuODkyOTk5NiwxMy4yNjIwMDA1IDM5Ljc4MDAwMDcsMTMuMzU2OTk5NSAzOS42NDQsMTMuNDUxIEMzOS41MDc5OTkzLDEzLjU0NTAwMDUgMzkuMzUwMDAwOSwxMy42NDc5OTk0IDM5LjE3LDEzLjc2IEMzOS4wMjE5OTkzLDEzLjg0ODAwMDQgMzguODgwMDAwNywxMy45NDE5OTk1IDM4Ljc0NCwxNC4wNDIgQzM4LjYwNzk5OTMsMTQuMTQyMDAwNSAzOC40ODYwMDA1LDE0LjI1Nzk5OTMgMzguMzc4LDE0LjM5IEMzOC4yNjk5OTk1LDE0LjUyMjAwMDcgMzguMTgxMDAwNCwxNC42NzY5OTkxIDM4LjExMSwxNC44NTUgQzM4LjA0MDk5OTcsMTUuMDMzMDAwOSAzNy45OTYwMDAxLDE1LjI0Nzk5ODcgMzcuOTc2LDE1LjUgTDQwLjc1NCwxNS41IEw0MC43NTQsMTUuMDUgTDM4LjU3LDE1LjA1IEMzOC41OTQwMDAxLDE0LjkxNzk5OTMgMzguNjQ0OTk5NiwxNC44MDEwMDA1IDM4LjcyMywxNC42OTkgQzM4LjgwMTAwMDQsMTQuNTk2OTk5NSAzOC44OTQ5OTk1LDE0LjUwMjAwMDQgMzkuMDA1LDE0LjQxNCBDMzkuMTE1MDAwNiwxNC4zMjU5OTk2IDM5LjIzNTk5OTMsMTQuMjQzMDAwNCAzOS4zNjgsMTQuMTY1IEMzOS41MDAwMDA3LDE0LjA4Njk5OTYgMzkuNjMxOTk5MywxNC4wMDgwMDA0IDM5Ljc2NCwxMy45MjggQzM5Ljg5NjAwMDcsMTMuODQzOTk5NiA0MC4wMjM5OTk0LDEzLjc1NjAwMDUgNDAuMTQ4LDEzLjY2NCBDNDAuMjcyMDAwNiwxMy41NzE5OTk1IDQwLjM4MTk5OTUsMTMuNDY5MDAwNiA0MC40NzgsMTMuMzU1IEM0MC41NzQwMDA1LDEzLjI0MDk5OTQgNDAuNjUwOTk5NywxMy4xMTIwMDA3IDQwLjcwOSwxMi45NjggQzQwLjc2NzAwMDMsMTIuODIzOTk5MyA0MC43OTYsMTIuNjU4MDAwOSA0MC43OTYsMTIuNDcgQzQwLjc5NiwxMi4yNjk5OTkgNDAuNzYxMDAwNCwxMi4wOTQwMDA4IDQwLjY5MSwxMS45NDIgQzQwLjYyMDk5OTcsMTEuNzg5OTk5MiA0MC41MjYwMDA2LDExLjY2MzAwMDUgNDAuNDA2LDExLjU2MSBDNDAuMjg1OTk5NCwxMS40NTg5OTk1IDQwLjE0NTAwMDgsMTEuMzgxMDAwMyAzOS45ODMsMTEuMzI3IEMzOS44MjA5OTkyLDExLjI3Mjk5OTcgMzkuNjQ4MDAwOSwxMS4yNDYgMzkuNDY0LDExLjI0NiBDMzkuMjM5OTk4OSwxMS4yNDYgMzkuMDQwMDAwOSwxMS4yODM5OTk2IDM4Ljg2NCwxMS4zNiBDMzguNjg3OTk5MSwxMS40MzYwMDA0IDM4LjU0MTAwMDYsMTEuNTQwOTk5MyAzOC40MjMsMTEuNjc1IEMzOC4zMDQ5OTk0LDExLjgwOTAwMDcgMzguMjE4MDAwMywxMS45Njc5OTkxIDM4LjE2MiwxMi4xNTIgQzM4LjEwNTk5OTcsMTIuMzM2MDAwOSAzOC4wODM5OTk5LDEyLjUzNTk5ODkgMzguMDk2LDEyLjc1MiBMMzguMDk2LDEyLjc1MiBaJyBpZD0nMic+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNNDIuMTQsMjIuNTcgTDQyLjE0LDIzLjAwMiBDNDIuMjM2MDAwNSwyMi45ODk5OTk5IDQyLjMzNzk5OTUsMjIuOTg0IDQyLjQ0NiwyMi45ODQgQzQyLjU3NDAwMDYsMjIuOTg0IDQyLjY5Mjk5OTUsMjMuMDAwOTk5OCA0Mi44MDMsMjMuMDM1IEM0Mi45MTMwMDA2LDIzLjA2OTAwMDIgNDMuMDA3OTk5NiwyMy4xMjA5OTk3IDQzLjA4OCwyMy4xOTEgQzQzLjE2ODAwMDQsMjMuMjYxMDAwNCA0My4yMzE5OTk4LDIzLjM0Njk5OTUgNDMuMjgsMjMuNDQ5IEM0My4zMjgwMDAyLDIzLjU1MTAwMDUgNDMuMzUyLDIzLjY2Nzk5OTMgNDMuMzUyLDIzLjggQzQzLjM1MiwyMy45MjgwMDA2IDQzLjMyNzAwMDMsMjQuMDQyOTk5NSA0My4yNzcsMjQuMTQ1IEM0My4yMjY5OTk4LDI0LjI0NzAwMDUgNDMuMTYwMDAwNCwyNC4zMzI5OTk3IDQzLjA3NiwyNC40MDMgQzQyLjk5MTk5OTYsMjQuNDczMDAwNCA0Mi44OTQwMDA2LDI0LjUyNjk5OTggNDIuNzgyLDI0LjU2NSBDNDIuNjY5OTk5NCwyNC42MDMwMDAyIDQyLjU1MjAwMDYsMjQuNjIyIDQyLjQyOCwyNC42MjIgQzQyLjEzNTk5ODUsMjQuNjIyIDQxLjkxNDAwMDgsMjQuNTM1MDAwOSA0MS43NjIsMjQuMzYxIEM0MS42MDk5OTkyLDI0LjE4Njk5OTEgNDEuNTMsMjMuOTYyMDAxNCA0MS41MjIsMjMuNjg2IEw0MS4wMTIsMjMuNjg2IEM0MS4wMDgsMjMuOTA2MDAxMSA0MS4wMzg5OTk3LDI0LjEwMTk5OTEgNDEuMTA1LDI0LjI3NCBDNDEuMTcxMDAwMywyNC40NDYwMDA5IDQxLjI2NTk5OTQsMjQuNTkwOTk5NCA0MS4zOSwyNC43MDkgQzQxLjUxNDAwMDYsMjQuODI3MDAwNiA0MS42NjM5OTkxLDI0LjkxNTk5OTcgNDEuODQsMjQuOTc2IEM0Mi4wMTYwMDA5LDI1LjAzNjAwMDMgNDIuMjExOTk4OSwyNS4wNjYgNDIuNDI4LDI1LjA2NiBDNDIuNjI4MDAxLDI1LjA2NiA0Mi44MTY5OTkxLDI1LjAzOTAwMDMgNDIuOTk1LDI0Ljk4NSBDNDMuMTczMDAwOSwyNC45MzA5OTk3IDQzLjMyNzk5OTMsMjQuODUwMDAwNSA0My40NiwyNC43NDIgQzQzLjU5MjAwMDcsMjQuNjMzOTk5NSA0My42OTY5OTk2LDI0LjQ5OTAwMDggNDMuNzc1LDI0LjMzNyBDNDMuODUzMDAwNCwyNC4xNzQ5OTkyIDQzLjg5MiwyMy45ODgwMDExIDQzLjg5MiwyMy43NzYgQzQzLjg5MiwyMy41MTk5OTg3IDQzLjgyOTAwMDYsMjMuMjk4MDAwOSA0My43MDMsMjMuMTEgQzQzLjU3Njk5OTQsMjIuOTIxOTk5MSA0My4zODQwMDEzLDIyLjgwMDAwMDMgNDMuMTI0LDIyLjc0NCBMNDMuMTI0LDIyLjczMiBDNDMuMjkyMDAwOCwyMi42NTU5OTk2IDQzLjQzMTk5OTQsMjIuNTQ0MDAwNyA0My41NDQsMjIuMzk2IEM0My42NTYwMDA2LDIyLjI0Nzk5OTMgNDMuNzEyLDIyLjA3ODAwMSA0My43MTIsMjEuODg2IEM0My43MTIsMjEuNjg5OTk5IDQzLjY3OTAwMDMsMjEuNTIwMDAwNyA0My42MTMsMjEuMzc2IEM0My41NDY5OTk3LDIxLjIzMTk5OTMgNDMuNDU2MDAwNiwyMS4xMTQwMDA1IDQzLjM0LDIxLjAyMiBDNDMuMjIzOTk5NCwyMC45Mjk5OTk1IDQzLjA4NzAwMDgsMjAuODYxMDAwMiA0Mi45MjksMjAuODE1IEM0Mi43NzA5OTkyLDIwLjc2ODk5OTggNDIuNjAwMDAwOSwyMC43NDYgNDIuNDE2LDIwLjc0NiBDNDIuMjAzOTk4OSwyMC43NDYgNDIuMDE3MDAwOCwyMC43Nzk5OTk3IDQxLjg1NSwyMC44NDggQzQxLjY5Mjk5OTIsMjAuOTE2MDAwMyA0MS41NTgwMDA1LDIxLjAwOTk5OTQgNDEuNDUsMjEuMTMgQzQxLjM0MTk5OTUsMjEuMjUwMDAwNiA0MS4yNTkwMDAzLDIxLjM5Mzk5OTIgNDEuMjAxLDIxLjU2MiBDNDEuMTQyOTk5NywyMS43MzAwMDA4IDQxLjExLDIxLjkxNTk5OSA0MS4xMDIsMjIuMTIgTDQxLjYxMiwyMi4xMiBDNDEuNjEyLDIxLjk5NTk5OTQgNDEuNjI3OTk5OCwyMS44NzgwMDA2IDQxLjY2LDIxLjc2NiBDNDEuNjkyMDAwMiwyMS42NTM5OTk0IDQxLjc0MDk5OTcsMjEuNTU2MDAwNCA0MS44MDcsMjEuNDcyIEM0MS44NzMwMDAzLDIxLjM4Nzk5OTYgNDEuOTU2OTk5NSwyMS4zMjEwMDAzIDQyLjA1OSwyMS4yNzEgQzQyLjE2MTAwMDUsMjEuMjIwOTk5OCA0Mi4yNzk5OTkzLDIxLjE5NiA0Mi40MTYsMjEuMTk2IEM0Mi42MzIwMDExLDIxLjE5NiA0Mi44MTE5OTkzLDIxLjI1Mjk5OTQgNDIuOTU2LDIxLjM2NyBDNDMuMTAwMDAwNywyMS40ODEwMDA2IDQzLjE3MiwyMS42NTE5OTg5IDQzLjE3MiwyMS44OCBDNDMuMTcyLDIxLjk5MjAwMDYgNDMuMTUwMDAwMiwyMi4wOTE5OTk2IDQzLjEwNiwyMi4xOCBDNDMuMDYxOTk5OCwyMi4yNjgwMDA0IDQzLjAwMzAwMDQsMjIuMzQwOTk5NyA0Mi45MjksMjIuMzk5IEM0Mi44NTQ5OTk2LDIyLjQ1NzAwMDMgNDIuNzY5MDAwNSwyMi41MDA5OTk5IDQyLjY3MSwyMi41MzEgQzQyLjU3Mjk5OTUsMjIuNTYxMDAwMiA0Mi40NzAwMDA1LDIyLjU3NiA0Mi4zNjIsMjIuNTc2IEw0Mi4yNTQsMjIuNTc2IEw0Mi4xOTQsMjIuNTc2IEM0Mi4xNzc5OTk5LDIyLjU3NiA0Mi4xNjAwMDAxLDIyLjU3NCA0Mi4xNCwyMi41NyBMNDIuMTQsMjIuNTcgWicgaWQ9JzMnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTQwLjM2NiwzNC4wNTQgTDM4LjkzOCwzNC4wNTQgTDQwLjM1NCwzMS45NzIgTDQwLjM2NiwzMS45NzIgTDQwLjM2NiwzNC4wNTQgWiBNNDAuODQ2LDM0LjA1NCBMNDAuODQ2LDMxLjI0NiBMNDAuNDM4LDMxLjI0NiBMMzguNSwzNC4wMTIgTDM4LjUsMzQuNTA0IEw0MC4zNjYsMzQuNTA0IEw0MC4zNjYsMzUuNSBMNDAuODQ2LDM1LjUgTDQwLjg0NiwzNC41MDQgTDQxLjQyMiwzNC41MDQgTDQxLjQyMiwzNC4wNTQgTDQwLjg0NiwzNC4wNTQgWicgaWQ9JzQnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTMzLjY1MiwzOC43NjggTDMzLjY1MiwzOC4zMTggTDMxLjU1MiwzOC4zMTggTDMxLjE1Niw0MC41MjYgTDMxLjU5NCw0MC41NSBDMzEuNjk0MDAwNSw0MC40Mjk5OTk0IDMxLjgwODk5OTMsNDAuMzMzMDAwNCAzMS45MzksNDAuMjU5IEMzMi4wNjkwMDA2LDQwLjE4NDk5OTYgMzIuMjE3OTk5Miw0MC4xNDggMzIuMzg2LDQwLjE0OCBDMzIuNTMwMDAwNyw0MC4xNDggMzIuNjYwOTk5NCw0MC4xNzE5OTk4IDMyLjc3OSw0MC4yMiBDMzIuODk3MDAwNiw0MC4yNjgwMDAyIDMyLjk5Nzk5OTYsNDAuMzM0OTk5NiAzMy4wODIsNDAuNDIxIEMzMy4xNjYwMDA0LDQwLjUwNzAwMDQgMzMuMjMwOTk5OCw0MC42MDg5OTk0IDMzLjI3Nyw0MC43MjcgQzMzLjMyMzAwMDIsNDAuODQ1MDAwNiAzMy4zNDYsNDAuOTczOTk5MyAzMy4zNDYsNDEuMTE0IEMzMy4zNDYsNDEuMjgyMDAwOCAzMy4zMjIwMDAyLDQxLjQyODk5OTQgMzMuMjc0LDQxLjU1NSBDMzMuMjI1OTk5OCw0MS42ODEwMDA2IDMzLjE2MTAwMDQsNDEuNzg1OTk5NiAzMy4wNzksNDEuODcgQzMyLjk5Njk5OTYsNDEuOTU0MDAwNCAzMi45MDEwMDA1LDQyLjAxNjk5OTggMzIuNzkxLDQyLjA1OSBDMzIuNjgwOTk5NCw0Mi4xMDEwMDAyIDMyLjU2NjAwMDYsNDIuMTIyIDMyLjQ0Niw0Mi4xMjIgQzMyLjMxNzk5OTQsNDIuMTIyIDMyLjIwMTAwMDUsNDIuMTAzMDAwMiAzMi4wOTUsNDIuMDY1IEMzMS45ODg5OTk1LDQyLjAyNjk5OTggMzEuODk3MDAwNCw0MS45NzMwMDA0IDMxLjgxOSw0MS45MDMgQzMxLjc0MDk5OTYsNDEuODMyOTk5NyAzMS42NzkwMDAyLDQxLjc1MTAwMDUgMzEuNjMzLDQxLjY1NyBDMzEuNTg2OTk5OCw0MS41NjI5OTk1IDMxLjU2LDQxLjQ2MjAwMDUgMzEuNTUyLDQxLjM1NCBMMzEuMDQyLDQxLjM1NCBDMzEuMDQ2LDQxLjU0NjAwMSAzMS4wODM5OTk2LDQxLjcxNzk5OTIgMzEuMTU2LDQxLjg3IEMzMS4yMjgwMDA0LDQyLjAyMjAwMDggMzEuMzI1OTk5NCw0Mi4xNDg5OTk1IDMxLjQ1LDQyLjI1MSBDMzEuNTc0MDAwNiw0Mi4zNTMwMDA1IDMxLjcxNjk5OTIsNDIuNDMwOTk5NyAzMS44NzksNDIuNDg1IEMzMi4wNDEwMDA4LDQyLjUzOTAwMDMgMzIuMjEzOTk5MSw0Mi41NjYgMzIuMzk4LDQyLjU2NiBDMzIuNjQ2MDAxMiw0Mi41NjYgMzIuODYyOTk5MSw0Mi41MjcwMDA0IDMzLjA0OSw0Mi40NDkgQzMzLjIzNTAwMDksNDIuMzcwOTk5NiAzMy4zODk5OTk0LDQyLjI2NjAwMDcgMzMuNTE0LDQyLjEzNCBDMzMuNjM4MDAwNiw0Mi4wMDE5OTkzIDMzLjczMDk5OTcsNDEuODUxMDAwOSAzMy43OTMsNDEuNjgxIEMzMy44NTUwMDAzLDQxLjUxMDk5OTIgMzMuODg2LDQxLjMzNjAwMDkgMzMuODg2LDQxLjE1NiBDMzMuODg2LDQwLjkxMTk5ODggMzMuODUwMDAwNCw0MC42OTkwMDA5IDMzLjc3OCw0MC41MTcgQzMzLjcwNTk5OTYsNDAuMzM0OTk5MSAzMy42MDgwMDA2LDQwLjE4MzAwMDYgMzMuNDg0LDQwLjA2MSBDMzMuMzU5OTk5NCwzOS45Mzg5OTk0IDMzLjIxNDAwMDgsMzkuODQ4MDAwMyAzMy4wNDYsMzkuNzg4IEMzMi44Nzc5OTkyLDM5LjcyNzk5OTcgMzIuNzAwMDAwOSwzOS42OTggMzIuNTEyLDM5LjY5OCBDMzIuMzY3OTk5MywzOS42OTggMzIuMjIzMDAwNywzOS43MjI5OTk4IDMyLjA3NywzOS43NzMgQzMxLjkzMDk5OTMsMzkuODIzMDAwMyAzMS44MTIwMDA1LDM5Ljg5OTk5OTUgMzEuNzIsNDAuMDA0IEwzMS43MDgsMzkuOTkyIEwzMS45MzYsMzguNzY4IEwzMy42NTIsMzguNzY4IFonIGlkPSc1Jz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00yMi44MTYsNDIuMzMyIEwyMy4zMjYsNDIuMzMyIEMyMy4yOTM5OTk4LDQxLjk3OTk5ODIgMjMuMTc0MDAxLDQxLjcxMTAwMDkgMjIuOTY2LDQxLjUyNSBDMjIuNzU3OTk5LDQxLjMzODk5OTEgMjIuNDc4MDAxOCw0MS4yNDYgMjIuMTI2LDQxLjI0NiBDMjEuODIxOTk4NSw0MS4yNDYgMjEuNTcwMDAxLDQxLjMwOTk5OTQgMjEuMzcsNDEuNDM4IEMyMS4xNjk5OTksNDEuNTY2MDAwNiAyMS4wMTAwMDA2LDQxLjczNTk5ODkgMjAuODksNDEuOTQ4IEMyMC43Njk5OTk0LDQyLjE2MDAwMTEgMjAuNjg1MDAwMiw0Mi40MDI5OTg2IDIwLjYzNSw0Mi42NzcgQzIwLjU4NDk5OTcsNDIuOTUxMDAxNCAyMC41Niw0My4yMzM5OTg1IDIwLjU2LDQzLjUyNiBDMjAuNTYsNDMuNzUwMDAxMSAyMC41NzY5OTk4LDQzLjk4MTk5ODggMjAuNjExLDQ0LjIyMiBDMjAuNjQ1MDAwMiw0NC40NjIwMDEyIDIwLjcxMzk5OTUsNDQuNjgxOTk5IDIwLjgxOCw0NC44ODIgQzIwLjkyMjAwMDUsNDUuMDgyMDAxIDIxLjA2OTk5OSw0NS4yNDU5OTk0IDIxLjI2Miw0NS4zNzQgQzIxLjQ1NDAwMSw0NS41MDIwMDA2IDIxLjcwNzk5ODQsNDUuNTY2IDIyLjAyNCw0NS41NjYgQzIyLjI5MjAwMTMsNDUuNTY2IDIyLjUxNjk5OTEsNDUuNTIxMDAwNSAyMi42OTksNDUuNDMxIEMyMi44ODEwMDA5LDQ1LjM0MDk5OTYgMjMuMDI2OTk5NCw0NS4yMjcwMDA3IDIzLjEzNyw0NS4wODkgQzIzLjI0NzAwMDUsNDQuOTUwOTk5MyAyMy4zMjU5OTk4LDQ0Ljc5ODAwMDggMjMuMzc0LDQ0LjYzIEMyMy40MjIwMDAyLDQ0LjQ2MTk5OTIgMjMuNDQ2LDQ0LjMwMDAwMDggMjMuNDQ2LDQ0LjE0NCBDMjMuNDQ2LDQzLjk0Nzk5OSAyMy40MTYwMDAzLDQzLjc2NjAwMDggMjMuMzU2LDQzLjU5OCBDMjMuMjk1OTk5Nyw0My40Mjk5OTkyIDIzLjIxMTAwMDUsNDMuMjg0MDAwNiAyMy4xMDEsNDMuMTYgQzIyLjk5MDk5OTQsNDMuMDM1OTk5NCAyMi44NTUwMDA4LDQyLjkzOTAwMDQgMjIuNjkzLDQyLjg2OSBDMjIuNTMwOTk5Miw0Mi43OTg5OTk3IDIyLjM0ODAwMSw0Mi43NjQgMjIuMTQ0LDQyLjc2NCBDMjEuOTExOTk4OCw0Mi43NjQgMjEuNzA3MDAwOSw0Mi44MDc5OTk2IDIxLjUyOSw0Mi44OTYgQzIxLjM1MDk5OTEsNDIuOTg0MDAwNCAyMS4yMDIwMDA2LDQzLjEyNTk5OSAyMS4wODIsNDMuMzIyIEwyMS4wNyw0My4zMSBDMjEuMDc0LDQzLjE0NTk5OTIgMjEuMDg5OTk5OSw0Mi45NzAwMDA5IDIxLjExOCw0Mi43ODIgQzIxLjE0NjAwMDEsNDIuNTkzOTk5MSAyMS4xOTY5OTk2LDQyLjQxOTAwMDggMjEuMjcxLDQyLjI1NyBDMjEuMzQ1MDAwNCw0Mi4wOTQ5OTkyIDIxLjQ0Nzk5OTMsNDEuOTYxMDAwNSAyMS41OCw0MS44NTUgQzIxLjcxMjAwMDcsNDEuNzQ4OTk5NSAyMS44ODU5OTg5LDQxLjY5NiAyMi4xMDIsNDEuNjk2IEMyMi4zMDYwMDEsNDEuNjk2IDIyLjQ2OTk5OTQsNDEuNzUzOTk5NCAyMi41OTQsNDEuODcgQzIyLjcxODAwMDYsNDEuOTg2MDAwNiAyMi43OTE5OTk5LDQyLjEzOTk5OSAyMi44MTYsNDIuMzMyIEwyMi44MTYsNDIuMzMyIFogTTIyLjA0OCw0My4yMTQgQzIyLjE5MjAwMDcsNDMuMjE0IDIyLjMxNzk5OTUsNDMuMjM5OTk5NyAyMi40MjYsNDMuMjkyIEMyMi41MzQwMDA1LDQzLjM0NDAwMDMgMjIuNjIzOTk5Niw0My40MTI5OTk2IDIyLjY5Niw0My40OTkgQzIyLjc2ODAwMDQsNDMuNTg1MDAwNCAyMi44MjA5OTk4LDQzLjY4Njk5OTQgMjIuODU1LDQzLjgwNSBDMjIuODg5MDAwMiw0My45MjMwMDA2IDIyLjkwNiw0NC4wNDc5OTkzIDIyLjkwNiw0NC4xOCBDMjIuOTA2LDQ0LjMwNDAwMDYgMjIuODg3MDAwMiw0NC40MjI5OTk0IDIyLjg0OSw0NC41MzcgQzIyLjgxMDk5OTgsNDQuNjUxMDAwNiAyMi43NTYwMDA0LDQ0Ljc1MTk5OTYgMjIuNjg0LDQ0Ljg0IEMyMi42MTE5OTk2LDQ0LjkyODAwMDQgMjIuNTIzMDAwNSw0NC45OTY5OTk4IDIyLjQxNyw0NS4wNDcgQzIyLjMxMDk5OTUsNDUuMDk3MDAwMyAyMi4xODgwMDA3LDQ1LjEyMiAyMi4wNDgsNDUuMTIyIEMyMS45MDc5OTkzLDQ1LjEyMiAyMS43ODMwMDA1LDQ1LjA5NzAwMDMgMjEuNjczLDQ1LjA0NyBDMjEuNTYyOTk5NCw0NC45OTY5OTk4IDIxLjQ3MTAwMDQsNDQuOTMwMDAwNCAyMS4zOTcsNDQuODQ2IEMyMS4zMjI5OTk2LDQ0Ljc2MTk5OTYgMjEuMjY2MDAwMiw0NC42NjIwMDA2IDIxLjIyNiw0NC41NDYgQzIxLjE4NTk5OTgsNDQuNDI5OTk5NCAyMS4xNjYsNDQuMzA2MDAwNyAyMS4xNjYsNDQuMTc0IEMyMS4xNjYsNDQuMDQxOTk5MyAyMS4xODQ5OTk4LDQzLjkxNzAwMDYgMjEuMjIzLDQzLjc5OSBDMjEuMjYxMDAwMiw0My42ODA5OTk0IDIxLjMxNzk5OTYsNDMuNTc5MDAwNCAyMS4zOTQsNDMuNDkzIEMyMS40NzAwMDA0LDQzLjQwNjk5OTYgMjEuNTYxOTk5NSw0My4zMzkwMDAzIDIxLjY3LDQzLjI4OSBDMjEuNzc4MDAwNSw0My4yMzg5OTk4IDIxLjkwMzk5OTMsNDMuMjE0IDIyLjA0OCw0My4yMTQgTDIyLjA0OCw0My4yMTQgWicgaWQ9JzYnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTEyLjg4NiwzOC43NTYgTDEyLjg4NiwzOC4zMTggTDEwLjEzMiwzOC4zMTggTDEwLjEzMiwzOC43OTggTDEyLjM2NCwzOC43OTggQzEyLjEzOTk5ODksMzkuMDM0MDAxMiAxMS45MzEwMDEsMzkuMjkxOTk4NiAxMS43MzcsMzkuNTcyIEMxMS41NDI5OTksMzkuODUyMDAxNCAxMS4zNzIwMDA3LDQwLjE0ODk5ODQgMTEuMjI0LDQwLjQ2MyBDMTEuMDc1OTk5Myw0MC43NzcwMDE2IDEwLjk1NTAwMDUsNDEuMTA0OTk4MyAxMC44NjEsNDEuNDQ3IEMxMC43NjY5OTk1LDQxLjc4OTAwMTcgMTAuNzA4MDAwMSw0Mi4xMzk5OTgyIDEwLjY4NCw0Mi41IEwxMS4yNTQsNDIuNSBDMTEuMjc0MDAwMSw0Mi4xNjc5OTgzIDExLjMyOTk5OTUsNDEuODI2MDAxOCAxMS40MjIsNDEuNDc0IEMxMS41MTQwMDA1LDQxLjEyMTk5ODIgMTEuNjMyOTk5Myw0MC43ODAwMDE3IDExLjc3OSw0MC40NDggQzExLjkyNTAwMDcsNDAuMTE1OTk4MyAxMi4wOTE5OTkxLDM5LjgwNDAwMTUgMTIuMjgsMzkuNTEyIEMxMi40NjgwMDA5LDM5LjIxOTk5ODUgMTIuNjY5OTk4OSwzOC45NjgwMDExIDEyLjg4NiwzOC43NTYgTDEyLjg4NiwzOC43NTYgWicgaWQ9JzcnPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTMuMjYyLDMyLjM1IEMzLjI2MiwzMi4yNDE5OTk1IDMuMjgxOTk5OCwzMi4xNDgwMDA0IDMuMzIyLDMyLjA2OCBDMy4zNjIwMDAyLDMxLjk4Nzk5OTYgMy40MTQ5OTk2NywzMS45MjAwMDAzIDMuNDgxLDMxLjg2NCBDMy41NDcwMDAzMywzMS44MDc5OTk3IDMuNjI1OTk5NTQsMzEuNzY2MDAwMSAzLjcxOCwzMS43MzggQzMuODEwMDAwNDYsMzEuNzA5OTk5OSAzLjkwNTk5OTUsMzEuNjk2IDQuMDA2LDMxLjY5NiBDNC4yMTQwMDEwNCwzMS42OTYgNC4zODQ5OTkzMywzMS43NTA5OTk1IDQuNTE5LDMxLjg2MSBDNC42NTMwMDA2NywzMS45NzEwMDA2IDQuNzIsMzIuMTMzOTk4OSA0LjcyLDMyLjM1IEM0LjcyLDMyLjU2NjAwMTEgNC42NTQwMDA2NiwzMi43MzM5OTk0IDQuNTIyLDMyLjg1NCBDNC4zODk5OTkzNCwzMi45NzQwMDA2IDQuMjIyMDAxMDIsMzMuMDM0IDQuMDE4LDMzLjAzNCBDMy45MTM5OTk0OCwzMy4wMzQgMy44MTYwMDA0NiwzMy4wMjAwMDAxIDMuNzI0LDMyLjk5MiBDMy42MzE5OTk1NCwzMi45NjM5OTk5IDMuNTUyMDAwMzQsMzIuOTIyMDAwMyAzLjQ4NCwzMi44NjYgQzMuNDE1OTk5NjYsMzIuODA5OTk5NyAzLjM2MjAwMDIsMzIuNzM5MDAwNCAzLjMyMiwzMi42NTMgQzMuMjgxOTk5OCwzMi41NjY5OTk2IDMuMjYyLDMyLjQ2NjAwMDYgMy4yNjIsMzIuMzUgTDMuMjYyLDMyLjM1IFogTTIuNzIyLDMyLjMzMiBDMi43MjIsMzIuNTI0MDAxIDIuNzc1OTk5NDYsMzIuNzAwOTk5MiAyLjg4NCwzMi44NjMgQzIuOTkyMDAwNTQsMzMuMDI1MDAwOCAzLjEzNTk5OTEsMzMuMTQxOTk5NiAzLjMxNiwzMy4yMTQgQzMuMDc1OTk4OCwzMy4yOTgwMDA0IDIuODkyMDAwNjQsMzMuNDMyOTk5MSAyLjc2NCwzMy42MTkgQzIuNjM1OTk5MzYsMzMuODA1MDAwOSAyLjU3MiwzNC4wMjM5OTg3IDIuNTcyLDM0LjI3NiBDMi41NzIsMzQuNDkyMDAxMSAyLjYwODk5OTYzLDM0LjY4MDk5OTIgMi42ODMsMzQuODQzIEMyLjc1NzAwMDM3LDM1LjAwNTAwMDggMi44NTg5OTkzNSwzNS4xMzk5OTk1IDIuOTg5LDM1LjI0OCBDMy4xMTkwMDA2NSwzNS4zNTYwMDA1IDMuMjcxOTk5MTIsMzUuNDM1OTk5NyAzLjQ0OCwzNS40ODggQzMuNjI0MDAwODgsMzUuNTQwMDAwMyAzLjgxMzk5ODk4LDM1LjU2NiA0LjAxOCwzNS41NjYgQzQuMjE0MDAwOTgsMzUuNTY2IDQuMzk3OTk5MTQsMzUuNTM4MDAwMyA0LjU3LDM1LjQ4MiBDNC43NDIwMDA4NiwzNS40MjU5OTk3IDQuODkwOTk5MzcsMzUuMzQzMDAwNiA1LjAxNywzNS4yMzMgQzUuMTQzMDAwNjMsMzUuMTIyOTk5NSA1LjI0Mjk5OTYzLDM0Ljk4ODAwMDggNS4zMTcsMzQuODI4IEM1LjM5MTAwMDM3LDM0LjY2Nzk5OTIgNS40MjgsMzQuNDg0MDAxIDUuNDI4LDM0LjI3NiBDNS40MjgsMzQuMDExOTk4NyA1LjM2NjAwMDYyLDMzLjc4OTAwMDkgNS4yNDIsMzMuNjA3IEM1LjExNzk5OTM4LDMzLjQyNDk5OTEgNC45MjgwMDEyOCwzMy4yOTQwMDA0IDQuNjcyLDMzLjIxNCBDNC44NTIwMDA5LDMzLjEzMzk5OTYgNC45OTQ5OTk0NywzMy4wMTUwMDA4IDUuMTAxLDMyLjg1NyBDNS4yMDcwMDA1MywzMi42OTg5OTkyIDUuMjYsMzIuNTI0MDAxIDUuMjYsMzIuMzMyIEM1LjI2LDMyLjE5NTk5OTMgNS4yMzYwMDAyNCwzMi4wNjMwMDA3IDUuMTg4LDMxLjkzMyBDNS4xMzk5OTk3NiwzMS44MDI5OTk0IDUuMDY1MDAwNTEsMzEuNjg3MDAwNSA0Ljk2MywzMS41ODUgQzQuODYwOTk5NDksMzEuNDgyOTk5NSA0LjcyODAwMDgyLDMxLjQwMTAwMDMgNC41NjQsMzEuMzM5IEM0LjM5OTk5OTE4LDMxLjI3Njk5OTcgNC4yMDIwMDExNiwzMS4yNDYgMy45NywzMS4yNDYgQzMuODA1OTk5MTgsMzEuMjQ2IDMuNjQ5MDAwNzUsMzEuMjY5OTk5OCAzLjQ5OSwzMS4zMTggQzMuMzQ4OTk5MjUsMzEuMzY2MDAwMiAzLjIxNjAwMDU4LDMxLjQzNTk5OTUgMy4xLDMxLjUyOCBDMi45ODM5OTk0MiwzMS42MjAwMDA1IDIuODkyMDAwMzQsMzEuNzMyOTk5MyAyLjgyNCwzMS44NjcgQzIuNzU1OTk5NjYsMzIuMDAxMDAwNyAyLjcyMiwzMi4xNTU5OTkxIDIuNzIyLDMyLjMzMiBMMi43MjIsMzIuMzMyIFogTTMuMTEyLDM0LjMgQzMuMTEyLDM0LjE3NTk5OTQgMy4xMzQ5OTk3NywzNC4wNjQwMDA1IDMuMTgxLDMzLjk2NCBDMy4yMjcwMDAyMywzMy44NjM5OTk1IDMuMjkwOTk5NTksMzMuNzc4MDAwNCAzLjM3MywzMy43MDYgQzMuNDU1MDAwNDEsMzMuNjMzOTk5NiAzLjU1MDk5OTQ1LDMzLjU3OTAwMDIgMy42NjEsMzMuNTQxIEMzLjc3MTAwMDU1LDMzLjUwMjk5OTggMy44ODc5OTkzOCwzMy40ODQgNC4wMTIsMzMuNDg0IEM0LjEzMjAwMDYsMzMuNDg0IDQuMjQ0OTk5NDcsMzMuNTA0OTk5OCA0LjM1MSwzMy41NDcgQzQuNDU3MDAwNTMsMzMuNTg5MDAwMiA0LjU0OTk5OTYsMzMuNjQ1OTk5NiA0LjYzLDMzLjcxOCBDNC43MTAwMDA0LDMzLjc5MDAwMDQgNC43NzI5OTk3NywzMy44NzQ5OTk1IDQuODE5LDMzLjk3MyBDNC44NjUwMDAyMywzNC4wNzEwMDA1IDQuODg4LDM0LjE3Nzk5OTQgNC44ODgsMzQuMjk0IEM0Ljg4OCwzNC40MTQwMDA2IDQuODY3MDAwMjEsMzQuNTIzOTk5NSA0LjgyNSwzNC42MjQgQzQuNzgyOTk5NzksMzQuNzI0MDAwNSA0LjcyMzAwMDM5LDM0LjgxMDk5OTYgNC42NDUsMzQuODg1IEM0LjU2Njk5OTYxLDM0Ljk1OTAwMDQgNC40NzUwMDA1MywzNS4wMTY5OTk4IDQuMzY5LDM1LjA1OSBDNC4yNjI5OTk0NywzNS4xMDEwMDAyIDQuMTQ2MDAwNjQsMzUuMTIyIDQuMDE4LDM1LjEyMiBDMy43NTM5OTg2OCwzNS4xMjIgMy41MzcwMDA4NSwzNS4wNDkwMDA3IDMuMzY3LDM0LjkwMyBDMy4xOTY5OTkxNSwzNC43NTY5OTkzIDMuMTEyLDM0LjU1NjAwMTMgMy4xMTIsMzQuMyBMMy4xMTIsMzQuMyBaJyBpZD0nOCc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMS4xMzYsMjMuOTc0IEwwLjYyNiwyMy45NzQgQzAuNjU4MDAwMTYsMjQuMzQyMDAxOCAwLjc5MTk5ODgyLDI0LjYxNTk5OTEgMS4wMjgsMjQuNzk2IEMxLjI2NDAwMTE4LDI0Ljk3NjAwMDkgMS41NTk5OTgyMiwyNS4wNjYgMS45MTYsMjUuMDY2IEMyLjQzMjAwMjU4LDI1LjA2NiAyLjgwNjk5ODgzLDI0Ljg2OTAwMiAzLjA0MSwyNC40NzUgQzMuMjc1MDAxMTcsMjQuMDgwOTk4IDMuMzkyLDIzLjUxNjAwMzcgMy4zOTIsMjIuNzggQzMuMzkyLDIyLjM3NTk5OCAzLjM1MzAwMDM5LDIyLjA0MzAwMTMgMy4yNzUsMjEuNzgxIEMzLjE5Njk5OTYxLDIxLjUxODk5ODcgMy4wOTIwMDA2NiwyMS4zMTIwMDA4IDIuOTYsMjEuMTYgQzIuODI3OTk5MzQsMjEuMDA3OTk5MiAyLjY3NDAwMDg4LDIwLjkwMTAwMDMgMi40OTgsMjAuODM5IEMyLjMyMTk5OTEyLDIwLjc3Njk5OTcgMi4xMzQwMDEsMjAuNzQ2IDEuOTM0LDIwLjc0NiBDMS43Mjk5OTg5OCwyMC43NDYgMS41NDIwMDA4NiwyMC43Nzk5OTk3IDEuMzcsMjAuODQ4IEMxLjE5Nzk5OTE0LDIwLjkxNjAwMDMgMS4wNTAwMDA2MiwyMS4wMTA5OTk0IDAuOTI2LDIxLjEzMyBDMC44MDE5OTkzOCwyMS4yNTUwMDA2IDAuNzA2MDAwMzQsMjEuNDAwOTk5MiAwLjYzOCwyMS41NzEgQzAuNTY5OTk5NjYsMjEuNzQxMDAwOSAwLjUzNiwyMS45Mjc5OTkgMC41MzYsMjIuMTMyIEMwLjUzNiwyMi4zNDAwMDEgMC41NjQ5OTk3MSwyMi41MzE5OTkxIDAuNjIzLDIyLjcwOCBDMC42ODEwMDAyOSwyMi44ODQwMDA5IDAuNzY2OTk5NDMsMjMuMDMzOTk5NCAwLjg4MSwyMy4xNTggQzAuOTk1MDAwNTcsMjMuMjgyMDAwNiAxLjEzNTk5OTE2LDIzLjM3ODk5OTcgMS4zMDQsMjMuNDQ5IEMxLjQ3MjAwMDg0LDIzLjUxOTAwMDQgMS42NjM5OTg5MiwyMy41NTQgMS44OCwyMy41NTQgQzIuMDg4MDAxMDQsMjMuNTU0IDIuMjc5OTk5MTIsMjMuNTAxMDAwNSAyLjQ1NiwyMy4zOTUgQzIuNjMyMDAwODgsMjMuMjg4OTk5NSAyLjc2Nzk5OTUyLDIzLjE0NjAwMDkgMi44NjQsMjIuOTY2IEwyLjg3NiwyMi45NzggQzIuODU5OTk5OTIsMjMuNTM0MDAyOCAyLjc3NDAwMDc4LDIzLjk0Njk5ODcgMi42MTgsMjQuMjE3IEMyLjQ2MTk5OTIyLDI0LjQ4NzAwMTQgMi4yMjgwMDE1NiwyNC42MjIgMS45MTYsMjQuNjIyIEMxLjcxMTk5ODk4LDI0LjYyMiAxLjUzNjAwMDc0LDI0LjU2NjAwMDYgMS4zODgsMjQuNDU0IEMxLjIzOTk5OTI2LDI0LjM0MTk5OTQgMS4xNTYwMDAxLDI0LjE4MjAwMSAxLjEzNiwyMy45NzQgTDEuMTM2LDIzLjk3NCBaIE0yLjc4NiwyMi4xNjggQzIuNzg2LDIyLjI5MjAwMDYgMi43NjYwMDAyLDIyLjQxMDk5OTQgMi43MjYsMjIuNTI1IEMyLjY4NTk5OTgsMjIuNjM5MDAwNiAyLjYyODAwMDM4LDIyLjczODk5OTYgMi41NTIsMjIuODI1IEMyLjQ3NTk5OTYyLDIyLjkxMTAwMDQgMi4zODQwMDA1NCwyMi45Nzg5OTk4IDIuMjc2LDIzLjAyOSBDMi4xNjc5OTk0NiwyMy4wNzkwMDAzIDIuMDQ4MDAwNjYsMjMuMTA0IDEuOTE2LDIzLjEwNCBDMS43OTE5OTkzOCwyMy4xMDQgMS42NzkwMDA1MSwyMy4wNzkwMDAzIDEuNTc3LDIzLjAyOSBDMS40NzQ5OTk0OSwyMi45Nzg5OTk4IDEuMzg3MDAwMzcsMjIuOTEyMDAwNCAxLjMxMywyMi44MjggQzEuMjM4OTk5NjMsMjIuNzQzOTk5NiAxLjE4MTAwMDIxLDIyLjY0ODAwMDUgMS4xMzksMjIuNTQgQzEuMDk2OTk5NzksMjIuNDMxOTk5NSAxLjA3NiwyMi4zMjAwMDA2IDEuMDc2LDIyLjIwNCBDMS4wNzYsMjIuMDcxOTk5MyAxLjA5MDk5OTg1LDIxLjk0NjAwMDYgMS4xMjEsMjEuODI2IEMxLjE1MTAwMDE1LDIxLjcwNTk5OTQgMS4xOTg5OTk2NywyMS41OTkwMDA1IDEuMjY1LDIxLjUwNSBDMS4zMzEwMDAzMywyMS40MTA5OTk1IDEuNDE2OTk5NDcsMjEuMzM2MDAwMyAxLjUyMywyMS4yOCBDMS42MjkwMDA1MywyMS4yMjM5OTk3IDEuNzU3OTk5MjQsMjEuMTk2IDEuOTEsMjEuMTk2IEMyLjA1NDAwMDcyLDIxLjE5NiAyLjE3OTk5OTQ2LDIxLjIyMTk5OTcgMi4yODgsMjEuMjc0IEMyLjM5NjAwMDU0LDIxLjMyNjAwMDMgMi40ODY5OTk2MywyMS4zOTY5OTk2IDIuNTYxLDIxLjQ4NyBDMi42MzUwMDAzNywyMS41NzcwMDA1IDIuNjkwOTk5ODEsMjEuNjc5OTk5NCAyLjcyOSwyMS43OTYgQzIuNzY3MDAwMTksMjEuOTEyMDAwNiAyLjc4NiwyMi4wMzU5OTkzIDIuNzg2LDIyLjE2OCBMMi43ODYsMjIuMTY4IFonIGlkPSc5Jz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00yLjgsMTUuNSBMMi44LDExLjI0NiBMMi40MSwxMS4yNDYgQzIuMzgxOTk5ODYsMTEuNDA2MDAwOCAyLjMzMDAwMDM4LDExLjUzNzk5OTUgMi4yNTQsMTEuNjQyIEMyLjE3Nzk5OTYyLDExLjc0NjAwMDUgMi4wODUwMDA1NSwxMS44Mjc5OTk3IDEuOTc1LDExLjg4OCBDMS44NjQ5OTk0NSwxMS45NDgwMDAzIDEuNzQyMDAwNjgsMTEuOTg4OTk5OSAxLjYwNiwxMi4wMTEgQzEuNDY5OTk5MzIsMTIuMDMzMDAwMSAxLjMzMDAwMDcyLDEyLjA0NCAxLjE4NiwxMi4wNDQgTDEuMTg2LDEyLjQ1MiBMMi4yOSwxMi40NTIgTDIuMjksMTUuNSBMMi44LDE1LjUgWiBNNC43OTIsMTMuNDA2IEM0Ljc5MiwxMy4zMDE5OTk1IDQuNzkyOTk5OTksMTMuMTg3MDAwNiA0Ljc5NSwxMy4wNjEgQzQuNzk3MDAwMDEsMTIuOTM0OTk5NCA0LjgwNjk5OTkxLDEyLjgwOTAwMDYgNC44MjUsMTIuNjgzIEM0Ljg0MzAwMDA5LDEyLjU1Njk5OTQgNC44Njg5OTk4MywxMi40MzQwMDA2IDQuOTAzLDEyLjMxNCBDNC45MzcwMDAxNywxMi4xOTM5OTk0IDQuOTg2OTk5NjcsMTIuMDg5MDAwNSA1LjA1MywxMS45OTkgQzUuMTE5MDAwMzMsMTEuOTA4OTk5NiA1LjIwMTk5OTUsMTEuODM2MDAwMyA1LjMwMiwxMS43OCBDNS40MDIwMDA1LDExLjcyMzk5OTcgNS41MjM5OTkyOCwxMS42OTYgNS42NjgsMTEuNjk2IEM1LjgxMjAwMDcyLDExLjY5NiA1LjkzMzk5OTUsMTEuNzIzOTk5NyA2LjAzNCwxMS43OCBDNi4xMzQwMDA1LDExLjgzNjAwMDMgNi4yMTY5OTk2NywxMS45MDg5OTk2IDYuMjgzLDExLjk5OSBDNi4zNDkwMDAzMywxMi4wODkwMDA1IDYuMzk4OTk5ODMsMTIuMTkzOTk5NCA2LjQzMywxMi4zMTQgQzYuNDY3MDAwMTcsMTIuNDM0MDAwNiA2LjQ5Mjk5OTkxLDEyLjU1Njk5OTQgNi41MTEsMTIuNjgzIEM2LjUyOTAwMDA5LDEyLjgwOTAwMDYgNi41Mzg5OTk5OSwxMi45MzQ5OTk0IDYuNTQxLDEzLjA2MSBDNi41NDMwMDAwMSwxMy4xODcwMDA2IDYuNTQ0LDEzLjMwMTk5OTUgNi41NDQsMTMuNDA2IEM2LjU0NCwxMy41NjYwMDA4IDYuNTM5MDAwMDUsMTMuNzQ0OTk5IDYuNTI5LDEzLjk0MyBDNi41MTg5OTk5NSwxNC4xNDEwMDEgNi40ODcwMDAyNywxNC4zMjY5OTkxIDYuNDMzLDE0LjUwMSBDNi4zNzg5OTk3MywxNC42NzUwMDA5IDYuMjkyMDAwNiwxNC44MjE5OTk0IDYuMTcyLDE0Ljk0MiBDNi4wNTE5OTk0LDE1LjA2MjAwMDYgNS44ODQwMDEwOCwxNS4xMjIgNS42NjgsMTUuMTIyIEM1LjQ1MTk5ODkyLDE1LjEyMiA1LjI4NDAwMDYsMTUuMDYyMDAwNiA1LjE2NCwxNC45NDIgQzUuMDQzOTk5NCwxNC44MjE5OTk0IDQuOTU3MDAwMjcsMTQuNjc1MDAwOSA0LjkwMywxNC41MDEgQzQuODQ4OTk5NzMsMTQuMzI2OTk5MSA0LjgxNzAwMDA1LDE0LjE0MTAwMSA0LjgwNywxMy45NDMgQzQuNzk2OTk5OTUsMTMuNzQ0OTk5IDQuNzkyLDEzLjU2NjAwMDggNC43OTIsMTMuNDA2IEw0Ljc5MiwxMy40MDYgWiBNNC4yNTIsMTMuNDEyIEM0LjI1MiwxMy41NjgwMDA4IDQuMjU1OTk5OTYsMTMuNzI5OTk5MiA0LjI2NCwxMy44OTggQzQuMjcyMDAwMDQsMTQuMDY2MDAwOCA0LjI5MTk5OTg0LDE0LjIyOTk5OTIgNC4zMjQsMTQuMzkgQzQuMzU2MDAwMTYsMTQuNTUwMDAwOCA0LjQwMTk5OTcsMTQuNzAwOTk5MyA0LjQ2MiwxNC44NDMgQzQuNTIyMDAwMywxNC45ODUwMDA3IDQuNjAzOTk5NDgsMTUuMTA5OTk5NSA0LjcwOCwxNS4yMTggQzQuODEyMDAwNTIsMTUuMzI2MDAwNSA0Ljk0Mjk5OTIxLDE1LjQxMDk5OTcgNS4xMDEsMTUuNDczIEM1LjI1OTAwMDc5LDE1LjUzNTAwMDMgNS40NDc5OTg5LDE1LjU2NiA1LjY2OCwxNS41NjYgQzUuODkyMDAxMTIsMTUuNTY2IDYuMDgxOTk5MjIsMTUuNTM1MDAwMyA2LjIzOCwxNS40NzMgQzYuMzk0MDAwNzgsMTUuNDEwOTk5NyA2LjUyMzk5OTQ4LDE1LjMyNjAwMDUgNi42MjgsMTUuMjE4IEM2LjczMjAwMDUyLDE1LjEwOTk5OTUgNi44MTM5OTk3LDE0Ljk4NTAwMDcgNi44NzQsMTQuODQzIEM2LjkzNDAwMDMsMTQuNzAwOTk5MyA2Ljk3OTk5OTg0LDE0LjU1MDAwMDggNy4wMTIsMTQuMzkgQzcuMDQ0MDAwMTYsMTQuMjI5OTk5MiA3LjA2Mzk5OTk2LDE0LjA2NjAwMDggNy4wNzIsMTMuODk4IEM3LjA4MDAwMDA0LDEzLjcyOTk5OTIgNy4wODQsMTMuNTY4MDAwOCA3LjA4NCwxMy40MTIgQzcuMDg0LDEzLjI1NTk5OTIgNy4wODAwMDAwNCwxMy4wOTQwMDA4IDcuMDcyLDEyLjkyNiBDNy4wNjM5OTk5NiwxMi43NTc5OTkyIDcuMDQ0MDAwMTYsMTIuNTk0MDAwOCA3LjAxMiwxMi40MzQgQzYuOTc5OTk5ODQsMTIuMjczOTk5MiA2LjkzNDAwMDMsMTIuMTIyMDAwNyA2Ljg3NCwxMS45NzggQzYuODEzOTk5NywxMS44MzM5OTkzIDYuNzMyMDAwNTIsMTEuNzA4MDAwNSA2LjYyOCwxMS42IEM2LjUyMzk5OTQ4LDExLjQ5MTk5OTUgNi4zOTMwMDA3OSwxMS40MDYwMDAzIDYuMjM1LDExLjM0MiBDNi4wNzY5OTkyMSwxMS4yNzc5OTk3IDUuODg4MDAxMSwxMS4yNDYgNS42NjgsMTEuMjQ2IEM1LjQ0Nzk5ODksMTEuMjQ2IDUuMjU5MDAwNzksMTEuMjc3OTk5NyA1LjEwMSwxMS4zNDIgQzQuOTQyOTk5MjEsMTEuNDA2MDAwMyA0LjgxMjAwMDUyLDExLjQ5MTk5OTUgNC43MDgsMTEuNiBDNC42MDM5OTk0OCwxMS43MDgwMDA1IDQuNTIyMDAwMywxMS44MzM5OTkzIDQuNDYyLDExLjk3OCBDNC40MDE5OTk3LDEyLjEyMjAwMDcgNC4zNTYwMDAxNiwxMi4yNzM5OTkyIDQuMzI0LDEyLjQzNCBDNC4yOTE5OTk4NCwxMi41OTQwMDA4IDQuMjcyMDAwMDQsMTIuNzU3OTk5MiA0LjI2NCwxMi45MjYgQzQuMjU1OTk5OTYsMTMuMDk0MDAwOCA0LjI1MiwxMy4yNTU5OTkyIDQuMjUyLDEzLjQxMiBMNC4yNTIsMTMuNDEyIFonIGlkPScxMCc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMTAuOCw4IEwxMC44LDMuNzQ2IEwxMC40MSwzLjc0NiBDMTAuMzgxOTk5OSwzLjkwNjAwMDggMTAuMzMwMDAwNCw0LjAzNzk5OTQ4IDEwLjI1NCw0LjE0MiBDMTAuMTc3OTk5Niw0LjI0NjAwMDUyIDEwLjA4NTAwMDUsNC4zMjc5OTk3IDkuOTc1LDQuMzg4IEM5Ljg2NDk5OTQ1LDQuNDQ4MDAwMyA5Ljc0MjAwMDY4LDQuNDg4OTk5ODkgOS42MDYsNC41MTEgQzkuNDY5OTk5MzIsNC41MzMwMDAxMSA5LjMzMDAwMDcyLDQuNTQ0IDkuMTg2LDQuNTQ0IEw5LjE4Niw0Ljk1MiBMMTAuMjksNC45NTIgTDEwLjI5LDggTDEwLjgsOCBaIE0xNC4xMzYsOCBMMTQuMTM2LDMuNzQ2IEwxMy43NDYsMy43NDYgQzEzLjcxNzk5OTksMy45MDYwMDA4IDEzLjY2NjAwMDQsNC4wMzc5OTk0OCAxMy41OSw0LjE0MiBDMTMuNTEzOTk5Niw0LjI0NjAwMDUyIDEzLjQyMTAwMDUsNC4zMjc5OTk3IDEzLjMxMSw0LjM4OCBDMTMuMjAwOTk5NCw0LjQ0ODAwMDMgMTMuMDc4MDAwNyw0LjQ4ODk5OTg5IDEyLjk0Miw0LjUxMSBDMTIuODA1OTk5Myw0LjUzMzAwMDExIDEyLjY2NjAwMDcsNC41NDQgMTIuNTIyLDQuNTQ0IEwxMi41MjIsNC45NTIgTDEzLjYyNiw0Ljk1MiBMMTMuNjI2LDggTDE0LjEzNiw4IFonIGlkPScxMSc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMjAuOCw1IEwyMC44LDAuNzQ2IEwyMC40MSwwLjc0NiBDMjAuMzgxOTk5OSwwLjkwNjAwMDggMjAuMzMwMDAwNCwxLjAzNzk5OTQ4IDIwLjI1NCwxLjE0MiBDMjAuMTc3OTk5NiwxLjI0NjAwMDUyIDIwLjA4NTAwMDUsMS4zMjc5OTk3IDE5Ljk3NSwxLjM4OCBDMTkuODY0OTk5NCwxLjQ0ODAwMDMgMTkuNzQyMDAwNywxLjQ4ODk5OTg5IDE5LjYwNiwxLjUxMSBDMTkuNDY5OTk5MywxLjUzMzAwMDExIDE5LjMzMDAwMDcsMS41NDQgMTkuMTg2LDEuNTQ0IEwxOS4xODYsMS45NTIgTDIwLjI5LDEuOTUyIEwyMC4yOSw1IEwyMC44LDUgWiBNMjIuMjY0LDIuMjUyIEwyMi43NzQsMi4yNTIgQzIyLjc3LDIuMTIzOTk5MzYgMjIuNzgyOTk5OCwxLjk5NzAwMDYzIDIyLjgxMywxLjg3MSBDMjIuODQzMDAwMSwxLjc0NDk5OTM3IDIyLjg5MTk5OTcsMS42MzIwMDA1IDIyLjk2LDEuNTMyIEMyMy4wMjgwMDAzLDEuNDMxOTk5NSAyMy4xMTQ5OTk1LDEuMzUxMDAwMzEgMjMuMjIxLDEuMjg5IEMyMy4zMjcwMDA1LDEuMjI2OTk5NjkgMjMuNDUzOTk5MywxLjE5NiAyMy42MDIsMS4xOTYgQzIzLjcxNDAwMDYsMS4xOTYgMjMuODE5OTk5NSwxLjIxMzk5OTgyIDIzLjkyLDEuMjUgQzI0LjAyMDAwMDUsMS4yODYwMDAxOCAyNC4xMDY5OTk2LDEuMzM3OTk5NjYgMjQuMTgxLDEuNDA2IEMyNC4yNTUwMDA0LDEuNDc0MDAwMzQgMjQuMzEzOTk5OCwxLjU1NDk5OTUzIDI0LjM1OCwxLjY0OSBDMjQuNDAyMDAwMiwxLjc0MzAwMDQ3IDI0LjQyNCwxLjg0Nzk5OTQyIDI0LjQyNCwxLjk2NCBDMjQuNDI0LDIuMTEyMDAwNzQgMjQuNDAxMDAwMiwyLjI0MTk5OTQ0IDI0LjM1NSwyLjM1NCBDMjQuMzA4OTk5OCwyLjQ2NjAwMDU2IDI0LjI0MTAwMDQsMi41Njk5OTk1MiAyNC4xNTEsMi42NjYgQzI0LjA2MDk5OTUsMi43NjIwMDA0OCAyMy45NDgwMDA3LDIuODU2OTk5NTMgMjMuODEyLDIuOTUxIEMyMy42NzU5OTkzLDMuMDQ1MDAwNDcgMjMuNTE4MDAwOSwzLjE0Nzk5OTQ0IDIzLjMzOCwzLjI2IEMyMy4xODk5OTkzLDMuMzQ4MDAwNDQgMjMuMDQ4MDAwNywzLjQ0MTk5OTUgMjIuOTEyLDMuNTQyIEMyMi43NzU5OTkzLDMuNjQyMDAwNSAyMi42NTQwMDA1LDMuNzU3OTk5MzQgMjIuNTQ2LDMuODkgQzIyLjQzNzk5OTUsNC4wMjIwMDA2NiAyMi4zNDkwMDAzLDQuMTc2OTk5MTEgMjIuMjc5LDQuMzU1IEMyMi4yMDg5OTk2LDQuNTMzMDAwODkgMjIuMTY0MDAwMSw0Ljc0Nzk5ODc0IDIyLjE0NCw1IEwyNC45MjIsNSBMMjQuOTIyLDQuNTUgTDIyLjczOCw0LjU1IEMyMi43NjIwMDAxLDQuNDE3OTk5MzQgMjIuODEyOTk5Niw0LjMwMTAwMDUxIDIyLjg5MSw0LjE5OSBDMjIuOTY5MDAwNCw0LjA5Njk5OTQ5IDIzLjA2Mjk5OTQsNC4wMDIwMDA0NCAyMy4xNzMsMy45MTQgQzIzLjI4MzAwMDUsMy44MjU5OTk1NiAyMy40MDM5OTkzLDMuNzQzMDAwMzkgMjMuNTM2LDMuNjY1IEMyMy42NjgwMDA3LDMuNTg2OTk5NjEgMjMuNzk5OTk5MywzLjUwODAwMDQgMjMuOTMyLDMuNDI4IEMyNC4wNjQwMDA3LDMuMzQzOTk5NTggMjQuMTkxOTk5NCwzLjI1NjAwMDQ2IDI0LjMxNiwzLjE2NCBDMjQuNDQwMDAwNiwzLjA3MTk5OTU0IDI0LjU0OTk5OTUsMi45NjkwMDA1NyAyNC42NDYsMi44NTUgQzI0Ljc0MjAwMDUsMi43NDA5OTk0MyAyNC44MTg5OTk3LDIuNjEyMDAwNzIgMjQuODc3LDIuNDY4IEMyNC45MzUwMDAzLDIuMzIzOTk5MjggMjQuOTY0LDIuMTU4MDAwOTQgMjQuOTY0LDEuOTcgQzI0Ljk2NCwxLjc2OTk5OSAyNC45MjkwMDAzLDEuNTk0MDAwNzYgMjQuODU5LDEuNDQyIEMyNC43ODg5OTk2LDEuMjg5OTk5MjQgMjQuNjk0MDAwNiwxLjE2MzAwMDUxIDI0LjU3NCwxLjA2MSBDMjQuNDUzOTk5NCwwLjk1ODk5OTQ5IDI0LjMxMzAwMDgsMC44ODEwMDAyNyAyNC4xNTEsMC44MjcgQzIzLjk4ODk5OTIsMC43NzI5OTk3MyAyMy44MTYwMDA5LDAuNzQ2IDIzLjYzMiwwLjc0NiBDMjMuNDA3OTk4OSwwLjc0NiAyMy4yMDgwMDA5LDAuNzgzOTk5NjIgMjMuMDMyLDAuODYgQzIyLjg1NTk5OTEsMC45MzYwMDAzOCAyMi43MDkwMDA2LDEuMDQwOTk5MzMgMjIuNTkxLDEuMTc1IEMyMi40NzI5OTk0LDEuMzA5MDAwNjcgMjIuMzg2MDAwMywxLjQ2Nzk5OTA4IDIyLjMzLDEuNjUyIEMyMi4yNzM5OTk3LDEuODM2MDAwOTIgMjIuMjUxOTk5OSwyLjAzNTk5ODkyIDIyLjI2NCwyLjI1MiBMMjIuMjY0LDIuMjUyIFonIGlkPScxMic+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0nSG91cicgZmlsbD0nIzJBMjkyOScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjUuMzE5Mjk3LCAyMy42MTE5MTcpIHJvdGF0ZSgtMzguMDAwMDAwKSB0cmFuc2xhdGUoLTI1LjMxOTI5NywgLTIzLjYxMTkxNykgJyBwb2ludHM9JzI0LjgxOTI5NzIgMTUuNjExOTE2OCAyNS44MTkyOTcyIDE1LjYxMTkxNjggMjUuODE5Mjk3MiAzMS42MTE5MTY4IDI0LjgxOTI5NzIgMzEuNjExOTE2OCc+PC9wb2x5Z29uPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSdNaW51dGUnIGZpbGw9JyMyQTI5MjknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE5LjMyOTk0OSwgMzUuNzMwMDI4KSByb3RhdGUoNjIuMDAwMDAwKSB0cmFuc2xhdGUoLTE5LjMyOTk0OSwgLTM1LjczMDAyOCkgJyBwb2ludHM9JzE5LjA0OTQzMjEgMjQuMjk4Njk5MSAxOS45MTg0MzYzIDI0LjI5ODY5OTEgMTkuNzg3NDQwNCA0Ny4yOTg2OTkxIDE4LjkxODQzNjMgNDcuMjk4Njk5MSc+PC9wb2x5Z29uPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSdTZWNvbmQnIGZpbGw9JyNERDQ1MjQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDM5LjY0NDYyMSwgMzIuMTI5NDgwKSByb3RhdGUoLTc2LjAwMDAwMCkgdHJhbnNsYXRlKC0zOS42NDQ2MjEsIC0zMi4xMjk0ODApICcgcG9pbnRzPSczOC45NTIzNTY1IDE4LjI0ODIzMTUgMzkuOTIyMTEzOCAxOC4yNDgyMzE1IDM5Ljk1MjM1NjUgNDYuMjQ4MjMxNSAzOC45ODI1OTkyIDQ2LjI0ODIzMTUnPjwvcG9seWdvbj5cblx0ICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSdPdmFsLTEzJyBmaWxsPScjMkEyOTI5JyBjeD0nMzAnIGN5PSczMCcgcj0nMS4yNSc+PC9jaXJjbGU+XG5cdCAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0nT3ZhbC0xNCcgZmlsbD0nI0RENDUyNCcgY3g9JzMwJyBjeT0nMzAnIHI9JzAuNzUnPjwvY2lyY2xlPlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRtYXBzX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPk1hcHM8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz5cblx0ICAgICAgICA8cGF0aCBkPSdNMzkuMDgxNSwwIEM0NS4xMDUsMCA0OC4xMTYsMCA1MS4zNTg1LDEuMDI1IEM1NC44OTg1LDIuMzEzNSA1Ny42ODY1LDUuMTAxNSA1OC45NzUsOC42NDE1IEM2MCwxMS44ODM1IDYwLDE0Ljg5NTUgNjAsMjAuOTE4NSBMNjAsMzkuMDgxNSBDNjAsNDUuMTA1IDYwLDQ4LjExNiA1OC45NzUsNTEuMzU4NSBDNTcuNjg2NSw1NC44OTg1IDU0Ljg5ODUsNTcuNjg2NSA1MS4zNTg1LDU4Ljk3NDUgQzQ4LjExNiw2MCA0NS4xMDUsNjAgMzkuMDgxNSw2MCBMMjAuOTE4NSw2MCBDMTQuODk1LDYwIDExLjg4MzUsNjAgOC42NDE1LDU4Ljk3NDUgQzUuMTAxNSw1Ny42ODY1IDIuMzEzNSw1NC44OTg1IDEuMDI1LDUxLjM1ODUgQzAsNDguMTE2IDAsNDUuMTA1IDAsMzkuMDgxNSBMMCwyMC45MTg1IEMwLDE0Ljg5NTUgMCwxMS44ODM1IDEuMDI1LDguNjQxNSBDMi4zMTM1LDUuMTAxNSA1LjEwMTUsMi4zMTM1IDguNjQxNSwxLjAyNSBDMTEuODgzNSwwIDE0Ljg5NSwwIDIwLjkxODUsMCBMMzkuMDgxNSwwIFonIGlkPSdwYXRoLTEnPjwvcGF0aD5cblx0ICAgICAgICA8cGF0aCBkPSdNLTQuNSwzMCBDLTQuNSwzMCAtNC40NzQ2MjYyNSwzMC40OTY3ODA3IC00LjQyNTExNjk1LDMwLjQ5MTI0MDEgQy0zLjQ0MjI5MDU1LDMwLjM4MTI1MDYgOS4xMDQ0NTY5NiwyOC40OTQ2OTIzIDE3LjUwNzU2ODQsMzQuNTA5Mjc3MyBDMjMuMjY4MzEwNSwzOC42MzI1Njg0IDI2LjQyMDc4LDQzLjc0OTAwODcgMzEsNDguMTg0ODE0NSBDMzYuNzkxOTkyMiw1My43OTU0MTAyIDQ0LjMzMTQwNDIsNTUuNjY4MDY2NCA1MC40MDU4MTQ0LDU2LjI1MDI5MyBDNTYuNDgwMjI0Niw1Ni44MzI1MTk1IDY1LDU2IDY1LDU2IEw2NSw2NiBDNjUsNjYgNTMuNTQ4OTYzMyw2NS4zNzY5Mzg1IDQ3LjgyMzQ4NjMsNjQuNjc4NDY2OCBDNDIuMDk4MDA5Myw2My45Nzk5OTUxIDMzLjI0NzA3MDMsNjIuMDI2MTIzIDI3LjM5MjMzNCw1Ny45MjcwMDIgQzE3Ljk5MDk2NjgsNTAuMTcyODUxNiAxOS4yNzc4NzQsNDcuODE5Mzc2MyAxMi4yOTE3NDgsNDMuMjI0NjA5NCBDNS4yNDA3MjI2NiwzOC41ODcxNTgyIC00LjUsNDAuNSAtNC41LDQwLjUgTC00LjUsMzAgWicgaWQ9J3BhdGgtMyc+PC9wYXRoPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTQnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PSctMC41JyB5PSctMC41JyB3aWR0aD0nNzAuNScgaGVpZ2h0PSczNyc+XG5cdCAgICAgICAgICAgIDxyZWN0IHg9Jy01JyB5PScyOS41JyB3aWR0aD0nNzAuNScgaGVpZ2h0PSczNycgZmlsbD0nd2hpdGUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0zJyBmaWxsPSdibGFjayc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxwb2x5Z29uIGlkPSdwYXRoLTUnIHBvaW50cz0nNTAuNSA2MCA0MS41IDYwIDQxLjUgMTguODQyOTc1MiAwIDE4Ljg0Mjk3NTIgMCA5LjkxNzM1NTM3IDQxLjUgOS45MTczNTUzNyA0MS41IDAgNTAuNSAwIDUwLjUgOS45MTczNTUzNyA2MCA5LjkxNzM1NTM3IDYwIDE4Ljg0Mjk3NTIgNTAuNSAxOC44NDI5NzUyIDUwLjUgMzYuNjk0MjE0OSA2MCAzNi42OTQyMTQ5IDYwIDQ1LjYxOTgzNDcgNTAuNSA0NS42MTk4MzQ3Jz48L3BvbHlnb24+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stNicgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9Jy0wLjUnIHk9Jy0wLjUnIHdpZHRoPSc2MScgaGVpZ2h0PSc2MSc+XG5cdCAgICAgICAgICAgIDxyZWN0IHg9Jy0wLjUnIHk9Jy0wLjUnIHdpZHRoPSc2MScgaGVpZ2h0PSc2MScgZmlsbD0nd2hpdGUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC01JyBmaWxsPSdibGFjayc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxwYXRoIGQ9J00wLjUsNy41IEMwLjgxNDk2MTU0OCwxMy44NDU5MDUxIDUuMDM2Nzk2NTYsMTkuNSAxMi43NSwxOS41IEMyMC40NjMyMDM0LDE5LjUgMjQuNjMxNDc1NSwxMy44NDM5MzgxIDI1LDcuNSBDMjUuMTIzNTM1Miw1LjM3MzQxMzA5IDI0LjM2NzQzMTYsMi41NjU1NTE3NiAyMy41MDY4MTMxLDEuMjcxMDE0MiBDMjIuNDU0OTU2NSwyLjAyNTk5Mjg1IDIwLjQzNzM1NjIsMi41IDE4Ljc1LDIuNSBDMTYuMTU5NjYzMSwyLjUgMTMuNDY5Mzg0OCwxLjg4MjkyMTA2IDEyLjc1LDAuMzQ3MTMzNzk5IEMxMi4wMzA2MTUyLDEuODgyOTIxMDYgOS4zNDAzMzY4OSwyLjUgNi43NSwyLjUgQzUuMDYyNjQzODMsMi41IDMuMDQ1MDQzNDYsMi4wMjU5OTI4NSAxLjk5MzE4Njg2LDEuMjcxMDE0MiBDMS4xMzI5MzQ1NywyLjc2NDE2MDE2IDAuMzkyMDg5ODQ0LDUuMzI1ODA1NjYgMC41LDcuNSBaJyBpZD0ncGF0aC03Jz48L3BhdGg+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stOCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPScyNC41MjM3Nzg3JyBoZWlnaHQ9JzE5LjE1Mjg2NjInIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC03Jz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMTAnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nMjQuNTIzNzc4NycgaGVpZ2h0PScxOS4xNTI4NjYyJyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtNyc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxyZWN0IGlkPSdwYXRoLTExJyB4PScwJyB5PScwLjUnIHdpZHRoPScyNScgaGVpZ2h0PSc1Jz48L3JlY3Q+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMTInPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMSAgIDAgMCAwIDAgMSAgIDAgMCAwIDAgMSAgMCAwIDAgMSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8cGF0aCBkPSdNMC41LDcuNSBDMC44MTQ5NjE1NDgsMTMuODQ1OTA1MSA1LjAzNjc5NjU2LDE5LjUgMTIuNzUsMTkuNSBDMjAuNDYzMjAzNCwxOS41IDI0LjYzMTQ3NTUsMTMuODQzOTM4MSAyNSw3LjUgQzI1LjEyMzUzNTIsNS4zNzM0MTMwOSAyNC4zNjc0MzE2LDIuNTY1NTUxNzYgMjMuNTA2ODEzMSwxLjI3MTAxNDIgQzIyLjQ1NDk1NjUsMi4wMjU5OTI4NSAyMC40MzczNTYyLDIuNSAxOC43NSwyLjUgQzE2LjE1OTY2MzEsMi41IDEzLjQ2OTM4NDgsMS44ODI5MjEwNiAxMi43NSwwLjM0NzEzMzc5OSBDMTIuMDMwNjE1MiwxLjg4MjkyMTA2IDkuMzQwMzM2ODksMi41IDYuNzUsMi41IEM1LjA2MjY0MzgzLDIuNSAzLjA0NTA0MzQ2LDIuMDI1OTkyODUgMS45OTMxODY4NiwxLjI3MTAxNDIgQzEuMTMyOTM0NTcsMi43NjQxNjAxNiAwLjM5MjA4OTg0NCw1LjMyNTgwNTY2IDAuNSw3LjUgWicgaWQ9J3BhdGgtMTMnPjwvcGF0aD5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay0xNCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPScyNC41MjM3Nzg3JyBoZWlnaHQ9JzE5LjE1Mjg2NjInIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0xMyc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgPC9kZWZzPlxuXHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdCAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtU0UnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNjguMDAwMDAwLCAtMTE1LjAwMDAwMCknPlxuXHQgICAgICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS02cy1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMjcuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICA8ZyBpZD0nTWFwcycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTY4LjAwMDAwMCwgODguMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9J21hc2stMicgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICAgICAgICAgICAgICA8dXNlIGlkPSdCRycgZmlsbD0nI0U0RERDOScgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0Jsb2NrJyBmaWxsPScjNzZDNjNCJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzAnIHk9JzAnIHdpZHRoPSc0MicgaGVpZ2h0PScxMCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdCbG9jaycgZmlsbD0nI0ZCQzZEMScgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PSc0NScgeT0nMC41JyB3aWR0aD0nMTUnIGhlaWdodD0nMTAnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nSGlnaHdheScgbWFzaz0ndXJsKCNtYXNrLTIpJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjRkZERTAyJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0nI0ZFQjMxMicgbWFzaz0ndXJsKCNtYXNrLTQpJyBzdHJva2Utd2lkdGg9JzEnIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nTWFwJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9JyNGRkZGRkYnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtNSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlLW9wYWNpdHk9JzAuMScgc3Ryb2tlPScjMDAwMDAwJyBtYXNrPSd1cmwoI21hc2stNiknIHN0cm9rZS13aWR0aD0nMScgeGxpbms6aHJlZj0nI3BhdGgtNSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J000My42NTY1OTE0LDM1LjUgTDQzLjQ0ODk3OTYsMzUuNSBMNDMuNDQ4OTc5NiwxNyBMLTEsMTcgTC0xLDEyIEw0OC41LDEyIEw0OC41LDE0LjUgTDQ4LjUsMTQuNSBMNDguNSwzNS41IEw0OC4yOTIzODgyLDM1LjUgQzQ3LjU4Njg5OSwzNS4xNzg5OTYgNDYuODAxODExLDM1IDQ1Ljk3NDQ4OTgsMzUgQzQ1LjE0NzE2ODUsMzUgNDQuMzYyMDgwNiwzNS4xNzg5OTYgNDMuNjU2NTkxNCwzNS41IEw0My42NTY1OTE0LDM1LjUgWicgaWQ9J1JvdXRlJyBmaWxsPScjNDA5QkZGJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nSW5kaWNhdG9yJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg0MC41MDAwMDAsIDM1LjUwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0nQ2lyY2xlJyBmaWxsPScjMDA3QUZGJyBjeD0nNS41JyBjeT0nNS41JyByPSc1LjUnPjwvY2lyY2xlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9J0Fycm93JyBmaWxsPScjRkZGRkZGJyBwb2ludHM9JzcuNzUgOC43NSA1LjUgMS42NTM4MDU5MiAzLjI1IDguNzUgNS41IDYuNjUzODA1OTInPjwvcG9seWdvbj5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nMjgwJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg4LjAwMDAwMCwgMjIuNTAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0nbWFzay05JyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC03Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdPdmFsLTIwJyBzdHJva2U9JyNGRkZGRkYnIG1hc2s9J3VybCgjbWFzay04KScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPScjMDA3QUZGJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgbWFzaz0ndXJsKCNtYXNrLTEwKScgeGxpbms6aHJlZj0nI3BhdGgtNyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nVG9wJyBzdHJva2U9J25vbmUnIGZpbGw9J25vbmUnIG1hc2s9J3VybCgjbWFzay05KSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTEyKScgeGxpbms6aHJlZj0nI3BhdGgtMTEnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nI0RFMUQyNicgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC0xMSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nU2hpZWxkJyBzdHJva2U9J25vbmUnIGZpbGw9J25vbmUnIG1hc2s9J3VybCgjbWFzay05KScgc3Ryb2tlLXdpZHRoPScxLjUnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjRkZGRkZGJyBtYXNrPSd1cmwoI21hc2stMTQpJyB4bGluazpocmVmPScjcGF0aC0xMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNNS42NCw5LjM3OCBMNi40MDUsOS4zNzggQzYuMzk4OTk5OTcsOS4xODU5OTkwNCA2LjQxODQ5OTc4LDguOTk1NTAwOTUgNi40NjM1LDguODA2NSBDNi41MDg1MDAyMyw4LjYxNzQ5OTA2IDYuNTgxOTk5NDksOC40NDgwMDA3NSA2LjY4NCw4LjI5OCBDNi43ODYwMDA1MSw4LjE0Nzk5OTI1IDYuOTE2NDk5MjEsOC4wMjY1MDA0NyA3LjA3NTUsNy45MzM1IEM3LjIzNDUwMDgsNy44NDA0OTk1NCA3LjQyNDk5ODg5LDcuNzk0IDcuNjQ3LDcuNzk0IEM3LjgxNTAwMDg0LDcuNzk0IDcuOTczOTk5MjUsNy44MjA5OTk3MyA4LjEyNCw3Ljg3NSBDOC4yNzQwMDA3NSw3LjkyOTAwMDI3IDguNDA0NDk5NDUsOC4wMDY5OTk0OSA4LjUxNTUsOC4xMDkgQzguNjI2NTAwNTYsOC4yMTEwMDA1MSA4LjcxNDk5OTY3LDguMzMyNDk5MyA4Ljc4MSw4LjQ3MzUgQzguODQ3MDAwMzMsOC42MTQ1MDA3MSA4Ljg4LDguNzcxOTk5MTMgOC44OCw4Ljk0NiBDOC44OCw5LjE2ODAwMTExIDguODQ1NTAwMzUsOS4zNjI5OTkxNiA4Ljc3NjUsOS41MzEgQzguNzA3NDk5NjYsOS42OTkwMDA4NCA4LjYwNTUwMDY4LDkuODU0OTk5MjggOC40NzA1LDkuOTk5IEM4LjMzNTQ5OTMzLDEwLjE0MzAwMDcgOC4xNjYwMDEwMiwxMC4yODU0OTkzIDcuOTYyLDEwLjQyNjUgQzcuNzU3OTk4OTgsMTAuNTY3NTAwNyA3LjUyMTAwMTM1LDEwLjcyMTk5OTIgNy4yNTEsMTAuODkgQzcuMDI4OTk4ODksMTEuMDIyMDAwNyA2LjgxNjAwMTAyLDExLjE2Mjk5OTMgNi42MTIsMTEuMzEzIEM2LjQwNzk5ODk4LDExLjQ2MzAwMDggNi4yMjUwMDA4MSwxMS42MzY5OTkgNi4wNjMsMTEuODM1IEM1LjkwMDk5OTE5LDEyLjAzMzAwMSA1Ljc2NzUwMDUzLDEyLjI2NTQ5ODcgNS42NjI1LDEyLjUzMjUgQzUuNTU3NDk5NDgsMTIuNzk5NTAxMyA1LjQ5MDAwMDE1LDEzLjEyMTk5ODEgNS40NiwxMy41IEw5LjYyNywxMy41IEw5LjYyNywxMi44MjUgTDYuMzUxLDEyLjgyNSBDNi4zODcwMDAxOCwxMi42MjY5OTkgNi40NjM0OTk0MiwxMi40NTE1MDA4IDYuNTgwNSwxMi4yOTg1IEM2LjY5NzUwMDU5LDEyLjE0NTQ5OTIgNi44Mzg0OTkxOCwxMi4wMDMwMDA3IDcuMDAzNSwxMS44NzEgQzcuMTY4NTAwODMsMTEuNzM4OTk5MyA3LjM0OTk5OTAxLDExLjYxNDUwMDYgNy41NDgsMTEuNDk3NSBDNy43NDYwMDA5OSwxMS4zODA0OTk0IDcuOTQzOTk5MDEsMTEuMjYyMDAwNiA4LjE0MiwxMS4xNDIgQzguMzQwMDAwOTksMTEuMDE1OTk5NCA4LjUzMTk5OTA3LDEwLjg4NDAwMDcgOC43MTgsMTAuNzQ2IEM4LjkwNDAwMDkzLDEwLjYwNzk5OTMgOS4wNjg5OTkyOCwxMC40NTM1MDA5IDkuMjEzLDEwLjI4MjUgQzkuMzU3MDAwNzIsMTAuMTExNDk5MSA5LjQ3MjQ5OTU3LDkuOTE4MDAxMDggOS41NTk1LDkuNzAyIEM5LjY0NjUwMDQ0LDkuNDg1OTk4OTIgOS42OSw5LjIzNzAwMTQxIDkuNjksOC45NTUgQzkuNjksOC42NTQ5OTg1IDkuNjM3NTAwNTMsOC4zOTEwMDExNCA5LjUzMjUsOC4xNjMgQzkuNDI3NDk5NDgsNy45MzQ5OTg4NiA5LjI4NTAwMDksNy43NDQ1MDA3NyA5LjEwNSw3LjU5MTUgQzguOTI0OTk5MSw3LjQzODQ5OTI0IDguNzEzNTAxMjIsNy4zMjE1MDA0MSA4LjQ3MDUsNy4yNDA1IEM4LjIyNzQ5ODc5LDcuMTU5NDk5NiA3Ljk2ODAwMTM4LDcuMTE5IDcuNjkyLDcuMTE5IEM3LjM1NTk5ODMyLDcuMTE5IDcuMDU2MDAxMzIsNy4xNzU5OTk0MyA2Ljc5Miw3LjI5IEM2LjUyNzk5ODY4LDcuNDA0MDAwNTcgNi4zMDc1MDA4OSw3LjU2MTQ5OSA2LjEzMDUsNy43NjI1IEM1Ljk1MzQ5OTEyLDcuOTYzNTAxMDEgNS44MjMwMDA0Miw4LjIwMTk5ODYyIDUuNzM5LDguNDc4IEM1LjY1NDk5OTU4LDguNzU0MDAxMzggNS42MjE5OTk5MSw5LjA1Mzk5ODM4IDUuNjQsOS4zNzggTDUuNjQsOS4zNzggWiBNMTEuNjQzLDguNzc1IEMxMS42NDMsOC42MTI5OTkxOSAxMS42NzI5OTk3LDguNDcyMDAwNiAxMS43MzMsOC4zNTIgQzExLjc5MzAwMDMsOC4yMzE5OTk0IDExLjg3MjQ5OTUsOC4xMzAwMDA0MiAxMS45NzE1LDguMDQ2IEMxMi4wNzA1MDA1LDcuOTYxOTk5NTggMTIuMTg4OTk5Myw3Ljg5OTAwMDIxIDEyLjMyNyw3Ljg1NyBDMTIuNDY1MDAwNyw3LjgxNDk5OTc5IDEyLjYwODk5OTMsNy43OTQgMTIuNzU5LDcuNzk0IEMxMy4wNzEwMDE2LDcuNzk0IDEzLjMyNzQ5OSw3Ljg3NjQ5OTE4IDEzLjUyODUsOC4wNDE1IEMxMy43Mjk1MDEsOC4yMDY1MDA4MyAxMy44Myw4LjQ1MDk5ODM4IDEzLjgzLDguNzc1IEMxMy44Myw5LjA5OTAwMTYyIDEzLjczMTAwMSw5LjM1MDk5OTEgMTMuNTMzLDkuNTMxIEMxMy4zMzQ5OTksOS43MTEwMDA5IDEzLjA4MzAwMTUsOS44MDEgMTIuNzc3LDkuODAxIEMxMi42MjA5OTkyLDkuODAxIDEyLjQ3NDAwMDcsOS43ODAwMDAyMSAxMi4zMzYsOS43MzggQzEyLjE5Nzk5OTMsOS42OTU5OTk3OSAxMi4wNzgwMDA1LDkuNjMzMDAwNDIgMTEuOTc2LDkuNTQ5IEMxMS44NzM5OTk1LDkuNDY0OTk5NTggMTEuNzkzMDAwMyw5LjM1ODUwMDY1IDExLjczMyw5LjIyOTUgQzExLjY3Mjk5OTcsOS4xMDA0OTkzNiAxMS42NDMsOC45NDkwMDA4NyAxMS42NDMsOC43NzUgTDExLjY0Myw4Ljc3NSBaIE0xMC44MzMsOC43NDggQzEwLjgzMyw5LjAzNjAwMTQ0IDEwLjkxMzk5OTIsOS4zMDE0OTg3OSAxMS4wNzYsOS41NDQ1IEMxMS4yMzgwMDA4LDkuNzg3NTAxMjIgMTEuNDUzOTk4Nyw5Ljk2Mjk5OTQ2IDExLjcyNCwxMC4wNzEgQzExLjM2Mzk5ODIsMTAuMTk3MDAwNiAxMS4wODgwMDEsMTAuMzk5NDk4NiAxMC44OTYsMTAuNjc4NSBDMTAuNzAzOTk5LDEwLjk1NzUwMTQgMTAuNjA4LDExLjI4NTk5ODEgMTAuNjA4LDExLjY2NCBDMTAuNjA4LDExLjk4ODAwMTYgMTAuNjYzNDk5NCwxMi4yNzE0OTg4IDEwLjc3NDUsMTIuNTE0NSBDMTAuODg1NTAwNiwxMi43NTc1MDEyIDExLjAzODQ5OSwxMi45NTk5OTkyIDExLjIzMzUsMTMuMTIyIEMxMS40Mjg1MDEsMTMuMjg0MDAwOCAxMS42NTc5OTg3LDEzLjQwMzk5OTYgMTEuOTIyLDEzLjQ4MiBDMTIuMTg2MDAxMywxMy41NjAwMDA0IDEyLjQ3MDk5ODUsMTMuNTk5IDEyLjc3NywxMy41OTkgQzEzLjA3MTAwMTUsMTMuNTk5IDEzLjM0Njk5ODcsMTMuNTU3MDAwNCAxMy42MDUsMTMuNDczIEMxMy44NjMwMDEzLDEzLjM4ODk5OTYgMTQuMDg2NDk5MSwxMy4yNjQ1MDA4IDE0LjI3NTUsMTMuMDk5NSBDMTQuNDY0NTAwOSwxMi45MzQ0OTkyIDE0LjYxNDQ5OTQsMTIuNzMyMDAxMiAxNC43MjU1LDEyLjQ5MiBDMTQuODM2NTAwNiwxMi4yNTE5OTg4IDE0Ljg5MiwxMS45NzYwMDE2IDE0Ljg5MiwxMS42NjQgQzE0Ljg5MiwxMS4yNjc5OTggMTQuNzk5MDAwOSwxMC45MzM1MDE0IDE0LjYxMywxMC42NjA1IEMxNC40MjY5OTkxLDEwLjM4NzQ5ODYgMTQuMTQyMDAxOSwxMC4xOTEwMDA2IDEzLjc1OCwxMC4wNzEgQzE0LjAyODAwMTQsOS45NTA5OTk0IDE0LjI0MjQ5OTIsOS43NzI1MDExOSAxNC40MDE1LDkuNTM1NSBDMTQuNTYwNTAwOCw5LjI5ODQ5ODgyIDE0LjY0LDkuMDM2MDAxNDQgMTQuNjQsOC43NDggQzE0LjY0LDguNTQzOTk4OTggMTQuNjA0MDAwNCw4LjM0NDUwMDk4IDE0LjUzMiw4LjE0OTUgQzE0LjQ1OTk5OTYsNy45NTQ0OTkwMyAxNC4zNDc1MDA4LDcuNzgwNTAwNzcgMTQuMTk0NSw3LjYyNzUgQzE0LjA0MTQ5OTIsNy40NzQ0OTkyNCAxMy44NDIwMDEyLDcuMzUxNTAwNDcgMTMuNTk2LDcuMjU4NSBDMTMuMzQ5OTk4OCw3LjE2NTQ5OTU0IDEzLjA1MzAwMTcsNy4xMTkgMTIuNzA1LDcuMTE5IEMxMi40NTg5OTg4LDcuMTE5IDEyLjIyMzUwMTEsNy4xNTQ5OTk2NCAxMS45OTg1LDcuMjI3IEMxMS43NzM0OTg5LDcuMjk5MDAwMzYgMTEuNTc0MDAwOSw3LjQwMzk5OTMxIDExLjQsNy41NDIgQzExLjIyNTk5OTEsNy42ODAwMDA2OSAxMS4wODgwMDA1LDcuODQ5NDk5IDEwLjk4Niw4LjA1MDUgQzEwLjg4Mzk5OTUsOC4yNTE1MDEwMSAxMC44MzMsOC40ODM5OTg2OCAxMC44MzMsOC43NDggTDEwLjgzMyw4Ljc0OCBaIE0xMS40MTgsMTEuNyBDMTEuNDE4LDExLjUxMzk5OTEgMTEuNDUyNDk5NywxMS4zNDYwMDA4IDExLjUyMTUsMTEuMTk2IEMxMS41OTA1MDAzLDExLjA0NTk5OTMgMTEuNjg2NDk5NCwxMC45MTcwMDA1IDExLjgwOTUsMTAuODA5IEMxMS45MzI1MDA2LDEwLjcwMDk5OTUgMTIuMDc2NDk5MiwxMC42MTg1MDAzIDEyLjI0MTUsMTAuNTYxNSBDMTIuNDA2NTAwOCwxMC41MDQ0OTk3IDEyLjU4MTk5OTEsMTAuNDc2IDEyLjc2OCwxMC40NzYgQzEyLjk0ODAwMDksMTAuNDc2IDEzLjExNzQ5OTIsMTAuNTA3NDk5NyAxMy4yNzY1LDEwLjU3MDUgQzEzLjQzNTUwMDgsMTAuNjMzNTAwMyAxMy41NzQ5OTk0LDEwLjcxODk5OTUgMTMuNjk1LDEwLjgyNyBDMTMuODE1MDAwNiwxMC45MzUwMDA1IDEzLjkwOTQ5OTcsMTEuMDYyNDk5MyAxMy45Nzg1LDExLjIwOTUgQzE0LjA0NzUwMDMsMTEuMzU2NTAwNyAxNC4wODIsMTEuNTE2OTk5MSAxNC4wODIsMTEuNjkxIEMxNC4wODIsMTEuODcxMDAwOSAxNC4wNTA1MDAzLDEyLjAzNTk5OTMgMTMuOTg3NSwxMi4xODYgQzEzLjkyNDQ5OTcsMTIuMzM2MDAwOCAxMy44MzQ1MDA2LDEyLjQ2NjQ5OTQgMTMuNzE3NSwxMi41Nzc1IEMxMy42MDA0OTk0LDEyLjY4ODUwMDYgMTMuNDYyNTAwOCwxMi43NzU0OTk3IDEzLjMwMzUsMTIuODM4NSBDMTMuMTQ0NDk5MiwxMi45MDE1MDAzIDEyLjk2OTAwMSwxMi45MzMgMTIuNzc3LDEyLjkzMyBDMTIuMzgwOTk4LDEyLjkzMyAxMi4wNTU1MDEzLDEyLjgyMzUwMTEgMTEuODAwNSwxMi42MDQ1IEMxMS41NDU0OTg3LDEyLjM4NTQ5ODkgMTEuNDE4LDEyLjA4NDAwMTkgMTEuNDE4LDExLjcgTDExLjQxOCwxMS43IFogTTE2LjQ0LDEwLjM1OSBDMTYuNDQsMTAuMjAyOTk5MiAxNi40NDE1LDEwLjAzMDUwMDkgMTYuNDQ0NSw5Ljg0MTUgQzE2LjQ0NzUsOS42NTI0OTkwNiAxNi40NjI0OTk5LDkuNDYzNTAwOTUgMTYuNDg5NSw5LjI3NDUgQzE2LjUxNjUwMDEsOS4wODU0OTkwNiAxNi41NTU0OTk3LDguOTAxMDAwOSAxNi42MDY1LDguNzIxIEMxNi42NTc1MDAzLDguNTQwOTk5MSAxNi43MzI0OTk1LDguMzgzNTAwNjggMTYuODMxNSw4LjI0ODUgQzE2LjkzMDUwMDUsOC4xMTM0OTkzMyAxNy4wNTQ5OTkzLDguMDA0MDAwNDIgMTcuMjA1LDcuOTIgQzE3LjM1NTAwMDgsNy44MzU5OTk1OCAxNy41Mzc5OTg5LDcuNzk0IDE3Ljc1NCw3Ljc5NCBDMTcuOTcwMDAxMSw3Ljc5NCAxOC4xNTI5OTkzLDcuODM1OTk5NTggMTguMzAzLDcuOTIgQzE4LjQ1MzAwMDgsOC4wMDQwMDA0MiAxOC41Nzc0OTk1LDguMTEzNDk5MzMgMTguNjc2NSw4LjI0ODUgQzE4Ljc3NTUwMDUsOC4zODM1MDA2OCAxOC44NTA0OTk3LDguNTQwOTk5MSAxOC45MDE1LDguNzIxIEMxOC45NTI1MDAzLDguOTAxMDAwOSAxOC45OTE0OTk5LDkuMDg1NDk5MDYgMTkuMDE4NSw5LjI3NDUgQzE5LjA0NTUwMDEsOS40NjM1MDA5NSAxOS4wNjA1LDkuNjUyNDk5MDYgMTkuMDYzNSw5Ljg0MTUgQzE5LjA2NjUsMTAuMDMwNTAwOSAxOS4wNjgsMTAuMjAyOTk5MiAxOS4wNjgsMTAuMzU5IEMxOS4wNjgsMTAuNTk5MDAxMiAxOS4wNjA1MDAxLDEwLjg2NzQ5ODUgMTkuMDQ1NSwxMS4xNjQ1IEMxOS4wMzA0OTk5LDExLjQ2MTUwMTUgMTguOTgyNTAwNCwxMS43NDA0OTg3IDE4LjkwMTUsMTIuMDAxNSBDMTguODIwNDk5NiwxMi4yNjI1MDEzIDE4LjY5MDAwMDksMTIuNDgyOTk5MSAxOC41MSwxMi42NjMgQzE4LjMyOTk5OTEsMTIuODQzMDAwOSAxOC4wNzgwMDE2LDEyLjkzMyAxNy43NTQsMTIuOTMzIEMxNy40Mjk5OTg0LDEyLjkzMyAxNy4xNzgwMDA5LDEyLjg0MzAwMDkgMTYuOTk4LDEyLjY2MyBDMTYuODE3OTk5MSwxMi40ODI5OTkxIDE2LjY4NzUwMDQsMTIuMjYyNTAxMyAxNi42MDY1LDEyLjAwMTUgQzE2LjUyNTQ5OTYsMTEuNzQwNDk4NyAxNi40Nzc1MDAxLDExLjQ2MTUwMTUgMTYuNDYyNSwxMS4xNjQ1IEMxNi40NDc0OTk5LDEwLjg2NzQ5ODUgMTYuNDQsMTAuNTk5MDAxMiAxNi40NCwxMC4zNTkgTDE2LjQ0LDEwLjM1OSBaIE0xNS42MywxMC4zNjggQzE1LjYzLDEwLjYwMjAwMTIgMTUuNjM1OTk5OSwxMC44NDQ5OTg3IDE1LjY0OCwxMS4wOTcgQzE1LjY2MDAwMDEsMTEuMzQ5MDAxMyAxNS42ODk5OTk4LDExLjU5NDk5ODggMTUuNzM4LDExLjgzNSBDMTUuNzg2MDAwMiwxMi4wNzUwMDEyIDE1Ljg1NDk5OTYsMTIuMzAxNDk4OSAxNS45NDUsMTIuNTE0NSBDMTYuMDM1MDAwNSwxMi43Mjc1MDExIDE2LjE1Nzk5OTIsMTIuOTE0OTk5MiAxNi4zMTQsMTMuMDc3IEMxNi40NzAwMDA4LDEzLjIzOTAwMDggMTYuNjY2NDk4OCwxMy4zNjY0OTk1IDE2LjkwMzUsMTMuNDU5NSBDMTcuMTQwNTAxMiwxMy41NTI1MDA1IDE3LjQyMzk5ODQsMTMuNTk5IDE3Ljc1NCwxMy41OTkgQzE4LjA5MDAwMTcsMTMuNTk5IDE4LjM3NDk5ODgsMTMuNTUyNTAwNSAxOC42MDksMTMuNDU5NSBDMTguODQzMDAxMiwxMy4zNjY0OTk1IDE5LjAzNzk5OTIsMTMuMjM5MDAwOCAxOS4xOTQsMTMuMDc3IEMxOS4zNTAwMDA4LDEyLjkxNDk5OTIgMTkuNDcyOTk5NiwxMi43Mjc1MDExIDE5LjU2MywxMi41MTQ1IEMxOS42NTMwMDA1LDEyLjMwMTQ5ODkgMTkuNzIxOTk5OCwxMi4wNzUwMDEyIDE5Ljc3LDExLjgzNSBDMTkuODE4MDAwMiwxMS41OTQ5OTg4IDE5Ljg0Nzk5OTksMTEuMzQ5MDAxMyAxOS44NiwxMS4wOTcgQzE5Ljg3MjAwMDEsMTAuODQ0OTk4NyAxOS44NzgsMTAuNjAyMDAxMiAxOS44NzgsMTAuMzY4IEMxOS44NzgsMTAuMTMzOTk4OCAxOS44NzIwMDAxLDkuODkxMDAxMjYgMTkuODYsOS42MzkgQzE5Ljg0Nzk5OTksOS4zODY5OTg3NCAxOS44MTgwMDAyLDkuMTQxMDAxMiAxOS43Nyw4LjkwMSBDMTkuNzIxOTk5OCw4LjY2MDk5ODggMTkuNjUzMDAwNSw4LjQzMzAwMTA4IDE5LjU2Myw4LjIxNyBDMTkuNDcyOTk5Niw4LjAwMDk5ODkyIDE5LjM1MDAwMDgsNy44MTIwMDA4MSAxOS4xOTQsNy42NSBDMTkuMDM3OTk5Miw3LjQ4Nzk5OTE5IDE4Ljg0MTUwMTIsNy4zNTkwMDA0OCAxOC42MDQ1LDcuMjYzIEMxOC4zNjc0OTg4LDcuMTY2OTk5NTIgMTguMDg0MDAxNyw3LjExOSAxNy43NTQsNy4xMTkgQzE3LjQyMzk5ODQsNy4xMTkgMTcuMTQwNTAxMiw3LjE2Njk5OTUyIDE2LjkwMzUsNy4yNjMgQzE2LjY2NjQ5ODgsNy4zNTkwMDA0OCAxNi40NzAwMDA4LDcuNDg3OTk5MTkgMTYuMzE0LDcuNjUgQzE2LjE1Nzk5OTIsNy44MTIwMDA4MSAxNi4wMzUwMDA1LDguMDAwOTk4OTIgMTUuOTQ1LDguMjE3IEMxNS44NTQ5OTk2LDguNDMzMDAxMDggMTUuNzg2MDAwMiw4LjY2MDk5ODggMTUuNzM4LDguOTAxIEMxNS42ODk5OTk4LDkuMTQxMDAxMiAxNS42NjAwMDAxLDkuMzg2OTk4NzQgMTUuNjQ4LDkuNjM5IEMxNS42MzU5OTk5LDkuODkxMDAxMjYgMTUuNjMsMTAuMTMzOTk4OCAxNS42MywxMC4zNjggTDE1LjYzLDEwLjM2OCBaJyBpZD0nMjgwJyBzdHJva2U9J25vbmUnIGZpbGw9JyNGRkZGRkYnIGZpbGwtcnVsZT0nZXZlbm9kZCcgbWFzaz0ndXJsKCNtYXNrLTkpJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdG5ld3NfYXBwOlwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdDxzdmcgd2lkdGg9JzYwcHgnIGhlaWdodD0nNjBweCcgdmlld0JveD0nMCAwIDYwIDYwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8dGl0bGU+TmV3czwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtMSc+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyNGQzUzNjMnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0ZDMzM1OScgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgICAgICA8cGF0aCBkPSdNMTAuMTM2NjI0LDQ3LjM4MjM4NTMgQzExLDQ3LjM4MjM4NTMgMTEsNDYuNSAxMSw0Ni41IEwxMSwxMi4wMDUyNjE3IEMxMSwxMS40NTAwNzEgMTEuNDUzMjMwMywxMSAxMS45OTY4NzU0LDExIEw0OC4wMDMxMjQ2LDExIEM0OC41NTM2ODM3LDExIDQ5LDExLjQ0MTMwMzIgNDksMTIuMDA4ODQ5OCBMNDksNDYuOTkxMTUwMiBDNDksNDcuNTQ4MzIyNiA0OC41NDM5MjUsNDguMDAyOTAzNCA0Ny45OTY0MDc2LDQ4LjAwNjI3ODIgQzQ3Ljk5NjQwNzYsNDguMDA2Mjc4MiAxOC42MDg0ODMxLDQ4LjE5OTc1NDQgMTEuMDAwMDAwMSw0OCBDMTAuMTE3NDExMyw0Ny45NzY4Mjg0IDkuNDE2NjI1OTgsNDcuNjY4NDU3IDkuMDU3NTU2MTUsNDcuMzgyMzg1MyBDOC42OTg0ODYzMyw0Ny4wOTYzMTM1IDguMzYzMDk4MTUsNDYuNzExNjQ2MiA4LjM2MzA5ODE0LDQ2LjY2MDcwNTYgQzguMzYzMDk4MTQsNDYuNDU3NDcyIDkuMjczMjQ3OTYsNDcuMzgyMzg1MyAxMC4xMzY2MjQsNDcuMzgyMzg1MyBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNCc+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nLTEnIGR5PScwJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxJyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjI1IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLVNFJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjQ0LjAwMDAwMCwgLTExNS4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J05ld3MnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI0NC4wMDAwMDAsIDg4LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdCRycgZmlsbD0ndXJsKCNsaW5lYXJHcmFkaWVudC0xKScgeD0nMCcgeT0nMCcgd2lkdGg9JzYwJyBoZWlnaHQ9JzYwJyByeD0nMTQnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNOCw0NS45MTY1MjYyIEw4LDE2Ljk5NTM3NjQgQzgsMTYuNDQ1NjQ1MiA4LjQ1NTI2Mjg4LDE2IDguOTk1NDU3MDMsMTYgTDMyLjAwNDU0MywxNiBDMzIuNTU0MzE4NywxNiAzMywxNi40NTIzNjIxIDMzLDE2Ljk5Mjc4NjQgTDMzLDQ3LjAwNzIxMzYgQzMzLDQ3LjU1NTUxNDQgMzIuNTQ0NzM3MSw0OCAzMi4wMDQ1NDMsNDggTDEwLjk5MDc1MjIsNDggQzkuMzM5MDA1MzgsNDggOCw0Ni42NTY5NDc1IDgsNDUuOTE2NTI2MiBMOCw0NS45MTY1MjYyIFonIGlkPSdGb2xkJyBmaWxsPScjRkZGRkZGJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgZmlsbD0nd2hpdGUnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvbWFzaz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nTWFzayc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci00KScgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nI0ZGRkZGRicgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmVzJyBmaWxsPScjQkRCREJEJyBtYXNrPSd1cmwoI21hc2stMyknIHg9JzE3JyB5PSczNScgd2lkdGg9JzMzJyBoZWlnaHQ9JzInIHJ4PScxJz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmVzJyBmaWxsPScjQkRCREJEJyBtYXNrPSd1cmwoI21hc2stMyknIHg9JzE3JyB5PSczOScgd2lkdGg9JzMzJyBoZWlnaHQ9JzInIHJ4PScxJz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmVzJyBmaWxsPScjQkRCREJEJyBtYXNrPSd1cmwoI21hc2stMyknIHg9JzE3JyB5PSc0Mycgd2lkdGg9JzMzJyBoZWlnaHQ9JzInIHJ4PScxJz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTE2LDIwLjEyMTMyMDMgTDE2LDE2Ljk5NzY1NjcgQzE2LDE2LjQ0NjY2NjEgMTYuNDQxMDUzNSwxNiAxNi45OTc2NTY3LDE2IEwyMC4xMjEzMjAzLDE2IEwyMCwxNi4xMjEzMjAzIEwzMSwyNy4xMjEzMjAzIEwzMSwzMC4wMDExNDM2IEMzMSwzMC41NTI3OTY4IDMwLjU1NTA2NjEsMzEgMzAuMDAxMTQzNiwzMSBMMjcuMTIxMzIwMywzMSBMMTYuMTIxMzIwMywyMCBMMTYsMjAuMTIxMzIwMyBMMTYsMjAuMTIxMzIwMyBaIE0xNiwyOS45OTk3ODA5IEMxNiwzMC41NTIxODY3IDE2LjQ1MTMyOTQsMzEgMTcuMDAwMjE5MSwzMSBMMjEuODc4NDYwNiwzMSBDMjIuNDMwODY2MywzMSAyMi41NjUyNDI3LDMwLjY4NjU2MzEgMjIuMTY4NDQ4NCwzMC4yODk3Njg4IEwxNi43MTAyMzEyLDI0LjgzMTU1MTYgQzE2LjMxNzk4MTQsMjQuNDM5MzAxNyAxNiwyNC41NzI2NDk3IDE2LDI1LjEyMTUzOTQgTDE2LDI5Ljk5OTc4MDkgWiBNMjkuOTk5NzgwOSwxNiBDMzAuNTUyMTg2NywxNiAzMSwxNi40NTEzMjk0IDMxLDE3LjAwMDIxOTEgTDMxLDIxLjg3ODQ2MDYgQzMxLDIyLjQzMDg2NjMgMzAuNjg3Mzg1NSwyMi41NjYwNjUyIDMwLjI5NTY5ODksMjIuMTc0Mzc4NSBMMjkuNTkxMzk3NywyMS40NzAwNzc0IEwyNC44MjUyMzksMTYuNzAzOTE4NiBDMjQuNDM2NDc1NCwxNi4zMTUxNTUxIDI0LjU3MjY0OTcsMTYgMjUuMTIxNTM5NCwxNiBMMjkuOTk5NzgwOSwxNiBaJyBpZD0nTG9nbycgZmlsbD0nI0ZENEM2MScgbWFzaz0ndXJsKCNtYXNrLTMpJz48L3BhdGg+XG5cdCAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICA8L2c+XG5cdCAgICA8L2c+XG5cdDwvc3ZnPlwiXG5cdHdhbGxldF9hcHA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nNjBweCcgaGVpZ2h0PSc2MHB4JyB2aWV3Qm94PScwIDAgNjAgNjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5XYWxsZXQ8L3RpdGxlPlxuXHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdCAgICA8ZGVmcz5cblx0ICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9JzUwJScgeTE9JzAlJyB4Mj0nNTAlJyB5Mj0nMTAwJScgaWQ9J2xpbmVhckdyYWRpZW50LTEnPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjMUUxRTFGJyBvZmZzZXQ9JzAlJz48L3N0b3A+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyMxRTFFMUYnIG9mZnNldD0nMTAwJSc+PC9zdG9wPlxuXHQgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG5cdCAgICAgICAgPHJlY3QgaWQ9J3BhdGgtMicgeD0nOScgeT0nMTUnIHdpZHRoPSc0MicgaGVpZ2h0PScxMycgcng9JzInPjwvcmVjdD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0zJz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjEgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxyZWN0IGlkPSdwYXRoLTQnIHg9JzknIHk9JzE4JyB3aWR0aD0nNDInIGhlaWdodD0nMTMnIHJ4PScyJz48L3JlY3Q+XG5cdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItNSc+XG5cdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzAnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzAuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4xIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8cmVjdCBpZD0ncGF0aC02JyB4PSc5JyB5PScyMScgd2lkdGg9JzQyJyBoZWlnaHQ9JzEzJyByeD0nMic+PC9yZWN0PlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTcnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScwJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScwLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICAgICAgPHJlY3QgaWQ9J3BhdGgtOCcgeD0nOScgeT0nMjUnIHdpZHRoPSc0MicgaGVpZ2h0PScxMycgcng9JzInPjwvcmVjdD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci05Jz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMCcgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMC41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjEgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHQgICAgICAgIDwvZmlsdGVyPlxuXHQgICAgICAgIDxwYXRoIGQ9J003LDI4IEw3LDQyIEw1Myw0MiBMNTMsMjggTDM4LjkwNjUwNzMsMjggQzM3Ljc5ODMzMzksMjggMzYuMzA1NzU1OCwyOC42NzIyMjI5IDM1LjU1MDEyMzcsMjkuNDc4NDg4MiBDMzUuNTUwMTIzNywyOS40Nzg0ODgyIDMyLjQxODk1NzksMzMuMzA3NjkyMyAzMCwzMy4zMDc2OTIzIEMyNy41ODEwNDIxLDMzLjMwNzY5MjMgMjQuNDQ5ODc2MywyOS40Nzg0ODgyIDI0LjQ0OTg3NjMsMjkuNDc4NDg4MiBDMjMuNzA0MzcwMiwyOC42NjE5NDE3IDIyLjIxMTQ3ODEsMjggMjEuMDkzNDkyNywyOCBMNywyOCBaJyBpZD0ncGF0aC0xMCc+PC9wYXRoPlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTExJz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nLTEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICA8L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE2LjAwMDAwMCwgLTIwMy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J1dhbGxldCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTYuMDAwMDAwLCAxNzYuMDAwMDAwKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J0JHJyBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTEpJyB4PScwJyB5PScwJyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHJ4PScxNCc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSd3YWxsZXQnIGZpbGw9JyNEOUQ2Q0MnIHg9JzcnIHk9JzEyJyB3aWR0aD0nNDYnIGhlaWdodD0nMzQnIHJ4PSc0Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J2NhcmRzJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTMpJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjM0I5OUM5JyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nY2FyZHMnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItNSknIHhsaW5rOmhyZWY9JyNwYXRoLTQnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9JyNGRkIwMDMnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtNCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdjYXJkcyc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci03KScgeGxpbms6aHJlZj0nI3BhdGgtNic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nIzUwQkUzRCcgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC02Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J2NhcmRzJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScxJyBmaWx0ZXI9J3VybCgjZmlsdGVyLTkpJyB4bGluazpocmVmPScjcGF0aC04Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPScjRjE2QzVFJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTgnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nQ29tYmluZWQtU2hhcGUnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItMTEpJyB4bGluazpocmVmPScjcGF0aC0xMCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nI0Q5RDZDQycgZmlsbC1ydWxlPSdldmVub2RkJyB4bGluazpocmVmPScjcGF0aC0xMCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxuXHRub3Rlc19hcHA6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0PHN2ZyB3aWR0aD0nNjBweCcgaGVpZ2h0PSc2MHB4JyB2aWV3Qm94PScwIDAgNjAgNjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDx0aXRsZT5Ob3RlczwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtMSc+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyNGOEY4RjgnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nI0VERURFRCcgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgICAgICA8cGF0aCBkPSdNMzkuMDgxNSwwIEM0NS4xMDUsMCA0OC4xMTYsMCA1MS4zNTg1LDEuMDI1IEM1NC44OTg1LDIuMzEzNSA1Ny42ODY1LDUuMTAxNSA1OC45NzUsOC42NDE1IEM2MCwxMS44ODM1IDYwLDE0Ljg5NTUgNjAsMjAuOTE4NSBMNjAsMzkuMDgxNSBDNjAsNDUuMTA1IDYwLDQ4LjExNiA1OC45NzUsNTEuMzU4NSBDNTcuNjg2NSw1NC44OTg1IDU0Ljg5ODUsNTcuNjg2NSA1MS4zNTg1LDU4Ljk3NDUgQzQ4LjExNiw2MCA0NS4xMDUsNjAgMzkuMDgxNSw2MCBMMjAuOTE4NSw2MCBDMTQuODk1LDYwIDExLjg4MzUsNjAgOC42NDE1LDU4Ljk3NDUgQzUuMTAxNSw1Ny42ODY1IDIuMzEzNSw1NC44OTg1IDEuMDI1LDUxLjM1ODUgQzAsNDguMTE2IDAsNDUuMTA1IDAsMzkuMDgxNSBMMCwyMC45MTg1IEMwLDE0Ljg5NTUgMCwxMS44ODM1IDEuMDI1LDguNjQxNSBDMi4zMTM1LDUuMTAxNSA1LjEwMTUsMi4zMTM1IDguNjQxNSwxLjAyNSBDMTEuODgzNSwwIDE0Ljg5NSwwIDIwLjkxODUsMCBMMzkuMDgxNSwwIFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0ICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9JzUwJScgeTE9JzAlJyB4Mj0nNTAlJyB5Mj0nMTAwJScgaWQ9J2xpbmVhckdyYWRpZW50LTQnPlxuXHQgICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPScjRkZERjYzJyBvZmZzZXQ9JzAlJz48L3N0b3A+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyNGRkNEMDInIG9mZnNldD0nMTAwJSc+PC9zdG9wPlxuXHQgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG5cdCAgICAgICAgPHJlY3QgaWQ9J3BhdGgtNScgeD0nMCcgeT0nLTEnIHdpZHRoPSc2MCcgaGVpZ2h0PScyMCc+PC9yZWN0PlxuXHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTYnPlxuXHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScwLjUnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzAuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4zIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci03Jz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nLTAuNScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldElubmVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSdzaGFkb3dPZmZzZXRJbm5lcjEnIGluMj0nU291cmNlQWxwaGEnIG9wZXJhdG9yPSdhcml0aG1ldGljJyBrMj0nLTEnIGszPScxJyByZXN1bHQ9J3NoYWRvd0lubmVySW5uZXIxJz48L2ZlQ29tcG9zaXRlPlxuXHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4yIDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0lubmVySW5uZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdCAgICAgICAgPC9maWx0ZXI+XG5cdCAgICA8L2RlZnM+XG5cdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0ICAgICAgICA8ZyBpZD0nSG9tZS1TY3JlZW4t4oCiLWlQaG9uZS1TRScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTkyLjAwMDAwMCwgLTIwMy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J05vdGVzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg5Mi4wMDAwMDAsIDE3Ni4wMDAwMDApJz5cblx0ICAgICAgICAgICAgICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgICAgICAgICAgICAgIDx1c2UgaWQ9J0JHJyBmaWxsPSd1cmwoI2xpbmVhckdyYWRpZW50LTEpJyB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0naGVhZGVyJyBtYXNrPSd1cmwoI21hc2stMyknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItNiknIHhsaW5rOmhyZWY9JyNwYXRoLTUnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtNCknIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtNSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0nYmxhY2snIGZpbGwtb3BhY2l0eT0nMScgZmlsdGVyPSd1cmwoI2ZpbHRlci03KScgeGxpbms6aHJlZj0nI3BhdGgtNSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSdsaW5lJyBmaWxsPScjQjdCN0I3JyBtYXNrPSd1cmwoI21hc2stMyknIHBvaW50cz0nNTkuNzUgMzAuNSA2MCAzMC41IDYwIDMwIDU5Ljc1IDMwIC0wLjI1IDMwIC0wLjUgMzAgLTAuNSAzMC41IC0wLjI1IDMwLjUnPjwvcG9seWdvbj5cblx0ICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0nbGluZScgZmlsbD0nI0I3QjdCNycgbWFzaz0ndXJsKCNtYXNrLTMpJyBwb2ludHM9JzU5Ljc1IDQxLjUgNjAgNDEuNSA2MCA0MSA1OS43NSA0MSAtMC4yNSA0MSAtMC41IDQxIC0wLjUgNDEuNSAtMC4yNSA0MS41Jz48L3BvbHlnb24+XG5cdCAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9J2xpbmUnIGZpbGw9JyNCN0I3QjcnIG1hc2s9J3VybCgjbWFzay0zKScgcG9pbnRzPSc1OS43NSA1MyA2MCA1MyA2MCA1Mi41IDU5Ljc1IDUyLjUgLTAuMjUgNTIuNSAtMC41IDUyLjUgLTAuNSA1MyAtMC4yNSA1Myc+PC9wb2x5Z29uPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J001OC41LDIyIEw1OS41LDIyIEw1OS41LDIzIEw1OC41LDIzIEw1OC41LDIyIEw1OC41LDIyIFogTTU2LjUsMjIgTDU3LjUsMjIgTDU3LjUsMjMgTDU2LjUsMjMgTDU2LjUsMjIgTDU2LjUsMjIgWiBNNTQuNSwyMiBMNTUuNSwyMiBMNTUuNSwyMyBMNTQuNSwyMyBMNTQuNSwyMiBMNTQuNSwyMiBaIE01Mi41LDIyIEw1My41LDIyIEw1My41LDIzIEw1Mi41LDIzIEw1Mi41LDIyIEw1Mi41LDIyIFogTTUwLjUsMjIgTDUxLjUsMjIgTDUxLjUsMjMgTDUwLjUsMjMgTDUwLjUsMjIgTDUwLjUsMjIgWiBNNDguNSwyMiBMNDkuNSwyMiBMNDkuNSwyMyBMNDguNSwyMyBMNDguNSwyMiBMNDguNSwyMiBaIE00Ni41LDIyIEw0Ny41LDIyIEw0Ny41LDIzIEw0Ni41LDIzIEw0Ni41LDIyIEw0Ni41LDIyIFogTTQ0LjUsMjIgTDQ1LjUsMjIgTDQ1LjUsMjMgTDQ0LjUsMjMgTDQ0LjUsMjIgTDQ0LjUsMjIgWiBNNDIuNSwyMiBMNDMuNSwyMiBMNDMuNSwyMyBMNDIuNSwyMyBMNDIuNSwyMiBMNDIuNSwyMiBaIE00MC41LDIyIEw0MS41LDIyIEw0MS41LDIzIEw0MC41LDIzIEw0MC41LDIyIEw0MC41LDIyIFogTTM4LjUsMjIgTDM5LjUsMjIgTDM5LjUsMjMgTDM4LjUsMjMgTDM4LjUsMjIgTDM4LjUsMjIgWiBNMzYuNSwyMiBMMzcuNSwyMiBMMzcuNSwyMyBMMzYuNSwyMyBMMzYuNSwyMiBMMzYuNSwyMiBaIE0zNC41LDIyIEwzNS41LDIyIEwzNS41LDIzIEwzNC41LDIzIEwzNC41LDIyIEwzNC41LDIyIFogTTMyLjUsMjIgTDMzLjUsMjIgTDMzLjUsMjMgTDMyLjUsMjMgTDMyLjUsMjIgTDMyLjUsMjIgWiBNMzAuNSwyMiBMMzEuNSwyMiBMMzEuNSwyMyBMMzAuNSwyMyBMMzAuNSwyMiBMMzAuNSwyMiBaIE0yOC41LDIyIEwyOS41LDIyIEwyOS41LDIzIEwyOC41LDIzIEwyOC41LDIyIEwyOC41LDIyIFogTTI2LjUsMjIgTDI3LjUsMjIgTDI3LjUsMjMgTDI2LjUsMjMgTDI2LjUsMjIgTDI2LjUsMjIgWiBNMjQuNSwyMiBMMjUuNSwyMiBMMjUuNSwyMyBMMjQuNSwyMyBMMjQuNSwyMiBMMjQuNSwyMiBaIE0yMi41LDIyIEwyMy41LDIyIEwyMy41LDIzIEwyMi41LDIzIEwyMi41LDIyIEwyMi41LDIyIFogTTIwLjUsMjIgTDIxLjUsMjIgTDIxLjUsMjMgTDIwLjUsMjMgTDIwLjUsMjIgTDIwLjUsMjIgWiBNMTguNSwyMiBMMTkuNSwyMiBMMTkuNSwyMyBMMTguNSwyMyBMMTguNSwyMiBMMTguNSwyMiBaIE0xNi41LDIyIEwxNy41LDIyIEwxNy41LDIzIEwxNi41LDIzIEwxNi41LDIyIEwxNi41LDIyIFogTTE0LjUsMjIgTDE1LjUsMjIgTDE1LjUsMjMgTDE0LjUsMjMgTDE0LjUsMjIgTDE0LjUsMjIgWiBNMTIuNSwyMiBMMTMuNSwyMiBMMTMuNSwyMyBMMTIuNSwyMyBMMTIuNSwyMiBMMTIuNSwyMiBaIE0xMC41LDIyIEwxMS41LDIyIEwxMS41LDIzIEwxMC41LDIzIEwxMC41LDIyIEwxMC41LDIyIFogTTguNSwyMiBMOS41LDIyIEw5LjUsMjMgTDguNSwyMyBMOC41LDIyIEw4LjUsMjIgWiBNNi41LDIyIEw3LjUsMjIgTDcuNSwyMyBMNi41LDIzIEw2LjUsMjIgTDYuNSwyMiBaIE00LjUsMjIgTDUuNSwyMiBMNS41LDIzIEw0LjUsMjMgTDQuNSwyMiBMNC41LDIyIFogTTIuNSwyMiBMMy41LDIyIEwzLjUsMjMgTDIuNSwyMyBMMi41LDIyIEwyLjUsMjIgWiBNMC41LDIyIEwxLjUsMjIgTDEuNSwyMyBMMC41LDIzIEwwLjUsMjIgTDAuNSwyMiBaJyBpZD0nUmVjdGFuZ2xlLTM3JyBmaWxsPScjQUFBQUFBJyBtYXNrPSd1cmwoI21hc2stMyknPjwvcGF0aD5cblx0ICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0cmVtaW5kZXJzX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPm1pbjwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxyZWN0IGlkPSdwYXRoLTEnIHg9JzAnIHk9JzAnIHdpZHRoPSc2MCcgaGVpZ2h0PSc2MCcgcng9JzE0Jz48L3JlY3Q+XG5cdCAgICAgICAgPGNpcmNsZSBpZD0ncGF0aC0zJyBjeD0nMTAnIGN5PScxMicgcj0nNCc+PC9jaXJjbGU+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stNCcgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0zJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stNScgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9Jy0wLjUnIHk9Jy0wLjUnIHdpZHRoPSc5JyBoZWlnaHQ9JzknPlxuXHQgICAgICAgICAgICA8cmVjdCB4PSc1LjUnIHk9JzcuNScgd2lkdGg9JzknIGhlaWdodD0nOScgZmlsbD0nd2hpdGUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0zJyBmaWxsPSdibGFjayc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxjaXJjbGUgaWQ9J3BhdGgtNicgY3g9JzEwJyBjeT0nMjMnIHI9JzQnPjwvY2lyY2xlPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTcnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtNic+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTgnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PSctMC41JyB5PSctMC41JyB3aWR0aD0nOScgaGVpZ2h0PSc5Jz5cblx0ICAgICAgICAgICAgPHJlY3QgeD0nNS41JyB5PScxOC41JyB3aWR0aD0nOScgaGVpZ2h0PSc5JyBmaWxsPSd3aGl0ZSc+PC9yZWN0PlxuXHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTYnIGZpbGw9J2JsYWNrJz48L3VzZT5cblx0ICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgPGNpcmNsZSBpZD0ncGF0aC05JyBjeD0nMTAnIGN5PSczNScgcj0nNCc+PC9jaXJjbGU+XG5cdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMTAnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSd3aGl0ZSc+XG5cdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtOSc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTExJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nLTAuNScgeT0nLTAuNScgd2lkdGg9JzknIGhlaWdodD0nOSc+XG5cdCAgICAgICAgICAgIDxyZWN0IHg9JzUuNScgeT0nMzAuNScgd2lkdGg9JzknIGhlaWdodD0nOScgZmlsbD0nd2hpdGUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC05JyBmaWxsPSdibGFjayc+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxjaXJjbGUgaWQ9J3BhdGgtMTInIGN4PScxMCcgY3k9JzQ2JyByPSc0Jz48L2NpcmNsZT5cblx0ICAgICAgICA8bWFzayBpZD0nbWFzay0xMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0xMic+PC91c2U+XG5cdCAgICAgICAgPC9tYXNrPlxuXHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTE0JyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nLTAuNScgeT0nLTAuNScgd2lkdGg9JzknIGhlaWdodD0nOSc+XG5cdCAgICAgICAgICAgIDxyZWN0IHg9JzUuNScgeT0nNDEuNScgd2lkdGg9JzknIGhlaWdodD0nOScgZmlsbD0nd2hpdGUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0xMicgZmlsbD0nYmxhY2snPjwvdXNlPlxuXHQgICAgICAgIDwvbWFzaz5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLVNFJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTY4LjAwMDAwMCwgLTIwMy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J21pbicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTY4LjAwMDAwMCwgMTc2LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSdtYXNrLTInIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgICAgICAgICAgICAgPHVzZSBpZD0nQkcnIGZpbGw9JyNGRkZGRkYnIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdjaXJjbGUnIG1hc2s9J3VybCgjbWFzay0yKSc+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjRkZGRkZGJyBtYXNrPSd1cmwoI21hc2stNCknIGZpbGw9JyNGRjk1MDAnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtMyc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjRkY5NTAwJyBtYXNrPSd1cmwoI21hc2stNSknIHhsaW5rOmhyZWY9JyNwYXRoLTMnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8ZyBpZD0nY2lyY2xlJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0nI0ZGRkZGRicgbWFzaz0ndXJsKCNtYXNrLTcpJyBmaWxsPScjMUJBREY4JyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHhsaW5rOmhyZWY9JyNwYXRoLTYnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0nIzFCQURGOCcgbWFzaz0ndXJsKCNtYXNrLTgpJyB4bGluazpocmVmPScjcGF0aC02Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J2NpcmNsZScgbWFzaz0ndXJsKCNtYXNrLTIpJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9JyNGRkZGRkYnIG1hc2s9J3VybCgjbWFzay0xMCknIGZpbGw9JyM2M0RBMzgnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtOSc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDx1c2Ugc3Ryb2tlPScjNjNEQTM4JyBtYXNrPSd1cmwoI21hc2stMTEpJyB4bGluazpocmVmPScjcGF0aC05Jz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J2NpcmNsZScgbWFzaz0ndXJsKCNtYXNrLTIpJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBzdHJva2U9JyNGRkZGRkYnIG1hc2s9J3VybCgjbWFzay0xMyknIGZpbGw9JyNDQzczRTEnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtMTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHN0cm9rZT0nI0NDNzNFMScgbWFzaz0ndXJsKCNtYXNrLTE0KScgeGxpbms6aHJlZj0nI3BhdGgtMTInPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0nbGluZScgZmlsbD0nI0FFQUVBRScgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PScxOScgeT0nMTcuNScgd2lkdGg9JzQxJyBoZWlnaHQ9JzAuNSc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSdsaW5lJyBmaWxsPScjQUVBRUFFJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzE5JyB5PSc2JyB3aWR0aD0nNDEnIGhlaWdodD0nMC41Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmUnIGZpbGw9JyNBRUFFQUUnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMTknIHk9JzI5JyB3aWR0aD0nNDEnIGhlaWdodD0nMC41Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmUnIGZpbGw9JyNBRUFFQUUnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMTknIHk9JzQwJyB3aWR0aD0nNDEnIGhlaWdodD0nMC41Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9J2xpbmUnIGZpbGw9JyNBRUFFQUUnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nMTknIHk9JzUxLjUnIHdpZHRoPSc0MScgaGVpZ2h0PScwLjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgIDwvZz5cblx0ICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgIDwvZz5cblx0ICAgIDwvZz5cblx0PC9zdmc+XCJcblx0c3RvY2tzX2FwcDpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHQ8c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHZpZXdCb3g9JzAgMCA2MCA2MCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkuMSAoMzE3MjApIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHQgICAgPHRpdGxlPlN0b2NrczwvdGl0bGU+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPlxuXHQgICAgICAgIDxwYXRoIGQ9J00zOS4wODE1LDAgQzQ1LjEwNSwwIDQ4LjExNiwwIDUxLjM1ODUsMS4wMjUgQzU0Ljg5ODUsMi4zMTM1IDU3LjY4NjUsNS4xMDE1IDU4Ljk3NSw4LjY0MTUgQzYwLDExLjg4MzUgNjAsMTQuODk1NSA2MCwyMC45MTg1IEw2MCwzOS4wODE1IEM2MCw0NS4xMDUgNjAsNDguMTE2IDU4Ljk3NSw1MS4zNTg1IEM1Ny42ODY1LDU0Ljg5ODUgNTQuODk4NSw1Ny42ODY1IDUxLjM1ODUsNTguOTc0NSBDNDguMTE2LDYwIDQ1LjEwNSw2MCAzOS4wODE1LDYwIEwyMC45MTg1LDYwIEMxNC44OTUsNjAgMTEuODgzNSw2MCA4LjY0MTUsNTguOTc0NSBDNS4xMDE1LDU3LjY4NjUgMi4zMTM1LDU0Ljg5ODUgMS4wMjUsNTEuMzU4NSBDMCw0OC4xMTYgMCw0NS4xMDUgMCwzOS4wODE1IEwwLDIwLjkxODUgQzAsMTQuODk1NSAwLDExLjg4MzUgMS4wMjUsOC42NDE1IEMyLjMxMzUsNS4xMDE1IDUuMTAxNSwyLjMxMzUgOC42NDE1LDEuMDI1IEMxMS44ODM1LDAgMTQuODk1LDAgMjAuOTE4NSwwIEwzOS4wODE1LDAgWicgaWQ9J3BhdGgtMSc+PC9wYXRoPlxuXHQgICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0nNTAlJyB5MT0nMCUnIHgyPSc1MCUnIHkyPScxMDAlJyBpZD0nbGluZWFyR3JhZGllbnQtMyc+XG5cdCAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9JyM0NTQ1NDUnIG9mZnNldD0nMCUnPjwvc3RvcD5cblx0ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0nIzExMTExMicgb2Zmc2V0PScxMDAlJz48L3N0b3A+XG5cdCAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblx0ICAgICAgICA8cGF0aCBkPSdNNDEuNSwxNi4wMTEyMTA4IEw0MS41LC0xLjUgTDQxLC0xLjUgTDQxLDE2LjAxMTIxMDggQzQxLjA4MjM0MDUsMTYuMDAzNzkwNyA0MS4xNjU3Mjc2LDE2IDQxLjI1LDE2IEM0MS4zMzQyNzI0LDE2IDQxLjQxNzY1OTUsMTYuMDAzNzkwNyA0MS41LDE2LjAxMTIxMDggWiBNNDEuNSwyMS40ODg3ODkyIEw0MS41LDYzIEw0MSw2MyBMNDEsMjEuNDg4Nzg5MiBDNDEuMDgyMzQwNSwyMS40OTYyMDkzIDQxLjE2NTcyNzYsMjEuNSA0MS4yNSwyMS41IEM0MS4zMzQyNzI0LDIxLjUgNDEuNDE3NjU5NSwyMS40OTYyMDkzIDQxLjUsMjEuNDg4Nzg5MiBaIE00MS4yNSwyMSBDNDIuNDkyNjQwNywyMSA0My41LDE5Ljk5MjY0MDcgNDMuNSwxOC43NSBDNDMuNSwxNy41MDczNTkzIDQyLjQ5MjY0MDcsMTYuNSA0MS4yNSwxNi41IEM0MC4wMDczNTkzLDE2LjUgMzksMTcuNTA3MzU5MyAzOSwxOC43NSBDMzksMTkuOTkyNjQwNyA0MC4wMDczNTkzLDIxIDQxLjI1LDIxIFonIGlkPSdwYXRoLTQnPjwvcGF0aD5cblx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci01Jz5cblx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNSAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0ICAgICAgICA8L2ZpbHRlcj5cblx0ICAgIDwvZGVmcz5cblx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHQgICAgICAgIDxnIGlkPSdIb21lLVNjcmVlbi3igKItaVBob25lLVNFJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjQ0LjAwMDAwMCwgLTIwMy4wMDAwMDApJz5cblx0ICAgICAgICAgICAgPGcgaWQ9J0hvbWUtU2NyZWVuLeKAoi1pUGhvbmUtNnMtQ29weScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDI3LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgPGcgaWQ9J1N0b2NrcycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjQ0LjAwMDAwMCwgMTc2LjAwMDAwMCknPlxuXHQgICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSdtYXNrLTInIGZpbGw9J3doaXRlJz5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0ICAgICAgICAgICAgICAgICAgICA8L21hc2s+XG5cdCAgICAgICAgICAgICAgICAgICAgPHVzZSBpZD0nQkcnIGZpbGw9JyMxNDE0MTYnIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00tMC40ODQ4NjMyODEsMzQuMDUzNzEwOSBDLTAuNDg0ODYzMjgxLDM0LjA1MzcxMDkgMS4yNzIzOTIxMSwzNC4wNjQ0Njg2IDMuMTE5Mzg0NzcsMzQuNjMyMDgwMSBDNC43MDc5NDQ5NSwzNS4xMjAyNzEgNi4zMDA5ODE3NiwzNi4yNTIzNzg2IDcuMjMzODg2NzIsMzYuMTk0NTgwMSBDOS4yNTE0NjQ4NCwzNi4wNjk1ODAxIDExLjMzNDQ3MjcsMzUuMzc1OTc2NiAxMS4zMzQ0NzI3LDM1LjM3NTk3NjYgTDE1LjEyMDg0OTYsMzAuNDQ1MDY4NCBMMTguNzI3NTM5MSwzMy41MjYzNjcyIEwyMi40OTQxNDA2LDI0LjYyNDUxMTcgTDI2LjExOTYyODksMzQuMzM2OTE0MSBMMzAuMjUsMzYuODY1OTY2OCBMMzMuOTQ2Nzc3MywzMC4yMDg0OTYxIEwzNy41Mzg1NzQyLDI5LjI3NjEyMyBMNDEuNDMxNjQwNiwxOC4xMzIzMjQyIEw0NS4xNDc0NjA5LDI3LjIwMzM2OTEgTDQ4Ljk0Mzg0NzcsMjQuNjY1NTI3MyBMNTIuNzczNDM3NSwzMS45OTM2NTIzIEw1Ni4zNDIyODUyLDIzLjgxNzM4MjggTDYwLjM0NTcwMzEsMTkuNjU2MjUgTDYwLjM0NTcwMzEsNjAuNDc5MTE2NiBMLTAuMzA0OTg5MzI1LDYwLjQ3OTExNjYgTC0wLjQ4NDg2MzI4MSwzNC4wNTM3MTA5IFonIGlkPSdncmFwaCcgc3Ryb2tlPScjRkZGRkZGJyBzdHJva2Utd2lkdGg9JzAuNzUnIGZpbGw9J3VybCgjbGluZWFyR3JhZGllbnQtMyknIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdtYXJrJyBtYXNrPSd1cmwoI21hc2stMiknPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9J2JsYWNrJyBmaWxsLW9wYWNpdHk9JzEnIGZpbHRlcj0ndXJsKCNmaWx0ZXItNSknIHhsaW5rOmhyZWY9JyNwYXRoLTQnPjwvdXNlPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9JyMwMUE2RjEnIGZpbGwtcnVsZT0nZXZlbm9kZCcgeGxpbms6aHJlZj0nI3BhdGgtNCc+PC91c2U+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgICAgIDxnIGlkPSdTcGFyay1saW5lJyBtYXNrPSd1cmwoI21hc2stMiknIGZpbGw9JyM3Nzc3NzgnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg3LjAwMDAwMCwgLTEuNTAwMDAwKScgaWQ9J21hcmsnPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgeD0nMCcgeT0nMCcgd2lkdGg9JzAuNScgaGVpZ2h0PSc2NC41Jz48L3JlY3Q+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB4PScxMS41JyB5PScwJyB3aWR0aD0nMC41JyBoZWlnaHQ9JzY0LjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9JzIzJyB5PScwJyB3aWR0aD0nMC41JyBoZWlnaHQ9JzY0LjUnPjwvcmVjdD5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IHg9JzQ1LjUnIHk9JzAnIHdpZHRoPScwLjUnIGhlaWdodD0nNjQuNSc+PC9yZWN0PlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICAgICAgPC9nPlxuXHQgICAgICAgICAgICA8L2c+XG5cdCAgICAgICAgPC9nPlxuXHQgICAgPC9nPlxuXHQ8L3N2Zz5cIlxufVxuXG4jIERldmljZSBmcmFtZXNcbmV4cG9ydHMuZnJhbWVzID0gIHtcblxuIyBGdWxsc2NyZWVuXG5cdFwiZnVsbHNjcmVlblwiIDogeyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCwgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFx0c2NhbGU6MSwgbW9iaWxlOmZhbHNlLCBwbGF0Zm9ybTpcIndlYlwifVxuXG5cdCMgaVBob25lc1xuXHQjIyA1U1xuXHRcImFwcGxlLWlwaG9uZS01cy1zcGFjZS1ncmF5XCI6IHsgaGVpZ2h0OiAxMTM2LCB3aWR0aDogNjQwLFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS01cy1zaWx2ZXJcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTVzLWdvbGRcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cblx0IyMgNWNcblx0XCJhcHBsZS1pcGhvbmUtNWMtZ3JlZW5cIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsc2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS01Yy1ibHVlXCI6IHsgaGVpZ2h0OiAxMTM2LCB3aWR0aDogNjQwLFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS01Yy1yZWRcIjogeyBoZWlnaHQ6IDExMzYsIHdpZHRoOiA2NDAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTVjLXdoaXRlXCI6IHsgaGVpZ2h0OiAxMTM2LCB3aWR0aDogNjQwLHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNWMteWVsbG93XCI6IHsgaGVpZ2h0OiAxMTM2LCB3aWR0aDogNjQwLHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNWMtcGlua1wiOiB7IGhlaWdodDogMTEzNiwgd2lkdGg6IDY0MCxcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblxuXHQjIyA2c1xuXHRcImFwcGxlLWlwaG9uZS02cy1zcGFjZS1ncmF5XCIgOiB7IGhlaWdodDogMTMzNCwgd2lkdGg6IDc1MCxcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNnMtc2lsdmVyXCI6IHsgaGVpZ2h0OiAxMzM0LCB3aWR0aDogNzUwLFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS02cy1nb2xkXCI6IHsgaGVpZ2h0OiAxMzM0LCB3aWR0aDogNzUwLFx0c2NhbGU6IDIsIG1vYmlsZTp0cnVlLCBwbGF0Zm9ybTpcImlPU1wifVxuXHRcImFwcGxlLWlwaG9uZS02cy1yb3NlLWdvbGRcIjogeyBoZWlnaHQ6IDEzMzQsIHdpZHRoOiA3NTAsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cblx0IyMgNnMgcGx1c1xuXHRcImFwcGxlLWlwaG9uZS02cy1wbHVzLWdvbGRcIjogeyBoZWlnaHQ6IDIyMDgsIHdpZHRoOiAxMjQyLCBzY2FsZTogMywgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtc2lsdmVyXCI6IHsgaGVpZ2h0OiAyMjA4LCB3aWR0aDogMTI0MixcdHNjYWxlOiAzLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1cy1zcGFjZS1ncmF5XCI6IHsgaGVpZ2h0OiAyMjA4LCB3aWR0aDogMTI0MixcdHNjYWxlOiAzLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGhvbmUtNnMtcGx1c1wiOiB7IGhlaWdodDogMjIwOCwgd2lkdGg6IDEyNDIsXHRzY2FsZTogMywgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBob25lLTZzLXBsdXMtcm9zZS1nb2xkXCI6IHsgaGVpZ2h0OiAyMjA4LCB3aWR0aDogMTI0MixcdHNjYWxlOiAzLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblxuXHQjIGlQYWRzXG5cblx0IyMgQWlyXG5cdFwiYXBwbGUtaXBhZC1haXItMi1nb2xkXCI6IHsgaGVpZ2h0OiAyMDQ4LCB3aWR0aDogMTUzNixcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGFkLWFpci0yLXNpbHZlclwiOiB7IGhlaWdodDogMjA0OCwgd2lkdGg6IDE1MzYsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBhZC1haXItMi1zcGFjZS1ncmF5XCI6IHsgaGVpZ2h0OiAyMDQ4LCB3aWR0aDogMTUzNixcdHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblxuXHQjIyBNaW5pXG5cdFwiYXBwbGUtaXBhZC1taW5pLTQtZ29sZFwiOiB7IGhlaWdodDogMjA0OCwgd2lkdGg6IDE1MzYsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBhZC1taW5pLTQtc3BhY2UtZ3JheVwiOiB7IGhlaWdodDogMjA0OCwgd2lkdGg6IDE1MzYsXHRzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBhZC1taW5pLTQtc2lsdmVyXCI6eyBoZWlnaHQ6IDIwNDgsIHdpZHRoOiAxNTM2LCBzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cblx0IyMgUHJvXG5cdFwiYXBwbGUtaXBhZC1wcm8tZ29sZFwiOiB7IGhlaWdodDogMjczMiwgd2lkdGg6IDIwNDgsIHNjYWxlOiAyLCBtb2JpbGU6dHJ1ZSwgcGxhdGZvcm06XCJpT1NcIn1cblx0XCJhcHBsZS1pcGFkLXByby1zaWx2ZXJcIjogeyBoZWlnaHQ6IDI3MzIsIHdpZHRoOiAyMDQ4LCBzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG5cdFwiYXBwbGUtaXBhZC1wcm8tc3BhY2UtZ3JheVwiIDogeyBoZWlnaHQ6IDI3MzIsIHdpZHRoOiAyMDQ4LCBzY2FsZTogMiwgbW9iaWxlOnRydWUsIHBsYXRmb3JtOlwiaU9TXCJ9XG59XG5leHBvcnRzLmZyYW1lckZyYW1lcyA9XG5cdDY0MDoyXG5cdDc1MDoyXG5cdDc2ODoyXG5cdDEwODA6M1xuXHQxMjQyOjNcblx0MTQ0MDo0XG5cdDE1MzY6MlxuXG4jIERldmljZSBmcmFtZXNcbmV4cG9ydHMucmVhbERldmljZXMgPVxuXHQzMjA6XG5cdFx0NDgwOlxuXHRcdFx0bmFtZTpcImlwaG9uZVwiXG5cdFx0XHRkaXNwbGF5X25hbWU6XCJpUGhvbmVcIlxuXHRcdFx0d2lkdGg6MzIwXG5cdFx0XHRoZWlnaHQ6NDgwXG5cdFx0XHRzY2FsZToxXG5cdDQ4MDpcblx0XHQ4NTQ6XG5cdFx0XHRuYW1lOlwiQW5kcm9pZCBPbmVcIlxuXHRcdFx0d2lkdGg6NDgwXG5cdFx0XHRoZWlnaHQ6ODU0XG5cdFx0XHRzY2FsZToxLjVcblxuXHQ2NDA6XG5cdFx0OTYwOlxuXHRcdFx0bmFtZTpcImlwaG9uZS01XCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZSA0XCJcblx0XHRcdHdpZHRoOjY0MFxuXHRcdFx0aGVpZ2h0Ojk2MFxuXHRcdFx0c2NhbGU6MlxuXHRcdDExMzY6XG5cdFx0XHRuYW1lOlwiaXBob25lLTVcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBob25lIDVcIlxuXHRcdFx0d2lkdGg6NjQwXG5cdFx0XHRoZWlnaHQ6MTEzNlxuXHRcdFx0c2NhbGU6MlxuXHQ3MjA6XG5cdFx0MTI4MDpcblx0XHRcdG5hbWU6XCJYSERQSVwiXG5cdFx0XHR3aWR0aDo3MjBcblx0XHRcdGhlaWdodDoxMjgwXG5cdFx0XHRzY2FsZToyXG5cdDc1MDpcblx0XHQxMTE4OlxuXHRcdFx0bmFtZTpcImlwaG9uZS02c1wiXG5cdFx0XHRkaXNwbGF5X25hbWU6XCJpUGhvbmUgNnNcIlxuXHRcdFx0d2lkdGg6NzUwXG5cdFx0XHRoZWlnaHQ6MTExOFxuXHRcdFx0c2NhbGU6MlxuXHRcdDEzMzQ6XG5cdFx0XHRuYW1lOlwiaXBob25lLTZzXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZSA2c1wiXG5cdFx0XHR3aWR0aDo3NTBcblx0XHRcdGhlaWdodDoxMzM0XG5cdFx0XHRzY2FsZToyXG5cdDc2ODpcblx0XHQxMDI0OlxuXHRcdFx0bmFtZTpcImlwYWRcIlxuXHRcdFx0ZGlzcGxheV9uYW1lOlwiaVBhZFwiXG5cdFx0XHR3aWR0aDo3Njhcblx0XHRcdGhlaWdodDoxMDI0XG5cdFx0XHRzY2FsZToxXG5cdFx0MTI4MDpcblx0XHRcdG5hbWU6XCJOZXh1cyA0XCJcblx0XHRcdHdpZHRoOjc2OFxuXHRcdFx0aGVpZ2h0OjEyODBcblx0XHRcdHNjYWxlOjJcblx0ODAwOlxuXHRcdDEyODA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgN1wiXG5cdFx0XHR3aWR0aDo4MDBcblx0XHRcdGhlaWdodDoxMjgwXG5cdFx0XHRzY2FsZToxXG5cdDEwODA6XG5cdFx0MTkyMDpcblx0XHRcdG5hbWU6XCJYWEhEUElcIlxuXHRcdFx0d2lkdGg6MTA4MFxuXHRcdFx0aGVpZ2h0OjE5MjBcblx0XHRcdHNjYWxlOjNcblx0MTIwMDpcblx0XHQxOTIwOlxuXHRcdFx0bmFtZTpcIk5leHVzIDdcIlxuXHRcdFx0d2lkdGg6MTIwMFxuXHRcdFx0aGVpZ2h0OjE5MjBcblx0XHRcdHNjYWxlOjJcblx0MTI0Mjpcblx0XHQyMjA4OlxuXHRcdFx0bmFtZTpcImlwaG9uZS02cy1wbHVzXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZSA2IFBsdXNcIlxuXHRcdFx0d2lkdGg6MTI0MlxuXHRcdFx0aGVpZ2h0OjIyMDhcblx0XHRcdHNjYWxlOjNcblx0MTMzNDpcblx0XHQ3NTA6XG5cdFx0XHRuYW1lOlwiaXBob25lLTZzXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQaG9uZSA2c1wiXG5cdFx0XHR3aWR0aDo3NTBcblx0XHRcdGhlaWdodDoxMzM0XG5cdFx0XHRzY2FsZToyXG5cdDE0NDA6XG5cdFx0MjU2MDpcblx0XHRcdG5hbWU6XCJYWFhIRFBJXCJcblx0XHRcdHdpZHRoOjE0NDBcblx0XHRcdGhlaWdodDoyNTYwXG5cdFx0XHRzY2FsZTo0XG5cdDE0NDE6XG5cdFx0MjU2MTpcblx0XHRcdG5hbWU6XCJOZXh1cyA2XCJcblx0XHRcdHdpZHRoOjE0NDBcblx0XHRcdGhlaWdodDoyNTYwXG5cdFx0XHRzY2FsZTo0XG5cdDE1MzY6XG5cdFx0MjA0ODpcblx0XHRcdG5hbWU6XCJpcGFkXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQYWRcIlxuXHRcdFx0d2lkdGg6MTUzNlxuXHRcdFx0aGVpZ2h0OjIwNDhcblx0XHRcdHNjYWxlOjJcblx0MTYwMDpcblx0XHQyMDU2OlxuXHRcdFx0bmFtZTpcIk5leHVzIDEwXCJcblx0XHRcdHdpZHRoOjE2MDBcblx0XHRcdGhlaWdodDoyMDU2XG5cdFx0XHRzY2FsZToyXG5cdDIyMDg6XG5cdFx0MTI0Mjpcblx0XHRcdG5hbWU6XCJpcGhvbmUtNnMtcGx1c1wiXG5cdFx0XHRkaXNwbGF5X25hbWU6XCJpUGhvbmUgNiBQbHVzXCJcblx0XHRcdHdpZHRoOjEyNDJcblx0XHRcdGhlaWdodDoyMjA4XG5cdFx0XHRzY2FsZTozXG5cdDIwNDg6XG5cdFx0MTUzNjpcblx0XHRcdG5hbWU6XCJOZXh1cyA5XCJcblx0XHRcdHdpZHRoOjIwNDhcblx0XHRcdGhlaWdodDoxNTM2XG5cdFx0XHRzY2FsZToyXG5cdFx0MjczMjpcblx0XHRcdG5hbWU6XCJpcGFkLXByb1wiXG5cdFx0XHRkaXNwbGF5X25hbWU6XCJpUGFkIFByb1wiXG5cdFx0XHR3aWR0aDoyMDQ4XG5cdFx0XHRoZWlnaHQ6MjczMlxuXHRcdFx0c2NhbGU6MlxuXHQyNTYwOlxuXHRcdDE2MDA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgMTBcIlxuXHRcdFx0d2lkdGg6MjU2MFxuXHRcdFx0aGVpZ2h0OjE2MDBcblx0XHRcdHNjYWxlOjJcblx0MjczMjpcblx0XHQyMDQ4OlxuXHRcdFx0bmFtZTpcImlwYWQtcHJvXCJcblx0XHRcdGRpc3BsYXlfbmFtZTpcImlQYWQgUHJvXCJcblx0XHRcdHdpZHRoOjI3MzJcblx0XHRcdGhlaWdodDoyMDQ4XG5cdFx0XHRzY2FsZToyXG4iLCIjIFV0aWxzXG5cbmlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGFuaW1hdGlvbnM6IHtcblx0XHR0YXJnZXQ6dW5kZWZpbmVkXG5cdFx0Y29uc3RyYWludHM6IHVuZGVmaW5lZFxuXHRcdGN1cnZlIDogXCJlYXNlLWluLW91dFwiXG5cdFx0Y3VydmVPcHRpb25zOiB1bmRlZmluZWRcblx0XHR0aW1lOjFcblx0XHRkZWxheTowXG5cdFx0cmVwZWF0OnVuZGVmaW5lZFxuXHRcdGNvbG9yTW9kZWw6dW5kZWZpbmVkXG5cdFx0c3RhZ2dlcjp1bmRlZmluZWRcblx0XHRmYWRlT3V0OmZhbHNlXG5cdFx0ZmFkZUluOmZhbHNlXG5cdH1cbn1cblxubGF5b3V0ID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IHt9XG5cdHRhcmdldExheWVycyA9IFtdXG5cdGJsdWVwcmludCA9IFtdXG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGlmIHNldHVwLnRhcmdldFxuXHRcdGlmIHNldHVwLnRhcmdldC5sZW5ndGhcblx0XHRcdHRhcmdldExheWVycyA9IHNldHVwLnRhcmdldFxuXHRcdGVsc2Vcblx0XHRcdHRhcmdldExheWVycy5wdXNoIHNldHVwLnRhcmdldFxuXHRlbHNlXG5cdFx0dGFyZ2V0TGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXG5cdGlmIHNldHVwLnRhcmdldFxuXHRcdGlmIHNldHVwLmNvbnN0cmFpbnRzXG5cdFx0XHRmb3IgbmV3Q29uc3RyYWludCBpbiBPYmplY3Qua2V5cyhzZXR1cC5jb25zdHJhaW50cylcblx0XHRcdFx0c2V0dXAudGFyZ2V0LmNvbnN0cmFpbnRzW25ld0NvbnN0cmFpbnRdID0gc2V0dXAuY29uc3RyYWludHNbbmV3Q29uc3RyYWludF1cblxuXG5cdCNUcmFuc2xhdGUgbmV3IGNvbnN0cmFpbnRzXG5cdGZvciBsYXllciwgaW5kZXggaW4gdGFyZ2V0TGF5ZXJzXG5cdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uID0ge31cblx0XHRpZiBsYXllci5jb25zdHJhaW50c1xuXG5cdFx0XHRwcm9wcyA9IHt9XG5cdFx0XHRsYXllci5zdXBlckZyYW1lID0ge31cblxuXHRcdFx0aWYgbGF5ZXIuc3VwZXJMYXllclxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLmhlaWdodCA9IGxheWVyLnN1cGVyTGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdGxheWVyLnN1cGVyRnJhbWUud2lkdGggPSBsYXllci5zdXBlckxheWVyLndpZHRoXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxheWVyLnN1cGVyRnJhbWUuaGVpZ2h0ID0gaW9zLmRldmljZS5oZWlnaHRcblx0XHRcdFx0bGF5ZXIuc3VwZXJGcmFtZS53aWR0aCA9IGlvcy5kZXZpY2Uud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyAhPSB1bmRlZmluZWQgJiYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCA9IHt9XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcCAhPSB1bmRlZmluZWQgJiYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ID0ge31cblxuXHRcdFx0IyBTaXplIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy53aWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMud2lkdGggPSBpb3MudXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMud2lkdGgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHByb3BzLndpZHRoID0gbGF5ZXIud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuaGVpZ2h0ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy5oZWlnaHQgPSBpb3MudXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMuaGVpZ2h0KVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRwcm9wcy5oZWlnaHQgPSBsYXllci5oZWlnaHRcblxuXHRcdFx0IyBQb3NpdGlvbmluZyBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJgXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMubGVhZGluZywgMTApXG5cdFx0XHRcdFx0cHJvcHMueCA9IGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcubGVuZ3RoID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggKyBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aFxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgcmVsYXRpb25zaGlwXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLnggKyBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aCArIGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzFdKVxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WCA9IHByb3BzLnhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNJZiBpdCdzIGEgbnVtYmVyXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLCAxMClcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAtIGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy50cmFpbGluZykgLSBwcm9wcy53aWR0aFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLmxlbmd0aCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIHByb3BzLndpZHRoXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLnggLSBpb3MudXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdbMV0pIC0gcHJvcHMud2lkdGhcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGggIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aC5jYWxjdWxhdGVkUG9zaXRpb25YID0gcHJvcHMueFxuXG5cdFx0XHRcdCMjcGVyZm9ybSBhdXRvc2l6ZVxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WFxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aC5jYWxjdWxhdGVkUG9zaXRpb25YIC0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WCArIHByb3BzLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcCAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLnRvcCwgMTApXG5cdFx0XHRcdFx0cHJvcHMueSA9IGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy50b3ApXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQjSWYgaXQncyBhIGxheWVyXG5cdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wLmxlbmd0aCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLnkgKyBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLmhlaWdodFxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgcmVsYXRpb25zaGlwXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSArIGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0ICsgaW9zLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLnRvcFsxXSlcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LnN0YXJ0WSA9IHByb3BzLnlcblxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b20gIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNJZiBpdCdzIGEgbnVtYmVyXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSA9PSBwYXJzZUludChsYXllci5jb25zdHJhaW50cy5ib3R0b20sIDEwKVxuXHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5zdXBlckZyYW1lLmhlaWdodCAtIGlvcy51dGlscy5weChsYXllci5jb25zdHJhaW50cy5ib3R0b20pIC0gcHJvcHMuaGVpZ2h0XG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgbGF5ZXJcblx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b20ubGVuZ3RoID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5jYWxjdWxhdGVkUG9zaXRpb24ueSAtIHByb3BzLmhlaWdodFxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgcmVsYXRpb25zaGlwXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSAtICBpb3MudXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzFdKSAtIHByb3BzLmhlaWdodFxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuY2FsY3VsYXRlZFBvc2l0aW9uWSA9IHByb3BzLnlcblx0XHRcdFx0IyMgcGVyZm9ybSBhdXRvc2l6ZVxuXHRcdFx0XHRwcm9wcy5oZWlnaHQgPSBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LmNhbGN1bGF0ZWRQb3NpdGlvblkgLSBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LnN0YXJ0WSArIHByb3BzLmhlaWdodFxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5zdGFydFlcblxuXG5cdFx0XHQjIEFsaWdubWVudCBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNTZXQgdGhlIGNlbnRlcmluZyBmcmFtZVxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hbGlnbiA9PSBcImhvcml6b250YWxcIlxuXHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5zdXBlckZyYW1lLndpZHRoIC8gMiAtIHByb3BzLndpZHRoIC8gMlxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduID09IFwidmVydGljYWxcIlxuXHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5zdXBlckZyYW1lLmhlaWdodCAvIDIgLSBwcm9wcy5oZWlnaHQgLyAyXG5cblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gPT0gXCJjZW50ZXJcIlxuXHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5zdXBlckZyYW1lLndpZHRoIC8gMiAtIHByb3BzLndpZHRoIC8gMlxuXHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5zdXBlckZyYW1lLmhlaWdodCAvIDIgLSBwcm9wcy5oZWlnaHQgLyAyXG5cblxuXHRcdFx0IyBDZW50ZXJpbmcgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi54ICsgKGxheWVyLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoIC0gcHJvcHMud2lkdGgpIC8gMlxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy52ZXJ0aWNhbENlbnRlciAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnZlcnRpY2FsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi55ICsgKGxheWVyLmNvbnN0cmFpbnRzLnZlcnRpY2FsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHQgLSBwcm9wcy5oZWlnaHQpIC8gMlxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5jZW50ZXIgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLnggKyAobGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aCAtIHByb3BzLndpZHRoKSAvIDJcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueSArIChsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLmhlaWdodCAtIHByb3BzLmhlaWdodCkgLyAyXG5cblx0XHRcdCMgQWxpZ25pbmcgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdFZGdlcyAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueFxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIHByb3BzLndpZHRoICsgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGhcblxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3BFZGdlcyAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnkgLSBwcm9wcy5oZWlnaHQgKyBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0XG5cblxuXHRcdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uID0gcHJvcHNcblx0XHRlbHNlXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBsYXllci5wcm9wc1xuXG5cdFx0Ymx1ZXByaW50LnB1c2ggbGF5ZXJcblxuXG5cdHJldHVybiBibHVlcHJpbnRcblxuZXhwb3J0cy5zZXQgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0ge31cblx0cHJvcHMgPSB7fVxuXHRpZiBhcnJheVxuXHRcdGZvciBpIGluIE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9ucylcblx0XHRcdGlmIGFycmF5W2ldXG5cdFx0XHRcdHNldHVwW2ldID0gYXJyYXlbaV1cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2V0dXBbaV0gPSBleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnNbaV1cblxuXHRibHVlcHJpbnQgPSBsYXlvdXQoYXJyYXkpXG5cblx0Zm9yIGxheWVyLCBpbmRleCBpbiBibHVlcHJpbnRcblx0XHRmb3Iga2V5IGluIE9iamVjdC5rZXlzKGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbilcblx0XHRcdGxheWVyW2tleV0gPSBsYXllci5jYWxjdWxhdGVkUG9zaXRpb25ba2V5XVxuXG5leHBvcnRzLmFuaW1hdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0ge31cblx0cHJvcHMgPSB7fVxuXHRpZiBhcnJheVxuXHRcdGZvciBpIGluIE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9ucylcblx0XHRcdGlmIGFycmF5W2ldXG5cdFx0XHRcdHNldHVwW2ldID0gYXJyYXlbaV1cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2V0dXBbaV0gPSBleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnNbaV1cblxuXHRibHVlcHJpbnQgPSBsYXlvdXQoYXJyYXkpXG5cblx0Zm9yIGxheWVyLCBpbmRleCBpbiBibHVlcHJpbnRcblx0XHQjVGltaW5nXG5cdFx0ZGVsYXkgPSBzZXR1cC5kZWxheVxuXHRcdGlmIHNldHVwLnN0YWdnZXJcblx0XHRcdHN0YWcgPSBzZXR1cC5zdGFnZ2VyXG5cdFx0XHRkZWxheSA9ICgoaW5kZXgpICogc3RhZykgKyBkZWxheVxuXG5cdFx0aWYgc2V0dXAuZmFkZU91dFxuXHRcdFx0aWYgbGF5ZXIgPT0gc2V0dXAuZmFkZU91dFxuXHRcdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24ub3BhY2l0eSA9IDBcblxuXHRcdGlmIHNldHVwLmZhZGVJblxuXHRcdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLm9wYWNpdHkgPSAxXG5cblx0XHRsYXllci5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOmxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvblxuXHRcdFx0dGltZTpzZXR1cC50aW1lXG5cdFx0XHRkZWxheTpkZWxheVxuXHRcdFx0Y3VydmU6c2V0dXAuY3VydmVcblx0XHRcdHJlcGVhdDpzZXR1cC5yZXBlYXRcblx0XHRcdGNvbG9yTW9kZWw6c2V0dXAuY29sb3JNb2RlbFxuXHRcdFx0Y3VydmVPcHRpb25zOnNldHVwLmN1cnZlT3B0aW9uc1xuXG5cdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uID0gcHJvcHNcbiIsImlvcyA9IHJlcXVpcmUgJ2lvcy1raXQnXG5cblxuZXhwb3J0cy5kZWZhdWx0cyA9XG4gIHN0eWxlOlwibGlnaHRcIlxuICBzaGlmdDp0cnVlXG4gIG91dHB1dDp1bmRlZmluZWRcbiAgcmV0dXJuVGV4dDpcInJldHVyblwiXG4gIHN0YXRlOlwibGV0dGVyc1wiXG4gIGhpZGRlbjpmYWxzZVxuICByZXR1cm5Db2xvcjpcImJsdWVcIlxuICBzdXBlckxheWVyOnVuZGVmaW5lZFxuXG5cbiNSZXNwb25zYWJpbGUgZm9yIGtleWJvYXJkIGRpbWVuc2lvbnNcbmRldmljZSA9XG4gIFwiZ29vZ2xlLW5leHVzLTV4XCI6XG4gICAgcG9wVXBDaGFyOjM4XG4gICAgcG9wVXBUb3A6NlxuICAgIGhlaWdodDoyMjZcbiAgICBsaW5lSGVpZ2h0OjQyXG4gICAgbGV0dGVyS2V5OlxuICAgICAga2V5VG9wOjEyXG4gICAgICBoZWlnaHQ6NDVcbiAgICAgIHdpZHRoOjM2XG4gICAgICBib3JkZXJSYWRpdXM6NVxuICAgICAgZm9udFNpemU6MjRcbiAgICAgIHRvcDoxMFxuICAgIHNwZWNpYWxLZXlXaWR0aDo0NVxuICAgIHNwZWNpYWxLZXlIZWlnaHQ6NDVcbiAgICBzcGFjZTo1XG4gICAgcm93MTpcbiAgICAgIGxlYWRpbmc6MFxuICAgICAgdG9wOjBcbiAgICByb3cyOlxuICAgICAgbGVhZGluZzoyMFxuICAgICAgdG9wOjExXG4gICAgcm93MzpcbiAgICAgIHRvcDoxMVxuICAgICAgbGVhZGluZzo2M1xuICAgIGFyZWE6XG4gICAgICB0b3A6OFxuICAgICAgbGVhZGluZzo0XG4gICAgICB0cmFpbGluZzo0XG4gICAgICBib3R0b206NVxuICAgIHJldHVybldpZHRoOjk3XG4gICAgcG9wVXBPZmZzZXQ6XG4gICAgICB4OjEwXG4gICAgICB5OjM4XG4gIFwiaXBob25lLTVcIjpcbiAgICBwb3BVcENoYXI6NDBcbiAgICBwb3BVcFRvcDo0XG4gICAgaGVpZ2h0OjIxNVxuICAgIGxpbmVIZWlnaHQ6MzZcbiAgICBsZXR0ZXJLZXk6XG4gICAgICBrZXlUb3A6NlxuICAgICAgaGVpZ2h0OjM5XG4gICAgICB3aWR0aDoyNi41XG4gICAgICBib3JkZXJSYWRpdXM6NVxuICAgICAgZm9udFNpemU6MjIuNVxuICAgIHNwZWNpYWxLZXlXaWR0aDozOC41XG4gICAgc3BlY2lhbEtleUhlaWdodDozOC41XG4gICAgc3BhY2U6NVxuICAgIHJvdzE6XG4gICAgICBsZWFkaW5nOjBcbiAgICAgIHRvcDowXG4gICAgcm93MjpcbiAgICAgIGxlYWRpbmc6MTlcbiAgICAgIHRvcDoxNlxuICAgIHJvdzM6XG4gICAgICB0b3A6MTZcbiAgICAgIGxlYWRpbmc6NTFcbiAgICBhcmVhOlxuICAgICAgdG9wOjExXG4gICAgICBsZWFkaW5nOjNcbiAgICAgIHRyYWlsaW5nOjNcbiAgICAgIGJvdHRvbTo0XG4gICAgcmV0dXJuV2lkdGg6NzVcbiAgICBwb3BVcE9mZnNldDpcbiAgICAgIHg6NFxuICAgICAgeTozMFxuICBcImlwaG9uZS02c1wiOlxuICAgIHBvcFVwQ2hhcjo0MFxuICAgIHBvcFVwVG9wOjZcbiAgICBoZWlnaHQ6MjE4XG4gICAgbGluZUhlaWdodDo0MFxuICAgIGxldHRlcktleTpcbiAgICAgIGtleVRvcDoxMFxuICAgICAgaGVpZ2h0OjQyXG4gICAgICB3aWR0aDozMS41XG4gICAgICBib3JkZXJSYWRpdXM6NVxuICAgICAgZm9udFNpemU6MjNcbiAgICAgIHRvcDoxMFxuICAgIHNwZWNpYWxLZXlXaWR0aDo0MlxuICAgIHNwZWNpYWxLZXlIZWlnaHQ6NDJcbiAgICBzcGFjZTo2XG4gICAgcm93MTpcbiAgICAgIGxlYWRpbmc6MFxuICAgICAgdG9wOjBcbiAgICByb3cyOlxuICAgICAgbGVhZGluZzoyMlxuICAgICAgdG9wOjEyXG4gICAgcm93MzpcbiAgICAgIHRvcDoxMlxuICAgICAgbGVhZGluZzo1OVxuICAgIGFyZWE6XG4gICAgICB0b3A6MTJcbiAgICAgIGxlYWRpbmc6M1xuICAgICAgdHJhaWxpbmc6M1xuICAgICAgYm90dG9tOjRcbiAgICByZXR1cm5XaWR0aDo4N1xuICAgIHBvcFVwT2Zmc2V0OlxuICAgICAgeDo1XG4gICAgICB5OjMyXG4gIFwiaXBob25lLTZzLXBsdXNcIjpcbiAgICBwb3BVcENoYXI6MzhcbiAgICBwb3BVcFRvcDo2XG4gICAgaGVpZ2h0OjIyNlxuICAgIGxpbmVIZWlnaHQ6NDJcbiAgICBsZXR0ZXJLZXk6XG4gICAgICBrZXlUb3A6MTJcbiAgICAgIGhlaWdodDo0NVxuICAgICAgd2lkdGg6MzZcbiAgICAgIGJvcmRlclJhZGl1czo1XG4gICAgICBmb250U2l6ZToyNFxuICAgICAgdG9wOjEwXG4gICAgc3BlY2lhbEtleVdpZHRoOjQ1XG4gICAgc3BlY2lhbEtleUhlaWdodDo0NVxuICAgIHNwYWNlOjVcbiAgICByb3cxOlxuICAgICAgbGVhZGluZzowXG4gICAgICB0b3A6MFxuICAgIHJvdzI6XG4gICAgICBsZWFkaW5nOjIwXG4gICAgICB0b3A6MTFcbiAgICByb3czOlxuICAgICAgdG9wOjExXG4gICAgICBsZWFkaW5nOjYzXG4gICAgYXJlYTpcbiAgICAgIHRvcDo4XG4gICAgICBsZWFkaW5nOjRcbiAgICAgIHRyYWlsaW5nOjRcbiAgICAgIGJvdHRvbTo1XG4gICAgcmV0dXJuV2lkdGg6OTdcbiAgICBwb3BVcE9mZnNldDpcbiAgICAgIHg6MTBcbiAgICAgIHk6MzhcbiAgXCJpcGFkXCI6XG4gICAgaGVpZ2h0OjMxM1xuICAgIGxpbmVIZWlnaHQ6NTVcbiAgICBsZXR0ZXJLZXk6XG4gICAgICBoZWlnaHQ6NTVcbiAgICAgIHdpZHRoOjU2XG4gICAgICBib3JkZXJSYWRpdXM6NVxuICAgICAgZm9udFNpemU6MjNcbiAgICBzcGVjaWFsS2V5V2lkdGg6NTZcbiAgICBzcGVjaWFsS2V5SGVpZ2h0OjU1XG4gICAgc3BhY2U6MTJcbiAgICByZXR1cm5XaWR0aDoxMDZcbiAgICByb3cxOlxuICAgICAgbGVhZGluZzowXG4gICAgICB0b3A6MFxuICAgIHJvdzI6XG4gICAgICBsZWFkaW5nOjMwXG4gICAgICB0b3A6OVxuICAgIHJvdzM6XG4gICAgICBsZWFkaW5nOjY4XG4gICAgICB0b3A6OVxuICAgIGFyZWE6XG4gICAgICB0b3A6NTVcbiAgICAgIGxlYWRpbmc6NlxuICAgICAgdHJhaWxpbmc6NlxuICAgICAgYm90dG9tOjhcblxuICBcImlwYWQtcHJvXCI6XG4gICAgaGVpZ2h0OjM3OFxuICAgIGxpbmVIZWlnaHQ6NjFcbiAgICBsZXR0ZXJLZXk6XG4gICAgICBoZWlnaHQ6NjFcbiAgICAgIHdpZHRoOjYzXG4gICAgICBib3JkZXJSYWRpdXM6NVxuICAgICAgZm9udFNpemU6MjNcbiAgICBzcGFjZTo3XG4gICAgcmV0dXJuV2lkdGg6MTIwXG4gICAgc3BlY2lhbEtleUhlaWdodDo2MVxuICAgIHNwZWNpYWxLZXlXaWR0aDo5M1xuICAgIHJvdzE6XG4gICAgICBsZWFkaW5nOjExMVxuICAgICAgdG9wOjUzXG4gICAgcm93MjpcbiAgICAgIGxlYWRpbmc6MTI2XG4gICAgICB0b3A6N1xuICAgIHJvdzM6XG4gICAgICBsZWFkaW5nOjE2MVxuICAgICAgdG9wOjdcbiAgICBhcmVhOlxuICAgICAgdG9wOjU2XG4gICAgICBsZWFkaW5nOjRcbiAgICAgIHRyYWlsaW5nOjRcbiAgICAgIGJvdHRvbTo0XG5cblxuXG4jIE1hcCBvZiBrZXkgY29kZXNcbiMgQ29kZXMgZm9yIGFsbCBrZXlzXG5jb2RlTWFwID0geyA4OidkZWxldGUnLCA5Oid0YWInLCAxMzoncmV0dXJuJywgMTY6J3NoaWZ0JywgMjA6J2NhcHMnLCAzMjonc3BhY2UnLCAyNzpcImRpc21pc3NcIiwgMzM6XCIhXCIsIDM0OlwiXFxcIlwiLCAzNTpcIiNcIiwgMzY6XCIkXCIsIDM3OlwiJVwiLCAzODpcIiZcIiwgMzk6XCJcXCdcIiwgNDA6XCIoXCIsIDQxOlwiKVwiLCA0MjpcIipcIiwgNDM6XCIrXCIsIDQ0OlwiLFwiLCA0NTpcIi1cIiwgNDc6XCIvXCIsIDQ2OlwiLlwiLCA0ODpcIjBcIiwgNDk6XCIhXCIsIDUwOlwiQFwiLCA1MTpcIiNcIiwgNTI6XCIkXCIsIDUzOlwiJVwiLCA1NDpcIl5cIiwgNTU6XCImXCIsIDU2OlwiKlwiLCA1NzpcIihcIiwgNDg6XCIpXCIsIDU5OlwiX1wiLCA2MDpcIjxcIiwgNjE6XCI9XCIsIDYyOlwiPlwiLCA2MzpcIj9cIiwgNjQ6XCJAXCIsIDY1OlwiQVwiLCA2NjpcIkJcIiwgNjc6XCJDXCIsIDY4OlwiRFwiLCA2OTpcIkVcIiwgNzA6XCJGXCIsIDcxOlwiR1wiLCA3MjpcIkhcIiwgNzM6XCJJXCIsIDc0OlwiSlwiLCA3NTpcIktcIiwgNzY6XCJMXCIsIDc3OlwiTVwiLCA3ODpcIk5cIiwgNzk6XCJPXCIsIDgwOlwiUFwiLCA4MTpcIlFcIiwgODI6XCJSXCIsIDgzOlwiU1wiLCA4NDpcIlRcIiwgODU6XCJVXCIsIDg2OlwiVlwiLCA4NzpcIldcIiwgODg6XCJYXCIsIDg5OlwiWVwiLCA5MDpcIlpcIiwgOTE6J2NtZCcsIDIxOTpcIltcIiwgOTI6XCJcXFxcXCIsIDIyMTpcIl1cIiwgOTQ6XCJeXCIsIDk1OlwiX1wiLCA5NjpcImBcIiwgOTc6XCJhXCIsIDk4OlwiYlwiLCA5OTpcImNcIiwgMTAwOlwiZFwiLCAxMDE6XCJlXCIsIDEwMjpcImZcIiwgMTAzOlwiZ1wiLCAxMDQ6XCJoXCIsIDEwNTpcImlcIiwgMTA2OlwialwiLCAxMDc6XCJrXCIsIDEwODpcImxcIiwgMTA5OlwibVwiLCAxMTA6XCJuXCIsIDExMTpcIm9cIiwgMTEyOlwicFwiLCAxMTM6XCJxXCIsIDExNDpcInJcIiwgMTE1Olwic1wiLCAxMTY6XCJ0XCIsIDExNzpcInVcIiwgMTE4OlwidlwiLCAxMTk6XCJ3XCIsIDEyMDpcInhcIiwgMTIxOlwieVwiLCAxMjI6XCJ6XCIsIDEyMzpcIntcIiwgMTI0OlwifFwiLCAxMjU6XCJ9XCIsIDEyNjpcIn5cIiwgMTg2OlwiOlwiLCAxODc6XCIrXCIsIDE4ODpcIjxcIiwgMTkwOlwiPlwiLCAxOTE6XCI/XCIsIDE4OTpcIl9cIiwgMTkyOlwiflwiLCAyMTk6XCJ7XCIsIDIyMDpcIlxcfFwiLCAyMjE6XCJ9XCIsIDIyMjpcIiZyZHF1bztcIn1cbmFycmF5T2ZDb2RlcyA9IE9iamVjdC5rZXlzKGNvZGVNYXApXG5sZXR0ZXJzID0gW1wicVwiLCBcIndcIiwgXCJlXCIsIFwiclwiLCBcInRcIiwgXCJ5XCIsIFwidVwiLCBcImlcIiwgXCJvXCIsIFwicFwiLCBcImFcIiwgXCJzXCIsIFwiZFwiLCBcImZcIiwgXCJnXCIsIFwiaFwiLCBcImpcIiwgXCJrXCIsIFwibFwiLCBcInpcIiwgXCJ4XCIsIFwiY1wiLCBcInZcIiwgIFwiYlwiLCBcIm5cIiwgXCJtXCJdXG5udW1iZXJzID0gW1wiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCIsIFwiMFwiLCBcIi1cIiwgXCIvXCIsIFwiOlwiLCBcIjtcIiwgXCIoXCIsIFwiKVwiLCBcIiRcIiwgXCImXCIsIFwiQFwiLCBcIlxcXCJcIiwgXCIuXCIsIFwiLFwiLCBcIj9cIiwgXCIhXCIsIFwi4oCyXCJdXG5zeW1ib2xzID0gW1wiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBcIiNcIiwgXCIlXCIsIFwiXlwiLCBcIipcIiwgXCIrXCIsIFwiPVwiLCBcIl9cIiwgXCJcXFxcXCIsIFwifFwiLCBcIn5cIiwgXCI8XCIsIFwiPlwiLCBcIuKCrFwiLCBcIsKjXCIsIFwiwqVcIiwgXCLigKJcIl1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKG9iaikgLT5cbiAgc2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQob2JqLCBleHBvcnRzLmRlZmF1bHRzKVxuICAjUmVzcG9uc2FiaWxlIGZvciBjb2xvcnNcbiAgc3R5bGUgPVxuICAgIGxpZ2h0OlxuICAgICAgYmFja2dyb3VuZENvbG9yOlwiI0QxRDVEQVwiXG4gICAgICBjb2xvcjpcIiMwMDBcIlxuICAgICAgc3BlY2lhbEtleUJHOlwiI0FDQjNCRFwiXG4gICAgICBrZXlCRzpcIiNGN0Y3RjdcIlxuICAgICAgc2hhZG93WTogaW9zLnB4KDEpXG4gICAgICBzaGFkb3dDb2xvcjpcIiM4OThCOEZcIlxuICAgICAgcmV0dXJuQkc6aW9zLmNvbG9yKHNldHVwLnJldHVybkNvbG9yKVxuICAgIGRhcms6XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJyZ2JhKDAsMCwwLC43KVwiXG4gICAgICBjb2xvcjpcIiNGRkZcIlxuICAgICAgc3BlY2lhbEtleUJHOlwicmdiYSg2Nyw2Nyw2NywuOClcIlxuICAgICAga2V5Qkc6XCJyZ2JhKDEwNSwxMDUsMTA1LC44KVwiXG4gICAgICBzaGFkb3dZOiBpb3MucHgoMSlcbiAgICAgIHNoYWRvd0NvbG9yOlwicmdiYSgwLDAsMCwuNClcIlxuICAgICAgcmV0dXJuQkc6aW9zLmNvbG9yKHNldHVwLnJldHVybkNvbG9yKVxuXG4gIHNwZWNzID0gZGV2aWNlW2lvcy5kZXZpY2UubmFtZV1cbiAgY29sb3JzID0gc3R5bGVbc2V0dXAuc3R5bGVdXG5cbiAgZGV2aWNlXG4gIGJvYXJkID0gbmV3IGlvcy5WaWV3XG4gICAgbmFtZTpcIktleWJvYXJkXCJcbiAgICBzdXBlckxheWVyOnNldHVwLnN1cGVyTGF5ZXJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6c3R5bGVbc2V0dXAuc3R5bGVdLmJhY2tncm91bmRDb2xvclxuICAgIHk6aW9zLmRldmljZS5oZWlnaHRcbiAgICBjb25zdHJhaW50czpcbiAgICAgIGxlYWRpbmc6MFxuICAgICAgdHJhaWxpbmc6MFxuICAgICAgYm90dG9tOi0xICogMjcwICNzcGVjcy5oZWlnaHRcbiAgICAgIGhlaWdodDoyNzAgI3NwZWNzLmhlaWdodFxuICBpb3MudXRpbHMuYmdCbHVyKGJvYXJkKVxuICBib2FyZC5vdXRwdXQgPSAob2JqKSAtPlxuICAgIGlmIGJvYXJkLnRhcmdldFxuICAgICAgaWYgYm9hcmQudGFyZ2V0LnR5cGUgPT0gJ2ZpZWxkJ1xuICAgICAgICBib2FyZC50YXJnZXQuYWN0aXZlID0gZmFsc2VcblxuICAgIGJvYXJkLnRhcmdldCA9IG9ialxuICAgIGlmIGJvYXJkLnRhcmdldFxuICAgICAgaWYgYm9hcmQudGFyZ2V0LnR5cGUgPT0gJ2ZpZWxkJ1xuICAgICAgICBib2FyZC50YXJnZXQuYWN0aXZlID0gdHJ1ZVxuICBib2FyZC5oaWRkZW4gPSBzZXR1cC5oaWRkZW5cblxuICBpZiBib2FyZC5oaWRkZW4gPT0gZmFsc2VcbiAgICBib2FyZC5jb25zdHJhaW50cy5ib3R0b20gPSAwXG4gICAgaW9zLmxheW91dC5zZXQoYm9hcmQpXG5cbiAgYm9hcmQuY2FsbCA9ICgpIC0+XG4gICAgYm9hcmQueSA9IGlvcy5kZXZpY2UuaGVpZ2h0XG4gICAgYm9hcmQuY29uc3RyYWludHMuYm90dG9tID0gMFxuICAgIGlmIGJvYXJkLmhpZGRlblxuICAgICAgYm9hcmQuaGlkZGVuID0gZmFsc2VcbiAgICAgIGlvcy5sYXlvdXQuYW5pbWF0ZVxuICAgICAgICB0YXJnZXQ6Ym9hcmRcbiAgICAgICAgdGltZTouNVxuICAgICAgICBjdXJ2ZTonZWFzZS1pbi1vdXQnXG5cbiAgICBib2FyZC5icmluZ1RvRnJvbnQoKVxuICBib2FyZC5kaXNtaXNzID0gKCkgLT5cbiAgICBib2FyZC5jb25zdHJhaW50cy5ib3R0b20gPSAtMSAqIGlvcy5wdChib2FyZC5oZWlnaHQpXG4gICAgYm9hcmQuaGlkZGVuID0gdHJ1ZVxuICAgIGJvYXJkLnRhcmdldC5hY3RpdmUgPSBmYWxzZVxuICAgIGlvcy5sYXlvdXQuYW5pbWF0ZVxuICAgICAgdGFyZ2V0OmJvYXJkXG4gICAgICB0aW1lOi41XG4gICAgICBjdXJ2ZTonZWFzZS1pbi1vdXQnXG5cbiAgYm9hcmQuZGVsZXRlID0gKCkgLT5cbiAgICBsYXllciA9IFwiXCJcbiAgICBpZiBib2FyZC50YXJnZXRcbiAgICAgIGlmIGJvYXJkLnRhcmdldC50eXBlID09ICdmaWVsZCdcbiAgICAgICAgbGF5ZXIgPSBib2FyZC50YXJnZXQudGV4dFxuICAgICAgZWxzZVxuICAgICAgICBsYXllciA9IGJvYXJkLnRhcmdldFxuXG4gICAgICBpc1NwYWNlID0gbGF5ZXIuaHRtbFtsYXllci5odG1sLmxlbmd0aCAtIDUuLmxheWVyLmh0bWwubGVuZ3RoIC0gMSBdXG5cbiAgICAgIGlmIGlzU3BhY2UgIT0gJ25ic3A7J1xuICAgICAgICB0ZXh0ID0gbGF5ZXIuaHRtbC5zbGljZSgwLCAtMSlcbiAgICAgICAgbGF5ZXIuaHRtbCA9IHRleHRcbiAgICAgIGVsc2VcbiAgICAgICAgdGV4dCA9IGxheWVyLmh0bWwuc2xpY2UoMCwgLTYpXG4gICAgICAgIGxheWVyLmh0bWwgPSB0ZXh0XG5cbiAgYm9hcmQuY2Fwc0xvY2sgPSAoKSAtPlxuICAgIGJvYXJkLmlzQ2Fwc0xvY2sgPSB0cnVlXG4gICAgYm9hcmQuaXNDYXBpdGFsID0gdHJ1ZVxuICAgIGJvYXJkLmtleXMuc2hpZnQuaWNvbi50b2dnbGUoJ29mZicpXG4gICAgaGFuZGxlS2V5Q29sb3IoYm9hcmQua2V5cy5zaGlmdClcbiAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJ1xuICAgICAgYm9hcmQua2V5cy5zaGlmdGFsdC5pY29uLnRvZ2dsZSgnb2ZmJylcbiAgICAgIGhhbmRsZUtleUNvbG9yKGJvYXJkLmtleXMuc2hpZnRhbHQpXG5cbiAgYm9hcmQub3V0cHV0KHNldHVwLm91dHB1dClcbiAgYm9hcmQua2V5c0FycmF5ID0gW11cbiAgYm9hcmQua2V5cyA9IHt9XG4gIGJvYXJkLmlzQ2FwaXRhbCA9IHNldHVwLnNoaWZ0XG4gIGJvYXJkLmFyZWEgPSBuZXcgaW9zLlZpZXdcbiAgICBuYW1lOlwiLmFyZWFcIlxuICAgIHN1cGVyTGF5ZXI6Ym9hcmRcbiAgICBjb25zdHJhaW50czogc3BlY3MuYXJlYVxuICAgIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblxuICBLZXkgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBpb3MuVmlld1xuICAgICAgbmFtZTpcIi5rZXlzLlwiICsgb2JqLm5hbWVcbiAgICAgIGNvbnN0cmFpbnRzOm9iai5jb25zdHJhaW50c1xuICAgICAgc3VwZXJMYXllcjpib2FyZC5hcmVhXG4gICAgICBib3JkZXJSYWRpdXM6aW9zLnB4KHNwZWNzLmxldHRlcktleS5ib3JkZXJSYWRpdXMpXG4gICAgICBzaGFkb3dZOmNvbG9ycy5zaGFkb3dZXG4gICAgICBzaGFkb3dDb2xvcjpjb2xvcnMuc2hhZG93Q29sb3JcbiAgICBrZXkuc3R5bGUuZm9udEZhbWlseSA9IFwiLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZlwiXG5cbiAgICAjRGlzYWJsZXMgWm9vbVxuICAgIGtleS5vbiBFdmVudHMuVG91Y2hTdGFydCwgKGV2ZW50KSAtPlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIHJldHVybiBrZXlcblxuICBMZXR0ZXIgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBLZXkgb2JqXG4gICAga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5rZXlCR1xuICAgIGtleS5odG1sID0gb2JqLmxldHRlclxuICAgIGtleS5jb2xvciA9IGNvbG9ycy5jb2xvclxuICAgIGtleS5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiXG4gICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoc3BlY3MubGluZUhlaWdodCkgKyBcInB4XCJcbiAgICBrZXkuc3R5bGUuZm9udFNpemUgPSBpb3MucHgoc3BlY3MubGV0dGVyS2V5LmZvbnRTaXplKSArIFwicHhcIlxuICAgIGtleS52YWx1ZSA9IG9iai5sZXR0ZXJcblxuXG4gICAgaWYga2V5LnZhbHVlID09IFwic3BhY2VcIiB0aGVuIGtleS52YWx1ZSA9IFwiJm5ic3A7XCJcbiAgICBpZiBpb3MuaXNQYWQoKVxuICAgICAga2V5LmRvd24gPSAtPlxuICAgICAgICBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLnNwZWNpYWxLZXlCR1xuICAgICAgICBpZiBib2FyZC50YXJnZXQgdGhlbiBpb3MudXRpbHMud3JpdGUoYm9hcmQudGFyZ2V0LCBrZXkudmFsdWUpXG4gICAgICBrZXkudXAgPSAtPlxuICAgICAgICBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmtleUJHXG4gICAgICAgIGlmIGJvYXJkLmlzQ2FwaXRhbCAmJiBib2FyZC5pc0NhcHNMb2NrICE9IHRydWVcbiAgICAgICAgICBib2FyZC5pc0NhcGl0YWwgPSBmYWxzZVxuICAgICAgICAgIGNhcGl0YWxpemVLZXlzKClcbiAgICAgICAgICBib2FyZC5rZXlzLnNoaWZ0LnVwKClcbiAgICAgICAgICBpZiBpb3MuaXNQYWQoKSB0aGVuIGJvYXJkLmtleXMuc2hpZnRhbHQudXAoKVxuICAgICAga2V5Lm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuICAgICAgICBrZXkuZG93bigpXG4gICAgICBrZXkub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICBrZXkudXAoKVxuICAgIGVsc2VcbiAgICAgIGlmIGtleS52YWx1ZSAhPSAnJm5ic3A7J1xuICAgICAgICBrZXkuZG93biA9IC0+XG4gICAgICAgICAgYm9hcmQucG9wVXAudmlzaWJsZSA9IHRydWVcbiAgICAgICAgICBib2FyZC5icmluZ1RvRnJvbnQoKVxuICAgICAgICAgIGJvYXJkLnBvcFVwLmJyaW5nVG9Gcm9udCgpXG4gICAgICAgICAgYm9hcmQucG9wVXAubWlkWCA9IGtleS5taWRYXG4gICAgICAgICAgYm9hcmQucG9wVXAubWF4WSA9IGtleS5tYXhZXG4gICAgICAgICAgYm9hcmQucG9wVXAudGV4dC5odG1sID0ga2V5LnZhbHVlXG5cbiAgICAgICAgICBpZiBib2FyZC50YXJnZXQgdGhlbiBpb3MudXRpbHMud3JpdGUoYm9hcmQudGFyZ2V0LCBrZXkudmFsdWUpXG5cblxuICAgICAgICBrZXkudXAgPSAtPlxuICAgICAgICAgIGJvYXJkLnBvcFVwLnZpc2libGUgPSBmYWxzZVxuICAgICAgICAgIGlmIGJvYXJkLmlzQ2FwaXRhbCAmJiBib2FyZC5jYXBzTG9jayAhPSB0cnVlXG4gICAgICAgICAgICBib2FyZC5pc0NhcGl0YWwgPSBmYWxzZVxuICAgICAgICAgICAgY2FwaXRhbGl6ZUtleXMoKVxuICAgICAgICAgICAgYm9hcmQua2V5cy5zaGlmdC51cCgpXG5cbiAgICAgICAga2V5Lm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPiBrZXkuZG93bigpXG4gICAgICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+IGtleS51cCgpXG4gICAgICBlbHNlXG5cbiAgICAgICAga2V5LmRvd24gPSAtPlxuICAgICAgICAgIGtleS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnMuc3BlY2lhbEtleUJHXG4gICAgICAgICAgaWYgYm9hcmQudGFyZ2V0IHRoZW4gaW9zLnV0aWxzLndyaXRlKGJvYXJkLnRhcmdldCwga2V5LnZhbHVlKVxuICAgICAgICBrZXkudXAgPSAtPlxuICAgICAgICAgIGtleS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnMua2V5QkdcbiAgICAgICAga2V5Lm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuICAgICAgICAgIGtleS5kb3duKClcbiAgICAgICAga2V5Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgICBrZXkudXAoKVxuXG4gICAgcmV0dXJuIGtleVxuXG4gIFNwZWNpYWxLZXkgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBLZXkgb2JqXG4gICAga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5zcGVjaWFsS2V5QkdcbiAgICBrZXkuY29sb3IgPSBjb2xvcnMuY29sb3JcbiAgICBrZXkuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIlxuICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSAnaXBhZC1wcm8nXG4gICAgICBrZXkuc3R5bGUuZm9udFNpemUgPSBpb3MucHgoMTgpICsgXCJweFwiXG4gICAgZWxzZVxuICAgICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDE2KSArIFwicHhcIlxuICAgIHJldHVybiBrZXlcblxuICBJY29uID0gKG9iaikgLT5cbiAgICBpY29uID0gbmV3IGlvcy5WaWV3XG4gICAgICBuYW1lOidpY29uJ1xuICAgICAgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuICAgICAgc3VwZXJMYXllcjpvYmouc3VwZXJMYXllclxuICAgICAgY29uc3RyYWludHM6XG4gICAgICAgIGFsaWduOidjZW50ZXInXG5cbiAgICBpY29uLnByb3BzID0gKGhlaWdodDpvYmouaWNvbi5oZWlnaHQsIHdpZHRoOm9iai5pY29uLndpZHRoLCBodG1sOiBvYmouaWNvbi5zdmcpXG5cbiAgICBpb3MudXRpbHMuY2hhbmdlRmlsbChpY29uLCBjb2xvcnMuY29sb3IpXG4gICAgcmV0dXJuIGljb25cblxuICBJY29uV2l0aFN0YXRlID0gKG9iaikgLT5cbiAgICBpY29uID0gbmV3IGlvcy5WaWV3XG4gICAgICBuYW1lOidpY29uJ1xuICAgICAgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuICAgICAgc3VwZXJMYXllcjpvYmouc3VwZXJMYXllclxuICAgICAgY29uc3RyYWludHM6XG4gICAgICAgIGFsaWduOidjZW50ZXInXG5cbiAgICBpY29uLnRvZ2dsZSA9IChzdGF0ZSkgLT5cbiAgICAgIGlmIHN0YXRlID09IHVuZGVmaW5lZFxuICAgICAgICBpZiBpY29uLnN0YXRlID09ICdvbicgdGhlbiBzdGF0ZSA9ICdvZmYnXG4gICAgICAgIGVsc2Ugc3RhdGUgPSAnb24nXG5cbiAgICAgIGlmIHN0YXRlID09IFwib25cIlxuICAgICAgICBpZiBpb3MuZGV2aWNlLm5hbWUgIT0gJ2lwYWQtcHJvJ1xuICAgICAgICAgIGljb24uaHRtbCA9IG9iai5vbi5zdmdcbiAgICAgICAgICBpY29uLndpZHRoID0gb2JqLm9uLndpZHRoXG4gICAgICAgICAgaWNvbi5oZWlnaHQgPSBvYmoub24uaGVpZ2h0XG4gICAgICAgIGljb24uc3RhdGUgPSAnb24nXG4gICAgICBlbHNlXG4gICAgICAgIGlmIGlvcy5kZXZpY2UubmFtZSAhPSAnaXBhZC1wcm8nXG4gICAgICAgICAgaWNvbi5odG1sID0gb2JqLm9mZi5zdmdcbiAgICAgICAgICBpY29uLndpZHRoID0gb2JqLm9uLndpZHRoXG4gICAgICAgICAgaWNvbi5oZWlnaHQgPSBvYmoub24uaGVpZ2h0XG4gICAgICAgIGljb24uc3RhdGUgPSAnb2ZmJ1xuICAgICAgaW9zLnV0aWxzLmNoYW5nZUZpbGwoaWNvbiwgY29sb3JzLmNvbG9yKVxuICAgIGlmIG9iai5zdGF0ZVxuICAgICAgaWNvbi50b2dnbGUoJ29uJylcbiAgICBlbHNlXG4gICAgICBpY29uLnRvZ2dsZSgnb2ZmJylcblxuXG4gICAgcmV0dXJuIGljb25cblxuICBjYXBpdGFsaXplS2V5cyA9IC0+XG4gICAgZm9yIGtleSBpbiBib2FyZC5rZXlzQXJyYXlcbiAgICAgIGlmIGJvYXJkLmlzQ2FwaXRhbFxuICAgICAgICBpZiBrZXkuaHRtbC5sZW5ndGggPT0gMSAmJiBrZXkuaHRtbC5tYXRjaCgvW2Etel0vaSlcbiAgICAgICAgICBrZXkuaHRtbCA9IGtleS5odG1sLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICBrZXkudmFsdWUgPSBrZXkuaHRtbFxuICAgICAgICBpZiBrZXkuYWx0XG4gICAgICAgICAga2V5LmFsdC5kZXN0cm95KClcbiAgICAgICAgICBrZXkuYWx0ID0gdW5kZWZpbmVkXG4gICAgICAgIGlmIGtleS5oZWlnaHQgPiBpb3MucHgoNDYpXG4gICAgICAgICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoc3BlY3MubGV0dGVyS2V5LmhlaWdodCkgKyAncHgnXG4gICAgICAgICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDIzKSArICdweCdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSAnaXBhZC1wcm8nXG4gICAgICAgICAgICBrZXkuc3R5bGUubGluZUhlaWdodCA9IGlvcy5weCg0NikgKyAncHgnXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoc3BlY3MubGluZUhlaWdodCkgKyAncHgnXG4gICAgICAgICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDIwKSArICdweCdcbiAgICAgICAga2V5LnZhbHVlID0ga2V5Lmh0bWxcbiAgICAgIGVsc2VcbiAgICAgICAgaWYga2V5Lmh0bWwubGVuZ3RoID09IDEgJiYga2V5Lmh0bWwubWF0Y2goL1thLXpdL2kpXG4gICAgICAgICAga2V5Lmh0bWwgPSBrZXkuaHRtbC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAga2V5LnZhbHVlID0ga2V5Lmh0bWxcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGlmIGtleS5hbHQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICBrZXkuYWx0ID0gbmV3IGlvcy5UZXh0XG4gICAgICAgICAgICAgIHRleHQ6XCJcIlxuICAgICAgICAgICAgICBzdXBlckxheWVyOmtleVxuICAgICAgICAgICAgICBjb2xvcjpjb2xvcnMuY29sb3JcbiAgICAgICAgICAgICAgY29uc3RyYWludHM6XG4gICAgICAgICAgICAgICAgYWxpZ246XCJob3Jpem9udGFsXCJcbiAgICAgICAgICAgICAgICBib3R0b206NFxuICAgICAgICAgICAgICBmb250U2l6ZTpzcGVjcy5sZXR0ZXJLZXkuZm9udFNpemVcbiAgICAgICAgICAgIGlmIGJvYXJkLnRvcFJvd1xuICAgICAgICAgICAgICBpZiBib2FyZC50b3BSb3cuaW5kZXhPZihrZXkpICE9IC0xXG4gICAgICAgICAgICAgICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoMjMpICsgJ3B4J1xuICAgICAgICAgICAgICAgIGtleS5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgxNikgKyAncHgnXG4gICAgICAgICAgICAgICAga2V5LmFsdC5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgxNikgKyAncHgnXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBrZXkuc3R5bGUubGluZUhlaWdodCA9IGlvcy5weCgzNikgKyAncHgnXG4gICAgICAgICAgICAgICAga2V5LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDIwKSArICdweCdcbiAgICAgICAgICAgICAgICBrZXkuYWx0LnN0eWxlLmZvbnRTaXplID0gaW9zLnB4KDIwKSArICdweCdcbiAgICAgICAgICAgICAgICBrZXkuYWx0LmNvbnN0cmFpbnRzLmJvdHRvbSA9IDhcbiAgICAgICAgICAgIHN3aXRjaCBrZXkudmFsdWVcbiAgICAgICAgICAgICAgd2hlbiBcIiZsdDtcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiLlwiXG4gICAgICAgICAgICAgIHdoZW4gXCImZ3Q7XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIixcIlxuICAgICAgICAgICAgICB3aGVuIFwiPFwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCIuXCJcbiAgICAgICAgICAgICAgd2hlbiBcIj5cIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiLFwiXG4gICAgICAgICAgICAgIHdoZW4gXCI/XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIi5cIlxuICAgICAgICAgICAgICB3aGVuIFwie1wiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCJbXCJcbiAgICAgICAgICAgICAgd2hlbiBcIn1cIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwifVwiXG4gICAgICAgICAgICAgIHdoZW4gXCJcXHxcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiXFxcXFwiXG4gICAgICAgICAgICAgIHdoZW4gXCJ+XCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcImBcIlxuICAgICAgICAgICAgICB3aGVuIFwiIVwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCIuXCJcbiAgICAgICAgICAgICAgd2hlbiBcIkBcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiMlwiXG4gICAgICAgICAgICAgIHdoZW4gXCIjXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjNcIlxuICAgICAgICAgICAgICB3aGVuIFwiJFwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCI0XCJcbiAgICAgICAgICAgICAgd2hlbiBcIiVcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiNVwiXG4gICAgICAgICAgICAgIHdoZW4gXCJeXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjZcIlxuICAgICAgICAgICAgICB3aGVuIFwiJmFtcDtcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiN1wiXG4gICAgICAgICAgICAgIHdoZW4gXCImXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjdcIlxuICAgICAgICAgICAgICB3aGVuIFwiKlwiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCI4XCJcbiAgICAgICAgICAgICAgd2hlbiBcIihcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiOVwiXG4gICAgICAgICAgICAgIHdoZW4gXCIpXCJcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIjBcIlxuICAgICAgICAgICAgICB3aGVuIFwiX1wiXG4gICAgICAgICAgICAgICAga2V5LmFsdC5odG1sID0gXCItXCJcbiAgICAgICAgICAgICAgd2hlbiBcIitcIlxuICAgICAgICAgICAgICAgIGtleS5hbHQuaHRtbCA9IFwiPVwiXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBrZXkuYWx0Lmh0bWwgPSBcIiZwcmltZTtcIlxuICAgICAgICAgICAgaW9zLmxheW91dC5zZXQoa2V5LmFsdClcbiAgICAgICAgICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSAnaXBhZC1wcm8nICYmIGtleS52YWx1ZSA9PSAnIScgdGhlbiBrZXkuYWx0Lmh0bWwgPSAnMSdcbiAgICAgICAgICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSAnaXBhZC1wcm8nICYmIGtleS52YWx1ZSA9PSAnPycgdGhlbiBrZXkuYWx0Lmh0bWwgPSAnLydcbiAgICAgICAgICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSAnaXBhZC1wcm8nICYmIGtleS52YWx1ZSA9PSAnOicgdGhlbiBrZXkuYWx0Lmh0bWwgPSAnOydcbiAgICAgICAgICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSAnaXBhZC1wcm8nICYmIGtleS52YWx1ZSA9PSAnJnJkcXVvOycgdGhlbiBrZXkuYWx0Lmh0bWwgPSAnJnByaW1lOydcbiAgICAgICAgICAgIGtleS52YWx1ZSA9IGtleS5hbHQuaHRtbFxuXG4gIGhhbmRsZUtleUNvbG9yID0gKGtleSkgLT5cbiAgICBpZiBpb3MuaXNQaG9uZVxuICAgICAgaWYga2V5Lmljb24uc3RhdGUgPT0gJ29uJyB0aGVuIGtleS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnMua2V5QkdcbiAgICAgIGVsc2Uga2V5LmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5zcGVjaWFsS2V5QkdcblxuICBTcGFjZSA9IChvYmopIC0+XG4gICAga2V5ID0gbmV3IExldHRlciBvYmpcbiAgICBrZXkuaHRtbCA9ICdzcGFjZSdcbiAgICBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmtleUJHXG4gICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoc3BlY3Muc3BlY2lhbEtleUhlaWdodCkgKyBcInB4XCJcbiAgICBrZXkuc3R5bGUuZm9udFNpemUgPSBpb3MucHgoMTYpICsgJ3B4J1xuICAgIHJldHVybiBrZXlcblxuICBTaGlmdCA9IChvYmopIC0+XG4gICAga2V5ID0gbmV3IFNwZWNpYWxLZXkgb2JqXG4gICAga2V5Lmljb24gPSBuZXcgSWNvbldpdGhTdGF0ZVxuICAgICAgc3VwZXJMYXllcjprZXlcbiAgICAgIHN0YXRlOm9iai5zaGlmdFxuICAgICAgb246aW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLnNoaWZ0Lm9uKVxuICAgICAgb2ZmOmlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5zaGlmdC5vZmYpXG4gICAgaGFuZGxlS2V5Q29sb3Ioa2V5KVxuXG4gICAga2V5Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgIEAuaWNvbi50b2dnbGUoKVxuICAgICAgaGFuZGxlS2V5Q29sb3Ioa2V5KVxuICAgICAgaWYgQC5pY29uLnN0YXRlID09ICdvbidcbiAgICAgICAgYm9hcmQuaXNDYXBpdGFsID0gdHJ1ZVxuICAgICAgZWxzZVxuICAgICAgICBib2FyZC5pc0NhcGl0YWwgPSBmYWxzZVxuICAgICAgY2FwaXRhbGl6ZUtleXMoKVxuXG4gICAga2V5LmRvd24gPSAtPlxuICAgICAga2V5Lmljb24udG9nZ2xlKCdvbicpXG4gICAgICBoYW5kbGVLZXlDb2xvcihrZXkpXG4gICAgICBib2FyZC5pc0NhcGl0YWwgPSB0cnVlXG4gICAgICBjYXBpdGFsaXplS2V5cygpXG5cbiAgICBrZXkudXAgPSAtPlxuICAgICAga2V5Lmljb24udG9nZ2xlKCdvZmYnKVxuICAgICAgaGFuZGxlS2V5Q29sb3Ioa2V5KVxuICAgICAgYm9hcmQuaXNDYXBpdGFsID0gZmFsc2VcbiAgICAgIGNhcGl0YWxpemVLZXlzKClcblxuICAgIGlvcy5sYXlvdXQuc2V0KGtleS5pY29uKVxuXG4gICAgaWYgaW9zLmlzUGFkKClcbiAgICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG4gICAgICAgIGlmIEAuaWNvbi5zdGF0ZSA9PSAnb24nXG4gICAgICAgICAgYm9hcmQua2V5cy5zaGlmdC5pY29uLnRvZ2dsZSgnb24nKVxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaWNvbi50b2dnbGUoJ29uJylcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnQuaWNvbi50b2dnbGUoJ29mZicpXG4gICAgICAgICAgYm9hcmQua2V5cy5zaGlmdGFsdC5pY29uLnRvZ2dsZSgnb2ZmJylcbiAgICAgICAgaGFuZGxlS2V5Q29sb3IoYm9hcmQua2V5cy5zaGlmdClcbiAgICAgICAgaGFuZGxlS2V5Q29sb3IoYm9hcmQua2V5cy5zaGlmdGFsdClcbiAgICByZXR1cm4ga2V5XG5cbiAgRGVsZXRlID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgU3BlY2lhbEtleSBvYmpcbiAgICBrZXkuaWNvbiA9IG5ldyBJY29uV2l0aFN0YXRlXG4gICAgICBzdXBlckxheWVyOmtleVxuICAgICAgb246aW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLmRlbGV0ZS5vbilcbiAgICAgIG9mZjppb3MudXRpbHMuc3ZnKGlvcy5hc3NldHMuZGVsZXRlLm9mZilcblxuICAgIGtleS5maXJlID0gLT4gYm9hcmQuZGVsZXRlKClcblxuICAgIGtleS5kb3duID0gLT5cbiAgICAgIGtleS5pY29uLnRvZ2dsZSgnb24nKVxuICAgICAgaGFuZGxlS2V5Q29sb3Ioa2V5KVxuICAgICAga2V5LmZpcmUoKVxuXG4gICAga2V5LnVwID0gLT5cbiAgICAgIGtleS5pY29uLnRvZ2dsZSgnb2ZmJylcbiAgICAgIGhhbmRsZUtleUNvbG9yKGtleSlcblxuICAgIGtleS5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT4ga2V5LmRvd24oKVxuICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+IGtleS51cCgpXG5cblxuICAgIHJldHVybiBrZXlcblxuICBOdW1iZXJzICA9IChvYmopIC0+XG4gICAga2V5ID0gbmV3IFNwZWNpYWxLZXkgb2JqXG4gICAgaWYgaW9zLmlzUGhvbmUoKVxuICAgICAga2V5Lmh0bWwgPSAnMTIzJ1xuICAgIGVsc2VcbiAgICAgIGtleS5odG1sID0nLj8xMjMnXG4gICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoc3BlY3Muc3BlY2lhbEtleUhlaWdodCkgKyBcInB4XCJcbiAgICByZXR1cm4ga2V5XG5cbiAgRW1vamkgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBTcGVjaWFsS2V5IG9ialxuICAgIGtleS5pY29uID0gbmV3IEljb25cbiAgICAgIHN1cGVyTGF5ZXI6a2V5XG4gICAgICBpY29uOmlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5lbW9qaSlcbiAgICByZXR1cm4ga2V5XG5cbiAgUmV0dXJuID0gKG9iaikgLT5cbiAgICBrZXkgPSBuZXcgU3BlY2lhbEtleSBvYmpcbiAgICBrZXkuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLnJldHVybkJHXG4gICAga2V5Lmh0bWwgPSBzZXR1cC5yZXR1cm5UZXh0XG4gICAga2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoc3BlY3Muc3BlY2lhbEtleUhlaWdodCkgKyBcInB4XCJcbiAgICBrZXkuY29sb3IgPSBpb3MudXRpbHMuYXV0b0NvbG9yKGNvbG9ycy5yZXR1cm5CRylcbiAgICBrZXkuZG93biA9IC0+XG4gICAgICBub3RoaW5nSGFwcGVucyA9IHRydWVcblxuICAgIGtleS51cCA9IC0+XG4gICAgICBib2FyZC5kaXNtaXNzKClcbiAgICAgIGlmIGJvYXJkLnRhcmdldFxuICAgICAgICBpZiBib2FyZC50YXJnZXQucGFyZW50XG4gICAgICAgICAgYm9hcmQudGFyZ2V0LnBhcmVudC5hY3RpdmUgPSBmYWxzZVxuICAgIGtleS5vbiBFdmVudHMuVG91Y2hFbmQsIC0+IGtleS5kb3duKClcbiAgICBrZXkub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+IGtleS51cCgpXG4gICAgcmV0dXJuIGtleVxuXG4gIERpc21pc3MgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBTcGVjaWFsS2V5IG9ialxuICAgIGtleS5pY29uID0gbmV3IEljb25cbiAgICAgIHN1cGVyTGF5ZXI6a2V5XG4gICAgICBpY29uOmlvcy51dGlscy5zdmcoaW9zLmFzc2V0cy5rZXlib2FyZClcbiAgICBrZXkuaWNvbi5zY2FsZSA9IC44XG4gICAga2V5Lmljb24uY29uc3RyYWludHMgPVxuICAgICAgYm90dG9tOjEyXG4gICAgICB0cmFpbGluZzoxMlxuICAgIGlvcy5sYXlvdXQuc2V0KGtleS5pY29uKVxuXG4gICAga2V5LmRvd24gPSAtPiBib2FyZC5kaXNtaXNzKClcbiAgICBrZXkudXAgPSAtPiBub3RoaW5nSGFwcGVucyA9IGZhbHNlXG4gICAga2V5Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT4ga2V5LmRvd24oKVxuICAgIHJldHVybiBrZXlcblxuICBUYWIgPSAob2JqKSAtPlxuICAgIGtleSA9IG5ldyBTcGVjaWFsS2V5IG9ialxuICAgIGtleS5odG1sID0gJ3RhYidcbiAgICBrZXkuc3R5bGUubGluZUhlaWdodCA9IGlvcy5weCg3MCkgKyAncHgnXG4gICAga2V5LnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0J1xuICAgIGtleS5zdHlsZS5wYWRkaW5nTGVmdCA9IGlvcy5weCgxMikgKyAncHgnXG4gICAgcmV0dXJuIGtleVxuXG4gIGJvYXJkLnN3aXRjaExldHRlcnMgPSAtPlxuICAgIHJvdzFCcmVhayA9IDEwXG4gICAgcm93MkJyZWFrID0gMTlcbiAgICBpZiBpb3MuaXNQYWQoKVxuICAgICAgbGV0dGVycy5wdXNoICchJ1xuICAgICAgbGV0dGVycy5wdXNoICc/J1xuICAgIGlmIGlvcy5kZXZpY2UubmFtZSA9PSBcImlwYWQtcHJvXCJcbiAgICAgIGxldHRlcnMgPSBbXCJxXCIsIFwid1wiLCBcImVcIiwgXCJyXCIsIFwidFwiLCBcInlcIiwgXCJ1XCIsIFwiaVwiLCBcIm9cIiwgXCJwXCIsIFwie1wiLCBcIn1cIiwgXCJcXHxcIiwgXCJhXCIsIFwic1wiLCBcImRcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJqXCIsIFwia1wiLCBcImxcIiwgXCI6XCIsIFwiJnJkcXVvO1wiLCBcInpcIiwgXCJ4XCIsIFwiY1wiLCBcInZcIiwgIFwiYlwiLCBcIm5cIiwgXCJtXCIsIFwiPFwiLCBcIj5cIiwgXCI/XCJdXG4gICAgICB0b3BMZXR0ZXJzID0gW1wiflwiLCBcIiFcIiwgXCJAXCIsIFwiI1wiLCBcIiRcIiwgXCIlXCIsIFwiXlwiLCBcIiZcIiwgXCIqXCIsIFwiKFwiLCBcIilcIiwgXCJfXCIsIFwiK1wiXVxuICAgICAgcm93MUJyZWFrID0gMTNcbiAgICAgIHJvdzJCcmVhayA9IDI0XG4gICAgZm9yIGwsIGkgaW4gbGV0dGVyc1xuICAgICAga2V5ID0gbmV3IExldHRlclxuICAgICAgICBuYW1lOmxcbiAgICAgICAgY29uc3RyYWludHM6XG4gICAgICAgICAgaGVpZ2h0OnNwZWNzLmxldHRlcktleS5oZWlnaHRcbiAgICAgICAgICB3aWR0aDpzcGVjcy5sZXR0ZXJLZXkud2lkdGhcbiAgICAgICAgbGV0dGVyOmxcbiAgICAgIGlmIGwgPT0gJ3cnIHx8IGwgPT0gJ3InIHx8IGwgPT0gJ3knIHx8IGwgPT0gJ2knIHx8IGwgPT0gJ3AnXG4gICAgICAgIGtleS5jb25zdHJhaW50cy53aWR0aCA9IGtleS5jb25zdHJhaW50cy53aWR0aCArIDFcbiAgICAgIGJvYXJkLmtleXNbbF0gPSBrZXlcbiAgICAgIGJvYXJkLmtleXNBcnJheS5wdXNoIGtleVxuICAgICAgaWYgaSA9PSAwXG4gICAgICAgIGtleS5jb25zdHJhaW50cy5sZWFkaW5nID0gc3BlY3Mucm93MS5sZWFkaW5nXG4gICAgICAgIGtleS5jb25zdHJhaW50cy50b3AgPSBzcGVjcy5yb3cxLnRvcFxuICAgICAgaWYgaSA+IDAgJiYgaSA8IHJvdzFCcmVha1xuICAgICAgICBrZXkuY29uc3RyYWludHMubGVhZGluZyA9IFtib2FyZC5rZXlzQXJyYXlbaSAtIDFdLCBzcGVjcy5zcGFjZV1cbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLnRvcCA9IHNwZWNzLnJvdzEudG9wXG4gICAgICBpZiBpID09IHJvdzFCcmVha1xuICAgICAgICBrZXkuY29uc3RyYWludHMubGVhZGluZyA9IHNwZWNzLnJvdzIubGVhZGluZ1xuICAgICAgICBrZXkuY29uc3RyYWludHMudG9wID0gW2JvYXJkLmtleXNBcnJheVswXSwgc3BlY3Mucm93Mi50b3BdXG4gICAgICBpZiBpID4gcm93MUJyZWFrICYmIGkgPCByb3cyQnJlYWtcbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBbYm9hcmQua2V5c0FycmF5W2kgLSAxXSwgc3BlY3Muc3BhY2VdXG4gICAgICAgIGtleS5jb25zdHJhaW50cy50b3AgPSBbYm9hcmQua2V5c0FycmF5WzBdLCBzcGVjcy5yb3cyLnRvcF1cbiAgICAgIGlmIGkgPT0gcm93MkJyZWFrXG4gICAgICAgIGtleS5jb25zdHJhaW50cy5sZWFkaW5nID0gc3BlY3Mucm93My5sZWFkaW5nXG4gICAgICAgIGtleS5jb25zdHJhaW50cy50b3AgPSBbYm9hcmQua2V5c0FycmF5W3JvdzFCcmVha10sIHNwZWNzLnJvdzMudG9wXVxuICAgICAgaWYgaSA+IHJvdzJCcmVha1xuICAgICAgICBrZXkuY29uc3RyYWludHMubGVhZGluZyA9IFtib2FyZC5rZXlzQXJyYXlbaSAtIDFdLCBzcGVjcy5zcGFjZV1cbiAgICAgICAga2V5LmNvbnN0cmFpbnRzLnRvcCA9IFtib2FyZC5rZXlzQXJyYXlbcm93MUJyZWFrXSwgc3BlY3Mucm93My50b3BdXG4gICAgICBpb3MubGF5b3V0LnNldChrZXkpXG5cbiAgICBib2FyZC5rZXlzLnNoaWZ0ID0gbmV3IFNoaWZ0XG4gICAgICBuYW1lOlwic2hpZnRcIlxuICAgICAgc2hpZnQ6c2V0dXAuc2hpZnRcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICB3aWR0aDpzcGVjcy5zcGVjaWFsS2V5V2lkdGhcbiAgICAgICAgYm90dG9tRWRnZXM6Ym9hcmQua2V5cy56XG5cbiAgICBib2FyZC5rZXlzLmRlbGV0ZSA9IG5ldyBEZWxldGVcbiAgICAgIG5hbWU6XCJkZWxldGVcIlxuICAgICAgY29uc3RyYWludHM6XG4gICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG4gICAgICAgIHdpZHRoOnNwZWNzLnNwZWNpYWxLZXlXaWR0aFxuICAgICAgICBib3R0b21FZGdlczpib2FyZC5rZXlzLnpcbiAgICAgICAgdHJhaWxpbmc6MFxuXG4gICAgYm9hcmQua2V5cy5udW1iZXJzID0gbmV3IE51bWJlcnNcbiAgICAgIG5hbWU6XCJudW1iZXJzXCJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICB3aWR0aDpzcGVjcy5zcGVjaWFsS2V5V2lkdGhcbiAgICAgICAgYm90dG9tOjBcbiAgICAgICAgbGVhZGluZzowXG5cbiAgICBib2FyZC5rZXlzLmVtb2ppID0gbmV3IEVtb2ppXG4gICAgICBuYW1lOlwiZW1vamlcIlxuICAgICAgY29uc3RyYWludHM6XG4gICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG4gICAgICAgIHdpZHRoOnNwZWNzLnNwZWNpYWxLZXlXaWR0aFxuICAgICAgICBsZWFkaW5nOltib2FyZC5rZXlzLm51bWJlcnMsIHNwZWNzLnNwYWNlXVxuICAgICAgICBib3R0b206MFxuXG4gICAgYm9hcmQua2V5cy5yZXR1cm4gPSBuZXcgUmV0dXJuXG4gICAgICBuYW1lOlwicmV0dXJuXCJcbiAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICBib3R0b206MFxuICAgICAgICB0cmFpbGluZzowXG4gICAgICAgIHdpZHRoOnNwZWNzLnJldHVybldpZHRoXG4gICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG5cbiAgICBib2FyZC5rZXlzLnNwYWNlID0gbmV3IFNwYWNlXG4gICAgICBuYW1lOlwic3BhY2VcIlxuICAgICAgbGV0dGVyOlwic3BhY2VcIlxuICAgICAgY29uc3RyYWludHM6XG4gICAgICAgIGxlYWRpbmc6W2JvYXJkLmtleXMuZW1vamksIHNwZWNzLnNwYWNlXVxuICAgICAgICB0cmFpbGluZzpbYm9hcmQua2V5cy5yZXR1cm4sIHNwZWNzLnNwYWNlXVxuICAgICAgICBib3R0b206MFxuICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuXG5cbiAgICBpZiBpb3MuaXNQYWQoKVxuICAgICAgYm9hcmQua2V5cy5yZXR1cm4uY29uc3RyYWludHMuYm90dG9tID0gdW5kZWZpbmVkXG4gICAgICBib2FyZC5rZXlzLnJldHVybi5jb25zdHJhaW50cy5ib3R0b21FZGdlcyA9IGJvYXJkLmtleXNBcnJheVtyb3cxQnJlYWtdXG4gICAgICBib2FyZC5rZXlzLmRlbGV0ZS5jb25zdHJhaW50cy50b3AgPSAwXG4gICAgICBib2FyZC5rZXlzLmRlbGV0ZS5jb25zdHJhaW50cy5ib3R0b21FZGdlcyA9IHVuZGVmaW5lZFxuICAgICAgYm9hcmQua2V5cy5kZWxldGUuY29uc3RyYWludHMud2lkdGggPSA2MVxuXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0ID0gbmV3IFNoaWZ0XG4gICAgICAgIG5hbWU6XCJzaGlmdGFsdFwiXG4gICAgICAgIHNoaWZ0OnNldHVwLnNoaWZ0XG4gICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG4gICAgICAgICAgd2lkdGg6NzZcbiAgICAgICAgICBib3R0b21FZGdlczpib2FyZC5rZXlzLnpcbiAgICAgICAgICB0cmFpbGluZzowXG5cbiAgICAgIGJvYXJkLmtleXMuZGlzbWlzcyA9IG5ldyBEaXNtaXNzXG4gICAgICAgIG5hbWU6XCJkaXNtaXNzXCJcbiAgICAgICAgY29uc3RyYWludHM6XG4gICAgICAgICAgaGVpZ2h0OnNwZWNzLnNwZWNpYWxLZXlIZWlnaHRcbiAgICAgICAgICB3aWR0aDpzcGVjcy5zcGVjaWFsS2V5V2lkdGhcbiAgICAgICAgICBib3R0b206MFxuICAgICAgICAgIHRyYWlsaW5nOjBcblxuICAgICAgYm9hcmQua2V5cy5udW1iZXJzYWx0ID0gbmV3IE51bWJlcnNcbiAgICAgICAgbmFtZTpcIm51bWJlcnNhbHRcIlxuICAgICAgICBjb25zdHJhaW50czpcbiAgICAgICAgICBoZWlnaHQ6c3BlY3Muc3BlY2lhbEtleUhlaWdodFxuICAgICAgICAgIHdpZHRoOjkzXG4gICAgICAgICAgYm90dG9tOjBcbiAgICAgICAgICB0cmFpbGluZzpbYm9hcmQua2V5cy5kaXNtaXNzLCBzcGVjcy5zcGFjZV1cblxuICAgICAgYm9hcmQua2V5cy5zcGFjZS5odG1sID0gXCJcIlxuICAgICAgYm9hcmQua2V5cy5zcGFjZS5jb25zdHJhaW50cy50cmFpbGluZyA9IFtib2FyZC5rZXlzLm51bWJlcnNhbHQsIHNwZWNzLnNwYWNlXVxuXG4gICAgICBpb3MubGF5b3V0LnNldCgpXG4gICAgYm9hcmQudG9wUm93ID0gW11cbiAgICBpZiBpb3MuZGV2aWNlLm5hbWUgPT0gJ2lwYWQtcHJvJ1xuICAgICAgZm9yIGwsaSBpbiB0b3BMZXR0ZXJzXG4gICAgICAgICAgdG9wS2V5ID0gbmV3IExldHRlclxuICAgICAgICAgICAgbGV0dGVyOmxcbiAgICAgICAgICAgIG5hbWU6bFxuICAgICAgICAgICAgY29uc3RyYWludHM6XG4gICAgICAgICAgICAgIGhlaWdodDo0NlxuICAgICAgICAgICAgICB3aWR0aDo2M1xuICAgICAgICAgICAgICB0b3A6MFxuICAgICAgICAgIGlmIGkgPT0gMFxuICAgICAgICAgICAgdG9wS2V5LmNvbnN0cmFpbnRzLmxlYWRpbmcgPSAwXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdG9wS2V5LmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBbYm9hcmQudG9wUm93W2kgLSAxXSwgc3BlY3Muc3BhY2VdXG4gICAgICAgICAgdG9wS2V5LnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNDYpICsgJ3B4J1xuICAgICAgICAgIGlvcy5sYXlvdXQuc2V0KHRvcEtleSlcbiAgICAgICAgICBib2FyZC50b3BSb3cucHVzaCB0b3BLZXlcbiAgICAgICAgICBib2FyZC5rZXlzQXJyYXkucHVzaCB0b3BLZXlcbiAgICAgICAgICBib2FyZC5rZXlzW2xdID0gdG9wS2V5XG5cbiAgICAgIGJvYXJkLmtleXMuZGVsZXRlLmljb24uZGVzdHJveSgpXG4gICAgICBib2FyZC5rZXlzLmRlbGV0ZS5odG1sID0gJ2RlbGV0ZSdcbiAgICAgIGJvYXJkLmtleXMuZGVsZXRlLnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNTMpICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5kZWxldGUuc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0J1xuICAgICAgYm9hcmQua2V5cy5kZWxldGUuc3R5bGUucGFkZGluZ1JpZ2h0ID0gaW9zLnB4KDEyKSArICdweCdcbiAgICAgIGJvYXJkLmtleXMuZGVsZXRlLmNvbnN0cmFpbnRzID1cbiAgICAgICAgdG9wOjBcbiAgICAgICAgdHJhaWxpbmc6MFxuICAgICAgICBoZWlnaHQ6NDZcbiAgICAgICAgd2lkdGg6MTA2XG5cbiAgICAgIGJvYXJkLmtleXMuc2hpZnQuaWNvbi5kZXN0cm95KClcbiAgICAgIGJvYXJkLmtleXMuc2hpZnQuaHRtbCA9ICdzaGlmdCdcbiAgICAgIGJvYXJkLmtleXMuc2hpZnQuc3R5bGUubGluZUhlaWdodCA9IGlvcy5weCg3MCkgKyAncHgnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0LnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0J1xuICAgICAgYm9hcmQua2V5cy5zaGlmdC5zdHlsZS5wYWRkaW5nTGVmdCA9IGlvcy5weCgxMikgKyAncHgnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0LmNvbnN0cmFpbnRzLndpZHRoID0gMTU0XG5cbiAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaWNvbi5kZXN0cm95KClcbiAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuaHRtbCA9ICdzaGlmdCdcbiAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuc3R5bGUubGluZUhlaWdodCA9IGlvcy5weCg3MCkgKyAncHgnXG4gICAgICBib2FyZC5rZXlzLnNoaWZ0YWx0LnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCdcbiAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gaW9zLnB4KDEyKSArICdweCdcbiAgICAgIGJvYXJkLmtleXMuc2hpZnRhbHQuY29uc3RyYWludHMud2lkdGggPSAxNTVcblxuICAgICAgYm9hcmQua2V5cy5lbW9qaS5pY29uLmNvbnN0cmFpbnRzID0ge2xlYWRpbmc6MTUsIGJvdHRvbToxMX1cbiAgICAgIGJvYXJkLmtleXMuZW1vamkuY29uc3RyYWludHMgPVxuICAgICAgICB3aWR0aDoxNDRcbiAgICAgICAgaGVpZ2h0OjYxXG4gICAgICAgIGxlYWRpbmc6MFxuICAgICAgICBib3R0b206MFxuICAgICAgaW9zLmxheW91dC5zZXQoKVxuXG4gICAgICBib2FyZC5rZXlzLm51bWJlcnNhbHQuY29uc3RyYWludHMud2lkdGggPSA5M1xuICAgICAgYm9hcmQua2V5cy5kaXNtaXNzLmNvbnN0cmFpbnRzLndpZHRoID0gOTNcblxuICAgICAgYm9hcmQua2V5cy5jb20gPSBuZXcgTGV0dGVyXG4gICAgICAgIG5hbWU6Jy5jb20nXG4gICAgICAgIGxldHRlcjonLmNvbSdcbiAgICAgICAgY29uc3RyYWludHM6XG4gICAgICAgICAgaGVpZ2h0OnNwZWNzLmxldHRlcktleS5oZWlnaHRcbiAgICAgICAgICB3aWR0aDpzcGVjcy5sZXR0ZXJLZXkud2lkdGhcbiAgICAgICAgICBib3R0b206MFxuICAgICAgICAgIHRyYWlsaW5nOltib2FyZC5rZXlzLm51bWJlcnNhbHQsIHNwZWNzLnNwYWNlXVxuXG4gICAgICBib2FyZC5rZXlzLmNvbS5zdHlsZS5mb250U2l6ZSA9IGlvcy5weCgxNikgKyAncHgnXG5cbiAgICAgIGJvYXJkLmtleXMubnVtYmVycy5jb25zdHJhaW50cyA9XG4gICAgICAgIHdpZHRoOjE0M1xuICAgICAgICBoZWlnaHQ6NjFcbiAgICAgICAgbGVhZGluZzpbYm9hcmQua2V5cy5lbW9qaSwgc3BlY3Muc3BhY2VdXG4gICAgICBib2FyZC5rZXlzLm51bWJlcnMuc3R5bGUubGluZUhlaWdodCA9IGlvcy5weCg3MCkgKyAncHgnXG4gICAgICBib2FyZC5rZXlzLm51bWJlcnMuc3R5bGUudGV4dEFsaWduID0gJ2xlZnQnXG4gICAgICBib2FyZC5rZXlzLm51bWJlcnMuc3R5bGUucGFkZGluZ0xlZnQgPSBpb3MucHgoMTIpICsgJ3B4J1xuXG5cbiAgICAgIGJvYXJkLmtleXMucmV0dXJuLnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNzApICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5yZXR1cm4uc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0J1xuICAgICAgYm9hcmQua2V5cy5yZXR1cm4uc3R5bGUucGFkZGluZ1JpZ2h0ID0gaW9zLnB4KDEyKSArICdweCdcblxuXG4gICAgICBib2FyZC5rZXlzLnNwYWNlLmNvbnN0cmFpbnRzLmxlYWRpbmcgPSBbYm9hcmQua2V5cy5udW1iZXJzLCBzcGVjcy5zcGFjZV1cbiAgICAgIGJvYXJkLmtleXMuc3BhY2UuY29uc3RyYWludHMudHJhaWxpbmcgPSBbYm9hcmQua2V5cy5jb20sIHNwZWNzLnNwYWNlXVxuXG5cbiAgICAgIGJvYXJkLmtleXMuY2FwcyA9IG5ldyBTaGlmdFxuICAgICAgICBuYW1lOidjYXBzJ1xuICAgICAgICBjYXBzOiB0cnVlXG4gICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG4gICAgICAgICAgd2lkdGg6MTE5XG4gICAgICAgICAgYm90dG9tRWRnZXM6Ym9hcmQua2V5c0FycmF5W3JvdzFCcmVha11cbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5pY29uLmRlc3Ryb3koKVxuICAgICAgYm9hcmQua2V5cy5jYXBzLmh0bWwgPSAnY2FwcyBsb2NrJ1xuICAgICAgYm9hcmQua2V5cy5jYXBzLnN0eWxlLmxpbmVIZWlnaHQgPSBpb3MucHgoNzApICsgJ3B4J1xuICAgICAgYm9hcmQua2V5cy5jYXBzLnN0eWxlLnRleHRBbGlnbiA9ICdsZWZ0J1xuICAgICAgYm9hcmQua2V5cy5jYXBzLnN0eWxlLnBhZGRpbmdMZWZ0ID0gaW9zLnB4KDEyKSArICdweCdcblxuXG5cbiAgICAgIGJvYXJkLmtleXMuY2Fwcy5kb3duID0gLT5cbiAgICAgICAgaWYgYm9hcmQuaXNDYXBzTG9ja1xuICAgICAgICAgIGJvYXJkLmlzQ2Fwc0xvY2sgPSBmYWxzZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgYm9hcmQuY2Fwc0xvY2soKVxuICAgICAgYm9hcmQua2V5cy5jYXBzLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgYm9hcmQua2V5cy5jYXBzLmRvd24oKVxuICAgICAgYm9hcmQua2V5cy5jYXBzLnVwID0gLT5cbiAgICAgICAgbm90aGluZ0hhcHBlbnMgPSB0cnVlXG5cbiAgICAgIGJvYXJkLmtleXMudGFiID0gbmV3IFRhYlxuICAgICAgICBuYW1lOid0YWInXG4gICAgICAgIGNvbnN0cmFpbnRzOlxuICAgICAgICAgIGhlaWdodDpzcGVjcy5zcGVjaWFsS2V5SGVpZ2h0XG4gICAgICAgICAgd2lkdGg6MTA2XG4gICAgICAgICAgYm90dG9tRWRnZXM6Ym9hcmQua2V5c0FycmF5WzBdXG5cbiAgICAgIGlvcy5sYXlvdXQuc2V0KClcbiAgaWYgaW9zLmlzUGhvbmUoKVxuICAgIHBvcFVwID0gaW9zLnV0aWxzLnN2Zyhpb3MuYXNzZXRzLmtleVBvcFVwW3NldHVwLnN0eWxlXVtpb3MuZGV2aWNlLm5hbWVdKVxuICAgIGJvYXJkLnBvcFVwID0gbmV3IExheWVyXG4gICAgICBoZWlnaHQ6cG9wVXAuaGVpZ2h0XG4gICAgICB3aWR0aDpwb3BVcC53aWR0aFxuICAgICAgYmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCdcbiAgICAgIG5hbWU6Jy5wb3BVcCdcbiAgICAgIHN1cGVyTGF5ZXI6Ym9hcmQuYXJlYVxuICAgICAgdmlzaWJsZTpmYWxzZVxuXG4gICAgYm9hcmQucG9wVXAuc3ZnID0gbmV3IExheWVyXG4gICAgICBodG1sOnBvcFVwLnN2Z1xuICAgICAgaGVpZ2h0OnBvcFVwLmhlaWdodFxuICAgICAgd2lkdGg6cG9wVXAud2lkdGhcbiAgICAgIHN1cGVyTGF5ZXI6Ym9hcmQucG9wVXBcbiAgICAgIG5hbWU6Jy5zdmcnXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50J1xuXG4gICAgYm9hcmQucG9wVXAudGV4dCA9IG5ldyBpb3MuVGV4dFxuICAgICAgdGV4dDonQSdcbiAgICAgIHN1cGVyTGF5ZXI6Ym9hcmQucG9wVXBcbiAgICAgIGZvbnRTaXplOnNwZWNzLnBvcFVwQ2hhclxuICAgICAgZm9udFdlaWdodDozMDBcbiAgICAgIGNvbG9yOmNvbG9ycy5jb2xvclxuICAgICAgdGV4dEFsaWduOidjZW50ZXInXG4gICAgICBjb25zdHJhaW50czpcbiAgICAgICAgYWxpZ246J2hvcml6b250YWwnXG4gICAgICAgIHRvcDpzcGVjcy5wb3BVcFRvcFxuICAgICAgICB3aWR0aDppb3MucHQocG9wVXAud2lkdGgpXG5cbiAgICBib2FyZC5wb3BVcC5jZW50ZXIoKVxuICAgIHN3aXRjaCBpb3MuZGV2aWNlLm5hbWVcbiAgICAgIHdoZW4gJ2lwaG9uZS02cy1wbHVzJ1xuICAgICAgICBib2FyZC5wb3BVcC53aWR0aCA9IGJvYXJkLnBvcFVwLndpZHRoIC0gMThcbiAgICAgICAgYm9hcmQucG9wVXAuaGVpZ2h0ID0gYm9hcmQucG9wVXAuaGVpZ2h0IC0gMjRcbiAgICAgICAgYm9hcmQucG9wVXAuc3ZnLnggPSBpb3MucHgoLTMpXG4gICAgICAgIGJvYXJkLnBvcFVwLnN2Zy55ID0gaW9zLnB4KC0zKVxuICAgICAgd2hlbiAnaXBob25lLTZzJ1xuICAgICAgICBib2FyZC5wb3BVcC53aWR0aCA9IGJvYXJkLnBvcFVwLndpZHRoIC0gMTJcbiAgICAgICAgYm9hcmQucG9wVXAuaGVpZ2h0ID0gYm9hcmQucG9wVXAuaGVpZ2h0IC0gMTJcbiAgICAgICAgYm9hcmQucG9wVXAuc3ZnLnggPSBpb3MucHgoLTMpXG4gICAgICAgIGJvYXJkLnBvcFVwLnN2Zy55ID0gaW9zLnB4KC0yKVxuICAgICAgd2hlbiAnaXBob25lLTUnXG4gICAgICAgIGJvYXJkLnBvcFVwLndpZHRoID0gYm9hcmQucG9wVXAud2lkdGggLSAxMlxuICAgICAgICBib2FyZC5wb3BVcC5oZWlnaHQgPSBib2FyZC5wb3BVcC5oZWlnaHQgLSAxMlxuICAgICAgICBib2FyZC5wb3BVcC5zdmcueCA9IGlvcy5weCgtMylcbiAgICAgICAgYm9hcmQucG9wVXAuc3ZnLnkgPSBpb3MucHgoLTIpXG5cbiAgICBjYXBpdGFsaXplS2V5cygpXG4gIGJvYXJkLnN3aXRjaCA9IChzdGF0ZSkgLT5cbiAgICBzd2l0Y2ggc3RhdGVcbiAgICAgIHdoZW4gXCJsZXR0ZXJzXCJcbiAgICAgICAgYm9hcmQuc3dpdGNoTGV0dGVycygpXG5cbiAgYm9hcmQuc3dpdGNoKFwibGV0dGVyc1wiKVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2tleWRvd24nLCAoZSkgLT5cbiAgICBpZiBhcnJheU9mQ29kZXMuaW5kZXhPZihlLmtleUNvZGUudG9TdHJpbmcoKSkgIT0gLTFcbiAgICAgIGtleSA9IGJvYXJkLmtleXNbY29kZU1hcFtlLmtleUNvZGVdLnRvTG93ZXJDYXNlKCldXG4gICAgICBpZiBrZXkgdGhlbiBrZXkuZG93bigpXG4gICAgICBpZiBpb3MuaXNQYWQoKVxuICAgICAgICBpZiBrZXkgPT0gYm9hcmQua2V5cy5zaGlmdCB8fCBrZXkgPT0gYm9hcmQua2V5cy5zaGlmdGFsdFxuICAgICAgICAgIGJvYXJkLmtleXMuc2hpZnQuZG93bigpXG4gICAgICAgICAgYm9hcmQua2V5cy5zaGlmdGFsdC5pY29uLnRvZ2dsZSgnb24nKVxuICAgICAgICAgIGhhbmRsZUtleUNvbG9yKGJvYXJkLmtleXMuc2hpZnRhbHQpXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2tleXVwJywgKGUpIC0+XG4gICAgaWYgYXJyYXlPZkNvZGVzLmluZGV4T2YoZS5rZXlDb2RlLnRvU3RyaW5nKCkpICE9IC0xXG4gICAgICBrZXkgPSBib2FyZC5rZXlzW2NvZGVNYXBbZS5rZXlDb2RlXS50b0xvd2VyQ2FzZSgpXVxuICAgICAgaWYga2V5IHRoZW4ga2V5LnVwKClcbiAgICAgIGlmIGlvcy5pc1BhZCgpXG4gICAgICAgIGlmIGtleSA9PSBib2FyZC5rZXlzLnNoaWZ0IHx8IGtleSA9PSBib2FyZC5rZXlzLnNoaWZ0YWx0XG4gICAgICAgICAgYm9hcmQua2V5cy5zaGlmdC51cCgpXG4gICAgICAgICAgYm9hcmQua2V5cy5zaGlmdGFsdC5pY29uLnRvZ2dsZSgnb2ZmJylcbiAgICAgICAgICBoYW5kbGVLZXlDb2xvcihib2FyZC5rZXlzLnNoaWZ0YWx0KVxuICBjYXBpdGFsaXplS2V5cygpXG4gIHJldHVybiBib2FyZFxuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9XG5cdG5hbWU6J2ZpZWxkJ1xuXHRhY3RpdmU6ZmFsc2Vcblx0a2V5Ym9hcmQ6dHJ1ZVxuXHRwbGFjZWhvbGRlcjpcIkVudGVyIHRleHRcIlxuXHRwbGFjZWhvbGRlckNvbG9yOlwiIzk5OVwiXG5cdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0Ym9yZGVyQ29sb3I6XCIjQ0NDQ0NDXCJcblx0Ym9yZGVyUmFkaXVzOmlvcy5weCg1KVxuXHRib3JkZXJXaWR0aDppb3MucHgoMSlcblx0aGVpZ2h0Omlvcy5weCgzMClcblx0d2lkdGg6aW9zLnB4KDk3KVxuXHRmb250U2l6ZToxN1xuXHRjb2xvcjonYmxhY2snXG5cdHRleHRDb25zdHJhaW50czpcblx0XHRsZWFkaW5nOjRcblx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblx0Y29uc3RyYWludHM6XG5cdFx0aGVpZ2h0OjMwXG5cdFx0d2lkdGg6OTdcblx0XHRhbGlnbjpcImNlbnRlclwiXG5cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRmaWVsZCA9IG5ldyBpb3MuVmlld1xuXHRcdG5hbWU6c2V0dXAubmFtZVxuXHRcdGNvbnN0cmFpbnRzOnNldHVwLmNvbnN0cmFpbnRzXG5cdFx0YmFja2dyb3VuZENvbG9yOnNldHVwLmJhY2tncm91bmRDb2xvclxuXHRcdGJvcmRlckNvbG9yOnNldHVwLmJvcmRlckNvbG9yXG5cdFx0Ym9yZGVyUmFkaXVzOnNldHVwLmJvcmRlclJhZGl1c1xuXHRcdGJvcmRlcldpZHRoOnNldHVwLmJvcmRlcldpZHRoXG5cdFx0aGVpZ2h0OnNldHVwLmhlaWdodFxuXHRcdHdpZHRoOnNldHVwLndpZHRoXG5cdFx0Y2xpcDp0cnVlXG5cdFx0c3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG5cblx0ZmllbGQudGV4dCA9IG5ldyBpb3MuVGV4dFxuXHRcdHN1cGVyTGF5ZXI6ZmllbGRcblx0XHRuYW1lOlwiLnRleHRcIlxuXHRcdGNvbnN0cmFpbnRzOnNldHVwLnRleHRDb25zdHJhaW50c1xuXHRcdHRleHQ6Jydcblx0XHRmb250U2l6ZToxN1xuXHRcdGNvbG9yOnNldHVwLmNvbG9yXG5cblx0ZmllbGQudGV4dC5wbGFjZWhvbGRlciA9IG5ldyBpb3MuVGV4dFxuXHRcdHN1cGVyTGF5ZXI6ZmllbGRcblx0XHRuYW1lOlwiLnBsYWNlaG9sZGVyXCJcblx0XHRjb25zdHJhaW50czpzZXR1cC50ZXh0Q29uc3RyYWludHNcblx0XHR0ZXh0OnNldHVwLnBsYWNlaG9sZGVyXG5cdFx0Zm9udFNpemU6MTdcblx0XHRjb2xvcjpzZXR1cC5wbGFjZWhvbGRlckNvbG9yXG5cblx0ZmllbGQuYWN0aXZlID0gc2V0dXAuYWN0aXZlXG5cdGZpZWxkLnR5cGUgPSAnZmllbGQnXG5cblx0ZmllbGQub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXG5cdFx0aWYgZmllbGQuYWN0aXZlICE9IHRydWVcblx0XHRcdGZpZWxkLmFjdGl2ZSA9IHRydWVcblxuXHRcdFx0aWYgc2V0dXAua2V5Ym9hcmQgPT0gdHJ1ZSAmJiBmaWVsZC5rZXlib2FyZCA9PSB1bmRlZmluZWRcblx0XHRcdFx0ZmllbGQua2V5Ym9hcmQgPSBuZXcgaW9zLktleWJvYXJkXG5cdFx0XHRcdFx0b3V0cHV0OmZpZWxkLnRleHRcblx0XHRcdFx0XHRoaWRkZW46dHJ1ZVxuXG5cdFx0XHRpZiB0eXBlb2Ygc2V0dXAua2V5Ym9hcmQgPT0gJ29iamVjdCdcblx0XHRcdFx0ZmllbGQuaW5wdXQoc2V0dXAua2V5Ym9hcmQpXG5cdFx0XHRcdGZpZWxkLmtleWJvYXJkID0gc2V0dXAua2V5Ym9hcmRcblxuXHRcdFx0ZmllbGQua2V5Ym9hcmQuY2FsbCgpXG5cdFx0XHRmaWVsZC50ZXh0LmN1cnNvciA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRzdXBlckxheWVyOmZpZWxkXG5cdFx0XHRcdG5hbWU6XCJjdXJzb3JcIlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6aW9zLmNvbG9yKFwiYmx1ZVwiKVxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHR3aWR0aDoyXG5cdFx0XHRcdFx0aGVpZ2h0OnNldHVwLmZvbnRTaXplICsgNlxuXHRcdFx0XHRcdGxlYWRpbmc6NFxuXHRcdFx0XHRcdGFsaWduOlwidmVydGljYWxcIlxuXG5cdFx0XHRpZiBmaWVsZC50ZXh0Lmh0bWwgIT0gc2V0dXAucGxhY2Vob2xkZXJcblx0XHRcdFx0ZmllbGQudGV4dC5jdXJzb3IuY29uc3RyYWludHMubGVhZGluZyA9IGZpZWxkLnRleHRcblx0XHRcdFx0aW9zLmxheW91dC5zZXQoZmllbGQudGV4dC5jdXJzb3IpXG5cdFx0XHRmaWVsZC5saXN0ZW5pbmdUb0ZpZWxkID0gVXRpbHMuaW50ZXJ2YWwgLjEsIC0+XG5cdFx0XHRcdGlmIGZpZWxkLmFjdGl2ZSA9PSBmYWxzZVxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoZmllbGQuaW50ZXJ2YWwpXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChmaWVsZC5saXN0ZW5pbmdUb0ZpZWxkKVxuXHRcdFx0XHRcdGZpZWxkLnRleHQuY3Vyc29yLmRlc3Ryb3koKVxuXG5cblx0XHRcdGZpZWxkLmludGVydmFsID0gVXRpbHMuaW50ZXJ2YWwgLjYsIC0+XG5cdFx0XHRcdGlmIGZpZWxkLmFjdGl2ZVxuXHRcdFx0XHRcdGlmIGZpZWxkLnRleHQuY3Vyc29yLm9wYWNpdHlcblx0XHRcdFx0XHRcdGZpZWxkLnRleHQuY3Vyc29yLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0cHJvcGVydGllczoob3BhY2l0eTowKVxuXHRcdFx0XHRcdFx0XHR0aW1lOi41XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0ZmllbGQudGV4dC5jdXJzb3IuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5OjEpXG5cdFx0XHRcdFx0XHRcdHRpbWU6LjVcblxuXG5cdFx0XHRmaWVsZC50ZXh0Lm9uIFwiY2hhbmdlOmh0bWxcIiwgLT5cblx0XHRcdFx0QC5jdXJzb3IuY29uc3RyYWludHMubGVhZGluZyA9IEBcblx0XHRcdFx0aWYgQC5odG1sID09ICcnXG5cdFx0XHRcdFx0QC5wbGFjZWhvbGRlci52aXNpYmxlID0gdHJ1ZVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0QC5wbGFjZWhvbGRlci52aXNpYmxlID0gZmFsc2Vcblx0XHRcdFx0aWYgQC5odG1sLmluZGV4T2YoQC5wbGFjZWhvbGRlcikgIT0gLTFcblx0XHRcdFx0XHRALmh0bWwgPSBALmh0bWwucmVwbGFjZShALnBsYWNlaG9sZGVyLCAnJylcblxuXHRcdFx0XHRpb3MubGF5b3V0LnNldChALmN1cnNvcilcblxuXHRmaWVsZC5pbnB1dCA9IChrZXlib2FyZCkgLT5cblx0XHRrZXlib2FyZC5vdXRwdXQoZmllbGQpXG5cblx0cmV0dXJuIGZpZWxkXG4iLCJpb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5nZW5DU1MgPSAoY3NzQXJyYXkpIC0+XG4gIGNzc09iaiA9IHt9XG4gIGZvciBwcm9wLGkgaW4gY3NzQXJyYXlcbiAgICBjb2xvbkluZGV4ID0gcHJvcC5pbmRleE9mKFwiOlwiKVxuICAgIGtleSA9IHByb3Auc2xpY2UoMCwgY29sb25JbmRleClcbiAgICB2YWx1ZSA9IHByb3Auc2xpY2UoY29sb25JbmRleCArIDIsIHByb3AubGVuZ3RoIC0gMSlcbiAgICBjc3NPYmpba2V5XSA9IHZhbHVlXG4gIHJldHVybiBjc3NPYmpcblxuZXhwb3J0cy5jb252ZXJ0ID0gKG9iaikgLT5cblxuICBnZXREZXNpZ25lZERldmljZSA9ICh3KSAtPlxuICAgIGRldmljZSA9IHt9XG4gICAgc3dpdGNoIHdcbiAgICAgIHdoZW4gMzIwLCA0ODAsIDY0MCwgOTYwLCAxMjgwXG4gICAgICAgIGRldmljZS5zY2FsZSA9IDJcbiAgICAgICAgZGV2aWNlLmhlaWdodCA9IDU2OFxuICAgICAgICBkZXZpY2Uud2lkdGggPSAzMjBcbiAgICAgICAgZGV2aWNlLm5hbWUgPSAnaXBob25lLTUnXG4gICAgICB3aGVuIDM3NSwgNTYyLjUsIDc1MCwgMTEyNSwgMTUwMFxuICAgICAgICBkZXZpY2Uuc2NhbGUgPSAyXG4gICAgICAgIGRldmljZS5oZWlnaHQgPSA2NjdcbiAgICAgICAgZGV2aWNlLndpZHRoID0gMzc1XG4gICAgICAgIGRldmljZS5uYW1lID0gJ2lwaG9uZS02cydcbiAgICAgIHdoZW4gNDE0LCA2MjEsIDgyOCwgMTI0MiwgMTY1NlxuICAgICAgICBkZXZpY2Uuc2NhbGUgPSAzXG4gICAgICAgIGRldmljZS5oZWlnaHQgPSA3MzZcbiAgICAgICAgZGV2aWNlLndpZHRoID0gNDE0XG4gICAgICAgIGRldmljZS5uYW1lID0gJ2lwaG9uZS02cy1wbHVzJ1xuICAgICAgd2hlbiA3NjgsIDExNTIsIDE1MzYsIDIzMDQsIDMwNzJcbiAgICAgICAgZGV2aWNlLnNjYWxlID0gMlxuICAgICAgICBkZXZpY2UuaGVpZ2h0ID0gMTAyNFxuICAgICAgICBkZXZpY2Uud2lkdGggPSA3NjhcbiAgICAgICAgZGV2aWNlLm5hbWUgPSAnaXBhZCdcbiAgICAgIHdoZW4gMTAyNCwgMTUzNiwgMjA0OCwgMzA3MiwgNDA5NlxuICAgICAgICBkZXZpY2Uuc2NhbGUgPSAyXG4gICAgICAgIGRldmljZS5oZWlnaHQgPSAxMzY2XG4gICAgICAgIGRldmljZS53aWR0aCA9IDEwMjRcbiAgICAgICAgZGV2aWNlLm5hbWUgPSAnaXBhZC1wcm8nXG4gICAgc3dpdGNoIHdcbiAgICAgIHdoZW4gMzIwLCAzNzUsIDQxNCwgNzY4LCAxMDI0XG4gICAgICAgIGRldmljZS5pU2NhbGUgPSAxXG4gICAgICB3aGVuIDQ4MCwgNTYyLjUsIDYyMSwgMTE1MiwgMTUzNlxuICAgICAgICBkZXZpY2UuaVNjYWxlID0gMS41XG4gICAgICB3aGVuIDY0MCwgNzUwLCA4MjgsIDE1MzYsIDIwNDhcbiAgICAgICAgZGV2aWNlLmlTY2FsZSA9IDJcbiAgICAgIHdoZW4gOTYwLCAxMTI1LCAxMjQyLCAyMzA0LCAzMDcyXG4gICAgICAgIGRldmljZS5pU2NhbGUgPSAzXG4gICAgICB3aGVuIDEyODAsIDE1MDAsIDE2NTYsIDMwNzIsIDQwOTZcbiAgICAgICAgZGV2aWNlLmlTY2FsZSA9IDRcbiAgICBkZXZpY2Uub2JqID0gJ2RldmljZSdcbiAgICByZXR1cm4gZGV2aWNlXG5cbiAgIyBHcmFiIGtleXNcbiAgbGF5ZXJLZXlzID0gT2JqZWN0LmtleXMob2JqKVxuXG4gICMgQWRkIGxheWVycyBpbiBvYmogdG8gYXJyYXkgdXNpbmcga2V5c1xuICBsYXllcnMgPSBbXVxuICBhcnRib2FyZHMgPSBbXVxuICBuZXdMYXllcnMgPSB7fVxuICBuZXdBcnRib2FyZHMgPSBbXVxuXG4gIGZvciBrZXkgaW4gbGF5ZXJLZXlzXG4gICAgaWYgb2JqW2tleV0uX2luZm8ua2luZCA9PSAnYXJ0Ym9hcmQnXG4gICAgICBhcnRib2FyZHMucHVzaCBvYmpba2V5XVxuXG4gIGZvciBiIGluIGFydGJvYXJkc1xuXG4gICAgZGV2aWNlID0gZ2V0RGVzaWduZWREZXZpY2UoYi53aWR0aClcblxuICAgIEFydGJvYXJkID0gKGFydGJvYXJkKSAtPlxuICAgICAgYm9hcmQgPSBuZXcgaW9zLlZpZXdcbiAgICAgICAgbmFtZTphcnRib2FyZC5uYW1lXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjpiLmJhY2tncm91bmRDb2xvclxuICAgICAgICBjb25zdHJhaW50czoge3RvcDowLCBib3R0b206MCwgbGVhZGluZzowLCB0cmFpbGluZzowfVxuICAgICAgcmV0dXJuIGJvYXJkXG5cbiAgICAjR2V0IFN0YXRlbWVudHNcbiAgICBnZXRTdHJpbmcgPSAobCkgLT4gcmV0dXJuIGwuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG4gICAgZ2V0Q1NTID0gKGwpIC0+IHJldHVybiBnZW5DU1MobC5faW5mby5tZXRhZGF0YS5jc3MpXG4gICAgZ2V0Q29sb3JTdHJpbmcgPSAobCkgLT4gcmV0dXJuICctJyArIGdldENTUyhsKS5jb2xvciArICcgJyArIGdldFN0cmluZyhsKVxuICAgIGdldEltYWdlID0gKGwpIC0+IHJldHVybiBsLmltYWdlXG4gICAgZ2V0TGF5ZXIgPSAobCkgLT4gcmV0dXJuIGwuY29weSgpXG5cblxuICAgIGZvdW5kID0gKG8sdCkgLT4gaWYgby5pbmRleE9mKHQpICE9IC0xIHRoZW4gcmV0dXJuIHRydWVcblxuICAgIGdlbkNvbnN0cmFpbnRzID0gKGwpIC0+XG4gICAgICBjb25zdHJhaW50cyA9IHt9XG4gICAgICBzID0gZGV2aWNlLmlTY2FsZVxuICAgICAgY1ggPSBkZXZpY2Uud2lkdGgvMlxuICAgICAgY1kgPSBkZXZpY2UuaGVpZ2h0LzJcbiAgICAgIHRZID0gZGV2aWNlLmhlaWdodC80ICogM1xuICAgICAgYlkgPSBkZXZpY2UuaGVpZ2h0LzQgKiAzXG4gICAgICBsWCA9IGRldmljZS53aWR0aC80ICogM1xuICAgICAgdFggPSBkZXZpY2Uud2lkdGgvNCAqIDNcblxuICAgICAgciA9IChuKSAtPiByZXR1cm4gTWF0aC5yb3VuZChuKVxuICAgICAgZiA9IChuKSAtPiByZXR1cm4gTWF0aC5mbG9vcihuKVxuXG4gICAgICBpZiBjWCA9PSBsLm1pZFgvcyB8fCByKGNYKSA9PSByKGwubWlkWC9zKSAgfHwgZihjWCkgPT0gZihsLm1pZFgvcylcbiAgICAgICAgY29uc3RyYWludHMuYWxpZ24gPSAnaG9yaXpvbnRhbCdcblxuICAgICAgaWYgY1kgPT0gbC5taWRZL3MgfHwgcihjWSkgPT0gcihsLm1pZFkvcykgfHwgZihjWSkgPT0gZihsLm1pZFkvcylcbiAgICAgICAgaWYgY29uc3RyYWludHMuYWxpZ24gPT0gJ2hvcml6b250YWwnXG4gICAgICAgICAgY29uc3RyYWludHMuYWxpZ24gPSAnY2VudGVyJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgY29uc3RyYWludHMuYWxpZ24gPSAndmVydGljYWwnXG5cbiAgICAgIGlmIGwueC9zIDwgbFhcbiAgICAgICAgY29uc3RyYWludHMubGVhZGluZyA9IHIobC54L3MpXG4gICAgICBpZiBsLngvcyA+IHRYXG4gICAgICAgIGNvbnN0cmFpbnRzLnRyYWlsaW5nID0gcihsLnBhcmVudC53aWR0aC9zIC0gbC5tYXhYL3MpXG5cbiAgICAgIGlmIGwueS9zIDwgdFlcbiAgICAgICAgY29uc3RyYWludHMudG9wID0gcihsLnkvcylcbiAgICAgIGlmIGwueS9zID4gYllcbiAgICAgICAgY29uc3RyYWludHMuYm90dG9tID0gcihsLnBhcmVudC5oZWlnaHQvcyAtIGwubWF4WS9zKVxuXG4gICAgICBpZiBsLndpZHRoL3MgPT0gZGV2aWNlLndpZHRoXG4gICAgICAgIGNvbnN0cmFpbnRzLmxlYWRpbmcgPSAwXG4gICAgICAgIGNvbnN0cmFpbnRzLnRyYWlsaW5nID0gMFxuICAgICAgZWxzZVxuICAgICAgICBjb25zdHJhaW50cy53aWR0aCA9IGwud2lkdGgvc1xuXG4gICAgICBpZiBsLmhlaWdodC9zID09IGRldmljZS5oZWlnaHRcbiAgICAgICAgY29uc3RyYWludHMudG9wID0gMFxuICAgICAgICBjb25zdHJhaW50cy5ib3R0b20gPSAwXG4gICAgICBlbHNlXG4gICAgICAgIGNvbnN0cmFpbnRzLmhlaWdodCA9IGwuaGVpZ2h0L3NcblxuICAgICAgcmV0dXJuIGNvbnN0cmFpbnRzXG5cbiAgICBnZW5MYXllciA9IChsLCBwYXJlbnQpIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnXG4gICAgICAgIG5hbWU6bC5uYW1lXG4gICAgICAgIGltYWdlOmwuaW1hZ2VcbiAgICAgICAgc3VwZXJMYXllcjogcGFyZW50XG4gICAgICAgIGNvbnN0cmFpbnRzOiBnZW5Db25zdHJhaW50cyhsKVxuXG4gICAgICByZXR1cm4gbmV3IGlvcy5WaWV3IHByb3BzXG5cbiAgICBnZW5BbGVydCA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgYWN0aW9uczpbXVxuICAgICAgICBzdXBlckxheWVyOm5QXG4gICAgICBmb3IgYyBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcbiAgICAgICAgaWYgZm91bmQobiwgJ3RpdGxlJykgdGhlbiBwcm9wcy50aXRsZSA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnbWVzc2FnZScpIHRoZW4gcHJvcHMubWVzc2FnZSA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnYWN0aW9uJykgdGhlbiBwcm9wcy5hY3Rpb25zLnVuc2hpZnQgZ2V0Q29sb3JTdHJpbmcoYylcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLkFsZXJ0IHByb3BzXG5cbiAgICBnZW5CYW5uZXIgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9IHtzdXBlckxheWVyOm5QfVxuICAgICAgZm9yIGMgaW4gbC5jaGlsZHJlblxuICAgICAgICBuID0gYy5uYW1lXG4gICAgICAgIGlmIGZvdW5kKG4sICdhcHAnKSB0aGVuIHByb3BzLmFwcCA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAndGl0bGUnKSB0aGVuIHByb3BzLnRpdGxlID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGlmIGZvdW5kKG4sICdtZXNzYWdlJykgdGhlbiBwcm9wcy5tZXNzYWdlID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGlmIGZvdW5kKG4sICd0aW1lJykgdGhlbiBwcm9wcy50aW1lID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGlmIGZvdW5kKG4sICdpY29uJykgdGhlbiBwcm9wcy5pY29uID0gZ2V0TGF5ZXIoYylcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLkJhbm5lciBwcm9wc1xuXG4gICAgZ2VuQnV0dG9uID0gKGwsIG5QKSAtPlxuICAgICAgcHJvcHMgPVxuICAgICAgICBzdXBlckxheWVyOm5QXG4gICAgICAgIGNvbnN0cmFpbnRzOmdlbkNvbnN0cmFpbnRzKGwpXG5cbiAgICAgIGZvciBjIGluIGwuY2hpbGRyZW5cbiAgICAgICAgbiA9IGMubmFtZVxuICAgICAgICBpZiBmb3VuZChuLCAnc21hbGwnKSB0aGVuIHByb3BzLnR5cGUgPSAnc21hbGwnXG4gICAgICAgIGlmIGZvdW5kKG4sICdiaWcnKSB0aGVuIHByb3BzLnR5cGUgPSAnYmlnJ1xuICAgICAgICBpZiBmb3VuZChuLCAnZGFyaycpIHRoZW4gcHJvcHMuc3R5bGUgPSAnZGFyaydcbiAgICAgICAgaWYgZm91bmQobiwgJ2xhYmVsJylcbiAgICAgICAgICBwcm9wcy50ZXh0ID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgICAgcHJvcHMuY29sb3IgPSBnZXRDU1MoYykuY29sb3JcbiAgICAgICAgICBwcm9wcy5mb250U2l6ZSA9IGdldENTUyhjKVsnZm9udC1zaXplJ10ucmVwbGFjZSgncHgnLCAnJylcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLkJ1dHRvbiBwcm9wc1xuXG4gICAgZ2VuRmllbGQgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIHN1cGVyTGF5ZXI6blBcbiAgICAgICAgY29uc3RyYWludHM6Z2VuQ29uc3RyYWludHMobClcbiAgICAgIGZvciBjIGluIGwuY2hpbGRyZW5cbiAgICAgICAgbiA9IGMubmFtZVxuXG4gICAgICAgIGlmIGZvdW5kKG4sICdwbGFjZWhvbGRlcicpXG4gICAgICAgICAgcHJvcHMucGxhY2Vob2xkZXIgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLkZpZWxkIHByb3BzXG5cbiAgICBnZW5LZXlib2FyZCA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgc3VwZXJMYXllcjpuUFxuXG4gICAgICBmb3IgYyBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcblxuICAgICAgICBpZiBmb3VuZChuLCAncmV0dXJuJykgdGhlbiBwcm9wcy5yZXR1cm5UZXh0ID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGlmIGZvdW5kKG4sICdkYXJrJykgdGhlbiBwcm9wcy5zdHlsZSA9ICdkYXJrJ1xuICAgICAgICBjLmRlc3Ryb3koKVxuICAgICAgcmV0dXJuIG5ldyBpb3MuS2V5Ym9hcmQgcHJvcHNcblxuICAgIGdlbk5hdkJhciA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgc3VwZXJMYXllcjpuUFxuICAgICAgZm9yIGMgaW4gbC5jaGlsZHJlblxuICAgICAgICBuID0gYy5uYW1lXG4gICAgICAgIGlmIGZvdW5kKG4sICd0aXRsZScpXG4gICAgICAgICAgcHJvcHMudGl0bGUgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgICBwcm9wcy50aXRsZUNvbG9yID0gZ2V0Q1NTKGMpLmNvbG9yXG4gICAgICAgIGlmIGZvdW5kKG4sICdyaWdodCcpXG4gICAgICAgICAgcHJvcHMucmlnaHQgPSBnZXRTdHJpbmcoYylcbiAgICAgICAgICBwcm9wcy5jb2xvciA9IGdldENTUyhjKS5jb2xvclxuICAgICAgICBpZiBmb3VuZChuLCAnbGVmdCcpIHRoZW4gcHJvcHMubGVmdCA9IGdldFN0cmluZyhjKVxuICAgICAgICBjLmRlc3Ryb3koKVxuICAgICAgcmV0dXJuIG5ldyBpb3MuTmF2QmFyIHByb3BzXG5cbiAgICBnZW5TaGVldCA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgYWN0aW9uczpbXVxuICAgICAgICBzdXBlckxheWVyOiBuUFxuXG4gICAgICBmb3IgYywgaSBpbiBsLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcbiAgICAgICAgaWYgZm91bmQobiwgJ2FjdGlvbicpIHRoZW4gcHJvcHMuYWN0aW9ucy5wdXNoIGdldENvbG9yU3RyaW5nKGMpXG4gICAgICAgIGlmIGZvdW5kKG4sICdleGl0JykgdGhlbiBwcm9wcy5leGl0ID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGMuZGVzdHJveSgpXG5cbiAgICAgIHJldHVybiBuZXcgaW9zLlNoZWV0IHByb3BzXG5cbiAgICBnZW5TdGF0dXNCYXIgPSAobCwgblApIC0+XG4gICAgICBwcm9wcyA9XG4gICAgICAgIHN1cGVyTGF5ZXI6IG5QXG5cbiAgICAgIGZvciBjIGluIGwuY2hpbGRyZW5cbiAgICAgICAgbiA9IGMubmFtZVxuICAgICAgICBpZiBmb3VuZChuLCAnY2FycmllcicpIHRoZW4gcHJvcHMuY2FycmllciA9IGdldFN0cmluZyhjKVxuICAgICAgICBpZiBmb3VuZChuLCAnYmF0dGVyeScpIHRoZW4gcHJvcHMuYmF0dGVyeSA9IGdldFN0cmluZyhjKS5yZXBsYWNlKCclJywgJycpXG4gICAgICAgIGlmIGZvdW5kKG4sICduZXR3b3JrJykgdGhlbiBwcm9wcy5uZXR3b3JrID0gZ2V0U3RyaW5nKGMpXG4gICAgICAgIGlmIGZvdW5kKG4sICdkYXJrJykgdGhlbiBwcm9wcy5zdHlsZSA9ICdsaWdodCdcbiAgICAgICAgYy5kZXN0cm95KClcbiAgICAgIHJldHVybiBuZXcgaW9zLlN0YXR1c0JhciBwcm9wc1xuXG4gICAgZ2VuVGFiQmFyID0gKGwsIG5QKSAtPlxuICAgICAgcHJvcHMgPVxuICAgICAgICB0YWJzOiBbXVxuICAgICAgICBzdXBlckxheWVyOm5QXG5cbiAgICAgIGZvciBjIGluIGwuY2hpbGRyZW5cbiAgICAgICAgbiA9IGMubmFtZVxuICAgICAgICB0cHJvcHMgPSB7fVxuICAgICAgICBmb3IgdCBpbiBjLmNoaWxkcmVuXG4gICAgICAgICAgdG4gPSB0Lm5hbWVcblxuICAgICAgICAgIGlmIG4gPT0gJ3RhYl9hY3RpdmUnICYmIHRuLmluZGV4T2YoJ2xhYmVsJykgIT0gLTFcbiAgICAgICAgICAgIHByb3BzLmFjdGl2ZUNvbG9yID0gZ2V0Q1NTKHQpLmNvbG9yXG4gICAgICAgICAgaWYgbiAhPSAndGFiX2FjdGl2ZScgJiYgdG4uaW5kZXhPZignbGFiZWwnKSAhPSAtMVxuICAgICAgICAgICAgcHJvcHMuaW5hY3RpdmVDb2xvciA9IGdldENTUyh0KS5jb2xvclxuXG4gICAgICAgICAgaWYgZm91bmQodG4sICdhY3RpdmUnKSAmJiB0bi5pbmRleE9mKCdpbmFjdGl2ZScpID09IC0xIHRoZW4gdHByb3BzLmFjdGl2ZSA9IGdldExheWVyKHQpXG4gICAgICAgICAgaWYgZm91bmQodG4sICdpbmFjdGl2ZScpIHRoZW4gdHByb3BzLmluYWN0aXZlID0gZ2V0TGF5ZXIodClcbiAgICAgICAgICBpZiBmb3VuZCh0biwgJ2xhYmVsJykgdGhlbiB0cHJvcHMubGFiZWwgPSBnZXRTdHJpbmcodClcblxuICAgICAgICAgIHQuZGVzdHJveSgpXG4gICAgICAgIHByb3BzLnRhYnMudW5zaGlmdCBuZXcgaW9zLlRhYiB0cHJvcHNcblxuXG4gICAgICAgIGMuZGVzdHJveSgpXG5cbiAgICAgIHJldHVybiBuZXcgaW9zLlRhYkJhciBwcm9wc1xuXG4gICAgZ2VuVGV4dCA9IChsLCBuUCkgLT5cbiAgICAgIHByb3BzID1cbiAgICAgICAgc3VwZXJMYXllcjpuUFxuICAgICAgICB0ZXh0OmdldFN0cmluZyhsKVxuICAgICAgICBjb25zdHJhaW50czpnZW5Db25zdHJhaW50cyhsKVxuICAgICAgY3NzID0gZ2V0Q1NTKGwpXG4gICAgICBrZXlzID0gT2JqZWN0LmtleXMoZ2V0Q1NTKGwpKVxuICAgICAgZm9yIGsgaW4ga2V5c1xuICAgICAgICBpZiBmb3VuZChrLCAnZm9udC1mYW1pbHknKSB0aGVuIHByb3BzLmZvbnRGYW1pbHkgPSBjc3Nba11cbiAgICAgICAgaWYgZm91bmQoaywgJ29wYWNpdHknKSB0aGVuIHByb3BzLm9wYWNpdHkgPSBOdW1iZXIoY3NzW2tdKVxuICAgICAgICBpZiBmb3VuZChrLCAnY29sb3InKSB0aGVuIHByb3BzLmNvbG9yID0gY3NzW2tdXG4gICAgICAgIGlmIGZvdW5kKGssICdmb250LXNpemUnKSB0aGVuIHByb3BzLmZvbnRTaXplID0gY3NzW2tdLnJlcGxhY2UoJ3B4JywgJycpXG4gICAgICAgIGlmIGZvdW5kKGssICdsZXR0ZXItc3BhY2luZycpIHRoZW4gcHJvcHMubGV0dGVyU3BhY2luZyA9IGNzc1trXVxuICAgICAgICBpZiBmb3VuZChrLCAnbGluZS1oZWlnaHQnKSB0aGVuIHByb3BzLmxpbmVIZWlnaHQgPSBjc3Nba10ucmVwbGFjZSgncHgnLCAnJylcbiAgICAgIHJldHVybiBuZXcgaW9zLlRleHQgcHJvcHNcblxuICAgIGNoaWxkcmVuID0gKHAsIG5QKSAtPlxuXG4gICAgICBmb3IgYyBpbiBwLmNoaWxkcmVuXG4gICAgICAgIG4gPSBjLm5hbWVcbiAgICAgICAgbmV3TGF5ZXIgPSAwXG4gICAgICAgIGlmIGMubmFtZVswXSA9PSAnXydcbiAgICAgICAgICBpZiBmb3VuZChuLCAnX0FsZXJ0JykgdGhlbiAgbmV3TGF5ZXIgPSBnZW5BbGVydChjLCBuUClcbiAgICAgICAgICBpZiBmb3VuZChuLCdfQmFubmVyJykgdGhlbiBuZXdMYXllciA9IGdlbkJhbm5lcihjLCBuUClcbiAgICAgICAgICBpZiBmb3VuZChuLCAnX0J1dHRvbicpIHRoZW4gbmV3TGF5ZXIgPSBnZW5CdXR0b24oYywgblApXG4gICAgICAgICAgaWYgZm91bmQobiwgJ19GaWVsZCcpIHRoZW4gbmV3TGF5ZXIgPSBnZW5GaWVsZChjLCBuUClcbiAgICAgICAgICBpZiBmb3VuZChuLCAnX0tleWJvYXJkJykgdGhlbiBuZXdMYXllciA9IGdlbktleWJvYXJkKGMsIG5QKVxuICAgICAgICAgIGlmIGZvdW5kKG4sJ19OYXZCYXInKSB0aGVuIG5ld0xheWVyID0gZ2VuTmF2QmFyKGMsIG5QKVxuICAgICAgICAgIGlmIGZvdW5kKG4sICdfU2hlZXQnKSB0aGVuIG5ld0xheWVyID0gZ2VuU2hlZXQoYywgblApXG4gICAgICAgICAgaWYgZm91bmQobiwgJ19UYWJCYXInKSB0aGVuIG5ld0xheWVyID0gZ2VuVGFiQmFyKGMsIG5QKVxuICAgICAgICAgIGlmIGZvdW5kKG4sICdfU3RhdHVzQmFyJykgdGhlbiBuZXdMYXllciA9IG5ldyBnZW5TdGF0dXNCYXIoYywgblApXG4gICAgICAgICAgaWYgZm91bmQobiwgJ19UZXh0JykgdGhlbiBuZXdMYXllciA9IGdlblRleHQoYywgblApXG4gICAgICAgICAgaWYgbmV3TGF5ZXIgPT0gdW5kZWZpbmVkIHRoZW4gbmV3TGF5ZXIgPSBnZW5MYXllcihjLCBuUClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG5ld0xheWVyID0gZ2VuTGF5ZXIoYywgblApXG5cbiAgICAgICAgbmV3TGF5ZXJzW25dID0gbmV3TGF5ZXJcblxuICAgICAgICBpZiBjLmNoaWxkcmVuXG4gICAgICAgICAgY2hpbGRyZW4oYywgbmV3TGF5ZXIpXG5cbiAgICAgICAgYy5kZXN0cm95KClcblxuICAgIGlvcy5sW2IubmFtZV0gPSBuZXcgQXJ0Ym9hcmQgYlxuXG4gICAgY2hpbGRyZW4oYiwgaW9zLmxbYi5uYW1lXSlcblxuICAgIGIuZGVzdHJveSgpXG5cbiAgICBuZXdBcnRib2FyZHMucHVzaCBpb3MubFtiLm5hbWVdXG4gICAgbmV3TGF5ZXJzW2IubmFtZV0gPSBpb3MubFtiLm5hbWVdXG5cbiAgcmV0dXJuIG5ld0xheWVyc1xuIiwiaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9XG5cdFx0dGV4dDpcIkJ1dHRvblwiXG5cdFx0dHlwZTpcInRleHRcIlxuXHRcdHN0eWxlOlwibGlnaHRcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRjb2xvcjpcIiMwMDdBRkZcIlxuXHRcdGZvbnRTaXplOjE3XG5cdFx0Zm9udFdlaWdodDpcInJlZ3VsYXJcIlxuXHRcdG5hbWU6XCJidXR0b25cIlxuXHRcdGJsdXI6dHJ1ZVxuXHRcdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cdFx0Y29uc3RyYWludHM6dW5kZWZpbmVkXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0YnV0dG9uID0gbmV3IGlvcy5WaWV3XG5cdFx0bmFtZTpzZXR1cC5uYW1lXG5cdFx0Y29uc3RyYWludHM6c2V0dXAuY29uc3RyYWludHNcblx0XHRzdXBlckxheWVyOnNldHVwLnN1cGVyTGF5ZXJcblx0YnV0dG9uLnR5cGUgPSBzZXR1cC50eXBlXG5cblx0Y29sb3IgPSBcIlwiXG5cblx0c3dpdGNoIHNldHVwLnR5cGVcblx0XHR3aGVuIFwiYmlnXCJcblx0XHRcdHNldHVwLmZvbnRTaXplID0gMjBcblx0XHRcdHNldHVwLmZvbnRXZWlnaHQgPSBcIm1lZGl1bVwiXG5cblx0XHRcdGJ1dHRvbi5ib3JkZXJSYWRpdXMgPSBpb3MudXRpbHMucHgoMTIuNSlcblx0XHRcdGJhY2tncm91bmRDb2xvciA9IFwiXCJcblxuXHRcdFx0aWYgYnV0dG9uLmNvbnN0cmFpbnRzID09IHVuZGVmaW5lZCB0aGVuIGJ1dHRvbi5jb25zdHJhaW50cyA9IHt9XG5cdFx0XHRidXR0b24uY29uc3RyYWludHMubGVhZGluZyA9IDEwXG5cdFx0XHRidXR0b24uY29uc3RyYWludHMudHJhaWxpbmcgPSAxMFxuXHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLmhlaWdodCA9IDU3XG5cblx0XHRcdHN3aXRjaCBzZXR1cC5zdHlsZVxuXHRcdFx0XHR3aGVuIFwibGlnaHRcIlxuXHRcdFx0XHRcdGNvbG9yID0gaW9zLnV0aWxzLmNvbG9yKFwiYmx1ZVwiKVxuXHRcdFx0XHRcdGlmIHNldHVwLmJsdXJcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAuOSlcIlxuXHRcdFx0XHRcdFx0aW9zLnV0aWxzLmJnQmx1cihidXR0b24pXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG5cblx0XHRcdFx0d2hlbiBcImRhcmtcIlxuXHRcdFx0XHRcdGNvbG9yID0gXCIjRkZGXCJcblx0XHRcdFx0XHRpZiBzZXR1cC5ibHVyXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoNDMsIDQzLCA0MywgLjkpXCJcblx0XHRcdFx0XHRcdGlvcy51dGlscy5iZ0JsdXIoYnV0dG9uKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvciA9IFwiIzI4MjgyOFwiXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRpZiBzZXR1cC5ibHVyXG5cdFx0XHRcdFx0XHRjb2xvciA9IHNldHVwLmNvbG9yXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3Ioc2V0dXAuYmFja2dyb3VuZENvbG9yKVxuXHRcdFx0XHRcdFx0cmdiU3RyaW5nID0gYmFja2dyb3VuZENvbG9yLnRvUmdiU3RyaW5nKClcblx0XHRcdFx0XHRcdHJnYmFTdHJpbmcgPSByZ2JTdHJpbmcucmVwbGFjZShcIilcIiwgXCIsIC45KVwiKVxuXHRcdFx0XHRcdFx0cmdiYVN0cmluZyAgPSByZ2JhU3RyaW5nLnJlcGxhY2UoXCJyZ2JcIiwgXCJyZ2JhXCIpXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSByZ2JhU3RyaW5nXG5cdFx0XHRcdFx0XHRpb3MudXRpbHMuYmdCbHVyKGJ1dHRvbilcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRjb2xvciA9IHNldHVwLmNvbG9yXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3Ioc2V0dXAuYmFja2dyb3VuZENvbG9yKVxuXG5cdFx0XHRidXR0b24uYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yXG5cblx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdFx0bmV3Q29sb3IgPSBcIlwiXG5cdFx0XHRcdGlmIHNldHVwLnN0eWxlID09IFwiZGFya1wiXG5cdFx0XHRcdFx0bmV3Q29sb3IgPSBidXR0b24uYmFja2dyb3VuZENvbG9yLmxpZ2h0ZW4oMTApXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRuZXdDb2xvciA9IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IuZGFya2VuKDEwKVxuXHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGJhY2tncm91bmRDb2xvcjpuZXdDb2xvcilcblx0XHRcdFx0XHR0aW1lOi41XG5cblx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczooYmFja2dyb3VuZENvbG9yOmJhY2tncm91bmRDb2xvcilcblx0XHRcdFx0XHR0aW1lOi41XG5cblx0XHR3aGVuIFwic21hbGxcIlxuXHRcdFx0c2V0dXAuZm9udFNpemUgPSAxNFxuXHRcdFx0c2V0dXAudG9wID0gNFxuXHRcdFx0YnV0dG9uLmJvcmRlclJhZGl1cyA9IGlvcy51dGlscy5weCgyLjUpXG5cdFx0XHRzZXR1cC5mb250V2VpZ2h0ID0gNTAwXG5cdFx0XHRzZXR1cC50ZXh0ID0gc2V0dXAudGV4dC50b1VwcGVyQ2FzZSgpXG5cdFx0XHRjb2xvciA9IHNldHVwLmNvbG9yXG5cdFx0XHRidXR0b24uYm9yZGVyQ29sb3IgPSBzZXR1cC5jb2xvclxuXG5cdFx0XHRidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRidXR0b24uYm9yZGVyV2lkdGggPSBpb3MudXRpbHMucHgoMSlcblxuXHRcdGVsc2Vcblx0XHRcdGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcblx0XHRcdGJ1dHRvbi5vcmlnQ29sb3IgPSBpb3MudXRpbHMuc3BlY2lhbENoYXIoYnV0dG9uKVxuXG5cdFx0XHRjb2xvciA9IHNldHVwLmNvbG9yXG5cdFx0XHRidXR0b24ubGFiZWxPcmlnQ29sb3IgPSBjb2xvclxuXG5cblx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdFx0QC5sYWJlbE9yaWdDb2xvciA9IGJ1dHRvbi5sYWJlbC5jb2xvclxuXHRcdFx0XHRuZXdDb2xvciA9IGJ1dHRvbi5zdWJMYXllcnNbMF0uY29sb3IubGlnaHRlbigzMClcblx0XHRcdFx0YnV0dG9uLnN1YkxheWVyc1swXS5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczooY29sb3I6bmV3Q29sb3IpXG5cdFx0XHRcdFx0dGltZTouNVxuXG5cdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0XHRALnN1YkxheWVyc1swXS5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczooY29sb3I6aW9zLnV0aWxzLmNvbG9yKEAubGFiZWxPcmlnQ29sb3IpKVxuXHRcdFx0XHRcdHRpbWU6LjVcblxuXHRidXR0b24ubGFiZWwgPSBuZXcgaW9zLlRleHRcblx0XHRuYW1lOlwiLmxhYmVsXCJcblx0XHR0ZXh0OnNldHVwLnRleHRcblx0XHRjb2xvcjpjb2xvclxuXHRcdGxpbmVIZWlnaHQ6MTZcblx0XHRzdXBlckxheWVyOmJ1dHRvblxuXHRcdGZvbnRTaXplOnNldHVwLmZvbnRTaXplXG5cdFx0Zm9udFdlaWdodDpzZXR1cC5mb250V2VpZ2h0XG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRhbGlnbjpcImNlbnRlclwiXG5cblx0c3dpdGNoIHNldHVwLnR5cGVcblx0XHR3aGVuIFwic21hbGxcIlxuXHRcdFx0YnV0dG9uLnByb3BzID0gKHdpZHRoOmJ1dHRvbi5sYWJlbC53aWR0aCArIGlvcy51dGlscy5weCgyMCksIGhlaWdodDogYnV0dG9uLmxhYmVsLmhlaWdodCArIGlvcy51dGlscy5weCgxMCkpXG5cblx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdFx0YnV0dG9uLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOihiYWNrZ3JvdW5kQ29sb3I6Y29sb3IpXG5cdFx0XHRcdFx0dGltZTouNVxuXHRcdFx0XHRidXR0b24ubGFiZWwuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6KGNvbG9yOlwiI0ZGRlwiKVxuXHRcdFx0XHRcdHRpbWU6LjVcblx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczooYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIilcblx0XHRcdFx0XHR0aW1lOi41XG5cdFx0XHRcdGJ1dHRvbi5sYWJlbC5hbmltYXRlXG5cdFx0XHRcdFx0cHJvcGVydGllczooY29sb3I6Y29sb3IpXG5cdFx0XHRcdFx0dGltZTouNVxuXHRcdGVsc2Vcblx0XHRcdGJ1dHRvbi5wcm9wcyA9ICh3aWR0aDpidXR0b24ubGFiZWwud2lkdGgsIGhlaWdodDpidXR0b24ubGFiZWwuaGVpZ2h0KVxuXG5cblx0aW9zLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6YnV0dG9uXG5cblx0aW9zLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6YnV0dG9uLmxhYmVsXG5cdHJldHVybiBidXR0b25cbiIsIiMgQmFubmVyXG5pb3MgPSByZXF1aXJlICdpb3Mta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID1cblx0dGl0bGU6IFwiVGl0bGVcIlxuXHRtZXNzYWdlOlwiTWVzc2FnZVwiXG5cdGFjdGlvbjpcIkFjdGlvblwiXG5cdHRpbWU6XCJub3dcIlxuXHRhcHA6XCJhcHBcIlxuXHRpY29uOnVuZGVmaW5lZFxuXHRkdXJhdGlvbjo3XG5cdGFuaW1hdGVkOnRydWVcblx0cmVwbHk6dHJ1ZVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAob2JqKSAtPlxuXHRzZXR1cCA9IGlvcy51dGlscy5zZXR1cENvbXBvbmVudChvYmosIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0I3NldCBzcGVjcyBmb3IgZWFjaCBkZXZpY2Vcblx0c3BlY3MgPVxuXHRcdGxlYWRpbmdJY29uOiAxNVxuXHRcdHRvcEljb246IDhcblx0XHR0b3BUaXRsZTogNlxuXHRcdHdpZHRoOjBcblxuXHRzd2l0Y2ggaW9zLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwaG9uZS01XCJcblx0XHRcdHNwZWNzLndpZHRoID0gMzA0XG5cdFx0d2hlbiBcImlwaG9uZS02c1wiXG5cdFx0XHRzcGVjcy53aWR0aCA9IDM1OVxuXHRcdHdoZW4gXCJpcGhvbmUtNnMtcGx1c1wiXG5cdFx0XHRzcGVjcy5sZWFkaW5nSWNvbiA9IDE1XG5cdFx0XHRzcGVjcy50b3BJY29uID0gMTJcblx0XHRcdHNwZWNzLnRvcFRpdGxlID0gMTBcblx0XHRcdHNwZWNzLndpZHRoID0gMzk4XG5cdFx0d2hlbiBcImlwYWRcIlxuXHRcdFx0c3BlY3MubGVhZGluZ0ljb24gPSA4XG5cdFx0XHRzcGVjcy50b3BJY29uID0gOFxuXHRcdFx0c3BlY3MudG9wVGl0bGUgPSAxMVxuXHRcdFx0c3BlY3Mud2lkdGggPSAzOThcblx0XHR3aGVuIFwiaXBhZC1wcm9cIlxuXHRcdFx0c3BlY3MubGVhZGluZ0ljb24gPSA4XG5cdFx0XHRzcGVjcy50b3BJY29uID0gOFxuXHRcdFx0c3BlY3MudG9wVGl0bGUgPSA5XG5cdFx0XHRzcGVjcy53aWR0aCA9IDU1NlxuXG5cblx0YmFubmVyID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgyNTUsMjU1LDI1NSwuNilcIlxuXHRcdG5hbWU6XCJiYW5uZXJcIlxuXHRcdGJvcmRlclJhZGl1czppb3MucHgoMTIpXG5cdFx0c2hhZG93Q29sb3I6XCJyZ2JhKDAsMCwwLC4zKVwiXG5cdFx0c2hhZG93WTppb3MucHgoMilcblx0XHRzaGFkb3dCbHVyOmlvcy5weCgxMClcblx0XHRjbGlwOnRydWVcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGFsaWduOidob3Jpem9udGFsJ1xuXHRcdFx0d2lkdGg6c3BlY3Mud2lkdGhcblx0XHRcdHRvcDo4XG5cdFx0XHRoZWlnaHQ6OTNcblxuXHRiYW5uZXIuaGVhZGVyID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgyNTUsMjU1LDI1NSwgLjMpXCJcblx0XHRuYW1lOlwiLmhlYWRlclwiXG5cdFx0c3VwZXJMYXllcjpiYW5uZXJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGhlaWdodDozNlxuXHRcdFx0bGVhZGluZzowXG5cdFx0XHR0cmFpbGluZzowXG5cblx0aWYgc2V0dXAuaWNvbiA9PSB1bmRlZmluZWRcblxuXHRcdGJhbm5lci5pY29uID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRzdXBlckxheWVyOmJhbm5lci5oZWFkZXJcblx0XHRiYW5uZXIuaWNvbi5zdHlsZVtcImJhY2tncm91bmRcIl0gPSBcImxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjNjdGRjgxIDAlLCAjMDFCNDFGIDEwMCUpXCJcblxuXHRlbHNlXG5cblx0XHRiYW5uZXIuaGVhZGVyLmFkZFN1YkxheWVyKHNldHVwLmljb24pXG5cdFx0YmFubmVyLmljb24gPSBzZXR1cC5pY29uXG5cblxuXHRiYW5uZXIuaWNvbi5ib3JkZXJSYWRpdXMgPSBpb3MudXRpbHMucHgoNC41KVxuXHRiYW5uZXIuaWNvbi5uYW1lID0gXCIuaWNvblwiXG5cdGJhbm5lci5pY29uLmNvbnN0cmFpbnRzID1cblx0XHRoZWlnaHQ6MjBcblx0XHR3aWR0aDoyMFxuXHRcdGxlYWRpbmc6c3BlY3MubGVhZGluZ0ljb25cblx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblxuXHRpb3MubGF5b3V0LnNldChiYW5uZXIuaWNvbilcblxuXHRiYW5uZXIuYXBwID0gbmV3IGlvcy5UZXh0XG5cdFx0dGV4dDpzZXR1cC5hcHAudG9VcHBlckNhc2UoKVxuXHRcdGNvbG9yOlwicmdiYSgwLDAsMCwuNSlcIlxuXHRcdGZvbnRTaXplOjEzXG5cdFx0bGV0dGVyU3BhY2luZzouNVxuXHRcdHN1cGVyTGF5ZXI6YmFubmVyLmhlYWRlclxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0bGVhZGluZzpbYmFubmVyLmljb24sIDZdXG5cdFx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblxuXHRiYW5uZXIudGl0bGUgPSBuZXcgaW9zLlRleHRcblx0XHR0ZXh0OnNldHVwLnRpdGxlXG5cdFx0Y29sb3I6XCJibGFja1wiXG5cdFx0Zm9udFdlaWdodDpcInNlbWlib2xkXCJcblx0XHRmb250U2l6ZToxNVxuXHRcdHN1cGVyTGF5ZXI6YmFubmVyXG5cdFx0bmFtZTpcIi50aXRsZVwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6NDVcblx0XHRcdGxlYWRpbmc6MTVcblxuXHRiYW5uZXIubWVzc2FnZSA9IG5ldyBpb3MuVGV4dFxuXHRcdHRleHQ6c2V0dXAubWVzc2FnZVxuXHRcdGNvbG9yOlwiYmxhY2tcIlxuXHRcdGZvbnRTaXplOjE1XG5cdFx0Zm9udFdlaWdodDpcImxpZ2h0XCJcblx0XHRzdXBlckxheWVyOmJhbm5lclxuXHRcdG5hbWU6XCIubWVzc2FnZVwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nRWRnZXM6YmFubmVyLnRpdGxlXG5cdFx0XHR0b3A6W2Jhbm5lci50aXRsZSwgNl1cblxuXHRiYW5uZXIudGltZSA9IG5ldyBpb3MuVGV4dFxuXHRcdHRleHQ6c2V0dXAudGltZVxuXHRcdGNvbG9yOlwicmdiYSgwLDAsMCwuNSlcIlxuXHRcdGZvbnRTaXplOjEzXG5cdFx0c3VwZXJMYXllcjpiYW5uZXIuaGVhZGVyXG5cdFx0bmFtZTpcIi50aW1lXCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRyYWlsaW5nOjE2XG5cdFx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblxuXHRpZiBpb3MuZGV2aWNlLm5hbWUgPT0gXCJpcGFkXCIgfHwgaW9zLmRldmljZS5uYW1lID09IFwiaXBhZC1wcm9cIlxuXHRcdGJhbm5lci50aW1lLmNvbnN0cmFpbnRzID1cblx0XHRcdGJvdHRvbUVkZ2VzOiBiYW5uZXIudGl0bGVcblx0XHRcdHRyYWlsaW5nOiBzcGVjcy5sZWFkaW5nSWNvblxuXG5cblx0aW9zLnV0aWxzLmJnQmx1cihiYW5uZXIpXG5cblx0IyMgQmFubmVyIERyYWcgc2V0dGluZ3Ncblx0YmFubmVyLmRyYWdnYWJsZSA9IHRydWVcblx0YmFubmVyLmRyYWdnYWJsZS5ob3Jpem9udGFsID0gZmFsc2Vcblx0YmFubmVyLmRyYWdnYWJsZS5jb25zdHJhaW50cyA9XG5cdFx0eTppb3MucHgoOClcblx0XHR4Omlvcy5weCg4KVxuXG5cdGJhbm5lci5kcmFnZ2FibGUuYm91bmNlT3B0aW9ucyA9XG5cdCAgICBmcmljdGlvbjogMjVcblx0ICAgIHRlbnNpb246IDI1MFxuXG5cdGJhbm5lci5vbiBFdmVudHMuRHJhZ0VuZCwgLT5cblx0XHRpZiBiYW5uZXIubWF4WSA8IGlvcy51dGlscy5weCg2OClcblx0XHRcdGJhbm5lci5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KG1heFk6MClcblx0XHRcdFx0dGltZTouMTVcblx0XHRcdFx0Y3VydmU6XCJlYXNlLWluLW91dFwiXG5cdFx0XHRVdGlscy5kZWxheSAuMjUsIC0+XG5cdFx0XHRcdGJhbm5lci5kZXN0cm95KClcblxuXHQjIEFuaW1hdGUtaW5cblx0aWYgc2V0dXAuYW5pbWF0ZWQgPT0gdHJ1ZVxuXHRcdGJhbm5lci55ID0gMCAtIGJhbm5lci5oZWlnaHRcblx0XHRpb3MubGF5b3V0LmFuaW1hdGVcblx0XHRcdHRhcmdldDpiYW5uZXJcblx0XHRcdHRpbWU6LjI1XG5cdFx0XHRjdXJ2ZTonZWFzZS1pbi1vdXQnXG5cdCMgQW5pbWF0ZS1vdXRcblx0aWYgc2V0dXAuZHVyYXRpb25cblx0XHRVdGlscy5kZWxheSBzZXR1cC5kdXJhdGlvbiwgLT5cblx0XHRcdGJhbm5lci5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KG1heFk6MClcblx0XHRcdFx0dGltZTouMjVcblx0XHRcdFx0Y3VydmU6XCJlYXNlLWluLW91dFwiXG5cdFx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24gKyAuMjUsIC0+XG5cdFx0XHRiYW5uZXIuZGVzdHJveSgpXG5cblx0cmV0dXJuIGJhbm5lclxuIiwiIyBBbGVydFxuaW9zID0gcmVxdWlyZSAnaW9zLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9XG5cdHRpdGxlOiBcIlRpdGxlXCJcblx0bWVzc2FnZTpcIlwiXG5cdGFjdGlvbnM6W1wiT0tcIl1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKG9iaikgLT5cblx0c2V0dXAgPSBpb3MudXRpbHMuc2V0dXBDb21wb25lbnQob2JqLCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdGFsZXJ0ID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJhbGVydFwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdHRvcDowXG5cdFx0XHRib3R0b206MFxuXG5cdGFsZXJ0Lm92ZXJsYXkgPSBuZXcgaW9zLlZpZXdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJyZ2JhKDAsMCwwLC4zKVwiXG5cdFx0c3VwZXJMYXllcjphbGVydFxuXHRcdG5hbWU6XCIub3ZlcmxheVwiXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOjBcblx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdHRvcDowXG5cdFx0XHRib3R0b206MFxuXG5cdGFsZXJ0Lm1vZGFsID0gbmV3IGlvcy5WaWV3XG5cdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdHN1cGVyTGF5ZXI6YWxlcnRcblx0XHRib3JkZXJSYWRpdXM6aW9zLnV0aWxzLnB4KDEwKVxuXHRcdG5hbWU6XCIubW9kYWxcIlxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0YWxpZ246XCJjZW50ZXJcIlxuXHRcdFx0d2lkdGg6MjgwXG5cdFx0XHRoZWlnaHQ6NDAwXG5cblx0YWxlcnQudGl0bGUgPSBuZXcgaW9zLlRleHRcblx0XHRzdXBlckxheWVyOmFsZXJ0Lm1vZGFsXG5cdFx0dGV4dDpzZXR1cC50aXRsZVxuXHRcdGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiXG5cdFx0bmFtZTpcIi50aXRsZVwiXG5cdFx0dGV4dEFsaWduOlwiY2VudGVyXCJcblx0XHRsaW5lSGVpZ2h0OjIwXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6MjBcblx0XHRcdHdpZHRoOjIyMFxuXHRcdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblxuXHRhbGVydC5tZXNzYWdlID0gbmV3IGlvcy5UZXh0XG5cdFx0c3VwZXJMYXllcjphbGVydC5tb2RhbFxuXHRcdHRleHQ6c2V0dXAubWVzc2FnZVxuXHRcdGZvbnRTaXplOjEzXG5cdFx0bmFtZTpcIi5tZXNzYWdlXCJcblx0XHR0ZXh0QWxpZ246XCJjZW50ZXJcIlxuXHRcdGxpbmVIZWlnaHQ6MTZcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDogW2FsZXJ0LnRpdGxlLCAxMF1cblx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cdFx0XHR3aWR0aDogMjIwXG5cblx0aWYgc2V0dXAubWVzc2FnZS5sZW5ndGggPT0gMFxuXHRcdGFsZXJ0Lm1lc3NhZ2UuaGVpZ2h0ID0gLTI0XG5cblxuXHRhbGVydC5ob3JpRGl2aWRlciA9IG5ldyBpb3MuVmlld1xuXHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjRTJFOEVCXCJcblx0XHRuYW1lOlwiLmhvcmlEaXZpZGVyXCJcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0aGVpZ2h0OjFcblx0XHRcdGJvdHRvbTo0NFxuXG5cdGNsZWFuTmFtZSA9IChuKSAtPlxuXHRcdGlmIG5bMF0gPT0gXCItXCJcblx0XHRcdHJldHVybiBuLnNsaWNlKDkpXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG5cblx0I1RpdGxlICsgTWVzc2FnZSArIDEgc2V0IG9mIGFjdGlvbnNcblx0YWxlcnQubW9kYWwuY29uc3RyYWludHNbXCJoZWlnaHRcIl0gPSAyMCArIGlvcy51dGlscy5wdChhbGVydC50aXRsZS5oZWlnaHQpICsgMTAgKyBpb3MudXRpbHMucHQoYWxlcnQubWVzc2FnZS5oZWlnaHQpICsgMjQgKyA0NFxuXG5cdGFjdGlvbnMgPSBbXVxuXHRzd2l0Y2ggc2V0dXAuYWN0aW9ucy5sZW5ndGhcblx0XHR3aGVuIDFcblxuXHRcdFx0YWN0TGFiZWwgPSBpb3MudXRpbHMuY2FwaXRhbGl6ZShzZXR1cC5hY3Rpb25zWzBdKVxuXG5cdFx0XHRhY3Rpb24gPSBuZXcgaW9zLlZpZXdcblx0XHRcdFx0c3VwZXJMYXllcjphbGVydC5tb2RhbFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0XHRcdG5hbWU6Y2xlYW5OYW1lKHNldHVwLmFjdGlvbnNbMF0pXG5cdFx0XHRcdGJvcmRlclJhZGl1czppb3MudXRpbHMucHgoMTApXG5cdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdFx0XHRib3R0b206MFxuXHRcdFx0XHRcdGhlaWdodDo0NFxuXG5cdFx0XHRhY3Rpb24ubGFiZWwgPSBuZXcgaW9zLlRleHRcblx0XHRcdFx0Y29sb3I6aW9zLnV0aWxzLmNvbG9yKFwiYmx1ZVwiKVxuXHRcdFx0XHRzdXBlckxheWVyOmFjdGlvblxuXHRcdFx0XHR0ZXh0OmFjdExhYmVsXG5cdFx0XHRcdG5hbWU6XCJsYWJlbFwiXG5cdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0Ym90dG9tOjE2XG5cblx0XHRcdGFjdGlvbnMucHVzaCBhY3Rpb25cblxuXHRcdHdoZW4gMlxuXG5cdFx0XHRhY3RMYWJlbCA9IGlvcy51dGlscy5jYXBpdGFsaXplKHNldHVwLmFjdGlvbnNbMF0pXG5cblx0XHRcdGFjdGlvbiA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRzdXBlckxheWVyOmFsZXJ0Lm1vZGFsXG5cdFx0XHRcdG5hbWU6Y2xlYW5OYW1lKHNldHVwLmFjdGlvbnNbMF0pXG5cdFx0XHRcdGJvcmRlclJhZGl1czppb3MudXRpbHMucHgoMTApXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0bGVhZGluZzowXG5cdFx0XHRcdFx0dHJhaWxpbmc6aW9zLnV0aWxzLnB0KGFsZXJ0Lm1vZGFsLndpZHRoLzIpXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHRoZWlnaHQ6NDRcblxuXHRcdFx0YWN0aW9uLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdGNvbG9yOmlvcy51dGlscy5jb2xvcihcImJsdWVcIilcblx0XHRcdFx0c3VwZXJMYXllcjphY3Rpb25cblx0XHRcdFx0dGV4dDphY3RMYWJlbFxuXHRcdFx0XHRuYW1lOlwibGFiZWxcIlxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0XHRcdGJvdHRvbToxNlxuXG5cdFx0XHRhY3Rpb25zLnB1c2ggYWN0aW9uXG5cblx0XHRcdGFsZXJ0LnZlcnREaXZpZGVyID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiI0UyRThFQlwiXG5cdFx0XHRcdG5hbWU6XCIudmVydERpdmlkZXJcIlxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHR3aWR0aDoxXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHRoZWlnaHQ6NDRcblx0XHRcdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXG5cdFx0XHRhY3RMYWJlbDIgPSBpb3MudXRpbHMuY2FwaXRhbGl6ZShzZXR1cC5hY3Rpb25zWzFdKVxuXG5cdFx0XHRhY3Rpb24yID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHRcdFx0bmFtZTpjbGVhbk5hbWUoc2V0dXAuYWN0aW9uc1sxXSlcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOmlvcy51dGlscy5weCgxMClcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRsZWFkaW5nOmlvcy51dGlscy5wdChhbGVydC5tb2RhbC53aWR0aC8yKVxuXHRcdFx0XHRcdHRyYWlsaW5nOjBcblx0XHRcdFx0XHRib3R0b206MFxuXHRcdFx0XHRcdGhlaWdodDo0NFxuXG5cdFx0XHRhY3Rpb24yLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdGNvbG9yOmlvcy51dGlscy5jb2xvcihcImJsdWVcIilcblx0XHRcdFx0c3VwZXJMYXllcjphY3Rpb24yXG5cdFx0XHRcdHRleHQ6YWN0TGFiZWwyXG5cdFx0XHRcdG5hbWU6XCJsYWJlbFwiXG5cdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cdFx0XHRcdFx0Ym90dG9tOjE2XG5cblx0XHRcdGFjdGlvbnMucHVzaCBhY3Rpb24yXG5cblx0XHRlbHNlXG5cdFx0XHRmb3IgYWN0LCBpbmRleCBpbiBzZXR1cC5hY3Rpb25zXG5cblx0XHRcdFx0YWN0TGFiZWwgPSBpb3MudXRpbHMuY2FwaXRhbGl6ZShhY3QpXG5cblx0XHRcdFx0YWN0aW9uID0gbmV3IGlvcy5WaWV3XG5cdFx0XHRcdFx0c3VwZXJMYXllcjphbGVydC5tb2RhbFxuXHRcdFx0XHRcdG5hbWU6Y2xlYW5OYW1lKGFjdClcblx0XHRcdFx0XHRib3JkZXJSYWRpdXM6aW9zLnV0aWxzLnB4KDEwKVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0XHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0XHRcdFx0Ym90dG9tOjAgKyAoKHNldHVwLmFjdGlvbnMubGVuZ3RoIC0gaW5kZXggLSAxKSAqIDQ0KVxuXHRcdFx0XHRcdFx0aGVpZ2h0OjQ0XG5cblx0XHRcdFx0YWN0aW9uRGl2aWRlciA9IG5ldyBpb3MuVmlld1xuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6YWxlcnQubW9kYWxcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjRTJFOEVCXCJcblx0XHRcdFx0XHRuYW1lOlwiYWN0aW9uIGRpdmlkZXJcIlxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdFx0bGVhZGluZzowXG5cdFx0XHRcdFx0XHR0cmFpbGluZzowXG5cdFx0XHRcdFx0XHRoZWlnaHQ6MVxuXHRcdFx0XHRcdFx0Ym90dG9tOjAgKyAoKHNldHVwLmFjdGlvbnMubGVuZ3RoIC0gaW5kZXgpICogNDQpXG5cblx0XHRcdFx0YWN0aW9uLmxhYmVsID0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0c3R5bGU6XCJhbGVydEFjdGlvblwiXG5cdFx0XHRcdFx0Y29sb3I6aW9zLnV0aWxzLmNvbG9yKFwiYmx1ZVwiKVxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6YWN0aW9uXG5cdFx0XHRcdFx0dGV4dDphY3RMYWJlbFxuXHRcdFx0XHRcdG5hbWU6XCJsYWJlbFwiXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0XHRhbGlnbjpcImhvcml6b250YWxcIlxuXHRcdFx0XHRcdFx0Ym90dG9tOjE0XG5cblxuXHRcdFx0XHRhY3Rpb25zLnB1c2ggYWN0aW9uXG5cdFx0XHRcdGFsZXJ0Lm1vZGFsLmNvbnN0cmFpbnRzW1wiaGVpZ2h0XCJdID0gYWxlcnQubW9kYWwuY29uc3RyYWludHNbXCJoZWlnaHRcIl0gKyA0MiAtIDEyXG5cblx0YWxlcnQuYWN0aW9ucyA9IHt9XG5cdGZvciBhY3QsaW5kZXggaW4gYWN0aW9uc1xuXG5cdFx0I0hhbmRsZSBzcGVjaWFsIGNoYXJhY3RlcnNcblx0XHRhY3QudHlwZSA9IFwiYnV0dG9uXCJcblx0XHRpb3MudXRpbHMuc3BlY2lhbENoYXIoYWN0KVxuXG5cdFx0aWYgc2V0dXAuYWN0aW9uc1tpbmRleF0uaW5kZXhPZihcIi1yXCIpID09IDBcblx0XHRcdGFjdC5vcmlnQ29sb3IgPSBpb3MudXRpbHMuY29sb3IoXCJyZWRcIilcblx0XHRlbHNlXG5cdFx0XHRhY3Qub3JpZ0NvbG9yID0gaW9zLnV0aWxzLmNvbG9yKFwiYmx1ZVwiKVxuXHRcdGlvcy5sYXlvdXQuc2V0KGFjdC5sYWJlbClcblx0XHQjQWRkIFRvdWNoIEV2ZW50c1xuXHRcdGFjdC5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG5cdFx0XHRALmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczooYmFja2dyb3VuZENvbG9yOmFjdC5iYWNrZ3JvdW5kQ29sb3IuZGFya2VuKDUpKVxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0QC5sYWJlbC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KGNvbG9yOkAub3JpZ0NvbG9yLmxpZ2h0ZW4oMTApKVxuXHRcdFx0XHR0aW1lOi4yNVxuXG5cdFx0YWN0Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdEAuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiKVxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0QC5sYWJlbC5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KGNvbG9yOkAub3JpZ0NvbG9yKVxuXHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0YWxlcnQuZGVzdHJveSgpXG5cblx0XHQjIEV4cG9ydCBhY3Rpb25zXG5cdFx0YWxlcnQuYWN0aW9uc1thY3QubmFtZV0gPSBhY3RcblxuXHRpb3MubGF5b3V0LnNldChhY3Rpb25zW2FjdGlvbnMubGVuZ3RoIC0gMV0pXG5cdHJldHVybiBhbGVydFxuIiwiZXhwb3J0cy5rZXlib2FyZExheWVyID0gbmV3IExheWVyXG5cdHg6MCwgeTpTY3JlZW4uaGVpZ2h0LCB3aWR0aDpTY3JlZW4ud2lkdGgsIGhlaWdodDo0MzJcblx0aHRtbDpcIjxpbWcgc3R5bGU9J3dpZHRoOiAxMDAlOycgc3JjPSdtb2R1bGVzL2tleWJvYXJkLnBuZycvPlwiXG5cbiNzY3JlZW4gd2lkdGggdnMuIHNpemUgb2YgaW1hZ2Ugd2lkdGhcbmdyb3d0aFJhdGlvID0gU2NyZWVuLndpZHRoIC8gNzMyXG5pbWFnZUhlaWdodCA9IGdyb3d0aFJhdGlvICogNDMyXG5cbiMgRXh0ZW5kcyB0aGUgTGF5ZXJTdHlsZSBjbGFzcyB3aGljaCBkb2VzIHRoZSBwaXhlbCByYXRpbyBjYWxjdWxhdGlvbnMgaW4gZnJhbWVyXG5faW5wdXRTdHlsZSA9XG5cdE9iamVjdC5hc3NpZ24oe30sIEZyYW1lci5MYXllclN0eWxlLFxuXHRcdGNhbGN1bGF0ZVBpeGVsUmF0aW8gPSAobGF5ZXIsIHZhbHVlKSAtPlxuXHRcdFx0KHZhbHVlICogbGF5ZXIuY29udGV4dC5waXhlbE11bHRpcGxpZXIpICsgXCJweFwiXG5cblx0XHRmb250U2l6ZTogKGxheWVyKSAtPlxuXHRcdFx0Y2FsY3VsYXRlUGl4ZWxSYXRpbyhsYXllciwgbGF5ZXIuX3Byb3BlcnRpZXMuZm9udFNpemUpXG5cblx0XHRsaW5lSGVpZ2h0OiAobGF5ZXIpIC0+XG5cdFx0XHQobGF5ZXIuX3Byb3BlcnRpZXMubGluZUhlaWdodCkgKyBcImVtXCJcblxuXHRcdHBhZGRpbmc6IChsYXllcikgLT5cblx0XHRcdHsgcGl4ZWxNdWx0aXBsaWVyIH0gPSBsYXllci5jb250ZXh0XG5cdFx0XHRwYWRkaW5nID0gW11cblx0XHRcdHBhZGRpbmdWYWx1ZSA9IGxheWVyLl9wcm9wZXJ0aWVzLnBhZGRpbmdcblxuXHRcdFx0IyBDaGVjayBpZiB3ZSBoYXZlIGEgc2luZ2xlIG51bWJlciBhcyBpbnRlZ2VyXG5cdFx0XHRpZiBOdW1iZXIuaXNJbnRlZ2VyKHBhZGRpbmdWYWx1ZSlcblx0XHRcdFx0cmV0dXJuIGNhbGN1bGF0ZVBpeGVsUmF0aW8obGF5ZXIsIHBhZGRpbmdWYWx1ZSlcblxuXHRcdFx0IyBJZiB3ZSBoYXZlIG11bHRpcGxlIHZhbHVlcyB0aGV5IGNvbWUgYXMgc3RyaW5nIChlLmcuIFwiMSAyIDMgNFwiKVxuXHRcdFx0cGFkZGluZ1ZhbHVlcyA9IGxheWVyLl9wcm9wZXJ0aWVzLnBhZGRpbmcuc3BsaXQoXCIgXCIpXG5cblx0XHRcdHN3aXRjaCBwYWRkaW5nVmFsdWVzLmxlbmd0aFxuXHRcdFx0XHR3aGVuIDRcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzJdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1szXSlcblxuXHRcdFx0XHR3aGVuIDNcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzJdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblxuXHRcdFx0XHR3aGVuIDJcblx0XHRcdFx0XHRwYWRkaW5nLnRvcCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLnJpZ2h0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzFdKVxuXHRcdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcubGVmdCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cblx0XHRcdCMgUmV0dXJuIGFzIDQtdmFsdWUgc3RyaW5nIChlLmcgXCIxcHggMnB4IDNweCA0cHhcIilcblx0XHRcdFwiI3twYWRkaW5nLnRvcCAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcucmlnaHQgKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLmJvdHRvbSAqIHBpeGVsTXVsdGlwbGllcn1weCAje3BhZGRpbmcubGVmdCAqIHBpeGVsTXVsdGlwbGllcn1weFwiXG5cdClcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOlxuXHRcdHk6IFNjcmVlbi5oZWlnaHQgLSBpbWFnZUhlaWdodFxuXG5leHBvcnRzLmtleWJvYXJkTGF5ZXIuc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRjdXJ2ZTogXCJzcHJpbmcoNTAwLDUwLDE1KVwiXG5cbmNsYXNzIGV4cG9ydHMuSW5wdXQgZXh0ZW5kcyBMYXllclxuXHRAZGVmaW5lIFwic3R5bGVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC5zdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0Xy5leHRlbmQgQGlucHV0LnN0eWxlLCB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJ2YWx1ZVwiLFxuXHRcdGdldDogLT4gQGlucHV0LnZhbHVlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAaW5wdXQudmFsdWUgPSB2YWx1ZVxuXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucyA9IHt9KSAtPlxuXHRcdG9wdGlvbnMuc2V0dXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLndpZHRoID89IFNjcmVlbi53aWR0aFxuXHRcdG9wdGlvbnMuY2xpcCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuaGVpZ2h0ID89IDYwXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwicmdiYSgyNTUsIDYwLCA0NywgLjUpXCIgZWxzZSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgLjAxKVwiICMgXCJ0cmFuc3BhcmVudFwiIHNlZW1zIHRvIGNhdXNlIGEgYnVnIGluIGxhdGVzdCBzYWZhcmkgdmVyc2lvblxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMzBcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMVxuXHRcdG9wdGlvbnMucGFkZGluZyA/PSAxMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wbGFjZWhvbGRlciA/PSBcIlwiXG5cdFx0b3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgPz0gaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdG9wdGlvbnMudHlwZSA/PSBcInRleHRcIlxuXHRcdG9wdGlvbnMuZ29CdXR0b24gPz0gZmFsc2Vcblx0XHRvcHRpb25zLmF1dG9Db3JyZWN0ID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NvbXBsZXRlID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b0NhcGl0YWxpemUgPz0gXCJvblwiXG5cdFx0b3B0aW9ucy5zcGVsbENoZWNrID89IFwib25cIlxuXHRcdG9wdGlvbnMuYXV0b2ZvY3VzID89IGZhbHNlXG5cdFx0b3B0aW9ucy50ZXh0Q29sb3IgPz0gXCIjMDAwXCJcblx0XHRvcHRpb25zLmZvbnRGYW1pbHkgPz0gXCItYXBwbGUtc3lzdGVtXCJcblx0XHRvcHRpb25zLmZvbnRXZWlnaHQgPz0gXCI1MDBcIlxuXHRcdG9wdGlvbnMuc3VibWl0ID89IGZhbHNlXG5cdFx0b3B0aW9ucy50YWJJbmRleCA/PSAwXG5cdFx0b3B0aW9ucy50ZXh0YXJlYSA/PSBmYWxzZVxuXHRcdG9wdGlvbnMuZGlzYWJsZWQgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmxldHRlclNwYWNpbmcgPz0gMFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0IyBBZGQgYWRkaXRpb25hbCBwcm9wZXJ0aWVzXG5cdFx0QF9wcm9wZXJ0aWVzLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZVxuXHRcdEBfcHJvcGVydGllcy5saW5lSGVpZ2h0ID0gb3B0aW9ucy5saW5lSGVpZ2h0XG5cdFx0QF9wcm9wZXJ0aWVzLnBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmdcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlmIG9wdGlvbnMudGV4dGFyZWEgdGhlbiAndGV4dGFyZWEnIGVsc2UgJ2lucHV0J1xuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cblx0XHQjIEFkZCBzdHlsaW5nIHRvIHRoZSBpbnB1dCBlbGVtZW50XG5cdFx0QGlucHV0LnN0eWxlLndpZHRoID0gX2lucHV0U3R5bGVbXCJ3aWR0aFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5oZWlnaHQgPSBfaW5wdXRTdHlsZVtcImhlaWdodFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5mb250U2l6ZSA9IF9pbnB1dFN0eWxlW1wiZm9udFNpemVcIl0oQClcblx0XHRAaW5wdXQuc3R5bGUubGluZUhlaWdodCA9IF9pbnB1dFN0eWxlW1wibGluZUhlaWdodFwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5vdXRsaW5lID0gXCJub25lXCJcblx0XHRAaW5wdXQuc3R5bGUuYm9yZGVyID0gXCJub25lXCJcblx0XHRAaW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRAaW5wdXQuc3R5bGUucGFkZGluZyA9IF9pbnB1dFN0eWxlW1wicGFkZGluZ1wiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5mb250RmFtaWx5ID0gb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0QGlucHV0LnN0eWxlLmNvbG9yID0gb3B0aW9ucy50ZXh0Q29sb3Jcblx0XHRAaW5wdXQuc3R5bGUuZm9udFdlaWdodCA9IG9wdGlvbnMuZm9udFdlaWdodFxuXHRcdEBpbnB1dC5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gb3B0aW9ucy5sZXR0ZXJTcGFjaW5nXG5cblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwidGFiaW5kZXhcIiwgb3B0aW9ucy50YWJpbmRleFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29ycmVjdFwiLCBvcHRpb25zLmF1dG9Db3JyZWN0XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb21wbGV0ZVwiLCBvcHRpb25zLmF1dG9Db21wbGV0ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY2FwaXRhbGl6ZVwiLCBvcHRpb25zLmF1dG9DYXBpdGFsaXplXG5cdFx0aWYgb3B0aW9ucy5kaXNhYmxlZCA9PSB0cnVlXG5cdFx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiZGlzYWJsZWRcIiwgdHJ1ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgKG9wdGlvbnMuZ29CdXR0b24gJiYgIW9wdGlvbnMuc3VibWl0KSB8fCAhb3B0aW9ucy5zdWJtaXRcblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZUN5Y2xlKClcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0dW5mb2N1czogKCkgLT5cblx0XHRAaW5wdXQuYmx1cigpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuXG5cdG9uVW5mb2N1czogdGhpcy5vbkJsdXJcblx0XG5cdGRpc2FibGU6ICgpIC0+XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImRpc2FibGVkXCIsIHRydWVcblxuXHRlbmFibGU6ICgpID0+XG5cdFx0QGlucHV0LnJlbW92ZUF0dHJpYnV0ZSBcImRpc2FibGVkXCIsIHRydWVcblx0XG4iLCIjIEF1dGhvciAtIFNlcmdpeSBWb3Jvbm92XG4jIHR3aXR0ZXIuY29tL21hbWV6aXRvXG5cblxuaW9zID0gcmVxdWlyZSBcImlvcy1raXRcIlxuIyBtb2R1bGUgcmVxdWlyZXMgaW9za2l0IGZyb20gS2V2eW4gQXJub3R0IGh0dHBzOi8vZ2l0aHViLmNvbS9rLXZ5bi9mcmFtZXItaW9zLWtpdFxuXG5ib3ROYW1lPVwiXCJcbmJvdEltYWdlPVwiXCJcbiNzdHlsZXNcbm1lc3NhZ2VDbGFzcz1cblx0XCJwYWRkaW5nXCI6IFwiMTVweCA0MHB4XCJcbnF1ZXN0aW9uPVxuXHRcImJvcmRlclwiOiBcIjJweCBzb2xpZCAjRTJFMkUyXCIsXG5cdFwicGFkZGluZ1wiOiBcIjE1cHggNDBweFwiLFxuXHRcImJvcmRlci1yYWRpdXNcIjpcIjM0cHhcIixcblx0XCJmbG9hdFwiOlwibGVmdFwiXG5cbmFuc3dlcj1cblx0XCJiYWNrZ3JvdW5kXCI6IFwiI0ZERjhFNFwiLFxuXHRcImNvbG9yXCI6XCIjMDAwMDAwXCIsXG5cdFwiYm9yZGVyLXJhZGl1c1wiOlwiMzRweFwiLFxuXHRcInBhZGRpbmdcIjogXCIxNXB4IDQwcHhcIixcblx0XCJmbG9hdFwiOlwibGVmdFwiXG5cblxuI2ludGVyZmFjZVxuZXhwb3J0cy5jcmVhdGVNZXNzZW5nZXIgPShib3ROYW1lLGltYWdlLGxpa2VzLGJvdENhdGVnb3J5LHVzZXIpIC0+XG5cdCMgYm90SW1hZ2U9aW1hZ2Vcblx0IyB1c2VyPXVzZXJcblx0a2V5Ym9hcmQgPSBuZXcgaW9zLktleWJvYXJkXG5cdFx0aGlkZGVuOnRydWVcblxuXHRzdGF0dXNCYXIgPSBuZXcgaW9zLlN0YXR1c0JhclxuXHQgICAgY2FycmllcjpcIlZlcml6b25cIlxuXHQgICAgbmV0d29yazpcIjNHXCJcblx0ICAgIGJhdHRlcnk6NzBcblx0ICAgIHN0eWxlOlwiZGFya1wiXG5cblx0bmF2ID0gbmV3IGlvcy5OYXZCYXJcblx0XHRyaWdodDpcIlwiXG5cdFx0bGVmdDpcIiA8IFwiXG5cdFx0dGl0bGU6Ym90TmFtZVxuXHRcdGJsdXI6dHJ1ZVxuXG5cdHdpbmRvd1tcImN1c3RvbVRhYkJhclwiXT1uZXcgTGF5ZXJcblx0XHR3aWR0aDpTY3JlZW4ud2lkdGhcblx0XHRoZWlnaHQ6MTAwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHR5OkFsaWduLmJvdHRvbVxuXHRcdHNoYWRvd1k6IC0xXG5cdFx0c2hhZG93U3ByZWFkOiAyXG5cdFx0c2hhZG93Q29sb3I6IFwicmdiYSgxMjMsMTIzLDEyMywwLjIpXCJcblx0Y3VzdG9tVGFiQmFyLm9uIFwiY2hhbmdlOnlcIiwgLT5cblx0XHRzY3JvbGwuaGVpZ2h0PWN1c3RvbVRhYkJhci55XG5cblx0d2luZG93W1widGV4dEZpZWxkXCJdID0gbmV3IGlvcy5GaWVsZFxuXHRcdHdpZHRoOlNjcmVlbi53aWR0aFxuXHRcdGhlaWdodDogMTAwXG5cdFx0a2V5Ym9hcmQ6a2V5Ym9hcmRcblx0XHRwbGFjZWhvbGRlcjpcIlR5cGUgYSBtZXNzYWdlXCJcblx0XHRib3JkZXJXaWR0aDowXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6MFxuXHRcdFx0bGVhZGluZzowXG5cblx0dGV4dEZpZWxkLnBhcmVudD1jdXN0b21UYWJCYXJcblxuXHR3aW5kb3dbXCJzY3JvbGxcIl0gPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdG5hbWU6XCJzY3JvbGxcIlxuXHRcdGhlaWdodDpTY3JlZW4uaGVpZ2h0LTYwXG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRkaXJlY3Rpb25Mb2NrIDp0cnVlXG5cdFx0Y29udGVudEluc2V0OlxuXHRcdFx0dG9wOiBuYXYuaGVpZ2h0ICsgMjBcblx0XHRcdGJvdHRvbTo0MFxuXHRzY3JvbGwuY29udGVudC5iYWNrZ3JvdW5kQ29sb3I9XCJudWxsXCJcblx0c2Nyb2xsLmNvbnRlbnQuaGVpZ2h0PTBcblx0c2Nyb2xsLnNlbmRUb0JhY2soKVxuXG5cdCMgYm90SGVhZGVyPW5ldyBMYXllclxuXHQjIFx0c3VwZXJMYXllcjpzY3JvbGwuY29udGVudFxuXHQjIFx0d2lkdGg6U2NyZWVuLndpZHRoXG5cdCMgXHRiYWNrZ3JvdW5kQ29sb3I6XCIjZmZmXCJcblx0IyBcdHNoYWRvd1k6IC0xXG5cdCMgXHRzaGFkb3dTcHJlYWQ6IDJcblx0IyBcdHNoYWRvd0NvbG9yOiBcInJnYmEoMTIzLDEyMywxMjMsMC4yKVwiXG5cdCMgdXNlclBpY0JpZz1uZXcgYXZhdGFyXG5cdCMgXHRwYXJlbnQ6Ym90SGVhZGVyXG5cdCMgXHRuYW1lOlwiYXZhdGFyXCJcblx0IyBcdGltYWdlOmJvdEltYWdlXG5cdCMgXHRzaXplOjEyMFxuXHQjIFx0bWlkWTpib3RIZWFkZXIubWlkWVxuXHQjIFx0eDo1MFxuXHQjIGJvdFRpdGxlPW5ldyBpb3MuVGV4dFxuXHQjIFx0Zm9udFNpemU6MjFcblx0IyBcdGZvbnRXZWlnaHQ6MzAwXG5cdCMgXHR0ZXh0OmJvdE5hbWVcblx0IyBcdHN1cGVyTGF5ZXI6Ym90SGVhZGVyXG5cdCMgXHR5OnVzZXJQaWNCaWcueVxuXHQjIFx0eDp1c2VyUGljQmlnLm1heFgrNTBcblx0IyBsaWtlcz1uZXcgaW9zLlRleHRcblx0IyBcdGZvbnRTaXplOjE0XG5cdCMgXHR0ZXh0Omxpa2VzXG5cdCMgXHRzdXBlckxheWVyOmJvdEhlYWRlclxuXHQjIFx0eTp1c2VyUGljQmlnLnkrNTBcblx0IyBcdHg6dXNlclBpY0JpZy5tYXhYKzUwXG5cdCMgY2F0ZWdvcnk9bmV3IGlvcy5UZXh0XG5cdCMgXHRmb250U2l6ZToxNFxuXHQjIFx0dGV4dDpib3RDYXRlZ29yeVxuXHQjIFx0c3VwZXJMYXllcjpib3RIZWFkZXJcblx0IyBcdHk6dXNlclBpY0JpZy55KzkwXG5cdCMgXHR4OnVzZXJQaWNCaWcubWF4WCs1MFxuXHQjIFx0Y29sb3I6XCIjOTI5MjkyXCJcblxuXG5cdGJhY2tncm91bmRBID0gbmV3IEJhY2tncm91bmRMYXllclxuXG5cdCNmdW5jdGlvbnNcblx0dGV4dEZpZWxkLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblxuXHRcdHRleHRGaWVsZC5rZXlib2FyZC5rZXlzLnJldHVybi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblxuXHRcdFx0aWYgdGV4dEZpZWxkLnRleHQuaHRtbC5sZW5ndGg+MFxuXHRcdFx0XHRtc2c9bmV3IE1lc3NhZ2Vcblx0XHRcdFx0XHR0eXBlOlwidXNlck1zZ1wiXG5cdFx0XHRcdFx0dGV4dDp0ZXh0RmllbGQudGV4dC5odG1sXG5cdFx0XHRcdHVzZXJJbnB1dCh0ZXh0RmllbGQudGV4dC5odG1sKVxuXHRcdFx0XHR0ZXh0RmllbGQudGV4dC5odG1sPVwiXCJcblxuXHRcdHRleHRGaWVsZC5rZXlib2FyZC5vbiBcImNoYW5nZTp5XCIsIC0+XG5cdFx0XHRpZiB0ZXh0RmllbGQua2V5Ym9hcmQubWF4WT5TY3JlZW4uaGVpZ2h0XG5cdFx0XHRcdFx0XHRcdGN1c3RvbVRhYkJhci5tYXhZPXRleHRGaWVsZC5rZXlib2FyZC55XG5cdFx0XHRpZiB0ZXh0RmllbGQua2V5Ym9hcmQueT09U2NyZWVuLmhlaWdodFxuXHRcdFx0XHR0ZXh0RmllbGQua2V5Ym9hcmQuYXJlYS52aXNpYmxlPXRydWVcblxuXHRFdmVudHMud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRpZiBldmVudC5rZXlDb2RlIGlzIDEzXG5cdFx0XHRcdGlmIHRleHRGaWVsZC50ZXh0Lmh0bWwubGVuZ3RoPjBcblx0XHRcdFx0XHRtc2c9bmV3IE1lc3NhZ2Vcblx0XHRcdFx0XHRcdHR5cGU6XCJ1c2VyTXNnXCJcblx0XHRcdFx0XHRcdHRleHQ6dGV4dEZpZWxkLnRleHQuaHRtbFxuXHRcdFx0XHRcdHVzZXJJbnB1dCh0ZXh0RmllbGQudGV4dC5odG1sKVxuXHRcdFx0XHRcdHRleHRGaWVsZC50ZXh0Lmh0bWw9XCJcIlxuXG5cbm1lc3NhZ2VzPVtdXG5jbGFzcyBhdmF0YXIgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdHMpLT5cblx0XHRzdXBlciBvcHRzXG5cdFx0QHdpZHRoPW9wdHMuc2l6ZVxuXHRcdEBoZWlnaHQ9b3B0cy5zaXplXG5cdFx0QGJvcmRlclJhZGl1cz1vcHRzLnNpemVcbmJ1aWxkQ2hvaWNlcz0oYXJyYXksIHBhcmVudExheWVyKS0+XG5cdGZvciBjaG9pY2UsaSBpbiBhcnJheVxuXHRcdGNob2ljZUxheWVyPSBuZXcgaW9zLlRleHRcblx0XHRcdGZvbnRTaXplOjE2XG5cdFx0XHRuYW1lOlwiY2hvaWNlXCJcblx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRjb2xvcjpcIiMwMDg0RkZcIlxuXHRcdFx0dGV4dDpjaG9pY2VbMF1cblx0XHRcdGxpbmVIZWlnaHQ6MzJcblx0XHRcdHk6cGFyZW50TGF5ZXIuaGVpZ2h0XG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0d2lkdGg6cGFyZW50TGF5ZXIud2lkdGgvMlxuXHRcdFx0c3VwZXJMYXllcjpwYXJlbnRMYXllclxuXHRcdGRvKGNob2ljZUxheWVyKS0+XG5cdFx0XHRjaG9pY2VMYXllci5hY3Rpb249Y2hvaWNlWzFdXG5cdFx0XHRjaG9pY2VMYXllci5vbkNsaWNrIC0+XG5cdFx0XHRcdHJlc3BvbnNlPW5ldyBNZXNzYWdlXG5cdFx0XHRcdFx0dHlwZTpcInVzZXJNc2dcIlxuXHRcdFx0XHRcdHRleHQ6Y2hvaWNlTGF5ZXIuaHRtbFxuXG5cdFx0XHRcdGNob2ljZUZ1bmModGhpcy5hY3Rpb24pXG5cdFx0aWYgaT4wXG5cdFx0XHRjaG9pY2VMYXllci5zdHlsZT1cblx0XHRcdFx0XHRcInRleHQtYWxpZ25cIjpcImNlbnRlclwiXG5cdFx0XHRcdFx0XCJib3JkZXItdG9wXCI6XCIycHggc29saWQgI2UyZTJlMlwiXG5cdFx0Y2hvaWNlTGF5ZXIuc3R5bGU9XG5cdFx0XHRcdFx0XCJ0ZXh0LWFsaWduXCI6XCJjZW50ZXJcIlxuXHRcdHBhcmVudExheWVyLmhlaWdodCs9Y2hvaWNlTGF5ZXIuaGVpZ2h0XG5jbGFzcyBNZXNzYWdlXG5cdGNvbnN0cnVjdG9yOiAob3B0cyktPlxuXHRcdGNhcmRXaWR0aD1TY3JlZW4ud2lkdGgtMzAwXG5cdFx0Y2hpbGRhcnJheT1zY3JvbGwuY29udGVudC5jaGlsZHJlblxuXHRcdGlmIGNoaWxkYXJyYXlbMF1cblx0XHRcdHBvc1k9Y2hpbGRhcnJheVtjaGlsZGFycmF5Lmxlbmd0aC0xXS5tYXhZKzEwXG5cdFx0ZWxzZVxuXHRcdFx0cG9zWT0wXG5cdFx0aWYgb3B0cy50eXBlPT1cImJ1YmJsZXNcIlxuXG5cdFx0XHRidWJibGVzPW5ldyBMYXllclxuXHRcdFx0XHR5Oi04NFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJudWxsXCJcblx0XHRcdFx0aGVpZ2h0OjY0XG5cdFx0XHRcdHN1cGVyTGF5ZXI6Y3VzdG9tVGFiQmFyXG5cdFx0XHRidWJibGVYPTBcblx0XHRcdGZvciBjaG9pY2UsaSBpbiBvcHRzLmNob2ljZXNcblx0XHRcdFx0YnViYmxlPSBuZXcgaW9zLlRleHRcblx0XHRcdFx0XHRmb250U2l6ZToxN1xuXHRcdFx0XHRcdHRleHQ6Y2hvaWNlWzBdXG5cdFx0XHRcdFx0YWN0aW9uOmNob2ljZVsxXVxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6YnViYmxlc1xuXHRcdFx0XHRkbyhidWJibGUpLT5cblx0XHRcdFx0XHRidWJibGUuYWN0aW9uPWNob2ljZVsxXVxuXHRcdFx0XHRcdGJ1YmJsZS53aWR0aCs9ODBcblx0XHRcdFx0XHRidWJibGUuaGVpZ2h0Kz0zMFxuXHRcdFx0XHRcdGJ1YmJsZS54PWJ1YmJsZVhcblx0XHRcdFx0XHRidWJibGVYPWJ1YmJsZS5tYXhYKzEwXG5cdFx0XHRcdFx0YnViYmxlLnN0eWxlPWFuc3dlclxuXHRcdFx0XHRcdGJ1YmJsZS5vbkNsaWNrIC0+XG5cdFx0XHRcdFx0XHRyZXNwb25zZT1uZXcgTWVzc2FnZVxuXHRcdFx0XHRcdFx0XHR0eXBlOlwidXNlck1zZ1wiXG5cdFx0XHRcdFx0XHRcdHRleHQ6YnViYmxlLmh0bWxcblx0XHRcdFx0XHRcdGJ1YmJsZXMuZGVzdHJveSgpXG5cdFx0XHRcdFx0XHRjaG9pY2VGdW5jKHRoaXMuYWN0aW9uKVxuXG5cblx0XHRcdGJ1YmJsZXMud2lkdGg9YnViYmxlWFxuXHRcdFx0YnViYmxlcy5jb25zdHJhaW50cyA9XG5cdFx0XHRcdGhvcml6b250YWxDZW50ZXI6Y3VzdG9tVGFiQmFyXG5cdFx0XHRpb3MubGF5b3V0LnNldCgpXG5cdFx0ZWxzZSBpZiBvcHRzLnR5cGU9PVwidXNlck1zZ1wiIG9yIG9wdHMudHlwZT09XCJib3RNc2dcIlxuXHRcdFx0aWYgb3B0cy50ZXh0Lmxlbmd0aD4zMFxuXHRcdFx0XHRtZXNzYWdlPSBuZXcgaW9zLlRleHRcblx0XHRcdFx0XHRmb250U2l6ZToxN1xuXHRcdFx0XHRcdHRleHQ6b3B0cy50ZXh0XG5cdFx0XHRcdFx0c3VwZXJMYXllcjpzY3JvbGwuY29udGVudFxuXHRcdFx0XHRcdHk6cG9zWVxuXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0XHR3aWR0aDozMDBcblx0XHRcdGVsc2Vcblx0XHRcdFx0bWVzc2FnZT0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0Zm9udFNpemU6MTdcblx0XHRcdFx0XHR0ZXh0Om9wdHMudGV4dFxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6c2Nyb2xsLmNvbnRlbnRcblx0XHRcdFx0XHR5OnBvc1lcblx0XHRcdFx0bWVzc2FnZS53aWR0aD1tZXNzYWdlLl9lbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoKzgwXG5cdFx0XHRcdG1lc3NhZ2UuX2VsZW1lbnQuc3R5bGUud2lkdGggPSBudWxsXG5cdFx0XHRtZXNzYWdlLnN0eWxlPW1lc3NhZ2VDbGFzc1xuXHRcdFx0bWVzc2FnZS5oZWlnaHQ9bWVzc2FnZS5fZWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRIZWlnaHQrNDBcblx0XHRcdGlmIG9wdHMuY2hvaWNlc1xuXHRcdFx0XHRtZXNzYWdlLmhlaWdodCs9MzBcblx0XHRcdFx0aWYgbWVzc2FnZS53aWR0aDxjYXJkV2lkdGhcblx0XHRcdFx0XHRtZXNzYWdlLndpZHRoPWNhcmRXaWR0aFxuXHRcdFx0XHRidWlsZENob2ljZXMob3B0cy5jaG9pY2VzLG1lc3NhZ2UpXG5cdFx0XHRcdG1lc3NhZ2UuY2hpbGRyZW5bMF0uc3R5bGU9XG5cdFx0XHRcdFx0XCJib3JkZXItdG9wXCI6XCIycHggc29saWQgI2UyZTJlMlwiXG5cblx0XHRlbHNlIGlmIG9wdHMudHlwZT09XCJjYXJkc1wiXG5cdFx0XHRtZXNzYWdlPW5ldyBMYXllclxuXHRcdFx0XHR3aWR0aDpTY3JlZW4ud2lkdGgtOTBcblx0XHRcdFx0c3VwZXJMYXllcjpzY3JvbGwuY29udGVudFxuXHRcdFx0XHR5OnBvc1lcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwibnVsbFwiXG5cdFx0XHRtZXNzYWdlSG9sZGVyPW5ldyBMYXllclxuXHRcdFx0XHR4OjJcblx0XHRcdFx0eToyXG5cdFx0XHRcdHdpZHRoOm1lc3NhZ2Uud2lkdGhcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwibnVsbFwiXG5cdFx0XHRcdHN1cGVyTGF5ZXI6bWVzc2FnZVxuXG5cdFx0XHRpZiBvcHRzLmNhcmRzLmxlbmd0aD4xXG5cdFx0XHRcdGNhcmRzUGFnZXI9bmV3IFBhZ2VDb21wb25lbnRcblx0XHRcdFx0XHRzdXBlckxheWVyOm1lc3NhZ2VIb2xkZXJcblx0XHRcdFx0XHR3aWR0aDpjYXJkV2lkdGhcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJudWxsXCJcblx0XHRcdFx0XHRzY3JvbGxWZXJ0aWNhbDpmYWxzZVxuXHRcdFx0XHRcdGRpcmVjdGlvbkxvY2sgOnRydWVcblx0XHRcdFx0XHRjbGlwOmZhbHNlXG5cdFx0XHRcdHBhcmVudE9iamVjdD1jYXJkc1BhZ2VyLmNvbnRlbnRcblx0XHRcdGVsc2Vcblx0XHRcdFx0cGFyZW50T2JqZWN0PW1lc3NhZ2VIb2xkZXJcblx0XHRcdGZvciBjYXJkLGkgaW4gb3B0cy5jYXJkc1xuXG5cdFx0XHRcdGNhcmRMYXllcj1uZXcgTGF5ZXJcblx0XHRcdFx0XHR3aWR0aDpjYXJkV2lkdGhcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjZmZmXCJcblx0XHRcdFx0XHRzdXBlckxheWVyOnBhcmVudE9iamVjdFxuXHRcdFx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwiI0UyRTJFMlwiXG5cdFx0XHRcdFx0Ym9yZGVyUmFkaXVzOjM0XG5cdFx0XHRcdFx0Y2xpcDp0cnVlXG5cdFx0XHRcdFx0eDooY2FyZFdpZHRoKzIwKSppXG5cdFx0XHRcdFx0aGVpZ2h0OjBcblxuXHRcdFx0XHRpZiBjYXJkLmltYWdlXG5cdFx0XHRcdFx0Y292ZXI9bmV3IExheWVyXG5cdFx0XHRcdFx0XHR3aWR0aDpjYXJkTGF5ZXIud2lkdGhcblx0XHRcdFx0XHRcdGhlaWdodDozMDBcblx0XHRcdFx0XHRcdG5hbWU6XCJjb3ZlclwiXG5cdFx0XHRcdFx0XHRpbWFnZTpjYXJkLmltYWdlXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOmNhcmRMYXllclxuXHRcdFx0XHRcdGNhcmRMYXllci5oZWlnaHQ9Y292ZXIuaGVpZ2h0XG5cdFx0XHRcdFx0Y292ZXIuc3R5bGU9XG5cdFx0XHRcdFx0XHRcImJvcmRlci1ib3R0b21cIjpcIjJweCBzb2xpZCAjZTJlMmUyXCJcblx0XHRcdFx0Y2FyZFRleHRIb2xkZXI9bmV3IExheWVyXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOmNhcmRMYXllclxuXHRcdFx0XHRcdFx0d2lkdGg6Y2FyZFdpZHRoXG5cdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjZmZmXCJcblx0XHRcdFx0XHRcdHk6Y2FyZExheWVyLmhlaWdodFxuXHRcdFx0XHRcdFx0aGVpZ2h0OjBcblx0XHRcdFx0aWYgY2FyZC50aXRsZSBvciBjYXJkLnRleHQgb3IgY2FyZC5saW5rXG5cblx0XHRcdFx0XHRjYXJkVGV4dEhvbGRlci5zdHlsZT1cblx0XHRcdFx0XHRcdFwiYm9yZGVyLWJvdHRvbVwiOlwiMnB4IHNvbGlkICNlMmUyZTJcIlxuXG5cdFx0XHRcdGlmIGNhcmQudGl0bGVcblx0XHRcdFx0XHR0aXRsZUxheWVyPSBuZXcgaW9zLlRleHRcblx0XHRcdFx0XHRcdGZvbnRTaXplOjE1XG5cdFx0XHRcdFx0XHRmb250V2VpZ2h0OjUwMFxuXHRcdFx0XHRcdFx0dGV4dDpjYXJkLnRpdGxlXG5cdFx0XHRcdFx0XHR4OjIwXG5cdFx0XHRcdFx0XHRsaW5lSGVpZ2h0OjMwXG5cdFx0XHRcdFx0XHR5OmNhcmRUZXh0SG9sZGVyLmhlaWdodFxuXHRcdFx0XHRcdFx0bmFtZTpcInRpdGxlXCJcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHRcdFx0XHR3aWR0aDooY2FyZExheWVyLndpZHRoLTQwKS8yXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOmNhcmRUZXh0SG9sZGVyXG5cdFx0XHRcdFx0Y2FyZFRleHRIb2xkZXIuaGVpZ2h0Kz10aXRsZUxheWVyLmhlaWdodFxuXHRcdFx0XHRpZiBjYXJkLnRleHRcblx0XHRcdFx0XHR0ZXh0PSBuZXcgaW9zLlRleHRcblx0XHRcdFx0XHRcdGZvbnRTaXplOjEzXG5cdFx0XHRcdFx0XHR4OjIwXG5cdFx0XHRcdFx0XHRjb2xvcjpcIiM2NjY2NjZcIlxuXHRcdFx0XHRcdFx0dGV4dDpjYXJkLnRleHRcblx0XHRcdFx0XHRcdHk6Y2FyZFRleHRIb2xkZXIuaGVpZ2h0XG5cdFx0XHRcdFx0XHRuYW1lOlwidGV4dFwiXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0XHRcdFx0d2lkdGg6KGNhcmRMYXllci53aWR0aC00MCkvMlxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjpjYXJkVGV4dEhvbGRlclxuXHRcdFx0XHRcdGNhcmRUZXh0SG9sZGVyLmhlaWdodCs9dGV4dC5oZWlnaHRcblx0XHRcdFx0aWYgY2FyZC5saW5rXG5cdFx0XHRcdFx0bGluaz0gbmV3IGlvcy5UZXh0XG5cdFx0XHRcdFx0XHRmb250U2l6ZToxM1xuXHRcdFx0XHRcdFx0Y29sb3I6XCIjNjY2NjY2XCJcblx0XHRcdFx0XHRcdHg6MjBcblx0XHRcdFx0XHRcdGxpbmVIZWlnaHQ6MzBcblx0XHRcdFx0XHRcdHRleHQ6Y2FyZC5saW5rXG5cdFx0XHRcdFx0XHR5OmNhcmRUZXh0SG9sZGVyLmhlaWdodFxuXHRcdFx0XHRcdFx0bmFtZTpcImxpbmtcIlxuXHRcdFx0XHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdFx0XHRcdHdpZHRoOihjYXJkTGF5ZXIud2lkdGgtNDApLzJcblx0XHRcdFx0XHRcdHN1cGVyTGF5ZXI6Y2FyZFRleHRIb2xkZXJcblx0XHRcdFx0XHRjYXJkVGV4dEhvbGRlci5oZWlnaHQrPWxpbmsuaGVpZ2h0XG5cdFx0XHRcdGNhcmRUZXh0SG9sZGVyLmhlaWdodCs9MjBcblx0XHRcdFx0Y2FyZExheWVyLmhlaWdodCs9Y2FyZFRleHRIb2xkZXIuaGVpZ2h0XG5cdFx0XHRcdGJ1aWxkQ2hvaWNlcyhjYXJkLmNob2ljZXMsY2FyZExheWVyKVxuXHRcdFx0XHRtZXNzYWdlLmhlaWdodD1jYXJkTGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdG1lc3NhZ2VIb2xkZXIuaGVpZ2h0PWNhcmRMYXllci5oZWlnaHRcblx0XHRcdFx0aWYgY2FyZHNQYWdlclxuXHRcdFx0XHRcdGNhcmRzUGFnZXIuaGVpZ2h0PWNhcmRMYXllci5oZWlnaHRcblx0XHRcdFx0XHRtZXNzYWdlSG9sZGVyLmhlaWdodD1jYXJkTGF5ZXIuaGVpZ2h0XG5cblxuXG5cblx0XHRpZiBvcHRzLnR5cGU9PVwidXNlck1zZ1wiXG5cdFx0XHRtZXNzYWdlLnN0eWxlPWFuc3dlclxuXHRcdFx0bWVzc2FnZS54PVNjcmVlbi53aWR0aFxuXHRcdFx0bWVzc2FnZS5vcGFjaXR5PTBcblx0XHRcdG1lc3NhZ2UuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdG1heFg6U2NyZWVuLndpZHRoLTIwXG5cdFx0XHRcdFx0b3BhY2l0eToxXG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG5cdFx0ZWxzZSBpZiBvcHRzLnR5cGU9PVwiYm90TXNnXCJcblx0XHRcdG1lc3NhZ2Uuc3R5bGU9cXVlc3Rpb25cblxuXHRcdGlmIG9wdHMudHlwZT09XCJib3RNc2dcIiBvciBvcHRzLnR5cGU9PVwiY2FyZHNcIlxuXHRcdFx0bWVzc2FnZS5vcGFjaXR5PTBcblx0XHRcdG1lc3NhZ2UubWF4WD0wXG5cdFx0XHRtZXNzYWdlLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHR4OjkwXG5cdFx0XHRcdFx0b3BhY2l0eToxXG5cdFx0XHRcdHRpbWU6IDAuMlxuXHRcdFx0XHRkZWxheTowLjNcblx0XHRcdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdFx0dXNlclBpYz1uZXcgYXZhdGFyXG5cdFx0XHRcdHBhcmVudDptZXNzYWdlXG5cdFx0XHRcdG5hbWU6XCJhdmF0YXJcIlxuXHRcdFx0XHRpbWFnZTpib3RJbWFnZVxuXHRcdFx0XHRzaXplOjYwXG5cdFx0XHR1c2VyUGljLngtPTcwXG5cdFx0XHR1c2VyUGljLnk9QWxpZ24uYm90dG9tXG5cdFx0XHR1c2VyUGljLnNlbmRUb0JhY2soKVxuXHRcdGlmIG9wdHMudHlwZSE9XCJidWJibGVzXCJcblx0XHRcdG1lc3NhZ2VzLnB1c2gobWVzc2FnZSlcblx0XHRmb3IgbXNnLGkgaW4gbWVzc2FnZXNcblx0XHRcdGlmIG1lc3NhZ2VzW2krMV1cblx0XHRcdFx0aWYgbXNnLmNoaWxkcmVuWzBdIGFuZCBtZXNzYWdlc1tpKzFdLmNoaWxkcmVuWzBdXG5cdFx0XHRcdFx0bXNnLmNoaWxkcmVuV2l0aE5hbWUoXCJhdmF0YXJcIilbMF0ub3BhY2l0eT0wXG5cdFx0c2Nyb2xsLnVwZGF0ZUNvbnRlbnQoKVxuXHRcdG1lc3NhZ2VzU2hvd249c2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW5cblxuXHRcdGlmIChtZXNzYWdlc1Nob3duW21lc3NhZ2VzU2hvd24ubGVuZ3RoLTFdLnNjcmVlbkZyYW1lLnkrMjAwKT5zY3JvbGwuaGVpZ2h0XG5cblx0XHRcdHNjcm9sbC5zY3JvbGxUb1BvaW50KCB5OiBzY3JvbGwuY29udGVudC5oZWlnaHQrMjAwLCB0cnVlLCBjdXJ2ZTogXCJlYXNlXCIpXG5cdGV4cG9ydHMuTWVzc2FnZT1NZXNzYWdlXG4iLCJleHBvcnRzLnNlbmQgPSh0ZXh0LGNhbGxiYWNrLCB0b2tlbiwgc2Vzc2lvbiktPlxuXHR4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Rcblx0eGhyLm9wZW4gJ1BPU1QnLCBcImh0dHBzOi8vYXBpLmFwaS5haS92MS9xdWVyeVwiLCB0cnVlXG5cdHhoci5zZXRSZXF1ZXN0SGVhZGVyICdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbidcblx0eGhyLnNldFJlcXVlc3RIZWFkZXIgJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblxuXHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gLT5cblxuXHRcdGlmIHhoci5yZWFkeVN0YXRlID09IDQgYW5kIHhoci5zdGF0dXMgPT0gMjAwXG5cdFx0XHRjYWxsYmFjayBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpXG5cdFx0cmV0dXJuXG5cblx0ZGF0YSA9IEpTT04uc3RyaW5naWZ5KFxuXHRcdHF1ZXJ5OiB0ZXh0XG5cdFx0bGFuZzogJ2VuJ1xuXHRcdHNlc3Npb25JZDogc2Vzc2lvbilcblx0eGhyLnNlbmQgZGF0YVxuXHRyZXR1cm5cbiIsImV4cG9ydHMuc2VuZCA9KHRleHQsY2FsbGJhY2ssIHRva2VuLCBzZXNzaW9uKS0+XG5cdHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdFxuXHR4aHIub3BlbiAnUE9TVCcsIFwiaHR0cHM6Ly9hcGkuYXBpLmFpL3YxL3F1ZXJ5XCIsIHRydWVcblx0eGhyLnNldFJlcXVlc3RIZWFkZXIgJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJ1xuXHR4aHIuc2V0UmVxdWVzdEhlYWRlciAnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuXG5cdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAtPlxuXG5cdFx0aWYgeGhyLnJlYWR5U3RhdGUgPT0gNCBhbmQgeGhyLnN0YXR1cyA9PSAyMDBcblx0XHRcdGNhbGxiYWNrIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClcblx0XHRyZXR1cm5cblxuXHRkYXRhID0gSlNPTi5zdHJpbmdpZnkoXG5cdFx0cXVlcnk6IHRleHRcblx0XHRsYW5nOiAnZW4nXG5cdFx0c2Vzc2lvbklkOiBzZXNzaW9uKVxuXHR4aHIuc2VuZCBkYXRhXG5cdHJldHVyblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFzQkFBO0FEQUEsT0FBTyxDQUFDLElBQVIsR0FBYyxTQUFDLElBQUQsRUFBTSxRQUFOLEVBQWdCLEtBQWhCLEVBQXVCLE9BQXZCO0FBQ2IsTUFBQTtFQUFBLEdBQUEsR0FBTSxJQUFJO0VBQ1YsR0FBRyxDQUFDLElBQUosQ0FBUyxNQUFULEVBQWlC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
