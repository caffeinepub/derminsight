# DermInsight

## Current State
- ServicesPage.tsx has 3 backend-driven plan cards (Free Mini Audit, Standard ~$49, Premium ~$99) with USD pricing
- A separate Razorpay section below shows 2 hardcoded INR plans (₹3,999 / ₹7,999) with a `window.alert("coming soon")` placeholder — no real SDK integration
- No Razorpay SDK is loaded

## Requested Changes (Diff)

### Add
- Real Razorpay SDK checkout modal (load script dynamically, open checkout on button click)
- 4-plan pricing structure in INR only:
  1. Free Mini Skin Audit — ₹0
  2. Standard Consultation — ₹499
  3. Enhanced Plan — ₹1,499
  4. Premium Coaching — ₹3,999/month

### Modify
- Replace FALLBACK_PLANS with the 4 new plans (INR pricing, correct features per plan)
- Remove the USD pricing display entirely; show INR prices as primary
- Update Razorpay section to use the 3 paid plans (₹499, ₹1,499, ₹3,999) with real checkout
- "Pay Now" buttons trigger actual Razorpay checkout modal with correct amount
- Plan grid: 4 columns (or 2×2 on smaller screens), highlight "Enhanced Plan" as most popular

### Remove
- USD price display from plan cards
- `INR_PRICES` lookup map (replace with inline INR prices on each plan)
- Old 2-plan Razorpay section hardcoded to ₹3,999 / ₹7,999
- `window.alert("coming soon")` placeholder

## Implementation Plan
1. Update FALLBACK_PLANS array with 4 new plans, INR prices, correct features
2. Rewrite PlanCard to show INR price (or "Free") — no USD
3. Update grid to 4 columns (2×2 on md, 4 on xl)
4. Mark "Enhanced Plan" (index 2) as most popular
5. Add `loadRazorpay()` utility that injects the Razorpay script dynamically
6. Add `openRazorpay(planId, amountPaise, planName)` handler
7. Rewrite RAZORPAY_PLANS to match the 3 paid plans with correct INR amounts
8. Wire "Pay Now" buttons to real Razorpay checkout (test key visible, production key via env var)
9. Show a modal/toast explaining the user needs to provide their Razorpay key if not configured
