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
      ["system", "You are a professional chef"],
      ["user", "{input}"],
    ]);
    const prompt2 = ChatPromptTemplate.fromMessages([
      ["system", "You are Indian."],
      ["user", "{input}"],
    ]);
    const prompt3 = ChatPromptTemplate.fromMessages([
      ["system", "You are Mexican."],
      ["user", "{input}"],
    ]);
    const prompt4 = ChatPromptTemplate.fromMessages([
      ["system", "You are Mosquito."],
      ["user", "{input}"],
    ]);
    //creating different chains with different prompts
    const chain=prompt.pipe(this.ChatOllama)
    const chain2=prompt2.pipe(this.ChatOllama)
    const chain3=prompt3.pipe(this.ChatOllama)
    const chain4=prompt4.pipe(this.ChatOllama)


    //Invoking different chains
    chain.invoke({input:"Tell me about your favourite food?"}).then((resolve:any)=>{
      console.log(resolve,"chain invoke");   
    })
    chain2.invoke({input:"Tell me about your favourite food?"}).then((resolve:any)=>{
      console.log(resolve,"chain 1 invoke");   
    })
    chain3.invoke({input:"Tell me about your favourite food?"}).then((resolve:any)=>{
      console.log(resolve,"chain 2 invoke");   
    })
    chain4.invoke({input:"Tell me about your favourite food?"}).then((resolve:any)=>{
      console.log(resolve,"chain 3 invoke");   
    })

  }
}
