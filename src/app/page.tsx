import SectionsTemplate from "@/components/templates/SectionsTemplate";
import SectionsProvider from "@/context/SectionsContext";

export default function Home() {
  return (
    <SectionsProvider>
      <SectionsTemplate />
    </SectionsProvider>
  );
}
