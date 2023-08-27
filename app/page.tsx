"use client";

import { useState } from "react";

import styles from "./page.module.css";

import Notes_Block from "@/components/note_block/main/note_block";
import Note_Block_Adder from "@/components/note_block_adder/note_block_adder";

import { NoteBlockInterface } from "@/interfaces/main_interfaces";
import { PrioritySorting } from "@/service/PrioritySorting/PrioritySorting";

export default function Home() {
  let [notesBlockArray, setNotesBlockArray] = useState<NoteBlockInterface[]>(
    []
  );

  // adding functions
  // adding note block function
  function AddingNewNoteBlock() {
    setNotesBlockArray([
      {
        title_name: `Column`,
        title_to_change_status: false,
        notes: [],
        all_todos_done: false,
      },
      ...notesBlockArray,
    ]);
  }

  // adding note function
  function AddingNotes(index: number) {
    setNotesBlockArray(
      notesBlockArray.map((e: NoteBlockInterface, innerIdx) => {
        if (innerIdx === index) {
          return {
            ...e,
            all_todos_done: false,
            notes: [
              ...e.notes,
              {
                text: "Input text here",
                status: false,
                priority: false,
                text_changer: false,
              },
            ],
          };
        }
        return e;
      })
    );
  }
  //

  // deleting functions
  // deleting note block function
  function DeleteNoteBlock(index: number) {
    setNotesBlockArray(
      notesBlockArray.filter((e: NoteBlockInterface, idx) => {
        if (idx !== index) return e;
      })
    );
  }

  // delete note block function
  function DeleteNote(notesIndex: number, blockIndex: number) {
    setNotesBlockArray(
      notesBlockArray.map((e, idx) => {
        if (idx === blockIndex) {
          return {
            ...e,
            notes: e.notes.filter((e, idx) => {
              if (idx !== notesIndex) return e;
            }),
          };
        }
        return e;
      })
    );
  }
  //

  // mark as done function
  // function to set as done
  function CheckedNote(notesIndex: number, blockIndex: number) {
    notesBlockArray = notesBlockArray.map((e, idx) => {
      if (idx === blockIndex) {
        return {
          ...e,
          all_todos_done: false,
          notes: e.notes.map((e, idx) => {
            if (idx === notesIndex) {
              if (e.status) return { ...e, status: false, priority: false };
              return { ...e, status: true, priority: false };
            }
            return e;
          }),
        };
      }
      return e;
    });

    setNotesBlockArray(
      notesBlockArray.map((e) => {
        return {
          ...e,
          notes: [...PrioritySorting(e.notes)],
        };
      })
    );
  }

  function PriorityCheckedNote(notesIndex: number, blockIndex: number) {
    notesBlockArray = notesBlockArray.map((e, idx) => {
      if (idx === blockIndex) {
        return {
          ...e,
          notes: e.notes.map((e, idx) => {
            if (idx === notesIndex) {
              if (e.priority) return { ...e, priority: false, status: false };
              return { ...e, priority: true, status: false };
            }
            return e;
          }),
        };
      }
      return e;
    });

    setNotesBlockArray(
      notesBlockArray.map((e) => {
        return {
          ...e,
          notes: [...PrioritySorting(e.notes)],
        };
      })
    );
  }

  // function to set true if all tasks are done
  function AllTodosDoneInBlock(index: number) {
    setNotesBlockArray(
      notesBlockArray.map((e: NoteBlockInterface, idx) => {
        if (idx === index) return { ...e, all_todos_done: true };
        return e;
      })
    );
  }
  //

  // function to change text in Notes by double click
  function ChangeTextChangerStatus(
    notesIndex: number,
    blockIndex: number,
    innerText: string
  ) {
    console.log(notesBlockArray);

    setNotesBlockArray(
      notesBlockArray.map((e, idx) => {
        if (idx === blockIndex) {
          return {
            ...e,
            notes: e.notes.map((e, idx) => {
              if (idx === notesIndex && e.text_changer) {
                return { ...e, text_changer: false, text: innerText };
              }

              if (idx === notesIndex && !e.text_changer) {
                return { ...e, text_changer: true, text: innerText };
              }

              return e;
            }),
          };
        }
        return e;
      })
    );
  }

  return (
    <div className={styles.layout_wrapper}>
      {notesBlockArray.map((e, idx) => {
        return (
          <Notes_Block
            key={idx}
            idx={idx}
            block={e}
            DeleteNoteBlock={DeleteNoteBlock}
            AddingNotes={AddingNotes}
            DeleteNote={DeleteNote}
            CheckedNote={CheckedNote}
            PriorityCheckedNote={PriorityCheckedNote}
            ChangeTextChangerStatus={ChangeTextChangerStatus}
            AllTodosDoneInBlock={AllTodosDoneInBlock}
          />
        );
      })}

      {/* adding note block button */}
      <Note_Block_Adder AddingNewNoteBlock={AddingNewNoteBlock} />
      {/*  */}
    </div>
  );
}
