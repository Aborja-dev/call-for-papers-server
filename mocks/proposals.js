import { STATUS_PROPOSAL_ENUM } from "../types/const.d.js"
import { v4 as uuidv4 } from 'uuid';
const mockProposals = [
    {
        title: "Una mirada a la política mundial",
        topic: "Política",
        abstract: "Un análisis de los principales acontecimientos políticos mundiales, con una mirada hacia el futuro para predecir tendencias y cambios",
        estimateDuration: "02:30"
    },
    {
        title: "El progreso en tecnología digital",
        topic: "Tecnología",
        abstract: "Una discusión sobre la revolución digital en curso y sus efectos en la economía global",
        estimateDuration: "01:45"
    },
    {
        title: "Acceso universal a la educación",
        topic: "Educación",
        abstract: "Examinar la importancia de un acceso universal a la educación y hablar sobre reformas y esfuerzos para proporcionar educación de calidad",
        estimateDuration: "01:30"
    },
    {
        title: "Prevención de enfermedades: una mapa estratégico",
        topic: "Salud",
        abstract: "Una visión general de nuestra comprensión de las enfermedades y cómo se puede mejorar la prevención",
        estimateDuration: "02:00"
    },
    {
        title: "El futuro de las finanzas personales",
        topic: "Finanzas",
        abstract: "Cómo las nuevas herramientas digitales están redefiniendo la forma de administrar nuestro dinero",
        estimateDuration: "01:15"
    },
    {
        title: "El papel de la inteligencia artificial en la política",
        topic: "Política",
        abstract: "Cómo la inteligencia artificial está cambiando la forma en que vemos la política a nivel internacional",
        estimateDuration: "01:45"
    },
    {
        title: "Las posibilidades de la robótica",
        topic: "Tecnología",
        abstract: "Cómo la robótica está cambiando el mundo y cómo nuevos avances están permitiendo realizar tareas cada vez más complejas",
        estimateDuration: "02:00"
    },
    {
        title: "Una visión optimista al futuro de la educación",
        topic: "Educación",
        abstract: "Cómo las nuevas herramientas tecnológicas están transformando la educación y lo que podemos esperar de ella en el futuro",
        estimateDuration: "01:30"
    },
    {
        title: "La importancia de la investigación en salud",
        topic: "Salud",
        abstract: "Cómo la investigación en salud nos permite crear nuevos tratamientos para enfermedades y mejorar la calidad de vida de las personas",
        estimateDuration: "02:00"
    },
    {
        title: "Compras responsables: el futuro de las finanzas",
        topic: "Finanzas",
        abstract: "Examinar cómo las finanzas personales están evolucionando para poder manejar nuestro dinero de forma responsable",
        estimateDuration: "01:30"
    },
    {
        title: "La realidad de los regímenes políticos autoritarios",
        topic: "Política",
        abstract: "Un análisis de cómo operan los regímenes autoritarios modernos y cuáles son los riesgos asociados con ellos",
        estimateDuration: "02:00"
    },
    {
        title: "Impacto de la tecnología en la cultura",
        topic: "Tecnología",
        abstract: "Analizar cómo la tecnología está transformando nuestra cultura y socialización",
        estimateDuration: "01:45"
    },
    {
        title: "La importancia de la inteligencia emocional en el trabajo",
        topic: "Trabajo",
        abstract: "Analizar cómo la inteligencia emocional puede mejorar el ambiente laboral y aumentar la productividad",
        estimateDuration: "01:30"
    },
    {
        title: "Impacto de la tecnología en la cultura",
        topic: "Tecnología",
        abstract: "Analizar cómo la tecnología está transformando nuestra cultura y socialización",
        estimateDuration: "01:45"
    },
    {
        title: "Habilidades cotidianas para el aprendizaje",
        topic: "Educación",
        abstract: "Un examen de cómo podemos mejorar la calidad del aprendizaje mediante la inclusión de habilidades cotidianas en el currículo escolar",
        estimateDuration: "02:00"
    },
    {
        title: "La dieta óptima para una vida saludable",
        topic: "Salud",
        abstract: "Discutir qué alimentos comer para mantenerse saludable y cómo combinar los nutrientes para obtener los resultados óptimos",
        estimateDuration: "01:30"
    },
    {
        title: "Gastar inteligentemente: consejos prácticos para el ahorro",
        topic: "Finanzas",
        abstract: "Explicar cómo establecer metas financieras realistas y dar consejos prácticos para el ahorro",
        estimateDuration: "01:15"
    },
    {
        title: "Los movimientos de derechos humanos globales",
        topic: "Política",
        abstract: "Un recorrido por los movimientos de derechos humanos actuales y cómo están cambiando nuestro mundo",
        estimateDuration: "02:30"
    },
    {
        title: "Realizar sueños con la ayuda de la impresión 3D",
        topic: "Tecnología",
        abstract: "Un análisis de cómo la impresión 3D está transformando el mundo y abriendo nuevas oportunidades",
        estimateDuration: "01:45"
    },
    {
        title: "El arte de enseñar y aprender",
        topic: "Educación",
        abstract: "Una revisión de las técnicas más efectivas para enseñanza y aprendizaje, incluyendo los beneficios de la tecnología",
        estimateDuration: "02:00"
    },
    {
        title: "Desarrollar la resiliencia",
        topic: "Salud",
        abstract: "Comprender cómo desarrollar capacidades de resiliencia, necesarias para enfrentar los problemas de la vida diaria",
        estimateDuration: "01:30"
    },
    {
        title: "Inversiones inteligentes: cómo prepararse para el futuro",
        topic: "Finanzas",
        abstract: "Examen de algunas de las mejores estrategias para hacer inversiones inteligentes",
        estimateDuration: "01:15"
    }
]

const createDate = (timeString) => {
    const values = timeString.split(':')
    const date = new Date(0, 0, 0, values[0], values[1])
    return date
}

const createProposal = (proposal) => {
    return {
        ...proposal,
        estimateDuration: createDate(proposal.estimateDuration),
        status: STATUS_PROPOSAL_ENUM[0],
        attachments: [],
        streamed: false,
        uniqueCode: uuidv4().toString()
    }
}

export const choice = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

export const proposals = mockProposals.map(createProposal)