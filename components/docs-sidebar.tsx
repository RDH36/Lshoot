"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

const HEADER_OFFSET = 96;

export function DocsSidebar({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((i) => ({ id: i.id, el: document.getElementById(i.id) }))
      .filter((x): x is { id: string; el: HTMLElement } => x.el !== null);
    if (elements.length === 0) return;

    const update = () => {
      const scrollY = window.scrollY;
      const threshold = scrollY + HEADER_OFFSET + 1;
      let current = elements[0].id;
      for (const { id, el } of elements) {
        if (el.offsetTop <= threshold) {
          current = id;
        } else {
          break;
        }
      }
      // Bottom-of-page: always highlight the last section
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        current = elements[elements.length - 1].id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav className="lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto">
      <ul className="space-y-0.5 text-sm">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block px-3 py-1.5 rounded-md border-l-2 transition-all ${
                  isActive
                    ? "border-foreground text-foreground font-semibold bg-muted/70"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
