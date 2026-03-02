import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import type { ServicePlan } from "../backend.d";
import { useServicePlans } from "../hooks/useQueries";

// ─── Razorpay SDK loader ───────────────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function openRazorpay(planName: string, amountINR: number) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Could not load Razorpay. Please check your connection.");
    return;
  }

  const options = {
    key: "rzp_test_YourKeyHere", // replace with real key from Razorpay dashboard
    amount: amountINR * 100, // paise
    currency: "INR",
    name: "DermInsight",
    description: planName,
    handler: (response: any) => {
      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    },
    prefill: { name: "", email: "", contact: "" },
    notes: { plan: planName },
    theme: { color: "#2D9B8A" },
    modal: { ondismiss: () => {} },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}

// ─── Local INR plan data ───────────────────────────────────────────────────
interface INRPlan {
  id: string;
  name: string;
  inrPrice: number;
  isFree: boolean;
  isMonthly: boolean;
  features: string[];
  description: string;
}

const INR_PLAN_DATA: INRPlan[] = [
  {
    id: "free",
    name: "Free Mini Skin Audit",
    inrPrice: 0,
    isFree: true,
    isMonthly: false,
    description:
      "A quick, personalized skin insight delivered instantly online.",
    features: ["Quick personalized insight", "Instant online results"],
  },
  {
    id: "standard",
    name: "Standard Consultation",
    inrPrice: 499,
    isFree: false,
    isMonthly: false,
    description:
      "A thorough consultation with a full routine and photo analysis.",
    features: [
      "Full personalized routine",
      "Photo-based analysis",
      "3–5 day follow-up",
    ],
  },
  {
    id: "enhanced",
    name: "Enhanced Plan",
    inrPrice: 1499,
    isFree: false,
    isMonthly: false,
    description:
      "Everything in Standard plus a budget product guide and lifestyle advice.",
    features: [
      "Routine + budget product guide",
      "Lifestyle suggestions",
      "7-day support",
    ],
  },
  {
    id: "premium",
    name: "Premium Coaching",
    inrPrice: 3999,
    isFree: false,
    isMonthly: true,
    description:
      "Ongoing monthly coaching with weekly check-ins and accountability.",
    features: [
      "Weekly check-ins",
      "Ongoing adjustments",
      "Progress tracking + accountability",
    ],
  },
];

// Fallback plans for backend shape compatibility (not displayed directly)
const FALLBACK_PLANS: ServicePlan[] = INR_PLAN_DATA.map((p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  priceUSD: BigInt(p.inrPrice),
  isFree: p.isFree,
  features: p.features,
}));

// Paid plans shown in the Razorpay section
const RAZORPAY_PLANS = INR_PLAN_DATA.filter((p) => !p.isFree);

const PAYMENT_METHODS = [
  "UPI",
  "Net Banking",
  "Visa / Mastercard",
  "Wallets",
  "EMI",
];

