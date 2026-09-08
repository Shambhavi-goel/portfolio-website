interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Shared page container — centered with balanced margins on all viewports.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 ${className}`}>
      {children}
    </div>
  );
}
