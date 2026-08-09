import { cn } from "../../lib/utils";
interface Step {
  number: string;
  title: string;
  description: string;
  command: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Install ARC",
    description:
      "Install ARC globally and make it available directly from your terminal.",
    command: "npm install -g arc-cli",
  },
  {
    number: "02",
    title: "Connect your account",
    description:
      "Sign in to your ARC account and connect your development environment.",
    command: "arc login",
  },
  {
    number: "03",
    title: "Start building",
    description:
      "Ask questions, understand your code, debug problems, and work faster with AI.",
    command: "arc",
  },
];

export function HowItWorksSection() {
  return (
    <section className={cn('border-t', 'px-6', 'py-24', 'md:py-32')}>
      <div className={cn('mx-auto', 'max-w-6xl')}>
        {/* Section heading */}
        <div className={cn('mx-auto', 'max-w-2xl', 'text-center')}>
          <p className={cn('text-sm', 'font-medium', 'text-primary')}>
            HOW IT WORKS
          </p>

          <h2 className={cn('mt-3', 'text-3xl', 'font-bold', 'tracking-tight', 'sm:text-4xl')}>
            From installation to AI assistance in minutes.
          </h2>

          <p className={cn('mt-4', 'text-base', 'leading-7', 'text-muted-foreground')}>
            Get ARC running in your development environment
            and start using AI directly from your terminal.
          </p>
        </div>

        {/* Steps */}
        <div className={cn('mt-16', 'grid', 'gap-6', 'md:grid-cols-3')}>
          {steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              command={step.command}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  command: string;
}

function StepCard({
  number,
  title,
  description,
  command,
}: StepCardProps) {
  return (
    <div className={cn('rounded-xl', 'border', 'p-6')}>
      {/* Step number */}
      <p className={cn('font-mono', 'text-sm', 'text-muted-foreground')}>
        {number}
      </p>

      {/* Title */}
      <h3 className={cn('mt-5', 'text-lg', 'font-semibold', 'tracking-tight')}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn('mt-2', 'text-sm', 'leading-6', 'text-muted-foreground')}>
        {description}
      </p>

      {/* Command */}
      <div className={cn('mt-6', 'rounded-lg', 'border', 'bg-muted/50', 'px-4', 'py-3', 'font-mono', 'text-sm')}>
        <span className={cn('mr-2', 'text-muted-foreground')}>
          $
        </span>

        {command}
      </div>
    </div>
  );
}