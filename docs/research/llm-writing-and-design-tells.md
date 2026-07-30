# LLM writing and design tells — research for `/humanize`

Research gathered 2026-07-30 to underpin a global `/humanize` skill. Four
parallel web-research passes: academic/quantitative markers, practitioner and
editorial tells, visual/design tells, and craft technique + detector limits.

Everything below is separated into **well-evidenced** (peer-reviewed, quantified)
and **folklore** (widely repeated, no primary source found). The skill should
weight them differently: folklore tells are still useful heuristics for a human
reader's *impression*, but they must never be stated as fact.

---

## Part 1 — Why the tells exist (mechanism)

The divergence comes from **instruction-tuning / RLHF, not pretraining**. Reinhart
et al. (PNAS 2025) showed base Llama models track human style closely, while their
instruction-tuned counterparts diverge sharply. Model size doesn't fix it: Llama
70B ≈ Llama 8B, GPT-4o ≈ GPT-4o-mini in stylistic divergence.

Human raters in RLHF pipelines reward responses that are confident, elaborate,
agreeable, warm, and visibly well-organised. The reward model encodes that bias
and RL optimisation amplifies it (arXiv:2602.01002). One bias explains most of
the surface symptoms at once:

| Rater preference | Resulting tell |
|---|---|
| Elaboration reads as competence | Excess "impressive" vocabulary (delve, pivotal, meticulous) |
| Confidence rewarded over epistemic honesty | Fewer hedges/boosters/self-mention than real writers |
| Agreeableness rewarded | Sycophantic openers, pseudo-empathy, both-sidesing |
| Structure reads as "helpful" to a skimming rater | Markdown over-formatting, headers/bullets/bold everywhere |
| Narrow "acceptable style" basin | Mode collapse — reduced content and lexical diversity |

Anthropic's sycophancy work (arXiv:2310.13548) found both human raters *and* the
preference models themselves prefer convincingly-written sycophantic responses
over correct ones a non-trivial fraction of the time. The bias is in the training
signal, not just the model.

"The Rise of Verbal Tics in LLMs" (arXiv:2604.19139) quantifies a Verbal Tic
Index across frontier models (0.295 DeepSeek V3.2 → 0.590 Gemini 3.1 Pro),
finds tic rate rises ~110% from turn 1 to turn 20 of a conversation, and reports
naturalness ratings anti-correlating with tic score at **r = −0.87**. They call
it the "alignment tax": linguistic authenticity traded for reward.

**Implication for the skill:** these are systematic, predictable defects of a
known process, not random noise. A checklist can catch most of them.

---

## Part 2 — Prose tells (well-evidenced)

### 2.1 Excess vocabulary

Kobak et al., *Science Advances* 2025 (arXiv:2406.07016) analysed 15M+ PubMed
abstracts 2010–2024 using a counterfactual "excess frequency" method: observed
2024 frequency vs. what the 2021–22 trend predicted.

- **≥13.5% of 2024 biomedical abstracts** show LLM-attributable vocabulary
  shift; up to **40%** in some journals/countries/subfields.
- Highest frequency *ratios*: **delves (r=28.0)**, **underscores (r=13.8)**,
  **showcasing (r=10.7)**.
- Highest frequency *gaps* (common words): potential, findings, crucial.
- Ten-word common marker set: across, additionally, comprehensive, crucial,
  enhancing, exhibited, insights, notably, particularly, within.
- **66% of the 280 excess style words were verbs.** Contrast with COVID-era
  excess vocabulary, which was dominated by content nouns. This is the paper's
  core argument: the LLM signature is *style*, not *topic*.

A companion analysis (*Perspectives on Medical Education*, medRxiv
2024.05.14.24307373) curated 135 candidate terms and found 103 with
statistically meaningful 2024 increases. Categorised list (verify against the
primary PDF before quoting as exact):

- **Verbs:** address, align, boast, bolster, catalyze, comprehend, delve,
  elucidate, embark, emerge, employ, emphasize, encompass, endeavor, enhance,
  excel, exhibit, explore, facilitate, fortify, foster, garner, grapple,
  harness, highlight, illuminate, integrate, interplay, juxtapose, leverage,
  navigate, necessitate, offer, outperform, revolutionize, scrutinize, showcase,
  surpass, transform, transcend, underscore, unearth, unveil
- **Adjectives:** actionable, commendable, complex, comprehensive, critical,
  crucial, deeper, essential, exceptional, exhaustive, expansive, fresh,
  fundamental, groundbreaking, ingenious, innovative, intricate, intriguing,
  invaluable, meticulous, multifaceted, noteworthy, nuanced, pivotal, potent,
  potential, renowned, significant, transformative, unlocking, valuable,
  versatile, well-rounded
