function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { getAncestorsIds, getDescendantsIds, getNestedBlockDefinition } from './utils';
import { valueToState } from './conversions';
import { initialState, fieldId, rootBlock1, rootBlock2, listBlock, structBlock, streamBlock, rootBlockDefinition, listBlockDefinition, listBlockImageDefinition, structBlockDefinition, structBlockImagesDefinition, structBlockImageCellDefinition, streamBlockDefinition, streamBlockImageDefinition, streamBlockTitleDefinition, rootBlock1Id, rootBlock2Id, listBlockId, listBlockImage1Id, listBlockImage2Id, structBlockId, structBlockHeightId, structBlockImagesId, structBlockImageCellAllSortedIds, structBlockImageCell1Id, structBlockImage1Id, structBlockWidth1Id, structBlockImageCell2Id, structBlockImage2Id, structBlockWidth2Id, structBlockRelatedPagesId, structBlockPageId, streamBlockId, streamBlockImageId, streamBlockTitleId } from './samples';
describe('getAncestorsId', function () {
  var state = valueToState(initialState, fieldId, [rootBlock1, rootBlock2, listBlock, structBlock, streamBlock]);
  test('Root blocks', function () {
    expect(getAncestorsIds(state, fieldId, rootBlock1Id)).toEqual([]);
    expect(getAncestorsIds(state, fieldId, rootBlock1Id, true)).toEqual([rootBlock1Id]);
    expect(getAncestorsIds(state, fieldId, rootBlock2Id)).toEqual([]);
    expect(getAncestorsIds(state, fieldId, rootBlock2Id, true)).toEqual([rootBlock2Id]);
  });
  test('ListBlock', function () {
    expect(getAncestorsIds(state, fieldId, listBlockId)).toEqual([]);
    expect(getAncestorsIds(state, fieldId, listBlockId, true)).toEqual([listBlockId]);
    expect(getAncestorsIds(state, fieldId, listBlockImage1Id)).toEqual([listBlockId]);
    expect(getAncestorsIds(state, fieldId, listBlockImage1Id, true)).toEqual([listBlockId, listBlockImage1Id]);
    expect(getAncestorsIds(state, fieldId, listBlockImage2Id)).toEqual([listBlockId]);
    expect(getAncestorsIds(state, fieldId, listBlockImage2Id, true)).toEqual([listBlockId, listBlockImage2Id]);
  });
  test('StructBlock', function () {
    expect(getAncestorsIds(state, fieldId, structBlockId)).toEqual([]);
    expect(getAncestorsIds(state, fieldId, structBlockId, true)).toEqual([structBlockId]);
    expect(getAncestorsIds(state, fieldId, structBlockImagesId)).toEqual([structBlockId]);
    expect(getAncestorsIds(state, fieldId, structBlockImagesId, true)).toEqual([structBlockId, structBlockImagesId]);
    expect(getAncestorsIds(state, fieldId, structBlockImageCell1Id)).toEqual([structBlockId, structBlockImagesId]);
    expect(getAncestorsIds(state, fieldId, structBlockImageCell1Id, true)).toEqual([structBlockId, structBlockImagesId, structBlockImageCell1Id]);
    expect(getAncestorsIds(state, fieldId, structBlockImageCell2Id)).toEqual([structBlockId, structBlockImagesId]);
    expect(getAncestorsIds(state, fieldId, structBlockImageCell2Id, true)).toEqual([structBlockId, structBlockImagesId, structBlockImageCell2Id]);
  });
  test('StreamBlock', function () {
    expect(getAncestorsIds(state, fieldId, streamBlockId)).toEqual([]);
    expect(getAncestorsIds(state, fieldId, streamBlockId, true)).toEqual([streamBlockId]);
    expect(getAncestorsIds(state, fieldId, streamBlockImageId)).toEqual([streamBlockId]);
    expect(getAncestorsIds(state, fieldId, streamBlockImageId, true)).toEqual([streamBlockId, streamBlockImageId]);
    expect(getAncestorsIds(state, fieldId, streamBlockTitleId)).toEqual([streamBlockId]);
    expect(getAncestorsIds(state, fieldId, streamBlockTitleId, true)).toEqual([streamBlockId, streamBlockTitleId]);
  });
});
describe('getDescendantsIds', function () {
  var state = valueToState(initialState, fieldId, [rootBlock1, rootBlock2, listBlock, structBlock, streamBlock]);
  test('Root blocks', function () {
    expect(getDescendantsIds(state, fieldId, rootBlock1Id)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, rootBlock1Id, true)).toEqual([rootBlock1Id]);
    expect(getDescendantsIds(state, fieldId, rootBlock2Id)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, rootBlock2Id, true)).toEqual([rootBlock2Id]);
  });
  test('ListBlock', function () {
    expect(getDescendantsIds(state, fieldId, listBlockId)).toEqual([listBlockImage1Id, listBlockImage2Id]);
    expect(getDescendantsIds(state, fieldId, listBlockId, true)).toEqual([listBlockId, listBlockImage1Id, listBlockImage2Id]);
    expect(getDescendantsIds(state, fieldId, listBlockImage1Id)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, listBlockImage1Id, true)).toEqual([listBlockImage1Id]);
    expect(getDescendantsIds(state, fieldId, listBlockImage2Id)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, listBlockImage2Id, true)).toEqual([listBlockImage2Id]);
  });
  test('StructBlock', function () {
    expect(getDescendantsIds(state, fieldId, structBlockId)).toEqual([structBlockHeightId, structBlockImagesId].concat(_toConsumableArray(structBlockImageCellAllSortedIds), [structBlockRelatedPagesId, structBlockPageId]));
    expect(getDescendantsIds(state, fieldId, structBlockId, true)).toEqual([structBlockId, structBlockHeightId, structBlockImagesId].concat(_toConsumableArray(structBlockImageCellAllSortedIds), [structBlockRelatedPagesId, structBlockPageId]));
    expect(getDescendantsIds(state, fieldId, structBlockImagesId)).toEqual(_toConsumableArray(structBlockImageCellAllSortedIds));
    expect(getDescendantsIds(state, fieldId, structBlockImagesId, true)).toEqual([structBlockImagesId].concat(_toConsumableArray(structBlockImageCellAllSortedIds)));
    expect(getDescendantsIds(state, fieldId, structBlockImageCell1Id)).toEqual([structBlockImage1Id, structBlockWidth1Id]);
    expect(getDescendantsIds(state, fieldId, structBlockImageCell1Id, true)).toEqual([structBlockImageCell1Id, structBlockImage1Id, structBlockWidth1Id]);
    expect(getDescendantsIds(state, fieldId, structBlockImageCell2Id)).toEqual([structBlockImage2Id, structBlockWidth2Id]);
    expect(getDescendantsIds(state, fieldId, structBlockImageCell2Id, true)).toEqual([structBlockImageCell2Id, structBlockImage2Id, structBlockWidth2Id]);
    expect(getDescendantsIds(state, fieldId, structBlockRelatedPagesId)).toEqual([structBlockPageId]);
    expect(getDescendantsIds(state, fieldId, structBlockRelatedPagesId, true)).toEqual([structBlockRelatedPagesId, structBlockPageId]);
    expect(getDescendantsIds(state, fieldId, structBlockPageId)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, structBlockPageId, true)).toEqual([structBlockPageId]);
  });
  test('StreamBlock', function () {
    expect(getDescendantsIds(state, fieldId, streamBlockId)).toEqual([streamBlockImageId, streamBlockTitleId]);
    expect(getDescendantsIds(state, fieldId, streamBlockId, true)).toEqual([streamBlockId, streamBlockImageId, streamBlockTitleId]);
    expect(getDescendantsIds(state, fieldId, streamBlockImageId)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, streamBlockImageId, true)).toEqual([streamBlockImageId]);
    expect(getDescendantsIds(state, fieldId, streamBlockTitleId)).toEqual([]);
    expect(getDescendantsIds(state, fieldId, streamBlockTitleId, true)).toEqual([streamBlockTitleId]);
  });
});
describe('getNestedBlockDefinition', function () {
  var state = valueToState(initialState, fieldId, [rootBlock1, rootBlock2, listBlock, structBlock, streamBlock]);
  test('Root blocks', function () {
    expect(getNestedBlockDefinition(state, fieldId, rootBlock1Id)).toEqual(rootBlockDefinition);
    expect(getNestedBlockDefinition(state, fieldId, rootBlock2Id)).toEqual(rootBlockDefinition);
  });
  test('ListBlock', function () {
    expect(getNestedBlockDefinition(state, fieldId, listBlockId)).toEqual(listBlockDefinition);
    expect(getNestedBlockDefinition(state, fieldId, listBlockImage1Id)).toEqual(listBlockImageDefinition);
    expect(getNestedBlockDefinition(state, fieldId, listBlockImage2Id)).toEqual(listBlockImageDefinition);
  });
  test('StructBlock', function () {
    expect(getNestedBlockDefinition(state, fieldId, structBlockId)).toEqual(structBlockDefinition);
    expect(getNestedBlockDefinition(state, fieldId, structBlockImagesId)).toEqual(structBlockImagesDefinition);
    expect(getNestedBlockDefinition(state, fieldId, structBlockImageCell1Id)).toEqual(structBlockImageCellDefinition);
    expect(getNestedBlockDefinition(state, fieldId, structBlockImageCell2Id)).toEqual(structBlockImageCellDefinition);
  });
  test('StreamBlock', function () {
    expect(getNestedBlockDefinition(state, fieldId, streamBlockId)).toEqual(streamBlockDefinition);
    expect(getNestedBlockDefinition(state, fieldId, streamBlockImageId)).toEqual(streamBlockImageDefinition);
    expect(getNestedBlockDefinition(state, fieldId, streamBlockTitleId)).toEqual(streamBlockTitleDefinition);
  });
});