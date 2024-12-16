import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./MyEditor.css";

// Import Icons
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaRedo,
  FaUndo,
} from "react-icons/fa";
import Select from "react-select";

const styleMap = {
  'font-size-12px': {
    fontSize: '12px',
  },
  'font-size-14px': {
    fontSize: '14px',
  },
  'font-size-18px': {
    fontSize: '18px',
  },
  'font-size-24px': {
    fontSize: '24px',
  },
  'font-family-Arial': {
    fontFamily: 'Arial, sans-serif',
  },
  'font-family-Georgia': {
    fontFamily: 'Georgia, serif',
  },
  'font-family-TimesNewRoman': {
    fontFamily: 'Times New Roman, serif',
  },
  'font-family-CourierNew': {
    fontFamily: 'Courier New, monospace',
  },
};

const MyEditor = ({ editorState, setEditorState }) => {
  // Font Sizes and Families
  const fontSizes = [
    { label: "12px", value: "font-size-12px" },
    { label: "14px", value: "font-size-14px" },
    { label: "18px", value: "font-size-18px" },
    { label: "24px", value: "font-size-24px" },
  ];

  const fontFamilies = [
    { label: "Arial", value: "font-family-Arial" },
    { label: "Georgia", value: "font-family-Georgia" },
    { label: "Times New Roman", value: "font-family-TimesNewRoman" },
    { label: "Courier New", value: "font-family-CourierNew" },
  ];

  // Inline Style Handler
  const applyInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Apply Font Family and Size using Inline Styles
  const applyCustomStyle = (style) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.applyInlineStyle(contentState, selection, style);
    const newEditorState = EditorState.push(editorState, newContentState, "change-inline-style");
    setEditorState(newEditorState);
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        {/* Font Family */}
        <Select
          options={fontFamilies}
          placeholder="Font"
          className="dropdown"
          onChange={(option) => applyCustomStyle(option.value)}
        />

        {/* Font Size */}
        <Select
          options={fontSizes}
          placeholder="Size"
          className="dropdown"
          onChange={(option) => applyCustomStyle(option.value)}
        />

        {/* Inline Styles */}
        <FaBold
          onClick={() => applyInlineStyle("BOLD")}
          className="icon"
          title="Bold"
        />
        <FaItalic
          onClick={() => applyInlineStyle("ITALIC")}
          className="icon"
          title="Italic"
        />
        <FaUnderline
          onClick={() => applyInlineStyle("UNDERLINE")}
          className="icon"
          title="Underline"
        />
        <FaStrikethrough
          onClick={() => applyInlineStyle("STRIKETHROUGH")}
          className="icon"
          title="Strikethrough"
        />

        {/* Alignments */}
        <FaAlignLeft
          onClick={() => applyInlineStyle("ALIGN_LEFT")}
          className="icon"
          title="Align Left"
        />
        <FaAlignCenter
          onClick={() => applyInlineStyle("ALIGN_CENTER")}
          className="icon"
          title="Align Center"
        />
        <FaAlignRight
          onClick={() => applyInlineStyle("ALIGN_RIGHT")}
          className="icon"
          title="Align Right"
        />
        <FaAlignJustify
          onClick={() => applyInlineStyle("ALIGN_JUSTIFY")}
          className="icon"
          title="Justify"
        />

        {/* Lists */}
        <FaListUl
          onClick={() => RichUtils.toggleBlockType(editorState, "unordered-list-item")}
          className="icon"
          title="Unordered List"
        />
        <FaListOl
          onClick={() => RichUtils.toggleBlockType(editorState, "ordered-list-item")}
          className="icon"
          title="Ordered List"
        />

        {/* Undo/Redo */}
        <FaUndo
          onClick={() => setEditorState(EditorState.undo(editorState))}
          className="icon"
          title="Undo"
        />
        <FaRedo
          onClick={() => setEditorState(EditorState.redo(editorState))}
          className="icon"
          title="Redo"
        />
      </div>

      {/* Editor */}
      <div className="editor">
        <Editor editorState={editorState} onChange={setEditorState} customStyleMap={styleMap} />
      </div>
    </div>
  );
};

export default MyEditor;
