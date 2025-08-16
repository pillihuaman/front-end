import { Component, Input, ViewChild, ElementRef, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbSpinnerModule } from '@nebular/theme';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from '../../../@data/interceptors/safe-html.pipe';
import { ChatAction, ChatMessage, ChatRequest } from '../../../@data/model/chat-bot/chatbot.model';
import { ChatbotService } from '../../../@data/services/chat-bot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NbCardModule, NbIconModule,
    NbInputModule, NbButtonModule, NbSpinnerModule,SafeHtmlPipe
  ],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements AfterViewChecked {

  @Input() context: string = 'general'; // Contexto por defecto
  @Input() initialMessage: string = '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?';
  @Output() onActionExecute = new EventEmitter<ChatAction>(); // Para notificar al componente padre de acciones

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isMinimized: boolean = true;

  constructor(
    private chatbotService: ChatbotService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addBotMessage(this.initialMessage);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  toggleChat() {
    this.isMinimized = !this.isMinimized;
  }

  sendMessage() {
    const text = this.userInput.trim();
    if (!text) return;

    // 1. Añadir el mensaje del usuario a la UI
    this.addUserMessage(text);
    this.userInput = '';
    
    // 2. Mostrar indicador de "escribiendo..."
    this.addBotMessage('', true);

    // 3. Preparar y enviar la solicitud al backend
    const request: ChatRequest = {
      message: text,
      context: this.context,
      conversationHistory: this.messages
        .filter(m => !m.isLoading) // Excluir mensajes de "cargando"
        .map(m => ({ author: m.author, text: m.text })) // Mapear a un formato simple
    };

    this.chatbotService.sendMessage(request).subscribe({
      next: (response) => {
        // 4. Reemplazar el indicador de "cargando" con la respuesta real
        this.updateLastBotMessage(response.reply, response.actions || []);
      },
      error: (err) => {
        console.error("Error al comunicarse con el chatbot:", err);
        this.updateLastBotMessage('Lo siento, estoy teniendo problemas para conectarme. Inténtalo de nuevo más tarde.');
      }
    });
  }
  
  handleActionClick(action: ChatAction) {
    // Añadir un mensaje indicando la acción del usuario
    this.addUserMessage(`He seleccionado: "${action.label}"`);
    
    switch(action.type) {
      case 'ROUTE':
        this.router.navigate([action.value]);
        this.addBotMessage(`Ok, te estoy llevando a ${action.label}.`);
        break;
      case 'API_CALL':
      case 'FUNCTION':
        // Emitir el evento para que el componente padre lo maneje si es necesario
        this.onActionExecute.emit(action);
        // Si no se maneja en el padre, se puede enviar un mensaje al bot
        this.userInput = `Quiero ejecutar la acción: ${action.label}`;
        this.sendMessage();
        break;
    }
  }

  // --- Métodos de ayuda para la UI ---

  private addUserMessage(text: string) {
    this.messages.push({ text, author: 'user', timestamp: new Date() });
  }

  private addBotMessage(text: string, isLoading: boolean = false) {
    this.messages.push({ text, author: 'bot', timestamp: new Date(), isLoading });
  }
  
  private updateLastBotMessage(text: string, actions: ChatAction[] = []) {
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage && lastMessage.author === 'bot' && lastMessage.isLoading) {
      lastMessage.text = text;
      lastMessage.isLoading = false;
      lastMessage.actions = actions;
    } else {
      this.addBotMessage(text);
    }
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}