var _dec, _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFieldName, getNestedBlockDefinition, isField, isNA, isStruct, replaceWithComponent } from './processing/utils';
import { changeBlockValue as _changeBlockValue } from './actions';
import Block from './Block';
import BlocksContainer from './BlocksContainer';
import RawHtmlFieldInput from './RawHtmlFieldInput';
var FieldInput = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  var block = state[fieldId].blocks[blockId];
  return {
    blockDefinition: getNestedBlockDefinition(state, fieldId, blockId),
    html: block.html,
    value: block.value
  };
}, function (dispatch, props) {
  var fieldId = props.fieldId,
      blockId = props.blockId;
  return bindActionCreators({
    changeBlockValue: function changeBlockValue(value) {
      return _changeBlockValue(fieldId, blockId, value);
    }
  }, dispatch);
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FieldInput, _React$Component);

  function FieldInput() {
    _classCallCheck(this, FieldInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(FieldInput).apply(this, arguments));
  }

  _createClass(FieldInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fieldId = _this$props.fieldId,
          blockDefinition = _this$props.blockDefinition,
          blockId = _this$props.blockId,
          value = _this$props.value;

      if (blockDefinition.reactComponent && blockDefinition.reactComponent.block_type == 'FieldInput' && !this.props.custom) {
        var Component = window.reactStreamFieldComponentMapping[blockDefinition.reactComponent.name];
        return React.createElement(Component, _extends({
          fieldId: fieldId,
          blockId: blockId,
          blockDefinition: blockDefinition
        }, blockDefinition.reactComponent.props || {}));
      }

      if (isStruct(blockDefinition)) {
        // Nested StructBlock
        return React.createElement(Block, {
          fieldId: fieldId,
          id: blockId,
          standalone: true,
          sortable: false,
          collapsible: false
        });
      }

      var html = this.props.html;

      if (isNA(html)) {
        html = blockDefinition.html;
      }

      if (isField(blockDefinition)) {
        if (isNA(html)) {
          html = "<input id=\"".concat(blockId, "\" name=\"").concat(getFieldName(blockId), "\"\n                       type=\"text\" />");
        }

        return React.createElement(RawHtmlFieldInput, {
          fieldId: fieldId,
          blockDefinition: blockDefinition,
          blockId: blockId,
          html: html,
          value: value,
          changeBlockValue: this.props.changeBlockValue
        });
      }

      var blocksContainer = React.createElement(BlocksContainer, {
        fieldId: fieldId,
        id: blockId
      });

      if (isNA(html)) {
        return blocksContainer;
      }

      return replaceWithComponent(html, '<noscript data-blocks-container></noscript>', blocksContainer);
    }
  }]);

  return FieldInput;
}(React.Component)) || _class);
process.env.NODE_ENV !== "production" ? FieldInput.propTypes = {
  fieldId: PropTypes.string.isRequired,
  blockId: PropTypes.string.isRequired
} : void 0;
export default FieldInput;