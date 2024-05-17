import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes it accessible throughout the application
})
export class ChatOllamaConfig {
  baseUrl = 'http://localhost:11434'; // Default values
  model = 'phi3';
  temperature=1;
}
