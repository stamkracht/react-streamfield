function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { stateToValue, valueToState } from './conversions';
import { initialState, fieldId, rootBlock1, rootBlock2, listBlock, structBlock, streamBlock, rootBlock1Id, rootBlock2Id, listBlockId, listBlockImage1Id, listBlockImage2Id, structBlockId, structBlockHeightId, structBlockImagesId, structBlockImageCell1Id, structBlockImage1Id, structBlockWidth1Id, structBlockImageCell2Id, structBlockImage2Id, structBlockWidth2Id, structBlockRelatedPagesId, structBlockPageId, streamBlockId, streamBlockImageId, streamBlockTitleId, rootBlock1State, rootBlock2State, listBlockState, listBlockImage1State, listBlockImage2State, structBlockState, structBlockHeightState, structBlockImagesState, structBlockImage1State, structBlockWidth1State, structBlockImageCell1State, structBlockImage2State, structBlockWidth2State, structBlockImageCell2State, structBlockRelatedPagesState, structBlockPageState, streamBlockState, streamBlockImage1State, streamBlockImage2State } from './samples';
describe('valueToState', function () {
  test('Empty value', function () {
    expect(valueToState(initialState, fieldId, [])).toEqual(_objectSpread({}, initialState, _defineProperty({}, fieldId, _objectSpread({}, initialState[fieldId], {
      rootBlocks: [],
      blocks: {}
    }))));
  });
  test('Root blocks', function () {
    var _blocks;

    expect(valueToState(initialState, fieldId, [rootBlock1, rootBlock2])).toEqual(_objectSpread({}, initialState, _defineProperty({}, fieldId, _objectSpread({}, initialState[fieldId], {
      rootBlocks: [rootBlock1Id, rootBlock2Id],
      blocks: (_blocks = {}, _defineProperty(_blocks, rootBlock1Id, rootBlock1State), _defineProperty(_blocks, rootBlock2Id, rootBlock2State), _blocks)
    }))));
  });
  test('ListBlock', function () {
    var _blocks2;

    var result = valueToState(initialState, fieldId, [listBlock]);
    expect(result).toEqual(_objectSpread({}, initialState, _defineProperty({}, fieldId, _objectSpread({}, initialState[fieldId], {
      rootBlocks: [listBlockId],
      blocks: (_blocks2 = {}, _defineProperty(_blocks2, listBlockId, listBlockState), _defineProperty(_blocks2, listBlockImage1Id, listBlockImage1State), _defineProperty(_blocks2, listBlockImage2Id, listBlockImage2State), _blocks2)
    }))));
  });
  test('StructBlock', function () {
    var _blocks3;

    var result = valueToState(initialState, fieldId, [structBlock]);
    expect(result).toEqual(_objectSpread({}, initialState, _defineProperty({}, fieldId, _objectSpread({}, initialState[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks3 = {}, _defineProperty(_blocks3, structBlockId, structBlockState), _defineProperty(_blocks3, structBlockHeightId, structBlockHeightState), _defineProperty(_blocks3, structBlockImagesId, structBlockImagesState), _defineProperty(_blocks3, structBlockImageCell1Id, structBlockImageCell1State), _defineProperty(_blocks3, structBlockImage1Id, structBlockImage1State), _defineProperty(_blocks3, structBlockWidth1Id, structBlockWidth1State), _defineProperty(_blocks3, structBlockImageCell2Id, structBlockImageCell2State), _defineProperty(_blocks3, structBlockImage2Id, structBlockImage2State), _defineProperty(_blocks3, structBlockWidth2Id, structBlockWidth2State), _defineProperty(_blocks3, structBlockRelatedPagesId, structBlockRelatedPagesState), _defineProperty(_blocks3, structBlockPageId, structBlockPageState), _blocks3)
    }))));
  });
  test('StructBlock with missing nested data', function () {
    var _blocks4;

    var result = valueToState(initialState, fieldId, [_objectSpread({}, structBlock, {
      value: []
    })]);

    var _result$fieldId$block = _slicedToArray(result[fieldId].blocks[structBlockId].value, 3),
        childHeightId = _result$fieldId$block[0],
        childImagesId = _result$fieldId$block[1],
        childRelatedPagesId = _result$fieldId$block[2];

    expect(result).toEqual(_objectSpread({}, initialState, _defineProperty({}, fieldId, _objectSpread({}, initialState[fieldId], {
      rootBlocks: [structBlockId],
      blocks: (_blocks4 = {}, _defineProperty(_blocks4, structBlockId, _objectSpread({}, structBlockState, {
        value: [childHeightId, childImagesId, childRelatedPagesId]
      })), _defineProperty(_blocks4, childHeightId, {
        parent: structBlockId,
        type: 'height',
        value: null,
        closed: true,
        hidden: false,
        shouldUpdate: false
      }), _defineProperty(_blocks4, childImagesId, {
        parent: structBlockId,
        type: 'images',
        value: [],
        closed: true,
        hidden: false,
        shouldUpdate: false
      }), _defineProperty(_blocks4, childRelatedPagesId, {
        parent: structBlockId,
        type: 'related_pages',
        value: [],
        closed: true,
        hidden: false,
        shouldUpdate: false
      }), _blocks4)
    }))));
  });
  test('StreamBlock', function () {
    var _blocks5;

    var result = valueToState(initialState, fieldId, [streamBlock]);
    expect(result).toEqual(_objectSpread({}, initialState, _defineProperty({}, fieldId, _objectSpread({}, initialState[fieldId], {
      rootBlocks: [streamBlockId],
      blocks: (_blocks5 = {}, _defineProperty(_blocks5, streamBlockId, streamBlockState), _defineProperty(_blocks5, streamBlockImageId, streamBlockImage1State), _defineProperty(_blocks5, streamBlockTitleId, streamBlockImage2State), _blocks5)
    }))));
  });
});
describe('stateToValue', function () {
  test('Empty value', function () {
    var value = [];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId)).toEqual(value);
  });
  test('Root blocks', function () {
    var value = [rootBlock1, rootBlock2];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId)).toEqual(value);
  });
  test('ListBlock', function () {
    var value = [listBlock];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId)).toEqual(value);
  });
  test('StructBlock', function () {
    var value = [structBlock];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId)).toEqual(value);
  });
  test('StreamBlock', function () {
    var value = [streamBlock];
    expect(stateToValue(valueToState(initialState, fieldId, value), fieldId)).toEqual(value);
  });
});