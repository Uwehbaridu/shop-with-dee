import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { buildCartWhatsAppLink, siteConfig } from "../config";

const STORAGE_KEY = "swd_last_order";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = useMemo(() => {
    if (location.state?.order) return location.state.order;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-5 py-24">
          <div className="text-center max-w-md">
            <h1 className="font-display text-2xl text-ink">No order to show</h1>
            <p className="text-ink/55 mt-3 text-sm">
              Place an order from the cart to see your confirmation here.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-full bg-espresso text-cream px-6 py-3 text-sm font-medium hover:bg-espresso-dark"
            >
              Continue shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    orderId,
    customer,
    items = [],
    totalPrice = 0,
    placedAt,
    whatsappUrl,
  } = order;

  const firstName = (customer?.customerName || "there").split(" ")[0];
  const timeLabel = placedAt
    ? new Date(placedAt).toLocaleString("en-NG", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const addressLines = [
    customer?.address,
    [customer?.city, customer?.state].filter(Boolean).join(", "),
    "Nigeria",
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F4F1EC] flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8">
            {/* Left column */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xl">
                    ✓
                  </span>
                  <div>
                    <p className="text-xs text-ink/45 tracking-wide">
                      Confirmation #{orderId}
                    </p>
                    <h1 className="font-display text-2xl sm:text-3xl text-ink mt-1">
                      Thank you, {firstName}!
                    </h1>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-ink mb-3">Order status</h2>
                <p className="text-sm text-ink/60 mb-4">
                  Your current order status is:{" "}
                  <span className="font-semibold text-ink">Confirmed</span>
                </p>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-espresso text-cream text-xs">
                    ✓
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Confirmed</p>
                    <p className="text-sm text-ink/55">We've received your order.</p>
                    {timeLabel && (
                      <p className="text-xs text-ink/40 mt-1">{timeLabel}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-ink mb-1">
                  Your order is confirmed
                </h2>
                <p className="text-sm text-ink/55">
                  You'll receive a confirmation email soon. We'll also follow up
                  on WhatsApp about delivery.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-ink mb-5">Order details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-ink/40 text-xs uppercase tracking-wide mb-1.5">
                      Contact information
                    </p>
                    <p className="text-ink break-all">{customer?.email}</p>
                    <p className="text-ink mt-1">{customer?.phone}</p>
                    {customer?.isWhatsApp && (
                      <p className="text-ink/45 text-xs mt-1">WhatsApp number</p>
                    )}
                  </div>
                  <div>
                    <p className="text-ink/40 text-xs uppercase tracking-wide mb-1.5">
                      Payment
                    </p>
                    <p className="text-ink">
                      Pre-order · pay on delivery arrangement via WhatsApp
                    </p>
                    <p className="text-ink/55 text-xs mt-1">
                      Delivery fee paid by you
                    </p>
                  </div>
                  <div>
                    <p className="text-ink/40 text-xs uppercase tracking-wide mb-1.5">
                      Shipping address
                    </p>
                    <p className="text-ink font-medium">{customer?.customerName}</p>
                    {addressLines.map((line) => (
                      <p key={line} className="text-ink/70">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-ink/40 text-xs uppercase tracking-wide mb-1.5">
                      Shipping method
                    </p>
                    <p className="text-ink">Standard delivery</p>
                    <p className="text-ink/55 text-xs mt-1">
                      Cost confirmed on WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center rounded-full bg-gold text-espresso-dark px-6 py-3 text-sm font-medium hover:bg-gold-light"
                  >
                    Message us on WhatsApp
                  </a>
                )}
                <Link
                  to="/"
                  className="inline-flex justify-center rounded-full bg-espresso text-cream px-6 py-3 text-sm font-medium hover:bg-espresso-dark"
                >
                  Continue shopping
                </Link>
              </div>

              <p className="text-xs text-ink/40">
                Need help?{" "}
                <a
                  href={buildCartWhatsAppLink([])}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline"
                >
                  Contact us on WhatsApp
                </a>
                {" "}· {siteConfig.location}
              </p>
            </div>

            {/* Right column — summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-ink mb-4">
                  Order summary
                </h2>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg bg-cream border border-ink/5 overflow-hidden shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-ink/5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">
                          {item.name}
                        </p>
                        {item.designName && (
                          <p className="text-xs text-ink/45 truncate">
                            {item.designName}
                          </p>
                        )}
                        <p className="text-xs text-ink/45">
                          Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm text-ink shrink-0">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-ink/10 space-y-2 text-sm">
                  <div className="flex justify-between text-ink/60">
                    <span>Subtotal</span>
                    <span>₦{Number(totalPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-ink/60">
                    <span>Delivery</span>
                    <span className="text-ink/45">To be confirmed</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-semibold text-ink">
                    <span>Total</span>
                    <span className="text-gold">
                      ₦{Number(totalPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/** Call after a successful checkout to persist order for the confirmation page */
export function saveLastOrder(order) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    /* ignore quota errors */
  }
}
