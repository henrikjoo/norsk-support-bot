import { Suspense } from "react";
import { WidgetChat } from "./widget-chat";

export default function WidgetPage() {
  return (
    <Suspense>
      <WidgetChat />
    </Suspense>
  );
}
