import { redirect } from "next/navigation";

export default function TableDefaultPage() {
  // Default to Table T4 when no specific table is passed
  redirect("/table/T4");
}
