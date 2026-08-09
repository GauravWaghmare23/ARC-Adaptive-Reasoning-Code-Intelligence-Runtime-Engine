import { cn } from "../../lib/utils";
interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Understand your code",
    description:
      "Ask ARC to explain files, functions, modules, and unfamiliar parts of your codebase without leaving the terminal.",
  },
  {
    title: "Debug faster",
    description:
      "Investigate errors, understand stack traces, and get practical suggestions while working directly in your development environment.",
  },
  {
    title: "Explore your codebase",
    description:
      "Navigate and understand large projects faster by asking questions about your files, architecture, and dependencies.",
  },
  {
    title: "Automate workflows",
    description:
      "Turn repetitive development tasks into reusable commands and let ARC handle the routine work.",
  },
  {
    title: "AI-powered assistance",
    description:
      "Get contextual AI assistance designed specifically for software development and command-line workflows.",
  },
  {
    title: "Stay in your terminal",
    description:
      "No constant context switching between your editor, browser, documentation, and AI tools. Keep your workflow focused.",
  },
];

export function FeaturesSection() {
  return (
    <section className={cn('border-t', 'px-6', 'py-24', 'md:py-32')}>
      <div className={cn('mx-auto', 'max-w-6xl')}>
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className={cn('text-sm', 'font-medium', 'text-primary')}>
            BUILT FOR DEVELOPERS
          </p>

          <h2 className={cn('mt-3', 'text-3xl', 'font-bold', 'tracking-tight', 'sm:text-4xl')}>
            AI that works where you already work.
          </h2>

          <p className={cn('mt-4', 'text-base', 'leading-7', 'text-muted-foreground')}>
            ARC brings practical AI capabilities directly into
            your command-line workflow.
          </p>
        </div>

        {/* Feature grid */}
        <div className={cn('mt-12', 'grid', 'gap-5', 'md:grid-cols-2', 'lg:grid-cols-3')}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className={cn('rounded-xl', 'border', 'p-6', 'transition-colors', 'hover:bg-muted/50')}>
      <h3 className={cn('font-semibold', 'tracking-tight')}>
        {title}
      </h3>

      <p className={cn('mt-2', 'text-sm', 'leading-6', 'text-muted-foreground')}>
        {description}
      </p>
    </div>
  );
}