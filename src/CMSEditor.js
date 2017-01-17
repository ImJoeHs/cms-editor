/* @flow */
import React, {Component} from 'react';
import RichTextEditor, {createEmptyValue} from './RichTextEditor';
import {convertToRaw} from 'draft-js';
import autobind from 'class-autobind';
import type {EditorValue} from './RichTextEditor';
import './CMS.global.css';

type Props = {
  selectImage: Function;
  uploadImage: Function;
};
type State = {
  value: EditorValue;
  format: string;
};

export default class CMSEditor extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      value: createEmptyValue(),
      format: '',
    };
  }

  getChildContext = function() {
    return {
      formatChange: this._onChangeFormat,
      selectImage: this.props.selectImage,
      uploadImage: this.props.uploadImage,
    };
  }

  render(): React.Element {
    let {value, format} = this.state;
    const sourcePanel = format && (
        <div className="col mdHtmlCol">
            <textarea
              ref="test"
              className="source"
              placeholder="Editor Source"
              value={value.toString(format)}
              onChange={this._onChangeSource}
            />
        </div>
    );
    return (
      <div className="editor-demo">
        <div className="col">
            <RichTextEditor
              ref="editor"
              value={value}
              onChange={this._onChange}
              className="react-rte-demo"
              placeholder="Tell a story"
              toolbarClassName="demo-toolbar"
              editorClassName="demo-editor"
            />
        </div>
          {sourcePanel}
      </div>
    );
  }

  _logState() {
    let editorState = this.state.value.getEditorState();
    let contentState = window.contentState = editorState.getCurrentContent().toJS();
    console.log(contentState);
  }

  _logStateRaw() {
    let editorState = this.state.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    let rawContentState = window.rawContentState = convertToRaw(contentState);
    console.log(JSON.stringify(rawContentState));
  }

  _onChange(value: EditorValue) {
    this.setState({value});
  }

  _onChangeSource(event: Object) {
    let source = event.target.value;
    let oldValue = this.state.value;
    this.setState({
      value: oldValue.setContentFromString(source, this.state.format),
    });
  }

  _onChangeFormat(formatStr: string) {
    this.setState({format: formatStr});
    // console.log(this.state.value.toString(formatStr))
  }

  getEditorState(setFormat?: string) {
    let {value, format} = this.state;
    if (setFormat) {
      format = setFormat;
    }
    return value.toString(format);
  }

  setEditorState(value: string, format: string) {
    let source = value;
    let oldValue = this.state.value;
    let formatStr = format || this.state.format;
    this.setState({
      value: oldValue.setContentFromString(source, formatStr),
    });
  }
}

CMSEditor.childContextTypes = {
  formatChange: React.PropTypes.func,
  selectImage: React.PropTypes.func,
  uploadImage: React.PropTypes.func,
};
