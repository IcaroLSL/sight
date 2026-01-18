"use client";

import React, { useEffect, useRef, useId } from "react";
import { getUnixTime } from "date-fns/fp/getUnixTime";


const editorData = {
    time: getUnixTime(new Date()),
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
                text: "Input text here.",
            },
        },
    ],
    version: "2.8.1",
};

export default function EditorClient(): React.ReactElement {
    const holderRef = useRef<HTMLDivElement | null>(null);
    const id = useId();
    const holderId = `editorjs-${id.replace(/:/g, "-")}`;

    useEffect(() => {
        let editor: any;

        (async () => {
            const EditorJS = (await import("@editorjs/editorjs")).default;
            const tools: Record<string, any> = {};
            
            const runtimeImport = (moduleName: string) => {
                return eval("import")(moduleName) as Promise<any>;
            };

            try {
                const Header: any = (await runtimeImport("@editorjs/header")).default;
                tools.header = Header;
            } catch (e) {
                console.log('Header tool not available');
            }
            try {
                const Paragraph: any = (await runtimeImport("@editorjs/paragraph")).default;
                tools.paragraph = Paragraph;
            } catch (e) {
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
                <div id={holderId} ref={holderRef} />
            </div>
    );
}
