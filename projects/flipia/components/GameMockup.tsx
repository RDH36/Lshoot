// Mockup HTML d'un screen de jeu Flipia — reproduit le vrai UI de l'app
// Utilisé à l'intérieur d'un <DeviceFrame> pour garder les emojis couleur

type CardState = "hidden" | "player" | "opponent";
type CardData = { state: CardState; emoji?: string };

const DEFAULT_CARDS: CardData[] = [
  { state: "player", emoji: "🐶" },
  { state: "hidden" },
  { state: "hidden" },
  { state: "opponent", emoji: "🐸" },

  { state: "hidden" },
  { state: "player", emoji: "🐱" },
  { state: "hidden" },
  { state: "hidden" },

  { state: "opponent", emoji: "🐸" },
  { state: "hidden" },
  { state: "player", emoji: "🐶" },
  { state: "hidden" },

  { state: "hidden" },
  { state: "hidden" },
  { state: "player", emoji: "🐱" },
  { state: "hidden" },
];

type Props = {
  opponentName?: string;
  opponentAvatar?: string;
  opponentSubtitle?: string;
  playerName?: string;
  playerAvatar?: string;
  playerSubtitle?: string;
  opponentTimer?: string;
  playerTimer?: string;
  opponentDots?: number;
  playerDots?: number;
  totalDots?: number;
  scorePlayer?: number;
  scoreOpponent?: number;
  totalPairs?: number;
  cards?: CardData[];
  tornadoReady?: boolean;
  pairsLabel?: string;
  tornadoTitle?: string;
  tornadoSub?: string;
  tornadoButton?: string;
};

