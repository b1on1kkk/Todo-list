export interface Notes {
  text: string;
  status: boolean;
  priority: boolean;
  text_changer: boolean;
}

export interface NoteBlockInterface {
  title_name: string;
  title_to_change_status: boolean;
  all_todos_done: boolean;
  notes: Notes[];
}
