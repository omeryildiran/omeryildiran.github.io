export type ProjectDemo =
  | {
      title: string;
      href?: string;
      chips?: { label: string; href: string }[];
      embed: {
        kind: "iframe";
        src: string;
        title: string;
        allow?: string;
      };
    }
  | {
      title: string;
      href?: string;
      chips?: { label: string; href: string }[];
      embed: {
        kind: "image";
        src: string;
        alt: string;
      };
    };

export const projectDemos: ProjectDemo[] = [
  {
    title: "Duration Judgments with Conflicting Audiovisual Cues",
    href: "/notes/audiovisual-duration/",
    chips: [
      { label: "Project page", href: "/notes/audiovisual-duration/" },
      {
        label: "Psychometric fits",
        href: "/assets/docs/audiovisual-duration/pooled-psychometric-functions.pdf"
      },
      {
        label: "Model comparison",
        href: "/assets/docs/audiovisual-duration/aggregated-mu-vs-models.pdf"
      }
    ],
    embed: {
      kind: "image",
      src: "/assets/images/audiovisual-duration/thumbnail.png",
      alt: "Unimodal auditory and visual task figure"
    }
  },
  {
    title: "Role of Expectation on Perceived Time of Visual Events",
    href: "https://drive.google.com/file/d/1dQwQV8OmORSYC_rPqAxFgNsVfJpEPzGI/view?usp=sharing",
    embed: {
      kind: "iframe",
      src: "https://www.youtube.com/embed/ToUp1I11ml4",
      title: "Role of Expectation on Perceived Time of Visual Events - Demo",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    }
  },
  {
    title:
      "Unsupervised learning can predict properties of non-rigid mirror objects in ambiguous conditions",
    href: "https://doi.org/10.1167/jov.23.9.5026",
    embed: {
      kind: "iframe",
      src: "https://drive.google.com/file/d/1tMBHr-U8ospn7wwUgo_KK0J-nJXNzOsJ/preview",
      title:
        "Unsupervised learning can predict properties of non-rigid mirror objects in ambiguous conditions - Video",
      allow: "autoplay; fullscreen"
    }
  },
  {
    title: "Parchment Skin Illusion for Haptic Perception of Viscous Materials",
    href: "https://www.notion.so/Multimodal-Material-Perception-METU-Sense-24e2bba710ec4669ad13e8981f75cd40?pvs=21",
    chips: [
      {
        label: "Github Repo",
        href: "https://github.com/omeryildiran/Audio-Tactile-Material-Perception-Experiment--PsychoPy"
      },
      {
        label: "Project Link",
        href: "https://www.notion.so/Multimodal-Material-Perception-METU-Sense-24e2bba710ec4669ad13e8981f75cd40?pvs=21"
      },
      { label: "PDF", href: "http://dx.doi.org/10.13140/RG.2.2.11463.83361" },
      {
        label: "Open video (Drive)",
        href: "https://drive.google.com/file/d/1HqbvnPgDXC6sKrTyXF-d6x5Tw532q9T3/view?t=11"
      }
    ],
    embed: {
      kind: "iframe",
      src: "https://drive.google.com/file/d/1HqbvnPgDXC6sKrTyXF-d6x5Tw532q9T3/preview",
      title: "Poster Tour - Parchment Skin Illusion",
      allow: "autoplay; fullscreen"
    }
  },
  {
    title: "Investigating the Role of Auditory Cues that Create Expectation Effect for Visual Targets",
    href: "https://run.pavlovia.org/omer/audio-visual-expectation/",
    chips: [
      { label: "Github Repo", href: "https://github.com/omeryildiran/Audio-Visual-Expectation-" },
      { label: "PsychoPy Demo", href: "https://run.pavlovia.org/omer/audio-visual-expectation/" },
      { label: "Open on YouTube", href: "https://youtu.be/wIhakVfx6u0" }
    ],
    embed: {
      kind: "iframe",
      src: "https://www.youtube.com/embed/wIhakVfx6u0",
      title: "Investigating the Role of Auditory Cues - Demo",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    }
  },
  {
    title: "George Viau's Collection: A Computational Approach",
    href: "https://odhn.ens.psl.eu/en/article/george-viau-major-collector-impressionism-and-post-impressionism",
    chips: [
      {
        label: "Project Article",
        href: "https://odhn.ens.psl.eu/en/article/george-viau-major-collector-impressionism-and-post-impressionism"
      }
    ],
    embed: {
      kind: "image",
      src: "/assets/images/george_viau_cover.png",
      alt: "George Viau article cover"
    }
  }
];

export const researchProjects = [
  {
    title: "Audiovisual Duration Estimation under Uncertainty",
    icon: "🧠",
    description:
      "Doctoral research at NYU investigating how humans estimate time when faced with sensory conflict and noise.",
    bullets: [
      "Bayesian causal inference models",
      "Psychophysical experiments with varying auditory noise",
      "Supervisor: Michael S. Landy"
    ]
  },
  {
    title: "Continuous Psychophysics for Clinical Populations",
    icon: "🧪",
    description: "Project at University of Southampton with CPC.",
    bullets: [
      "Optimized continuous psychophysics methods",
      "Applications for rapid assessment in clinical contexts",
      "Co-supervised by Guido Maiello and Pascal Mamassian"
    ]
  },
  {
    title: "Expectation and Perceived Time",
    icon: "⏱️",
    description: "Master’s thesis at ENS, Paris.",
    bullets: [
      "Explored how prior expectations shape moment perception",
      "Designed behavioral experiments and time estimation tasks",
      "Supervised by Pascal Mamassian"
    ]
  },
  {
    title: "Non-Rigid Mirror Object Perception",
    icon: "🪞",
    description: "Project at Giessen, Germany with Dörschner and Fleming labs.",
    bullets: [
      "Generated dynamic object stimuli in Blender",
      "Modeled vision with PredRNN-v2 in ambiguous lighting conditions",
      "Co-authored Journal of Vision paper"
    ]
  },
  {
    title: "Auditory-Tactile Interaction in Material Perception",
    icon: "🔊",
    description: "Work at METU Sense Lab, Turkey.",
    bullets: [
      "Studied the Parchment Skin Illusion",
      "Investigated auditory influence on haptic material perception",
      "Supervised by Dicle Dovencioglu"
    ]
  }
] as const;
