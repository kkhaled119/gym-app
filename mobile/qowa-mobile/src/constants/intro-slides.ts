import images from "@/assets/images";

export type IntroSlide = {
  id: string;
  image: number;
  badge: { label: string; title: string; detail: string };
  title: string;
  description: string;
};

export const introSlides: IntroSlide[] = [
  {
    id: "1",
    image: images.intro1,
    badge: { label: "Today", title: "Push Day", detail: "6 exercises" },
    title: "Your plan, ready every day.",
    description:
      "Pick a ready-made program or build your own. Open the app and know exactly what to train.",
  },
  {
    id: "2",
    image: images.intro2,
    badge: { label: "Set 3", title: "Bench Press", detail: "80 kg × 8" },
    title: "Log every set in seconds.",
    description: "Track weights and reps as you train, with your last session always in view.",
  },
  {
    id: "3",
    image: images.intro3,
    badge: { label: "This week", title: "+5 kg", detail: "new PR" },
    title: "Watch your strength grow.",
    description: "See your progress over time and stay motivated to hit the next goal.",
  },
];
