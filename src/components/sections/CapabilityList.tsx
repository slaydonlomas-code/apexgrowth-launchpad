import { Reveal } from "@/components/site/Reveal";
import { Check } from "lucide-react";

export function CapabilityList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const cols =
    columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-x-10 gap-y-0 ${cols}`}>
      {items.map((item, i) => (
        <Reveal key={item} delay={(i % 3) * 50}>
          <li className="flex h-full items-start gap-4 border-b border-border py-4">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green/12 text-green">
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
