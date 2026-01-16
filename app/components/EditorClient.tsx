"use client";

import React, { useEffect, useRef, useId } from "react";


const editorData = {
  time: 1635603431943,
  blocks: [
    {
      type: "header",
      data: {
        text: "Hello World",
        level: 2,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "This is my first Editor.js content!",
      },
    },
  ],
  version: "2.22.2",
};

export default function EditorClient(): React.ReactElement {
    const holderRef = useRef<HTMLDivElement | null>(null);
    // useId produces a stable id that matches between server and client
    const id = useId();
    const holderId = `editorjs-${id.replace(/:/g, "-")}`;

    useEffect(() => {
        let editor: any;

        (async () => {
                // Dynamically import EditorJS on the client only
                const EditorJS = (await import("@editorjs/editorjs")).default;

            // Try to dynamically import some common tools. If they're not installed,
            // ignore and continue without them.
            const tools: Record<string, any> = {};
            // Use a runtime-only dynamic import via eval('import') so the bundler
            // doesn't try to resolve optional Editor.js tools at build time.
            const runtimeImport = (moduleName: string) => {
                // eslint-disable-next-line no-eval
                // @ts-ignore -- using eval('import') prevents static bundler resolution
                return eval("import")(moduleName) as Promise<any>;
            };

            try {
                const Header: any = (await runtimeImport("@editorjs/header")).default;
                tools.header = Header;
            } catch (e) {
                // tool not available at runtime
                console.log('Header tool not available');
            }
            try {
                const Paragraph: any = (await runtimeImport("@editorjs/paragraph")).default;
                tools.paragraph = Paragraph;
            } catch (e) {
                // tool not available at runtime
                console.log('Paragraph tool not available');
            }

            editor = new EditorJS({
            holder: holderId,
            tools: Object.keys(tools).length ? tools : undefined,
            data: editorData,
        });
    })();

        return () => {
            if (editor && typeof editor.destroy === "function") {
                editor.destroy();
            }
        };
    }, []);

    return (
          <div>
                <h1>Hello, Editor.js!</h1>
                <div id={holderId} ref={holderRef} />
            </div>
    );
}
