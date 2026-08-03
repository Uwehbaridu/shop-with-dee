// Product catalogue for Shop with Dee.
// Each product = one folder under src/assets/products/.
// Each design = one image inside that folder (named by colour / description).

// ── Asymmetric Striped Lapel Midi Dress ───────────────────────────────────
import asymmetricDeepPlum from "../assets/products/Asymmetric Striped Lapel Midi Dress/Deep Plum _ Eggplant Purple.jpg";
import asymmetricDustyPink from "../assets/products/Asymmetric Striped Lapel Midi Dress/Dusty Pink _ Rose Pink.jpg";

// ── Button-Accent Three-Quarter Sleeve Pencil Dress ───────────────────────
import buttonBrightRed from "../assets/products/Button-Accent Three-Quarter Sleeve Pencil Dress/Bright Red.jpg";
import buttonBlackNavy from "../assets/products/Button-Accent Three-Quarter Sleeve Pencil Dress/Classic Black - Navy Blue_.jpg";

// ── Classic High-Neck short-Sleeve Bodycon Dress ──────────────────────────
import highNeckBlack from "../assets/products/Classic High-Neck short-Sleeve Bodycon Dress/Classic Black.jpg";
import highNeckTeal from "../assets/products/Classic High-Neck short-Sleeve Bodycon Dress/Teal _ Blue.jpg";
import highNeckWine from "../assets/products/Classic High-Neck short-Sleeve Bodycon Dress/Wine Red _ Burgundy.jpg";

// ── Prestige Collection ───────────────────────────────────────────────────
import prestigeBlackBlue from "../assets/products/Prestige Collection/Black with Blue Buttons – Size_ 12–14.jpg";
import prestigeBlackWhite from "../assets/products/Prestige Collection/Black with White Buttons – Size_ 12–14.jpg";
import prestigeMustard from "../assets/products/Prestige Collection/Mustard_Gold – Size_ 12–14.jpg";
import prestigePink from "../assets/products/Prestige Collection/Pink – Size_ 12–14.jpg";
import prestigePlum from "../assets/products/Prestige Collection/Plum_Purple with White Buttons – Size_ 12–14.jpg";

// ── The Emerald Dress ─────────────────────────────────────────────────────
import emeraldBlack from "../assets/products/The Emerald Dress/Black – Size_ 12–14.jpg";
import emeraldMagenta from "../assets/products/The Emerald Dress/Magenta – Size_ 12–14.jpg";
import emeraldTeal from "../assets/products/The Emerald Dress/Teal – Size_ 12–14.jpg";
import emeraldWine from "../assets/products/The Emerald Dress/Wine – Size_ 12–14.jpg";

// ── The Monarch Dress ─────────────────────────────────────────────────────
import monarchBlack from "../assets/products/The Monarch Dress/Black – Size_ 12–14.jpg";
import monarchEmerald from "../assets/products/The Monarch Dress/Emerald green - size_ 12-14.jpg";
import monarchOlive from "../assets/products/The Monarch Dress/Olive Green – Size_ 12–14.jpg";

// ── The Victoria Dress ────────────────────────────────────────────────────
import victoriaBlack1 from "../assets/products/The Victoria Dress/Black – Size_ 12–14.jpg";
import victoriaBlack2 from "../assets/products/The Victoria Dress/Black – Size_ 12–14(1).jpg";
import victoriaBrown from "../assets/products/The Victoria Dress/Brown – Size_ 12–14.jpg";
import victoriaFloral from "../assets/products/The Victoria Dress/Floral Print – Size_ 12–14.jpg";
import victoriaPeach from "../assets/products/The Victoria Dress/Peach – Size_ 12–14.jpg";
import victoriaRed from "../assets/products/The Victoria Dress/Red – Size_ 12–14.jpg";
import victoriaWhiteFloral from "../assets/products/The Victoria Dress/White Floral Print – Size_ 12–14.jpg";

