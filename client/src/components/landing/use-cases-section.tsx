import { cn } from "../../lib/utils";
interface UseCase {
  title: string;
  description: string;
  command: string;
}

const useCases: UseCase[] = [
  {
    title: "Understand unfamiliar code",
    description:
      "Get a clear explanation of files, functions, modules, and project structure when working with an unfamiliar codebase.",
    command: "arc explain ./src/auth",
  },
  {
    title: "Debug errors faster",
    description:
      "Give ARC an error or failing component and get help understanding the problem and possible solutions.",
    command: "arc debug ./error.log",
  },
  {
    title: "Explore your codebase",
    description:
      "Ask questions about your project and quickly understand how different components, services, and dependencies work together.",
    command: "arc analyze ./src",
  },
  {
    title: "Refactor with confidence",
    description:
      "Identify improvements and get assistance when restructuring code without losing sight of the existing architecture.",
    command: "arc refactor ./src/api",
  },
  {
    title: "Generate documentation",
    description:
      "Turn existing code into useful documentation so your projects are easier to understand and maintain.",
    command: "arc docs ./src",
  },
  {
    title: "Automate repetitive tasks",
    description:
      "Use ARC commands to simplify common development workflows and reduce repetitive terminal work.",
    command: "arc run build",
  },
];

export function UseCasesSection() {
  return (
    <section className={cn('border-t', 'px-6', 'py-24', 'md:py-32')}>
      <div className={cn('mx-auto', 'max-w-6xl')}>
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className={cn('text-sm', 'font-medium', 'text-primary')}>
            USE CASES
          </p>

          <h2 className={cn('mt-3', 'text-3xl', 'font-bold', 'tracking-tight', 'sm:text-4xl')}>
            Built for the work developers do every day.
          </h2>

          <p className={cn('mt-4', 'text-base', 'leading-7', 'text-muted-foreground')}>
            From understanding an unfamiliar codebase to
            debugging and automation, ARC helps you get more
            done from the terminal.
          </p>
        </div>

        {/* Use cases */}
        <div className={cn('mt-12', 'grid', 'gap-5', 'md:grid-cols-2', 'lg:grid-cols-3')}>
          {useCases.map((useCase) => (
            <UseCaseCard
              key={useCase.title}
              title={useCase.title}
              description={useCase.description}
              command={useCase.command}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface UseCaseCardProps {
  title: string;
  description: string;
  command: string;
}

function UseCaseCard({
  title,
  description,
  command,
}: UseCaseCardProps) {
  return (
    <div className={cn('flex', 'flex-col', 'rounded-xl', 'border', 'p-6')}>
      <h3 className={cn('text-lg', 'font-semibold', 'tracking-tight')}>
        {title}
      </h3>

      <p className={cn('mt-2', 'flex-1', 'text-sm', 'leading-6', 'text-muted-foreground')}>
        {description}
      </p>

      <div className={cn('mt-6', 'overflow-x-auto', 'rounded-lg', 'border', 'bg-muted/50', 'px-4', 'py-3', 'font-mono', 'text-sm')}>
        <span className={cn('mr-2', 'text-muted-foreground')}>
          $
        </span>

        {command}
      </div>
    </div>
  );
}