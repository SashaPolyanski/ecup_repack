export const games = {
  game: "/game/:gameId",
  tournament: "/game/:gameId/tournament/:id",
} as const;

export const main = {
  mainRoot: "/",
} as const;

export const userSettings = {
  userSettingsRoot: "/userSettings",
} as const;