// ── The Vogue Dress ───────────────────────────────────────────────────────
import vogueBlackOrange from "../assets/products/The Vogue Dress/Black and Orange_.jpg";
import vogueEmeraldWine from "../assets/products/The Vogue Dress/Emerald Green & Wine – Size_ 12–14.jpg";
import voguePink from "../assets/products/The Vogue Dress/Pink – Size_ 12–14.jpg";

// ── The Zara Dress ────────────────────────────────────────────────────────
import zaraBlack from "../assets/products/The Zara Dress/Black_.jpg";
import zaraNavy from "../assets/products/The Zara Dress/Navy Blue_.jpg";

export const products = [
  {
    id: "asymmetric-striped-lapel-midi",
    name: "Asymmetric Striped Lapel Midi Dress",
    price: 9500,
    tag: "New in",
    designs: [
      { id: "d1", name: "Deep Plum / Eggplant Purple", image: asymmetricDeepPlum },
      { id: "d2", name: "Dusty Pink / Rose Pink", image: asymmetricDustyPink },
    ],
    reviews: [
      { id: "r1", name: "Adaeze O.", rating: 5, comment: "The plum colour is rich and the fit is perfect for the office. Got so many compliments!", date: "2026-07-12" },
      { id: "r2", name: "Blessing M.", rating: 4, comment: "Nice fabric and unique neckline. Size 12 fitted well.", date: "2026-07-28" },
    ],
  },
  {
    id: "button-accent-pencil",
    name: "Button-Accent Three-Quarter Sleeve Pencil Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Bright Red", image: buttonBrightRed },
      { id: "d2", name: "Classic Black / Navy Blue", image: buttonBlackNavy },
    ],
    reviews: [
      { id: "r1", name: "Ngozi K.", rating: 5, comment: "The red is stunning. Buttons are well placed and it holds its shape all day.", date: "2026-06-20" },
      { id: "r2", name: "Fatima S.", rating: 5, comment: "Bought the black for interviews. Looks expensive.", date: "2026-07-05" },
      { id: "r3", name: "Chisom E.", rating: 4, comment: "Good quality for the price. Sleeves are comfortable.", date: "2026-07-18" },
    ],
  },
  {
    id: "classic-high-neck-bodycon",
    name: "Classic High-Neck Short-Sleeve Bodycon Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Classic Black", image: highNeckBlack },
      { id: "d2", name: "Teal / Blue", image: highNeckTeal },
      { id: "d3", name: "Wine Red / Burgundy", image: highNeckWine },
    ],
    reviews: [
      { id: "r1", name: "Amaka T.", rating: 5, comment: "Hug-the-body fit without being uncomfortable. Wine colour is elegant.", date: "2026-06-15" },
      { id: "r2", name: "Ifeoma D.", rating: 4, comment: "True to size. High neck looks classy for meetings.", date: "2026-07-22" },
    ],
  },
  {
    id: "prestige-collection",
    name: "Prestige Collection",
    price: 10000,
    tag: "Bestseller",
    designs: [
      { id: "d1", name: "Black with Blue Buttons", image: prestigeBlackBlue },
      { id: "d2", name: "Black with White Buttons", image: prestigeBlackWhite },
      { id: "d3", name: "Mustard / Gold", image: prestigeMustard },
      { id: "d4", name: "Pink", image: prestigePink },
      { id: "d5", name: "Plum / Purple with White Buttons", image: prestigePlum },
    ],
    reviews: [
      { id: "r1", name: "Zainab A.", rating: 5, comment: "Mustard gold is my favourite. Feels premium and the buttons are solid.", date: "2026-05-30" },
      { id: "r2", name: "Grace I.", rating: 5, comment: "Ordered two colours. Both arrived well finished. Worth every naira.", date: "2026-06-25" },
      { id: "r3", name: "Tolu B.", rating: 4, comment: "Great for board meetings. Size 14 was perfect.", date: "2026-07-10" },
      { id: "r4", name: "Halima Y.", rating: 5, comment: "Plum with white buttons is so unique. Everyone asked where I got it.", date: "2026-07-30" },
    ],
  },
  {
    id: "the-emerald-dress",
    name: "The Emerald Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Black", image: emeraldBlack },
      { id: "d2", name: "Magenta", image: emeraldMagenta },
      { id: "d3", name: "Teal", image: emeraldTeal },
      { id: "d4", name: "Wine", image: emeraldWine },
    ],
    reviews: [
      { id: "r1", name: "Chioma N.", rating: 5, comment: "Magenta is bold and beautiful. Fabric doesn’t wrinkle easily.", date: "2026-06-08" },
      { id: "r2", name: "Esther P.", rating: 4, comment: "Nice cut. Teal looks even better in person.", date: "2026-07-14" },
    ],
  },
  {
    id: "the-monarch-dress",
    name: "The Monarch Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Black", image: monarchBlack },
      { id: "d2", name: "Emerald Green", image: monarchEmerald },
      { id: "d3", name: "Olive Green", image: monarchOlive },
    ],
    reviews: [
      { id: "r1", name: "Ruth A.", rating: 5, comment: "Emerald green is royal. Fit is flattering on curves.", date: "2026-06-18" },
      { id: "r2", name: "Joy U.", rating: 5, comment: "Olive is understated and perfect for work. Highly recommend.", date: "2026-07-02" },
      { id: "r3", name: "Mary O.", rating: 4, comment: "Good stitching. Black is a wardrobe staple now.", date: "2026-07-25" },
    ],
  },
  {
    id: "the-victoria-dress",
    name: "The Victoria Dress",
    price: 9800,
    tag: "New in",
    designs: [
      { id: "d1", name: "Black", image: victoriaBlack1 },
      { id: "d2", name: "Black (Alt)", image: victoriaBlack2 },
      { id: "d3", name: "Brown", image: victoriaBrown },
      { id: "d4", name: "Floral Print", image: victoriaFloral },
      { id: "d5", name: "Peach", image: victoriaPeach },
      { id: "d6", name: "Red", image: victoriaRed },
      { id: "d7", name: "White Floral Print", image: victoriaWhiteFloral },
    ],
    reviews: [
      { id: "r1", name: "Sandra L.", rating: 5, comment: "So many colour options! Floral print is gorgeous for Fridays.", date: "2026-07-08" },
      { id: "r2", name: "Patience K.", rating: 4, comment: "Peach is soft and feminine. Delivery was quick via WhatsApp order.", date: "2026-07-20" },
      { id: "r3", name: "Bisi F.", rating: 5, comment: "Red stands out in a good way. Quality exceeded my expectations.", date: "2026-08-01" },
    ],
  },
  {
    id: "the-vogue-dress",
    name: "The Vogue Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Black and Orange", image: vogueBlackOrange },
      { id: "d2", name: "Emerald Green & Wine", image: vogueEmeraldWine },
      { id: "d3", name: "Pink", image: voguePink },
    ],
    reviews: [
      { id: "r1", name: "Kemi A.", rating: 5, comment: "Black and orange combo is fire. Unique without being loud.", date: "2026-06-28" },
      { id: "r2", name: "Uche M.", rating: 4, comment: "Pink is pretty. Runs true to size 12.", date: "2026-07-16" },
    ],
  },
  {
    id: "the-zara-dress",
    name: "The Zara Dress",
    price: 9500,
    designs: [
      { id: "d1", name: "Black", image: zaraBlack },
      { id: "d2", name: "Navy Blue", image: zaraNavy },
    ],
    reviews: [
      { id: "r1", name: "Funke R.", rating: 5, comment: "Simple, clean, professional. Navy is my go-to now.", date: "2026-06-12" },
      { id: "r2", name: "Amina H.", rating: 4, comment: "Solid everyday dress. Comfortable for long work hours.", date: "2026-07-09" },
    ],
  },
];
