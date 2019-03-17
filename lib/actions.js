export var initializeStreamField = function initializeStreamField(id, data) {
  return {
    type: 'INITIALIZE_STREAM_FIELD',
    id: id,
    data: data
  };
};
export var setIsMobile = function setIsMobile(id, isMobile) {
  return {
    type: 'SET_IS_MOBILE',
    id: id,
    isMobile: isMobile
  };
};
export var blockUpdated = function blockUpdated(fieldId, blockId) {
  return {
    type: 'BLOCK_UPDATED',
    fieldId: fieldId,
    blockId: blockId
  };
};
export var changeBlockValue = function changeBlockValue(fieldId, blockId, value) {
  return {
    type: 'CHANGE_BLOCK_VALUES',
    fieldId: fieldId,
    blockId: blockId,
    value: value
  };
};
export var toggleBlock = function toggleBlock(fieldId, blockId) {
  return {
    type: 'TOGGLE_BLOCK',
    fieldId: fieldId,
    blockId: blockId
  };
};
export var showBlock = function showBlock(fieldId, blockId) {
  return function (dispatch) {
    return new Promise(function (resolve) {
      setTimeout(resolve, 0.001);
    }).then(function () {
      dispatch({
        type: 'SHOW_BLOCK',
        fieldId: fieldId,
        blockId: blockId
      });
    });
  };
};
export var hideBlock = function hideBlock(fieldId, blockId) {
  return {
    type: 'HIDE_BLOCK',
    fieldId: fieldId,
    blockId: blockId
  };
};
export var addBlock = function addBlock(fieldId, parentId, index, blockType) {
  return {
    type: 'ADD_BLOCK',
    fieldId: fieldId,
    parentId: parentId,
    index: index,
    blockType: blockType
  };
};
export var duplicateBlock = function duplicateBlock(fieldId, blockId) {
  return {
    type: 'DUPLICATE_BLOCK',
    fieldId: fieldId,
    blockId: blockId
  };
};
export var moveBlock = function moveBlock(fieldId, blockId, newIndex) {
  return {
    type: 'MOVE_BLOCK',
    fieldId: fieldId,
    blockId: blockId,
    newIndex: newIndex
  };
};
export var deleteBlock = function deleteBlock(fieldId, blockId) {
  return {
    type: 'DELETE_BLOCK',
    fieldId: fieldId,
    blockId: blockId
  };
};