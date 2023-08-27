"use client";

import Image from "next/image";
import add_icon from "../../public/icons/add.png";

import styles from "./note_block_adder.module.css";

export default function Note_Block_Adder({
  AddingNewNoteBlock,
}: {
  AddingNewNoteBlock: () => void;
}) {
  return (
    <div
      className={styles.button_to_add_new_noteblock}
      onClick={() => AddingNewNoteBlock()}
    >
      <div className={styles.button_picture_wrapper}>
        <Image src={add_icon} alt="add_icon" />
      </div>
      <div className={styles.button_to_add_inner_text}>Add Column</div>
    </div>
  );
}
