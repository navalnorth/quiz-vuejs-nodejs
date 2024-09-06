export interface Quiz {
    nom_quiz: string,
    nom_question: questions[]
}

interface questions {
    nom_question: string,
    reponses: string[],
    reponse_correcte: string
}

