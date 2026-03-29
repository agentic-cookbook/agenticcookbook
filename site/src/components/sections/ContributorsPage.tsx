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
        <a
          href="https://www.linkedin.com/in/michaelfullerton/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] transition-all duration-200"
        >
          <div className="flex items-center gap-3 mb-1.5">
            <img
              src="https://media.licdn.com/dms/image/v2/C5603AQHXRz0yDqjzwQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1618508357857?e=2147483647&v=beta&t=gBGM0VBZqwLyXgJXfvLVQZJmZB5aBqcvZ9MjVSwEz4I"
              alt="Mike Fullerton"
              className="w-10 h-10 rounded-full shrink-0"
            />
            <h3 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              Mike Fullerton
            </h3>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-4">
            Software engineer with decades of experience shipping products at Apple, Microsoft, and PayPal. Now focused on AI-assisted developer tooling and the Agentic Cookbook.
          </p>
        </a>
      </div>
    </div>
  )
}