- **Adverbs:** accurately, additionally, aptly, compellingly, effectively,
  effortlessly, excellently, impressively, lucidly, methodically, notably,
  particularly, predominantly, primarily, profoundly, promptly, reportedly,
  scholarly, seamlessly, strategically, subsequently, thereby, thoroughly,
  thoughtfully, ultimately, undoubtedly
- **Nouns:** advancement, capability, complexity, ecosystem, enhancement,
  essence, finding, foundation, insight, intricacy, journey, landscape,
  milestone, pipeline, prowess, realm, significance, tapestry, testament,
  thought, understanding, utilization
- **Two-word phrases:** deep dive, driving force, ethical consideration,
  exercise caution, game changer, in addition, in summary, knowledge gap,
  shed light, vital role

Reinhart et al. (PNAS) measured rate multipliers vs. human baseline:
**camaraderie 162×**, **tapestry 155×** (appears in **23%** of GPT-4o outputs),
**intricate 119×**; **amidst** in **27%** of outputs.

Wikipedia's editors track vocabulary by *era*, which is genuinely useful for
dating a draft:

- 2023–mid-2024: delve, boasts, intricate, interplay
- mid-2024–mid-2025: align with, enhance, fostering, highlighting
- mid-2025+: emphasizing, showcasing, enhance

**Caveat that must survive into the skill:** word lists are the *weakest*
category in isolation and the most prone to false positives. A 32-year
advertising veteran was reportedly rejected from a job for prose "too polished."
Wikipedia's own guide insists no single word is proof — only convergence.

### 2.2 Grammar and syntax

Reinhart et al. (PNAS 2025, arXiv:2410.16107) applied Biber's feature taxonomy
to parallel human/GPT-4o/Llama-3 corpora built from identical prompts:

| Feature | LLM rate vs. human | Effect size |
|---|---|---|
| Present-participial clauses ("leaning on his agility, dancing…") | GPT-4o **5.3×** | d = 1.38 |
| That-clause as subject | **2.6×** | d = 0.77 |
| Phrasal coordination | **1.9×** | d = 0.81 |
| Nominalizations | **1.5–2×** | — |
| Agentless passive | **~0.5×** (under-used) | — |

Instruction-tuned models stay noun-heavy and informationally dense **even when
explicitly prompted to write informal speech, fiction, or TV scripts**. The
register doesn't move.

### 2.3 Discourse and metadiscourse

Jiang & Hyland (2025, two papers, 145 essays per group): ChatGPT essays are
structurally coherent but show **significantly lower frequency of hedges,
boosters, attitude markers, self-mention, and engagement markers** — especially
reader-directed questions and personal asides. The result is impersonal and less
persuasive. ChatGPT compensates for weak discourse-marker cohesion by splitting
arguments into **more, shorter paragraphs**.

Related: LLM-rewritten text shows sharp declines in pronouns, swear words,
death-related terms, and conversational fillers ("yeah," "oh," "um"), plus poor
coverage of contemporary or regional slang.

Cross-section uniformity matters too: human texts vary linguistically from
section to section far more than AI texts, which hold one register throughout.

### 2.4 Diversity — contested, do not overclaim

- **Reduced:** arXiv:2502.11266 finds "notable declines in linguistic diversity";
  ICLR 2024 (arXiv:2309.05196) found co-writing with instruction-tuned models
  raises homogenization (0.1536 → 0.1660, p<0.05) and cuts key-point diversity
  (0.941 → 0.877). Rare-word suppression shows as a steeper Zipfian tail.
- **Increased:** Mizumoto et al. 2024, comparing ChatGPT against **L2 student
  essays**, found ChatGPT had *higher* MTLD lexical diversity and syntactic
  complexity.
- **Model-dependent:** the AI Brown / AI Koditex corpora (arXiv:2509.22996)
  found several Anthropic models approach human-level lexical diversity.

**Verdict: moderate, baseline-dependent. Never cite a single number as
universal.**

### 2.5 Typography

The em dash is the best-evidenced typographic marker, and it is
**vendor-specific**.

"The Last Fingerprint" (arXiv:2603.27006) frames it as markdown training leaking
into prose. Rates per 1,000 words, unconstrained:

| Source | em dashes / 1k words |
|---|---|
| GPT-4.1 | 10.62 |
| Claude Opus | 9.09 |
| **Human baseline** | **3.23** |
| Llama | 0.0 |

Under an explicit "no markdown" instruction, headers/bullets/bold vanish almost
entirely across all models, but the em dash resists: GPT-4.1 retains 9.10/1k
(barely reduced) while Claude drops to 0.19/1k. Em-dash persistence therefore
fingerprints the *vendor's post-training*, not LLMs in general.

