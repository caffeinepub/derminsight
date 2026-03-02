import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Heart,
  Microscope,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: <BookOpen className="w-5 h-5 text-teal" />,
    title: "Education First",
    desc: "Every recommendation comes with an explanation. We believe understanding your skin is more valuable than following instructions blindly.",
  },
  {
    icon: <Microscope className="w-5 h-5 text-teal" />,
    title: "Evidence-informed",
    desc: "Our guidance is grounded in published dermatological and cosmetic science research, not trends, influencers, or marketing claims.",
  },
  {
    icon: <Heart className="w-5 h-5 text-teal" />,
    title: "Long-term focus",
    desc: "We prioritize sustainable skin health over quick fixes. Building a consistent, gentle routine usually outperforms chasing trends.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-teal" />,
    title: "Privacy by design",
    desc: "Your data is yours. We collect only what's needed for your consultation and do not share, sell, or use it for any other purpose.",
  },
];

export default function AboutPage() {
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
              About DermInsight
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Our Approach
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              A commitment to evidence-informed skincare education, transparent
              practice, and long-term skin health — without the noise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold tracking-tight mb-5">
              Why we exist
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                The skincare industry is saturated with conflicting advice,
                influencer-driven recommendations, and products marketed with
                exaggerated claims. Meanwhile, genuine, science-backed guidance
                can be difficult to access without a clinical appointment.
              </p>
              <p>
                DermInsight was created to bridge that gap: providing
                thoughtful, educational guidance rooted in dermatological
                research — without pretending to be a medical service, and
                without pushing products.
              </p>
              <p>
                We believe most people can significantly improve their skin's
                health with a simplified, well-structured routine and an
                understanding of why each step matters. That's what we help you
                build.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold tracking-tight mb-5">
              Our philosophy
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                The most effective skincare routine is usually the simplest one
                you can consistently follow. Overcomplicated multi-step routines
                often introduce more variables — and more potential for
                irritation — than they solve.
              </p>
              <p>
                We prioritize barrier health as a foundation. A compromised skin
                barrier underlies many common concerns. Protecting and restoring
                it is frequently the first step before addressing specific
                issues.
              </p>
              <p>
                We don't chase trends. Ingredients that have been extensively
                studied are more reliable than the newest launches. We favor
                well-established formulations with a strong evidence base.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-divider bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl font-bold tracking-tight">
              What guides us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-light flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h4 className="font-display font-semibold text-sm mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials & Professional Development */}
      <section className="section-divider">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-teal-light flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-teal" />
                </div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Professional development
                </h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Our consultants maintain an ongoing commitment to skincare
                  science education, engaging regularly with peer-reviewed
                  dermatology literature, formulation science, and
                  evidence-based skincare resources.
                </p>
                <p>
                  We stay current with developments in cosmetic chemistry,
                  barrier function research, and dermatological practice
                  guidelines to ensure our guidance reflects the best available
                  educational information.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-teal-light flex items-center justify-center">
                  <Scale className="w-4 h-4 text-teal" />
                </div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Transparency statement
                </h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  We do not have affiliate relationships with skincare brands or
                  product manufacturers. We do not receive compensation for
                  mentioning or recommending any product category.
                </p>
                <p>
                  Your intake data, photos, and consultation details are used
                  solely for the purpose of your consultation and are not shared
                  with third parties or used for marketing purposes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Are Not */}
      <section className="section-divider bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-display text-xl font-bold tracking-tight">
                Important: What DermInsight is not
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Clarity about our scope is a core part of how we operate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Not a dermatology or medical service",
                desc: "DermInsight does not employ licensed dermatologists or medical professionals. We are not a clinical service and cannot provide medical assessments.",
              },
              {
                title: "Not a diagnostic service",
                desc: "We do not diagnose skin conditions, skin diseases, or any medical concerns. If you have a potential skin condition requiring diagnosis, please consult a licensed dermatologist.",
              },
              {
                title: "Not a prescription service",
                desc: "We do not recommend, prescribe, or advise on prescription medications, prescription topicals, or any medical treatments for skin conditions.",
              },
              {
                title: "Not a substitute for medical care",
                desc: "If you have a medical skin concern — including inflammatory conditions, suspected infections, or anything requiring clinical assessment — please seek professional medical care.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-card border border-border rounded-lg p-5"
              >
                <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-divider">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold tracking-tight mb-3">
              Start your consultation
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              If you'd like evidence-informed, educational skincare guidance
              tailored to your skin profile, we're here to help.
            </p>
            <Link to="/start">
              <Button
                size="lg"
                className="bg-teal hover:bg-teal-dark text-white font-medium px-7"
              >
                Begin Your Skin Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
