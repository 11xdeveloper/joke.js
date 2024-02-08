type APIResponseSuccess = { error: false } & (
  | Joke
  | { amount: number; jokes: Joke[] }
);
interface APIResponseFail {
  error: true;
  internalError: boolean;
  code: number;
  message: string;
  causedBy: string[];
  additionalInfo: string;
  timestamp: number;
}

type Joke = {
  category: Category;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: true;
  lang: Language;
} & (
  | { type: "single"; joke: string }
  | { type: "twopart"; setup: string; delivery: string }
);

type JokeType = "single" | "twopart";

type Language = "en" | "cs" | "de" | "es" | "fr" | "pt";

type Category =
  | "Programming"
  | "Misc"
  | "Dark"
  | "Pun"
  | "Spooky"
  | "Christmas";

type BlacklistFlag =
  | "nsfw"
  | "religious"
  | "political"
  | "racist"
  | "sexist"
  | "explicit";

interface Options {
  amount?: number;
  blacklistFlags?: BlacklistFlag[];
  contains?: string;
  types?: JokeType[];
  language?: Language;
}

const getJoke = async (
  categories: Category[] = [
    "Christmas",
    "Dark",
    "Misc",
    "Programming",
    "Pun",
    "Spooky",
  ],
  {
    blacklistFlags = [],
    amount = 1,
    language = "en",
    contains = "",
    types = ["single", "twopart"],
  }: Options
) => {
  if (categories.length === 0)
    throw new Error("You must provide atleast 1 category");

  const url = new URL(`joke/${categories.join(",")}`, "https://v2.jokeapi.dev");
  url.searchParams.append("lang", language);
  url.searchParams.append("contains", contains);
  url.searchParams.append("amount", amount.toString());

  // Prevent ',' from being serialized
  url.search = `${url.search}&type=${types.join(",")}&blacklistFlags=${blacklistFlags.join(",")}`;

  try {
    const res = await fetch(url);

    if (res.ok) {
      const data: APIResponseSuccess = await res.json();

      return ("amount" in data ? data.jokes : [data]).map((joke) => {
        if ("error" in joke) delete joke.error;
        const { flags, id, lang, safe, ...data } = joke;
        return data;
      });
    }

    const error: APIResponseFail = await res.json();

    throw new Error(`${error.message} ${error.additionalInfo}`, {
      cause: error.causedBy.join(" "),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getJoke, Joke, JokeType, BlacklistFlag, Category, Options, Language };
