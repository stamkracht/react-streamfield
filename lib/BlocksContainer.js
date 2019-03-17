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
import { Droppable } from 'react-beautiful-dnd';
import Block from './Block';
import AddButton from './AddButton';
import { getNestedBlockDefinition, isNA } from './processing/utils';
var BlocksContainer = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      id = props.id;
  var fieldData = state[fieldId];
  var blocksIds = id === null ? fieldData.rootBlocks : fieldData.blocks[id].value;
  var minNum, maxNum;

  if (id === null) {
    minNum = fieldData.minNum;
    maxNum = fieldData.maxNum;
  } else {
    var blockDefinition = getNestedBlockDefinition(state, fieldId, id);
    minNum = blockDefinition.minNum;
    maxNum = blockDefinition.maxNum;
  }

  if (isNA(minNum)) {
    minNum = 0;
  }

  if (isNA(maxNum)) {
    maxNum = Infinity;
  }

  return {
    minNum: minNum,
    maxNum: maxNum,
    gutteredAdd: fieldData.gutteredAdd,
    blocksIds: blocksIds
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BlocksContainer, _React$Component);

  function BlocksContainer() {
    _classCallCheck(this, BlocksContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlocksContainer).apply(this, arguments));
  }

  _createClass(BlocksContainer, [{
    key: "renderBlock",
    value: function renderBlock(blockId) {
      var canAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return React.createElement(Block, {
        key: blockId,
        fieldId: this.props.fieldId,
        id: blockId,
        canAdd: canAdd
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          fieldId = _this$props.fieldId,
          id = _this$props.id,
          blocksIds = _this$props.blocksIds,
          maxNum = _this$props.maxNum,
          gutteredAdd = _this$props.gutteredAdd;
      var droppableId = "".concat(fieldId, "-").concat(id);
      var num = blocksIds.length;
      var canAdd = num < maxNum;
      return React.createElement(Droppable, {
        droppableId: droppableId,
        type: droppableId
      }, function (provided, snapshot) {
        return React.createElement("div", {
          ref: provided.innerRef,
          className: classNames('c-sf-container', snapshot.isDraggingOver && 'c-sf-container--dragging', gutteredAdd && 'c-sf-container--add-in-gutter')
        }, React.createElement(AddButton, {
          fieldId: fieldId,
          parentId: id,
          open: blocksIds.length === 0,
          visible: canAdd
        }), blocksIds.map(function (blockId) {
          return _this.renderBlock(blockId, canAdd);
        }), provided.placeholder);
      });
    }
  }]);

  return BlocksContainer;
}(React.Component)) || _class);
process.env.NODE_ENV !== "production" ? BlocksContainer.propTypes = {
  fieldId: PropTypes.string.isRequired,
  id: PropTypes.string
} : void 0;
export default BlocksContainer;