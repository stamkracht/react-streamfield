var _dec, _class, _class2, _temp;

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
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import { Draggable } from 'react-beautiful-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { blockUpdated as _blockUpdated, deleteBlock as _deleteBlock, showBlock as _showBlock } from './actions';
import { getDescendantsIds, getLayout, getNestedBlockDefinition, getSiblingsIds, isSimpleLayout, triggerCustomEvent as _triggerCustomEvent } from './processing/utils';
import AddButton from './AddButton';
import BlockContent from './BlockContent';
import BlockHeader from './BlockHeader';
import BlockActions from './BlockActions';
var Block = (_dec = connect(function (state, props) {
  var fieldId = props.fieldId,
      id = props.id;
  var fieldData = state[fieldId];
  var blocks = fieldData.blocks;
  var block = blocks[id];
  var siblings = getSiblingsIds(state, fieldId, id);
  var blockDefinition = getNestedBlockDefinition(state, fieldId, id);
  var hasDescendantError = getDescendantsIds(state, fieldId, id, true).some(function (descendantBlockId) {
    return blocks[descendantBlockId].hasError;
  });
  return {
    blockDefinition: blockDefinition,
    layout: getLayout(blockDefinition, fieldData.isMobile),
    isSimpleLayout: isSimpleLayout(blockDefinition, fieldData.isMobile),
    standalone: props.standalone || blockDefinition.standalone,
    parentId: block.parent,
    hasError: hasDescendantError,
    closed: block.closed,
    hidden: block.hidden,
    shouldUpdate: block.shouldUpdate,
    index: siblings.indexOf(id)
  };
}, function (dispatch, props) {
  var fieldId = props.fieldId,
      id = props.id;
  return bindActionCreators({
    blockUpdated: function blockUpdated() {
      return _blockUpdated(fieldId, id);
    },
    showBlock: function showBlock() {
      return _showBlock(fieldId, id);
    },
    deleteBlock: function deleteBlock() {
      return _deleteBlock(fieldId, id);
    }
  }, dispatch);
}), _dec(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Block, _React$Component);

  function Block(props) {
    var _this;

    _classCallCheck(this, Block);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Block).call(this, props));

    _this.onDraggableContainerAnimationEnd = function () {
      if (_this.props.hidden) {
        _this.triggerCustomEvent('delete');

        _this.props.deleteBlock();
      }
    };

    _this.dragHandleRef = React.createRef();
    _this.contentRef = React.createRef();
    return _this;
  }

  _createClass(Block, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return nextProps.shouldUpdate || nextProps.layout !== this.props.layout;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (!prevProps.shouldUpdate) {
        this.props.blockUpdated();
      }
    }
  }, {
    key: "triggerCustomEvent",
    value: function triggerCustomEvent(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.hidden) {
        this.props.showBlock();
      }
    }
  }, {
    key: "wrapSortable",
    value: function wrapSortable(blockContent) {
      var _this2 = this;

      var _this$props = this.props,
          layout = _this$props.layout,
          isSimpleLayout = _this$props.isSimpleLayout,
          fieldId = _this$props.fieldId,
          id = _this$props.id,
          parentId = _this$props.parentId,
          index = _this$props.index,
          hasError = _this$props.hasError,
          collapsible = _this$props.collapsible,
          sortable = _this$props.sortable,
          canAdd = _this$props.canAdd;
      var blockClassName = "c-sf-block ".concat(layout, " ").concat(hasError ? 'c-sf-block--error' : '');
      var addButton = React.createElement(AddButton, {
        fieldId: fieldId,
        parentId: parentId,
        blockId: id,
        visible: canAdd
      });

      if (sortable) {
        return React.createElement(Draggable, {
          draggableId: id,
          index: index,
          type: "".concat(fieldId, "-").concat(parentId)
        }, function (provided, snapshot) {
          return React.createElement("div", _extends({
            className: "c-sf-container__block-container",
            ref: provided.innerRef
          }, provided.draggableProps), React.createElement("div", {
            className: blockClassName
          }, React.createElement(BlockHeader, {
            fieldId: fieldId,
            blockId: id,
            collapsibleBlock: collapsible,
            sortableBlock: sortable,
            canDuplicate: canAdd,
            dragHandleRef: _this2.dragHandleRef,
            dragHandleProps: provided.dragHandleProps
          }), blockContent, isSimpleLayout ? React.createElement(BlockActions, {
            fieldId: fieldId,
            blockId: id,
            sortableBlock: sortable,
            canDuplicate: canAdd,
            dragHandleRef: _this2.dragHandleRef
          }) : null), addButton);
        });
      }

      return React.createElement("div", {
        className: "c-sf-container__block-container"
      }, React.createElement("div", {
        className: blockClassName
      }, React.createElement(BlockHeader, {
        fieldId: fieldId,
        blockId: id,
        collapsibleBlock: collapsible,
        sortableBlock: sortable,
        canDuplicate: canAdd,
        dragHandleRef: this.dragHandleRef
      }), blockContent), addButton);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          fieldId = _this$props2.fieldId,
          id = _this$props2.id,
          parentId = _this$props2.parentId,
          standalone = _this$props2.standalone,
          collapsible = _this$props2.collapsible,
          canAdd = _this$props2.canAdd;
      var blockContent = React.createElement(BlockContent, {
        ref: this.contentRef,
        fieldId: fieldId,
        blockId: id,
        collapsible: !standalone && collapsible
      });

      if (standalone) {
        return React.createElement("div", {
          className: "c-sf-container__block-container"
        }, React.createElement("div", {
          className: "c-sf-block"
        }, blockContent));
      }

      return React.createElement(AnimateHeight, {
        height: this.draggableHeight,
        onAnimationEnd: this.onDraggableContainerAnimationEnd
      }, this.wrapSortable(blockContent));
    }
  }, {
    key: "draggableHeight",
    get: function get() {
      return this.props.hidden ? 0 : 'auto';
    }
  }]);

  return Block;
}(React.Component), _class2.defaultProps = {
  standalone: false,
  collapsible: true,
  sortable: true,
  canAdd: true
}, _temp)) || _class);
process.env.NODE_ENV !== "production" ? Block.propTypes = {
  fieldId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  standalone: PropTypes.bool,
  collapsible: PropTypes.bool,
  sortable: PropTypes.bool,
  canAdd: PropTypes.bool
} : void 0;
export default Block;