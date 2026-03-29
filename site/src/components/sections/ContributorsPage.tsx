export default function ContributorsPage() {
  return (
    <div className="px-6 py-10 lg:px-10 max-w-5xl">
      <div className="mb-10">
        <h1
          className="text-4xl lg:text-5xl mb-3 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Contributors
        </h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
          <div className="flex items-start gap-4">
            <img
              src="https://github.com/mikefullerton.png"
              alt="Mike Fullerton"
              className="w-12 h-12 rounded-full shrink-0"
            />
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                <a href="https://www.linkedin.com/in/michaelfullerton/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">
                  Mike Fullerton
                </a>
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Software engineer with decades of experience shipping products at Apple, Microsoft, and PayPal. Based in San Jose, CA. Now building AI-assisted developer tooling —{' '}
                <a href="https://github.com/mikefullerton/cat-herding" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Cat Herding</a>,{' '}
                <a href="https://github.com/mikefullerton/Whippet" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Whippet</a>, and the Agentic Cookbook.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
