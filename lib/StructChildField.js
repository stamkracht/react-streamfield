var _dec, _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getFieldName, getLabel, getNestedBlockDefinition } from './processing/utils';
import FieldInput from './FieldInput';
var StructChildField = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      parentBlockId = props.parentBlockId,
      type = props.type;
  var blocks = state[fieldId].blocks;
  var parentBlock = blocks[parentBlockId];
  var blockId = parentBlock.value.find(function (childBlockId) {
    return blocks[childBlockId].type === type;
  });
  return {
    blockDefinition: getNestedBlockDefinition(state, fieldId, blockId),
    blockId: blockId
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StructChildField, _React$Component);

  function StructChildField() {
    _classCallCheck(this, StructChildField);

    return _possibleConstructorReturn(this, _getPrototypeOf(StructChildField).apply(this, arguments));
  }

  _createClass(StructChildField, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fieldId = _this$props.fieldId,
          blockId = _this$props.blockId,
          blockDefinition = _this$props.blockDefinition;
      return React.createElement("div", {
        className: classNames('field', !!blockDefinition.required && 'required')
      }, React.createElement("label", {
        className: "field__label",
        htmlFor: getFieldName(blockId)
      }, getLabel(blockDefinition)), React.createElement(FieldInput, {
        fieldId: fieldId,
        blockId: blockId
      }));
    }
  }]);

  return StructChildField;
}(React.Component)) || _class);
process.env.NODE_ENV !== "production" ? StructChildField.propTypes = {
  fieldId: PropTypes.string.isRequired,
  parentBlockId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
} : void 0;
export default StructChildField;