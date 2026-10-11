# Launching the SY Consulting website

The site is live for free at **https://sai-code-glitch.github.io/sy-consulting/**, hosted by GitHub Pages from the `gh-pages` branch of https://github.com/Sai-code-glitch/sy-consulting. There's no server or database to manage, and nothing to pay.

## 1. Your details (done)

`js/config.js` already has your phone and WhatsApp (+1 989 933 2400), your email (syalamn7@gmail.com) and Auburn Hills, Michigan. To change anything later, edit that file. Anything left empty is hidden on the site.

Still to fill in: the `price` of "Single service" and "Full journey" (they show "Price on request" until then), and `paymentUrl` (step 4).

## 2. Enquiries to your Gmail (one click needed)

The form already sends every enquiry to syalamn7@gmail.com through FormSubmit, which needs no account.

1. Once the site is online, send one test enquiry yourself.
2. FormSubmit emails you an **"Activate form"** message (check Spam too). Click **Activate**. Enquiries are only delivered after this one-time step.
3. Optional: the activation email also gives you a random alias string. Put `https://formsubmit.co/ajax/<that string>` in `formEndpoint` so your email address isn't visible in the site's code.

Until it's activated, or if sending fails, the form offers the student a "Send on WhatsApp" button instead, so you never lose a lead.

## 3. Call booking calendar (done)

The booking calendar is built into the site, with no Calendly account needed. Students pick a day and time, and the slot arrives in the enquiry email. Times are shown in Eastern Time, plus the student's own local time. The student also gets an "Add to Google Calendar" button.

- Your booking link is https://sai-code-glitch.github.io/sy-consulting/#book. Share it on WhatsApp, Instagram and email.
- To change your available days or hours, edit `calendar` in `js/config.js`. Each enquiry is a request, so reply on WhatsApp or email to confirm the slot. Two students can pick the same time; if that happens, offer the second one another slot.

If you'd rather have automatic double-booking protection later, create a free Calendly event and paste its link into `bookingUrl`.

## 4. Take payments: Stripe Payment Links (about 10 minutes)

A payment link has to be created in your own name, because the money goes to your bank account.

1. Sign up at https://dashboard.stripe.com/register. You need your SSN or EIN and a US bank account.
2. Go to **Product catalog → Add product**, e.g. "Full journey package", and set the price in USD.
3. Open the product and choose **Create payment link**. Copy the link, which looks like `https://buy.stripe.com/...`.
4. Paste it into `paymentUrl` in `js/config.js`, and set that package's `price`, e.g. `"$1,200"`.

Students in India can pay with international cards through Stripe. If you have an Indian business entity, a Razorpay Payment Link works the same way and accepts UPI.

Simpler option: a PayPal.me link (`https://paypal.me/yourname`) also works as `paymentUrl`.

## 5. Updating the site

The live site is served from the **`gh-pages`** branch. To change something, such as prices or the payment link:

1. Open https://github.com/Sai-code-glitch/sy-consulting, switch the branch selector to `gh-pages`, and open the file (for example `js/config.js`).
2. Click the pencil icon, make the change, and press **Commit changes**.
3. The live site updates within a minute or two.

## 6. Optional later: your own domain

When you want an address like `syconsulting.com` (about $10 to $20 a year from Namecheap, Cloudflare or GoDaddy):

1. In the repository, go to **Settings → Pages → Custom domain**, enter the domain and save.
2. At your domain provider, add a `CNAME` record for `www` pointing to `sai-code-glitch.github.io`, and the four GitHub `A` records for the bare domain listed on GitHub's "Managing a custom domain" help page.
3. Tick **Enforce HTTPS** once it becomes available, then replace the github.io address in `robots.txt`, `sitemap.xml` and `index.html` with your domain.

## 7. After launch

- Create a **Google Business Profile** so you show up in local searches and on Maps.
- Add the site to **Google Search Console** and submit `sitemap.xml`.
- Put the website link in your Instagram and WhatsApp Business profiles.

## Before you take paying clients

- Register the business, for example as a Michigan LLC, and get an EIN. Stripe, universities and lenders will ask for these.
- To be listed as a recognised agent by UK, Australian or Canadian universities, apply to their agent programmes. The British Council's agent training course is a good start for the UK.
- Visa amounts and rules change often. Check the official government source each time you build a student's file.
