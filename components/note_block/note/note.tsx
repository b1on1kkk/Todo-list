import styles from "./note.module.css";

import { useState } from "react";

import { Notes } from "@/interfaces/main_interfaces";

import Image from "next/image";
import trash_icon from "../../../public/icons/trash.png";
import check_icon from "../../../public/icons/check.png";
import bolt_icon from "../../../public/icons/bolt.png";

interface Note_Interface {
  note: Notes;
  DeleteNote: (notesIndex: number, blockIndex: number) => void;
  blockIndex: number;
  noteIndex: number;
  CheckedNote: (notesIndex: number, blockIndex: number) => void;
  PriorityCheckedNote: (notesIndex: number, blockIndex: number) => void;
  ChangeTextChangerStatus: (
    notesIndex: number,
    blockIndex: number,
    innerText: string
  ) => void;
}

export default function Note({
  note,
  DeleteNote,
  blockIndex,
  noteIndex,
  CheckedNote,
  PriorityCheckedNote,
  ChangeTextChangerStatus,
}: Note_Interface) {
  const [noteText, setNoteText] = useState<string>(note.text);

  return (
    <div
      className={
        note.status
          ? styles.noteblock_note_content_wrapper_done
          : note.priority
          ? styles.noteblock_note_content_wrapper_priority
          : styles.noteblock_note_content_wrapper
      }
      onDoubleClick={() => {
        ChangeTextChangerStatus(noteIndex, blockIndex, noteText);
        setNoteText("");
      }}
    >
      <div
        className={
          note.status
            ? styles.noteblock_note_content_done
            : styles.noteblock_note_content
        }
      >
        {note.text_changer ? (
          <div className={styles.note_block_note_textarea_wrapper}>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
        ) : (
          <div className={styles.noteblock_note_text_actions_wrapper}>
            {note.text}
          </div>
        )}

        <div className={styles.noteblock_note_actions_wrapper}>
          <div
            className={styles.noteblock_note_button_to_delete}
            onClick={() => DeleteNote(noteIndex, blockIndex)}
          >
            <Image src={trash_icon} alt="trash_icon" />
          </div>
          <div
            className={
              note.status
                ? styles.noteblock_note_button_check_as_done_marked
                : styles.noteblock_note_button_check_as_done
            }
            onClick={() => CheckedNote(noteIndex, blockIndex)}
          >
            <Image src={check_icon} alt="check_icon"></Image>
          </div>
          <div
            className={
              note.priority
                ? styles.noteblock_priority_bolt_marked
                : styles.noteblock_priority_bolt
            }
            onClick={() => PriorityCheckedNote(noteIndex, blockIndex)}
          >
            <Image src={bolt_icon} alt="bolt_icon"></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
