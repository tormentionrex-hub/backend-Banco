export const exchangeRates = {
  USD: { EUR: 0.92, GBP: 0.79, MXN: 17.2, COP: 4100, CRC: 510, JPY: 149, BRL: 4.97, CAD: 1.36, USD: 1 },
  EUR: { USD: 1.08, GBP: 0.86, MXN: 18.7, COP: 4450, CRC: 554, JPY: 162, BRL: 5.41, CAD: 1.48, EUR: 1 },
  GBP: { USD: 1.26, EUR: 1.16, MXN: 21.7, COP: 5180, CRC: 645, JPY: 188, BRL: 6.29, CAD: 1.72, GBP: 1 },
  MXN: { USD: 0.058, EUR: 0.053, GBP: 0.046, COP: 238, CRC: 29.6, JPY: 8.66, BRL: 0.29, CAD: 0.079, MXN: 1 },
  COP: { USD: 0.00024, EUR: 0.00022, GBP: 0.00019, MXN: 0.0042, CRC: 0.12, JPY: 0.036, BRL: 0.0012, CAD: 0.00033, COP: 1 },
};

export const transferFees = {
  USD: 4.15,
  EUR: 3.80,
  GBP: 3.20,
  MXN: 72.50,
  COP: 16500,
  default: 5.00
};

export const reviews = [
  { from: "🇺🇸", to: "🇪🇸", text: "La forma más rápida de enviar dinero a mi familia en España. ¡Llega en segundos!", name: "Carlos R.", country: "Estados Unidos" },
  { from: "🇬🇧", to: "🇫🇷", text: "Transparencia total. Lo que ves en la calculadora es exactamente lo que llega.", name: "Sarah J.", country: "Reino Unido" },
  { from: "🇲🇽", to: "🇺🇸", text: "Excelente servicio para mi negocio. Ahorro mucho en comisiones bancarias.", name: "Miguel A.", country: "México" },
  { from: "🇪🇸", to: "🇨🇴", text: "La app es súper intuitiva. Enviar dinero a Colombia nunca fue tan fácil.", name: "Lucía F.", country: "España" },
  { from: "🇨🇦", to: "🇧🇷", text: "He probado muchos servicios y Wise es sin duda el más económico.", name: "Robert M.", country: "Canadá" },
  { from: "🇩🇪", to: "🇯🇵", text: "Seguridad y rapidez. Justo lo que necesito para mis transferencias internacionales.", name: "Hans K.", country: "Alemania" },
];

export const countries = [
  { flag: "🇺🇸", name: "Estados Unidos", currency: "USD" },
  { flag: "🇪🇺", name: "Unión Europea", currency: "EUR" },
  { flag: "🇬🇧", name: "Reino Unido", currency: "GBP" },
  { flag: "🇲🇽", name: "México", currency: "MXN" },
  { flag: "🇨🇴", name: "Colombia", currency: "COP" },
  { flag: "🇨🇷", name: "Costa Rica", currency: "CRC" },
  { flag: "🇯🇵", name: "Japón", currency: "JPY" },
  { flag: "🇧🇷", name: "Brasil", currency: "BRL" },
  { flag: "🇨🇦", name: "Canadá", currency: "CAD" },
  { flag: "🇦🇺", name: "Australia", currency: "AUD" },
  { flag: "🇨Ｈ", name: "Suiza", currency: "CHF" },
  { flag: "🇮🇳", name: "India", currency: "INR" },
  { flag: "🇸🇬", name: "Singapur", currency: "SGD" },
  { flag: "🇳🇿", name: "Nueva Zelanda", currency: "NZD" },
  { flag: "🇭🇰", name: "Hong Kong", currency: "HKD" },
  { flag: "🇵🇪", name: "Perú", currency: "PEN" },
  { flag: "🇨Ｌ", name: "Chile", currency: "CLP" },
  { flag: "🇦Ｒ", name: "Argentina", currency: "ARS" },
  { flag: "🇹Ｒ", name: "Turquía", currency: "TRY" },
  { flag: "🇵Ｈ", name: "Filipinas", currency: "PHP" },
];

export const comparisonData = {
  bankA: { name: "Bank of America", rateMarkup: 0.035 },
  bankB: { name: "Wells Fargo", rateMarkup: 0.04 },
};
