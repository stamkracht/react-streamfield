import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import {Draggable} from 'react-beautiful-dnd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  blockUpdated,
  deleteBlock,
  showBlock,
} from './actions';
import {
  getDescendantsIds, getLayout,
  getNestedBlockDefinition,
  getSiblingsIds, isSimpleLayout,
  triggerCustomEvent,
} from './processing/utils';
import AddButton from './AddButton';
import BlockContent from './BlockContent';
import BlockHeader from './BlockHeader';
import BlockActions from './BlockActions';


@connect((state, props) => {
  const {fieldId, id} = props;
  const fieldData = state[fieldId];
  const blocks = fieldData.blocks;
  const block = blocks[id];
  const siblings = getSiblingsIds(state, fieldId, id);
  const blockDefinition = getNestedBlockDefinition(state, fieldId, id);
  const hasDescendantError = getDescendantsIds(state, fieldId, id, true)
    .some(descendantBlockId => blocks[descendantBlockId].hasError);
  return {
    blockDefinition,
    layout: getLayout(blockDefinition, fieldData.isMobile),
    isSimpleLayout: isSimpleLayout(blockDefinition, fieldData.isMobile),
    standalone: props.standalone || blockDefinition.standalone,
    parentId: block.parent,
    hasError: hasDescendantError,
    closed: block.closed,
    hidden: block.hidden,
    shouldUpdate: block.shouldUpdate,
    index: siblings.indexOf(id),
  };
}, (dispatch, props) => {
  const {fieldId, id} = props;
  return bindActionCreators({
    blockUpdated: () => blockUpdated(fieldId, id),
    showBlock: () => showBlock(fieldId, id),
    deleteBlock: () => deleteBlock(fieldId, id),
  }, dispatch);
})
class Block extends React.Component {
  static propTypes = {
    fieldId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    standalone: PropTypes.bool,
    collapsible: PropTypes.bool,
    sortable: PropTypes.bool,
    canAdd: PropTypes.bool,
  };


  static defaultProps = {
    standalone: false,
    collapsible: true,
    sortable: true,
    canAdd: true,
  };

  constructor(props) {
    super(props);
    this.dragHandleRef = React.createRef();
    this.contentRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.shouldUpdate || (nextProps.layout !== this.props.layout);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.shouldUpdate) {
      this.props.blockUpdated();
    }
  }

  triggerCustomEvent(name, data=null) {
    triggerCustomEvent(ReactDOM.findDOMNode(this), name, data);
  }

  onDraggableContainerAnimationEnd = () => {
    if (this.props.hidden) {
      this.triggerCustomEvent('delete');
      this.props.deleteBlock();
    }
  };

  get draggableHeight() {
    return this.props.hidden ? 0 : 'auto';
  }

  componentDidMount() {
    if (this.props.hidden) {
      this.props.showBlock();
    }
  }

  wrapSortable(blockContent) {
    const {
      layout, isSimpleLayout, fieldId, id, parentId, index, hasError,
      collapsible, sortable, canAdd,
    } = this.props;
    const blockClassName =
      `c-sf-block ${layout} ${hasError ? 'c-sf-block--error' : ''}`;
    const addButton = (
      <AddButton fieldId={fieldId} parentId={parentId} blockId={id}
                 visible={canAdd} />
    );
    if (sortable) {
      return (
        <Draggable draggableId={id} index={index}
                   type={`${fieldId}-${parentId}`}>
          {(provided, snapshot) => (
            <div className="c-sf-container__block-container"
                 ref={provided.innerRef} {...provided.draggableProps}>
              <div className={blockClassName}>
                <BlockHeader fieldId={fieldId} blockId={id}
                             collapsibleBlock={collapsible}
                             sortableBlock={sortable}
                             canDuplicate={canAdd}
                             dragHandleRef={this.dragHandleRef}
                             dragHandleProps={provided.dragHandleProps} />
                {blockContent}
                {isSimpleLayout ?
                  <BlockActions fieldId={fieldId} blockId={id}
                                sortableBlock={sortable} canDuplicate={canAdd}
                                dragHandleRef={this.dragHandleRef} />
                  :
                  null}
              </div>
              {addButton}
            </div>
          )}
        </Draggable>
      );
    }
    return (
      <div className="c-sf-container__block-container">
        <div className={blockClassName}>
          <BlockHeader fieldId={fieldId} blockId={id}
                       collapsibleBlock={collapsible}
                       sortableBlock={sortable}
                       canDuplicate={canAdd}
                       dragHandleRef={this.dragHandleRef} />
          {blockContent}
        </div>
        {addButton}
      </div>
    );
  }

  render() {
    const {
      fieldId, id, parentId, standalone, collapsible, canAdd,
    } = this.props;
    const blockContent = (
      <BlockContent ref={this.contentRef} fieldId={fieldId} blockId={id}
                    collapsible={!standalone && collapsible} />
    );
    if (standalone) {
      return (
        <div className="c-sf-container__block-container">
          <div className="c-sf-block">
            {blockContent}
          </div>
        </div>
      );
    }
    return (
      <AnimateHeight height={this.draggableHeight}
                     onAnimationEnd={this.onDraggableContainerAnimationEnd}>
        {this.wrapSortable(blockContent)}
      </AnimateHeight>
    );
  }
}


export default Block;
