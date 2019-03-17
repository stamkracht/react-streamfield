function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { addBlock, deleteBlock, duplicateBlock, moveBlock } from './processing/reducers';
import { valueToState } from './processing/conversions';
import { applyToBlock, deepCopy, getNestedBlockDefinition, isStruct } from './processing/utils';
var initialState = {};
export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'INITIALIZE_STREAM_FIELD':
      {
        var data = deepCopy(action.data);
        var required = data.required,
            minNum = data.minNum,
            maxNum = data.maxNum,
            icons = data.icons,
            labels = data.labels,
            gutteredAdd = data.gutteredAdd,
            blockDefinitions = data.blockDefinitions,
            isMobile = data.isMobile,
            value = data.value;
        state = _objectSpread({}, state, _defineProperty({}, action.id, {
          required: required,
          minNum: minNum,
          maxNum: maxNum,
          icons: icons,
          labels: labels,
          gutteredAdd: gutteredAdd,
          blockDefinitions: blockDefinitions,
          isMobile: isMobile
        }));
        return valueToState(state, action.id, value);
      }

    case 'SET_IS_MOBILE':
      {
        return _objectSpread({}, state, _defineProperty({}, action.id, _objectSpread({}, state[action.id], {
          isMobile: action.isMobile
        })));
      }

    case 'BLOCK_UPDATED':
      {
        var fieldId = action.fieldId,
            blockId = action.blockId;
        return applyToBlock(state, fieldId, blockId, function (block) {
          return _objectSpread({}, block, {
            shouldUpdate: false
          });
        });
      }

    case 'CHANGE_BLOCK_VALUES':
      {
        var _fieldId = action.fieldId,
            _blockId = action.blockId,
            _value = action.value;
        state = applyToBlock(state, _fieldId, _blockId, function (block) {
          return _objectSpread({}, block, {
            value: _value,
            shouldUpdate: true
          });
        });
        var blocks = state[_fieldId].blocks;
        var block = blocks[_blockId];
        var parentBlockId = block.parent;

        if (parentBlockId !== null) {
          var parentBlockDefinition = getNestedBlockDefinition(state, _fieldId, parentBlockId);

          if (isStruct(parentBlockDefinition)) {
            state = applyToBlock(state, _fieldId, parentBlockId, function (block) {
              return _objectSpread({}, block, {
                shouldUpdate: true
              });
            });
          }
        }

        return state;
      }

    case 'TOGGLE_BLOCK':
      {
        var _fieldId2 = action.fieldId,
            _blockId2 = action.blockId;
        return applyToBlock(state, _fieldId2, _blockId2, function (block) {
          return _objectSpread({}, block, {
            closed: block.closed === undefined ? false : !block.closed,
            shouldUpdate: true
          });
        });
      }

    case 'SHOW_BLOCK':
      {
        var _fieldId3 = action.fieldId,
            _blockId3 = action.blockId;
        return applyToBlock(state, _fieldId3, _blockId3, function (block) {
          return _objectSpread({}, block, {
            hidden: false,
            shouldUpdate: true
          });
        });
      }

    case 'HIDE_BLOCK':
      {
        var _fieldId4 = action.fieldId,
            _blockId4 = action.blockId;
        return applyToBlock(state, _fieldId4, _blockId4, function (block) {
          return _objectSpread({}, block, {
            hidden: true,
            shouldUpdate: true
          });
        });
      }

    case 'ADD_BLOCK':
      {
        var _fieldId5 = action.fieldId,
            parentId = action.parentId,
            index = action.index,
            blockType = action.blockType;
        return addBlock(state, _fieldId5, parentId, index, blockType);
      }

    case 'DUPLICATE_BLOCK':
      {
        var _fieldId6 = action.fieldId,
            _blockId5 = action.blockId;
        return duplicateBlock(state, _fieldId6, _blockId5);
      }

    case 'MOVE_BLOCK':
      {
        var _fieldId7 = action.fieldId,
            _blockId6 = action.blockId,
            newIndex = action.newIndex;
        return moveBlock(state, _fieldId7, _blockId6, newIndex);
      }

    case 'DELETE_BLOCK':
      {
        return deleteBlock(state, action.fieldId, action.blockId);
      }

    case 'UPDATE_BLOCKS':
      {
        return _objectSpread({}, state, _defineProperty({}, action.fieldId, _objectSpread({}, state[action.fieldId], {
          blocks: _objectSpread({}, state[action.fieldId]['blocks'], action.blocks)
        })));
      }

    default:
      {
        return state;
      }
  }
});