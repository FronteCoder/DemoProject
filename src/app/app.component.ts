import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatOllamaConfig } from '../core/services/chatollamaconfig.service';
import { ChatPromptTemplate } from "@langchain/core/prompts";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: ChatOllama,
      useFactory: (config: ChatOllamaConfig) => {
        return new ChatOllama({baseUrl:config.baseUrl, model:config.model,temperature:config.temperature});
      },
      deps: [ChatOllamaConfig] // Depends on ChatOllamaConfig for values
    }
  ]
})
export class AppComponent implements OnInit {
  title = 'DemoProject';
  constructor(private ChatOllama:ChatOllama){
  }
  ngOnInit(): void {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a pokemon geek."],
      ["user", "{input}"],
    ]);
    
    const chain=prompt.pipe(this.ChatOllama)
    // Invoking chat model directly
    this.ChatOllama.invoke("Tell me about psyduck").then((resolve:any)=>{
        
    })
    //Invoking Chat model using chain
    chain.invoke({input:"Tell me about psyduck?"}).then((resolve:any)=>{
      console.log(resolve,"chain invoke");
    })
  }
}
