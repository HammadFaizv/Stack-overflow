import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export const ChatCodeBox = ({ codeString }) => {
  const [isCopied, setIsCopied] = useState();
  
  // console.log(SyntaxHighlighter.supportedLanguages);
  return (
    <div className="chat-code-box">
      <div className="p-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg"
          alt="stack overflow logo"
          width={"32"}
        />
      </div>
      <div className="code-box">
        <SyntaxHighlighter language="java" wrapLongLines={true} style={docco}>
          {codeString}
        </SyntaxHighlighter>
        <div className="copy-to-clipboard">
          <CopyToClipboard
            text={codeString}
            onCopy={() => {
              setIsCopied(true);
            }}
          >
            <button>{isCopied ? "Copied ✅" : "Copy code"}</button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};