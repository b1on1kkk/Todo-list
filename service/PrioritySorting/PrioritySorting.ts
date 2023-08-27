import { Notes } from "@/interfaces/main_interfaces";

export function PrioritySorting(array: Notes[]): Notes[] {
  const backArray: Notes[] = [];
  let mainBuffArray: Notes[] = [];

  array.map((e) => {
    if (e.priority) mainBuffArray.unshift(e);
    else if (e.status) backArray.push(e);
    else mainBuffArray.push(e);
  });

  mainBuffArray = [...mainBuffArray, ...backArray];
  return mainBuffArray;
}
