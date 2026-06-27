import "@tanstack/react-table";
import type { Interview } from "@/features/interview/interviewTypes";

// This declaration merges your custom methods directly into TanStack's internal type engine
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEditRow?: (interview: Interview) => void;
    onDeleteRow?: (interview: Interview) => void;
  }
}