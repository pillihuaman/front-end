// @data/services/chatbot.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { ResponseBody } from '../model/general/responseBody'; // Asumo que tienes este modelo para el wrapper de tu API

// Arquitectura y utilidades
import { ChatBotRepository } from '../../@domain/repository/repository/chat-bot.repository';
import { ApiService } from './api.service';
import { Const } from '../../utils/const';
import { ChatRequest, ChatResponse } from '../model/chat-bot/chatbot.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService implements ChatBotRepository {

  constructor(
    private http: HttpClient,
    private apiService: ApiService // Inyectamos tu servicio centralizado
  ) { }

  /**
   * Envía la solicitud del chatbot al endpoint del backend.
   * Utiliza el ApiService para manejar la llamada y mapea la respuesta
   * del backend al formato que el componente del chat espera.
   *
   * @param request El objeto ChatRequest que contiene el mensaje, contexto e historial.
   * @returns Un Observable que emite un objeto ChatResponse.
   */
  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    
    // 1. Construir la URL completa del endpoint usando tus constantes. 
    // Esto centraliza la configuración y evita errores.   
    const url = `${Const.API_INTELLIGENCY_ARTIFICIAL}/${Const.URL_TYPE_ACCES_PRIVATE}/v1/ia/iaService/deepseek-chat`;

    // 2. El cuerpo de la solicitud es directamente el objeto ChatRequest.
    // Tu backend Java ya está preparado para recibir este DTO.
    const body: ChatRequest = request;

    // 3. Usar el ApiService para realizar la petición POST.
    // Esto mantiene la consistencia con el resto de tus servicios,
    // ya que el ApiService se encarga de la autenticación y otros detalles.
    // Se espera que la respuesta del backend sea del tipo `ResponseBody<ChatResponse>`.
    return this.apiService.post(url, body).pipe(
      map(response => {
        // 4. Mapear la respuesta.
        // El objetivo es extraer el 'payload' que contiene el objeto ChatResponse.

        if (!response || !response.payload) {
          console.error('Respuesta inválida o sin payload desde el backend del chatbot.');
          // Devolvemos una respuesta de error controlada para que la UI no se rompa.
          return { 
            reply: 'Lo siento, no pude obtener una respuesta del servidor.', 
            actions: [] 
          };
        }

        // El payload ya tiene el formato de ChatResponse, así que simplemente lo retornamos.
        // El backend hizo el trabajo de formatear la respuesta de la IA.
        return response.payload;
      })
    );
  }
}