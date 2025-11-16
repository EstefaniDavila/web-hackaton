export const Colors = {
  // Paleta principal
  primary: '#D70026', // Phone Booth Red (Acciones importantes, íconos activos)
  secondary: '#EDB83D', // Flash (Botón secundario, énfasis)
  night: '#000B29', // Night (Texto principal, títulos, navbar oscuro)
  pearl: '#F8F5F2', // Pearl (Fondo principal, contenedores, cards)

  // Colores de soporte para temas claro/oscuro (ajustados a tu esquema)
  text: '#000B29', // Siempre oscuro para buen contraste
  background: '#F8F5F2', // Fondo general
  tint: '#D70026', // Tinte principal
  gray: '#6b7280', // Gris para textos secundarios
  lightGray: '#e5e7eb', // Líneas divisorias y bordes
};

export const Themes = {
  light: {
    text: Colors.night,
    background: Colors.pearl,
    tint: Colors.primary,
    icon: Colors.night,
    tabBackground: Colors.night, // Fondo del Navbar oscuro según el uso recomendado
  }
};