Population-level confirmation: arXiv:2606.29540 analysed 69,632 medRxiv
preprints. Em dash presence in Discussion sections went **4.23% → 11.58%**
across the ChatGPT boundary (OR 2.96, 95% CI 2.77–3.17), reaching **20.3% by
2025**. A within-pre-LLM-era placebo test moved only +0.13pp.

### 2.6 What machines catch that humans don't

PLOS ONE (7 LLMs, Japanese corpus): a random-forest classifier on combined
stylometric features hit **99.8% accuracy**. Human judges topped out at **56.8%**
on their best model, and only **31.5%** correctly identified human-written text
as human. Humans relied on superficial phraseology; machines used distributional
patterns. Function-word rate alone gave 94.9% accuracy in a related study
(arXiv:2304.05534); comma positioning 91.2%.

**Implication:** a human editor's intuition is close to a coin flip. The skill's
value is in applying the *machine-visible* patterns as an explicit checklist.

---

## Part 3 — Prose tells (practitioner / editorial)

Primary source: [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing),
~15,000 words crowd-sourced from editors examining thousands of flagged
submissions. Strongest non-academic catalogue available.

### 3.1 Sentence constructions

**Negative parallelism / antithesis is the single most-cited tell**, corroborated
independently by five sources.

- "It's not X, it's Y" / "It's not just X, it's Y" / "not only X but also Y"
- Wild examples: *"Amazon isn't just buying content. They're buying
  credibility."* *"This isn't just about AI. It's about humanity."*
