import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Shield,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitIntake } from "../hooks/useQueries";

const TOTAL_STEPS = 9;

interface FormState {
  name: string;
  email: string;
  skinConcerns: string[];
  skinConcernNotes: string;
  occupation: string;
  livingArea: string;
  climateType: string;
  activityLevel: string;
  dietQuality: string;
  sleepHours: string;
  waterIntake: string;
  skinType: string;
  currentRoutine: string;
  goals: string;
  photo: File | null;
  consentGiven: boolean;
}

const initialForm: FormState = {
  name: "",
  email: "",
  skinConcerns: [],
  skinConcernNotes: "",
  occupation: "",
  livingArea: "",
  climateType: "",
  activityLevel: "",
  dietQuality: "",
  sleepHours: "",
  waterIntake: "",
  skinType: "",
  currentRoutine: "",
  goals: "",
  photo: null,
  consentGiven: false,
};

const skinConcernOptions = [
  { value: "Acne & Breakouts", label: "Acne & Breakouts" },
  { value: "Oiliness & Shine", label: "Oiliness & Shine" },
  { value: "Dryness & Dehydration", label: "Dryness & Dehydration" },
  { value: "Texture & Enlarged Pores", label: "Texture & Enlarged Pores" },
  {
    value: "Pigmentation & Uneven Tone",
    label: "Pigmentation & Uneven Tone",
  },
  { value: "Redness & Sensitivity", label: "Redness & Sensitivity" },
  { value: "Fine Lines & Aging", label: "Fine Lines & Aging" },
];

const skinTypeOptions = [
  { value: "Oily", label: "Oily" },
  { value: "Dry", label: "Dry" },
  { value: "Combination", label: "Combination" },
  { value: "Normal", label: "Normal" },
  { value: "Sensitive", label: "Sensitive" },
  { value: "Not sure", label: "I'm not sure" },
];

