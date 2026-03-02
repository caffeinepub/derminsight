import { motion } from "motion/react";

const sections = [
  {
    id: "disclaimer",
    title: "Non-Medical Service Disclaimer",
    content: [
      {
        heading: "Educational purpose only",
        body: "DermInsight provides educational skincare consulting services only. We are not a medical service, a dermatology clinic, or a healthcare provider. Nothing on this website or in any consultation, report, or communication from DermInsight constitutes medical advice, medical diagnosis, or medical treatment of any kind.",
      },
      {
        heading: "No doctor-patient relationship",
        body: "Use of DermInsight services does not create a doctor-patient relationship or any other healthcare provider relationship. Our consultants are not licensed medical professionals, dermatologists, or healthcare practitioners.",
      },
      {
        heading: "Consult a licensed professional",
        body: "If you have any concerns about your skin that may have a medical component — including but not limited to inflammatory conditions, potential infections, suspected skin diseases, or conditions requiring prescription treatment — you must consult a licensed dermatologist or qualified healthcare professional. Do not delay seeking professional medical advice because of information received from DermInsight.",
      },
      {
        heading: "No guarantee of outcomes",
        body: "Skincare results vary significantly between individuals due to genetics, hormones, environment, and other factors outside our control. We cannot guarantee that following our recommendations will produce any specific result. Our guidance is educational and based on general skincare science principles.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content: [
      {
        heading: "What data we collect",
        body: "We collect the information you provide in the intake form: your name, email address, skin type, skin concerns, current routine, goals, and any photos you choose to upload. We do not collect payment card information directly — payments are processed by our payment provider.",
      },
      {
        heading: "How we use your data",
        body: "Your data is used exclusively to provide the skincare consultation service you have requested. We use your name and email to deliver your consultation report. We use your intake responses and photos to conduct the consultation review and produce your written report.",
      },
      {
        heading: "Data storage and security",
        body: "Your data is stored on encrypted, secure infrastructure. Photos are stored in a secure blob storage system. We implement industry-standard security practices to protect your information from unauthorized access.",
      },
      {
        heading: "We do not sell or share your data",
        body: "We do not sell, rent, lease, or share your personal data with third parties for any commercial purpose. We do not use your data for advertising, marketing, or any purpose other than your consultation. We do not share your data with skincare brands, manufacturers, or any commercial entity.",
      },
      {
        heading: "Data retention and deletion",
        body: "We retain your data for up to 12 months after your consultation to allow for any follow-up questions or support. You may request deletion of your data at any time by contacting us. Upon request, we will permanently delete your intake data, photos, and consultation records.",
      },
      {
        heading: "Cookies",
        body: "This website uses minimal functional cookies required for the application to operate. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.",
      },
    ],
  },
  {
    id: "consent",
    title: "Consent Terms",
    content: [
      {
        heading: "Informed consent",
        body: "By submitting the intake form, you confirm that you have read and understood that DermInsight provides educational information only and is not a substitute for professional medical advice. You consent to the collection and use of your data as described in this privacy policy.",
      },
      {
        heading: "Photo consent",
        body: "If you choose to upload photos, you consent to those photos being securely stored and reviewed solely for the purpose of your consultation. Photos are not used for any marketing, promotional, training, or commercial purpose. They will not be shared with any third party.",
      },
      {
        heading: "Age requirement",
        body: "You must be 18 years of age or older to use DermInsight services. By submitting an intake form, you confirm that you meet this age requirement.",
      },
      {
        heading: "Accuracy of information",
        body: "You agree that the information you provide in your intake is accurate and truthful to the best of your knowledge. The quality of your consultation is directly tied to the accuracy of the information provided.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      {
        heading: "Questions and data requests",
        body: "For questions about this policy, your data, or any data deletion requests, please contact us at: privacy@derminsight.example.com. We aim to respond to all inquiries within 5 business days.",
      },
      {
        heading: "Consultation support",
        body: "For questions about your consultation, report, or intake submission, please include your intake reference ID in any correspondence to help us locate your record quickly.",
      },
    ],
  },
];

export default function LegalPage() {
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
              Legal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Legal & Disclaimers
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 py-16">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-5 mb-12"
          aria-label="Legal sections"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            In this document
          </p>
          <ul className="space-y-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section, si) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.05, duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold tracking-tight mb-7 pb-4 border-b border-border">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.content.map((item) => (
                  <div key={item.heading}>
                    <h3 className="font-semibold text-base mb-2">
                      {item.heading}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Key disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 disclaimer-bar px-5 py-5 rounded-sm"
        >
          <p className="text-sm font-semibold text-foreground/80 mb-2">
            Summary Disclaimer
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            DermInsight is an educational skincare consulting service. We do not
            provide medical advice, diagnosis, or treatment. We are not a
            dermatology service. Nothing on this website or in any report,
            email, or communication from DermInsight constitutes medical advice
            or replaces the advice of a licensed healthcare professional.
          </p>
        </motion.div>
      </section>
    </>
  );
}
