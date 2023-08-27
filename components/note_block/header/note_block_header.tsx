"use client";

import styles from "../main/note_block.module.css";

import Image from "next/image";
import trash_icon from "../../../public/icons/trash.png";

import { Notes } from "@/interfaces/main_interfaces";

import { useEffect, useState } from "react";

interface Notes_Header_Interface {
  note: Notes[];
  DeleteNoteBlock: (index: number) => void;
  idx: number;
  title: string;
  AllTodosDoneInBlock: (index: number) => void;
}

export default function Notes_Header({
  note,
  DeleteNoteBlock,
  idx,
  title,
  AllTodosDoneInBlock,
}: Notes_Header_Interface) {
  const [doneTasks, setDoneTasks] = useState<number>(0);
  const [priorityTasks, setPriorityTasks] = useState<number>(0);

  useEffect(() => {
    let doneCounter = 0;
    let priorityCounter = 0;

    note.map((e) => {
      if (e.status) doneCounter++;
      else if (e.priority) priorityCounter++;
    });

    setDoneTasks(doneCounter);
    setPriorityTasks(priorityCounter);
  });

  useEffect(() => {
    if (doneTasks === note.length && note.length !== 0)
      AllTodosDoneInBlock(idx);
  }, [doneTasks]);

  return (
    <header className={styles.noteblock_header}>
      <div className={styles.noteblock_header_main}>
        <div className={styles.statistic_block_wrapper}>
          <div className={styles.noteblock_header_counter}>
            Done: {doneTasks}
          </div>
          <div className={styles.noteblock_header_counter}>
            In Priority: {priorityTasks}
          </div>
        </div>

        <div className={styles.noteblock_header_title}>{title}</div>
      </div>
      <div
        className={styles.noteblock_delete_icon}
        onClick={() => DeleteNoteBlock(idx)}
      >
        <Image src={trash_icon} alt="trash_icon" />
      </div>
    </header>
  );
}
