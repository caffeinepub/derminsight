import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const concerns = [
  {
    id: "acne",
    name: "Acne & Breakouts",
    subtitle: "Understanding blemish formation",
    description:
      "Acne is one of the most common skin concerns, influenced by a combination of factors including sebum production, pore lining cell turnover, bacterial presence, and inflammation. Understanding which type of breakouts you experience — comedonal, inflammatory, or cystic — is foundational to choosing the right approach.",
    factors: [
      "Excess sebum production",
      "Comedogenic product ingredients",
      "Hormonal fluctuations",
      "Barrier disruption from over-cleansing",
      "Friction and physical pressure",
      "Dietary and lifestyle factors",
    ],
    note: "Severe or cystic acne often benefits from dermatological intervention. Consulting a licensed professional is recommended.",
  },
  {
    id: "oiliness",
    name: "Oiliness & Shine",
    subtitle: "Sebum regulation and skin barrier",
    description:
      "Oily skin is primarily driven by overactive sebaceous glands. The skin barrier plays an important role here — when the barrier is compromised (often from harsh cleansing or aggressive products), the skin may produce more sebum to compensate. Addressing barrier health is often as important as targeting oil production.",
    factors: [
      "Overactive sebaceous glands",
      "Barrier damage from harsh cleansers",
      "Humidity and temperature",
      "Certain moisturizer formulations",
      "Hormonal influences",
      "Genetic predisposition",
    ],
    note: "Stripping the skin with mattifying products can worsen oiliness long-term. Barrier-first approaches are typically more effective.",
  },
  {
    id: "dryness",
    name: "Dryness & Dehydration",
    subtitle: "Lipid deficiency vs. water content",
    description:
      "Dryness and dehydration are distinct — yet commonly confused. Dry skin refers to a skin type with reduced lipid production, while dehydration is a temporary condition where the skin lacks water content. Both affect the way skin looks and feels, but they require different approaches in a routine.",
    factors: [
      "Low natural lipid production (dry skin type)",
      "Insufficient water intake and environmental humidity",
      "Over-exfoliation or harsh actives",
      "Stripping cleansers that remove skin lipids",
      "Weather and indoor climate conditions",
      "Transepidermal water loss (TEWL)",
    ],
    note: "Many oily skin types also experience dehydration. The two can coexist and require different treatment layers.",
  },
  {
    id: "texture",
    name: "Texture & Enlarged Pores",
    subtitle: "Cell turnover and structural factors",
    description:
      "Uneven skin texture is largely influenced by cell turnover rate, congestion within pores, and collagen structure. Pore size is primarily genetically determined and cannot be permanently reduced — but their appearance can be managed. Setting realistic expectations is an important part of approaching texture concerns.",
    factors: [
      "Slow surface cell turnover",
      "Accumulated dead skin cells",
      "Sebum and product congestion",
      "Sun damage affecting collagen",
      "Previous acne scarring",
      "Genetics and skin type",
    ],
    note: "Visible 'open pores' cannot be physically opened or closed. Their appearance is influenced by hydration, congestion, and oil control.",
  },
  {
    id: "pigmentation",
    name: "Pigmentation & Uneven Tone",
    subtitle: "Melanin distribution and contributing causes",
    description:
      "Uneven skin tone and pigmentation are driven by melanin production irregularities. Common types include post-inflammatory hyperpigmentation (PIH) from acne or skin trauma, sun-induced pigmentation, and melasma — each with distinct contributing factors and educational approaches.",
    factors: [
      "UV exposure without adequate protection",
      "Post-inflammatory hyperpigmentation (PIH)",
      "Hormonal influences (melasma)",
      "Skin trauma or picking",
      "Certain medications or topicals",
      "Genetics and skin tone",
    ],
    note: "Some forms of pigmentation — particularly melasma and persistent PIH — benefit significantly from guidance by a licensed dermatologist.",
  },
];

export default function SkinConcernsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="border-b border-border bg-secondary/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-teal mb-4 block">
              Educational Overview
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Common Skin Concerns
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              We can help you explore these common concerns through an
              evidence-informed consultation. Understanding the contributing
              factors is the first step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Concern Cards */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {concerns.map((concern, i) => (
            <motion.article
              key={concern.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`bg-card border border-border rounded-xl p-7 flex flex-col gap-5 ${
                i === 4 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight">
                      {concern.name}
                    </h2>
                    <p className="text-xs text-teal font-medium mt-0.5">
                      {concern.subtitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-3 h-3 rounded-full bg-teal/50 block" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {concern.description}
                </p>
              </div>

              {/* Factors */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Common contributing factors
                </h4>
                <div
                  className={`grid gap-2 ${i === 4 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
                >
                  {concern.factors.map((factor) => (
                    <div
                      key={factor}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal/60 mt-1.5 flex-shrink-0" />
                      {factor}
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional note */}
              <div className="disclaimer-bar px-3 py-2.5 rounded-sm">
                <p className="text-xs text-foreground/70 leading-relaxed">
                  <strong className="font-medium">Note: </strong>
                  {concern.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 p-5 bg-secondary/40 border border-border rounded-xl text-center"
        >
          <p className="text-sm text-muted-foreground">
            These are educational descriptions, not diagnoses. For persistent,
            severe, or medically significant skin concerns, please consult a{" "}
            <strong className="font-medium text-foreground/80">
              licensed dermatologist
            </strong>
            .
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-divider bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold tracking-tight mb-3">
              Ready to discuss your skin concern?
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              The intake process covers your specific concerns in detail and
              helps us provide targeted, personalized guidance.
            </p>
            <Link to="/start">
              <Button
                size="lg"
                className="bg-teal hover:bg-teal-dark text-white font-medium px-7"
              >
                Begin Your Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
