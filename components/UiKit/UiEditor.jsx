import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const UiEditor = ({ getEditorData, value }) => {
  const editorRef = useRef();
  const handleEditorReady = (editor) => {
    editorRef.current = editor;
    editorRef.current.editing.view.focus();

    // Select the entire content
    const model = editor.model;
    const document = model.document;
    // Get the last position in the document
    const lastPosition = model.createPositionAt(document.getRoot(), "end");
    // Perform an editor change to set the cursor position at the end
    model.change((writer) => {
      writer.setSelection(lastPosition);
    });
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    getEditorData(data);
  };
  return (
    <div className="mt-4">
      <p className="mb-4">Blog Content</p>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleEditorChange}
        onReady={handleEditorReady}
      />
    </div>
  );
};

export default UiEditor;
