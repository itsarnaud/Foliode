"use client";

import Accordion from "../UI/accordion";

export default function Avantages() {
  const accordionItems = [
    {
      key: "1",
      title: "Créer facilement un portfolio personnalisé",
      subtitle: "Des options flexibles pour votre création",
      content:
        "Notre plateforme vous permet de créer un portfolio unique qui reflète votre personnalité et vos compétences. Personnalisez les couleurs, les mises en page et organisez vos projets comme vous le souhaitez.",
    },
    {
      key: "2", 
      title: "Choisir parmi des templates modernes",
      subtitle: "Un design adapté à vos besoins",
      content:
        "Accédez à une collection variée de templates professionnels et attrayants. Trouvez le style parfait pour mettre en valeur vos projets et compétences.",
    },
    {
      key: "3",
      title: "Hébergement gratuit et sécurisé", 
      subtitle: "Une solution fiable et pratique",
      content:
        "Chaque portfolio est hébergé sur un sous-domaine unique (prenom.nom.foliode.com) avec une sécurité avancée pour protéger vos données.",
    },
    {
      key: "4",
      title: "Suivi pédagogique pour enseignants",
      subtitle: "Des outils pensés pour les professeurs",
      content:
        "Créez des classes, suivez les progrès de vos étudiants, et attribuez des évaluations facilement grâce à une interface intuitive.",
    },
  ];

  return (
    <div className="w-full relative p-8 flex justify-center items-center bg-white dark:bg-black">
      <div className="max-w-[900px] w-full">
        <h2 className="text-4xl font-bold mb-6 text-center mt-36">Nos Avantages</h2>
        <p className="text-1xl text-center max-w-2xl mx-auto mb-20">Foliode est un outil conçu pour les étudiants et enseignants des formations BUT. Simplifiez la création de portfolios en ligne adaptés à vos compétences et objectifs pédagogiques.</p>
        <div className="flex">
          <Accordion items={accordionItems} />
          {/* <p>loremloremloremloremloremloremloremloremloremlorem</p> */}
        </div>
      </div>
    </div>
  );
}