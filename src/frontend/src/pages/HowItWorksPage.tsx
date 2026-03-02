import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  ClipboardList,
  FileText,
  MessageCircle,
  Search,
} from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    icon: <ClipboardList className="w-5 h-5 text-teal" />,
    title: "Complete the Intake Form",
    desc: "Answer guided questions about your skin concerns, current skincare routine, lifestyle factors, and goals. The questionnaire is designed to be thorough yet straightforward — each question has a specific purpose in building your profile.",
    details: [
      "Skin type and primary concerns",
      "Current morning and evening routine",
      "Product ingredients you're currently using",
      "Short-term and long-term skin goals",
    ],
  },
  {
    number: "02",
    icon: <Camera className="w-5 h-5 text-teal" />,
    title: "Upload Optional Photos",
    desc: "Front-facing photos of your skin help us provide more targeted, accurate guidance. This step is entirely optional. If provided, photos are stored securely and used exclusively for your consultation — never shared.",
    details: [
      "Natural lighting is preferred",
      "Front-facing, neutral expression",
      "Photos are encrypted and secured",
      "Deleted upon request at any time",
    ],
  },
  {
    number: "03",
    icon: <Search className="w-5 h-5 text-teal" />,
    title: "Consultant Reviews Your Profile",
    desc: "A qualified consultant reviews your complete intake profile within 2–3 business days. The review process examines your skin concerns in context of your routine, goals, and any photos provided.",
    details: [
      "Thorough review of all intake responses",
      "Cross-referenced with evidence-based resources",
      "Identification of potential routine gaps",
      "Consideration of skin concern interactions",
    ],
  },
  {
    number: "04",
    icon: <FileText className="w-5 h-5 text-teal" />,
    title: "Receive Your Personalized Report",
    desc: "You receive a detailed written report delivered to your email. The report is structured, readable, and actionable — with clear explanations for every recommendation.",
    details: [
      "Routine structure recommendations",
      "Product category guidance (not specific brands)",
      "Ingredient highlights to seek and avoid",
      "Lifestyle considerations relevant to your concerns",
    ],
  },
  {
    number: "05",
    icon: <MessageCircle className="w-5 h-5 text-teal" />,
    title: "Follow-Up Option",
    desc: "For Standard and Premium plan clients, a follow-up Q&A session is available after you've had time to implement the recommendations. This allows for refinement and any clarifying questions.",
    details: [
      "Available 2–6 weeks post-report",
      "Asynchronous written format",
      "Address implementation questions",
      "Adjust recommendations if needed",
    ],
  },
];

const faqs = [
  {
    q: "Is my information kept private?",
    a: "Yes, absolutely. Your intake data and any photos are stored securely and used only for your consultation. We do not share, sell, or use your data for any other purpose. You can request deletion of your data at any time by contacting us.",
  },
  {
    q: "How long does the turnaround take?",
    a: "Consultations are typically completed within 2–3 business days of a complete intake submission. Premium plan clients may receive priority review. You'll receive an email notification when your report is ready.",
  },
  {
    q: "What's included in the written report?",
    a: "The report includes a structured routine framework, guidance on product categories and key ingredients relevant to your concerns, factors that may be contributing to your concerns, and considerations for long-term skin health. It does not include specific product brands or medical diagnoses.",
  },
  {
    q: "Is this a medical or dermatology service?",
    a: "No. DermInsight is an educational skincare consulting service. We do not diagnose skin conditions, prescribe treatments, or provide medical advice. If you have a medical skin concern — such as a suspected infection, inflammatory condition, or anything requiring prescription treatment — please consult a licensed dermatologist.",
  },
];

export default function HowItWorksPage() {
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
              The Process
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              How It Works
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              A structured, five-step consultation process designed to give you
              clear, evidence-informed skincare guidance — delivered privately
              and professionally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Steps */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative sm:pl-20 md:pl-24"
              >
                {/* Step indicator */}
                <div className="absolute left-0 sm:left-3 md:left-4 top-0 w-10 h-10 rounded-full bg-card border-2 border-teal flex items-center justify-center z-10">
                  {step.icon}
                </div>

                <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-display text-3xl font-bold text-border/70 leading-none flex-shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.details.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Common questions about the consultation process.
            </p>
          </motion.div>

          <div className="max-w-2xl">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <AccordionItem
                    value={`faq-${faq.q}`}
                    className="border border-border rounded-lg overflow-hidden bg-card px-5"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
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
            <h2 className="font-display text-2xl font-bold tracking-tight mb-4">
              Ready to begin?
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
              The intake form takes 5–10 minutes. The free mini audit requires
              no payment.
            </p>
            <Link to="/start">
              <Button
                size="lg"
                className="bg-teal hover:bg-teal-dark text-white font-medium px-7"
              >
                Start Your Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
