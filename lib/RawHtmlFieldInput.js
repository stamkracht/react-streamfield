function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getFieldName, isStatic, shouldRunInnerScripts } from './processing/utils';

var RawHtmlFieldInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RawHtmlFieldInput, _React$Component);

  function RawHtmlFieldInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RawHtmlFieldInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RawHtmlFieldInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onChange = function (event) {
      var input = event.target;
      var value;

      if (input.type === 'file') {
        value = input.files;
      } else if (input.type === 'checkbox' || input.type === 'radio') {
        var boxes = _this.inputs;
        value = boxes.filter(function (box) {
          return box.checked;
        }).map(function (box) {
          return box.value;
        });
      } else if (input.tagName === 'SELECT') {
        value = input.options[input.selectedIndex].value;
      } else {
        value = input.value;
      }

      _this.props.changeBlockValue(value);
    };

    return _this;
  }

  _createClass(RawHtmlFieldInput, [{
    key: "runInnerScripts",
    value: function runInnerScripts() {
      if (shouldRunInnerScripts(this.props.blockDefinition)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = ReactDOM.findDOMNode(this).querySelectorAll('script')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var script = _step.value;
            script.parentNode.removeChild(script);
            window.eval(script.innerHTML);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "setValue",
    value: function setValue(input) {
      var value = this.props.value;

      if (value !== undefined && value !== null) {
        if (input.type === 'file') {
          input.files = value;
        } else if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value === null ? false : typeof value === 'boolean' ? value : value.includes(input.value);
        } else if (input.type === 'hidden') {
          input.value = value;
          input.dispatchEvent(new Event('change'));
        } else {
          input.value = value;
        }
      }
    }
  }, {
    key: "bindChange",
    value: function bindChange(input) {
      if (input.type === 'hidden') {
        var observer = new MutationObserver(function () {
          input.dispatchEvent(new Event('change'));
        });
        observer.observe(input, {
          attributes: true,
          attributeFilter: ['value']
        });
        this.mutationObservers.push(observer);
      }

      input.addEventListener('change', this.onChange);
    }
  }, {
    key: "unbindChange",
    value: function unbindChange(input) {
      input.removeEventListener('change', this.onChange);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          blockDefinition = _this$props.blockDefinition,
          blockId = _this$props.blockId;

      if (!isStatic(blockDefinition)) {
        var name = getFieldName(blockId);
        this.inputs = _toConsumableArray(ReactDOM.findDOMNode(this).querySelectorAll("[name=\"".concat(name, "\"]")));

        if (this.inputs.length === 0) {
          throw Error("Could not find input with name \"".concat(name, "\""));
        }

        this.mutationObservers = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var input = _step2.value;
            this.setValue(input);
            this.bindChange(input); // We remove the name attribute to remove inputs from the submitted form.

            input.removeAttribute('name');
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      this.runInnerScripts();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!isStatic(this.props.blockDefinition)) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.mutationObservers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var observer = _step3.value;
            observer.disconnect();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.inputs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var input = _step4.value;
            this.unbindChange(input);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.html
        }
      });
    }
  }, {
    key: "html",
    get: function get() {
      var _this$props2 = this.props,
          blockDefinition = _this$props2.blockDefinition,
          html = _this$props2.html,
          blockId = _this$props2.blockId;

      if (isStatic(blockDefinition)) {
        return html;
      }

      return html.replace(/__ID__/g, blockId);
    }
  }]);

  return RawHtmlFieldInput;
}(React.Component);

process.env.NODE_ENV !== "production" ? RawHtmlFieldInput.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockDefinition: PropTypes.object.isRequired,
  blockId: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  value: PropTypes.any,
  changeBlockValue: PropTypes.func.isRequired
} : void 0;
export default RawHtmlFieldInput;