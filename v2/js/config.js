// ============================================================
//  SY Consulting: site settings
//  Fill these in before going live. This is the only file you
//  need to edit for contact details, prices and the form.
//  Anything left as "" is hidden on the site automatically.
// ============================================================
window.SY_CONFIG = {
  // Phone shown on the site, written the way people should read it.
  phoneDisplay: "+1 (989) 933-2400",

  // WhatsApp number: country code + number, digits only, no + or spaces.
  whatsapp: "19899332400",

  // Email students can write to.
  email: "syalamn7@gmail.com",

  // Office address or city (optional).
  address: "Auburn Hills, Michigan, USA",

  // Where form enquiries are sent. FormSubmit emails each enquiry to
  // this address with no account needed. The FIRST enquiry triggers a
  // one-time "Activate form" email to this inbox: click it once.
  // You can also swap in a Formspree endpoint here.
  // If empty, the form sends the enquiry to WhatsApp instead.
  formEndpoint: "https://formsubmit.co/ajax/syalamn7@gmail.com",

  // Built-in call calendar. Students pick a slot on the site and you get
  // it in the enquiry email. Times are in your time zone; students also
  // see them in their own local time.
  calendar: {
    timeZone: "America/Detroit",   // Michigan (Eastern Time)
    zoneLabel: "ET",
    days: [1, 2, 3, 4, 5, 6],      // 0 = Sunday … 6 = Saturday
    hours: [8, 9, 10, 11, 12, 19, 20, 21], // 24-hour clock, your time. Mornings ET suit students in India (evening IST).
    daysAhead: 14,
    minHoursNotice: 12
  },

  // Online booking page for the free call (Calendly, Cal.com, Zoho
  // Bookings...). If empty, the "Pick a time" button is hidden.
  bookingUrl: "",              // e.g. "https://calendly.com/sy-consulting/free-call"

  // Payment link for paid packages (Stripe Payment Link, PayPal,
  // Razorpay...). See LAUNCH.md. If empty, packages say "Enquire".
  paymentUrl: "",              // e.g. "https://buy.stripe.com/abc123"

  // Social profiles (optional).
  instagram: "",               // e.g. "https://instagram.com/syconsulting"
  linkedin: "",

  // Package prices. Leave a price as "" to show "Price on request".
  packages: [
    { name: "Free consultation", price: "Free", note: "30-minute call",
      items: ["Profile review", "Country and university shortlist", "Timeline and cost estimate"] },
    { name: "Single service", price: "", note: "per service",
      items: ["Pick any one stage: SOP, visa, loans, accommodation…", "Dedicated advisor for that stage", "Document review before submission"] },
    { name: "Full journey", price: "", note: "shortlist to landing", featured: true,
      items: ["Everything from shortlist to arrival", "Up to 6 university applications", "Visa file and mock interviews", "Loan, forex, flights and housing help", "WhatsApp support through your first month"] }
  ]
};
