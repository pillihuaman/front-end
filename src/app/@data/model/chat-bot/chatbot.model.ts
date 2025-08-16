// @data/model/chatbot/chatbot.model.ts

/**
 * Representa un solo mensaje en la interfaz del chat.
 */
export interface ChatMessage {
  text: string;
  author: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean; // Para mostrar un indicador de "escribiendo..."
  actions?: ChatAction[]; // Acciones/botones que el bot puede sugerir
}

/**
 * Representa una acción o botón que el bot puede mostrar al usuario.
 */
export interface ChatAction {
  label: string; // El texto del botón, ej. "Ver mis pedidos"
  type: 'ROUTE' | 'API_CALL' | 'FUNCTION'; // Tipo de acción
  value: string; // El valor asociado: una ruta '/pedidos', un endpoint 'get_orders', o el nombre de una función local.
}

/**
* Lo que el componente Chatbot envía a tu backend.
*/
export interface ChatRequest {
  message: string;
  context: string; // 'cotizacion', 'soporte-general', 'seguimiento-pedido'
  conversationHistory: { author: string, text: string }[]; // Para que la IA tenga contexto
}

/**
* Lo que tu backend responde al componente Chatbot.
*/
export interface ChatResponse {
  reply: string; // La respuesta en texto del bot
  actions?: ChatAction[]; // Acciones sugeridas por el bot
}