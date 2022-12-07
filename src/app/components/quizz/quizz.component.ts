import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string =''

  questions:any=''
  questionSelected:any=''

  answers:string[]= []
  answerSelected:string =''

  questionIndex:number = 0
  questionsMaxIndex:number = 0

  finished:boolean = true

  imagem:string = ''

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionsMaxIndex = this.questions.length
    }
  }
  buttonPress(value:string){
    this.answers.push(value)
    this.nextStep()

  }

   async nextStep(){
    this.questionIndex+=1
    if(this.questionsMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.results(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof
      typeof quizz_questions.results]
      if(finalAnswer == 'A'){
        this.imagem = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150_f3.png'
      }else if(finalAnswer == 'B'){
        this.imagem = 'https://assets.stickpng.com/images/5859662e4f6ae202fedf2878.png'
      }else if(finalAnswer == 'C'){
      this.imagem = 'https://imagensemoldes.com.br/wp-content/uploads/2020/04/Pikachu-com-Fundo-Transparente-1024x919.png'
      }else if(finalAnswer == 'D'){
        this.imagem = 'https://www.pngplay.com/wp-content/uploads/10/Blastoise-Pokemon-No-Background.png'
      }else if(finalAnswer == 'E'){
        this.imagem = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f619ed0-b566-4538-8392-bf02ca7a76cd/dck5nef-518de8dd-4143-4285-924b-8d3bdedcc187.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFmNjE5ZWQwLWI1NjYtNDUzOC04MzkyLWJmMDJjYTdhNzZjZFwvZGNrNW5lZi01MThkZThkZC00MTQzLTQyODUtOTI0Yi04ZDNiZGVkY2MxODcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vJrCPVcoPMR6MShnK_NqyJ2bc3QU6aC4dk2iVPBB2D4'
      }
    }
  }
    async results(answers:string[]){
      const result = answers.reduce((previous,current,index,arr) => {
        if(arr.filter(item => item === previous).length >
           arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
      }
    })

    return result
    }
}