- Corporate filings went from ~50 instances in 2023 to 200+ in 2025 (4×).
- Colin Gorrie's diagnosis: LLMs use antithesis *bluntly* (explicit "not/isn't")
  where skilled human use is subtler (JFK's "ask not…").
- Fix: identify the rejected frame, delete it, state the claim directly. *"It's
  not about the prompt. It's about the context."* → *"Context controls the
  output."*

Other constructions:

- **Tricolon / rule of three**, deployed compulsively. Gorrie: "An LLM writes
  like someone who has just learned about all these sophisticated rhetorical
  devices and can't wait to use them at every possible opportunity."
- **Self-answered rhetorical question**: *"What changed? The math did."*
- **Colon reveal / dramatic fragment**: *"The best part: it learns."* *"That's
  it. That's the whole thing."*
- **Unsourced universal-authority claims**: *"Studies show that storytelling is
  22 times more memorable than facts"* — and outright fabricated attributed
  quotes.
- **Faux-insight setups**: "What nobody tells you," "The part everyone misses,"
  "experts agree."

### 3.2 Openers and closers

Openers: "In today's fast-paced digital landscape," "In a world where…," "In an
era characterized by…," "Imagine this…," "Picture this…," "Buckle up…," "Let's
dive in," "Let's delve into."

Closers: "In conclusion," "In summary," "Ultimately," "At the end of the day,"
plus the mandatory forward-looking uplift ("The future of X is bright," "As we
move forward…") and fake-profound endings (*"The future isn't coming. It's
already here."*). Wikipedia flags "outline-like conclusions" with sections
literally titled "Challenges and Legacy" / "Future Outlook."

**Strength: strong prior, easily gamed.** These are exactly what people suppress
via custom instructions, so absence proves nothing.

### 3.3 Tone

- **Chat-register leakage**: "Certainly! Here is…", "I hope this helps!", "As an
  AI language model, I…". The academic version is grim — Guillaume Cabanac found
  the literal ChatGPT UI string **"Regenerate response"** copy-pasted into 30+
  papers' methods sections, "As an AI language model, I" in 9 papers, and "As of
  my last knowledge update" in 115 Google Scholar articles.
- **Over-qualification**: "it's important to note," "it's worth noting,"
  "generally speaking," "arguably," "to some extent." Wikipedia classes "It's
  important to note" as an *editorializing aside* — an inserted opinion about
  what matters.
- **Equivocation seesaw**: "While X has benefits, Y encompasses challenges."
- **Importance inflation / puffery**: "plays a vital/pivotal/crucial role,"
  "marks a watershed moment," "stands as a testament to." Situates mundane
  subjects (etymology, population data) within grand "broader debates." One of
  the clearest tells.
- **The Harmless Filter**: systematic avoidance of jagged, opinionated, or
  emotionally-loaded words in favour of safe corporate ones.
- **Treadmill effect / subtext vacuum**: restates rather than advances;
  over-explains its own jokes and themes instead of trusting the reader.
- Zero typos, uniform sentence length, no tangents, no first-person idiosyncrasy.

### 3.4 Formatting

From Wikipedia's structural section, described by editors as among the most
reliable *at scale* because they're mechanical rather than judgment calls:

- Em dashes replacing commas, parens, and colons
- **Title Case in headings** ("Impact of Technology and Digitalization")
- Mechanical **boldface** on keywords mid-sentence
- Inline-header vertical lists: "**Header:** descriptive text"
- Emoji as section formatting
- Tables for non-tabular content
- Curly quotes where surrounding convention uses straight
- Skipped heading levels (H2 → H4)
- Horizontal rules immediately before headings
- Immediate jump to bullets where prose belongs; all list items near-identical
  length; arrow/checkmark bullets (✅ ➤)

Context matters: Wikipedia notes formatting tells are far more common in draft
submissions and talk-page comments than in polished article prose.

### 3.5 Marketing-copy specifics

- **Fake-vulnerability LinkedIn hook**: "I failed…", "I sent 100 cold DMs last
  month" — a hook designed by prompt rather than earned by experience.
- **One-sentence-paragraph cadence**: sub-12-word lines, double line breaks. Now
  self-reinforcing, since "write a LinkedIn post" guides prompt for exactly this.
- **Generic testimonials**: "Great service!" "Highly recommend!" on generic
  avatar cards.
- **Value props with no mechanism and no numbers**: "small business owners" vs.
  "B2B SaaS founders doing $1M–$5M ARR who've tried and failed with content
  agencies."

checkcopywriting.com's summary of untargeted AI marketing copy: *"grammatically
correct, structurally adequate, and strategically empty — reads smoothly, says
nothing specific, converts poorly."*

**These absence-based tells (no numbers, no named mechanism) are more durable
than vocabulary tells**, because you can't fix them with a thesaurus.

---

## Part 4 — Design and visual tells

### 4.1 The canonical generated landing page

Section order is consistent enough across v0 / Lovable / Bolt / Claude that
several reviewers describe it independently:

1. Badge/pill above the H1 ("✨ New: AI-powered")
2. Centered hero: gradient headline, vague subhead, two CTAs (filled primary +
   "Watch demo" with play icon)
3. Logo cloud ("trusted by"), often placeholder logos
4. Three-column feature grid: boxed icon + 3-word heading + one generic sentence
   (`lg:grid-cols-3`)
5. Stat row of round numbers: 10k+ users, 99.9% uptime, 24/7 support
6. Testimonial trio, stock/AI avatars with suspiciously perfect expressions
7. Pricing: exactly three tiers, middle badged "Most Popular"
8. FAQ accordion paraphrasing copy already on the page
9. Final CTA band repeating the hero
10. Four-column footer link grid, often ending "Built with care"

A direct comparison of v0/Bolt/Lovable found all three "use exactly the same
landing page layout," which "does take away from the website's personality."

### 4.2 Colour and type

**"AI purple" has a specific, documented origin.** Tailwind creator Adam Wathan
picked indigo as the Tailwind UI default accent around 2019 "not because it was
the best color for buttons" — arbitrarily. That code saturated LLM training
data, and the feedback loop closed: AI generates purple sites → those get
scraped → more purple in training data. Wathan posted a public apology in 2025
that passed 1M views.

- Classes/hex: `bg-indigo-500` (#6366f1), `from-indigo-500 to-purple-600`,
  `from-blue-600 to-purple-600`; blue-500 #3b82f6, blue-600 #2563eb, purple-500
  #8b5cf6, emerald-500 #10b981 for "success."
- Dark mode default: pure #000 on pure #fff text (causes halation), neon purple
  or cyan accents, glowing card borders, floating gradient orbs,
  `backdrop-filter: blur(20–40px)` glassmorphism.
- Palettes are timid and evenly distributed with no dominant hue — nothing reads
  as *chosen*.
- Type: Inter almost universally, then Geist, Poppins, Space Grotesk, Roboto,
  Cal Sans. Line-height 1.5 body / 1.2 headline, letter-spacing −0.02em on
  headings. Mathematically correct, personality-free.
- Shape/spacing: `rounded-2xl` (16px) on everything, box-shadow at exactly 0.1
  opacity, section padding locked to 96/128px regardless of content weight. The
  *uniformity* of the spacing scale is itself the tell — human designers vary
  density deliberately.
- vibecodekit calls a coloured 3–4px left-border strip on cards "the single most
  reliable AI tell," alongside untouched shadcn defaults
  (`rounded-2xl shadow-lg p-6`).

### 4.3 Components

- Lucide (the shadcn/ui default) or Heroicons, with recurring picks: `Check`,
  `Sparkles`, `Zap`, `Shield`, `BarChart3`, `ArrowRight`
- "Acme Inc" placeholder logos
- Reflexive three-card grids for any content; bento grids where they don't fit
- Badge pill above headline; round-number stat rows
- Numbered step rows (1 · 2 · 3), all-caps section labels, decorative monospace
- Motion: identical fade-in-from-below on every element (opacity 0→1, y 20→0,
  ~0.1s Framer Motion stagger), hover states that snap rather than ease, no
  differentiation between elements that mean different things

### 4.4 Generated imagery

- **Orange-and-teal colour bias** regardless of subject
- Over-saturated colour, plastic skin, excessive symmetry; hands with wrong
  finger counts, merged fingers, missing nails
- "Diverse group looking at a laptop in an impossibly well-lit office"
- Isometric 3D blobs and gradient-mesh backgrounds
- **Corporate Memphis** — the flat style with bendy disproportionate limbs and
  non-representational skin colours, spread from Facebook's 2017 "Alegria"
  system. Widely criticised as soulless and pandering.

### 4.5 Documents and decks

- Uniform bullets with a decorative stock icon each, dropped in regardless of
  meaning
- Identical formatting applied irrespective of data — one cited deck rendered
  four donut charts visually identically regardless of their values, because the
  model matched a template rather than reasoning about the data
- Template-mapped structure: bullets forced into the template's slot count
  rather than the content's natural shape
- Decorative dividers and tables used for pacing rather than comparison — the
  tell is a table whose cells don't need tabular alignment
- Bullets padded or truncated to identical line counts

### 4.6 What human-designed work does instead

- **Asymmetry by default**: split-screen with full-bleed imagery, high-contrast
  geometric arrangements. Not centered-everything.
- **Extreme typographic contrast**: weight jumps 100/200 vs 800/900 (not 400 vs
  600), size jumps 3×+ (not the safe 1.5×). Pair display with monospace, or
  serif with geometric sans.
- **Named, chosen fonts**: Playfair Display, Bricolage Grotesque, Crimson Pro,
  Fraunces, Clash Display, Satoshi, Cabinet Grotesk, IBM Plex, Instrument Serif,
  JetBrains Mono. Anything except an un-chosen Inter.
- **Brand-anchored palette**: one dominant hue + one neutral + one accent at
  roughly 60/30/10, with tints and shades built from it. Example of a real
  constraint: `--color-bg: #F5F0E8; --color-primary: #B84A2F`.
- **Deliberate spacing rhythm**: compress dense sections, open others for
  emphasis. Sameness of spacing is the tell.
- **Borderless-first cards**: separate with whitespace, then a background-tint
  shift, and reach for a border or shadow only last.
- **Real photography with imperfections**: actual team photos, real product
  screenshots, real embedded reviews.
- **One orchestrated animation moment** tied to real hierarchy, not a blanket
  fade-in.
- **Explicit negative constraints when directing a generator**: name what NOT to
  use, since default output regresses to the statistical mean unless steered.
- **A written `DESIGN.md`** with exact hex values and roles, named fonts and
  weights, an explicit spacing scale, and border-radius rules *by component
  type*. Cited by multiple sources as the most effective practical fix — it
  gives the generator something more specific than the training-data average.
- Contrast measured (APCA, Lc ≥75 body / ≥45 large), and all interactive states
  (hover/focus/active/disabled/loading/error/empty) explicitly designed.

---

## Part 5 — What actually makes prose read as human

Ordered rewrite checklist with rationale.

1. **Replace abstractions with named specifics and numbers.** "A recent study" →
   the study's name. "Many people" → a real count. Specificity is the clearest
   signal a person was paying attention, and it's what generated text defaults
   away from.
2. **Delete the throat-clearing opening paragraph.** The windup is almost always
   at the top of a draft; the real opening is usually paragraph two or three.
3. **Cut the summary conclusion.** Short-form prose doesn't need a recap.
4. **Vary sentence length aggressively.** Mix 3–8 word sentences with 25+ word
   ones; never let three consecutive sentences share a shape. Do this for the
   reader, not for a classifier (see Part 6).
5. **Turn nominalizations back into verbs.** "Our analysis of the company's
   performance" → "we analysed how the company performed." (Williams, *Style*.)
6. **Cut hedges and unearned words.** Orwell: "If it is possible to cut a word
   out, always cut it out." Zinsser: most first drafts survive a 50% cut with
   voice intact.
7. **Take a position.** At least one sentence should state what the author
   actually believes, rather than staying in the polite middle distance.
8. **Break the template paragraph.** Drop the mechanical topic sentence →
   explanation → example → mini-summary shape; let structure follow the thought.
9. **Old information in topic position, new information in stress position.**
   Readers expect a sentence to open with backward-linking context and close on
   the payoff. Violating this flattens prose that is otherwise grammatical.
   (Gopen's reader-expectation approach; Gopen & Swan, *The Science of
   Scientific Writing*.)
10. **Prefer short ordinary words over elevated Latinate ones.** (Orwell rule ii;
    Zinsser on simplicity.)
11. **Active voice as a default, not a dogma.** Pullum's takedown of Strunk &
    White found three of its four flagged passive examples were misdiagnosed.
    Passive is sometimes exactly right — for instance when old information
    belongs in subject position. Understand *why* a sentence is inert first.
12. **Cut the known vocabulary tics** (Part 2.1, Part 3).
13. **Watch em-dash density without overcorrecting.** More than one or two per
    paragraph is worth a second look; the em dash is also a legitimate older
    device now unfairly AI-shamed.
14. **Let a sentence run long, then land short.** Emphasis lives at the stress
    position.
15. **Vary paragraph length**, with occasional one-sentence paragraphs used
    sparingly.
16. **Show, don't tell.** Concrete anecdote does what adjectives ("generous,"
    "innovative") attempt and fail.
17. **Use domain jargon precisely, where a practitioner would.** Over-explaining
    a term an expert wouldn't define, and under-using precise terms an expert
    would reach for, both signal secondhand knowledge.
18. **Distinguish honest uncertainty from reflexive hedging.** "I'm not sure this
    generalises" is specific and human; scattering "might/could/it's worth
    noting" defensively is a tic.

**Root cause (Pinker, *The Sense of Style*):** the *curse of knowledge* — "the
single best explanation I know of why good people write bad prose." Writers
can't imagine what a reader doesn't already know, so they fail to make things
concrete. Classic style treats the reader as an equal and shows them something in
the world rather than pronouncing at them.

---

## Part 6 — Detectors and the integrity line

This section exists so `/humanize` never becomes a detector-evasion tool.

### 6.1 Detectors are not reliable

**OpenAI's own classifier** (Jan 2023, retired July 2023): 26% true-positive
rate, 9% false-positive rate, by OpenAI's own evaluation. The company that built
the models concluded its detector wasn't good enough to ship.

**Liang et al., Stanford, *Patterns* 2023 (arXiv:2304.02819)** — seven GPT
detectors against 91 TOEFL essays by non-native English speakers:

- **61.3%** average false-positive rate on the TOEFL essays
- **97.8%** flagged as AI by at least one detector
- **19.8%** unanimously misclassified by all seven
- Near-zero false positives on the native-speaker control set

Mechanism: non-native writing has lower lexical variety → lower perplexity →
detectors conflate that with generation. The authors explicitly warn against
high-stakes use.

**Vendor claims vs. independent findings:**

| Detector | Claimed | Independent |
|---|---|---|
| GPTZero | ~99% acc, ≤1% FP | 15–16% of human essays flagged in some university samples |
| Turnitin | 98% acc, <1% FP | ~80–84% in independent testing; deliberately lets ~15% of AI through to hold FP down |
| Originality.ai | high | RAID: ~85% acc, **9.24% FP**; 31–37% FP against ChatGPT o1 in a rival's head-to-head |
| Pangram | near-zero FP/FN | Best-corroborated of the four, but most favourable evidence is vendor-published |

**RAID benchmark (ACL 2024, arXiv:2405.07940)**, 6M+ generations across 11
models, 8 domains, 11 adversarial attacks: vendor claims of 99%+ "do not hold"
under adversarial conditions. Homoglyph attacks cost five detectors an average
**40.6%** accuracy. Synonym swaps dropped Binoculars **36.1%**. Some classifiers
*improved* after paraphrasing, because paraphrase pushed text toward their
training distribution.

Aggregated independent studies put real-world false positives at **3.8–17.1%**,
against vendor-claimed <1%.

**Why perplexity and burstiness fail as signals** (Pangram's own analysis):
widely-reproduced human text (the Declaration of Independence, Wikipedia) scores
low-perplexity because training minimised perplexity on exactly that text;
perplexity is relative to a particular model; closed models don't expose token
probabilities; ESL writers score artificially low; static metrics don't improve
with more data.

**The kicker:** artificially inflating burstiness can make text look *more*
synthetic to some detectors, because it decouples surface variation from genuine
thought variation.

### 6.2 Humanizer-tool anti-patterns — hard bans

- **Unicode homoglyph substitution** (Cyrillic "А" for Latin "A"). Invisible to
  readers, exists only to defeat character matching. This is textual forgery.
  Vendors ship dedicated homoglyph detectors.
- **Zero-width and invisible characters** inserted between tokens. Same
  category, same ban.
- **Naive synonym swapping.** Produces wrong-register vocabulary ("utilize" for
  "use"), breaks collocations, and makes the prose objectively worse.
- **Random syntax reshuffling.** Breaks the old→new information contract without
  making the reasoning more human. Mimics texture, not thought.
- **Second-order detectability.** Turnitin's August 2025 release trains
  specifically on humanizer-tool output fingerprints. Cheap humanizing now adds
  an independent second red flag on top of the first.

### 6.3 The line the skill must hold

The objective is writing that is genuinely better — clearer, more specific, more
honestly the author's own thinking. Not writing engineered to pass a classifier
while staying hollow. These objectives sometimes actively oppose each other.

Detectors "don't evaluate quality; they flag statistical patterns," and enforcing
"a narrow, flattened version of what human writing is supposed to look like"
penalises real skill — consistency, structure, developed voice — as if it were
suspicious.

---

## Sources

### Academic

- Kobak et al., "Delving into LLM-assisted writing in biomedical publications
  through excess vocabulary," *Science Advances* 2025 —
  https://www.science.org/doi/10.1126/sciadv.adt3813 · https://arxiv.org/abs/2406.07016
- "Delving Into PubMed Records," *Perspectives on Medical Education* —
  https://pmejournal.org/articles/10.5334/pme.1929 ·
  https://www.medrxiv.org/content/10.1101/2024.05.14.24307373
- Reinhart et al., "Do LLMs write like humans?" *PNAS* 2025 —
  https://www.pnas.org/doi/10.1073/pnas.2422455122 · https://arxiv.org/abs/2410.16107
- Liang et al., "Monitoring AI-Modified Content at Scale" (peer reviews), ICML
  2024 — https://arxiv.org/abs/2403.07183
- Liang, Zhang, Codreanu et al., "The Widespread Adoption of LLM-Assisted
  Writing Across Society," *Patterns* 2025 —
  https://www.cell.com/patterns/fulltext/S2666-3899(25)00214-4 · https://arxiv.org/abs/2502.09747
- "The Last Fingerprint: How Markdown Training Shapes LLM Prose" —
  https://arxiv.org/html/2603.27006v1
- "Em-ergence of the em-dash" (69,632 medRxiv preprints) — https://arxiv.org/abs/2606.29540
- Sharma et al. (Anthropic), "Towards Understanding Sycophancy in Language
  Models" — https://arxiv.org/abs/2310.13548
- "How RLHF Amplifies Sycophancy" — https://arxiv.org/pdf/2602.01002
- "The Rise of Verbal Tics in Large Language Models" — https://arxiv.org/html/2604.19139v2
- "Understanding the Effects of RLHF on Quality and Detectability" — https://arxiv.org/abs/2503.17965
- Stylometry vs. human judges, PLOS ONE —
  https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0335369
- Japanese stylometric ChatGPT detection — https://arxiv.org/pdf/2304.05534
- "Does Writing with Language Models Reduce Content Diversity?" ICLR 2024 —
  https://arxiv.org/pdf/2309.05196
- "The Shrinking Landscape of Linguistic Diversity" — https://arxiv.org/abs/2502.11266
- AI Brown / AI Koditex comparable corpora — https://arxiv.org/abs/2509.22996
- Jiang & Hyland, engagement markers —
  https://journals.sagepub.com/doi/10.1177/07410883251328311
- Jiang & Hyland, metadiscourse —
  https://www.sciencedirect.com/science/article/abs/pii/S0889490625000134

### Detectors

- Liang et al., "GPT detectors are biased against non-native English writers,"
  *Patterns* 2023 — https://arxiv.org/pdf/2304.02819 ·
  https://www.sciencedirect.com/science/article/pii/S2666389923001307
- RAID benchmark, ACL 2024 — https://arxiv.org/abs/2405.07940
- OpenAI classifier retirement — https://techcrunch.com/2023/07/25/openai-scuttles-ai-written-text-detector-over-low-rate-of-accuracy/
- Pangram, "Why Perplexity and Burstiness Fail" —
  https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai
- Pangram technical report — https://arxiv.org/pdf/2402.14873
- Turnitin on false positives —
  https://www.turnitin.com/blog/understanding-false-positives-within-our-ai-writing-detection-capabilities
- Turnitin AI-bypasser detection —
  https://www.plagiarismtoday.com/2025/08/27/turnitin-launches-anti-ai-humanizer-feature/
- The Markup, detectors falsely accuse international students —
  https://themarkup.org/machine-learning/2023/08/14/ai-detection-tools-falsely-accuse-international-students-of-cheating
- Originality.ai homoglyph detector —
  https://originality.ai/blog/fake-text-homoglyph-detector-and-generator
- Originality.ai invisible-text detector —
  https://originality.ai/blog/invisible-text-detector-remover

### Practitioner / editorial

- **Wikipedia:Signs of AI writing** — https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
- HN discussion of the above — https://news.ycombinator.com/item?id=44700558
- Forbes, "The Seven Deadly Tells of AI Writing" —
  https://www.forbes.com/sites/charliefink/2025/06/12/the-seven-tells-of-ai-writing/
- Forbes, "The 10 Giveaway Signs of AI Writing, Wikipedia Reveals" —
  https://www.forbes.com/sites/jodiecook/2025/09/08/the-10-giveaway-signs-of-ai-writing-wikipedia-reveals/
- Dead Languages Society, rhetorical analysis —
  https://www.deadlanguagesociety.com/p/rhetorical-analysis-ai
- ruben.substack.com, "It's not X, it's Y" — https://ruben.substack.com/p/its-not-x-its-y
- Peter Yang, No-AI-Slop patterns —
  https://creatoreconomy.so/p/use-my-no-ai-slop-skill-to-remove-20-ai-slop-patterns
- The Algorithmic Bridge, "10 Signs of AI Writing" —
  https://www.thealgorithmicbridge.com/p/10-signs-of-ai-writing-that-99-of
- Sean Kernan, "13 Signs You Used ChatGPT" —
  https://seanjkernan.substack.com/p/13-signs-you-used-chatgpt-to-write
- hyacinth.ai, 42 phrases — https://hyacinth.ai/spot-ai-written-content-phrases/
- Grammarly, common AI words — https://www.grammarly.com/blog/ai/common-ai-words/
- Retraction Watch, undeclared ChatGPT use —
  https://retractionwatch.com/2023/10/06/signs-of-undeclared-chatgpt-use-in-papers-mounting/
- Tan Rosado, false-positive pushback —
  https://tanrosado.substack.com/p/week-16-10-phrases-that-scream-ai
- checkcopywriting.com, AI-generated copy — https://checkcopywriting.com/ai-generated-copy/

### Design

- 925studios, AI Slop Web Design Guide — https://www.925studios.co/blog/ai-slop-web-design-guide
- dev.to/alanwest, "Blame Tailwind's Indigo-500" —
  https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
- prg.sh, "Why Your AI Keeps Building the Same Purple Gradient Website" —
  https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
- Sailop, "AI Slop in 2026" — https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web
- vibecodekit.dev, AI Slop Design — https://vibecodekit.dev/ai-slop-design
- RAXXO, "Dark Mode Design That Doesn't Look AI" —
  https://raxxo.shop/blogs/lab/dark-mode-design-that-doesnt-look-ai
- MindStudio, "How to Avoid AI Slop When Using Claude Design" —
  https://www.mindstudio.ai/blog/claude-design-avoid-ai-slop-design-system
- Wikipedia, Corporate Memphis — https://en.wikipedia.org/wiki/Corporate_Memphis
- Eye on Design / AIGA on Corporate Memphis —
  https://eyeondesign.aiga.org/what-the-think-pieces-about-corporate-memphis-tell-us-about-the-state-of-illustration/
- Flitto, orange-and-teal bias —
  https://datalab.flitto.com/en/company/blog/this-orange-and-teal-color-bias-shouts-that-your-image-was-ai-generated/
- UI Bakery, Lovable vs Bolt vs V0 — https://uibakery.io/blog/lovable-vs-bolt-vs-v0

### Craft

- Pinker, *The Sense of Style* — https://sive.rs/book/SenseOfStyle
- Orwell's six rules — https://www.openculture.com/2025/12/george-orwells-six-rules-for-writing.html
- Williams, *Style: Lessons in Clarity and Grace* —
  https://www.archbee.com/blog/book-review-joseph-m-williams-style-lessons-in-clarity-and-grace
- Zinsser, *On Writing Well* — https://www.archbee.com/blog/book-review-william-zinssers-on-writing-well
- Gopen, reader-expectation approach — https://www.georgegopen.com/reader-expectation-approach.html
- Gopen & Swan, "The Science of Scientific Writing" —
  https://www.usenix.org/sites/default/files/gopen_and_swan_science_of_scientific_writing.pdf
- Pullum, "50 Years of Stupid Grammar Advice" — https://www.lel.ed.ac.uk/~gpullum/50years.pdf
- Publication Coach on throat-clearing — https://www.publicationcoach.com/throat-clearing-in-writing/
- George Kao, "How To Write Without Sounding Like AI" —
  https://georgekao.substack.com/p/how-to-write-without-sounding-like
- The Conversation, on em dashes and "delves" —
  https://theconversation.com/too-many-em-dashes-weird-words-like-delves-spotting-text-written-by-chatgpt-is-still-more-art-than-science-259629
- The Ringer, em-dash counterpoint —
  https://www.theringer.com/2025/08/20/pop-culture/em-dash-use-ai-artificial-intelligence-chatgpt-google-gemini
