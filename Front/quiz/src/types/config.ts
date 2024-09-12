export interface Quiz {
    nom_quiz: string,
    questions: questions[]
}

interface questions {
    nom_question: string,
    reponses: string[],
    reponse_correcte: number
}


export interface Token {
    token: string;
  }



export interface quizlist {
    id_quiz: number;
    nom_quiz: any
  }
