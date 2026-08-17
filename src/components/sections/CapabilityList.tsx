import { Reveal } from "@/components/site/Reveal";
import { Check } from "lucide-react";

export function CapabilityList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const cols =
    columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-3 ${cols}`}>
      {items.map((item, i) => (
        <Reveal key={item} delay={(i % 3) * 50}>
          <li className="flex h-full items-start gap-3 rounded-xl border border-border bg-card/40 p-4">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-gradient text-primary-foreground">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
