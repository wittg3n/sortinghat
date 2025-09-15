const universities = [
  {
    mention: "Acoustique",
    parcours: null,
    candidatable: false,
    uai: "0690187D",
    commentaire:
      "Ce master est à vocation internationale. Les enseignements sont effectués en anglais.",
    lieux: [
      {
        site: "Campus de Lyon de l'Ecole Centrale",
        ville: "Ecully",
        codePostal: "69130",
        region: "Auvergne-Rhône-Alpes",
      },
      {
        site: "Campus de la Doua",
        ville: "Villeurbanne",
        codePostal: "69100",
        region: "Auvergne-Rhône-Alpes",
      },
    ],
    dates: {
      debut: "2024-11-20",
      fin: "2025-04-30",
    },
    url: "https://candidature.ec-lyon.fr/details?view=programme&cid=68",
    droitsInscription:
      "Centrale Lyon applique les droits d'inscription différenciés selon la nationalité.",
  },
  {
    mention: "Acoustique",
    parcours: "International Master Degree's in Electroacoustic (IMDEA)",
    candidatable: false,
    uai: "0720916E",
    commentaire:
      "Candidature uniquement après réussite aux tests scientifiques et de motivation.",
    lieux: [
      {
        site: "Le Mans Université",
        ville: "Le Mans",
        codePostal: "72000",
        region: "Pays de la Loire",
      },
    ],
    dates: {
      debut: "2025-01-06",
      fin: "2025-06-01",
    },
    url: "https://ecandidats.univ-lemans.fr/",
    droitsInscription:
      "L'Université du Mans n'applique pas les droits différenciés.",
  },
  {
    mention: "Acoustique",
    parcours: "M1 commun aux parcours AETBV et RAA",
    candidatable: true,
    uai: "0720916E",
    lieux: [
      {
        site: "Le Mans Université",
        ville: "Le Mans",
        codePostal: "72000",
        region: "Pays de la Loire",
      },
    ],
    stats: {
      tauxAcces: 0.415,
      rangDernierAppele: 61,
      candidaturesConfirmees: 147,
    },
    droitsInscription:
      "L'Université du Mans n'applique pas les droits différenciés.",
  },
  {
    mention: "Acoustique",
    parcours: "Wave Physics and Acoustics",
    candidatable: true,
    uai: "0720916E",
    commentaire:
      "International Master's Degree en Wave Physics & Acoustics, 2 ans.",
    lieux: [
      {
        site: "Le Mans Université",
        ville: "Le Mans",
        codePostal: "72000",
        region: "Pays de la Loire",
      },
    ],
    stats: {
      tauxAcces: 0.268,
      rangDernierAppele: 15,
      candidaturesConfirmees: 56,
    },
    droitsInscription:
      "L'Université du Mans n'applique pas les droits différenciés.",
  },
  {
    mention: "Acoustique et musicologie",
    parcours: "Ingénierie et conception sonore",
    candidatable: true,
    uai: "0134009M",
    commentaire: "Entretien (présentiel ou zoom) après examen du dossier.",
    lieux: [
      {
        site: "Faculté des arts, lettres, langues et sciences humaines",
        ville: "Marseille cedex 3",
        codePostal: "13331",
        region: "Provence-Alpes-Côte d'Azur",
      },
    ],
    stats: {
      tauxAcces: 0.351,
      rangDernierAppele: 20,
      candidaturesConfirmees: 57,
    },
    url: "https://www.univ-amu.fr/fr/public/droits-dinscription-differencies",
  },
  {
    mention: "Acoustique et musicologie",
    parcours: "Musiques, Technologies et Humanités",
    candidatable: true,
    uai: "0134009M",
    commentaire:
      "Entretien de 10 minutes en français (présentation + projet de recherche).",
    lieux: [
      {
        site: "Faculté des arts, lettres, langues et sciences humaines",
        ville: "Marseille cedex 3",
        codePostal: "13331",
        region: "Provence-Alpes-Côte d'Azur",
      },
    ],
    stats: {
      tauxAcces: 0.653,
      rangDernierAppele: 32,
      candidaturesConfirmees: 49,
    },
    url: "https://www.univ-amu.fr/fr/public/droits-dinscription-differencies",
  },
];
export default universities;
