"use client";

import Image from "next/image";
import add_icon from "../../../public/icons/add.png";

import styles from "../main/note_block.module.css";

interface Notes_Footer_Interface {
  idx: number;
  AddingNotes: (index: number) => void;
}

export default function Notes_Footer({
  idx,
  AddingNotes,
}: Notes_Footer_Interface) {
  return (
    <div
      className={styles.noteblock_notes_adder}
      onClick={() => AddingNotes(idx)}
    >
      <div className={styles.noteblock_notes_adder_img}>
        <Image src={add_icon} alt="add_icon" />
      </div>
      <div className={styles.noteblock_notes_adder_text}>Add Column</div>
    </div>
  );
}