export function GameMockup({
  opponentName = "Alex",
  opponentAvatar = "🎮",
  opponentSubtitle = "Joueur · En di...",
  playerName = "Toi",
  playerAvatar = "😎",
  playerSubtitle = "Joueur · 🌪",
  opponentTimer = "00:12",
  playerTimer = "00:08",
  opponentDots = 1,
  playerDots = 2,
  totalDots = 8,
  scorePlayer = 2,
  scoreOpponent = 1,
  totalPairs = 8,
  cards = DEFAULT_CARDS,
  tornadoReady = true,
  pairsLabel = "PAIRES",
  tornadoTitle = "Tornade prête",
  tornadoSub = "Mélange les cartes non-matchées",
  tornadoButton = "LANCER",
}: Props) {
  const nunito = "var(--font-nunito), sans-serif";
  const fredoka = "var(--font-fredoka), sans-serif";

  return (
    <div
      className="w-full h-full bg-[#FAF1F1] flex flex-col"
      style={{
        fontFamily: nunito,
        padding: "6% 4% 4% 4%",
      }}
    >
      {/* Top: Opponent HUD */}
      <Hud
        name={opponentName}
        subtitle={opponentSubtitle}
        avatar={opponentAvatar}
        avatarBg="#FAECE7"
        timer={opponentTimer}
        dotsFilled={opponentDots}
        dotsTotal={totalDots}
        fredoka={fredoka}
      />

      {/* Score */}
      <div
        className="flex items-center justify-center gap-2 mt-3"
        style={{ fontFamily: nunito }}
      >
        <span className="text-[0.72rem] tracking-[0.2em] text-[#474553] font-bold">
          {pairsLabel}
        </span>
        <span
          className="text-[1.2rem] font-bold"
          style={{ color: "#5DA9FE", fontFamily: fredoka }}
        >
          {scorePlayer}
        </span>
        <span className="text-[1.1rem] text-[#9ca3af]">—</span>
        <span
          className="text-[1.2rem] font-bold"
          style={{ color: "#A2340A", fontFamily: fredoka }}
        >
          {scoreOpponent}
        </span>
        <span className="text-[0.9rem] text-[#9ca3af] font-semibold">
          /{totalPairs}
        </span>
      </div>

      {/* Grid 4x4 */}
      <div className="flex-1 grid grid-cols-4 gap-[3%] py-[4%] px-[2%] content-center">
        {cards.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>

      {/* Tornado panel */}
      {tornadoReady ? (
        <div
          className="bg-white rounded-[1.2rem] px-[1.2rem] py-[0.9rem] flex items-center gap-[0.8rem] shadow-[0_4px_12px_rgba(83,74,183,0.08)]"
          style={{ fontFamily: nunito }}
        >
          <span className="text-[1.8rem]">🌪</span>
          <div className="flex-1 min-w-0">
            <div
              className="text-[0.85rem] font-bold text-[#1A1C17]"
              style={{ fontFamily: fredoka }}
            >
              {tornadoTitle}
            </div>
            <div className="text-[0.65rem] text-[#474553]">{tornadoSub}</div>
          </div>
          <div className="bg-[#534AB7] text-white rounded-full px-[1rem] py-[0.45rem] text-[0.75rem] font-bold tracking-wider">
            {tornadoButton}
          </div>
        </div>
      ) : null}

      {/* Bottom: Player HUD */}
      <div className="mt-[3%]">
        <Hud
          name={playerName}
          subtitle={playerSubtitle}
          avatar={playerAvatar}
          avatarBg="#E8F1FE"
          timer={playerTimer}
          dotsFilled={playerDots}
          dotsTotal={totalDots}
          reverse
          fredoka={fredoka}
        />
      </div>
    </div>
  );
}

function Card({ card }: { card: CardData }) {
  if (card.state === "hidden") {
    return (
      <div className="aspect-square rounded-[0.9rem] bg-[#E8F1FE] flex items-center justify-center">
        <span
          className="text-[1.4rem] font-bold"
          style={{ color: "#5DA9FE", fontFamily: "var(--font-fredoka), sans-serif" }}
        >
          ?
        </span>
      </div>
    );
  }
  const bg = card.state === "player" ? "#E8F1FE" : "#FAECE7";
  return (
    <div
      className="aspect-square rounded-[0.9rem] flex items-center justify-center"
      style={{ background: bg }}
    >
      <span className="text-[1.8rem] leading-none">{card.emoji}</span>
    </div>
  );
}

function Hud({
  name,
  subtitle,
  avatar,
  avatarBg,
  timer,
  dotsFilled,
  dotsTotal,
  reverse = false,
  fredoka,
}: {
  name: string;
  subtitle: string;
  avatar: string;
  avatarBg: string;
  timer: string;
  dotsFilled: number;
  dotsTotal: number;
  reverse?: boolean;
  fredoka: string;
}) {
  return (
    <div
      className="bg-white rounded-[1.2rem] px-[0.9rem] py-[0.7rem] flex items-center gap-[0.7rem]"
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      {/* Timer pill (opposite side from avatar) */}
      <div className="bg-[#E8F1FE] rounded-[0.6rem] px-[0.6rem] py-[0.3rem]">
        <span
          className="text-[0.85rem] font-bold"
          style={{ color: "#5DA9FE", fontFamily: fredoka }}
        >
          {timer}
        </span>
      </div>

      {/* Dots */}
      <div className="flex gap-[3px]">
        {Array.from({ length: dotsTotal }).map((_, i) => (
          <div
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: i < dotsFilled ? "#5DA9FE" : "#E8E4E4" }}
          />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Name + subtitle */}
      <div
        className={`flex flex-col ${reverse ? "items-start" : "items-end"}`}
      >
        <span
          className="text-[0.85rem] font-bold text-[#1A1C17] leading-tight"
          style={{ fontFamily: fredoka }}
        >
          {name}
        </span>
        <span className="text-[0.6rem] text-[#474553] leading-tight">
          {subtitle}
        </span>
      </div>

      {/* Avatar */}
      <div
        className="w-[2.2rem] h-[2.2rem] rounded-[0.6rem] flex items-center justify-center"
        style={{ background: avatarBg }}
      >
        <span className="text-[1.1rem]">{avatar}</span>
      </div>
    </div>
  );
}
