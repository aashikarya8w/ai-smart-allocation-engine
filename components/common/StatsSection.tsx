const STATS = [
  { value: "10,000+", label: "Students Registered" },
  { value: "500+",    label: "Partner Companies"   },
  { value: "25,000+", label: "Internship Seats"    },
  { value: "95%",     label: "Allocation Accuracy" },
];

export function StatsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card p-6 text-center"
            >
              <dt className="text-3xl font-bold text-primary">{stat.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
