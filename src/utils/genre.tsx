export const platformGenre = (platform: string) => {
  const platformKey = platform.toLowerCase();

  switch (true) {
    case platformKey.includes("shooter"):
      return `/svgs/shooter.svg`;
    case platformKey.includes("rpg"):
      return `/svgs/rpg.svg`;
    case platformKey.includes("strategy"):
      return `/svgs/strategy.svg`;
    case platformKey.includes("battle"):
      return `/svgs/battle.svg`;
    case platformKey.includes("card"):
      return `/svgs/card.svg`;
    case platformKey.includes("social"):
      return `/svgs/social.svg`;
    case platformKey.includes("sport"):
      return `/svgs/sport.svg`;
    case platformKey.includes("mmo") || platformKey.includes("moba"):
      return `/svgs/mmo.svg`;
    case platformKey.includes("fight"):
      return `/svgs/fight.svg`;
    default:
      return `/svgs/game.svg`;
  }
};
