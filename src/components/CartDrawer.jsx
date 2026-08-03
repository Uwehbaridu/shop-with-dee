import { useState } from "react";
import { useCart } from "../cart";
import CheckoutForm from "./CheckoutForm";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen && !showCheckout) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex justify-end"
          role="presentation"
        >
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <div
            className="relative w-full max-w-md bg-cream h-full shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
              <h2 id="cart-title" className="font-display text-xl text-ink">
                Your cart
                {totalItems > 0 && (
                  <span className="ml-2 text-sm font-sans text-ink/50">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center"
              >
                &#10005;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-ink/50 text-sm">Your cart is empty.</p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-4 text-sm text-gold hover:text-espresso-dark font-medium"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex gap-3 bg-white rounded-xl p-3 border border-ink/5"
                    >
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-ink/5 shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="font-display text-sm text-ink leading-snug truncate">
                          {item.name}
                        </p>
                        {item.designName && (
                          <p className="text-xs text-ink/50 mt-0.5 truncate">
                            {item.designName}
                          </p>
                        )}
                        <p className="text-xs text-ink/50">Size {item.size}</p>
                        <p className="text-gold font-semibold text-sm mt-1">
                          &#8358;{(item.price * item.quantity).toLocaleString()}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.key, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="w-7 h-7 rounded-full border border-ink/15 text-ink text-sm flex items-center justify-center hover:border-ink/30"
                            >
                              &#8722;
                            </button>
                            <span className="w-5 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.key, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="w-7 h-7 rounded-full border border-ink/15 text-ink text-sm flex items-center justify-center hover:border-ink/30"
                            >
                              &#43;
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="text-xs text-ink/40 hover:text-berry"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-ink/60 text-sm">Total</span>
                  <span className="font-display text-xl text-ink">
                    &#8358;{totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckout(true);
                    closeCart();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold text-espresso-dark py-3.5 font-medium hover:bg-gold-light transition-colors"
                >
                  Proceed to order
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-center text-xs text-ink/40 hover:text-ink/60 py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <CheckoutForm onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}