function ProgressBar({ step }: { step: number }) {
  const percentage = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2.5">
        <span>
          Step {step} of {TOTAL_STEPS}
        </span>
        <span>{Math.round(percentage)}% complete</span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full progress-fill rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function StepWrapper({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -30 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SelectCard({
  label,
  selected,
  onClick,
}: {
  value: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-lg border text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
        selected
          ? "border-teal bg-teal-light/50 text-foreground"
          : "border-border bg-card text-muted-foreground hover:border-teal/50 hover:text-foreground"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        {selected && <Check className="w-4 h-4 text-teal flex-shrink-0 ml-2" />}
      </div>
    </button>
  );
}

interface SuccessScreenProps {
  intakeId: string;
  name: string;
}

function SuccessScreen({ intakeId, name }: SuccessScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8"
    >
      <div className="w-16 h-16 rounded-full bg-teal-light flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8 text-teal" />
      </div>
      <h2 className="font-display text-2xl font-bold tracking-tight mb-3">
        Your consultation has been submitted
      </h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto leading-relaxed">
        Thank you, {name}. Your intake has been received and will be reviewed
        within 2–3 business days. You'll receive your report by email.
      </p>

      <div className="bg-card border border-border rounded-xl p-5 max-w-sm mx-auto mb-6 text-left">
        <p className="text-xs text-muted-foreground font-medium mb-1">
          Intake reference
        </p>
        <p className="font-mono text-sm text-foreground font-semibold break-all">
          {intakeId}
        </p>
      </div>

      <div className="space-y-2 max-w-sm mx-auto mb-8">
        {[
          "Check your email for a confirmation",
          "Review begins within 2–3 business days",
          "Your report will be delivered by email",
          "Use your reference ID if you need to contact us",
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-left">
            <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>

      <div className="disclaimer-bar px-4 py-3 rounded-sm max-w-sm mx-auto text-left">
        <p className="text-xs text-foreground/70 leading-relaxed">
          This is an educational consultation. If you have any urgent skin
          concerns or medical questions, please consult a licensed
          dermatologist.
        </p>
      </div>
    </motion.div>
  );
}

function LifestyleFieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export default function StartAnalysisPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: submitIntake, isPending } = useSubmitIntake();

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const canAdvance = useCallback((): boolean => {
    switch (step) {
      case 1:
        return (
          form.name.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        );
      case 2:
        return form.skinConcerns.length > 0;
      case 3:
        return (
          form.occupation.trim().length > 0 &&
          form.livingArea.length > 0 &&
          form.climateType.length > 0 &&
          form.activityLevel.length > 0 &&
          form.dietQuality.length > 0 &&
          form.sleepHours.length > 0 &&
          form.waterIntake.length > 0
        );
      case 4:
        return form.skinType.length > 0;
      case 5:
        return form.currentRoutine.trim().length > 10;
      case 6:
        return form.goals.trim().length > 10;
      case 7:
        return true; // optional photo step
      case 8:
        return true; // optional (also skip-able, but we handle final consent in step 9)
      case 9:
        return form.consentGiven;
      default:
        return false;
    }
  }, [step, form]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((f) => ({ ...f, photo: file }));
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setForm((f) => ({ ...f, photo: null }));
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleSkinConcern = (value: string) => {
    setForm((f) => ({
      ...f,
      skinConcerns: f.skinConcerns.includes(value)
        ? f.skinConcerns.filter((c) => c !== value)
        : [...f.skinConcerns, value],
    }));
  };

  const handleSubmit = () => {
    submitIntake(
      {
        name: form.name,
        email: form.email,
        skinConcerns: form.skinConcerns,
        skinType: form.skinType,
        currentRoutine: form.currentRoutine,
        goals: form.goals,
        photos: form.photo ? [form.photo] : [],
        consentGiven: form.consentGiven,
      },
      {
        onSuccess: (id) => {
          setSubmittedId(id);
        },
        onError: (err) => {
          toast.error("Submission failed. Please try again.", {
            description: err.message,
          });
        },
      },
    );
  };

  if (submittedId) {
    return (
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-16">
        <SuccessScreen intakeId={submittedId} name={form.name} />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 sm:px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-4 h-4 text-teal" />
          <span className="text-xs font-medium text-teal">
            Private & Confidential
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Skin Analysis Intake
        </h1>
      </motion.div>

      <div className="bg-card border border-border rounded-2xl p-7 md:p-10 shadow-sm">
        <ProgressBar step={step} />

        <AnimatePresence mode="wait" initial={false}>
          <StepWrapper key={step} direction={direction}>
            {/* Step 1: Welcome */}
            {step === 1 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    Let's get started.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This consultation is private, calm, and judgment-free. We'll
                    use this information only for your consultation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Your name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="First name is fine"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      autoComplete="given-name"
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="where we'll send your report"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      autoComplete="email"
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Your email is used only to deliver your consultation
                      report.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Skin concerns (multi-select) */}
            {step === 2 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    What are your skin concerns?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Select all that apply.
                  </p>
                </div>
                <div className="space-y-2">
                  {skinConcernOptions.map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.skinConcerns.includes(opt.value)}
                      onClick={() => toggleSkinConcern(opt.value)}
                    />
                  ))}
                </div>
                <div className="mt-5">
                  <Label
                    htmlFor="skinConcernNotes"
                    className="text-sm font-medium mb-1.5 block"
                  >
                    Anything else you'd like to add?{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="skinConcernNotes"
                    placeholder="Describe any other concerns or context about your skin..."
                    value={form.skinConcernNotes}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        skinConcernNotes: e.target.value,
                      }))
                    }
                    rows={3}
                    className="resize-none text-sm leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Lifestyle */}
            {step === 3 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    Tell us about your lifestyle.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This helps us give more contextual guidance.
                  </p>
                </div>

                {/* Occupation */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    Occupation
                  </p>
                  <Label
                    htmlFor="occupation"
                    className="text-sm font-medium mb-1.5 block sr-only"
                  >
                    What do you do for work?
                  </Label>
                  <Input
                    id="occupation"
                    type="text"
                    placeholder="e.g. nurse, desk job, student"
                    value={form.occupation}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, occupation: e.target.value }))
                    }
                    className="h-11"
                  />
                </div>

                <LifestyleFieldGroup label="Area of Living">
                  {[
                    { value: "Urban / City", label: "Urban / City" },
                    { value: "Suburban", label: "Suburban" },
                    { value: "Rural", label: "Rural" },
                  ].map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.livingArea === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, livingArea: opt.value }))
                      }
                    />
                  ))}
                </LifestyleFieldGroup>

                <LifestyleFieldGroup label="Climate Type">
                  {[
                    { value: "Hot & Humid", label: "Hot & Humid" },
                    { value: "Hot & Dry", label: "Hot & Dry" },
                    { value: "Temperate", label: "Temperate" },
                    { value: "Cold & Dry", label: "Cold & Dry" },
                    { value: "Cold & Humid", label: "Cold & Humid" },
                  ].map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.climateType === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, climateType: opt.value }))
                      }
                    />
                  ))}
                </LifestyleFieldGroup>

                <LifestyleFieldGroup label="Activity Level">
                  {[
                    { value: "Sedentary", label: "Sedentary" },
                    { value: "Lightly Active", label: "Lightly Active" },
                    {
                      value: "Moderately Active",
                      label: "Moderately Active",
                    },
                    { value: "Very Active", label: "Very Active" },
                  ].map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.activityLevel === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, activityLevel: opt.value }))
                      }
                    />
                  ))}
                </LifestyleFieldGroup>

                <LifestyleFieldGroup label="Diet Quality">
                  {[
                    {
                      value: "Balanced & Varied",
                      label: "Balanced & Varied",
                    },
                    {
                      value: "Mostly Processed",
                      label: "Mostly Processed",
                    },
                    {
                      value: "Mostly Whole Foods",
                      label: "Mostly Whole Foods",
                    },
                    { value: "Other", label: "Other" },
                  ].map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.dietQuality === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, dietQuality: opt.value }))
                      }
                    />
                  ))}
                </LifestyleFieldGroup>

                <LifestyleFieldGroup label="Sleep">
                  {[
                    { value: "Under 5 hrs", label: "Under 5 hrs" },
                    { value: "5–7 hrs", label: "5–7 hrs" },
                    { value: "7–9 hrs", label: "7–9 hrs" },
                    { value: "9+ hrs", label: "9+ hrs" },
                  ].map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.sleepHours === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, sleepHours: opt.value }))
                      }
                    />
                  ))}
                </LifestyleFieldGroup>

                <LifestyleFieldGroup label="Daily Water Intake">
                  {[
                    {
                      value: "Less than 1L/day",
                      label: "Less than 1L/day",
                    },
                    { value: "1–2L/day", label: "1–2L/day" },
                    { value: "2L+/day", label: "2L+/day" },
                  ].map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.waterIntake === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, waterIntake: opt.value }))
                      }
                    />
                  ))}
                </LifestyleFieldGroup>
              </div>
            )}

            {/* Step 4: Skin type */}
            {step === 4 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    How would you describe your skin?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your best understanding is enough — we'll help refine this
                    in your report.
                  </p>
                </div>
                <div className="space-y-2">
                  {skinTypeOptions.map((opt) => (
                    <SelectCard
                      key={opt.value}
                      value={opt.value}
                      label={opt.label}
                      selected={form.skinType === opt.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, skinType: opt.value }))
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Current routine */}
            {step === 5 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    Describe your current skincare routine.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Include your morning and evening steps, and any products or
                    ingredients you're using. If you have no routine, that's
                    fine too.
                  </p>
                </div>
                <Textarea
                  placeholder="Morning: cleanser, moisturizer, SPF 50. Evening: oil cleanser, gentle toner, retinol serum, moisturizer..."
                  value={form.currentRoutine}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currentRoutine: e.target.value }))
                  }
                  rows={7}
                  className="resize-none text-sm leading-relaxed"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Be as specific or general as you like. Product names,
                  ingredients, and frequency all help.
                </p>
              </div>
            )}

            {/* Step 6: Goals */}
            {step === 6 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    What would you like to achieve?
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Describe your short-term and long-term skincare goals. Be
                    honest — there are no wrong answers.
                  </p>
                </div>
                <Textarea
                  placeholder="Short-term: reduce the frequency of breakouts and calm redness. Long-term: build a sustainable routine that keeps my skin clear and even-toned..."
                  value={form.goals}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, goals: e.target.value }))
                  }
                  rows={7}
                  className="resize-none text-sm leading-relaxed"
                />
              </div>
            )}

            {/* Step 7: Photos (optional) */}
            {step === 7 && (
              <div>
                <div className="mb-7">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Optional
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    Upload a front-facing photo.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is optional and helps us give more tailored guidance.
                    In natural lighting, neutral expression. Accepted formats:
                    JPEG, PNG, WebP.
                  </p>
                </div>

                {!photoPreview ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      id="photo-upload"
                      className="sr-only"
                      onChange={handlePhotoChange}
                      aria-label="Upload a face photo"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-xl p-10 cursor-pointer hover:border-teal/50 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center">
                        <Upload className="w-5 h-5 text-teal" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">
                          Click to upload a photo
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          JPEG, PNG or WebP
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Uploaded preview"
                      className="w-full max-h-72 object-cover rounded-xl border border-border"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors shadow-sm"
                      aria-label="Remove photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-teal" />
                      Photo uploaded — you can remove it above if needed
                    </p>
                  </div>
                )}

                <div className="disclaimer-bar px-3 py-2.5 rounded-sm mt-5">
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    <strong className="font-medium">Privacy: </strong>
                    Photos are stored securely and used only for your
                    consultation. They are not shared or used for any other
                    purpose. You can request deletion at any time.
                  </p>
                </div>
              </div>
            )}

            {/* Step 8: Review placeholder / extra notes (optional buffer step) */}
            {step === 8 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    Almost there.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Take a moment to review what you've shared. On the next step
                    you'll confirm your consent and submit.
                  </p>
                </div>
                <div className="bg-secondary/30 border border-border rounded-xl p-5 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Your responses
                  </h4>
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    {
                      label: "Skin concerns",
                      value: form.skinConcerns.join(", ") || "—",
                    },
                    {
                      label: "Occupation",
                      value: form.occupation || "—",
                    },
                    {
                      label: "Location",
                      value: form.livingArea || "—",
                    },
                    {
                      label: "Climate",
                      value: form.climateType || "—",
                    },
                    {
                      label: "Skin type",
                      value: form.skinType || "—",
                    },
                    {
                      label: "Photo",
                      value: form.photo ? form.photo.name : "Not provided",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-muted-foreground w-32 flex-shrink-0">
                        {row.label}
                      </span>
                      <span className="font-medium text-foreground/90 break-all">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Consent & Submit */}
            {step === 9 && (
              <div>
                <div className="mb-7">
                  <h2 className="font-display text-xl font-bold tracking-tight mb-2">
                    Review & start your consultation.
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Please review your submission summary and confirm your
                    consent to continue.
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-secondary/30 border border-border rounded-xl p-5 mb-6 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    Submission summary
                  </h4>
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    {
                      label: "Concerns",
                      value: form.skinConcerns.join(", ") || "—",
                    },
                    {
                      label: "Lifestyle",
                      value: form.occupation || "—",
                    },
                    {
                      label: "Skin type",
                      value: form.skinType || "—",
                    },
                    {
                      label: "Photo",
                      value: form.photo ? form.photo.name : "Not provided",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-muted-foreground w-32 flex-shrink-0">
                        {row.label}
                      </span>
                      <span className="font-medium text-foreground/90 break-all">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Consent */}
                <div className="bg-card border border-border rounded-xl p-5 mb-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={form.consentGiven}
                      onCheckedChange={(checked) =>
                        setForm((f) => ({
                          ...f,
                          consentGiven: checked === true,
                        }))
                      }
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="consent"
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I understand that DermInsight is an{" "}
                      <strong className="font-semibold">
                        educational service
                      </strong>{" "}
                      and not a substitute for medical advice, diagnosis, or
                      treatment. I agree to the{" "}
                      <a
                        href="/legal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal underline underline-offset-2"
                      >
                        Terms and Privacy Policy
                      </a>
                      .
                    </Label>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    Your data is protected per our{" "}
                    <a
                      href="/legal#privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      privacy policy
                    </a>
                    .
                  </span>
                </div>
              </div>
            )}
          </StepWrapper>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={step === 1}
            className="font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          {step < TOTAL_STEPS ? (
            <Button
              onClick={goNext}
              disabled={!canAdvance()}
              className="bg-teal hover:bg-teal-dark text-white font-medium"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canAdvance() || isPending}
              className="bg-teal hover:bg-teal-dark text-white font-medium px-6"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Start Your Consultation
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Bottom note */}
      <p className="text-xs text-muted-foreground text-center mt-5">
        All information is confidential and used only for your consultation. Not
        a medical service.
      </p>
    </div>
  );
}
