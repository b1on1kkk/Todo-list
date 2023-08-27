"use client";

import styles from "./note_block.module.css";

import Image from "next/image";
import done_icon from "../../../public/icons/check.png";

// components
import Notes_Header from "../header/note_block_header";
import Notes_Footer from "../footer/note_block_footer";
import Note from "../note/note";
//

// interfaces
import { NoteBlockInterface } from "@/interfaces/main_interfaces";
//

interface Notes_Block_Interface {
  idx: number;
  block: NoteBlockInterface;
  DeleteNoteBlock: (index: number) => void;
  AddingNotes: (index: number) => void;
  DeleteNote: (notesIndex: number, blockIndex: number) => void;
  CheckedNote: (notesIndex: number, blockIndex: number) => void;
  PriorityCheckedNote: (notesIndex: number, blockIndex: number) => void;
  ChangeTextChangerStatus: (
    notesIndex: number,
    blockIndex: number,
    innerText: string
  ) => void;
  AllTodosDoneInBlock: (index: number) => void;
}

export default function Notes_Block({
  idx,
  DeleteNoteBlock,
  AddingNotes,
  DeleteNote,
  CheckedNote,
  PriorityCheckedNote,
  ChangeTextChangerStatus,
  AllTodosDoneInBlock,
  block,
}: Notes_Block_Interface) {
  return (
    <div className={styles.noteblock}>
      <Notes_Header
        note={block.notes}
        DeleteNoteBlock={DeleteNoteBlock}
        idx={idx}
        title={block.title_name}
        AllTodosDoneInBlock={AllTodosDoneInBlock}
      />

      <div
        className={
          block.all_todos_done
            ? styles.noteblock_notes_content_block_all_todos_done
            : styles.noteblock_notes_content_block
        }
      >
        {block.notes.map((e, innerIdx) => {
          return (
            <Note
              key={innerIdx}
              note={e}
              DeleteNote={DeleteNote}
              blockIndex={idx}
              noteIndex={innerIdx}
              CheckedNote={CheckedNote}
              PriorityCheckedNote={PriorityCheckedNote}
              ChangeTextChangerStatus={ChangeTextChangerStatus}
            />
          );
        })}
        {block.all_todos_done && (
          <div className={styles.noteblock_notex_content_done_image}>
            <Image src={done_icon} alt="done" />
          </div>
        )}
      </div>

      <Notes_Footer idx={idx} AddingNotes={AddingNotes} />
    </div>
  );
}