// ─── Plan Card ─────────────────────────────────────────────────────────────
function PlanCard({
  plan,
  isMostPopular,
  index,
}: {
  plan: INRPlan;
  isMostPopular: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative flex flex-col rounded-xl p-7 ${
        isMostPopular
          ? "bg-gradient-to-br from-teal-light/30 to-indigo-light/20 border border-teal ring-1 ring-teal/20 shadow-lg card-premium"
          : "bg-card border border-border hover:shadow-sm transition-shadow"
      }`}
    >
      {isMostPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-teal text-white border-0 text-xs font-semibold px-3 py-1 shadow-sm whitespace-nowrap">
            Most Popular
          </Badge>
        </div>
      )}

      <div className="mb-5">
        <h3 className="font-display text-lg font-bold tracking-tight mb-1.5">
          {plan.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        {plan.isFree ? (
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold">Free</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold">
              ₹{plan.inrPrice.toLocaleString("en-IN")}
            </span>
            {plan.isMonthly && (
              <span className="text-sm text-muted-foreground">/month</span>
            )}
          </div>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/start">
        <Button
          className={`w-full font-medium ${
            isMostPopular ? "bg-teal hover:bg-teal-dark text-white" : ""
          }`}
          variant={isMostPopular ? "default" : "outline"}
        >
          {plan.isFree ? "Start Free Audit" : "Begin Consultation"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

function PlanCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-7">
      <Skeleton className="h-5 w-36 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <Skeleton className="h-10 w-24 mb-6" />
      <div className="space-y-2.5 mb-8">
        {(["f1", "f2", "f3"] as const).map((k) => (
          <Skeleton key={k} className="h-4 w-full" />
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// ─── Razorpay Section ──────────────────────────────────────────────────────
function RazorpayPaymentSection() {
  return (
    <section className="border-t border-border">
      <div
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(var(--indigo-light) / 0.4) 0%, oklch(var(--teal-light) / 0.2) 100%)",
        }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          {/* API key info banner */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-2.5 bg-amber-50/80 border border-amber-200 text-amber-800 rounded-lg px-4 py-3 mb-10 max-w-2xl mx-auto text-sm"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Replace{" "}
              <code className="font-mono bg-amber-100 px-1 rounded text-xs">
                rzp_test_YourKeyHere
              </code>{" "}
              with your Razorpay API key. Test mode active.
            </span>
          </motion.div>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo mb-4 block">
              Secure India Payments
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Pay Securely with Razorpay
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              Serving clients in India — pay in INR via UPI, Net Banking,
              Credit/Debit Card, or Wallets.
            </p>

            {/* Payment method badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/70 border border-indigo/20 text-foreground/80 backdrop-blur-sm"
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Payment plan cards — 3 paid plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {RAZORPAY_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm border border-indigo/15 rounded-xl p-7 flex flex-col card-premium"
              >
                <div className="mb-5">
                  <h3 className="font-display text-lg font-bold tracking-tight mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-bold text-indigo">
                      ₹{plan.inrPrice.toLocaleString("en-IN")}
                    </span>
                    {plan.isMonthly && (
                      <span className="text-sm text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.isMonthly
                      ? "Monthly · Cancel anytime"
                      : "One-time payment · No subscription"}
                  </p>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-3.5 h-3.5 text-teal mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full font-semibold text-white hover:opacity-90 transition-opacity mt-auto"
                  style={{ backgroundColor: "oklch(var(--indigo))" }}
                  onClick={() => openRazorpay(plan.name, plan.inrPrice)}
                >
                  Pay ₹{plan.inrPrice.toLocaleString("en-IN")} with Razorpay
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Secured by Razorpay
                </p>
              </motion.div>
            ))}
          </div>

          {/* Security badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-8"
          >
            {[
              {
                icon: <Lock className="w-3.5 h-3.5" />,
                label: "Bank-grade security",
              },
              {
                icon: <ShieldCheck className="w-3.5 h-3.5" />,
                label: "256-bit SSL",
              },
              {
                icon: <Check className="w-3.5 h-3.5" />,
                label: "Instant confirmation",
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span className="text-teal">{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </motion.div>

          {/* Security note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-center text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Secure 256-bit SSL encryption. Payments processed by Razorpay
            Payment Gateway. DermInsight does not store card details.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  // Backend plans are used if available; we always render INR_PLAN_DATA for display
  const { isLoading } = useServicePlans();

  // We use FALLBACK_PLANS only to keep the backend hook call meaningful
  void FALLBACK_PLANS;

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
              Services & Pricing
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Choose the level of guidance
              <br />
              that fits your needs
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Start free or choose a plan — all in INR, no subscriptions
              required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid — 4 cards */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <PlanCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {INR_PLAN_DATA.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isMostPopular={i === 2}
                index={i}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-10 p-5 bg-secondary/40 border border-border rounded-xl"
        >
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            <strong className="text-foreground/80 font-medium">
              Not sure which to choose?
            </strong>{" "}
            Start with the free mini audit. There is no obligation to upgrade,
            and upgrades can be requested at any time.
          </p>
        </motion.div>
      </section>

      {/* What's Included / Not Included */}
      <section className="section-divider bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-xl font-bold tracking-tight mb-4">
                What's included
              </h2>
              <ul className="space-y-2.5">
                {[
                  "Evidence-informed routine guidance",
                  "Product category & ingredient recommendations",
                  "Skin concern educational context",
                  "Long-term skin health framework",
                  "Written, structured report delivered by email",
                  "Optional follow-up Q&A (paid plans)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-xl font-bold tracking-tight mb-4">
                What this is not
              </h2>
              <ul className="space-y-2.5">
                {[
                  "Medical advice or diagnosis of any kind",
                  "Prescription medication or treatment",
                  "A substitute for a licensed dermatologist",
                  "Specific product or brand endorsements",
                  "Ongoing subscription or monitoring",
                  "Emergency skincare consultation",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="w-4 h-4 rounded-sm border border-muted-foreground/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-2 h-px bg-muted-foreground/50 block" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Razorpay Payment Section */}
      <RazorpayPaymentSection />
    </>
  );
}
