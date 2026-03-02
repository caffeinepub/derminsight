import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  ClipboardList,
  FileText,
  ShieldCheck,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  return (
    <>
      {/* Disclaimer Banner */}
      <div className="disclaimer-bar px-4 py-3">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs text-foreground/75 leading-relaxed">
            <strong className="font-semibold">Important:</strong> This service
            does not provide medical advice, diagnosis, or treatment. Always
            consult a licensed dermatologist or healthcare professional for
            medical skin conditions.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal mb-6 border border-teal/30 bg-teal/5 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                Educational Skincare Consulting
              </span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6"
            >
              Understand Your Skin.
              <br />
              <span className="text-teal">Build a Routine</span>
              <br />
              That Works.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              Personalized, evidence-informed skincare guidance — delivered
              through a private consultation process. No sales pressure, no
              medical claims. Just practical education tailored to your skin.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link to="/start">
                <Button
                  size="lg"
                  className="bg-teal hover:bg-teal-dark text-white font-medium px-7"
                >
                  Begin Your Skin Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium px-7"
                >
                  How It Works
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-divider bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight mb-3">
              Who This Is For
            </h2>
            <p className="text-muted-foreground text-base max-w-lg">
              This service is designed for people who want informed, structured
              guidance — not generic advice or product recommendations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ClipboardList className="w-5 h-5 text-teal" />,
                iconBg: "bg-teal-light",
                title: "Overwhelmed by products",
                desc: "You've tried many products but aren't sure what your skin actually needs. You want a structured, evidence-informed starting point.",
              },
              {
                icon: <UserCheck className="w-5 h-5 text-indigo" />,
                iconBg: "bg-indigo-light",
                title: "Persistent skin concerns",
                desc: "You've been dealing with recurring concerns — acne, texture, dryness — and want a thoughtful review of your routine and habits.",
              },
              {
                icon: <BookOpen className="w-5 h-5 text-rose" />,
                iconBg: "bg-rose-light",
                title: "Evidence-informed guidance",
                desc: "You value science-based skincare education over trends and want to build a sustainable routine grounded in dermatological research.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-shadow card-premium"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${item.iconBg} flex items-center justify-center mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Teaser */}
      <section className="section-divider">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground text-base max-w-lg">
              A straightforward, three-step process designed to be private,
              calm, and judgment-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <ClipboardList className="w-5 h-5 text-teal" />,
                title: "Submit your information",
                desc: "Complete a private intake form covering your skin concerns, current routine, and goals. Optionally upload photos.",
              },
              {
                step: "02",
                icon: <FileText className="w-5 h-5 text-teal" />,
                title: "Receive your analysis",
                desc: "Within 2–3 business days, receive a detailed written report with personalized routine guidance and product category recommendations.",
              },
              {
                step: "03",
                icon: <CheckSquare className="w-5 h-5 text-teal" />,
                title: "Follow your routine",
                desc: "Implement the guidance at your own pace. Optional follow-up sessions available with paid plans for ongoing support.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="font-display text-4xl font-bold text-border leading-none">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-teal-light flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-semibold text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-10"
          >
            <Link to="/how-it-works">
              <Button variant="outline" className="font-medium">
                Learn more about the process
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-divider bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl font-bold tracking-tight mb-2">
              Our Commitments
            </h2>
            <p className="text-muted-foreground text-sm">
              What you can always expect from DermInsight.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-teal" />,
                iconBg: "bg-teal-light",
                title: "100% Private",
                desc: "Your data is stored securely and used only for your consultation.",
              },
              {
                icon: <BookOpen className="w-5 h-5 text-indigo" />,
                iconBg: "bg-indigo-light",
                title: "Evidence-informed",
                desc: "Guidance grounded in published dermatological research.",
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-rose" />,
                iconBg: "bg-rose-light",
                title: "Education-first",
                desc: "We explain the why behind every recommendation.",
              },
              {
                icon: <UserCheck className="w-5 h-5 text-gold" />,
                iconBg: "bg-gold-light",
                title: "No upselling",
                desc: "We don't sell products or earn commissions on recommendations.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-xl p-5 card-premium"
              >
                <div
                  className={`w-8 h-8 rounded-md ${item.iconBg} flex items-center justify-center mb-3`}
                >
                  {item.icon}
                </div>
                <h4 className="font-display font-semibold text-sm mb-1.5">
                  {item.title}
                </h4>
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
        <div
          className="py-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--teal-light) / 0.2) 0%, oklch(var(--background)) 50%, oklch(var(--indigo-light) / 0.2) 100%)",
            borderLeft: "4px solid oklch(var(--teal))",
          }}
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to understand your skin?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The free mini audit takes less than 10 minutes. No account
                required, no payment upfront.
              </p>
              <Link to="/start">
                <Button
                  size="lg"
                  className="bg-teal hover:bg-teal-dark text-white font-medium px-8"
                >
                  Begin Your Skin Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-5">
                Not a medical service &middot; Educational purposes only
                &middot;{" "}
                <Link to="/legal" className="underline underline-offset-2">
                  Legal notice
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
