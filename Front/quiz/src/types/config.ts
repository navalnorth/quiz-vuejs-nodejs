export interface Quiz {
  nom_quiz: string;
  isActive: boolean;
  questions: questions[];
}

interface questions {
  nom_question: string;
  reponses: string[];
  reponse_correcte: number;
}

export interface Token {
  token: string;
}

export interface quizlist {
  id_quiz: number;
  isActive: boolean;
  nom_quiz: string;
}

export interface listQuizActive {
  id_quiz: number;
  isActive: boolean;
  nom_quiz: string;
}

export interface formatedQeustion {
  nom_question: string;
  reponses: string[];
  reponse_correcte: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}